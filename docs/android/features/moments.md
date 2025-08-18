---
title: Moments
description: Measure the performance of your Android application using Embrace
sidebar_position: 15
---

# Moments

:::warning Important
The moments feature is only available in version 6 and below of the Android SDK. You should use the [Traces API](/android/features/traces) instead.
:::

## Overview

Embrace contains a powerful stopwatch and abandonment tracking feature, which we call **moments**.
This mechanism is the same one used to measure application launch performance, which we covered in the [Session Reporting](/android/integration/session-reporting) section.

Similar to [Logs](/android/integration/log-message-api), moments will immediately make a network request.

:::info
The performance of the networking calls that moments make are unrelated to the performance of the moment itself.
:::

## Keep It Short

Moments are best used for tracking critical user flows that are generally short in nature, like:

- Rendering a border onto an image
- Uploading a file to your server
- Loading a new set of TableView cells from a local database
- Processing the checkout from your shopping cart

Longer events, such as filling out an entire form or taking a photo with the camera, are worse candidates for moments as these tasks can have a high variance from user to user. Only measure moments that truly matter to your business, and that you would dedicate engineering resources to improving.

## Starting a Moment

Here's how you start a moment.

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

<Tabs groupId="android-language" queryString="android-language">
<TabItem value="kotlin" label="Kotlin">
```kotlin
Embrace.getInstance().startMoment("addItem")
```
</TabItem>
<TabItem value="java" label="Java">
```java
Embrace.getInstance().startMoment("addItem");
```
</TabItem>
</Tabs>

In a sample scenario, this is a moment we're using to measure how quickly an item is added to a `ListView` after a user selects the plus button.

You can also start a moment with **properties** and **identifier**.
For more on this, check out the [API docs](/api/android/).

import PropertyLimit from '@site/shared/property-limit.md';

<PropertyLimit />

## Ending a Moment

Next, here's how you end a moment.

<Tabs groupId="android-language" queryString="android-language">
<TabItem value="kotlin" label="Kotlin">
```kotlin
Embrace.getInstance().endMoment("addItem")
```
</TabItem>
<TabItem value="java" label="Java">
```java
Embrace.getInstance().endMoment("addItem");
```
</TabItem>
</Tabs>

A timer is started once you make a call to start a moment.
If you end the moment within a configurable threshold, then the timer ends and the client's measurement is used to report performance.
You can end the moment from multiple locations in your app, or from multiple threads.

## Tracking Abandonment

import Abandonment from '@site/shared/tracking-abandonment.md';

<Abandonment />
