#!/usr/bin/env python3
"""Migrate OpenUI .lib.pen files to import Hemlock and use prefixed token refs."""

from __future__ import annotations

import json
import re
from pathlib import Path

HEMLOCK_IMPORT = "../../design-system/in-progress/hemlock-library.lib.pen"
PREFIX = "H"

# Local token name -> Hemlock token name (when names differ)
SHARED_LOCAL_TO_HEMLOCK: dict[str, str] = {
    "bg": "colors-background-main",
    "border": "colors-borders-dark",
    "divider": "colors-borders-light",
    "hover.bg": "color-taupe-200",
    "pressed.bg": "color-taupe-300",
    "active.bg": "color-gray-200",
    "icon": "colors-icons-meta",
    "icon.disabled": "colors-icons-muted",
    "radius": "radius-xs",
    "radius.full": "radius-full",
    "shadow": "colors-shadow-sm",
    "text.primary": "colors-text-header",
    "text.secondary": "colors-text-meta",
    "text.disabled": "colors-text-placeholder",
    "btn.primary.bg": "colors-btnPrimaryBg",
    "btn.primary.text": "colors-btnPrimaryText",
    "btn.primary.hover": "colors-btnPrimaryBgHover",
    "btn.primary.pressed": "colors-btnPrimaryBgActive",
    "btn.primary.disabled.bg": "colors-btnPrimaryBgDisabled",
    "btn.primary.disabled.text": "colors-btnPrimaryTextDisabled",
    "btn.secondary.bg": "colors-btnPrimaryInvertedBg",
    "btn.secondary.border": "colors-borders-dark",
    "btn.secondary.hover.bg": "color-gray-100",
    "btn.secondary.pressed.bg": "color-gray-200",
    "btn.ghost.bg": "colors-btnSecondaryBg",
    "btn.ghost.hover.bg": "colors-btnSecondaryBgHover",
    "btn.ghost.pressed.bg": "colors-btnSecondaryBgActive",
    "chip.bg": "color-gray-50",
    "chip.border": "colors-borders-dark",
    "chip.hover.bg": "color-gray-100",
    "chip.pressed.bg": "color-gray-200",
    "chip.radius": "radius-full",
    "callout.info.bg": "color-sky-50",
    "callout.info.border": "color-sky-100",
    "callout.info.icon": "color-sky-600",
    "callout.success.bg": "color-green-50",
    "callout.success.border": "color-green-100",
    "callout.success.icon": "color-green-600",
    "callout.warning.bg": "color-orange-50",
    "callout.warning.border": "color-orange-100",
    "callout.warning.icon": "color-orange-600",
    "callout.error.bg": "color-red-50",
    "callout.error.border": "color-red-100",
    "callout.error.icon": "color-red-600",
    "skeleton.bg": "color-taupe-200",
    "skeleton.shimmer": "color-taupe-100",
    # OpenUI-only names mapped to nearest Hemlock semantic tokens
    "colors-code-bg": "color-gray-900",
    "colors-code-border": "colors-borders-dark",
    "colors-code-text": "colors-text-reverse",
    "colors-image-placeholder": "color-gray-100",
    "color-yellow-100": "color-orange-50",
    "color-yellow-700": "color-orange-700",
    "chart-color-01": "chart-categorical/color-01",
    "chart-color-02": "chart-categorical/color-02",
    "chart-color-03": "chart-categorical/color-03",
    "chart-color-04": "chart-categorical/color-04",
    "chart-color-05": "chart-categorical/color-05",
    "chart-color-06": "chart-categorical/color-06",
}

HEX_TO_HEMLOCK: dict[str, str] = {
    "#F7F5F0": "color-taupe-100",
    "#EDEAE3": "color-taupe-200",
    "#E3DFD6": "color-taupe-300",
    "#EEEDEB": "color-gray-100",
    "#D5D3D0": "color-gray-200",
    "#DCD8CB": "color-gray-200",
    "#FFFFFF": "colors-background-surface",
    "#ffffff": "colors-background-surface",
    "#00000014": "colors-shadow-sm",
}

HEMLOCK_PATH = Path(__file__).resolve().parents[2] / "design-system/in-progress/hemlock-library.lib.pen"
HEMLOCK_VARS = set(json.loads(HEMLOCK_PATH.read_text()).get("variables", {}).keys())


def hemlock_name(local_name: str) -> str:
    return SHARED_LOCAL_TO_HEMLOCK.get(local_name, local_name)


def migrate_ref(value: str) -> str:
    if not isinstance(value, str) or not value.startswith("$"):
        return value
    if value.startswith(f"${PREFIX}:"):
        return value
    local = value[1:]
    target = hemlock_name(local)
    if target not in HEMLOCK_VARS and local in HEMLOCK_VARS:
        target = local
    if target not in HEMLOCK_VARS:
        raise KeyError(f"No Hemlock token for local ref ${local} -> {target}")
    return f"${PREFIX}:{target}"


def migrate_node(obj):
    if isinstance(obj, dict):
        for key, val in list(obj.items()):
            if key in {"fill", "stroke", "color"} and isinstance(val, str):
                if val.startswith("#") and val in HEX_TO_HEMLOCK:
                    obj[key] = migrate_ref("$" + HEX_TO_HEMLOCK[val])
                elif val.startswith("$"):
                    obj[key] = migrate_ref(val)
            elif key in {
                "fontFamily",
                "fontSize",
                "fontWeight",
                "cornerRadius",
                "gap",
                "padding",
                "width",
                "height",
                "strokeWidth",
                "letterSpacing",
                "lineHeight",
            }:
                if isinstance(val, str) and val.startswith("$"):
                    obj[key] = migrate_ref(val)
                elif isinstance(val, list):
                    obj[key] = [
                        migrate_ref(v) if isinstance(v, str) and v.startswith("$") else v
                        for v in val
                    ]
            elif key == "colors" and isinstance(val, list):
                for stop in val:
                    if isinstance(stop, dict) and isinstance(stop.get("color"), str):
                        c = stop["color"]
                        if c.startswith("#") and c in HEX_TO_HEMLOCK:
                            stop["color"] = migrate_ref("$" + HEX_TO_HEMLOCK[c])
                        elif c.startswith("$"):
                            stop["color"] = migrate_ref(c)
            else:
                migrate_node(val)
    elif isinstance(obj, list):
        for item in obj:
            migrate_node(item)


def migrate_file(path: Path) -> None:
    data = json.loads(path.read_text())
    data.pop("variables", None)
    data["imports"] = {PREFIX: HEMLOCK_IMPORT}
    migrate_node(data)
    path.write_text(json.dumps(data, indent=2) + "\n")
    print(f"migrated {path.name}")


if __name__ == "__main__":
    base = Path(__file__).parent
    for name in [
        "openui-feedback.lib.pen",
        "openui-layout.lib.pen",
        "openui-forms.lib.pen",
        "openui-actions.lib.pen",
        "openui-data-display.lib.pen",
    ]:
        migrate_file(base / name)
