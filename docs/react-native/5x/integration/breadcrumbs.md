---
title: Breadcrumb Logs
description: Add logging to your React Native application using Breadcrumbs with the Embrace SDK
sidebar_position: 7
---

# Add a Breadcrumb

## Adding Context to Sessions

Embrace can collect basic session data and crashes as you've already seen in the [Crash Reporting](/react-native/5x/integration/crash-reporting/) and [Session Reporting](/react-native/5x/integration/session-reporting/) sections.
Embrace can also collect your logging data and include it as context within your sessions.
Here's how you add a Breadcrumb to the session.

```javascript
import {addBreadcrumb} from '@embrace-io/react-native';

addBreadcrumb("component updated -- 'show' prop changed from true to false");
```

In the above example, a Breadcrumb is being logged when a prop named "show" changed and triggered a component update.
This event is not otherwise shown in the session and can be important depending on what the user does next.

:::info
For how to best use Breadcrumbs, check out the [Best Practices](/best-practices/breadcrumbs/) page.  
:::

---

We generally use the Breadcrumb method for our logging and not the Log Message API to add context to sessions.
Breadcrumbs are a lightweight way to add logging to your session. They add no CPU or memory overhead, and trigger no networking calls.
The Log Message API is a much heavier mechanism. We will learn about it in the [Alerting](/react-native/5x/integration/log-message-api/) section of the documentation.
For now, just know that using Breadcrumbs is the right thing to do most of the time.
