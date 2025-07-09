---
title: Navigation
description: Add context to your web app sessions with navigation tracking
sidebar_position: 4
---

# Navigation

If you are using React Router to control navigation in your web application we provide [a set of helpers](/docs/web/automatic-instrumentation/react/react-router.md)
to emit telemetry automatically as users navigate your app. If you are using a different navigation method that we do
not currently provide a helper for you can still instrument navigation manually by following the steps below.

### Manual Instrumentation

The first step is to set up the navigation instrumentation when you init the Embrace Web SDK:

```typescript
import { sdk } from '@embrace-io/web-sdk';
import { getNavigationInstrumentation } from '@embrace-io/web-sdk';

sdk.initSDK({
  // ...Other configs
  instrumentations: [
    getNavigationInstrumentation(),
  ],
})
```

Then hook into your navigation tooling and let the instrumentation know when a route changes through the
`setCurrentRoute` method:


```typescript
import { getNavigationInstrumentation } from '@embrace-io/web-sdk';


const customNavigationHandler = () => {
  // ... navigation logic

  // Get raw URL and path pattern from the navigation tooling
  const url = '/path/before/replaced'
  const path = '/path/before/:replace'

  // Since `getNavigationInstrumentation` was already called when setting up the instrumentation in
  // `initSDK` this will simply get a reference to the NavigationInstrumentation instance rather than
  // creating a new one
  const navigationInstrumentation = getNavigationInstrumentation();

  // Track that the navigation occurred
  navigationInstrumentation.setCurrentRoute({
    url,
    path
  });
}
```