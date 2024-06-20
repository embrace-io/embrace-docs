---
title: Performance Tracing
sidebar_position: 7
---

# Performance Tracing

Embrace’s Performance Tracing solution gives you visibility into any app operation you’d like to track, including duration, success rate, and any contextual metadata collected at runtime that helps debug the root cause of your mobile app's performance issues. With our tool, you can quickly spot any bottlenecks in your app’s architecture, pinpoint areas you need to troubleshoot with high precision, and ultimately deliver a truly optimized user experience.

## Trace Roots View
The primary page shows all trace roots in your app, as well as summary metrics like count, error rate, percentiles of duration, and change from previous version.

<img src={require('@site/static/images/trace-roots.png').default} alt="Trace roots"/>

To narrow down the instances that are summarized in this view, you can apply the following filters on the root span as well as the child spans:
* Name
* Duration
* Outcome
* Attributes keys and values
* Span event names

## Trace Summary View
By clicking on the name of a Trace Root in the Trace Roots view, you can see a partial listing of all the instances of that trace.

Each row represents a specific instance of that trace being recorded. You can see its status, unique Span ID, duration, in addition to start and end times. All of these columns other than the Span ID is sortable. 

Clicking on the instance will open up an in-line preview of the details of that instance, including the child spans that it has, their duration, and whether they completed successfully.

On the right side each row that shows a trace instance, there are two icons. The first one takes you to the Trace Instance View, where you can see all the details about that instance, including attributes and events on each child span. The second one takes you to the specific session in the User Timeline view that this instance ended in so you can see the full context of what happened before and after this trace was recorded.

<img src={require('@site/static/images/trace-summary.png').default} alt="Trace summary"/>

You can filter by the same properties as in the Trace Roots View. In fact, the filters that you had set on the Trace Roots View will apply if you navigate here from there directly.

<img src={require('@site/static/images/trace-summary-filters.png').default} alt="Trace summary filters"/>

## Trace Instance View
This view show a trace in its entirety. Not only can you see all the information in trace instance preview, you can also see at the individual events and attributes recorded as part of on a each child span, along with metadata about the device and app.

<img src={require('@site/static/images/trace-instance.png').default} alt="Trace instance"/>

## User Timeline view
Traces appear in both the Timeline View and Timeline Details.

Clicking on "See Details" for any trace within the timeline will take you directly the the Trace Instance View.

<img src={require('@site/static/images/trace-user-timeline.png').default} alt="User timeline"/>

## Sessions Filters
Not only can you filter traces in the various pages dedicated to Performance Tracing, you can filter sessions in the Sessions View by whether or not they contain specific spans with certain attributes and events.

<img src={require('@site/static/images/trace-session-filters.png').default} alt="Session filters"/>

## Boards, Alerts, and Custom Metrics
You can create Boards, Alerts, and Custom Metrics based on trace data.

<img src={require('@site/static/images/trace-widgets.png').default} alt="Trace widgets"/>
<img src={require('@site/static/images/trace-alerts.png').default} alt="Trace alerts"/>

## Slow Traces
With the Slow Traces feature, you can identify performance bottlenecks and prioritize your optimization efforts.
Slow Traces are trace instances with both significant occurrences (100 over the last two days) and durations surpassing the 95th percentile of successful traces bearing the same name. 
You can get the slow traces on the issues page.

<img src={require('@site/static/images/trace-slow-traces.png').default} alt="Slow traces"/>

Once you click on a slow trace, you can see specific instances of that trace.

:::info
You can also see those instances if you add the filter `type = slow` to see the on the performance traces tab.
:::

