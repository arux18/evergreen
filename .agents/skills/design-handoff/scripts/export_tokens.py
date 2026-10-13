#!/usr/bin/env python3
"""Export Hemlock color tokens to hemlock.light.css, hemlock.dark.css and hemlock.tokens.json.

Reads hemlock-library.lib.pen (never writes to it). If the output files already exist, their
header block, section order, token order and per-token comments are kept; only values change,
new tokens are appended to their section, and removed tokens are dropped and reported.

Usage:
  python3 export_tokens.py                 # write into dark-mode-handoff/
  python3 export_tokens.py --dry-run       # report what would change, write nothing
  python3 export_tokens.py --out DIR --library PATH
"""
import argparse
import json
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from _hemlock import HANDOFF_DIR, LIBRARY, css_name, exported_tokens, load_library  # noqa: E402

SECTIONS = [
    "PRIMITIVES",
    "SYSTEM: background",
    "SYSTEM: borders",
    "SYSTEM: text",
    "SYSTEM: icons",
    "BUTTONS",
    "NAV",
    "CHAT",
    "COMPONENT: toggle / tag / slider / pagination / card / misc",
    "CHARTS",
    "SHADOWS",
]
SELECTORS = {"Light": ":root", "Dark": 'html[data-theme="dark"]'}
FILES = {"Light": "hemlock.light.css", "Dark": "hemlock.dark.css"}
DEFAULT_HEADER = {
    "Light": "/* hemlock.light.css: Hemlock light theme, generated from hemlock-library.lib.pen. */\n\n",
    "Dark": "/* hemlock.dark.css: Hemlock dark theme, generated from hemlock-library.lib.pen.\n"
            "   Overrides hemlock.light.css under html[data-theme=\"dark\"]. */\n\n",
}
COMMENT_COL = 62
DECL = re.compile(r"^\s*--([A-Za-z0-9_-]+):\s*([^;]+);\s*(/\*.*\*/)?\s*$")
SECTION = re.compile(r"^\s*/\* ---- (.+?) ---- \*/\s*$")


def default_section(name):
    if name.startswith("prim-"):
        return "PRIMITIVES"
    for prefix, section in (("sem-background-", "SYSTEM: background"), ("sem-borders-", "SYSTEM: borders"),
                            ("sem-text-", "SYSTEM: text"), ("sem-icons-", "SYSTEM: icons"),
                            ("sem-btn", "BUTTONS"), ("sem-nav", "NAV"), ("sem-chat", "CHAT"),
                            ("chart", "CHARTS"), ("shadow-", "SHADOWS")):
        if name.startswith(prefix):
            return section
    return SECTIONS[8]


def parse_existing(path):
    """Return (header, [(section, [(css_token, comment)])]) from an existing CSS file, or None."""
    if not path.exists():
        return None
    text = path.read_text()
    lines = text.splitlines(keepends=True)
    start = next((i for i, line in enumerate(lines) if line.rstrip().endswith("{")), None)
    if start is None:
        return None
    header = "".join(lines[:start])
    sections, current = [], None
    for line in lines[start + 1:]:
        m = SECTION.match(line)
        if m:
            current = (m.group(1), [])
            sections.append(current)
            continue
        m = DECL.match(line)
        if m and current is not None:
            current[1].append((m.group(1), m.group(3)))
    return header, sections


def css_value(entry):
    return f"var(--{css_name(entry['ref'])})" if entry["ref"] else str(entry["raw"]).upper()


def build_css(theme, tokens, existing):
    by_css = {css_name(n): n for n in tokens}
    header, layout = existing if existing else (DEFAULT_HEADER[theme], [])
    placed, removed = set(), []
    order = {s: [] for s in SECTIONS}
    for section, decls in layout:
        order.setdefault(section, [])
        for token, comment in decls:
            if token in by_css:
                order[section].append((token, comment))
                placed.add(token)
            else:
                removed.append(token)
    added = sorted(t for t in by_css if t not in placed)
    for token in added:
        order[default_section(token)].append((token, None))
    out = [header, SELECTORS[theme] + " {\n"]
    for section, decls in order.items():
        if not decls:
            continue
        out.append(f"\n  /* ---- {section} ---- */\n")
        for token, comment in decls:
            line = f"  --{token}: {css_value(tokens[by_css[token]][theme])};"
            if comment:
                line = line.ljust(COMMENT_COL) + comment
            out.append(line + "\n")
    out.append("\n}\n")
    return "".join(out), added, removed


def build_json(tokens, existing_path):
    meta = {"$schema": "hemlock-tokens"}
    if existing_path.exists():
        meta = {k: v for k, v in json.loads(existing_path.read_text()).items() if k.startswith("$")}
    data = {}
    for name in sorted(tokens, key=css_name):
        data[css_name(name)] = {}
        for theme in ("Light", "Dark"):
            e = tokens[name][theme]
            data[css_name(name)][theme.lower()] = {"value": e["value"], **({"ref": css_name(e["ref"])} if e["ref"] else {})}
    return json.dumps({**meta, "tokens": data}, indent=2, ensure_ascii=False) + "\n"


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--library", default=str(LIBRARY))
    ap.add_argument("--out", default=str(HANDOFF_DIR))
    ap.add_argument("--dry-run", action="store_true")
    args = ap.parse_args()
    out = Path(args.out)
    tokens = exported_tokens(load_library(args.library))
    results = {}
    for theme in ("Light", "Dark"):
        path = out / FILES[theme]
        css, added, removed = build_css(theme, tokens, parse_existing(path))
        results[path] = css
        changed = not path.exists() or path.read_text() != css
        print(f"{FILES[theme]}: {len(tokens)} tokens, {len(added)} added, {len(removed)} removed, "
              f"{'changed' if changed else 'unchanged'}")
        for t in added:
            print(f"  + {t}")
        for t in removed:
            print(f"  - {t}")
    json_path = out / "hemlock.tokens.json"
    results[json_path] = build_json(tokens, json_path)
    print(f"hemlock.tokens.json: {'changed' if not json_path.exists() or json_path.read_text() != results[json_path] else 'unchanged'}")
    if args.dry_run:
        print("Dry run: nothing written.")
        return
    out.mkdir(parents=True, exist_ok=True)
    for path, content in results.items():
        path.write_text(content)


if __name__ == "__main__":
    main()
