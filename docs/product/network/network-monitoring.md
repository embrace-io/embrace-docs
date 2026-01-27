---
title: Network Monitoring
description: Network Monitoring
sidebar_position: 1
---

# Network Monitoring

## Network Summary

The Network Monitoring dashboard offers a high-level overview of your network requests.
You can view the number of requests, and error counts grouped by 4xx/5xx status codes and connection errors.
These metrics are also grouped by app version, enabling you to track changes in network performance over time with your releases. Use the filters to analyze network performance based on specific domains, countries, personas, and more.

<img src={require('@site/static/images/features/network-monitoring/network-monitoring-1.png').default} alt="Network Summary Overview" />

### Total Successful Calls vs Total Failed Calls

- **Total Successful Calls**: Percentage of requests that returned a 2xx response.
- **Total Failed Calls**: Percentage of requests that returned a 4xx or 5xx response, or failed due to a connection error (timeouts, DNS failures, network unavailability).

:::warning These metrics don't add up to 100%
1xx (informational) and 3xx (redirects) responses are excluded from both metrics.
To analyze these responses, create a [custom dashboard](/product/boards/custom-dashboards/) using the **Network Request** metric grouped by **Status Code**.
:::

<img src={require('@site/static/images/features/network-monitoring/network-monitoring-1.1.png').default} alt="Total Successful vs Failed Calls metrics in Network Monitoring dashboard" />

### Domain Type

Easily filter by domain type to focus on first-party, third-party, or media requests. [Configure](/product/settings/app-settings/network) your first-party domains in the settings page for enhanced customization.

:::info Network Spans Forwarding

Embrace can help you diagnose network errors by forwarding network spans to your backend monitoring service. Read more about [Network Spans Forwarding](/product/network-spans-forwarding/).

:::

## Endpoints List

This table presents a comprehensive list of all your network requests, organized by method, domain, and path. For each endpoint, you can view the average duration, number of requests, median duration, and error percentage. The table is sortable by each column, allowing you to quickly identify the slowest endpoints or those with the highest error rates. Use the search bar to locate specific endpoints efficiently.

<img src={require('@site/static/images/features/network-monitoring/network-monitoring-2.png').default} alt="Network Summary Overview" />

