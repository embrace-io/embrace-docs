---
title: Introduction
sidebar_position: 0
---

# Metrics Forwarding

Metrics Forwarding enables you to send aggregated performance metrics from Embrace to your observability platform.
Instead of viewing metrics only in the Embrace dashboard, you can forward them to tools like Grafana Cloud, Datadog, New
Relic, or any other platform that supports time-series metrics.

This allows you to:

- **Combine mobile and backend metrics** in unified dashboards
- **Use your existing alerting systems** for mobile app performance
- **Build custom visualizations** with your preferred tools
- **Correlate mobile metrics** with infrastructure and backend metrics

## Standard Metrics vs Custom Metrics 

Embrace captures mobile data with many dimensions. In order for this data to be useful as time series data, it must be
aggregated. We automatically aggregate your metrics into [Prometheus style metrics](https://prometheus.io/docs/concepts/data_model/)  
by default using some standard, common sense labels combinations. These are useful for common golden signals like app
adoption over several app versions.

If a standard metric doesn’t suit your needs you can define a custom metric. For example, you can define a session
property to identify sessions associated with paying customers and filter for that session property to get app adoption
amongst paying customers. You can then consume this metric in your data destination of choice.

## Get Started

1. Navigate
   to [Settings -> Integrations -> Data Destinations](https://dash.embrace.io/settings/organization/integrations/data_destinations)
   in the Embrace dashboard.
1. Select and configure your preferred data destination.

<img src={require('@site/static/images/data-destinations/settings_page_example.png').default} alt="Image showing the
settings page for data destinations" />

1. Click "Forward all my Standard metrics to this new data destination." to receive the Standard Metrics.
1. Click "Allow forwarding all of my Custom metrics to this new data destination." to receive the Custom Metrics.

## Supported Data Destinations

View all the tools supported in the [Data Destinations](/data-destinations/#supported-platforms) page.

## Supported Metrics

Embrace forwards standard and custom metrics at different time granularities to help you monitor your app's health:

### Standard Metrics

| Metric name           | Metrics API Name   | Description                            | Dimensions                            | Time granularity           |
|-----------------------|--------------------|----------------------------------------|---------------------------------------|----------------------------|
| crash_total           | crashes_total      | Number of crashes                      | app_version, os_version, device_model | five_minute, hourly, daily |
| session_total         | sessions_total     | Number of sessions                     | app_version, os_version, device_model | five_minute, hourly, daily |
| crash_free_user_total | crashed_free_users | Number of unique users without crashes | app_version, os_version, device_model | five_minute, hourly, daily |
| users_total           | users_total        | Number of unique users                 | app_version, os_version, device_model | daily                      |

:::info
The `users_total` metric is of type gauge and represents the count of distinct devices utilizing the app within a
specific UTC day.  
It is important to note that this metric is not designed for cumulative aggregation across days, as doing so would
result in double-counting users.

Summing the users metric across various dimensions within the same day does not yield the overall count of unique users
per day.  
This discrepancy arises from the potential overlap of users across different dimensions; for instance, users who update
the app version on the same day may be present in multiple dimensions.

Nevertheless, summing the users metric across dimensions can still provide an estimate of the total user counts.

The same logic applies with the `crash_free_user_total`/`crashed_free_users` metric.
:::

### Custom Metrics

Refer to this [documentation](/metrics-forwarding/custom-metrics-api/supported_metrics) to know the supported custom metrics.

## Metric Naming

Metric names follow different formats depending on the data destination. The table below shows the three naming conventions used:

| Naming Convention | Format                                  | Example                           | Notes                                                                                           |
|-------------------|-----------------------------------------|-----------------------------------|-------------------------------------------------------------------------------------------------|
| Dot notation      | `embrace.<metric_name>.<granularity>`   | `embrace.crashes_total.daily`     | Used by some platforms that support dot-separated metric names                                  |
| Underscore prefix | `embrace_<metric_name>_<granularity>`   | `embrace_crashes_total_daily`     | Common format sent to most destinations                                                         |
| Granularity first | `<granularity>_<metric_name>`           | `daily_crashes_total`             | Used when querying via the Embrace Metrics API. Some destinations like Grafana Cloud may convert the underscore prefix format to this convention |


## Dimension reduction - "Other"

To reduce storage costs with various observability platforms (eg Datadog), Embrace Metrics examine high cardinality dimensions for consolidation.
