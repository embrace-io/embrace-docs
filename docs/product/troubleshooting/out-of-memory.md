---
title: Out of Memory
sidebar_position: 7
---

# Out of Memory

The Out of Memory ("OOM") page in the Embrace dashboard helps developers identify, investigate, and resolve OOMs by surfacing relevant metrics, trends, and contextual signals.

## Page details

Key information on the OOM page:

- **Stats Banner**: Quick stats on OOM impact and affected users.
- **Overall Metrics:** OOM-free session/user percentages, total OOMs, and affected user counts.
- **Trends & Contribution Rates:** Visualizations showing OOM rates over time, by app version, and contribution rates to quickly spot regressions or problematic releases.
- **Filtering & Segmentation:** Advanced filters for device, OS, app version, and last captured view to isolate high-memory-consuming scenarios.
- **Session List:** Detailed list of OOM sessions with the ability to drill into individual user sessions for context.
- **Correlated Signals:** Context on what happened before the OOM (e.g., network calls, image loading, webviews) to aid root cause analysis.

What developers can learn or accomplish:

- **Root Cause Analysis:** Correlate OOMs with user actions, device types, and app versions to pinpoint causes.
- **Prioritization:** Quantify OOM impact on users and sessions to prioritize fixes.
- **Release Monitoring:** Detect regressions in OOM rates after new releases.
- **Performance Optimization:** Identify memory-heavy flows or screens and optimize accordingly.
- **User Experience:** Understand how OOMs affect real users and reduce their occurrence to improve app stability.
