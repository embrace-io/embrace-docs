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


<img src={require('@site/static/images/Span filter > PerfTrace filter.png').default} alt="trace-filter" width="400"/>


## Trace Summary View
By clicking on the name of a Trace Root in the Trace Roots view, you can see a partial listing of all the instances of that Trace.

Each row represents a specific instance of that trace being recorded. You can see its status, unique Span ID, duration, in addition to start and end times. All of these columns beside the Span ID is sortabnle. 

<img src={require('@site/static/images/PerfTraces > Trace Summary previews.png').default} alt="trace-filter" width="400"/>

There is also an icon that will take you to the specific session in the User Timeline view that this trace instance ended in.

IMAGE


You can filter by the same properties as in the Trace Roots view. In fact, the filters that you had set on the Trace Roots view will apply if you navigate here from there directly.

<img src={require('@site/static/images/PerfTraces > Trace Summary filters.png').default} alt="trace-filter" width="400"/>

Clicking on the instance will open up an in-line preview of the details of that instance, including the child spans that it has, their duration, and whether they completed successfully.

IMAGE

Beside the icon that takes you to the User Timeline, there is another icon that takes you to the full Trace Instance view, which gives you even more details about the Trace and the spans that comprise it.

IMAGE

## Trace Instance view
This view show a Trace in its entirety. Not only can you see all the information in trace instance preview in the Trace Summary and go directly to the User Timeline, you can also look at the individual Events and Attributes recorded as part of on a Span, along with metadata about the device and app on which the Trace was recorded.

IMAGE

## User Timeline view
Traces appear in both the Timeline View and Timeline Details.

Clicking on "See Details" for any Trace will take you directly the the Trace Instance page, exploring all the spans, events, and attributes for that Trace.

<img src={require('@site/static/images/PerfTraces > User Timeline.png').default} alt="trace-filter" width="400"/>

## Sessions Filters
Not only can you filter Traces in the various pages dedicated to Performance Tracing, you can filter Sessions in the Sessions view by whether or not they contain specific Spans with certain Attributes and Events.

IMAGE

## Boards, Alerts, and Custom Metrics
You can create Boards, Alerts, and Custom Metrics based on the duration of Traces.

IMAGES

## Slow Traces
With the Slow Traces feature, you can identify performance bottlenecks and prioritize your optimization efforts.
Slow Traces are trace instances with both significant occurrences (100 over the last two days) and durations surpassing the 95th percentile of successful traces bearing the same name. 
You can get the slow traces on the issues page.

<img src={require('@site/static/images/slow_traces_issues_page.png').default} alt="trace-filter" width="800"/>

Once you click on a slow trace, you can see specific instances of that trace.

<img src={require('@site/static/images/slow_trace_instances.png').default} alt="trace-filter" width="800"/>

:::info
You can also see those instances if you add the filter `type = slow` to see the on the performance traces tab.
:::

