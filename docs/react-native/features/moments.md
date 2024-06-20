---
title: Moments
description: Measure the performance of your React Native application using Embrace
sidebar_position: 1
---

# Moments

## Overview

Embrace also contains a powerful stopwatch and abandonment tracking feature, which we call **moments**.
This mechanism is the same one used to measure application launch performance, which we covered in the [Session Reporting](/react-native/integration/session-reporting/) section.

## Starting a Moment

Here's how you start a moment.

```javascript
import {startMoment} from '@embrace-io/react-native';

startMoment('addItem');
```

In a sample scenario, this is a moment we're using to measure how quickly an item is added to a list after a user selects the plus button.

You can also start a moment with **properties** and **identifier**.
For more on this, check out the [source code](/api/react-native/).

import PropertyLimit from '@site/shared/property-limit.md';

<PropertyLimit />

## Ending a Moment

Next, here's how you end a moment.

```javascript
import {endMoment} from '@embrace-io/react-native';

endMoment('addItem');
```

A timer is started once you make a call to start a moment.
If you end the moment within a configurable threshold, then the timer ends and the client's measurement is used to report performance.
You can end the moment from multiple locations in your app.

## Tracking Abandonment

In addition to measuring performance, moments can also measure abandonment.
For more on tracking abandonment, see the [Best Practices](/best-practices/app-performance/) section.
