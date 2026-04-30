---
title: W3C Performance API
description: Automatically capture browser performance timing data with Embrace
sidebar_position: 8
---

## W3C Performance API

The Embrace SDK automatically collects timing data from the browser's [Performance API](https://developer.mozilla.org/en-US/docs/Web/API/Performance_API),
giving you visibility into how your application and its resources perform in real user environments.

### Available Instrumentations

- **[User Timing](./user-timing.md)** - Captures custom performance marks and measures created by your application via `performance.mark()` and `performance.measure()`
- **[Element Timing](./element-timing.md)** - Tracks render and load timing for elements annotated with the `elementtiming` attribute
- **[Server Timing](./server-timing.md)** - Reads backend performance hints sent via the `Server-Timing` HTTP response header on navigation requests

### Opting Out

Each instrumentation is always-on by default. Individual instrumentations can be disabled via the `omit` option when initializing the SDK:

```typescript
import { initSDK } from '@embrace-io/web-sdk';

initSDK({
  appID: "YOUR_EMBRACE_APP_ID",
  appVersion: "YOUR_APP_VERSION",
  defaultInstrumentationConfig: {
    omit: new Set(['user-timing', 'element-timing', 'server-timing']),
  },
});
```
