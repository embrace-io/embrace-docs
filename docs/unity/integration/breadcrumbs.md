---
title: Breadcrumbs
description: Add logging to your Unity application using Breadcrumbs with the Embrace SDK
sidebar_position: 8
---

# Add a Breadcrumb

## Adding Context to Sessions

Embrace can collect basic session data and crashes as you've already seen in the [Crash Reporting](/unity/integration/crash-report/) and [Session Reporting](/unity/integration/session-reporting/) sections.
Embrace can also collect your logging data and include it as context within your sessions.  
Here's how you add a breadcrumb to the session.

```cs
Embrace.Instance.AddBreadcrumb("a test breadcrumb message");
```

Use breadcrumbs to track the journey of the user through your application. Try not to replicate data that would otherwise be recorded. For example, if you make a network call, Embrace already tracks that, so you do not need to also make a breadcrumb for that event.

:::info
For how to best use Breadcrumbs, check out the [Best Practices](/best-practices/breadcrumbs) page.  
:::

---

We use the breadcrumb method for our logging and not the LogEvent method.
Breadcrumbs are a lightweight way to add logging to your session. They add little CPU or memory overhead, and trigger no network calls.
`LogEvent` is a much heavier mechanism. We will learn about it in the [alerting](/unity/integration/log-message-api) section of the documentation.

For now, just know that using breadcrumbs is the right thing to do most of the time.
