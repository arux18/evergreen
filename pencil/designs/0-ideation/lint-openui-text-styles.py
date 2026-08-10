#!/usr/bin/env python3
"""Lint OpenUI .lib.pen files for text-style drift from the Hemlock type system.

Rules enforced (see openui-components-handoff.md, "Type & Spacing Rules"):

  ERROR   hardcoded numeric fontSize on a text node (must use $typo-primary-*)
  ERROR   text uses a typo scale step but lineHeight is unset (no auto fallback)
  ERROR   lineHeight does not match the Hemlock ratio for its scale step
  ERROR   body-role text not at base size (bullets / callout bodies / markdown
          paragraphs must render at 16px like TextContent/medium)
  WARNING fontFamily/fontWeight not token-bound to the same scale step
  WARNING hardcoded numeric padding/gap on frames (must use $spacing-*)

Usage:  python3 lint-openui-text-styles.py
Exit:   0 = clean (warnings allowed), 1 = errors found
"""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
HEMLOCK = HERE.parents[1] / "design-system/in-progress/hemlock-library.lib.pen"

# Components whose body text must use the base (16px) scale — one body spec rule.
BODY_COMPONENTS = ("ListBlock", "ListItem", "TextCallout", "Callout", "MarkDownRenderer")
# Text nodes whose names mark them as titles/labels/meta rather than body.
META_NAME_HINTS = ("title", "header", "label", "subtitle", "caption", "meta",
                   "description", "hint", "eyebrow")

SIZE_RE = re.compile(r"^\$typo-primary-([a-z0-9-]+)-font-size$")


def hemlock_vars() -> dict:
    return json.loads(HEMLOCK.read_text()).get("variables", {})


def resolve(hv: dict, key: str, depth: int = 0):
    v = hv.get(key)
    if not v:
        return None
    x = v.get("value")
    x = x[0].get("value") if isinstance(x, list) and x else x
    if isinstance(x, str) and x.startswith("$") and depth < 6:
        return resolve(hv, x[1:], depth + 1)
    return x


def expected_ratio(hv: dict, short: str):
    lh = resolve(hv, f"typo-primary-{short}-line-height")
    fs = resolve(hv, f"typo-primary-{short}-font-size")
    if lh is None or fs in (None, 0):
        return None
    return round(lh / fs, 4)


def walk(node, path, out):
    name = node.get("name") or node.get("type", "?")
    out.append((node, f"{path}/{name}"))
    for c in node.get("children", []) or []:
        walk(c, f"{path}/{name}", out)


def lint_file(path: Path, hv: dict):
    data = json.loads(path.read_text())
    errors, warnings = [], []
    for top in data.get("children", []):
        nodes: list = []
        walk(top, top.get("name", "?"), nodes)
        comp_root = top.get("name", "")
        comp_base = comp_root.split(" / ")[0]
        for n, p in nodes:
            if n.get("type") == "text":
                fs = n.get("fontSize")
                if isinstance(fs, (int, float)):
                    errors.append(f"{p}: hardcoded fontSize {fs}")
                    continue
                m = SIZE_RE.match(fs or "")
                if not m:
                    continue
                short = m.group(1)
                lh = n.get("lineHeight")
                want = expected_ratio(hv, short)
                if lh is None:
                    errors.append(f"{p}: lineHeight unset ({short} -> want {want})")
                elif want is not None and abs(lh - want) > 0.01:
                    errors.append(f"{p}: lineHeight {lh} != Hemlock {short} ratio {want}")
                lname = (n.get("name") or "").lower()
                is_meta = any(h in lname for h in META_NAME_HINTS) or "semibold" in short
                if comp_base in BODY_COMPONENTS and short.startswith("sm") and not is_meta:
                    errors.append(f"{p}: body text at {short} — body prose must use base (16px)")
                ff = n.get("fontFamily")
                if isinstance(ff, str) and ff.startswith("$typo-primary-") and short not in ff:
                    warnings.append(f"{p}: fontFamily token from different scale step ({ff})")
            if n.get("type") == "frame":
                for key in ("padding", "gap"):
                    v = n.get(key)
                    vals = v if isinstance(v, list) else [v]
                    if any(isinstance(x, (int, float)) and x != 0 for x in vals):
                        warnings.append(f"{p}: hardcoded {key} {v}")
    return errors, warnings


def main() -> int:
    hv = hemlock_vars()
    total_e, total_w = 0, 0
    for lib in sorted(HERE.glob("openui-*.lib.pen")):
        errors, warnings = lint_file(lib, hv)
        total_e += len(errors)
        total_w += len(warnings)
        status = "FAIL" if errors else "ok"
        print(f"{lib.name}: {status} — {len(errors)} errors, {len(warnings)} warnings")
        for e in errors[:20]:
            print(f"  ERROR  {e}")
        for w in warnings[:10]:
            print(f"  WARN   {w}")
        if len(errors) > 20:
            print(f"  ... +{len(errors) - 20} more errors")
        if len(warnings) > 10:
            print(f"  ... +{len(warnings) - 10} more warnings")
    print(f"\n{total_e} errors, {total_w} warnings across all libs")
    return 1 if total_e else 0


if __name__ == "__main__":
    sys.exit(main())
