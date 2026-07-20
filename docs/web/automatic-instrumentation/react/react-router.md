---
title: React Router
description: Add route pattern context to Embrace's automatic navigation tracking using React Router
sidebar_position: 1
---

Embrace [automatically tracks navigation](../spa-navigation.md) in single-page apps, including those built with React
Router, with no setup required. By default, the route spans this produces are named after the raw resolved URL (e.g.
`/products/123`). The helpers on this page add context to those route changes by reporting the route's templated
path as defined in your app's routes instead (e.g. `/products/:productId`), giving you more useful, aggregatable
route names in the Embrace Dashboard.

## Registering the instrumentation is deprecated

Older versions of the SDK required registering a React Router instrumentation when initializing the SDK for
navigation to be tracked at all:

```typescript
import { initSDK } from '@embrace-io/web-sdk';
import { createReactRouterNavigationInstrumentation } from '@embrace-io/web-sdk/react-instrumentation';

initSDK({
  // ...Other configs
  instrumentations: [createReactRouterNavigationInstrumentation()],
});
```

This is no longer necessary — navigation is now tracked automatically and does not depend on it.
`createReactRouterNavigationInstrumentation` is kept only as a no-op so existing setups that register it keep
working, and the call above can be safely removed. The helpers below don't depend on it either; they remain the only
piece you need to add route pattern context to your spans.

### React Router V4/V5

If you're using React Router V4 or V5, you can use the `withEmbraceRoutingLegacy` higher-order component (HOC) to wrap your `Route` components. This will automatically track route changes. `EmbraceRoute` needs to be surrounded by a `<Switch>` component to properly capture the current path.

```typescript jsx
import { withEmbraceRoutingLegacy } from '@embrace-io/web-sdk/react-instrumentation';
import { Route, Router, Switch } from 'react-router-dom';

const EmbraceRoute = withEmbraceRoutingLegacy(Route);

const App = () => {
  return (
    <Router>
      <Switch>
        <EmbraceRoute path="/home" component={Home} />
        <EmbraceRoute path="/about" component={About} />
        <EmbraceRoute path="/contact" component={Contact} />
      </Switch>
    </Router>
  );
}
```

### React Router V6+ in declarative mode

If you're using React Router V6 or later, you can use the `withEmbraceRouting` higher-order component (HOC) to wrap your `Routes` components. This will automatically track route changes.

```typescript jsx
import { withEmbraceRouting } from '@embrace-io/web-sdk/react-instrumentation';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

const EmbraceRoutes = withEmbraceRouting(Routes);

const App = () => {
  return (
    <BrowserRouter>
      <EmbraceRoutes>
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </EmbraceRoutes>
    </BrowserRouter>
  )
}
```

### React Router V6+ in data mode

When using data mode in React Router, you can listen to browser changes using `listenToRouterChanges` to automatically track route changes.

```typescript jsx
import { listenToRouterChanges } from '@embrace-io/web-sdk/react-instrumentation';
import {
  createBrowserRouter,
  RouterProvider,
  matchRoutes,
} from 'react-router-dom';
import { useEffect } from 'react';

const router = createBrowserRouter([
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '/about',
    element: <About />,
  },
  {
    path: '/contact',
    element: <Contact />,
  }
]);

const App = () => {
  useEffect(() => {
    // It's important that `listenToRouterChanges` is called on a useEffect so it starts tracking routes once the App is mounted.
    // Otherwise some early telemetry can be missed if this gets initialized too early.
    // Return the cleanup function to stop listening to route changes when the component unmount.
    return listenToRouterChanges({
      router,
      // Use `matchRoutes` from React Router to match the current route.
      routesMatcher: matchRoutes,
    });
    // Set an empty dependency array to run this effect only once.
  }, []);

  return (
    <RouterProvider router={router} />
  )
}
```

### Custom instrumentation

If you are using a navigation method that we do not currently provide a helper for you can still add route pattern
context manually by letting us know when a route changes through the `setCurrentRoute` method on the `page` API:

```typescript
import { page } from '@embrace-io/web-sdk';

const customNavigationHandler = () => {
  // ... navigation logic

  // Get raw URL and path pattern from the custom navigation
  const url = '/path/before/replaced';
  const path = '/path/before/:replace';

  // Track the route pattern for this navigation
  page.setCurrentRoute({
    url,
    path,
  });
};
```

## Configuration

Route names are cleaned up by default, removing path options like `/order/:orderState(pending|shipped|delivered)`
down to `/order/:orderState`. You can turn this off by passing a `navigation` entry to `defaultInstrumentationConfig`
when initializing the SDK:

```typescript
import { initSDK } from '@embrace-io/web-sdk';

initSDK({
  // ...Other configs
  defaultInstrumentationConfig: {
    navigation: {
      shouldCleanupPathOptionsFromRouteName: false,
    },
  },
});
```
