---
title: Code Samples
description: Learn how to integrate the Embrece Metrics API using code
sidebar_position: 30
---

# Code Samples

You can pull data from the Embrace Metrics API using any SDK for your language that supports PromQL.

Note: if you account is using Embrace's [regional data residency](/region/) feature, then use the following URLs instead:

- United States: `https://api-us1.embrace.io/metrics`
- European Union: `https://api-eu1.embrace.io/metrics`

## Prerequisites

- [Embrace Metrics API Token](/metrics-forwarding/metrics-api/#get-started)

## Node Example

This example uses the [prometheus-query](https://www.npmjs.com/package/prometheus-query) NPM library for JavaScript/TypeScript.

```typescript
// Example that shows how to consume Embrace data using node prometheus-query library
// https://www.npmjs.com/package/prometheus-query

// to install
// npm install prometheus-query
const promQuery = require('prometheus-query');

const METRICS_API_ENDPOINT = "https://api.embrace.io/metrics/";

const TOKEN = '<your token>';
const AUTH_HEADER = `Bearer ${TOKEN}`;
const MY_APP_ID = '<your app ID>';
const TIME_STEP_SECS = 3600; // NOTE: Steps smaller than one hour will be rounded up to an hour
const QUERY = `sum(hourly_sessions_total{app_id="${MY_APP_ID}"})`;

const prom = new promQuery.PrometheusDriver({
    endpoint: METRICS_API_ENDPOINT,
    baseURL: "/api/v1", // default value
    headers: {Authorization: AUTH_HEADER},
    preferPost: true
});

// Query a 24 hour period with an hour step
const end = new Date(new Date().toUTCString()).getTime();
const start = end - 24 * 60 * 60 * 1000;

// Get list of available metrics
prom.labelValues("__name__","", start, end)
    .then((res) => {
        console.log('[metrics] Metrics:');
        console.log(res);
        console.log("\n");
    }).catch(console.error);

const fetchData = (query, start, end, step) => {
    prom.rangeQuery(query, start, end, step)
        .then((res) => {
            const series = res.result;
            series.forEach((serie) => {
                console.log("Series:", serie.metric.toString());
                console.log("Values:\n" + serie.values.join('\n'));
            });
        })
        .catch(console.error);
};

fetchData(QUERY, start, end, TIME_STEP_SECS);
```

## Python Example

This example uses the [prometheus-api-client](https://pypi.org/project/prometheus-api-client/) package for python.

```python
from datetime import datetime

from prometheus_api_client import PrometheusConnect, MetricsList, Metric, MetricSnapshotDataFrame, MetricRangeDataFrame
from prometheus_api_client.utils import parse_datetime

# Constants
# Embrace prometheus public URL
metrics_api_endpoint = 'https://api.embrace.io/metrics'

# API-Token
token = '<your token>'

# Embrace AppId
app_id = '<your app id>'

# Connect library to Embrace prometheus host
prom = PrometheusConnect(url=metrics_api_endpoint, headers={'Authorization': 'Bearer ' + token})

# Get the list of all available metrics
metrics = prom.all_metrics()
print(metrics)

# Define start and end time
start_time = parse_datetime('1d')
end_time = parse_datetime('now')
# Define step in seconds
step_in_sec = 60 * 60;

# Query data
metric_data = prom.custom_query_range(
    'hourly_sessions_total{app_id="' + app_id + '"}',  # this is the metric name and label config
    start_time=start_time,
    end_time=end_time,
    step=step_in_sec
)
print(metric_data)
print(len(metric_data))

# Use library to plot results
metric_object_list = MetricsList(metric_data)
my_metric_object = metric_object_list[1] # one of the metrics from the list
print(my_metric_object)
print(my_metric_object.metric_name)
```
