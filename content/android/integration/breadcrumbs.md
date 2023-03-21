---
title: Breadcrumbs
weight: 6
description: Add logging to your Android application using Breadcrumbs with the Embrace SDK
aliases:
  - /android/breadcrumbs/
---
# Add a Breadcrumb

## Adding Relevant Information to Sessions

Embrace can collect basic session data and crashes as you've already seen in the [Crash Reporting]({{< relref "/android/integration/crash-reporting" >}}) and [Session Reporting]({{< relref "/android/integration/session-reporting" >}}) sections.
Embrace can also collect your logging data and include it as relevant information and details to enrich your sessions.
Here's how you add a Breadcrumb to the session.

```java
Embrace.getInstance().logBreadcrumb("onDragEvent called, starting drag");
```

In the above example, a Breadcrumb is being logged when a drag event listener is called.
This event is not otherwise shown in the session and can be important depending on what the user does next.

{{< hint warning >}}

Breadcrumb messages must be 256 characters or less.

{{< /hint >}}

{{< hint info >}}

For how to best use Breadcrumbs, check out the [Best Practices]({{< relref "/best-practices/breadcrumbs" >}}) page. 

{{< /hint >}}

---

We generally use the Breadcrumb method for our logging and not the Log Message API to add relevant information to sessions.
Breadcrumbs are a lightweight way to add logging to your session. They add no CPU or memory overhead, and trigger no networking calls.
The Log Message API is a much heavier mechanism. We will learn about it in the [Alerting]({{< relref "/android/integration/log-message-api" >}}) section of the documentation.
For now, just know that using Breadcrumbs is the right thing to do most of the time.

{{< button relref="/android/integration/log-message-api" >}}Learn About the Log Message API{{< /button >}}
