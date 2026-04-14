"""
Vega — Design System Tools
Token reading, searching, auditing, and contrast checking.
"""

import json
import math
import os
import re
from pathlib import Path
from typing import Any

from .code_audit import scan_file, scan_directory, format_audit_report


# ---------------------------------------------------------------------------
# Color utilities
# ---------------------------------------------------------------------------

def hex_to_rgb(hex_color: str) -> tuple[int, int, int]:
    """Convert hex color to RGB tuple."""
    hex_color = hex_color.lstrip("#")
    if len(hex_color) == 3:
        hex_color = "".join(c * 2 for c in hex_color)
    return tuple(int(hex_color[i : i + 2], 16) for i in (0, 2, 4))


def relative_luminance(r: int, g: int, b: int) -> float:
    """Calculate relative luminance per WCAG 2.1."""
    def linearize(c: int) -> float:
        s = c / 255.0
        return s / 12.92 if s <= 0.03928 else ((s + 0.055) / 1.055) ** 2.4
    return 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b)


def contrast_ratio(color1: str, color2: str) -> float:
    """Calculate WCAG contrast ratio between two hex colors."""
    r1, g1, b1 = hex_to_rgb(color1)
    r2, g2, b2 = hex_to_rgb(color2)
    l1 = relative_luminance(r1, g1, b1)
    l2 = relative_luminance(r2, g2, b2)
    lighter = max(l1, l2)
    darker = min(l1, l2)
    return (lighter + 0.05) / (darker + 0.05)


def wcag_grade(ratio: float) -> str:
    """Return WCAG grade for a contrast ratio."""
    if ratio >= 7.0:
        return "AAA"
    elif ratio >= 4.5:
        return "AA"
    elif ratio >= 3.0:
        return "AA-large"
    else:
        return "FAIL"


# ---------------------------------------------------------------------------
# Token loading
# ---------------------------------------------------------------------------

def load_token_files(tokens_dir: str) -> dict[str, Any]:
    """Load all JSON token files from the design-specs directory."""
    tokens = {}
    tokens_path = Path(tokens_dir)
    for f in sorted(tokens_path.glob("*.json")):
        try:
            with open(f, "r") as fp:
                data = json.load(fp)
            tokens[f.stem] = data
        except (json.JSONDecodeError, IOError) as e:
            tokens[f.stem] = {"$error": str(e)}
    return tokens


def load_markdown_files(directory: str) -> dict[str, str]:
    """Load all markdown files from a directory. Returns {filename: content}."""
    files = {}
    dir_path = Path(directory)
    if not dir_path.exists():
        return files
    for f in sorted(dir_path.rglob("*.md")):
        try:
            with open(f, "r", encoding="utf-8") as fp:
                files[str(f.relative_to(dir_path))] = fp.read()
        except (IOError, UnicodeDecodeError) as e:
            files[str(f.relative_to(dir_path))] = f"Error reading file: {e}"
    return files


def load_markdown_file(filepath: str) -> str:
    """Load a single markdown file. Returns content or error message."""
    path = Path(filepath)
    if not path.exists():
        return f"File not found: {filepath}"
    try:
        with open(path, "r", encoding="utf-8") as f:
            return f.read()
    except (IOError, UnicodeDecodeError) as e:
        return f"Error reading file: {e}"


def flatten_tokens(obj: Any, prefix: str = "") -> dict[str, Any]:
    """Flatten nested token structure into dot-notation paths."""
    flat = {}
    if isinstance(obj, dict):
        for key, value in obj.items():
            if key.startswith("$"):
                continue
            new_key = f"{prefix}.{key}" if prefix else key
            if isinstance(value, dict) and not any(
                k in value for k in ("value", "light", "dark")
            ):
                flat.update(flatten_tokens(value, new_key))
            else:
                flat[new_key] = value
    return flat


# ---------------------------------------------------------------------------
# Tool definitions (for Claude tool_use)
# ---------------------------------------------------------------------------

TOOL_DEFINITIONS = [
    {
        "name": "search_tokens",
        "description": "Search design tokens by name or usage. Returns matching tokens with their values. Use this to find specific tokens, check what tokens exist for a category, or look up values.",
        "input_schema": {
            "type": "object",
            "properties": {
                "query": {
                    "type": "string",
                    "description": "Search term to match against token names, values, or usage descriptions. Examples: 'blue', 'border', 'heading', 'error'"
                },
                "category": {
                    "type": "string",
                    "description": "Optional: limit search to a specific token file. One of: '01-foundational-tokens', '02-components-and-states', '03-spacing-and-shadows', '04-tables', '05-charts'",
                    "enum": ["01-foundational-tokens", "02-components-and-states", "03-spacing-and-shadows", "04-tables", "05-charts"]
                }
            },
            "required": ["query"]
        }
    },
    {
        "name": "check_contrast",
        "description": "Check the WCAG contrast ratio between two colors. Returns the ratio and whether it passes AA/AAA for normal text, large text, and UI components.",
        "input_schema": {
            "type": "object",
            "properties": {
                "foreground": {
                    "type": "string",
                    "description": "Foreground (text) color as hex, e.g. '#171717'"
                },
                "background": {
                    "type": "string",
                    "description": "Background color as hex, e.g. '#FFFFFF'"
                }
            },
            "required": ["foreground", "background"]
        }
    },
    {
        "name": "audit_token_colors",
        "description": "Audit all color tokens for accessibility. Checks text colors against surface colors and reports any combinations that fail WCAG AA. Returns a report of passing and failing combinations.",
        "input_schema": {
            "type": "object",
            "properties": {
                "mode": {
                    "type": "string",
                    "description": "Which color mode to audit",
                    "enum": ["light", "dark", "both"]
                }
            },
            "required": ["mode"]
        }
    },
    {
        "name": "list_token_categories",
        "description": "List all available token categories and a summary of what each contains. Use this to understand the structure of the design system.",
        "input_schema": {
            "type": "object",
            "properties": {}
        }
    },
    {
        "name": "get_token_value",
        "description": "Get the exact value of a specific token by its dot-notation path. Example: 'color.blue.600' or 'input.states.focus.border'",
        "input_schema": {
            "type": "object",
            "properties": {
                "token_path": {
                    "type": "string",
                    "description": "Dot-notation path to the token, e.g. 'color.blue.600', 'typography.heading.h1'"
                }
            },
            "required": ["token_path"]
        }
    },
    {
        "name": "suggest_token",
        "description": "Given a design need, suggest the most appropriate existing token(s) to use. Helps maintain consistency by pointing designers to existing tokens rather than creating ad-hoc values.",
        "input_schema": {
            "type": "object",
            "properties": {
                "need": {
                    "type": "string",
                    "description": "Describe what you need a token for. Examples: 'background for a warning banner', 'text color for disabled inputs', 'border radius for a modal'"
                }
            },
            "required": ["need"]
        }
    },
    {
        "name": "scan_code_accessibility",
        "description": "Scan a frontend code file (TSX, JSX, CSS, HTML) for accessibility violations and design system compliance issues. Checks for missing alt text, non-semantic HTML, hardcoded colors/spacing, missing labels, focus style removal, and more. Returns findings with severity ratings and fix suggestions.",
        "input_schema": {
            "type": "object",
            "properties": {
                "file_path": {
                    "type": "string",
                    "description": "Path to the file to scan"
                },
                "file_content": {
                    "type": "string",
                    "description": "The source code content to scan (if file_path is not readable directly)"
                }
            },
            "required": ["file_path"]
        }
    },
    {
        "name": "scan_directory_accessibility",
        "description": "Scan an entire directory of frontend code for accessibility violations. Recursively checks all TSX, JSX, CSS, SCSS, and HTML files. Returns a full audit report with summary and findings sorted by severity.",
        "input_schema": {
            "type": "object",
            "properties": {
                "directory": {
                    "type": "string",
                    "description": "Path to the directory to scan"
                }
            },
            "required": ["directory"]
        }
    },
    {
        "name": "list_commands",
        "description": "List all available commands from the commands folder. Returns a list of command names and descriptions.",
        "input_schema": {
            "type": "object",
            "properties": {},
            "required": []
        }
    },
    {
        "name": "get_command",
        "description": "Get the full content of a specific command by name.",
        "input_schema": {
            "type": "object",
            "properties": {
                "name": {
                    "type": "string",
                    "description": "Name of the command file (e.g., 'analyze-spending.md')"
                }
            },
            "required": ["name"]
        }
    },
    {
        "name": "list_rules",
        "description": "List all available rules from the rules folder, organized by category (accessibility, ui, visual). Returns rule names and categories.",
        "input_schema": {
            "type": "object",
            "properties": {},
            "required": []
        }
    },
    {
        "name": "get_rule",
        "description": "Get the full content of a specific rule by path.",
        "input_schema": {
            "type": "object",
            "properties": {
                "path": {
                    "type": "string",
                    "description": "Path to the rule file (e.g., 'ui/buttons.md' or 'accessibility/contrast.md')"
                }
            },
            "required": ["path"]
        }
    },
    {
        "name": "list_skills",
        "description": "List all available skills from the skills folder. Skills are rendering guides for specific components like charts, dashboards, etc.",
        "input_schema": {
            "type": "object",
            "properties": {},
            "required": []
        }
    },
    {
        "name": "get_skill",
        "description": "Get the full content of a specific skill by name.",
        "input_schema": {
            "type": "object",
            "properties": {
                "name": {
                    "type": "string",
                    "description": "Name of the skill file (e.g., 'render-chart.md')"
                }
            },
            "required": ["name"]
        }
    },
    {
        "name": "list_users",
        "description": "List all user research documents from the users folder. Includes personas, goals, psychology, and UX principles.",
        "input_schema": {
            "type": "object",
            "properties": {},
            "required": []
        }
    },
    {
        "name": "get_user_doc",
        "description": "Get the full content of a specific user research document.",
        "input_schema": {
            "type": "object",
            "properties": {
                "name": {
                    "type": "string",
                    "description": "Name of the user doc file (e.g., 'personas.md', 'goals.md')"
                }
            },
            "required": ["name"]
        }
    },
]


# ---------------------------------------------------------------------------
# Tool execution
# ---------------------------------------------------------------------------

class DesignSystemTools:
    """Executes Vega's design system tools against loaded token and config data."""

    def __init__(self, tokens_dir: str, commands_dir: str = None, rules_dir: str = None, 
                 skills_dir: str = None, users_dir: str = None):
        self.tokens_dir = tokens_dir
        self.raw_tokens = load_token_files(tokens_dir)
        self.flat_tokens = {}
        for filename, data in self.raw_tokens.items():
            self.flat_tokens[filename] = flatten_tokens(data)
        
        # Load configuration folders
        self.commands_dir = commands_dir or str(Path(tokens_dir).parent / "commands")
        self.rules_dir = rules_dir or str(Path(tokens_dir).parent / "rules")
        self.skills_dir = skills_dir or str(Path(tokens_dir).parent / "skills")
        self.users_dir = users_dir or str(Path(tokens_dir).parent / "users")
        
        self.commands = load_markdown_files(self.commands_dir)
        self.rules = load_markdown_files(self.rules_dir)
        self.skills = load_markdown_files(self.skills_dir)
        self.users = load_markdown_files(self.users_dir)

    def execute(self, tool_name: str, tool_input: dict) -> str:
        """Route and execute a tool call."""
        handlers = {
            "search_tokens": self._search_tokens,
            "check_contrast": self._check_contrast,
            "audit_token_colors": self._audit_token_colors,
            "list_token_categories": self._list_token_categories,
            "get_token_value": self._get_token_value,
            "suggest_token": self._suggest_token,
            "scan_code_accessibility": self._scan_code_accessibility,
            "scan_directory_accessibility": self._scan_directory_accessibility,
            "list_commands": self._list_commands,
            "get_command": self._get_command,
            "list_rules": self._list_rules,
            "get_rule": self._get_rule,
            "list_skills": self._list_skills,
            "get_skill": self._get_skill,
            "list_users": self._list_users,
            "get_user_doc": self._get_user_doc,
        }
        handler = handlers.get(tool_name)
        if not handler:
            return json.dumps({"error": f"Unknown tool: {tool_name}"})
        try:
            return handler(tool_input)
        except Exception as e:
            return json.dumps({"error": str(e)})

    def _search_tokens(self, params: dict) -> str:
        query = params["query"].lower()
        category = params.get("category")
        results = []

        sources = {category: self.flat_tokens[category]} if category and category in self.flat_tokens else self.flat_tokens

        for filename, flat in sources.items():
            for path, value in flat.items():
                searchable = f"{path} {json.dumps(value)}".lower()
                if query in searchable:
                    results.append({
                        "file": filename,
                        "token": path,
                        "value": value
                    })

        if not results:
            return json.dumps({"message": f"No tokens found matching '{params['query']}'", "results": []})
        return json.dumps({"count": len(results), "results": results[:30]})

    def _check_contrast(self, params: dict) -> str:
        fg = params["foreground"]
        bg = params["background"]
        ratio = contrast_ratio(fg, bg)
        grade = wcag_grade(ratio)
        return json.dumps({
            "foreground": fg,
            "background": bg,
            "contrast_ratio": round(ratio, 2),
            "wcag_grade": grade,
            "passes": {
                "normal_text_AA": ratio >= 4.5,
                "normal_text_AAA": ratio >= 7.0,
                "large_text_AA": ratio >= 3.0,
                "large_text_AAA": ratio >= 4.5,
                "ui_components_AA": ratio >= 3.0
            }
        })

    def _audit_token_colors(self, params: dict) -> str:
        mode = params["mode"]
        foundational = self.raw_tokens.get("01-foundational-tokens", {})

        # Extract text and surface colors
        text_colors = {}
        surface_colors = {}

        text_data = foundational.get("color", {}).get("text", {})
        surface_data = foundational.get("color", {}).get("surface", {})

        modes_to_check = ["light", "dark"] if mode == "both" else [mode]

        results = {"passing": [], "failing": [], "summary": {}}

        for m in modes_to_check:
            texts = {}
            surfaces = {}

            for name, val in text_data.items():
                if isinstance(val, dict) and m in val:
                    color = val[m]
                    if color.startswith("#"):
                        texts[f"text.{name}"] = color

            for name, val in surface_data.items():
                if isinstance(val, dict) and m in val:
                    color = val[m]
                    if color.startswith("#"):
                        surfaces[f"surface.{name}"] = color

            for text_name, text_color in texts.items():
                for surf_name, surf_color in surfaces.items():
                    ratio = contrast_ratio(text_color, surf_color)
                    grade = wcag_grade(ratio)
                    entry = {
                        "mode": m,
                        "text": text_name,
                        "text_color": text_color,
                        "surface": surf_name,
                        "surface_color": surf_color,
                        "ratio": round(ratio, 2),
                        "grade": grade
                    }
                    if ratio >= 4.5:
                        results["passing"].append(entry)
                    else:
                        results["failing"].append(entry)

        total = len(results["passing"]) + len(results["failing"])
        results["summary"] = {
            "total_combinations": total,
            "passing": len(results["passing"]),
            "failing": len(results["failing"]),
            "pass_rate": f"{len(results['passing'])/total*100:.0f}%" if total else "N/A"
        }
        return json.dumps(results)

    def _list_token_categories(self, params: dict) -> str:
        categories = []
        for filename, data in self.raw_tokens.items():
            desc = data.get("$description", "No description")
            top_keys = [k for k in data.keys() if not k.startswith("$")]
            token_count = len(self.flat_tokens.get(filename, {}))
            categories.append({
                "file": filename,
                "description": desc,
                "sections": top_keys[:10],
                "token_count": token_count
            })
        return json.dumps(categories)

    def _get_token_value(self, params: dict) -> str:
        path = params["token_path"]
        for filename, flat in self.flat_tokens.items():
            if path in flat:
                return json.dumps({
                    "token": path,
                    "file": filename,
                    "value": flat[path]
                })
            # Try partial match
            for token_path, value in flat.items():
                if token_path.endswith(path):
                    return json.dumps({
                        "token": token_path,
                        "file": filename,
                        "value": value,
                        "note": f"Matched via partial path. Full path: {token_path}"
                    })
        return json.dumps({"error": f"Token '{path}' not found"})

    def _suggest_token(self, params: dict) -> str:
        need = params["need"].lower()

        # Keywords → likely token categories
        keyword_map = {
            "background": ["surface", "bg", "subtle"],
            "text": ["text", "color", "font"],
            "border": ["border", "divider", "outline"],
            "error": ["error", "status", "danger"],
            "warning": ["warning", "caution"],
            "success": ["success", "positive"],
            "hover": ["hover", "active", "pressed"],
            "disabled": ["disabled", "muted", "tertiary"],
            "heading": ["heading", "h1", "h2", "title", "display"],
            "spacing": ["gap", "padding", "margin", "space"],
            "radius": ["radius", "rounded", "corner"],
            "shadow": ["shadow", "elevation"],
            "chart": ["chart", "data", "visualization", "series"],
            "focus": ["focus", "ring", "outline"],
        }

        search_terms = set()
        for keyword, terms in keyword_map.items():
            if keyword in need:
                search_terms.update(terms)

        # Also add words from the need itself
        search_terms.update(need.split())

        suggestions = []
        seen = set()
        for term in search_terms:
            for filename, flat in self.flat_tokens.items():
                for path, value in flat.items():
                    searchable = f"{path} {json.dumps(value)}".lower()
                    if term in searchable and path not in seen:
                        seen.add(path)
                        suggestions.append({
                            "token": path,
                            "file": filename,
                            "value": value
                        })

        if not suggestions:
            return json.dumps({
                "message": "No existing tokens match this need. You may need to create a new token.",
                "suggestions": []
            })

        return json.dumps({
            "count": len(suggestions),
            "suggestions": suggestions[:15]
        })

    def _scan_code_accessibility(self, params: dict) -> str:
        file_path = params["file_path"]
        content = params.get("file_content")

        if not content:
            try:
                with open(file_path, "r", encoding="utf-8") as f:
                    content = f.read()
            except (IOError, UnicodeDecodeError) as e:
                return json.dumps({"error": f"Could not read file: {e}"})

        findings = scan_file(file_path, content)
        report = format_audit_report({
            "summary": {
                "files_scanned": 1,
                "total_findings": len(findings),
                "critical": sum(1 for f in findings if f["severity"] == "critical"),
                "moderate": sum(1 for f in findings if f["severity"] == "moderate"),
                "minor": sum(1 for f in findings if f["severity"] == "minor"),
            },
            "findings": findings
        })
        return report

    def _scan_directory_accessibility(self, params: dict) -> str:
        directory = params["directory"]
        if not Path(directory).is_dir():
            return json.dumps({"error": f"Directory not found: {directory}"})

        results = scan_directory(directory)
        return format_audit_report(results)

    # ---------------------------------------------------------------------------
    # Command, Rule, Skill, User tools
    # ---------------------------------------------------------------------------

    def _list_commands(self, params: dict) -> str:
        """List all available commands."""
        if not self.commands:
            return json.dumps({"message": "No commands found", "commands": []})
        
        cmd_list = []
        for path, content in self.commands.items():
            # Extract first line as title/description
            first_line = content.strip().split("\n")[0] if content else "No description"
            cmd_list.append({
                "name": path,
                "title": first_line.replace("#", "").strip() if first_line.startswith("#") else path
            })
        
        return json.dumps({
            "count": len(cmd_list),
            "commands": sorted(cmd_list, key=lambda x: x["name"])
        })

    def _get_command(self, params: dict) -> str:
        """Get a specific command by name."""
        name = params["name"]
        
        # Try exact match first
        if name in self.commands:
            return json.dumps({
                "name": name,
                "content": self.commands[name]
            })
        
        # Try with .md extension
        if not name.endswith(".md"):
            name_with_ext = name + ".md"
            if name_with_ext in self.commands:
                return json.dumps({
                    "name": name_with_ext,
                    "content": self.commands[name_with_ext]
                })
        
        # Try partial match
        matches = [k for k in self.commands.keys() if name in k]
        if matches:
            return json.dumps({
                "name": matches[0],
                "content": self.commands[matches[0]],
                "note": f"Matched '{name}' to '{matches[0]}'"
            })
        
        return json.dumps({"error": f"Command '{name}' not found"})

    def _list_rules(self, params: dict) -> str:
        """List all available rules organized by category."""
        if not self.rules:
            return json.dumps({"message": "No rules found", "rules": {}, "count": 0})
        
        # Organize by category (folder)
        categories = {}
        for path, content in self.rules.items():
            parts = path.split("/")
            category = parts[0] if len(parts) > 1 else "general"
            
            if category not in categories:
                categories[category] = []
            
            first_line = content.strip().split("\n")[0] if content else "No description"
            categories[category].append({
                "path": path,
                "title": first_line.replace("#", "").strip() if first_line.startswith("#") else path
            })
        
        return json.dumps({
            "count": len(self.rules),
            "categories": categories
        })

    def _get_rule(self, params: dict) -> str:
        """Get a specific rule by path."""
        path = params["path"]
        
        # Try exact match first
        if path in self.rules:
            return json.dumps({
                "path": path,
                "content": self.rules[path]
            })
        
        # Try with .md extension
        if not path.endswith(".md"):
            path_with_ext = path + ".md"
            if path_with_ext in self.rules:
                return json.dumps({
                    "path": path_with_ext,
                    "content": self.rules[path_with_ext]
                })
        
        # Try partial match
        matches = [k for k in self.rules.keys() if path in k]
        if matches:
            return json.dumps({
                "path": matches[0],
                "content": self.rules[matches[0]],
                "note": f"Matched '{path}' to '{matches[0]}'"
            })
        
        return json.dumps({"error": f"Rule '{path}' not found"})

    def _list_skills(self, params: dict) -> str:
        """List all available skills."""
        if not self.skills:
            return json.dumps({"message": "No skills found", "skills": []})
        
        skill_list = []
        for path, content in self.skills.items():
            first_line = content.strip().split("\n")[0] if content else "No description"
            skill_list.append({
                "name": path,
                "title": first_line.replace("#", "").strip() if first_line.startswith("#") else path
            })
        
        return json.dumps({
            "count": len(skill_list),
            "skills": sorted(skill_list, key=lambda x: x["name"])
        })

    def _get_skill(self, params: dict) -> str:
        """Get a specific skill by name."""
        name = params["name"]
        
        # Try exact match first
        if name in self.skills:
            return json.dumps({
                "name": name,
                "content": self.skills[name]
            })
        
        # Try with .md extension
        if not name.endswith(".md"):
            name_with_ext = name + ".md"
            if name_with_ext in self.skills:
                return json.dumps({
                    "name": name_with_ext,
                    "content": self.skills[name_with_ext]
                })
        
        # Try partial match
        matches = [k for k in self.skills.keys() if name in k]
        if matches:
            return json.dumps({
                "name": matches[0],
                "content": self.skills[matches[0]],
                "note": f"Matched '{name}' to '{matches[0]}'"
            })
        
        return json.dumps({"error": f"Skill '{name}' not found"})

    def _list_users(self, params: dict) -> str:
        """List all user research documents."""
        if not self.users:
            return json.dumps({"message": "No user docs found", "docs": []})
        
        doc_list = []
        for path, content in self.users.items():
            first_line = content.strip().split("\n")[0] if content else "No description"
            doc_list.append({
                "name": path,
                "title": first_line.replace("#", "").strip() if first_line.startswith("#") else path
            })
        
        return json.dumps({
            "count": len(doc_list),
            "docs": sorted(doc_list, key=lambda x: x["name"])
        })

    def _get_user_doc(self, params: dict) -> str:
        """Get a specific user document by name."""
        name = params["name"]
        
        # Try exact match first
        if name in self.users:
            return json.dumps({
                "name": name,
                "content": self.users[name]
            })
        
        # Try with .md extension
        if not name.endswith(".md"):
            name_with_ext = name + ".md"
            if name_with_ext in self.users:
                return json.dumps({
                    "name": name_with_ext,
                    "content": self.users[name_with_ext]
                })
        
        # Try partial match
        matches = [k for k in self.users.keys() if name in k]
        if matches:
            return json.dumps({
                "name": matches[0],
                "content": self.users[matches[0]],
                "note": f"Matched '{name}' to '{matches[0]}'"
            })
        
        return json.dumps({"error": f"User doc '{name}' not found"})
