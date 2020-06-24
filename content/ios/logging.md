---
title: "Logging"
weight: 10
---

# Adding Alerts

As we've discussed in the [Session Reporting section]({{< relref "/ios/session-reporting">}}), Embrace uploads its session on the next app launch.
This delay may seem like it hurts the immediacy of the data you are seeing, but the reality is that at scale this still means you are finding out about issues very quickly.

However, some situations might require immediate feedback, such as hunting an especially difficult bug, troubleshooting on behalf of high-value users, or monitoring a new version rollout.

You can leverage the log message API for this.

## Using the Log Message API

You can log a message immediately by calling the `logMessage` method.

```swift
let properties = ["property_a": "value_a", "property_b": "value_b"]
Embrace.sharedInstance()?.logMessage("Loading not finished in time.", with: .error, properties: properties, takeScreenshot: true)
```

## Best Practices

Embrace's logMessage API is immediate mode.
A call to this API results in a networking call between your app and Embrace's servers immediately.
This can have a negative effect on your application's performance or battery life when over-used.
It can also be an invaluable tool for getting information about your application quickly.

Let's examine the method call from above to understand the arguments involved:

1. **logMessage**: The first argument is a string and represents the message itself. Take care to make this short, yet informative. Don't pack details about the error into this message; those go in properties.
2. **with**: This is the severity of the event. Typically we use this mechanism for errors and warnings and occasionally for tracing purposes, but that is better left to [breadcrumbs]({{< relref "/ios/breadcrumbs" >}}).
3. **properties**: This is a dictionary of key-value pairs. When logging an event, break out any details into this dictionary and you will be able to categorize and filter on those values. 
4. **takeScreenshot**: A boolean indicating if we should include a screenshot with this alert or not. Take care not to send your users' private information to Embrace. When in doubt skip the screenshot.

Once you start using our alerting feature you can also configure how these are handled on the backend.
Using the Embrace Dashboard, you can configure email alerts to be sent to your team when certain thresholds are met with logEvents.
For example, if you have a steady rate of 1% for a give logEvent, then you can set a threshold so that if it rises in a sustained way you get an email sent directly to you.

This alerting capability is why breaking details into properties is so important. If your logEvent is a string that says `"Main page took 2.45ms to render"`, you cannot configure any thresholds on this. If the log was instead `"Main page took too long to render"` with a property of `"rendertime"` set to `"2.45ms"`, now you can customize an email alert based on this event. You could configure the alerts so that any render times greater than 5 seconds are emailed directly to you. 
