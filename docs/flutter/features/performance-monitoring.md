---
title: "Performance Monitoring"
description: Measure the performance of your Flutter application using Embrace
sidebar_position: 1
aliases:
  - /flutter/performance-monitoring/
---

# Measure Performance

## Moments

Embrace also contains a powerful stopwatch and abandonment tracking feature, which we call **moments**.
This mechanism is the same one used to measure application launch performance, which we covered in the [Session Reporting](/flutter/integration/session-reporting) section.

## Starting a Moment

Here's how you start a moment.

```dart
Embrace.instance.startMoment('addItem');
```

In a sample scenario, this is a moment we're using to measure how quickly an item is added to a list after a user selects the plus button.

You can also start a moment with **properties**, an **identifier**, and **screenshots**.
For more on this, check out the [API docs]({{< api flutter >}}).

import PropertyLimit from '@site/shared/property-limit.md';

<PropertyLimit />

## Ending a Moment

Next, here's how you end a moment.

```dart
Embrace.instance.endMoment('addItem');
```

A timer is started once you make a call to start a moment.
If you end the moment within a configurable threshold, then the timer ends and the client's measurement is used to report performance.
You can end the moment from multiple locations in your app.

## Tracking Abandonment

In addition to measuring performance, moments can also measure abandonment.
For more on tracking abandonment, see the [Best Practices](/best-practices/app-performance) section.
