---
title: React Router
description: Automatic instrumentation for React Router using Embrace Web SDK
sidebar_position: 1
---

The React Router automatic instrumentation provides an easy way to track navigation events in your React application.  
It captures route changes and sends them as spans to Embrace, allowing you to monitor user navigation patterns and performance.
A span is automatically created when the user navigates to a new route or the application is loaded. Then the span is ended when the route changes again or the session ends.

# Instrumentation

To instrument React Router, add the React Router navigation instrumentation when you init the Embrace Web SDK.

```typescript
import { initSDK } from '@embrace-io/web-sdk';
import { createReactRouterNavigationInstrumentation } from '@embrace-io/web-sdk/react-instrumentation';

initSDK({
  // ...Other configs
  instrumentations: [
    createReactRouterNavigationInstrumentation(),
  ],
})
```

## React Router V4/V5

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

If you are using a navigation method that we do not currently provide a helper for you can still instrument manually by
letting us know when a route changes through the `setCurrentRoute` method:

```typescript
import { createReactRouterNavigationInstrumentation } from '@embrace-io/web-sdk/react-instrumentation';

const customNavigationHandler = () => {
  // ... navigation logic

  // Get raw URL and path pattern from the custom navigation
  const url = '/path/before/replaced'
  const path = '/path/before/:replace'

  // Since `createReactRouterNavigationInstrumentation` was already called when setting up the
  // instrumentation in `initSDK` this will simply get a reference to the NavigationInstrumentation
  // instance rather than creating a new one
  const navigationInstrumentation = createReactRouterNavigationInstrumentation();

  // Track that the navigation occurred
  navigationInstrumentation.setCurrentRoute({
    url,
    path
  });
}
```

### Configuration

You can configure the React Router instrumentation by passing options to the `createReactRouterNavigationInstrumentation` function.  
For now, the only option available is `shouldCleanupPathOptionsFromRouteName`.
If set to `true`, the instrumentation will remove path options from the route name, e.g. it will convert `/order/:orderState(pending|shipped|delivered)` to `/order/:orderState`.
