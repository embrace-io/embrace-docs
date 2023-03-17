---
title: "Breadcrumbs"
description: Add logging to your iOS application using Breadcrumbs with the Embrace SDK
sidebar_position: 8
aliases:
  - /ios/breadcrumbs/
---

# Add a Breadcrumb

## Adding Context to Sessions

Embrace can collect basic session data and crashes as you've already seen in the [Crash Reporting](/ios/integration/crash-report/) and [Session Reporting](/ios/integration/session-reporting/) sections.
Embrace can also collect your logging data and include it as context within your sessions. 
Here's how you add a breadcrumb to the session.

{{< tabs "iosBreadcrumbs1" >}}

{{< tab "Swift" >}}

```swift
let msg = String(format: "Master table view editing mode did change to: \(editing), animated: \(animated)")
Embrace.sharedInstance().logBreadcrumb(withMessage: msg)
```

{{< /tab >}}

{{< tab "Objective-C" >}}

```objectivec
NSString *msg = [NSString stringWithFormat:"Master table view editing mode did change to: %@, animated: %@", editing, animated];
[[Embrace sharedInstance] logBreadcrumbWithMessage:msg];
```

{{< /tab >}}

{{< /tabs >}}

This is an example of a log we added to our sample application so we'd know when the user enters and exits editing mode on our table view.
This event is not otherwise shown in the session and can be important depending on what the user does next.

:::warning

Breadcrumb messages must be 256 characters or less.

:::

:::info

For how to best use Breadcrumbs, check out the [Best Practices](/best-practices/breadcrumbs/) page. 

:::
 
---

We use the breadcrumb method for our logging and not the LogEvent method.
Breadcrumbs are a lightweight way to add logging to your session. They add little CPU or memory overhead, and trigger no networking calls.
`LogEvent` is a much heavier mechanism. We will learn about it in the [alerting](/ios/integration/log-message-api) section of the documentation.
For now, just know that using breadcrumbs is the right thing to do most of the time.

{{< button relref="/ios/integration/log-message-api" >}}Learn about alerting{{< /button >}}

