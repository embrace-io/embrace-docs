---
title: Custom Metrics
description: Learn about the Embrace Metrics API to pull data
sidebar_position: 100
---

# Custom Metrics

Embrace captures your mobile data, and aggregates it into time series data. This data is useful for monitoring the
health
of your system. By default, Embrace provides standard, out-of-the-box metrics by default. These can be consumed via the
[Embrace Metrics API](/metrics-forwarding/metrics-api/) or can be forwarded into your [Data Destination](/data-destinations/index.md) of choice.

Custom metrics allow you to define your own time series metrics with custom labels. This feature enables you to create
specific metrics that suit your unique needs, beyond the default metrics provided.

## Get Started

### via Boards

Some Widgets on [custom Boards](/product/boards/custom-dashboards.md) can be directly converted to Custom Metrics.

Open the menu on a Widget, and click "Create Custom Metric".  This will open up a Custom Metric creation form, pre-populated with the same parameters as the Widget.

<img src={require('@site/static/images/UI CMs > onramp.png').default} alt="Screenshot of Widgets settings menu" />

<img src={require('@site/static/images/UI CMs > pre-filled form.png').default} alt="Screenshot of custom metrics pre-filled form" />

From there, follow the rest of the Custom Metric create flow by selecting a (optional) Data Destination and measurement time interval.

### via Settings

Go to the [Settings page](https://dash.embrace.io/settings/organization/custom_metrics) in the Embrace Dashboard and click on the Custom Metrics tab. Here you can create, view, and
delete custom metrics. When you define a custom metric, you can specify:

- Metric - The aggregation you want to track.
- Name - The name of the metric. Must conform to the Prometheus spec.
- Filter - (Optional) Aggregate only a subset of the data.
- Group By - (Optional) Group the data by a set of dimensions. These will become the labels in your time series data.

<img src={require('@site/static/images/custom-metrics-definition.png').default} alt="Screenshot of custom metrics definition tab" />

After defining a custom metric you must select a Data Destination and time period. You can choose amongst our existing integrations, or
you can select the Embrace Metrics API and query the data from there.

<img src={require('@site/static/images/custom-metrics-output.png').default} alt="Screenshot of custom metrics output tab" />

### via API

Refer to [this](/metrics-forwarding/custom-metrics/custom-metrics-api) to understand how to use the public API.

## Supported Metrics

Global filters and global group bys are available to use on all the metrics.

- Global filters: app_version, country, model, os_major_version and os_version.
- Global group bys: app_version, country, os_major_version, os_version and top_n_market_name.

Metrics with the suffix "_total" are gauges.

| Metric                                     | Description                                  | Filters                                                                                                                            | Group by granularity                                                              | Time granularity           |  
|--------------------------------------------|----------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------|----------------------------|
| anrs_total                                 | Number of anrs                               | method, sample_type                                                                                                                |                                                                                   | five_minute, hourly, daily |
| anrs_duration_total                        | Sum of anrs durations                        | method, sample_type                                                                                                                |                                                                                   | five_minute, hourly, daily |
| crashes_total                              | Number of crashes                            | msg, tag_name, tag_value,                                                                                                          |                                                                                   | five_minute, hourly, daily |
| flutter_exceptions_total                   | Number of flutter exceptions                 | group_id, is_handled, msg, state                                                                                                   | group_id, msg                                                                     | five_minute, hourly, daily |
| logs_total                                 | Number of logs                               | log_property_key, log_property_value, msg, type                                                                                    | log_property                                                                      | five_minute, hourly, daily |
| moments_total                              | Number of moments                            | duration_bucket, moment_property_key, moment_property_value, name                                                                  | duration_bucket, moment_property_value                                            | five_minute, hourly, daily |
| network_requests_successful_duration_total | Sum of successful network requests durations | domain, method, path                                                                                                               | top_n_domain, top_n_path                                                          | hourly, daily              |
| network_requests_successful_total          | Number of successful network requests        | domain, duration_bucket (note: currently we do not support duration, only buckets as described in our documentation), method, path | top_n_domain, top_n_path                                                          | hourly, daily              |
| network_requests_total                     | Number of network requests                   | domain, method, path, status_code                                                                                                  | status_code, top_n_domain, top_n_path                                             | five_minute, hourly, daily |
| sessions_total                             | Number of sessions                           | has_anr, session_property_key, sessions_property_value                                                                             | session_property                                                                  | five_minute, hourly, daily |
| sessions_duration_total                    | Sum of sessions durations                    | has_anr, session_property_key, sessions_property_value                                                                             | session_property                                                                  | five_minute, hourly, daily |
| root_spans_total                           | Number of root spans                         | root_span_attribute_key, root_span_attribute_value, root_span_duration_bucket, root_span_name, root_span_outcome                   | root_span_attribute, root_span_duration_bucket, root_span_name, root_span_outcome | five_minute, hourly, daily |
| root_spans_duration_total                  | Sum of root spans duration                   | root_span_attribute_key, root_span_attribute_value, root_span_name, root_span_outcome                                              | root_span_attribute, root_span_name, root_span_outcome                            | five_minute, hourly, daily |
| unity_exceptions_total                     | Number of unity exceptions                   | group_id, is_handled, msg, state                                                                                                   | group_id, msg                                                                     | five_minute, hourly, daily |

:::info

- Refer to this [documentation](/metrics-forwarding/#dimension-reduction---other) to understand
  how `top_n` dimensions work.
- You can also pull the latest set of supported metrics directly from
  the [API](/metrics-forwarding/custom-metrics/custom-metrics-api/#get-metrics-and-parameters-supported).
  :::
