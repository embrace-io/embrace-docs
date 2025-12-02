---
title: Introduction
description: Learn about the Embrace integrations for viewing your data
sidebar_position: 0
---

# Data Destinations

Embrace Data Destinations allow you to forward your telemetry data to your observability platform of choice. Whether you
need metrics, traces, or logs, you can integrate Embrace with the tools your team already uses.

## Types of Data Forwarding

Embrace supports forwarding different types of telemetry data:

### [Metrics Forwarding](/metrics-forwarding/)

Export aggregated metrics (crashes, sessions, user engagement, etc).

### [Network Spans Forwarding](/product/network-spans-forwarding.md)

Export network request as spans with w3c traceparent headers, enabling distributed tracing between your mobile app and
backend services.

### [Logs Forwarding](/logs-forwarding/)

Export application logs in real-time. View mobile logs alongside backend logs for complete visibility across your stack.

## Supported Platforms

Embrace integrates with the following observability platforms. Each platform supports different types of data
forwarding:

| Platform                                                   | [Metrics](/metrics-forwarding/) | [Logs](/logs-forwarding/) | [Network Spans](/product/network-spans-forwarding.md) | Integration Guide                                        |
|------------------------------------------------------------|---------------------------------|---------------------------|-------------------------------------------------------|----------------------------------------------------------|
| [Chronosphere](/data-destinations/chronosphere-setup.md)   | ✓                               | ✓                         | ✓                                                     | [Setup Guide](/data-destinations/chronosphere-setup.md)  |
| [Datadog](/data-destinations/data-dog-setup.md)            | ✓                               | -                         | ✓                                                     | [Setup Guide](/data-destinations/data-dog-setup.md)      |
| [Elastic](/data-destinations/elastic-setup.md)             | ✓                               | ✓                         | ✓                                                     | [Setup Guide](/data-destinations/elastic-setup.md)       |
| [Grafana Cloud](/data-destinations/grafana-cloud-setup.md) | ✓                               | ✓                         | ✓                                                     | [Setup Guide](/data-destinations/grafana-cloud-setup.md) |
| [Honeycomb](/data-destinations/honeycomb.md)               | ✓                               | ✓                         | ✓                                                     | [Setup Guide](/data-destinations/honeycomb.md)           |
| [New Relic](/data-destinations/new-relic-setup.md)         | ✓                               | -                         | ✓                                                     | [Setup Guide](/data-destinations/new-relic-setup.md)     |
| [Observe](/data-destinations/observe-setup.md)             | ✓                               | -                         | -                                                     | [Setup Guide](/data-destinations/observe-setup.md)       |
| [Splunk](/data-destinations/splunk.md)                     | ✓                               | -                         | -                                                     | [Setup Guide](/data-destinations/splunk.md)              |

## Get Started

Head to [Settings -> Integrations -> Data Destinations](https://dash.embrace.io/settings/organization/integrations/data_destinations) in the dashboard and setup your first data destination:

<img src={require('@site/static/images/data-destinations/settings_page_example.png').default} alt="Image showing the
settings page for data destinations" />

