---
title: Debugging Tips
description: Strategies for debugging and troubleshooting the Embrace Web SDK
sidebar_position: 3
---

# Debugging Tips

The Embrace Web SDK provides several tools and techniques to help you diagnose issues. This guide outlines best
practices for debugging and troubleshooting when integrating or using the SDK.

## Enabling Verbose Logging

For debugging purposes, increase the log level during development to see detailed SDK operations:

```typescript
import { initSDK, DiagLogLevel } from '@embrace-io/web-sdk';

initSDK({
  appID: "YOUR_EMBRACE_APP_ID",
  appVersion: "YOUR_APP_VERSION",
  logLevel: DiagLogLevel.INFO,
});
```

## Identifying SDK Initialization Issues

If you're experiencing issues with SDK initialization:

1. Check that the SDK initialization was successful:

   ```typescript
   import { initSDK } from '@embrace-io/web-sdk';

   const result = initSDK({
     appID: "YOUR_EMBRACE_APP_ID",
     appVersion: "YOUR_APP_VERSION",
   });

   if (result) {
     console.log("Successfully initialized the Embrace SDK");
   } else {
     console.log("Failed to initialize the Embrace SDK");
   }
   ```

2. Verify your App ID is correct and that it matches your environment (development/production)
3. Check the dev console for any warnings or errors logged from the Embrace SDK

## Verifying Session Tracking

If sessions aren't being tracked properly try forcing a new session for testing:

```typescript
import { session } from '@embrace-io/web-sdk';

// Force start a new session
session.startSessionSpan();

// Force end the current session
session.endSessionSpan();
```

Verify that the developer console's network tab contains requests to Embrace's `/spans` and `/logs` endpoints.

## Debugging Custom Traces

If your custom traces aren't appearing:

1. Add more context to your spans to make them easier to identify:

   ```typescript
   const span = trace.startSpan("span-name", {
      attributes: {
         "debug-id": id,
      },
   });

   // ... operations ...
   span.end();
   ```

2. Check for hierarchy issues (child spans must be created within parent spans):

   ```typescript
   import { trace } from '@embrace-io/web-sdk';

   const parentSpan = tracer.startSpan("parent-peration");
   // Correct - child span is related to parent
   const childSpan = tracer.startSpan("the-child", { parentSpan });

   // ... operations ...
   childSpan.end();

   // ... operations ...
   parentSpan.end();
   ```

3. Ensure that spans were ended, spans must be ended in order to be reported to Embrace

   ```typescript
   const span = trace.startSpan("span-name");

   // ... operations ...

   // span.end() never called, the span will not be reported
   ```

## Summary

- Use verbose logging during development
- Implement proper error handling for setup and start
- Add debug attributes to traces, sessions, and logs

By following these debugging tips, you can more quickly identify and resolve issues with the Embrace SDK integration.
