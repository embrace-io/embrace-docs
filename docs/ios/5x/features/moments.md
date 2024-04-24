---
title: Moments
description: Measure the performance of your iOS application using Embrace
sidebar_position: 1
---

# Moments

## Overview

Embrace also contains a powerful stopwatch and abandonment tracking feature.
Embrace uses this mechanism to measure your application launch performance. This is why you must call `endAppStartup` somewhere in your application, as mentioned in the [Session Reporting](/ios/5x/integration/session-reporting) section.

You can use that same mechanism yourself to measure any portion of your application. We call this concept **moments**. This API is also immediate mode (like [logs](/ios/5x/integration/log-message-api)), meaning your users will incur a networking call whenever you start and stop a moment.

:::info
The performance of the networking calls that moments make are unrelated to the performance of the moment itself.
:::

Moments are best used for tracking critical user flows that are generally short in nature.
For more suggestions on what to measure with moments, see the [Best Practices](/best-practices/app-performance#keep-it-short) page.

## Starting a Moment

Here's what a call to start a moment looks like.

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

<Tabs groupId="ios-language" queryString="ios-language">
<TabItem value="swift" label="Swift">

```swift
Embrace.sharedInstance().startMoment(withName: "add_item")
```

</TabItem>

<TabItem value="objectivec" label="Objective-C">

```objectivec
[[Embrace sharedInstance] startMomentWithName:@"add_item"];
```

</TabItem>

</Tabs>

In a sample scenario, this is a moment we're using to measure how quickly our UITableView renders after adding a new item using the plus button.
We start the moment when we add the item, and we'll end it when the animation finishes.
Our UX designers have been experimenting with different animation styles, and we've read in our reviews that some users get annoyed by the animation and quit the app over it.
We wanted to verify that for ourselves.

You can also start a moment with **properties**, an **identifier**, and **screenshots**.
For more on this, check out the [API docs](/api/ios/).

import PropertyLimit from '@site/shared/property-limit.md';

<PropertyLimit />

## Ending a Moment

Here's how to end a moment.

<Tabs groupId="ios-language" queryString="ios-language">
<TabItem value="swift" label="Swift">

```swift
Embrace.sharedInstance().endMoment(withName: "add_item")
```

</TabItem>

<TabItem value="objectivec" label="Objective-C">

```objectivec
[[Embrace sharedInstance] endMomentWithName:@"add_item"];
```

</TabItem>

</Tabs>

Once you start a moment, a timer is started.
If you end the moment within a configurable threshold, then the timer ends and the client's measurement is used to report performance.
You can end the moment from multiple locations in your app, or from multiple threads. 

## Tracking Abandonment

In addition to performance, moments also measure abandonment by default. 
For more on tracking abandonment, see the [Best Practices](/best-practices/app-performance) section.
