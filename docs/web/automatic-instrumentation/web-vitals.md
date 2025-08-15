---
title: Web Vitals
description: Automatically track Web Vital reports from your web app with Embrace
sidebar_position: 3
---

# Web Vitals

The Embrace SDK automatically reports Web Vital metrics from your application providing visibility into user perceived
performance issues.

## How Web Vital Instrumentation Works

The SDK leverages the [web-vitals](https://www.npmjs.com/package/web-vitals) package to record specific Web Vital scores
as SpanEvents on the current session Span. By default, this includes just the
[Core Web Vitals](https://www.npmjs.com/package/web-vitals#core-web-vitals) which are defined as
Largest Contentful Paint (LCP), Cumulative Layout Shift (CLS), and Interaction to Next Paint (INP).

The SDK also uses the [@opentelemetry/instrumentation-document-load](https://www.npmjs.com/package/@opentelemetry/instrumentation-document-load)
package to record Spans related to the page's initial load. When possible this information is combined in User Timelines
with LCP reports to provide more context in the Embrace Dashboard.

This automatic instrumentation gives you immediate visibility into performance issues encountered by your users
without requiring manual code changes.

## Data Captured

For each Web Vital, the SDK captures:

- The score and rating from the Web Vital report
- The timestamp most attributed to the score
- The element most attributed to the score
- The URL of the page being reported on

## Integration with Other Features

Web Vitals integrates with other Embrace features:
- Web Vital reports are associated with the current session and, if possible, correlated with page load information
and user interactions
- Performance dashboards monitor Web Vitals and surface issues on particular pages
- Alerts can be set on Web Vital scores exceeding specific thresholds

## Browser Support

Due to browser limitations not all Web Vitals are available from user interactions on all browsers. See
[Browser Support](https://www.npmjs.com/package/web-vitals#browser-support) in the web-vitals package documentation for
a detailed breakdown.
