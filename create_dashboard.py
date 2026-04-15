#!/usr/bin/env python3
"""
Create a dashboard using Agent Vega
"""
import sys
from pathlib import Path

# Add vega to path
sys.path.insert(0, str(Path(__file__).parent / "vega"))

from vega.agent import VegaAgent


def main():
    # Initialize Vega with design tokens
    agent = VegaAgent(
        tokens_dir=str(Path(__file__).parent),
        commands_dir=str(Path(__file__).parent / "vega" / "commands"),
        rules_dir=str(Path(__file__).parent / "vega" / "rules"),
        skills_dir=str(Path(__file__).parent / "vega" / "skills"),
        users_dir=str(Path(__file__).parent / "vega" / "users"),
    )

    # Prompt to create a dashboard
    dashboard_prompt = """
Create a personal finance dashboard following the render-dashboard skill.

Requirements:
- Full dashboard layout with sidebar (280px) and main content
- KPI row showing: Net Worth, Monthly Spending vs Budget, Savings Rate, Investment Return
- Area chart for net worth over time (use chart tokens from 05-charts.json)
- Left column: AI Insights section + Recent Transactions (5 items)
- Right column: Budget Progress (top 4 categories) + Goals Progress + Account Summary
- Use design tokens from the available token files
- Ensure all components follow accessibility guidelines (WCAG AA)
- Loading, error, and empty states for each section

Please generate the complete dashboard specification with:
1. Component selection from the design system
2. Token usage for colors, spacing, typography
3. Layout structure and responsive behavior
4. Data binding fields for each component
"""

    print("🚀 Asking Vega to create a dashboard...\n")
    response = agent.chat(dashboard_prompt)
    print(response)

    return agent


if __name__ == "__main__":
    agent = main()
