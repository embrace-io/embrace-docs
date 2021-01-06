---
title: "Breadcrumbs"
description: Add logging to your Unity application using Breadcrumbs with the Embrace SDK
weight: 8
aliases:
  - /unity/breadcrumbs/
---

# Add a Breadcrumb

## Adding Context to Sessions

Embrace can collect basic session data and crashes as you've already seen in the [Crash Reporting]({{< relref "/unity/integration/crash-report">}}) and [Session Reporting]({{< relref "session-reporting" >}}) sections.
Embrace can also collect your logging data and include it as context within your sessions. 
Here's how you add a breadcrumb to the session.

```C#
Embrace.Instance.LogBreadcrumb("a test breadcrumb message");
```

Use breadcrumbs to track the journey of the user through your application. Try not to replicate data that would otherwise be recorded, for example if you make a network call - Embrace already tracks that, so you do not need to also make a breadcrumb for that event.

{{< hint info >}}

For how to best use Breadcrumbs, check out the [Best Practices]({{< relref "/best-practices/breadcrumbs" >}}) page. 

{{< /hint >}}
 
---

We use the breadcrumb method for our logging and not the LogEvent method.
Breadcrumbs are a lightweight way to add logging to your session. They add little CPU or memory overhead, and trigger no networking calls.
`LogEvent` is a much heavier mechanism. We will learn about it in the [alerting]({{< relref "/unity/integration/log-message-api" >}}) section of the documentation.

For now, just know that using breadcrumbs is the right thing to do most of the time.

{{< button relref="/unity/integration/log-message-api" >}}Learn about alerting{{< /button >}}

