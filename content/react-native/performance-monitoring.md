---
title: "Performance Monitoring"
weight: 10
---

# Measure Performance

## Moments

Embrace also contains a powerful stopwatch and abandonment tracking feature, which we call **Moments**.
This mechanism is the same one used to measure application launch performance, which we covered in the [Session Reporting]({{< relref "/react-native/session-reporting" >}}) section.

## Starting a Moment

Here's how you start a Moment.

```javascript
import {startMoment} from 'react-native-embrace';

startMoment('addItem');
```

In a fictional scenario, this is a Moment we're using to measure how quickly an item is added to a list after a user selects the plus button.

You can also start a Moment with **properties**, an **identifier**, and **screenshots**.
For more on this, check out the [API docs]({{< api rn >}}).

## Ending a Moment

Next, here's how you end a Moment.

```javascript
import {endMoment} from 'react-native-embrace';

endMoment('addItem');
```

A timer is started once you make a call to start a Moment.
If you end the Moment within a configurable threshold, then the timer ends and the client's measurement is used to report performance.
You can end the Moment from multiple locations in your app. 

## Tracking Abandonment

In addition to measuring performance, Moments can also measure abandonment.
For more on tracking abandonment, see the [Best Practices]({{< relref "/best-practices/app-performance" >}}) section.

---

In the next guide, you'll be learning how to track the React components in your application mounting and unmounting.

{{< button relref="/react-native/tracking-components" >}}Learn How to Track Components{{< /button >}}
