---
title: "Breadcrumbs"
weight: 6
---

# Add a Breadcrumb

## Adding Context to Sessions

Embrace can collect basic session data and crashes as you've already seen in the [Crash Reporting]({{< relref "/android/crash-reporting" >}}) and [Session Reporting]({{< relref "/android/session-reporting" >}}) sections.
Embrace can also collect your logging data and include it as context within your sessions.
Here's how you add a Breadcrumb to the session.

```java
Embrace.getInstance().logBreadcrumb("onDragEvent called, starting drag");
```

In the above example, a Breadcrumb is being logged when a drag event listener is called.
This event is not otherwise shown in the session and can be important depending on what the user does next.

{{< hint warning >}}

Breadcrumb messages must be 64 characters or less.

{{< /hint >}}

{{< hint info >}}

For how to best use Breadcrumbs, check out the [Best Practices]({{< relref "/best-practices/breadcrumbs" >}}) page. 

{{< /hint >}}

---

We use the Breadcrumb method for our logging and not the Log Message API.
Breadcrumbs are a lightweight way to add logging to your session. They add no CPU or memory overhead, and trigger no networking calls.
The Log Message API is a much heavier mechanism. We will learn about it in the [Alerting]({{< relref "/android/log-message-api" >}}) section of the documentation.
For now, just know that using Breadcrumbs is the right thing to do most of the time.

{{< button relref="/android/log-message-api" >}}Learn About the Log Message API{{< /button >}}
