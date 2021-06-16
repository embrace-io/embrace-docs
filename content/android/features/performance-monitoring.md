---
title: "Performance Monitoring"
description: Measure the performance of your Android application using Embrace
weight: 1
aliases:
  - /android/performance-monitoring/
---

# Measure Performance

## Moments

Embrace also contains a powerful stopwatch and abandonment tracking feature, which we call **moments**.
This mechanism is the same one used to measure application launch performance, which we covered in the [Session Reporting]({{< relref "/android/integration/session-reporting" >}}) section.

Similar to [Logs]({{< relref "/android/integration/log-message-api" >}}), moments will immediately make a network request.

{{< hint info >}}
The performance of the networking calls that moments make are unrelated to the performance of the moment itself.
{{< /hint >}}

Moments are best used for tracking critical user flows that are generally short in nature.
For more suggestions on what to measure with moments, see the [Best Practices]({{< relref "/best-practices/app-performance#keep-it-short" >}}) page.

## Starting a Moment

Here's how you start a moment.

```java
Embrace.getInstance().startEvent("addItem");
```

In a fictional scenario, this is a moment we're using to measure how quickly an item is added to a `ListView` after a user selects the plus button.

You can also start a moment with **properties**, an **identifier**, and **screenshots**.
For more on this, check out the [API docs]({{< api android >}}).

{{< hint warning>}}
{{< readFile file="shared/property-limit.md" >}}
{{< /hint >}}

## Ending a Moment

Next, here's how you end a moment.

```java
Embrace.getInstance().endEvent("addItem");
```

A timer is started once you make a call to start a moment.
If you end the moment within a configurable threshold, then the timer ends and the client's measurement is used to report performance.
You can end the moment from multiple locations in your app, or from multiple threads.

## Tracking Abandonment

In addition to measuring performance, moments can also measure abandonment.
For more on tracking abandonment, see the [Best Practices]({{< relref "/best-practices/app-performance" >}}) section.

