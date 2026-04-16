# UX Principles (non-negotiable, priority order)

1. **Progressive disclosure.** Summary layer answers "Am I okay?"; detail layer answers "Why and what should I do?" Use `GenUI/Progressive Disclosure Summary`.
2. **Every destructive action requires confirmation.** Use `GenUI/Confirmation Dialog`. Safe option is visually dominant; destructive option is text-only, never a filled button.
3. **Primary action above the fold on mobile.** Dashboard: "Add account"/"Ask AI". Transaction list: search/filter. Budget: "Adjust budget". Insight: primary CTA.
4. **Show the money first.** Portfolio/net-worth/balance is the first meaningful content on load. Before charts, insights, navigation. Skeleton order: KPI value → trend → chart → details.
5. **Calm over urgent.** No pulsing animations on financial data. No countdown timers except real market deadlines. No `!` in copy. No red primary buttons. Notifications use `GenUI/Calm Notification`.
6. **Precision over brevity.** Always cents. Always the date range ("Mar 1 – Apr 9", not "this month"). Always the baseline ("+23% vs. 3-month average"). Always the data source.
7. **AI must be transparent.** `$ai.surface` + sparkle icon. Show confidence. Disclaimer on projections. No certainty words ("will", "definitely") — use "may", "estimated", "based on". Always offer dismiss.
8. **Accessibility is required.** 4.5:1 contrast for text. Color + icon + label (never color alone). Visible focus states. Screen reader announces full values. 44×44px touch targets.
9. **Consistent formatting.** See `rules/ui/data-formatting.md`.
10. **Three states required per data component.** Loading (skeleton), error (with recovery), empty (with encouragement + CTA). A component missing any of these is incomplete.
