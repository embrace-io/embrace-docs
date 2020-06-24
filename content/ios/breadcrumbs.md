---
title: "Breadcrumbs"
weight: 8
---

# Add a Breadcrumb

## Adding Context to Sessions

Embrace can collect basic session data and crashes as you've already seen in the [Crash Reporting]({{< relref "/ios/crash-report">}}) and [Session Reporting]({{< relref "session-reporting" >}}) sections.
Embrace can also collect your logging data and include it as context within your sessions. 
Here's how you add a breadcrumb to the session.

```swift
let msg = String(format: "Master table view editing mode did change to: \(editing), animated: \(animated)")
Embrace.sharedInstance()?.logBreadcrumb(withMessage: msg)
```

This is an example of a log we added to our sample application so we'd know when the user enters and exits editing mode on our table view.
This event is not otherwise shown in the session and can be important depending on what the user does next.

## Best Practices

This is a powerful feature. However, also easy to misuse.
Think carefully about the logging that you add. Remember that you will be looking at these logs days after a problem session occurred, and without access to the user who created the session.
Your logs must be detailed enough to help you generate a reproducible use-case, but light enough that they don’t distract you or cause you to read redundant information. 

For example, Embrace already collects all networking and WKWebView navigation events by default.
Before you add logging around these events, take a look at one of your sessions in the Embrace Dashboard.
It is likely all the information you'd want to log is already present. When adding logs, ensure they are not duplicating information already in the session.
Your goal is to solve problems quickly. Having to read superfluous info logs is not going to be helpful.

Log unique events, or decisions that the user makes that won't be obvious from other events in the session.
Your logging should provide you a map of the route the user took through your application.
You should be able to read this map and recreate the user's journey on your own device.
 
---

We use the breadcrumb method for our logging and not the LogEvent method.
Breadcrumbs are a lightweight way to add logging to your session. They add no CPU or memory overhead, and trigger no networking calls.
`LogEvent` is a much heavier mechanism. We will learn about it in the [alerting]({{< relref "/ios/logging" >}}) section of the documentation.
For now, just know that using breadcrumbs is the right thing to do most of the time.

{{< button relref="/ios/logging" >}}Learn about alerting{{< /button >}}

