# Moving `.pen` Files Without Losing Tokens — Agent Guide

**Read this before moving, renaming, or reorganizing any `.pen` file.**

Moving a `.pen` file through the Pencil UI silently destroys every design token
binding in it. The file still opens, so the damage is easy to miss until someone
notices the styling is gone. This guide explains the mechanism and gives the
safe procedure.

Related: `.cursor/rules/pencil-pen-file-editing.mdc` covers *editing* an open
`.pen` file. This guide covers *relocating* files, which needs the opposite
approach — see "Why direct disk edits are correct here".

---

## TL;DR for the agent

1. Ask the user to **close every `.pen` tab in Pencil** and confirm. Do not skip this.
2. Move the files with `git mv`.
3. **Recompute every relative path in each moved file's `imports` block** — use the script below, not manual string surgery.
4. Also fix any *other* file that imported a file you moved.
5. Have the user open one moved file and confirm the styling is intact **before** committing.
6. If anything looks wrong, tell them: **do not save, do not close the tab.**

Never move a `.pen` file by dragging it in Pencil, by "Save As" into another
folder, or by any Pencil-side operation.

---

## How library links are stored

Every `.pen` file that uses a shared library ends with an `imports` block that
maps a **prefix** to a **path relative to that file's own location**:

```json
"imports": {
  "H": "../../design-system/in-progress/hemlock-library.lib.pen"
}
```

Two properties of this block drive everything below.

**The path is relative to the file.** Move the file one directory deeper and the
path no longer resolves.

**The prefix is baked into every reference in the file.** With prefix `H`, token
bindings look like `"fill": "$H:sem-btnPrimaryBg"`. The prefix is not a stable
property of the library — it is assigned per import. The same Hemlock library is
imported as `H`, `k`, `g`, `t`, `p`, `U`, `s`, `T`, `y`, `O`, and `G` in
different files in this repo. So a reference written as `$H:` only resolves in a
file whose `imports` block maps `H` to that library.

A file can import **several** libraries — `View-Presentation-Ideation.pen`
imports eight. Some paths point at a sibling file and carry no `../` at all
(`"i": "openui-content.lib.pen"`). Any repair has to handle every entry, not
just the first.

---

## What actually goes wrong

### Failure 1 — Pencil discards bindings instead of reporting an error

When the library path does not resolve, Pencil does not warn. It drops every
token reference and substitutes hardcoded defaults. A text node that read

```json
"fill": "$k:sem-text-body",
"fontFamily": "$k:font-primary",
"fontSize": "$k:text-size-lg"
```

becomes

```json
"fill": "#000000",
"fontFamily": "Inter",
"fontSize": 14
```

The file opens and renders. It just quietly lost its design system.

### Failure 2 — the loss is written to disk on save or close

Opening a relocated file only corrupts Pencil's **in-memory** model; the bytes on
disk are still fine. The extension then writes that model back to disk when the
file is saved or closed. That is the moment the work is actually lost.

This is why step 6 above matters: as long as nothing was saved, no recovery is
needed at all.

### Failure 3 — relocating via Pencil also reassigns the prefix

Pencil does recompute the path correctly when it moves a file itself. But it
issues a **new** prefix in the process, which orphans every existing `$OLD:`
reference. Measured on `actions.pen` during the `hemlock-restyle/` migration:

| | Before | After moving via Pencil |
|---|---|---|
| `$H:` token references | 242 | 0 |
| Raw hex fills | 0 | 74 |
| Import prefix | `H` | `f` |

Because of Failure 3, "just re-attach the library after moving" does **not**
work. Re-attaching produces yet another prefix and leaves the references
dangling.

---

## Safe procedure

### Step 1 — Close everything in Pencil

Ask the user to close all `.pen` tabs and wait for confirmation. If a moved file
is still open, the extension will write its stale model back to the **old** path
when the tab closes, recreating a corrupted file where you just removed one.

### Step 2 — Record the "before" state

Parse the JSON rather than grepping. Prefixes are not always letters — this repo
has one spelled `"8"` and others spelled `"forms"` and `"actions"` — so a
`[A-Za-z]+` pattern will silently miss imports.

```bash
python3 - <<'EOF'
import json, pathlib
for p in sorted(pathlib.Path("pencil").rglob("*.pen")):
    for prefix, rel in (json.loads(p.read_text(encoding="utf-8")).get("imports") or {}).items():
        print(f"{p}: {prefix} -> {rel}")
EOF
```

### Step 3 — Check who imports the files you are moving

Skip only if you are certain none of them is a library. **Moving a `.lib.pen`
breaks every file that imports it**, and those files need fixing too.

```bash
# replace NAME with each filename you intend to move
rg -l --no-ignore '"[^"]*NAME\.pen"' --glob '*.pen' .
```

### Step 4 — Move with `git mv`

```bash
git mv path/to/old/file.pen path/to/new/file.pen
```

`git mv` preserves rename history, so the diff stays reviewable.

### Step 5 — Repair the paths

Do **not** hand-edit or blind-replace `../../` with `../../../`. Sibling imports
have no `../` to replace, and files with several imports need each one handled.
Use this script — it resolves each import against the file's *old* directory and
recomputes it relative to the *new* one, touching nothing else in the file.

```python
#!/usr/bin/env python3
"""Repair library import paths in relocated .pen files.

Usage:  python3 repair.py OLD_DIR NEW_PATH [NEW_PATH ...]

OLD_DIR   directory the files were moved OUT of
NEW_PATH  each moved file at its new location
"""
import json, os, pathlib, re, sys

old_dir, targets = sys.argv[1], sys.argv[2:]
failed = False

for target in targets:
    p = pathlib.Path(target)
    text = p.read_text(encoding="utf-8")
    imports = json.loads(text).get("imports") or {}
    if not imports:
        print(f"{p.name:<30} no imports, skipped")
        continue

    new_text, notes = text, []
    for prefix, rel in imports.items():
        resolved = os.path.normpath(os.path.join(old_dir, rel))
        new_rel = os.path.relpath(resolved, p.parent)
        if new_rel == rel:
            notes.append(f"{prefix}: unchanged")
            continue
        if not os.path.exists(resolved):
            notes.append(f"{prefix}: TARGET MISSING -> {resolved}")
            failed = True
            continue
        pat = re.compile(r'("' + re.escape(prefix) + r'"\s*:\s*)"'
                         + re.escape(rel) + r'"')
        new_text, n = pat.subn(lambda m: m.group(1) + '"' + new_rel + '"',
                               new_text, count=1)
        if n != 1:
            notes.append(f"{prefix}: PATTERN NOT FOUND")
            failed = True
            continue
        notes.append(f"{prefix}: {rel} -> {new_rel}")

    # guard: repairing paths must never change the number of token references
    before = len(re.findall(r'\$[A-Za-z0-9]+:', text))
    after = len(re.findall(r'\$[A-Za-z0-9]+:', new_text))
    if before != after:
        print(f"{p.name:<30} ABORTED, token count {before} -> {after}")
        failed = True
        continue

    p.write_text(new_text, encoding="utf-8")
    print(f"{p.name:<30} {before} refs intact | " + "; ".join(notes))

sys.exit(1 if failed else 0)
```

Example, for the `hemlock-restyle/` migration:

```bash
python3 repair.py pencil/designs/0-ideation \
  pencil/designs/0-ideation/hemlock-restyle/*.pen
```

### Step 6 — Verify on disk

Every path must resolve, and the token count and prefix must be unchanged from
Step 2.

```bash
python3 - <<'EOF'
import json, os, pathlib, re
for p in sorted(pathlib.Path("pencil").rglob("*.pen")):
    doc = json.loads(p.read_text(encoding="utf-8"))
    for prefix, rel in (doc.get("imports") or {}).items():
        ok = os.path.exists(os.path.normpath(os.path.join(p.parent, rel)))
        if not ok:
            print(f"BROKEN  {p}  {prefix} -> {rel}")
print("scan complete")
EOF
```

### Step 7 — Verify in Pencil, then commit

Ask the user to open one moved file and confirm the styling is intact. Only then
commit. If the styling is gone, tell them immediately: **do not save, do not
close the tab** — the disk bytes are still good and only the path needs another
look.

---

## Why direct disk edits are correct here

`.cursor/rules/pencil-pen-file-editing.mdc` says not to edit `.pen` files via
shell scripts, because the extension overwrites disk changes with its cached
model. That rule is about files **open in Pencil**.

This procedure requires every `.pen` tab to be closed first, so no cached model
exists to overwrite anything. On the next open, Pencil reads the repaired bytes.
Step 1 is what makes the rest of the procedure safe — it is not optional.

---

## This has already happened in this repo

Two sets of files were broken by exactly these mistakes, well before the
`hemlock-restyle/` migration. Both were found by the Step 6 scan.

**A library was moved without fixing its dependents.**
`gen-ui-design-system.lib.pen` was relocated into `pencil/design-system/.archive/`,
and the three files importing it still point at its old path. This is the case
Step 3 exists to catch.

**Files were copied into a subfolder without repairing paths.**
The three copies in `pencil/designs/2-review-and-revise/.backups/` carry paths
like `../0-ideation/openui-forms.lib.pen` — correct from `2-review-and-revise/`,
one level short from `.backups/`. Fifteen dead imports across three files.

Neither set is urgent, since both live in archive and backup folders. They are
worth knowing about because they show the failure is easy to introduce and
invisible until something scans for it.

---

## Recovery if a file was already corrupted

Symptom: styling gone, `$PREFIX:` references replaced by raw hex / `Inter` / bare
numbers.

```bash
# confirm the loss — a healthy file has many refs and few or no raw hex fills
rg --no-ignore -c '\$[A-Za-z0-9]+:' path/to/file.pen
rg --no-ignore -c '"fill": "#'      path/to/file.pen

# if it was committed in a good state, restore it
git checkout HEAD -- path/to/file.pen
```

If the corrupted state was already committed, recover from the last good commit:

```bash
git log --oneline -- path/to/file.pen
git checkout <good-sha> -- path/to/file.pen
```

If there is no good commit, the tokens have to be reapplied by hand — which is
why Step 1 and Step 7 exist.

---

## Never do these

- Do not move or copy a `.pen` file from inside Pencil ("Save As" into another folder, dragging in a file tree).
- Do not move files while any `.pen` tab is open.
- Do not "re-attach the library" to fix a moved file — it assigns a new prefix and leaves every existing reference dangling.
- Do not replace `../../` with `../../../` blindly — sibling imports have no `../`, and many files import more than one library.
- Do not rewrite a `.pen` with `json.dump` — it reformats the whole file and buries the real change in noise. Patch the exact substring.
- Do not commit before a human has opened one moved file and confirmed it renders.
