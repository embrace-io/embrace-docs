---
title: Error Boundary
description: Automatically capture React rendering errors using Embrace Web SDK
sidebar_position: 2
---

To capture rendering errors in your React components, you can use the `EmbraceErrorBoundary` component. This component will automatically capture errors that on any of its children components render and send them to Embrace.
Errors are captured in the same way as unhandled exceptions, so they will be visible in the Embrace dashboard under the Exceptions section.

```typescript jsx
import { EmbraceErrorBoundary } from '@embrace-io/web-sdk/react-instrumentation';

const App = () => {
  return (
    <EmbraceErrorBoundary fallback={() => <YourFallbackComponent />}>
      <>
        {/* Your app components go here */}
        <Home />
        <About />
        <Contact />
      </>
    </EmbraceErrorBoundary>
  );
}
```
