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

Embrace contains a powerful stopwatch and abandonment tracking feature called **moments**.
This mechanism is the same one used to measure application launch performance, which is covered in the [Integration guide](/android/integration) section.

Similar to [Logs](/android/integration-advanced/log-message-api), moments will immediately make a network request.

:::info
The performance of the networking calls that moments make are unrelated to the performance of the moment itself.
:::

## Keep it short

Moments are best used for tracking critical user flows that are generally short in nature, like:

- Rendering a border onto an image
- Uploading a file to your server
- Loading a new set of TableView cells from a local database
- Processing the checkout from your shopping cart

Longer events, such as filling out an entire form or taking a photo with the camera, are worse candidates for moments as these tasks can have a high variance from user to user. Only measure moments that truly matter to your business, and that you would dedicate engineering resources to improving.

## Starting a moment

Here's how you start a moment.

```kotlin
Embrace.getInstance().startMoment("addItem")
```

In a sample scenario, this is a moment we're using to measure how quickly an item is added to a `ListView` after a user selects the plus button.

You can also start a moment with **properties** and **identifier**.
For more on this, check out the [API docs](/api/android/).

import PropertyLimit from '@site/shared/property-limit.md';

<PropertyLimit />

## Ending a moment

Next, here's how you end a moment.

```kotlin
Embrace.getInstance().endMoment("addItem")
```

A timer is started once you make a call to start a moment.
If you end the moment within a configurable threshold, then the timer ends and the client's measurement is used to report performance.
You can end the moment from multiple locations in your app, or from multiple threads.

## Tracking abandonment

import Abandonment from '@site/shared/tracking-abandonment.md';

<Abandonment />
