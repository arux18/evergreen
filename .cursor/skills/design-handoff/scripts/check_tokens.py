#!/usr/bin/env python3
"""Check handoff token files (or an app's own CSS) against hemlock-library.lib.pen, token by token.

CSS: blocks whose selector mentions "dark" are read as Dark; every other block is Light. Dark
inherits Light declarations it does not override, the same as the cascade. var() chains resolve
across all files passed in. JSON: the hemlock.tokens.json shape ({tokens: {name: {light, dark}}}).

Exit code 0 when everything matches, 1 otherwise.

Usage:
  python3 check_tokens.py                                   # check the dark-mode-handoff package
  python3 check_tokens.py app/theme.css app/dark.css        # check an app's CSS
  python3 check_tokens.py styles.css --prefix hemlock-      # app vars are named --hemlock-sem-...
  python3 check_tokens.py --refs                            # also flag tokens that point at a different token
"""
import argparse
import json
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from _hemlock import HANDOFF_DIR, LIBRARY, css_name, exported_tokens, load_library, norm_hex  # noqa: E402

BLOCK = re.compile(r"([^{}]+)\{([^{}]*)\}", re.S)
DECL = re.compile(r"--([A-Za-z0-9_-]+)\s*:\s*([^;]+);")
VAR = re.compile(r"^var\(--([A-Za-z0-9_-]+)\s*(?:,[^)]*)?\)$")


def read_css(paths, prefix):
    themes = {"Light": {}, "Dark": {}}
    for path in paths:
        text = re.sub(r"/\*.*?\*/", "", Path(path).read_text(), flags=re.S)
        for selector, body in BLOCK.findall(text):
            theme = "Dark" if "dark" in selector.lower() else "Light"
            for name, value in DECL.findall(body):
                if prefix and name.startswith(prefix):
                    name = name[len(prefix):]
                themes[theme][name] = value.strip()
    themes["Dark"] = {**themes["Light"], **themes["Dark"]}
    return themes


def resolve_css(decls, name, prefix):
    value, ref, seen = decls.get(name), None, set()
    while value is not None:
        m = VAR.match(value)
        if not m:
            return norm_hex(value), ref
        target = m.group(1)[len(prefix):] if prefix and m.group(1).startswith(prefix) else m.group(1)
        ref = ref or target
        if target in seen:
            return "CYCLE", ref
        seen.add(target)
        value = decls.get(target)
    return None, ref


def read_json(path):
    tokens = json.loads(Path(path).read_text())["tokens"]
    out = {"Light": {}, "Dark": {}}
    for name, entry in tokens.items():
        for theme in out:
            e = entry.get(theme.lower(), {})
            out[theme][name] = (norm_hex(e.get("value")), e.get("ref"))
    return out


def compare(label, found, library, check_refs):
    problems = 0
    for theme in ("Light", "Dark"):
        expected = {css_name(n): t[theme] for n, t in library.items()}
        missing = sorted(set(expected) - set(found[theme]))
        mismatched, ref_diff = [], []
        for name in sorted(set(expected) & set(found[theme])):
            value, ref = found[theme][name]
            want = expected[name]
            if value != norm_hex(want["value"]):
                mismatched.append(f"{name}: has {value}, library {want['value']}")
            elif check_refs and want["ref"] and ref != css_name(want["ref"]):
                ref_diff.append(f"{name}: points at {ref}, library points at {css_name(want['ref'])}")
        n_bad = len(missing) + len(mismatched) + len(ref_diff)
        problems += n_bad
        print(f"{label} [{theme}]: {len(expected)} library tokens · {len(missing)} missing · "
              f"{len(mismatched)} mismatches" + (f" · {len(ref_diff)} ref differences" if check_refs else ""))
        for line in [f"  missing: {m}" for m in missing] + [f"  mismatch: {m}" for m in mismatched] + [f"  ref: {r}" for r in ref_diff]:
            print(line)
    return problems


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("files", nargs="*")
    ap.add_argument("--library", default=str(LIBRARY))
    ap.add_argument("--prefix", default="", help="strip this prefix from app variable names before comparing")
    ap.add_argument("--refs", action="store_true", help="also require each token to point at the same token as the library")
    args = ap.parse_args()
    library = exported_tokens(load_library(args.library))
    files = args.files or [str(HANDOFF_DIR / f) for f in ("hemlock.light.css", "hemlock.dark.css", "hemlock.tokens.json")]
    css = [f for f in files if f.endswith(".css")]
    problems = 0
    if css:
        decls = read_css(css, args.prefix)
        found = {t: {n: resolve_css(decls[t], n, args.prefix) for n in decls[t]} for t in decls}
        problems += compare("CSS (" + ", ".join(Path(f).name for f in css) + ")", found, library, args.refs)
    for f in files:
        if f.endswith(".json"):
            problems += compare(Path(f).name, read_json(f), library, args.refs)
    print("RESULT: all tokens match the library." if problems == 0 else f"RESULT: {problems} problem(s).")
    sys.exit(0 if problems == 0 else 1)


if __name__ == "__main__":
    main()
