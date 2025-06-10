---
title: Automatic Instrumentation
description: Overview of automatic instrumentation capabilities in the Embrace Web SDK
sidebar_position: 3
---

# Automatic Instrumentation

The Embrace Web SDK provides several instrumentations that automatically collect data from your application with minimal
setup. These instrumentations gather valuable telemetry data and convert them into OpenTelemetry signals like spans and
logs.

## What is Automatic Instrumentation?

Automatic instrumentation refers to the SDK's ability to monitor and collect data about your application's behavior
without requiring you to add manual instrumentation code throughout your app. This provides:

- Immediate visibility into app performance
- Reduced development overhead
- Consistent data collection
- Standard telemetry across different areas of your app

## Available Automatic Instrumentation

The Embrace SDK includes the following automatic instrumentation capabilities:

- **[Network Monitoring](./network-monitoring.md)** - Tracks network requests, timing, headers, and responses
- **[Exceptions](./exceptions.md)** - Records unhandled exceptions that are thrown in your application
- **[Web Vitals](./web-vitals.md)** - Surfaces Web Vital reports measuring your app's performance and responsiveness
- **[Document Load](./document-load.md)** - Provides insight into your app's page load performance
- **[User Interactions](./user-interactions.md)** - Records user interactions within your app's pages
- **[React](./react/index.md)** - Various instrumentations that emit React specific telemetry if your app is built on that
framework

## Configuring Automatic Instrumentation

The instrumentations are configured when you initialize the Embrace SDK. You can use default settings or customize their
behavior by passing a `defaultInstrumentationConfig` object when initializing the SDK:

```typescript
import { sdk } from '@embrace-io/web-sdk';

sdk.initSDK({
  appID: "YOUR_EMBRACE_APP_ID",
  appVersion: "YOUR_APP_VERSION",
  defaultInstrumentationConfig: {
    omit: new Set(['@opentelemetry-instrumentation-fetch']),
    'web-vitals': {
      trackingLevel: 'all'
    }
  },
});
```

View the type definition for [defaultInstrumentationConfig](https://github.com/embrace-io/embrace-web-sdk/blob/main/src/sdk/types.ts)
to see the full set of configuration options.

## Extending Automatic Instrumentations

While the built-in instrumentations cover many common scenarios, you can also create your own or use ones defined in
other packages to instrument specific aspects of your application:

```typescript
import { sdk } from '@embrace-io/web-sdk';

sdk.initSDK({
  appID: "YOUR_EMBRACE_APP_ID",
  appVersion: "YOUR_APP_VERSION",
  instrumentations: [myCustomInstrumentation],
});
```

These custom instrumentations must conform to the same OpenTelemetry `Instrumentation` interface used by the [SDK's
built-in instrumentations](https://github.com/embrace-io/embrace-web-sdk/blob/main/src/instrumentations/InstrumentationAbstract/InstrumentationAbstract.ts).

## Best Practices

To get the most out of automatic instrumentation:

- Start with the default instrumentations to get baseline telemetry
- Customize instrumentations to focus on the most important areas of your app
- Combine automatic instrumentation with strategic manual instrumentation for comprehensive coverage
- Review the data collected regularly to identify optimization opportunities
