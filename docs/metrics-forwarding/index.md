---
title: Metrics Forwarding
sidebar_position: 102
---

# Metrics Forwarding

## What is Metrics Forwarding?

Metrics Forwarding enables you to send aggregated performance metrics from Embrace to your observability platform. Instead of viewing metrics only in the Embrace dashboard, you can forward them to tools like Grafana Cloud, Datadog, New Relic, or any other platform that supports time-series metrics.

This allows you to:
- **Combine mobile and backend metrics** in unified dashboards
- **Use your existing alerting systems** for mobile app performance
- **Build custom visualizations** with your preferred tools
- **Correlate mobile metrics** with infrastructure and backend metrics

## Available Metrics

Embrace forwards standard metrics at different time granularities to help you monitor your app's health:

### Metric Naming

Metric names follow the format `embrace.<metric_name>.<granularity>` or `embrace_<metric_name>_<granularity>` depending on the data destination conventions. Some data destinations apply changes to the metric name. For example, Grafana Cloud receives the metric name as `embrace_sessions_total_five_minute` but converts it into `embrace_sessions_five_minute_total`.

### Standard Metrics

All data destinations receive the following metrics:

| Data Destinations | Metric Names                                                                                                           |
|-------------------|------------------------------------------------------------------------------------------------------------------------|
| Grafana Cloud     | embrace_crash_five_minute_total, embrace_session_five_minute_total, embrace_crash_free_user_five_minute_total          |
| Grafana Cloud     | embrace_crash_hourly_total, embrace_session_hourly_total, embrace_crash_free_user_hourly_total                         |
| Grafana Cloud     | embrace_crash_daily_total, embrace_session_daily_total, embrace_crash_free_user_daily_total, embrace_users_daily_total |
| Others            | embrace.crash_total.hourly, embrace.session_total.hourly, embrace.crash_free_user_total.hourly                         |
| Others            | embrace.crash_total.daily, embrace.session_total.daily, embrace.crash_free_user_total.daily, embrace.users_total.daily |
| Others            | embrace.crash_total.five_minute, embrace.session_total.five_minute, embrace.crash_free_user_total.five_minute          |

### Time Granularities

Metrics are available at three different time granularities:

- **Five-minute**: Real-time monitoring with 5-minute aggregation windows
- **Hourly**: Medium-term trends and patterns
- **Daily**: Long-term analysis and reporting

## Enable Metrics Forwarding

:::info Contact Embrace
To enable Metrics Forwarding, please contact your Embrace onboarding specialist or reach out to support. Once enabled, you can configure your data destination through the Embrace dashboard.
:::

### Setup Process

1. Contact your Embrace onboarding specialist to enable Metrics Forwarding
2. Navigate to [Settings -> Integrations -> Data Destinations](https://dash.embrace.io/settings/organization/integrations/data_destinations) in the Embrace dashboard
3. Select and configure your preferred data destination
4. Start receiving metrics in your observability platform

<img src={require('@site/static/images/data-destinations/settings_page_example.png').default} alt="Image showing the settings page for data destinations" />

## Supported Platforms

Metrics can be forwarded to any of the following platforms:

- [Chronosphere](/data-destinations/chronosphere-setup.md)
- [Datadog](/data-destinations/data-dog-setup.md)
- [Elastic](/data-destinations/elastic-setup.md)
- [Grafana Cloud](/data-destinations/grafana-cloud-setup.md)
- [Honeycomb](/data-destinations/honeycomb.md)
- [New Relic](/data-destinations/new-relic-setup.md)
- [Observe](/data-destinations/observe-setup.md)
- [Splunk](/data-destinations/splunk.md)

For detailed setup instructions for each platform, see the [Data Destinations](/data-destinations/) guide.

## Related Features

- **[Logs Forwarding](/product/logs-forwarding/)**: Stream application logs in real-time to your observability platform
- **[Network Spans Forwarding](/product/network-spans-forwarding.md)**: Forward network request traces to your observability platform
- **[Custom Metrics API](/custom-metrics-api/)**: Send custom metrics from your application
- **[Data Destinations](/data-destinations/)**: Platform-specific setup guides