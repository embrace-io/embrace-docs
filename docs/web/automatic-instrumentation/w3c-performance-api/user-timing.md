---
title: User Timing
description: Automatically capture custom performance marks and measures with Embrace
sidebar_position: 1
---

## User Timing

The Embrace SDK automatically captures custom performance marks and measures created by your application
via `performance.mark()` and `performance.measure()`, giving you visibility into your own timing
instrumentation without any extra backend work.

### How User Timing Instrumentation Works

The SDK observes `PerformanceMark` and `PerformanceMeasure` entries via a `PerformanceObserver`.
Marks are emitted as logs and measures are emitted as spans, reflecting their different shapes: a mark
is a discrete point in time, while a measure has a defined start and duration.

To keep data volumes manageable, the SDK deduplicates entries by name per page URL — only the first
occurrence of a given name is captured per navigation. A cap of 200 marks and 100 measures per page
is applied after deduplication.

### Data Captured

For each mark, the SDK captures:

- The mark name and timestamp
- The entry type (`mark`)
- Any `detail` object provided via `performance.mark()`, serialized as the log body

For each measure, the SDK captures:

- The measure name (used as the span name) and start time
- The duration
- The entry type (`measure`)
- Any `detail` object provided via `performance.measure()`, attached as a span attribute

### Filtering Entries

You can limit which entries are captured using the `allowedEntries` option, which accepts either an
array of names or a predicate function:

```typescript
import { initSDK } from '@embrace-io/web-sdk';

initSDK({
  appID: "YOUR_EMBRACE_APP_ID",
  appVersion: "YOUR_APP_VERSION",
  defaultInstrumentationConfig: {
    'user-timing': {
      allowedEntries: ['my-app-measure', 'checkout-flow'],
    },
  },
});
```

### Integration with Other Features

- User timing marks and measures are associated with the current session and page
- Custom dashboards can be built to monitor percentile durations and start times, filtered by name, entry type, or `detail` attributes
- Alerts can be set on measure durations exceeding specific thresholds
