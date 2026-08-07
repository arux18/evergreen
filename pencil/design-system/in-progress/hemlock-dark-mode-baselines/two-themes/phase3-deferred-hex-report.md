# Phase 3 — deferred / reported hexes

## Applied (exact light match)

| Hex | Count | Binding |
|-----|------:|---------|
| `#ffffff` | 102 | `$color-base-white` |
| `#3a6af8` | 41 | `$color-blue-600` |
| `#00000000` | 2 | kept as-is (transparent) |

## Not applied — nearest token light value differs (STOP/report per playbook)

| Hex | Count | Location (representative) | Nearest token light | Why deferred |
|-----|------:|---------------------------|---------------------|--------------|
| `#DCFCE7` | 1 | `component/Badge New` fill | `$color-green-50` = `#e9fff0` | Visible light delta |
| `#166534` | 1 | `component/Badge New` text | `$color-green-600` = `#10642b` | Visible light delta |
| `#DC2626` | 1 | `component/Badge Deleted` fill | `$color-red-600` = `#c82320` | Visible light delta |

## Not applied — off-system (await approval)

| Hex | Count | Representative paths |
|-----|------:|----------------------|
| `#eeefee` | 94 | Swatch Card stroke; Token Gallery spacing/radius cards |
| `#cccccc` | 1 | Swatch Card |
| `#202220` | 149 | Swatch Card + Token Gallery label text fills |
| `#727874` | 94 | Swatch Card + Token Gallery meta text |
| `#949895` | 110 | Swatch Card + Token Gallery secondary text |
| `#CBD5E1` | 1 | `component/Callout/neutral` |
| `#64748B` | 1 | `component/Callout/neutral` |

These look like Token Gallery / CodeBlock / Callout off-system values. Mapping blind risks light regressions.
