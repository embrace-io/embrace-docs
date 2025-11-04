---
title: Empty Root Node
description: Automatically monitor rendering failures on your web app's root element with Embrace
sidebar_position: 7
---

# Empty Root Node

The Embrace SDK can be configured to monitor the root node of your application, providing visibility into when a user's
experience is interrupted by a visually blank page.

## How Empty Root Node Instrumentation Works

When using a framework such as React there is normally a DOM element on the page that is designated as the root element
within which the framework will take over the management and rendering of components. If an error is raised and propagates
without being handled by the framework this results in an empty root node and the user being presented with a visually
blank screen.

This instrumentation can be enabled by configuring it with the element that is considered as the root in your application:

```typescript
import { initSDK } from '@embrace-io/web-sdk';

initSDK({
  appID: "YOUR_EMBRACE_APP_ID",
  appVersion: "YOUR_APP_VERSION",
  defaultInstrumentationConfig: {
    'empty-root': {
      rootNode: document.getElementById('root'),
    },
  },
});
```

The instrumentation then setups a [MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)
on the element and records a SpanEvent on the current session Span if that element is ever found to have been emptied
out.

The occurrence of this event then feeds into our [Exception Severity Score calculation](/docs/product/exceptions/severity-score.md#6-empty-root-node-multiplier)
so that any exception we detect immediately prior to the root node being found empty is given a higher severity.