---
title: Performance Tracing
sidebar_position: 7
---

# Performance Tracing

Embrace’s Performance Tracing solution gives you visibility into any app operation you’d like to track, including duration, success rate, and any contextual metadata collected at runtime that helps debug the root cause of your mobile app's performance issues. With our tool, you can quickly spot any bottlenecks in your app’s architecture, pinpoint areas you need to troubleshoot with high precision, and ultimately deliver a truly optimized user experience.

## Trace Roots view
The primary page shows all Trace Roots in your app, as well as some summary statistics.

To find specific Traces, the filter can consider:
* Duration
* Name
* Outcome
* Attributes (Key, then Value)


<img src={require('@site/static/images/Span filter > PerfTrace filter.png').default} alt="trace-filter" width="400"/>


## Trace Summary view
Investigate a specific Trace by clicking on the root.  In this Trace Summary view, you'll see a list of all Trace Instances based on your filter conditions.  Individual rows can be expanded to preview all the spans in the Trace.

<img src={require('@site/static/images/PerfTraces > Trace Summary previews.png').default} alt="trace-filter" width="400"/>


You can filter off the Root properties to find specific Instances. The filter provides the following dimensions:
* Duration
* Outcome
* Attributes (Key, then Value)
* Instance (a unique identifier for each Span)

<img src={require('@site/static/images/PerfTraces > Trace Summary filters.png').default} alt="trace-filter" width="400"/>

## Trace Instance view
## User Timeline view
Traces appear in both the Timeline View and Timeline Details.

Clicking on "See Details" for any Trace will take you directly the the Trace Instance page, exploring all the spans, events, and attributes for that Trace.

<img src={require('@site/static/images/PerfTraces > User Timeline.png').default} alt="trace-filter" width="400"/>

## Sessions filter
## Boards, Alerts, and Custom Metrics

