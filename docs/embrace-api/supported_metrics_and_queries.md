---
title: Supported Metrics and Sample Queries
description: Learn about the metrics and queries supported by the Embrace API
sidebar_position: 3
---

# Standard Metrics

The following metrics are supported as Standard Metrics. Metrics with the suffix "_total" are counters. All other metrics are gauges.

All metrics are available in daily, hourly, and five-minute increments.  To query your desired unit, simply prefix the metric name with the unit, eg: `daily_crashed_users` or `five_minute_sessions_total`.

| Metric | Description | Filters |
| --- | --- | --- |
| crash_free_session_by_device_rate | Percentage of crash free sessions grouped by device model | app_version, device_model, os_version |
| crash_free_session_rate | Percentage of crash free sessions | app_version, os_version |
| crashed_users | Number of unique users with crashes | app_version, os_version |
| crashes_total | Number of crashes | app_version, os_version |
| sessions_by_device_total | Number of sessions grouped by device model | app_version, device_model, os_version |
| sessions_total | Number of sessions | app_version, os_version |
| users | Number of unique users | app_version, os_version |

## Sample Queries

### Sessions Grouped by App Version

```promql
sum(sessions_total{app_id="<app ID>"}) by (app_version)
```

### Sessions Grouped by Devices

```promql
sum(sessions_by_device_model_total{app_id="<app ID>"}) by (device_model)
```

### Sessions Grouped by Devices for a Given App Version

```promql
sum(sessions_by_device_model_total{app_id="<app ID>", app_version="1.2.3"}) by (device_model)
```


# Custom Metrics

Users may request Custom Metrics via their Customer Success Manager.  These will be available via the Metrics API and can also be forwarded to your organization's (observability platform of choice)[/data-destinations].

## Sample Queries

You can pull data for one, multiple, or all of your organization's apps in a single query.  
* To pull for a single app, include the `app_id` in the PromQL filter, eg: `sum(hourly_anr_free_sessions{app_id="a1b2C3"})`
* To pull for multiple apps, include a pipe-delimited array in the filter, eg: `sum(hourly_crashes_by_tag{app_id=~"a1b2C3|Z9Y8x7"}) by (tag_value)`
* To pull for all apps, do not include any app ID in the filter, eg: `sum(hourly_network_requests_fails_by_domain{}) by (domain)`
