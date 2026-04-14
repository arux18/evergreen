"""
Vega — Frontend Code Accessibility Auditor
Scans TSX/JSX/HTML files for common accessibility violations.
"""

import re
import json
from pathlib import Path
from typing import Any


# ---------------------------------------------------------------------------
# Violation definitions
# ---------------------------------------------------------------------------

SEVERITY_CRITICAL = "critical"
SEVERITY_MODERATE = "moderate"
SEVERITY_MINOR = "minor"


def scan_file(filepath: str, content: str) -> list[dict[str, Any]]:
    """Scan a single file for accessibility violations. Returns a list of findings."""
    findings = []
    lines = content.split("\n")

    for i, line in enumerate(lines, 1):
        stripped = line.strip()

        # --- Missing alt text on images ---
        if re.search(r"<img\s", stripped, re.IGNORECASE):
            if not re.search(r'alt\s*=', stripped, re.IGNORECASE):
                findings.append({
                    "file": filepath,
                    "line": i,
                    "severity": SEVERITY_CRITICAL,
                    "rule": "img-alt",
                    "message": "Image missing `alt` attribute",
                    "suggestion": 'Add descriptive alt text: alt="description" or alt="" for decorative images'
                })

        # --- Div used as button ---
        if re.search(r'<div[^>]*onClick', stripped):
            if not re.search(r'role\s*=\s*["\']button["\']', stripped):
                findings.append({
                    "file": filepath,
                    "line": i,
                    "severity": SEVERITY_CRITICAL,
                    "rule": "interactive-div",
                    "message": "Interactive `<div>` with onClick — should be a `<button>` or have `role=\"button\"` + keyboard handling",
                    "suggestion": "Replace with <button> element, or add role=\"button\" tabIndex={0} onKeyDown handler"
                })

        # --- Hardcoded color values (should use tokens) ---
        hex_matches = re.findall(r'(?:color|background|border-color|fill|stroke)\s*:\s*(#[0-9a-fA-F]{3,8})', stripped)
        for hex_val in hex_matches:
            findings.append({
                "file": filepath,
                "line": i,
                "severity": SEVERITY_MODERATE,
                "rule": "hardcoded-color",
                "message": f"Hardcoded color `{hex_val}` — should use a design token",
                "suggestion": f"Replace with the appropriate CSS variable from design-tokens, e.g. var(--color-text-primary)"
            })

        # --- Also catch inline style hex colors in JSX ---
        jsx_color_matches = re.findall(r'(?:color|backgroundColor|borderColor|fill|stroke)\s*:\s*["\']?(#[0-9a-fA-F]{3,8})', stripped)
        for hex_val in jsx_color_matches:
            if not any(f["line"] == i and f["rule"] == "hardcoded-color" for f in findings):
                findings.append({
                    "file": filepath,
                    "line": i,
                    "severity": SEVERITY_MODERATE,
                    "rule": "hardcoded-color",
                    "message": f"Hardcoded color `{hex_val}` in JSX style — should use a design token",
                    "suggestion": "Use token-based theming instead of inline hex values"
                })

        # --- Missing form labels ---
        if re.search(r'<input\s', stripped, re.IGNORECASE):
            if not re.search(r'aria-label|aria-labelledby|id\s*=', stripped, re.IGNORECASE):
                # Check if previous line has a <label>
                prev_line = lines[i - 2].strip() if i > 1 else ""
                if not re.search(r'<label', prev_line, re.IGNORECASE):
                    findings.append({
                        "file": filepath,
                        "line": i,
                        "severity": SEVERITY_CRITICAL,
                        "rule": "input-label",
                        "message": "Form input missing associated label",
                        "suggestion": "Add <label htmlFor=\"...\"> or aria-label/aria-labelledby attribute"
                    })

        # --- Missing heading hierarchy ---
        heading_match = re.search(r'<h([1-6])', stripped)
        if heading_match:
            level = int(heading_match.group(1))
            # We'd need broader context for full hierarchy check, but flag h1 multiples
            # and skipped levels as potential issues

        # --- Hardcoded pixel spacing (should use space tokens) ---
        px_matches = re.findall(r'(?:padding|margin|gap)\s*:\s*(\d+)px', stripped)
        for px_val in px_matches:
            val = int(px_val)
            if val % 4 != 0 or val > 48:
                findings.append({
                    "file": filepath,
                    "line": i,
                    "severity": SEVERITY_MINOR,
                    "rule": "hardcoded-spacing",
                    "message": f"Hardcoded spacing `{val}px` — not on 4px grid or should use space token",
                    "suggestion": f"Use a spacing token (space.1=4px, space.2=8px, ..., space.12=48px)"
                })

        # --- Missing focus styles ---
        if ':focus' in stripped and 'outline: none' in stripped:
            if 'box-shadow' not in stripped and 'border' not in stripped:
                findings.append({
                    "file": filepath,
                    "line": i,
                    "severity": SEVERITY_CRITICAL,
                    "rule": "focus-visible",
                    "message": "Focus outline removed without replacement — keyboard users cannot see focus",
                    "suggestion": "Replace outline:none with a visible focus indicator using border.focus token"
                })

        # --- Missing prefers-reduced-motion ---
        if re.search(r'(animation|transition)\s*:', stripped):
            # Flag at file level, not per-line (we'll deduplicate later)
            findings.append({
                "file": filepath,
                "line": i,
                "severity": SEVERITY_MINOR,
                "rule": "reduced-motion",
                "message": "Animation/transition found — verify `prefers-reduced-motion` is handled",
                "suggestion": "Wrap in @media (prefers-reduced-motion: no-preference) or check for user preference"
            })

        # --- Hardcoded border-radius ---
        radius_matches = re.findall(r'border-radius\s*:\s*(\d+)px', stripped)
        for r_val in radius_matches:
            findings.append({
                "file": filepath,
                "line": i,
                "severity": SEVERITY_MINOR,
                "rule": "hardcoded-radius",
                "message": f"Hardcoded border-radius `{r_val}px` — should use radius token",
                "suggestion": "Use radius.sm (4px), radius.md (8px), or radius.lg (12px) tokens"
            })

        # --- Anchor without href ---
        if re.search(r'<a\s', stripped) and not re.search(r'href\s*=', stripped):
            findings.append({
                "file": filepath,
                "line": i,
                "severity": SEVERITY_MODERATE,
                "rule": "anchor-href",
                "message": "Anchor `<a>` without `href` — not keyboard accessible",
                "suggestion": "Add href, or use a <button> if this is an action rather than navigation"
            })

    # Deduplicate reduced-motion warnings (one per file is enough)
    motion_findings = [f for f in findings if f["rule"] == "reduced-motion"]
    if len(motion_findings) > 1:
        findings = [f for f in findings if f["rule"] != "reduced-motion"]
        motion_findings[0]["message"] = f"Multiple animations/transitions found ({len(motion_findings)} instances) — verify `prefers-reduced-motion` is handled"
        findings.append(motion_findings[0])

    return findings


def scan_directory(directory: str, extensions: tuple = (".tsx", ".jsx", ".css", ".scss", ".html")) -> dict[str, Any]:
    """Scan a directory for accessibility violations."""
    all_findings = []
    files_scanned = 0

    for path in Path(directory).rglob("*"):
        if path.suffix in extensions and "node_modules" not in str(path) and ".next" not in str(path):
            try:
                content = path.read_text(encoding="utf-8")
                findings = scan_file(str(path), content)
                all_findings.extend(findings)
                files_scanned += 1
            except (IOError, UnicodeDecodeError):
                continue

    # Sort by severity
    severity_order = {SEVERITY_CRITICAL: 0, SEVERITY_MODERATE: 1, SEVERITY_MINOR: 2}
    all_findings.sort(key=lambda f: severity_order.get(f["severity"], 3))

    summary = {
        "files_scanned": files_scanned,
        "total_findings": len(all_findings),
        "critical": sum(1 for f in all_findings if f["severity"] == SEVERITY_CRITICAL),
        "moderate": sum(1 for f in all_findings if f["severity"] == SEVERITY_MODERATE),
        "minor": sum(1 for f in all_findings if f["severity"] == SEVERITY_MINOR),
    }

    return {
        "summary": summary,
        "findings": all_findings
    }


def format_audit_report(results: dict[str, Any]) -> str:
    """Format scan results as a markdown audit report."""
    s = results["summary"]
    lines = [
        "## Accessibility Code Audit",
        "",
        f"**Files scanned:** {s['files_scanned']}",
        f"**Total findings:** {s['total_findings']}",
        f"- 🔴 Critical: {s['critical']}",
        f"- 🟡 Moderate: {s['moderate']}",
        f"- 🔵 Minor: {s['minor']}",
        "",
    ]

    if not results["findings"]:
        lines.append("✅ No accessibility violations found!")
        return "\n".join(lines)

    severity_emoji = {
        SEVERITY_CRITICAL: "🔴",
        SEVERITY_MODERATE: "🟡",
        SEVERITY_MINOR: "🔵"
    }

    current_severity = None
    for finding in results["findings"]:
        sev = finding["severity"]
        if sev != current_severity:
            current_severity = sev
            lines.append(f"### {severity_emoji[sev]} {sev.title()} Issues")
            lines.append("")

        lines.append(f"**{finding['file']}:{finding['line']}** — `{finding['rule']}`")
        lines.append(f"  {finding['message']}")
        lines.append(f"  → *{finding['suggestion']}*")
        lines.append("")

    lines.append("---")
    lines.append("**⏳ Awaiting human approval before making any changes.**")

    return "\n".join(lines)
