---
title: Network Monitoring
description: Network Monitoring
sidebar_position: 5
---

# Network Monitoring

We provide a comprehensive view of your network requests, allowing you to assess the performance of each request and its impact on your users.

:::info Network Spans Forwarding

Embrace can help you diagnose network errors by forwarding network spans to your backend monitoring service. Read more about [Network Spans Forwarding](/product/network-spans-forwarding/).

:::

## Network Summary

The Network Summary dashboard offers a high-level overview of your network requests. You can view the number of requests, average duration, and error counts grouped by 4xx and 5xx status codes. These metrics are also grouped by app version, enabling you to track changes in network performance over time with your releases. Use the filters to analyze network performance based on specific domains, countries, personas, and more.

<img src={require('@site/static/images/features/network-monitoring/network-monitoring-1.png').default} alt="Network Summary Overview" />

### Endpoints List

This table presents a comprehensive list of all your network requests, organized by method, domain, and path. For each endpoint, you can view the average duration, number of requests, median duration, and error percentage. The table is sortable by each column, allowing you to quickly identify the slowest endpoints or those with the highest error rates. Use the search bar to locate specific endpoints efficiently.

<img src={require('@site/static/images/features/network-monitoring/network-monitoring-2.png').default} alt="Network Summary Overview" />

### Domain Type

Easily filter by domain type to focus on first-party, third-party, or media requests. Configure your first-party domains in the settings page for enhanced customization.
