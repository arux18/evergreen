#!/usr/bin/env python3
"""Audit a design .pen file against the Hemlock handoff rules. Read-only.

Reads the SAVED file on disk. Unsaved canvas edits are not included; have the user press Cmd+S first.

Checks:
  hardcoded     raw hex on fills, strokes, text and effects (transparent and disabled fills skipped)
  primitive     fills/strokes/effects bound to prim-* tokens
  unknown       token references that exist in neither the library nor the file
  font          fontFamily other than Heebo / Noto Serif / a font token
  role          surface-role suspects: floating or control layers on main/surface, screens on elevated
  panel         chat/nav panels not on sem-chatShadow / sem-navShadow and sem-chatBorder / sem-navBorder
  dotgrid       dot-grid layers or sem-dotGrid use
  devnote       top-level "Dev note" frames that should be native context notes
  note-overlap  context notes overlapping a top-level node (uses the 219px height Pencil renders
                for a height-0 note; confirm live via the MCP bounds check)

Usage:
  python3 audit_pen.py path/to/file.pen
  python3 audit_pen.py path/to/file.pen --json
"""
import argparse
import json
import re
import sys
from collections import Counter, defaultdict
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from _hemlock import HEX, LIBRARY, load_library  # noqa: E402

FONTS_OK = {"Heebo", "Noto Serif"}
FLOATING = re.compile(r"card|dialog|modal|popup|popover|sheet|tooltip|drawer|dropdown|menu|toast|input|field|digit|select|textarea", re.I)
REF = re.compile(r"^\$(?:([A-Za-z0-9_-]+):)?(.+)$")


def colors_in(value):
    """Yield color strings from a fill/stroke/effect value, skipping disabled entries."""
    if isinstance(value, str):
        yield value
    elif isinstance(value, list):
        for v in value:
            yield from colors_in(v)
    elif isinstance(value, dict):
        if value.get("enabled") is False:
            return
        for key in ("color", "fill"):
            if key in value:
                yield from colors_in(value[key])
        for stop in value.get("colors") or []:
            yield from colors_in(stop)


def is_transparent(hex_value):
    v = hex_value.upper()
    return len(v) == 9 and v.endswith("00")


RENDERED_NOTE_HEIGHT = 219


def estimate_note_height(node):
    return node.get("height") or RENDERED_NOTE_HEIGHT


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("pen")
    ap.add_argument("--library", default=str(LIBRARY))
    ap.add_argument("--json", action="store_true")
    args = ap.parse_args()

    doc = json.loads(Path(args.pen).read_text())
    lib_vars = set(load_library(args.library)["variables"])
    local_vars = set((doc.get("variables") or {}).keys())
    lib_prefixes = {k for k, v in (doc.get("imports") or {}).items() if "hemlock-library" in v}
    findings = defaultdict(Counter)
    examples = defaultdict(dict)

    def flag(check, key, node, top):
        findings[check][key] += 1
        examples[check].setdefault(key, f"{node.get('id')} '{node.get('name', '')}' in '{top}'")

    def check_color(prop, value, node, top):
        for c in colors_in(value):
            if not isinstance(c, str):
                continue
            if HEX.match(c):
                if not is_transparent(c):
                    flag("hardcoded", f"{prop} {c.upper()} on '{node.get('name', '')}'", node, top)
                continue
            m = REF.match(c)
            if not m:
                continue
            prefix, token = m.groups()
            if token.startswith("prim-"):
                flag("primitive", f"{prop} ${token}", node, top)
            if token == "sem-dotGrid":
                flag("dotgrid", "sem-dotGrid in use", node, top)
            known = token in lib_vars if prefix in lib_prefixes else token in local_vars or token in lib_vars
            if not known:
                flag("unknown", f"{prop} {c}", node, top)

    def token_of(value):
        m = REF.match(value) if isinstance(value, str) else None
        return m.group(2) if m else None

    def visit(node, top, is_top):
        if not isinstance(node, dict):
            return
        name = node.get("name") or ""
        kind = node.get("type")
        text_prefix = "text " if kind == "text" else ""
        for prop in ("fill", "stroke"):
            if prop in node:
                check_color(text_prefix + prop, node[prop], node, top)
        if node.get("effect"):
            check_color("effect", node["effect"], node, top)
        for override in (node.get("descendants") or {}).values():
            if isinstance(override, dict):
                for prop in ("fill", "stroke", "effect"):
                    if prop in override:
                        check_color("override " + prop, override[prop], node, top)
        font = node.get("fontFamily")
        if isinstance(font, str) and not font.startswith("$") and font not in FONTS_OK:
            flag("font", font, node, top)
        fill_token = token_of(node.get("fill"))
        if fill_token in ("sem-background-main", "sem-background-surface") and FLOATING.search(name) and not is_top:
            flag("role", f"'{name}' on {fill_token} (floating/control layers use sem-background-elevated)", node, top)
        if is_top and kind == "frame" and fill_token == "sem-background-elevated":
            flag("role", f"screen '{name}' on sem-background-elevated (screens use main; content areas use surface)", node, top)
        lowered = name.lower()
        for panel in ("chat", "nav"):
            if re.search(rf"\b{panel}\b.*\bpanel\b", lowered) and kind == "frame":
                effect = node.get("effect")
                effect_token = token_of(effect.get("color")) if isinstance(effect, dict) else None
                if effect and effect_token != f"sem-{panel}Shadow":
                    flag("panel", f"'{name}' shadow is {effect_token or 'hardcoded'} (want sem-{panel}Shadow)", node, top)
                stroke_token = token_of(node.get("stroke"))
                if node.get("stroke") and stroke_token != f"sem-{panel}Border":
                    flag("panel", f"'{name}' border is {stroke_token or 'hardcoded'} (want sem-{panel}Border)", node, top)
        if re.search(r"dot\s*-?grid", lowered):
            flag("dotgrid", f"layer '{name}'", node, top)
        for child in node.get("children") or []:
            visit(child, top, False)

    tops = doc.get("children") or []
    for node in tops:
        visit(node, node.get("name") or node.get("id"), True)
        if node.get("type") == "frame" and re.match(r"(dev\s*note|note)\b", (node.get("name") or ""), re.I):
            flag("devnote", "dev-note frame (convert to a native context note)", node, node.get("name"))

    boxes = [n for n in tops if n.get("type") != "context" and isinstance(n.get("width"), (int, float))
             and isinstance(n.get("height"), (int, float)) and "x" in n and "y" in n]
    for note in (n for n in tops if n.get("type") == "context"):
        nx, ny, nw, nh = note["x"], note["y"], note.get("width", 340), estimate_note_height(note)
        for box in boxes:
            if nx < box["x"] + box["width"] and box["x"] < nx + nw and ny < box["y"] + box["height"] and box["y"] < ny + nh:
                flag("note-overlap", f"note '{note.get('name')}' over '{box.get('name') or box.get('id')}'", note, note.get("name"))

    if args.json:
        print(json.dumps({c: [{"finding": k, "count": v, "example": examples[c][k]} for k, v in f.most_common()]
                          for c, f in findings.items()}, indent=2, ensure_ascii=False))
        return
    order = ["hardcoded", "primitive", "unknown", "font", "role", "panel", "dotgrid", "devnote", "note-overlap"]
    print(f"Audit: {Path(args.pen).name}")
    for check in order:
        total = sum(findings[check].values())
        print(f"\n[{check}] {total}")
        for key, count in findings[check].most_common(40):
            print(f"  {count:4}  {key}   e.g. {examples[check][key]}")
        if len(findings[check]) > 40:
            print(f"  ... {len(findings[check]) - 40} more kinds")
    print("\nnote-overlap assumes Pencil's rendered note height; confirm with the live MCP bounds check in SKILL.md.")


if __name__ == "__main__":
    main()
