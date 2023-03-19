---
title: Supported Metrics and Sample Queries
description: Learn about the metrics and queries supported by the Embrace API
sidebar_position: 3
---

# Supported Metrics

The following metrics are supported. Metrics with the suffix "_total" are counters. All other metrics are gauges.

| Metric | Description | Filters |
| --- | --- | --- |
| daily_crash_free_session_by_device_rate | Percentage of crash free sessions grouped by device model | app_version, device_model, os_version |
| daily_crash_free_session_rate | Percentage of crash free sessions | app_version, os_version |
| daily_crashed_users | Number of unique users with crashes | app_version, os_version |
| daily_crashes_total | Number of crashes | app_version, os_version |
| daily_sessions_by_device_total | Number of sessions grouped by device model | app_version, device_model, os_version |
| daily_sessions_total | Number of sessions | app_version, os_version |
| daily_users | Number of unique users | app_version, os_version |
| hourly_crash_free_session_by_device_rate | Percentage of crash free sessions group by device model | app_version, device_model, os_version |
| hourly_crash_free_session_rate | Percentage of crash free sessions | app_version, os_version |
| hourly_crashed_users | Number of unique users with crashes | app_version, os_version |
| hourly_crashes_total | Number of crashes | app_version, os_version |
| hourly_sessions_by_device_total | Number of sessions grouped by device model | app_version, device_model, os_version |
| hourly_sessions_total | Number of sessions | app_version, os_version |
| hourly_users | Number of unique users | app_version, os_version |

# Sample Queries

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
