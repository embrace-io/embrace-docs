---
title: Performance Tracing
sidebar_position: 7
---

# Performance Tracing

Embrace’s Performance Tracing solution gives you visibility into any app operation you’d like to track, including duration, success rate, and any contextual metadata collected at runtime that helps debug the root cause of your mobile app's performance issues. With our tool, you can quickly spot any bottlenecks in your app’s architecture, pinpoint areas you need to troubleshoot with high precision, and ultimately deliver a truly optimized user experience.

## Trace Roots View
The primary page shows all Trace Roots in your app, as well as summary metrics like count, error rate, percentiles of duration, and change from previous version

To narrow down the instances that are summarized in this view, you can apply the following filters on the root span as well as the child spans:
* Name
* Duration
* Outcome
* Attributes keys and values
* Span event names

<img src={require('@site/static/images/trace-roots.png').default} alt="Trace roots" width="600"/>

## Trace Summary View
By clicking on the name of a Trace Root in the Trace Roots view, you can see a partial listing of all the instances of that Trace.

Each row represents a specific instance of that trace being recorded. You can see its status, unique Span ID, duration, in addition to start and end times. All of these columns beside the Span ID is sortable. 

Clicking on the instance will open up an in-line preview of the details of that instance, including the child spans that it has, their duration, and whether they completed successfully.

Beside the icon that takes you to the User Timeline, there is another icon that takes you to the full Trace Instance view, which gives you even more details about the Trace and the spans that comprise it. There is also an icon that will take you to the specific session in the User Timeline view that this trace instance ended in.

<img src={require('@site/static/images/trace-summary.png').default} alt="Trace summary" width="600"/>

You can filter by the same properties as in the Trace Roots view. In fact, the filters that you had set on the Trace Roots view will apply if you navigate here from there directly.

<img src={require('@site/static/images/trace-summary-filters.png').default} alt="Trace summary filters" width="600"/>

## Trace Instance View
This view show a Trace in its entirety. Not only can you see all the information in trace instance preview in the Trace Summary and go directly to the User Timeline, you can also look at the individual Events and Attributes recorded as part of on a Span, along with metadata about the device and app on which the Trace was recorded.

<img src={require('@site/static/images/trace-instance.png').default} alt="Trace instance" width="600"/>

## User Timeline view
Traces appear in both the Timeline View and Timeline Details.

Clicking on "See Details" for any Trace will take you directly the the Trace Instance page, exploring all the spans, events, and attributes for that Trace.

<img src={require('@site/static/images/trace-user-timeline.png').default} alt="User timeline" width="600"/>

## Sessions Filters
Not only can you filter Traces in the various pages dedicated to Performance Tracing, you can filter Sessions in the Sessions view by whether or not they contain specific Spans with certain Attributes and Events.

<img src={require('@site/static/images/trace-session-filters.png').default} alt="Session filters" width="600"/>

## Boards, Alerts, and Custom Metrics
You can create Boards, Alerts, and Custom Metrics based on Trace data.

<img src={require('@site/static/images/trace-widgets.png').default} alt="Trace widgets" width="600"/>
<img src={require('@site/static/images/trace-alerts.png').default} alt="Trace alerts" width="600"/>

## Slow Traces
With the Slow Traces feature, you can identify performance bottlenecks and prioritize your optimization efforts.
Slow Traces are trace instances with both significant occurrences (100 over the last two days) and durations surpassing the 95th percentile of successful traces bearing the same name. 
You can get the slow traces on the issues page.

<img src={require('@site/static/images/trace-slow-traces.png').default} alt="Slow traces" width="600"/>

Once you click on a slow trace, you can see specific instances of that trace.

:::info
You can also see those instances if you add the filter `type = slow` to see the on the performance traces tab.
:::

