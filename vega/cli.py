"""
Vega — CLI Chat Interface
Rich terminal interface for chatting with Vega.
"""

import argparse
import os
import sys
from pathlib import Path

# Try rich for beautiful output, fall back to plain text
try:
    from rich.console import Console
    from rich.markdown import Markdown
    from rich.panel import Panel
    from rich.text import Text
    from rich.theme import Theme
    HAS_RICH = True
except ImportError:
    HAS_RICH = False

from .agent import VegaAgent


# Evergreen-inspired theme
VEGA_THEME = Theme({
    "vega": "bold #7094FB",
    "you": "bold #4ADE80",
    "info": "#A3A3A3",
    "accent": "#3A6AF8",
    "success": "#15803D",
    "warning": "#C25700",
    "error": "#B91C1C",
})


def print_banner(console=None):
    """Display the Vega welcome banner."""
    banner = """
 ╦  ╦┌─┐┌─┐┌─┐
 ╚╗╔╝├┤ │ ┬├─┤
  ╚╝ └─┘└─┘┴ ┴
  AI Design Agent v0.1
"""
    if HAS_RICH and console:
        console.print(Panel(
            Text(banner, style="vega"),
            subtitle="[info]type /help for commands[/info]",
            border_style="vega",
            expand=False,
        ))
    else:
        print(banner)
        print("  type /help for commands\n")


def print_help(console=None):
    """Display available commands."""
    help_text = """
**Commands:**

`/critique <path>` — Attach a screenshot for design critique
`/audit [light|dark|both]` — Run accessibility audit on design tokens
`/search <query>` — Quick-search design tokens
`/contrast <fg> <bg>` — Check contrast ratio between two colors
`/reset` — Clear conversation history
`/help` — Show this help
`/quit` — Exit Vega

**Tips:**
- Just type naturally to chat with Vega about design
- Drag & drop image paths after /critique for fast critique
- Vega remembers your full conversation for context
"""
    if HAS_RICH and console:
        console.print(Markdown(help_text))
    else:
        print(help_text)


def run_cli():
    """Main CLI entry point."""
    parser = argparse.ArgumentParser(description="Vega — AI Design Agent")
    parser.add_argument(
        "--tokens-dir",
        default=os.environ.get("VEGA_TOKENS_DIR", "."),
        help="Path to directory containing design token JSON files"
    )
    parser.add_argument(
        "--commands-dir",
        default=os.environ.get("VEGA_COMMANDS_DIR"),
        help="Path to directory containing command markdown files"
    )
    parser.add_argument(
        "--rules-dir",
        default=os.environ.get("VEGA_RULES_DIR"),
        help="Path to directory containing rule markdown files"
    )
    parser.add_argument(
        "--skills-dir",
        default=os.environ.get("VEGA_SKILLS_DIR"),
        help="Path to directory containing skill markdown files"
    )
    parser.add_argument(
        "--users-dir",
        default=os.environ.get("VEGA_USERS_DIR"),
        help="Path to directory containing user research markdown files"
    )
    parser.add_argument(
        "--model",
        default=os.environ.get("VEGA_MODEL", "claude-sonnet-4-20250514"),
        help="Claude model to use"
    )
    args = parser.parse_args()

    # Resolve directories
    tokens_dir = str(Path(args.tokens_dir).resolve())
    base_dir = Path(tokens_dir).parent
    
    commands_dir = str(Path(args.commands_dir).resolve()) if args.commands_dir else str(base_dir / "commands")
    rules_dir = str(Path(args.rules_dir).resolve()) if args.rules_dir else str(base_dir / "rules")
    skills_dir = str(Path(args.skills_dir).resolve()) if args.skills_dir else str(base_dir / "skills")
    users_dir = str(Path(args.users_dir).resolve()) if args.users_dir else str(base_dir / "users")

    # Set up console
    console = Console(theme=VEGA_THEME) if HAS_RICH else None

    print_banner(console)

    # Initialize agent
    try:
        agent = VegaAgent(
            tokens_dir=tokens_dir,
            model=args.model,
            commands_dir=commands_dir,
            rules_dir=rules_dir,
            skills_dir=skills_dir,
            users_dir=users_dir
        )
    except Exception as e:
        msg = f"Failed to initialize Vega: {e}"
        if console:
            console.print(f"[error]{msg}[/error]")
        else:
            print(msg)
        sys.exit(1)

    if console:
        console.print(f"[info]Loaded tokens from: {tokens_dir}[/info]")
        console.print(f"[info]Loaded commands from: {commands_dir}[/info]")
        console.print(f"[info]Loaded rules from: {rules_dir}[/info]")
        console.print(f"[info]Loaded skills from: {skills_dir}[/info]")
        console.print(f"[info]Loaded users from: {users_dir}[/info]")
        console.print(f"[info]Model: {args.model}[/info]\n")
    else:
        print(f"Loaded tokens from: {tokens_dir}")
        print(f"Loaded commands from: {commands_dir}")
        print(f"Loaded rules from: {rules_dir}")
        print(f"Loaded skills from: {skills_dir}")
        print(f"Loaded users from: {users_dir}")
        print(f"Model: {args.model}\n")

    # Main loop
    while True:
        try:
            if console:
                user_input = console.input("[you]you → [/you]").strip()
            else:
                user_input = input("you → ").strip()

            if not user_input:
                continue

            # Handle commands
            if user_input.startswith("/"):
                parts = user_input.split(maxsplit=1)
                cmd = parts[0].lower()
                arg = parts[1] if len(parts) > 1 else ""

                if cmd == "/quit" or cmd == "/exit":
                    if console:
                        console.print("[info]See you, designer. ✦[/info]")
                    else:
                        print("See you, designer.")
                    break

                elif cmd == "/help":
                    print_help(console)
                    continue

                elif cmd == "/reset":
                    agent.reset()
                    if console:
                        console.print("[info]Conversation cleared.[/info]")
                    else:
                        print("Conversation cleared.")
                    continue

                elif cmd == "/critique":
                    if not arg:
                        if console:
                            console.print("[warning]Usage: /critique <image_path> [context][/warning]")
                        else:
                            print("Usage: /critique <image_path> [context]")
                        continue

                    # Parse image path and optional context
                    critique_parts = arg.split(maxsplit=1)
                    image_path = critique_parts[0].strip("'\"")
                    context = critique_parts[1] if len(critique_parts) > 1 else "General design review"

                    if console:
                        console.print(f"[info]Analyzing design...[/info]")
                    else:
                        print("Analyzing design...")

                    response = agent.critique(image_path, context)

                elif cmd == "/audit":
                    mode = arg.strip() if arg else "both"
                    if mode not in ("light", "dark", "both"):
                        mode = "both"

                    if console:
                        console.print(f"[info]Running {mode} mode accessibility audit...[/info]")
                    else:
                        print(f"Running {mode} mode accessibility audit...")

                    response = agent.audit_tokens(mode)

                elif cmd == "/search":
                    if not arg:
                        if console:
                            console.print("[warning]Usage: /search <query>[/warning]")
                        else:
                            print("Usage: /search <query>")
                        continue
                    response = agent.chat(f"Search the design tokens for '{arg}' and tell me what you find. Show the token paths and values.")

                elif cmd == "/contrast":
                    colors = arg.split()
                    if len(colors) != 2:
                        if console:
                            console.print("[warning]Usage: /contrast #foreground #background[/warning]")
                        else:
                            print("Usage: /contrast #foreground #background")
                        continue
                    response = agent.chat(f"Check the contrast ratio between {colors[0]} (foreground) and {colors[1]} (background). Tell me if it passes WCAG requirements.")

                else:
                    response = agent.chat(user_input)

            else:
                # Regular chat
                if console:
                    console.print("[info]Thinking...[/info]")
                else:
                    print("Thinking...")

                response = agent.chat(user_input)

            # Display response
            if console:
                console.print()
                console.print(Panel(
                    Markdown(response),
                    title="[vega]vega[/vega]",
                    border_style="vega",
                    padding=(1, 2),
                ))
                console.print()
            else:
                print(f"\nvega:\n{response}\n")

        except KeyboardInterrupt:
            print()
            if console:
                console.print("[info]See you, designer. ✦[/info]")
            else:
                print("See you, designer.")
            break
        except Exception as e:
            if console:
                console.print(f"[error]Error: {e}[/error]")
            else:
                print(f"Error: {e}")


if __name__ == "__main__":
    run_cli()
