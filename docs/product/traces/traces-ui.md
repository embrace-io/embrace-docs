---
title: Traces UI
sidebar_position: 2
---

# Root Spans View

The primary page shows all root spans in your app, as well as summary metrics like count, error rate, percentiles of duration, and changes from a previous version.

<img src={require('@site/static/images/traces-page.png').default} alt="Traces"/>

To narrow down the spans that are summarized in this view, you can apply the following filters on the root span as well as the child spans:
- Name
- Duration*
- Outcome
- Attributes keys and values
- Span event names

*failed Spans are not included for duration aggregates, they are displayed as `0`

## Root Span Summary View

By clicking on the name of a Root Span in the Root Spans View, you can see a partial listing of all the instances of that Root Span.

Each row represents a specific instance of that Root Span being recorded. You can see its status, unique Span ID, and duration, in addition to start and end times. All of these columns other than the Span ID is sortable.  

Clicking on the instance will open up an in-line preview of the details of that instance, including the child spans that it has, their duration, and whether they were completed successfully.

On the right side each row that shows a Root Span instance, there are two icons. The first one takes you to the Root Span Instance View, where you can see all the details about that instance, including attributes and events on each child span. The second one takes you to the specific session in the User Timeline view that this instance ended in so you can see the full context of what happened before and after this Root Span was recorded.

<img src={require('@site/static/images/root-span-summary-1.png').default} alt="Root Span summary"/>

You can filter by properties similar to those in the Root Span View.

<img src={require('@site/static/images/root-spans-filters.png').default} alt="Trace summary filters"/>

## Root Span Instance View

This view shows a Root Span in its entirety. Not only can you see all the information in trace instance preview, you can also see at the individual events and attributes recorded as part of on a each child span, along with metadata about the device and app.

<img src={require('@site/static/images/root-span-instance-1.png').default} alt="Trace instance"/>

## User Timeline view

Root Spans appear in both the Timeline View and Timeline Details.

Clicking on "See Details" for any Root Span within the timeline will take you directly to the Root Span Instance View.

<img src={require('@site/static/images/traces-timeline.png').default} alt="User timeline"/>

## Sessions Filters

Not only can you filter spans in the various pages dedicated to Traces, you can filter sessions in the Sessions View by whether or not they contain specific spans with certain attributes and events.

<img src={require('@site/static/images/trace-session-filters.png').default} alt="Session filters"/>

## Boards, Alerts, and Custom Metrics

You can create Boards, Alerts, and Custom Metrics based on span data.

<img src={require('@site/static/images/spans-widgets.png').default} alt="Trace widgets"/>
<img src={require('@site/static/images/spans-alerts.png').default} alt="Trace alerts"/>

## Slow Root Spans

With the Slow Root Spans feature, you can identify performance bottlenecks and prioritize your optimization efforts.
Slow root spans are fully customizable, allowing you to define performance thresholds based on your specific SLOs and business objectives rather than relying solely on percentile calculations.

**Setting Custom Thresholds**

- Configure millisecond-based thresholds for any span in the Root Span Summary page.
- Historical threshold tracking for performance trend analysis

**Where You'll See Slow Spans**

- **Root Span Summary**: Slow Span indicator if span instance took longer than defined threshold.
- **Sessions**: Issue indicators when sessions contain slow spans
- **User Timeline**: Dedicated slow span issue type rows
- **Release Health**: Expandable slow root spans cards with detailed metrics
- **Issues**: Root spans with at least one instance exceeding the slowness threshold
- **Filtering**: New "Has Slow Root Span" session attribute

**Alerting & Monitoring**

- New alert type: "Root Span Slowness Percentage"
- Integration with existing dashboard widgets
- Custom aggregations and filters

## Span Instances Filters

Filter your instances by durantion or outcome with these filters:
- **All**: all instances displayed
- **Slowest**: instances completed successfully with duration > p95.
- **Fastest**: instances completed successfully and not slow (with duration < p95).
- **Unsuccessful**:
  - **Erro**r: instances encountered an error.
  - **Unknown**: insufficient data to determine instance outcome.
  - **User Abandon**: user navigated away before instance completion.

## Implementation Details
- [**Android**](/android/features/traces)
- [**iOS**](/ios/6x/core-concepts/traces-spans.md)
- [**Unity**](/unity/features/traces)
- [**React Native**](/react-native/features/traces)
- [**Flutter**](/flutter/features/traces)
