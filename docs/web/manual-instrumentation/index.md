---
title: Manual Instrumentation
description: Add custom telemetry to your web app with Embrace's manual instrumentation APIs
sidebar_position: 4
---

# Manual Instrumentation

While Embrace's [automatic instrumentation](../automatic-instrumentation/index.md) captures many important metrics and
events out of the box, manual instrumentation allows you to add custom telemetry data that's specific to your
application's unique workflows and business logic.

## What is Manual Instrumentation?

Manual instrumentation refers to the explicit addition of code in your application to create traces, logs, handle errors,
and monitor performance. This gives you the ability to:

- Track custom business processes
- Measure performance of critical operations
- Add context-specific attributes to telemetry data
- Capture application-specific events
- Create custom user journeys

## Manual Instrumentation APIs

Embrace provides several APIs for manual instrumentation:

1. **[Custom Traces](./custom-traces.md)** - Measure the duration of custom operations with spans
2. **[Custom Logging](./custom-logging.md)** - Capture log messages at various severity levels
3. **[Breadcrumbs](./breadcrumbs.md)** - Provide context to user activity in sessions
4. **[Navigation](./navigation.md)** - Annotate sessions as users navigate through your app

## When to Use Manual Instrumentation

Consider adding manual instrumentation when:

- You need to track business-specific metrics not covered by automatic instrumentation
- You want to measure performance of critical algorithms or operations
- You need to track user journeys across multiple interactions
- You want to add custom context to your telemetry data
- You need to capture application-specific events
- You want to track third-party SDK interactions

## Basic Principles

Effective manual instrumentation follows these principles:

1. **Consistent naming** - Use a consistent naming convention for spans and events
2. **Appropriate granularity** - Create spans that are neither too broad nor too narrow
3. **Relevant attributes** - Add attributes that provide useful context
4. **Error capturing** - Record errors within the proper context
5. **Proper span hierarchy** - Create logical parent-child relationships

## Getting Started

The most common way to start with manual instrumentation is by creating custom spans:

```typescript
import { trace } from '@embrace-io/web-sdk';

// Create and start a span
const span = trace.startSpan("span-name");

// Perform your operation
// ...

// Add some context to the span
span.setAttribute("operation-size", "large");

// Record success or failure
if (success) {
  span.end();
} else {
  span.fail();
}
```

Explore the sections in this documentation to learn about all the available manual instrumentation capabilities.

## Best Practices

- Start with automatic instrumentation and add manual instrumentation for business-critical paths
- Use descriptive names for spans and events that clearly indicate what they represent
- Add attributes that provide meaningful context for troubleshooting
- Create a standardized naming scheme for your organization
- Avoid creating too many spans which could impact performance
- Balance detail with volume to avoid overwhelming your telemetry data