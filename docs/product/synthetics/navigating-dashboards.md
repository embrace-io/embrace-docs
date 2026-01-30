---
title: Synthetic Dashboards
description: Exploring your synthetic data
sidebar_position: 1
---

## Synthetic Overview
The Synthetic Sites view is the primary entry point for understanding synthetic performance across all of the sites you are monitoring. It presents a site level comparison of key Web Vitals metrics: TTFB, FCP, LCP, TBT, and CLS. This view can be filtered by regions and browsers for the selected time window. From this view, teams can quickly identify which sites are underperforming and drill down into each site to begin to isolate root cause. Clicking on a cell continues the investigation into site performance.

![Synthetics overview dashboard with dark background displaying a data table containing site names in the first column and color-coded performance metrics across multiple columns, providing an at-a-glance view of all configured site performance](/images/synthetics/synthetics-overview.png)

## Site Dashboard
The site overview provides a consolidated view of synthetic performance for a single site, aggregating results across all configured pages, regions, and browsers. Summary indicators highlight which Web Vitals fall outside acceptable thresholds. In this example, strong TTFB alongside poor FCP, LCP, and TBT suggests that performance problems are occurring after the initial response, likely due to blocking or slow resources in the critical rendering path as well as potential issues with JavaScript execution. This view helps teams confirm whether issues are isolated or site-wide before drilling into individual pages.

![Site-level synthetic monitoring dashboard with dark background showing multiple organized sections. The dashboard displays performance metrics, recent test results, and historical trend data for a single configured site. Sections include status indicators, test execution timeline, and performance graphs arranged for quick assessment of overall site health.](/images/synthetics/site-dash.png)

The Vitals by Page Label table breaks down synthetic performance by page, allowing teams to identify which pages are contributing most to poor performance. Pages with significantly worse LCP, TBT, or CLS can be quickly identified and prioritized for further analysis. Selecting a page transitions the investigation from a site view to page specific diagnostics (next).

![Arrow cursor positioned over a specific cell in a performance metrics table on a dark-themed dashboard. The table presents site performance data in a structured grid format with columns for different metrics. Surrounding dashboard elements include summary panels and navigation controls. The professional interface emphasizes interactive data exploration.](/images/synthetics/site-table-click.png)

## Pages Dashboard
The page level view focuses on a single page’s synthetic performance. This view provides the context needed to determine whether optimization efforts should focus on page construction, JavaScript, or third-party resources. Time series charts show how individual performance metrics change over time. Engineers can correlate changes in performance with deployments, configuration changes, or traffic patterns. 

![Page-level dashboard with dark background displaying time series performance data. The dashboard includes line charts and graphs showing performance metrics over time, with multiple data series visualized in different colors to track performance trends and variations.](/images/synthetics/page-dash.png)

Individual data points link directly to the underlying synthetic test details, enabling rapid transition from trend analysis to detailed diagnostics. Other details on the pages dashboard include rendering metrics, filmstrips, CPU impact, and even Lighthouse test scores and audits.

![Arrow cursor positioned over a data point on a time series chart in a page-level synthetic dashboard. The line chart displays performance metrics over time using multiple colored lines representing different measurements. The dark background interface includes dashboard controls at the top and summary panels on the sides, demonstrating interactive data point selection.](/images/synthetics/pages-chart-click.png)

## Sythetic Test Details
The test details view lists the individual results that make up the aggregated metrics seen previously. The comprehensive diagnostics include filmstrips, waterfall, JavaScript, and third-party impact. This view gives users the ability to identify exactly what is impact the user experience.

## Tests
The Tests dashboard is located in a tab on the overview page. This list view shows individual test executions, starting with the most recent.The list can be filtered by status, site, browser, and geographic region. This view allows teams to quickly inspect specific test runs, starting with the most recent.

![Dashboard section with dark background showing a list of completed synthetic tests in a tabular format. Each row displays the test name, status indicator showing pass or fail, execution timestamp, and duration. The organized table provides a clear view of test execution history and results.](/images/synthetics/tests-dash.png)


