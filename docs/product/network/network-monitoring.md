---
title: Network Monitoring
description: Network Monitoring
sidebar_position: 1
---

# Network Monitoring

## Network Summary

The Network Summary dashboard offers a high-level overview of your network requests. 
You can view the number of requests, average duration, and error counts grouped by 4xx/5xx status codes and connection errors. 
These metrics are also grouped by app version, enabling you to track changes in network performance over time with your releases. Use the filters to analyze network performance based on specific domains, countries, personas, and more.

#### Total Successful Calls vs Total Failed Calls

- **Total Successful Calls**: The percentage of network requests that returned a 2xx HTTP status code.
- **Total Failed Calls**: The percentage of network requests that returned a 4xx or 5xx HTTP status code, or resulted in a connection error (e.g., timeouts, DNS failures, or network unavailability).

Note that 1xx and 3xx responses (redirects) are excluded from both metrics. As a result, the sum of Total Successful Calls and Total Failed Calls may not equal 100%.

<img src={require('@site/static/images/features/network-monitoring/network-monitoring-1.png').default} alt="Network Summary Overview" />

### Endpoints List

This table presents a comprehensive list of all your network requests, organized by method, domain, and path. For each endpoint, you can view the average duration, number of requests, median duration, and error percentage. The table is sortable by each column, allowing you to quickly identify the slowest endpoints or those with the highest error rates. Use the search bar to locate specific endpoints efficiently.

<img src={require('@site/static/images/features/network-monitoring/network-monitoring-2.png').default} alt="Network Summary Overview" />

### Domain Type

Easily filter by domain type to focus on first-party, third-party, or media requests. [Configure](/product/settings/app-settings/network) your first-party domains in the settings page for enhanced customization.

:::info Network Spans Forwarding

Embrace can help you diagnose network errors by forwarding network spans to your backend monitoring service. Read more about [Network Spans Forwarding](/product/network-spans-forwarding/).

:::
