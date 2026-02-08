---
title: Breadcrumbs
description: Add logging to your Flutter application using Breadcrumbs with the Embrace SDK
sidebar_position: 7
---

# Add a breadcrumb

## Add context to sessions

Embrace can collect your logging data and include it as context within your sessions. Here's how you add a breadcrumb to the session:

```dart
import 'package:embrace/embrace.dart';

Embrace.instance.addBreadcrumb('a test breadcrumb message');
```

Use breadcrumbs to track the user's journey through your application. Avoid replicating data that would otherwise be recorded. For example, if you make a network call, [Embrace can already track that](/flutter/features/network-requests/), so you don't need to also create a breadcrumb for that event.

:::info
For tips on using breadcrumbs effectively, check out the [Best Practices](/best-practices/breadcrumbs/) page.
:::

---

We generally recommend using breadcrumbs for logging and not the Log Message API to add context to sessions. Breadcrumbs are a lightweight way to add logging to your session—they add no CPU or memory overhead and trigger no networking calls. The Log Message API is a much heavier mechanism. You can learn about it in the [Alerting](/flutter/integration-advanced/log-message-api/) section of the documentation. For most cases, breadcrumbs are the right choice.
