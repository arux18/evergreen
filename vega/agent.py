"""
Vega — Core Agent Engine
Manages conversation, tool use, and vision capabilities via Claude API.
"""

import anthropic
import base64
import json
import mimetypes
from pathlib import Path
from typing import Optional

from .prompts import VEGA_SYSTEM_PROMPT, CRITIQUE_PROMPT_TEMPLATE
from .tools import DesignSystemTools, TOOL_DEFINITIONS


class VegaAgent:
    """The Vega design agent — critique, system management, and conversation."""

    def __init__(self, tokens_dir: str, model: str = "claude-sonnet-4-20250514",
                 commands_dir: str = None, rules_dir: str = None, 
                 skills_dir: str = None, users_dir: str = None):
        self.client = anthropic.Anthropic()
        self.model = model
        self.tools = DesignSystemTools(
            tokens_dir=tokens_dir,
            commands_dir=commands_dir,
            rules_dir=rules_dir,
            skills_dir=skills_dir,
            users_dir=users_dir
        )
        self.conversation: list[dict] = []
        self.tokens_dir = tokens_dir

    def _encode_image(self, image_path: str) -> tuple[str, str]:
        """Read and base64-encode an image file."""
        path = Path(image_path)
        if not path.exists():
            raise FileNotFoundError(f"Image not found: {image_path}")

        mime_type, _ = mimetypes.guess_type(str(path))
        if mime_type not in ("image/png", "image/jpeg", "image/gif", "image/webp"):
            raise ValueError(f"Unsupported image type: {mime_type}")

        with open(path, "rb") as f:
            data = base64.standard_b64encode(f.read()).decode("utf-8")
        return data, mime_type

    def chat(self, user_message: str, image_path: Optional[str] = None) -> str:
        """Send a message to Vega, optionally with an image for critique."""

        # Build the user message content
        content = []

        if image_path:
            try:
                img_data, mime_type = self._encode_image(image_path)
                content.append({
                    "type": "image",
                    "source": {
                        "type": "base64",
                        "media_type": mime_type,
                        "data": img_data
                    }
                })
            except (FileNotFoundError, ValueError) as e:
                return f"⚠️  Could not load image: {e}"

        content.append({"type": "text", "text": user_message})
        self.conversation.append({"role": "user", "content": content})

        # Agentic loop — keep going until Vega stops calling tools
        while True:
            response = self.client.messages.create(
                model=self.model,
                max_tokens=4096,
                system=VEGA_SYSTEM_PROMPT,
                tools=TOOL_DEFINITIONS,
                messages=self.conversation,
            )

            # Collect the response
            assistant_content = response.content
            self.conversation.append({"role": "assistant", "content": assistant_content})

            # Check if there are tool calls to handle
            tool_calls = [block for block in assistant_content if block.type == "tool_use"]

            if not tool_calls:
                # No more tools — extract final text
                text_blocks = [block.text for block in assistant_content if block.type == "text"]
                return "\n".join(text_blocks)

            # Execute tools and feed results back
            tool_results = []
            for tool_call in tool_calls:
                result = self.tools.execute(tool_call.name, tool_call.input)
                tool_results.append({
                    "type": "tool_result",
                    "tool_use_id": tool_call.id,
                    "content": result
                })

            self.conversation.append({"role": "user", "content": tool_results})

    def critique(self, image_path: str, context: str = "General design review") -> str:
        """Shortcut for design critique with an image."""
        prompt = CRITIQUE_PROMPT_TEMPLATE.format(context=context)
        return self.chat(prompt, image_path=image_path)

    def audit_tokens(self, mode: str = "both") -> str:
        """Shortcut for running a full token accessibility audit."""
        return self.chat(
            f"Run a full accessibility audit on our design tokens in {mode} mode. "
            "Check all text-on-surface combinations and flag anything below WCAG AA. "
            "Also check if we have any gaps in our token coverage."
        )

    def reset(self):
        """Clear conversation history."""
        self.conversation = []
