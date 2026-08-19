# design-specs
Pencil.dev design files and libraries, assets, and version control

## Spacing lint gate (before `4-approved/`)

Before a design moves to `pencil/designs/4-approved/`, run the off-scale spacing linter and review its report:

```bash
node scripts/lint-pen-spacing.mjs pencil/designs/<stage>/<file>.pen
```

The linter walks every node's `padding`/`gap`/`margin` and reports values that are off the design-system spacing scale (2, 4, 8, 12, 16, 24, 32, 40, 48, 64, 72, 128), with node paths and the two nearest tokens. It also reports duplicate same-named reusable components — especially ones with differing padding/gap specs — which cause code agents to transfer styles from the wrong node; rename or dedupe these before approval. For each off-scale value, the design owner either snaps it to scale in Pencil or explicitly acknowledges it in the promotion PR — the reviewed report is the gate artifact. Off-scale values that ship are emitted by code agents as exact arbitrary values (e.g. `p-[20px]`), never silently rounded.

Flags: `--json` for machine-readable output; `--strict` exits 1 on any off-scale value (future hard-gate mode, once existing approved designs are cleaned up).
