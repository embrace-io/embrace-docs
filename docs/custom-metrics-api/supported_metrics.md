---
title: Supported Metrics
description: Learn about the metrics supported by the Custom Metrics API
sidebar_position: 1
---

# Supported Metrics

Global filters and global group bys are available to use on all the metrics.

- Global filters: app_version, country, model, os_major_version and os_version.
- Global group bys: app_version, country, os_major_version, os_version and top_n_market_name.

The following metrics are supported as Custom Metrics. Metrics with the suffix "_total" are gauges.

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

- Refer to this [documentation](/embrace-api/supported_metrics_and_queries/#dimension-reduction---other) to understand
   how `top_n` dimensions work. We keep the top 50 for top_n_market_name, top_n_domain, and top_n_path.
- You can also pull the latest set of supported metrics directly from
   the [API](/custom-metrics-api/#get-metrics-and-parameters-supported).
   :::
