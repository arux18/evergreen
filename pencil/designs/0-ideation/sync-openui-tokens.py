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


def screen_axis(data):
    """Pick the theme axis a screen file already uses, else the switcher axis."""
    vs = data.get("variables", {})
    for v in vs.values():
        val = v.get("value")
        if isinstance(val, list):
            for e in val:
                t = e.get("theme") or {}
                for k, val2 in t.items():
                    if str(val2).lower() in ("light", "dark"):
                        return k, "light", "dark"  # reuse existing axis + casing
    return "🎨 Colors", "Light", "Dark"


def sync_screen(path: Path, hv: dict, write: bool):
    """Theme a screen file's variables from Hemlock (prefix-stripped lookup).

    - Prefixed vars (e.g. "G:colors-text-header") are flattened import copies —
      always re-synced to current Hemlock values.
    - Unprefixed vars already themed are re-synced unconditionally.
    - Unthemed local vars sync only if their current value (resolving local $refs)
      matches Hemlock's light value; anything else is reported as a possible
      intentional difference.
    """
    data = json.loads(path.read_text())
    vs = data.get("variables", {})
    if not vs:
        return [], [], []
    axis, light_v, dark_v = screen_axis(data)

    def local_resolve(value, depth=0):
        if isinstance(value, str) and value.startswith("$") and depth < 6:
            target = value[1:]
            target_def = vs.get(target) or vs.get(target.split(":", 1)[-1])
            if target_def is None and ":" in target:
                target_def = vs.get(target)
            if target_def is not None:
                tv = target_def.get("value")
                if isinstance(tv, list):
                    e = next((e for e in tv if any(str(x).lower() == "light" for x in (e.get("theme") or {}).values())), tv[0])
                    tv = e.get("value")
                return local_resolve(tv, depth + 1)
            return value
        return value

    changed, skipped, missing = [], [], []
    for name, definition in vs.items():
        base = name.split(":", 1)[1] if ":" in name else name
        hv_def = hv.get(base)
        if not hv_def:
            missing.append(name)
            continue
        hv_val = hv_def.get("value")
        if not isinstance(hv_val, list):
            continue
        cur = definition.get("value")
        already_themed = isinstance(cur, list)
        if not already_themed and ":" not in name:
            cur_resolved = local_resolve(cur)
            h_light = resolve(hv, base, {"_": "light"})
            if h_light is None or str(cur_resolved).lower() != str(h_light).lower():
                skipped.append(name)
                continue
        new_val = []
        for mode in ("light", "dark"):
            new_val.append({"value": resolve(hv, base, {"_": mode}),
                            "theme": {axis: light_v if mode == "light" else dark_v}})
        if cur != new_val:
            changed.append(name)
            if write:
                definition["value"] = new_val
    if changed and write:
        themes = data.get("themes")
        if not themes:
            data["themes"] = {"🎨 Colors": ["Light", "Dark"]}
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
    screens = HERE.parents[1] / "designs/4-approved"
    if screens.is_dir():
        print("\n--- screens (4-approved) ---")
        for sp in sorted(screens.glob("*.pen")):
            changed, skipped, missing = sync_screen(sp, hv, write)
            status = "would update" if not write else "updated"
            if changed:
                print(f"{sp.name}: {status} {len(changed)} token(s)")
            else:
                print(f"{sp.name}: in sync")
            if skipped:
                print(f"  left as-is (differ from Hemlock light): {len(skipped)}: {', '.join(skipped[:6])}{' …' if len(skipped) > 6 else ''}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
