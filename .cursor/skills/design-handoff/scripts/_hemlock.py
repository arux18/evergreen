"""Shared helpers for the design-handoff scripts. Read-only: nothing here writes to the library."""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[4]
LIBRARY = ROOT / "pencil/design-system/in-progress/hemlock-library.lib.pen"
HANDOFF_DIR = ROOT / "pencil/design-system/in-progress/dark-mode-handoff"
THEME_AXIS = "🎨 Colors"
THEMES = ("Light", "Dark")
HEX = re.compile(r"^#[0-9A-Fa-f]{3,8}$")


def is_design_only(name):
    return name.startswith("sem-iosChrome") or name == "sem-dotGrid"


def css_name(name):
    return name.replace("/", "-")


def load_library(path=LIBRARY):
    return json.loads(Path(path).read_text())


def theme_value(var, theme):
    value = var["value"]
    if isinstance(value, list):
        for entry in value:
            if entry.get("theme", {}).get(THEME_AXIS) == theme:
                return entry["value"]
        return value[0]["value"]
    return value


def resolve(variables, value, theme, depth=0):
    while isinstance(value, str) and value.startswith("$") and depth < 20:
        target = variables.get(value[1:])
        if target is None:
            return value
        value = theme_value(target, theme)
        depth += 1
    return value


def exported_tokens(library):
    """Every app color token: {name: {theme: {"raw": ref-or-hex, "ref": name|None, "value": hex}}}."""
    variables = library["variables"]
    out = {}
    for name, var in variables.items():
        if var.get("type") != "color" or is_design_only(name):
            continue
        out[name] = {}
        for theme in THEMES:
            raw = theme_value(var, theme)
            ref = raw[1:] if isinstance(raw, str) and raw.startswith("$") else None
            out[name][theme] = {"raw": raw, "ref": ref, "value": str(resolve(variables, raw, theme)).upper()}
    return out


def norm_hex(value):
    v = str(value).strip().upper()
    if HEX.match(v) and len(v) == 4:
        v = "#" + "".join(c * 2 for c in v[1:])
    if HEX.match(v) and len(v) == 9 and v.endswith("FF"):
        v = v[:7]
    return v
