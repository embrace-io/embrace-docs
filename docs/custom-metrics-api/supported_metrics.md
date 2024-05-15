---
title: Supported Metrics
description: Learn about the metrics supported by the Custom Metrics API
sidebar_position: 1
---

# Custom Metrics API Supported Metrics

## Custom Metrics

The following metrics are supported as Custom Metrics. Metrics with the suffix "_total" are gauges.

Global filters and global group bys are available to use on all the metrics.

To query your desired unit, simply prefix the metric name with the unit, eg: `daily_custom_metrics_total`

| Global filters   | Global group bys  |           
|------------------|-------------------|
| app_version      | app_version       |
| country          | country           |
| model            | os_major_version  |
| os_major_version | os_version        |
| os_version       | top_n_market_name |

| Metric                                     | Description                                  | Filters                                                                                      | Group by granularity                                                    | Time granularity           |           
|--------------------------------------------|----------------------------------------------|----------------------------------------------------------------------------------------------|-------------------------------------------------------------------------|----------------------------|
| anrs_total                                 | Number of anrs                               | method, sample_type                                                                          |                                                                         | five_minute, hourly, daily |
| crashes_total                              | Number of crashes                            | msg, tag_name, tag_value,                                                                    |                                                                         | five_minute, hourly, daily |
| flutter_exceptions_total                   | Number of flutter exceptions                 | group_id, is_handled, msg, state                                                             | group_id, msg                                                           | five_minute, hourly, daily |
| logs_total                                 | Number of moments                            | log_property_key, log_property_value, msg, type                                              | log_property_value                                                      | five_minute, hourly, daily |
| moments_total                              | Number of moments                            | duration_bucket, moment_property_key, moment_property_value, name                            | duration_bucket, moment_property_value                                  | five_minute, hourly, daily |
| network_requests_successful_duration_total | Sum of successful network requests durations | domain, method, path                                                                         | top_n_domain, top_n_path                                                | hourly, daily              |
| network_requests_successful_total          | Number of successful network requests        | domain, duration_bucket, method, path                                                        | top_n_domain, top_n_path                                                | hourly, daily              |
| network_requests_total                     | Number of network requests                   | domain, method, path, status_code                                                            | status_code, top_n_domian, top_n_path                                   | five_minute, hourly, daily |
| sessions_total                             | Number of sessions                           | has_anr, session_property_key, sessions_property_value                                       | session_property_value                                                  | five_minute, hourly, daily |
| sessions_duration_total                    | Sum of sessions durations                    | has_anr, session_property_key, sessions_property_value                                       | session_property_value                                                  | five_minute, hourly, daily |
| traces_total                               | Number of root traces                        | trace_attribute_key, trace_attribute_value, trace_duration_bucket, trace_name, trace_outcome | trace_attribute_value, trace_duration_bucket, trace_name, trace_outcome | five_minute, hourly, daily |
| traces_duration_total                      | Sum of root traces duration                  | trace_attribute_key, trace_attribute_value, trace_name, trace_outcome                        | trace_attribute_value, trace_name, trace_outcome                        | five_minute, hourly, daily |
| unity_exceptions_total                     | Number of unity exceptions                   | group_id, is_handled, msg, state                                                             | group_id, msg                                                           | five_minute, hourly, daily |

:::info
1. [Document explaining](https://embrace.io/docs/embrace-api/supported_metrics_and_queries/#dimension-reduction---other) how `top_n` dimensions works.
2. Check the [API](https://embrace.io/docs/custom-metrics-api/#get-metrics-and-parameters-supported) as we're alwats adding in more!.