---
title: Introduction
description: Learn about the Embrace integrations for viewing your data
sidebar_position: 0
---

# Data Destinations

Embrace Data Destinations allow you to forward telemetry data from your mobile applications to your observability platform of choice. Whether you need metrics, logs, or traces, you can integrate Embrace with the tools your team already uses.

## Types of Data Forwarding

Embrace supports forwarding different types of telemetry data:

### [Metrics Forwarding](/product/metrics-forwarding/)

Forward aggregated performance metrics (crashes, sessions, user engagement) to your observability platform. Metrics are sent at different time granularities (5-minute, hourly, daily) to support real-time monitoring and long-term analysis.

### [Logs Forwarding](/product/logs-forwarding/)

Stream all application logs in real-time to your observability platform using OpenTelemetry exporters. View mobile logs alongside backend logs for complete visibility across your stack.

### [Network Spans Forwarding](/product/network-spans-forwarding.md)

Export network request traces with w3c traceparent headers, enabling distributed tracing between your mobile app and backend services.

## Supported Platforms

Embrace integrates with the following observability platforms. Each platform supports different types of data forwarding:

| Platform | [Metrics](/product/metrics-forwarding/) | [Logs](/product/logs-forwarding/) | [Network Spans](/product/network-spans-forwarding.md) | Integration Guide |
|----------|---------|------|---------------|-------------------|
| [Chronosphere](/data-destinations/chronosphere-setup.md) | ✓ | ✓ | ✓ | [Setup Guide](/data-destinations/chronosphere-setup.md) |
| [Datadog](/data-destinations/data-dog-setup.md) | ✓ | ✓ | ✓ | [Setup Guide](/data-destinations/data-dog-setup.md) |
| [Elastic](/data-destinations/elastic-setup.md) | ✓ | ✓ | ✓ | [Setup Guide](/data-destinations/elastic-setup.md) |
| [Grafana Cloud](/data-destinations/grafana-cloud-setup.md) | ✓ | ✓ | ✓ | [Setup Guide](/data-destinations/grafana-cloud-setup.md) |
| [Honeycomb](/data-destinations/honeycomb.md) | ✓ | ✓ | ✓ | [Setup Guide](/data-destinations/honeycomb.md) |
| [New Relic](/data-destinations/new-relic-setup.md) | ✓ | ✓ | ✓ | [Setup Guide](/data-destinations/new-relic-setup.md) |
| [Observe](/data-destinations/observe-setup.md) | ✓ | ✓ | - | [Setup Guide](/data-destinations/observe-setup.md) |
| [Splunk](/data-destinations/splunk.md) | ✓ | ✓ | - | [Setup Guide](/data-destinations/splunk.md) |

**Additional Options:**
- **[Grafana Visualization Suite](/embrace-api/grafana_integrations/)**: Create custom dashboards and visualizations
- **Any OpenTelemetry Collector**: Logs and traces can be sent to any OTLP-compatible endpoint

## Get Started

To set up a data destination:

1. Contact your Embrace onboarding specialist to enable the data forwarding features you need
2. Choose your observability platform from the list above
3. Follow the platform-specific integration guide
4. Configure the appropriate forwarding type ([Metrics](/product/metrics-forwarding/), [Logs](/product/logs-forwarding/), or [Network Spans](/product/network-spans-forwarding.md))

For metrics forwarding, you can also configure destinations directly in the dashboard at [Settings -> Integrations -> Data Destinations](https://dash.embrace.io/settings/organization/integrations/data_destinations):

<img src={require('@site/static/images/data-destinations/settings_page_example.png').default} alt="Image showing the settings page for data destinations" />

