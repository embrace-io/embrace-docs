---
title: Moments
description: Measure the performance of your Unity application using Embrace
sidebar_position: 1
---

# Moments

:::info Important
The Moments API is deprecated and no longer supported as of Unity 2.x. Please use Spans instead
:::

## Overview

Embrace also contains a powerful stopwatch and abandonment tracking feature, which we call **moments**.
This mechanism is the same one used to measure application launch performance, which we covered in the [Session Reporting](/unity/integration/session-reporting/) section.

## Starting a Moment

Here's how you start a moment.

```cs
Embrace.Instance.StartMoment("addItem");
```

In a sample scenario, this is a moment we're using to measure how quickly an item is added to a list after a user selects the plus button.

You can also start a moment with **properties** and **identifier**. You can filter moments by properties in the dashboard.
For more on this, check out the [source code](/api/unity/).

import PropertyLimit from '@site/shared/property-limit.md';

<PropertyLimit />

## Ending a Moment

Next, here's how you end a moment.

```cs
Embrace.Instance.EndMoment("addItem");
```

A timer is started once you make a call to start a moment.
If you end the moment within a configurable threshold, then the timer ends and the client's measurement is used to report performance.
You can end the moment from multiple locations in your app.

## Tracking Abandonment

In addition to measuring performance, moments can also measure abandonment.
Moments measure abandonment by default. If the moment never completes, because:

- the user exits the app before the moment ends
- the app crashes
- an unexpected code path is taken
