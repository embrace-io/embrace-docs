---
title: Metrics API
description: Learn about the Embrace Metrics API to pull data  
sidebar_position: 10
---

# Embrace Metrics API

The Embrace Metrics API allows you to query your metrics from Embrace using PromQL. 
The queryable information includes any standard metrics as well as any [Custom Metrics](/metrics-forwarding/custom-metrics/) you have created. 

## Get Started

1. Navigate to [Settings -> Organization -> API](https://dash.embrace.io/settings/organization/api)
   in the Embrace dashboard.
1. Get the "Metrics API" token.

<img src={require('@site/static/images/metrics-api/metrics_api_token.png').default} alt="Image showing the
settings page for API tokens"/>

### How to Consume Metrics?

You can consume metrics from the Embrace Metrics API in two ways:

- **From Grafana**: Visualize metrics in custom dashboards. See the [Grafana Integration guide](/metrics-forwarding/metrics-api/grafana-integration/).
- **Programmatically via code**: Query metrics directly using the API. Check out the [code samples](/metrics-forwarding/metrics-api/code-samples/).

All metrics are queried using PromQL (Prometheus Query Language). See some examples here.

- Sessions grouped by session property city and state for a given app version.

```promql
sum(daily_sessions_total{app_id="<app ID>", app_version="1.2.3"}) by (city, state)
```

- Percentage of crash free sessions by devices.

```promql
1 - sum(hourly_crashes_total{app_id="$app_id"}) by (device_model) / sum(hourly_sessions_total{app_id="$app_id"}) by (device_model) * 100
```

- Percentage of crash sessions by devices.

```promql
sum(hourly_crashes_total{app_id="$app_id"}) by (device_model) / sum(hourly_sessions_total{app_id="$app_id"}) by (device_model) * 100
```

Also, you can pull data for one, multiple, or all of your organization's apps in a single query.

- To pull for a single app, include the `app_id` in the PromQL filter,

```promql
sum(hourly_custom_metric_sessions_total{app_id="a1b2C3"})
```

- To pull for multiple apps, include a pipe-delimited array in the filter,

```promql
sum(hourly_custom_metric_sessions_total{app_id=~"a1b2C3|Z9Y8x7"}) 
```

- To pull for all apps, do not include any app ID in the filter,

```promql
sum(hourly_custom_metric_sessions_total{})
```

## Supported Metrics

View all the metrics supported in the [Metrics Forwarding](/metrics-forwarding/#supported-metrics) page.

## Metrics Availability

This is the time when the metrics will be available to consume in the Embrace Metrics API.

- Five minute metrics will be available to consume in about 4 minutes. Data point calculated at `2024-11-25 00:05:00` will be available to consume after `2024-11-25 00:10:00`.
- Hourly metrics will be available to consume in about 15 minutes. Data point calculated at `2024-11-25 01:00:00` will be available to consume after `2024-11-25 01:14:00`.
- Daily metrics will be available to consume in about 14 hours. Data point calculated at `2024-11-25 00:00:00` will be available to consume after `2024-11-25 14:00:00`.
