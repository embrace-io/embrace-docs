---
title: Removed metrics (2023-10)
description: Migration guide for metrics removed in October 2023
sidebar_position: 40
---

# Removed metrics (2023-10)

:::warning Metrics removed
The metrics listed on this page were deprecated in October 2023 and have been fully removed from the Embrace Metrics API as of April 1, 2026. They are no longer available for querying, including historical data. This page is preserved as a migration reference.
:::

In October 2023, Embrace updated its beta Metrics API to support interoperability. All metrics, both the pre-built Standard Metrics and your Custom Metrics, can now be combined in any analysis. You can sum across time ranges and other dimensions, compare one metric with another, or use multiple metrics to compute relevant rates.

As part of this update, the metrics listed below were removed and replaced with standardized alternatives.

## Removed metrics and their replacements

### daily_crash_free_session_rate

"Rates" are not supported in the Embrace Metrics API, because they are by definition not compatible with other metrics or themselves.

**You can still calculate rates on your end!**

To build this rate, you can update your query:

`daily_crash_free_session_rate` => `1 - daily_crashes_total / daily_sessions_total`

### sessions_by_device_model_total

"_by_device_" is now supported by _ALL_ Metrics.

To build this cut, you can update your query:

`sessions_by_device_model_total` => `daily_sessions_total`

## Removed metrics reference

The following metrics were deprecated in October 2023 and fully removed on April 1, 2026. All the information they provided is available through the current metrics (refer to the [Supported Metrics](/metrics-forwarding/#supported-metrics) page).

| Metric                                       | Description                                               | Filters                               | Time granularity           |
|----------------------------------------------|-----------------------------------------------------------|---------------------------------------|----------------------------|
| crash_free_session_by_device_rate_deprecated | Percentage of crash free sessions grouped by device model | app_version, device_model, os_version | hourly, daily              |
| crash_session_pct_deprecated                 | Percentage of crash sessions                              | app_version, os_version               | hourly, daily              |
| crash_free_session_rate_deprecated           | Percentage of crash free sessions                         | app_version, os_version               | hourly, daily              |
| crashed_users_deprecated                     | Number of unique users with crashes                       | app_version, os_version               | hourly, daily              |
| crashes_total_deprecated                     | Number of crashes                                         | app_version, os_version               | five_minute, hourly, daily |
| sessions_by_device_total_deprecated          | Number of sessions grouped by device model                | app_version, device_model, os_version | hourly, daily              |
| sessions_total_deprecated                    | Number of sessions                                        | app_version, os_version               | five_minute, hourly, daily |
| users_deprecated                             | Number of unique users                                    | app_version, os_version               | hourly, daily              |
