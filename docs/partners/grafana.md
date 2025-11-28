---
title: Grafana
sidebar_position: 1
---

# Grafana Partnership

Embrace delivers context-rich mobile data to Grafana Cloud in the form of metrics and traces. Embrace's data seamlessly integrates with the LGTM stack in a number of ways, outlined below.

## Metrics  

### Data Destinations

To forward your Metrics to Grafana Cloud, Embrace offers a "push" method called [Data Destinations](/data-destinations). In a set time interval, Embrace will forward such "standard metrics" as `crash total` and `sessions total` to Grafana. Additionally, Embrace users can create [Custom Metrics](/metrics-forwarding/custom-metrics-api/custom-metrics-grafana) according to their own criteria, and also forward these via Data Destinations.

See the [setup docs](/data-destinations/grafana-cloud-setup/) for more information on Data Destinations to Grafana Cloud.

### Metrics API

Embrace also offers a "pull" method for metrics in the form of our public [Metrics API](/metrics-forwarding/embrace-api/). You can directly query Embrace's metrics from your backend using the [PromQL query language](https://prometheus.io/docs/prometheus/latest/querying/basics/).  

See the [setup docs](/metrics-forwarding/embrace-api/grafana_integrations/) for more information on Metrics API for Grafana. You can also look at [sample queries](/metrics-forwarding/embrace-api/code_samples/) using Node and Python.

## Traces

### Network Spans Forwarding

[Network Span Forwarding](/product/network-spans-forwarding/) is an end-to-end network tracing feature offered by Embrace and Grafana. With this feature enabled, you can trace the result of a networking request from the mobile device to your web service, with rich detail in both the Embrace dashboard and Grafana Cloud. The [w3c traceheader](https://www.w3.org/TR/trace-context-1/#traceparent-header) connects networking requests in your web service to activity in your mobile app.
