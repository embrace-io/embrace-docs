---
title: "Performance Monitoring"
weight: 9
---

# Measure Performance

## Moments

Embrace also contains a powerful stopwatch and abandonment tracking feature, which we call **Moments**.
This mechanism is the same one used to measure application launch performance, which we covered in the [Session Reporting]({{< relref "/android/session-reporting" >}}) section.

Similar to [Logs]({{< relref "/android/log-message-api" >}}), Moments will immediately make a network request.

{{< hint info >}}
The performance of the networking calls that Moments make are unrelated to the performance of the Moment itself.
{{< /hint >}}

Moments are best used for tracking critical user flows that are generally short in nature.
For more suggestions on what to measure with Moments, see the [Best Practices]({{< relref "/best-practices/app-performance#keep-it-short" >}}) page.

## Starting a Moment

Here's how you start a Moment.

```java
Embrace.getInstance().startEvent("addItem");
```

In a fictional scenario, this is a Moment we're using to measure how quickly an item is added to a `ListView` after a user selects the plus button.

You can also start a Moment with **properties**, an **identifier**, and **screenshots**.
For more on this, check out the [API docs]({{< api android >}}).


## Ending a Moment

Next, here's how you end a Moment.

```java
Embrace.getInstance().endEvent("addItem");
```

A timer is started once you make a call to start a Moment.
If you end the Moment within a configurable threshold, then the timer ends and the client's measurement is used to report performance.
You can end the Moment from multiple locations in your app, or from multiple threads. 

## Tracking Abandonment

In addition to measuring performance, Moments can also measure abandonment.
For more on tracking abandonment, see the [Best Practices]({{< relref "/best-practices/app-performance" >}}) section.

---

Congratulations! By this point, you should have a solid integration. Continue to the [Next Steps]({{< relref "/android/next-steps" >}}) page to wrap up your integration.

{{< button relref="/android/next-steps" >}}Next Steps{{< /button >}}
