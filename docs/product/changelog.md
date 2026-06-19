---
title: Dashboard Changelog
description: Changelog for the Embrace Dashboard
sidebar_position: 99
---

## Embrace Dashboard Changelog

### June 2026

- **Histogram widget type**: Custom dashboards now support histogram visualizations, letting you view the distribution of metric values across configurable bins. You can set a custom bin size or let Embrace select an optimal size automatically.
- **Aggregation functions for widgets, alerts, and custom metrics**: All widget types now support aggregation functions — including count, sum, mean, median, mode, percentile, min, and max — across both categorical and time-series data. The same functions are available when building alerts and custom metrics.

### May 2026

- **Pie and bar chart widget types**: Custom dashboards now support pie and bar chart visualizations in addition to time-series charts. Bar charts include stacked and 100% stacked modes for both categorical and time-series data, and time-series bar charts support threshold coloring to highlight values above or below warning and error thresholds.
- **Widget explore mode**: Explore capabilities — including adjusting time ranges and filters, creating alerts or custom metrics from a widget's current configuration, and saving a modified chart as a new widget — are now available directly in the widget editor.

### April 2026

- **Simplified navigation and light mode**: A redesigned dashboard header and sidebar make it easier to move around the product, bookmark frequently used pages, and discover features through a new Explore section. Light mode is now available as an alternative to the dark theme.
- **On-demand testing for Synthetics**: A new Test Now button on all Synthetic monitoring pages lets you trigger an on-demand test for any preconfigured site or for an ad hoc URL, browser, and region combination — without waiting for a scheduled run.
- **Crash tagging and codeowners improvements**: UI-created crash tagging rules are now protected from being overwritten by CODEOWNERS file uploads, and a source badge clearly distinguishes custom rules from CODEOWNERS-derived ones. Android CODEOWNERS file path transformation has also been fixed.
- **Release Health additions**: ANRs, logs, and exceptions are now available as data types within Release Health, expanding the surface of your release quality monitoring beyond crashes.
- **Copy widgets and dashboards**: You can now copy individual widgets across dashboards and duplicate entire dashboards to another app, making it faster to set up monitoring for new teams or replicate proven board layouts.
- **Web Vitals dashboard updates**: The Web Vitals dashboard now includes distribution charts for each vital, subpart breakdown tables for TTFB, LCP, and INP, a world map view for vital scores, and support for a new Total Blocking Duration (TBD) vital alongside script execution summary tables.
- **Browser timing instrumentation**: The Web SDK now auto-instruments user timing, element timing, and server timing events, which you can use to create custom dashboards and alerts once data starts flowing.
- **MCP service accounts and bearer token authentication**: Service accounts and their associated bearer tokens are now available as an alternative to OAuth, enabling token-based MCP access for automated workflows that cannot use interactive authentication.

### March 2026

- **Expanded MCP tools**: New MCP tools for logs, spans, exceptions, and crash data are now available. The MCP server also now supports web apps in addition to mobile apps, so you can bring real-user observability data for any platform into your AI development workflow. See the full tool list in the [MCP docs](/mcp/).
- **MCP Network Connection Error Intelligence**: The MCP server now automatically surfaces context on network connection errors to distinguish expected, benign errors (such as device-offline events) from genuinely unexpected ones. Errors come with urgency ratings, plain-English explanations and recommended actions, and smarter drill-down suggestions.

### February 2026

- **Session properties everywhere**: Session properties are now available as filter and group-by dimensions across crashes, logs, spans, ANRs, user terminations, and OOMs, letting you correlate any telemetry event with the session context in which it occurred.
- **Alert owners and destinations**: Alerts now display which email addresses, Slack channels, and webhooks will be notified, and you can assign an owner to each alert directly from the dashboard.
- **Exceptions for Custom Metrics**: Exception data can now be aggregated and forwarded to external destinations such as Grafana Cloud and Datadog as custom metrics, alongside crashes and other event types.

### January 2026

- [**User Journeys GA**](/product/user-journeys/): User Journeys is now generally available to all customers, allowing engineering teams to define, track, and analyze custom intervals of app activity across their user base.
- **Alert data vs. latest data**: When viewing alert status graphs, you can now toggle between *Alert data* — the same delayed data the alert engine uses to evaluate thresholds — and *Latest data*, so you can understand exactly what triggered an alert without being misled by recency differences.

### December 2025

- [**User Journeys improvements**](/product/user-journeys/): Filter for sessions in which a User Flow ended in a specific way — such as a crash, user-initiated termination, or error — and view detailed information about what caused each flow to end.
- [**Logs Forwarding**](https://embrace.io/blog/logs-forwarding-available/): Forward logs to OTLP-compatible observability platforms alongside metrics and network spans.
- [**MCP server (beta)**](https://embrace.io/blog/embrace-mcp-in-beta/): Bring real-user observability data into your AI development workflow with the Embrace MCP server.
- **Splunk as a data destination**: Splunk is now available as a data destination for forwarding metrics and network spans.
- **Advanced filters only**: Standard filters have been replaced by advanced filters across the dashboard, streamlining the filtering experience into a single, consistent interface.
- **Increased dashboard limits**: The maximum number of dashboards per customer has increased from 50 to 100, rows in a table from 20 to 100, and widgets per dashboard from 20 to 60.

### November 2025

- **Child span aggregation**: Filters, widgets, alerts, and custom metrics now treat child spans as first-class objects alongside root spans, giving you the same full analytical depth on any span in your trace hierarchy.
- **Stats & KPI Panel widget**: A new single-value visualization type in the chart builder lets you display key metrics as billboard or KPI cards on custom dashboards.
- [**User Journeys improvements**](/product/user-journeys/): Validate a User Flow configuration at save time to confirm that start and end events match data in previously seen sessions; filter issues by the User Flows they appear in; and configure taps and views as additional start and end event types.

### October 2025

- [**New Overview Page**](https://embrace.io/blog/new-overview-page/): A unified starting point for web and mobile observability makes the Embrace dashboard even more powerful by providing quick, actionable insight.

- [**JavaScript Exception Scoring**](https://embrace.io/blog/javascript-exception-scoring/): Embrace now automatically calculates a [severity score](/product/exceptions/severity-score.md) for every JavaScript exception captured by the WebSDK, to help you prioritize the most critical issues affecting your users.

- [**Page Load Insights**](https://embrace.io/blog/page-load-insights-in-embrace-web-rum/): The new Page Load Insights feature for Web RUM shows you exactly what’s slowing your pages down and impacting your end users.

- [**Updated Release Health**](https://embrace.io/blog/refreshed-release-health/): Our refreshed [Release Health](/product/release-health) page gives engineers an effective launchpad to evaluate performance across app releases, examine trends, and quickly spot regressions

- [**Updated User Journeys**](/product/user-journeys/): Updates to User Journeys make User Flows ubiquitous across the entire Embrace dashboard, while making User Flows more intuitive and interactive. Also adds flexibility with more start and end event types in User Flows.

### September 2025

- [**Slow Root Spans**](https://embrace.io/blog/slow-root-spans-release/): Set custom thresholds for individual spans to determine which are creating performance bottlenecks.

### July 2025

- [**User Journeys**](https://embrace.io/blog/user-journeys-walkthrough/): Embrace released the first feature of our User Journeys platform initiative, [User Flows](/product/user-journeys/), which allows engineers to define and track custom intervals of app activity.

### June 2025

- [**Embrace Web RUM**](https://embrace.io/blog/introducing-embrace-web-rum/): Embrace now supports performance monitoring for websites and web apps
- **Highlight and Zoom**: New dashboard visualization feature to allow users to highlight and zoom in on one particular interval within a chart.

### May 2025

- [**Startup auto-instrumentation**](https://embrace.io/blog/introducing-automatic-startup-instrumentation/): Embrace now automatically instruments spans around the key processes that occur during an application’s startup
- [**Grafana deep-link**](https://embrace.io/blog/deep-dive-into-embrace-data-directly-from-grafana-with-seamless-back-links/): Grafana users who also use Embrace can now seamlessly pivot from the Embrace data in their Grafana instance directly to the corresponding data in their Embrace dashboard using a deep-link.
- **Greater availability of Profile Groups**: Profile Groups are available for charting, alerting, and building custom metrics
- **Removal of 14-day query restriction**: Users can now select any date range within their retention period when querying data, not just the last 14 days.
- **Embrace is [Okta-verified](/product/settings/sso.md#okta)**: Embrace is now listed in [Okta’s SSO directory](https://www.okta.com/integrations/embrace/), allowing enterprise customers to easily configure Single Sign On with Embrace.

### April 2025

- [**Release Health**](https://embrace.io/blog/introducing-release-health/): Embrace’s new version comparison tool in the dashboard lets users compare key metrics across app releases.
- **Open-sourced Gradle plug-in**: Embrace’s Gradle plug-in for the Android SDK has been slimmed down, stripped of Embrace dependencies, and donated to the open source Android community.
- [**Exploded custom properties**](/product/boards/custom-dashboards.md#exploded-properties): When using custom properties as filters for charts/widgets, users can now break out all of the possible values of an attribute as their own unique filter.
- **Chart builder UI/UX improvements**: Multiple improvements have been made to the chart-building experience for custom dashboards, including searchable filters, the ability to group metrics together, more clear error messages for data incompatibilities, new pie and bar chart options, and visual improvements to query building flow.
