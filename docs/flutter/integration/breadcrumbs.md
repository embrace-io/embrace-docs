---
title: "Breadcrumbs"
description: Add logging to your Flutter application using Breadcrumbs with the Embrace SDK
sidebar_position: 7
aliases:
  - /flutter/breadcrumbs/
---

# Add a Breadcrumb

## Adding Context to Sessions

Embrace can collect basic session data and crashes as you've already seen in the [Crash Reporting](/flutter/integration/crash-reporting) and [Session Reporting](/flutter/integration/session-reporting) sections.
Embrace can also collect your logging data and include it as context within your sessions.
Here's how you add a Breadcrumb to the session.

```dart
import 'package:embrace/embrace.dart';

Embrace.instance.logBreadcrumb('a test breadcrumb message');
```

Use breadcrumbs to track the journey of the user through your application. Try not to replicate data that would otherwise be recorded. For example, if you make a network call, [Embrace can already track that](/flutter/features/network-requests), so you do not need to also make a breadcrumb for that event.

:::info

For how to best use Breadcrumbs, check out the [Best Practices](/best-practices/breadcrumbs) page. 

:::

---

We generally use the Breadcrumb method for our logging and not the Log Message API to add context to sessions.
Breadcrumbs are a lightweight way to add logging to your session. They add no CPU or memory overhead, and trigger no networking calls.
The Log Message API is a much heavier mechanism. We will learn about it in the [Alerting](/flutter/integration/log-message-api) section of the documentation.
For now, just know that using Breadcrumbs is the right thing to do most of the time.

{{< button relref="/flutter/integration/log-message-api" >}}Learn About the Log Message API{{< /button >}}
