---
title: Breadcrumb logs
description: Add logging to your React Native application using Breadcrumbs with the Embrace SDK
sidebar_position: 7
---

# Add a breadcrumb

## Adding context to sessions

Embrace can collect basic session data and crashes as you've already seen in the [Crash Reporting](/react-native/integration/crash-reporting/) and [Session Reporting](/react-native/integration/session-reporting/) sections.
Embrace can also collect your logging data and include it as context within your sessions.
Here's how you add a Breadcrumb to the session:

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

You should generally use the breadcrumb method for logging and not the Log Message API to add context to sessions. Breadcrumbs are a lightweight way to add logging to your session. They add no CPU or memory overhead, and trigger no networking calls. The Log Message API is a much heavier mechanism. You'll learn about it in the next section of the documentation. For now, just know that using breadcrumbs is the right thing to do most of the time.
