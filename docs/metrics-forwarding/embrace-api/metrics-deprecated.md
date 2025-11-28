---
title: Metrics migration (2023-10-23)
description: How-to update your queries to the latest Metrics
sidebar_position: 100
---

# Metrics migration (2023-10-23)

Embrace is updating its beta Metrics API to support interoperability. This means all metrics, both the pre-built Standard Metrics and your Custom Metrics, can be combined in any analyses you plan on doing. Sum across time-ranges and other dimensions, compare one Metric with another, or use multiple metrics to compute relevant rates.

Unfortunately this means some metrics will no longer be supported, and others will be brought into our standardized data environment and naming conventions.

## Metrics being deprecated

### daily_crash_free_session_rate

"Rates" are no longer being supported in the Embrace Metrics API, because they are by definition not compatible with other metrics or themselves.

**You can still calculate rates on your end!**

To build this rate, you can update your query:

`daily_crash_free_session_rate` => `1 - daily_crashes_total / daily_sessions_total`

### sessions_by_device_model_total

"_by_device_" is now supported by _ALL_ Metrics.

To build this cut, you can update your query:

`sessions_by_device_model_total` => `daily_sessions_total`

## Deprecated metrics after 2023-10-17

We have deprecated the following metrics in favor of the new metrics mentioned above.
All the information provided by these metrics can now be obtained using the new metrics (refer to the Sample Queries section in the [Supported Metrics and Sample Queries](/metrics-forwarding/embrace-api/supported_metrics_and_queries/) page).
These deprecated metrics will remain available for retrieving historical data prior to October 30, 2023.
However, we strongly recommend transitioning to the new metrics to ensure a consistent experience.

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
