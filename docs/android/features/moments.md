---
title: Moments
description: Measure the performance of your Android application using Embrace
sidebar_position: 1
---

# Moments

## Overview

Embrace contains a powerful stopwatch and abandonment tracking feature, which we call **moments**.
This mechanism is the same one used to measure application launch performance, which we covered in the [Session Reporting](/android/integration/session-reporting) section.

Similar to [Logs](/android/integration/log-message-api), moments will immediately make a network request.

:::info
The performance of the networking calls that moments make are unrelated to the performance of the moment itself.
:::

## Keep It Short

import KeepItShort from '@site/shared/keep-it-short.md';

<KeepItShort />

## Starting a Moment

Here's how you start a moment.

```java
Embrace.getInstance().startMoment("addItem");
```

In a sample scenario, this is a moment we're using to measure how quickly an item is added to a `ListView` after a user selects the plus button.

You can also start a moment with **properties** and **identifier**.
For more on this, check out the [API docs](/api/android/).

import PropertyLimit from '@site/shared/property-limit.md';

<PropertyLimit />

## Ending a Moment

Next, here's how you end a moment.

```java
Embrace.getInstance().endMoment("addItem");
```

A timer is started once you make a call to start a moment.
If you end the moment within a configurable threshold, then the timer ends and the client's measurement is used to report performance.
You can end the moment from multiple locations in your app, or from multiple threads.

## Tracking Abandonment

import Abandonment from '@site/shared/tracking-abandonment.md';

<Abandonment />