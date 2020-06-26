---
title: "Performance Monitoring"
weight: 11
---

# Measure Performance

## Moments

Embrace also contains a powerful stopwatch and abandonment tracking feature.
Embrace uses this mechanism to measure your application launch performance. This is why you must call `endAppStartup` somewhere in your application, as mentioned in the [Session Reporting]({{< relref "/ios/session-reporting" >}}) section.

You can use that same mechanism yourself to measure any portion of your application. We call this concept **moments**. This API is also immediate mode (like [logs]({{< relref "/ios/log-message-api" >}})), meaning your users will incur a networking call whenever you start and stop a moment.

{{< hint info >}}
The performance of the networking calls that moments make are unrelated to the performance of the moment itself.
{{< /hint >}}

Moments are best used for tracking critical user flows that are generally short in nature, like:

1. Rendering a border onto an image
1. Uploading a file to your server
1. Loading a new set of tableViewCells from coredata
1. Processing the checkout from your shopping cart

Longer events such as filling out an entire form, or taking a photo with the camera are worse candidates for moments as these tasks can have a high variance from user to user.
Only measure moments that truly matter to your business, and that you would dedicate engineering resources to improving.

## Starting a Moment

Here's what a call to start a moment looks like.

```swift
Embrace.sharedInstance()?.startMoment(withName: "add_item")
```

In a fictonal scenario, this is a moment we're using to measure how quickly our UITableView renders after adding a new item using the plus button.
We start the moment when we add the item, and we'll end it when the animation finishes.
Our UX designers have been experimenting with different animation styles, and we've read in our reviews that some users get annoyed by the animation and quit the app over it.
We wanted to verify that for ourselves.

## Ending a Moment

Here's how to end a moment.

```swift
Embrace.sharedInstance()?.endMoment(withName: "add_item")
```

Once you start a moment, a timer is started.
If you end the moment within a configurable threshold, then the timer ends and the client's measurement is used to report performance.
You can end the moment from multiple locations in your app, or from multiple threads. 

## Tracking Abandonment

In addition to performance, moments also measure abandonment by default. 
If the moment never completes, because
* the user exits the app before the moment ends
* the app crashes
* an unexpected code path is taken 

the timer runs out and we record that moment as an abandonment. Looking at these later can help you to understand user behavior and how changes you make affect it over time.
