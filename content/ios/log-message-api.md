---
title: "Log Message API"
weight: 9
---

# Adding Alerts

As we've discussed in the [Session Reporting section]({{< relref "/ios/session-reporting">}}), Embrace uploads its sessions on the next app launch.
This delay may seem like it hurts the immediacy of the data you are seeing, but the reality is that at scale this still means you are finding out about issues very quickly.

However, some situations might require immediate feedback, such as hunting an especially difficult bug, troubleshooting on behalf of high-value users, or monitoring a new version rollout.

You can leverage the log message API for this.

## Using the Log Message API

You can log a message immediately by calling the `logMessage` method.

```swift
let properties = ["property_a": "value_a", "property_b": "value_b"]
Embrace.sharedInstance()?.logMessage("Loading not finished in time.", with: .error, properties: properties, takeScreenshot: true)
```

Let's examine the method call from above to understand the arguments involved:

1. **logMessage**: The first argument is a string and represents the message itself. 
2. **with**: This is the severity of the event. Typically we use this mechanism for errors and warnings and occasionally for tracing purposes, but that is better left to [breadcrumbs]({{< relref "/ios/breadcrumbs" >}}).
3. **properties**: This is a dictionary of key-value pairs. When logging an event, break out any details into this dictionary and you will be able to categorize and filter on those values. 
4. **takeScreenshot**: A boolean indicating whether or not we should include a screenshot with this alert.


## Being Alerted on Logs

Once you start using our alerting feature you can also configure how these are handled on the backend.
Using the Embrace Dashboard, you can configure email alerts to be sent to your team when certain thresholds are met with logEvents.
For example, if you have a steady rate of 1% for a give logEvent, then you can set a threshold so that if it rises in a sustained way you get an email sent directly to you.

## Best Practices

Embrace's logMessage API is immediate mode.
A call to this API results in a networking call between your app and Embrace's servers immediately.
This can have a negative effect on your application's performance or battery life when over-used.
It can also be an invaluable tool for getting information about your application quickly.

{{< hint info >}}
For more tips on making the most of the Log Message API, checkout the [Best Practices]({{ relref "/best-practices/log-message-api" }}).
{{< /hint >}}

---

Embrace offers an API to measure the performance of key actions within your app. 
Let's learn about **Moments** next.

{{< button relref="/ios/performance-monitoring" >}}Learn About Moments{{< /button >}}