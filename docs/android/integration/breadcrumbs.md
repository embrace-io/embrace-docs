---
title: Breadcrumbs
sidebar_position: 6
description: Add logging to your Android application using Breadcrumbs with the Embrace SDK
---
# Add a Breadcrumb

## Adding Context to Sessions

Embrace can collect basic session data and crashes as you've already seen in the [Crash Reporting](/android/integration/crash-reporting/) and [Session Reporting](/android/integration/session-reporting/) sections.
Embrace can also collect your logging data and include it as context within your sessions.
Here's how you add a Breadcrumb to the session.

```java
Embrace.getInstance().logBreadcrumb("onDragEvent called, starting drag");
```

In the above example, a Breadcrumb is being logged when a drag event listener is called.
This event is not otherwise shown in the session and can be important depending on what the user does next.

:::warning
Breadcrumb messages must be 64 characters or less.
:::

:::info
For how to best use Breadcrumbs, check out the [Best Practices](/best-practices/breadcrumbs/) page.
:::

---

We generally use the Breadcrumb method for our logging and not the Log Message API to add context to sessions.
Breadcrumbs are a lightweight way to add logging to your session. They add no CPU or memory overhead, and trigger no networking calls.
The Log Message API is a much heavier mechanism. We will learn about it in the [Alerting](/android/integration/log-message-api/) section of the documentation.
For now, just know that using Breadcrumbs is the right thing to do most of the time.
