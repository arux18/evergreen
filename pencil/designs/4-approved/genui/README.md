# genui/ — APPROVED GenUI Design Captures (HASH-PINNED — DO NOT EDIT)

`.pen` files in this folder are the **visual source of truth** for Evergreen GenUI
vocabulary components, promoted here at oracle lock by the GenUI Component Factory
(`specialized-components/genui-factory/`).

**Every file here is content-hash-pinned in the factory's contract set.**

- **Do not edit these files in place** — human or agent. An edit breaks the hash and
  invalidates the component's locked baselines.
- A design change is a **re-oracle**: a new prototype version enters the pipeline,
  produces a new capture, and re-locks. Prior versions are archived by the factory,
  never overwritten.
- Visual fidelity baselines (the pixel oracle) are exported from these files; the
  frozen prototype HTML in the factory is the behavior/geometry oracle.
