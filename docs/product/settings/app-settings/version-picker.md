---
title: Version Picker
sidebar_position: 1
---

# Version Picker

The Version Picker tab allows developers to manage how app versions are surfaced and filtered throughout the dashboard.

Key information on the Version Picker tab:

- **Latest Release:** Set which version is marked as the latest release. This is used for accurate reporting and filtering.
- **Hidden Versions:** Select versions to hide from dashboards and daily digests. Hidden versions are excluded from most analytics but can still be filtered for in alerting via Manage Alerts.
- **Top Versions:** Configure the maximum number of "top" versions to display (up to a set limit) and set a session percentage threshold. Only versions meeting this threshold are considered top versions.
- **Available Versions:** Dropdowns are populated from the list of all known app versions.

:::info Note
While new versions are automatically added to Embrace when we receive sessions with that version, Latest Release, Top Versions, and Hidden Versions must be set manually.
:::

Developers use this tab to:

- Ensure the dashboard highlights the most relevant app versions for their team.
- Hide deprecated or irrelevant versions from analytics views.
- Fine-tune which versions are considered "top" for focused monitoring and alerting.
- Quickly update version metadata without code changes.
