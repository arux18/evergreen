#!/usr/bin/env python3
"""Sync OpenUI .lib.pen token values from the Hemlock library (the source of truth).

Hemlock (`pencil/design-system/in-progress/hemlock-library.lib.pen`) stores every
variable as themed entries (light + dark). The OpenUI libs and screen files cannot
import those values (Pencil does not resolve variables across files), so each file
carries a local copy. This script is the photocopier: it rewrites every local copy
to match Hemlock, per theme.

Usage:
  python3 sync-openui-tokens.py            # dry run — report what would change
  python3 sync-openui-tokens.py --write    # apply the sync to all lib files
  python3 sync-openui-tokens.py --check    # gate — exit 1 if any file differs from Hemlock

When dark variants land in Hemlock: run with --write, then --check, then open the
files in Pencil for a visual pass and commit.

Theme-axis note: Hemlock keys most themed entries to its "0. mode" axis (light/dark)
and chart scales to "🎨 Colors" (Light/Dark). The Pencil toolbar theme switcher (and
the node pins it creates) operates on "🎨 Colors", so this script writes lib entries
keyed to "🎨 Colors": Light/Dark — otherwise the switcher does nothing in the libs.
Hemlock itself is never modified.

KNOWN_DIFFERENCES below lists tokens that are deliberately NOT Hemlock's values
(e.g. the actions-lib blue button system, approved 2026-08-10). They are skipped
and reported. When a dark variant for one of these is designed and added to
Hemlock, remove the entry here so it syncs like everything else.
"""

from __future__ import annotations

import json
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
HEMLOCK = HERE.parents[1] / "design-system/in-progress/hemlock-library.lib.pen"

# Tokens intentionally different from Hemlock, keyed by (file name, token name).
# Everything not listed here must match Hemlock exactly, in both themes.
# When a dark variant for one of these is added to Hemlock, remove the entry
# so it syncs like everything else.
KNOWN_DIFFERENCES = {
    ("openui-actions.lib.pen", "colors-borders-light"): "blue-100 secondary-disabled border, approved 2026-08-10",
    ("openui-actions.lib.pen", "colors-text-placeholder"): "blue-300 disabled text/icon, approved 2026-08-10",
}


def load_hemlock():
    data = json.loads(HEMLOCK.read_text())
    return data.get("variables", {}), data.get("themes")


def resolve(hv: dict, key: str, theme_dict, depth: int = 0):
    """Resolve a Hemlock variable to a literal, following $ chains, honoring theme."""
    v = hv.get(key)
    if not v:
        return None
    x = v.get("value")
    if isinstance(x, list):
        pick = None
        tval = next(iter(theme_dict.values()), None) if theme_dict else None
        for e in x:
            et = e.get("theme") or {}
            if tval is not None and any(str(tv).lower() == str(tval).lower() for tv in et.values()):
                pick = e
                break
        if pick is None:
            pick = next((e for e in x if not e.get("theme")), x[0] if x else None)
        if pick is None:
            return None
        x = pick.get("value")
    if isinstance(x, str) and x.startswith("$") and depth < 8:
        return resolve(hv, x[1:], theme_dict, depth + 1)
    return x


def current_light(value):
    if isinstance(value, list):
        e = next(
            (e for e in value if any(str(tv).lower() == "light" for tv in (e.get("theme") or {}).values())),
            value[0] if value else None,
        )
        return e.get("value") if e else None
    return value


def canonical_theme(td):
    """Map Hemlock's theme axes onto the switcher axis used in the libs."""
    if not td:
        return td
    vals = [str(v).lower() for v in td.values()]
    if "light" in vals:
        return {"🎨 Colors": "Light"}
    if "dark" in vals:
        return {"🎨 Colors": "Dark"}
    return td


def sync_file(path: Path, hv: dict, themes, write: bool):
    """Returns (changed, skipped, missing) lists of variable names."""
    data = json.loads(path.read_text())
    vs = data.get("variables", {})
    changed, skipped, missing = [], [], []
    for name, definition in vs.items():
        hv_def = hv.get(name)
        if not hv_def:
            missing.append(name)
            continue
        if (path.name, name) in KNOWN_DIFFERENCES:
            skipped.append(name)
            continue
        hv_val = hv_def.get("value")
        if not isinstance(hv_val, list):
            # single-valued in Hemlock — sync plain value
            target = resolve(hv, name, None)
            if definition.get("value") != target:
                changed.append(name)
                if write:
                    definition["value"] = target
            continue
        # themed in Hemlock — rebuild themed entries on the switcher axis
        new_val = []
        for e in hv_val:
            td = canonical_theme(e.get("theme"))
            raw = e.get("value")
            if isinstance(raw, str) and raw.startswith("$"):
                raw = resolve(hv, raw[1:], e.get("theme"))
            new_val.append({"value": raw, "theme": td})
        if definition.get("value") != new_val:
            changed.append(name)
            if write:
                definition["value"] = new_val
    if changed and write:
        if themes:
            data["themes"] = themes
        path.write_text(json.dumps(data, indent=2) + "\n")
    return changed, skipped, missing


def main() -> int:
    write = "--write" in sys.argv
    check = "--check" in sys.argv
    hv, themes = load_hemlock()
    any_diff = False
    for lib in sorted(HERE.glob("openui-*.lib.pen")):
        changed, skipped, missing = sync_file(lib, hv, themes, write)
        status = "would update" if not write else "updated"
        if changed:
            any_diff = True
            print(f"{lib.name}: {status} {len(changed)} token(s): {', '.join(changed[:8])}{' …' if len(changed) > 8 else ''}")
        else:
            print(f"{lib.name}: in sync")
        if missing:
            print(f"  note: {len(missing)} local-only token(s) not in Hemlock (legacy aliases etc.): {', '.join(missing[:6])}{' …' if len(missing) > 6 else ''}")
        if skipped:
            print(f"  skipped {len(skipped)} known difference(s): {', '.join(skipped[:6])}{' …' if len(skipped) > 6 else ''}")
    if check:
        if any_diff:
            print("\nDRIFT DETECTED — run `python3 sync-openui-tokens.py --write` and review in Pencil before committing.")
            return 1
        print("\nAll lib tokens match Hemlock (both themes).")
    return 0


if __name__ == "__main__":
    sys.exit(main())
