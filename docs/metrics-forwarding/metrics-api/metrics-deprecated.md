---
title: Removed metrics
description: Migration guide for metrics removed from the Embrace Metrics API
sidebar_position: 40
---

# Removed metrics

The following metrics were deprecated in October 2023 and fully removed on April 2026. They are no longer available for querying.

All the information these metrics provided is available through the current metrics (refer to the [Supported Metrics](/metrics-forwarding/#supported-metrics) page). See the [Replacements](#replacements) section below for migration guidance.

## Removed metrics

| Metric                                       | Description                                               | Filters                               | Time granularity           |
|----------------------------------------------|-----------------------------------------------------------|---------------------------------------|----------------------------|
| crash_free_session_by_device_rate_deprecated | Percentage of crash free sessions grouped by device model | app_version, device_model, os_version | hourly, daily              |
| crash_session_pct_deprecated                 | Percentage of crash sessions                              | app_version, os_version               | hourly, daily              |
| crash_free_session_rate_deprecated           | Percentage of crash free sessions                         | app_version, os_version               | hourly, daily              |
| crashed_users_deprecated                     | Number of unique users with crashes                       | app_version, os_version               | hourly, daily              |
| crashes_total_deprecated                     | Number of crashes                                         | app_version, os_version               | five_minute, hourly, daily |
| crash_free_session_rate_deprecated           | Crash free session rate                                   | app_version, os_version               | daily                      |
| sessions_by_device_model_total_deprecated    | Number of sessions grouped by device model                | app_version, device_model, os_version | hourly, daily              |
| sessions_by_device_total_deprecated          | Number of sessions grouped by device model                | app_version, device_model, os_version | hourly, daily              |
| sessions_total_deprecated                    | Number of sessions                                        | app_version, os_version               | five_minute, hourly, daily |
| users_deprecated                             | Number of unique users                                    | app_version, os_version               | hourly, daily              |

## Replacements

#### daily_crash_free_session_rate

"Rates" are not supported because they are by definition not compatible with other metrics or themselves.

**You can still calculate rates on your end!**

To build this rate, update your query:

`daily_crash_free_session_rate` => `1 - daily_crashes_total / daily_sessions_total`

#### sessions_by_device_model_total

"_by_device_" is now supported by _ALL_ Metrics.

To build this cut, update your query:

`sessions_by_device_model_total` => `daily_sessions_total`

### All other deprecated metrics

The remaining `_deprecated` suffixed metrics have direct replacements in the current standard metrics. Refer to the [Supported Metrics](/metrics-forwarding/#supported-metrics) page for the full list of available metrics.
