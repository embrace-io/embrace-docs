---
title: Manual Instrumentation
description: Add custom telemetry to your iOS app with Embrace's manual instrumentation APIs
sidebar_position: 4
---

# Manual Instrumentation

While Embrace's [automatic instrumentation](../automatic-instrumentation/index.md) captures many important metrics and events out of the box, manual instrumentation allows you to add custom telemetry data that's specific to your application's unique workflows and business logic.

## What is Manual Instrumentation?

Manual instrumentation refers to the explicit addition of code in your application to create traces, logs, handle errors, and monitor performance. This gives you the ability to:

- Track custom business processes
- Measure performance of critical operations
- Add context-specific attributes to telemetry data
- Capture application-specific events
- Create custom user journeys

## Manual Instrumentation APIs

Embrace provides several APIs for manual instrumentation:

- **[Custom Traces](./custom-traces.md)** - Measure the duration of custom operations with spans
- **[Custom Logging](./custom-logging.md)** - Capture log messages at various severity levels
- **[Network Instrumentation](./network-instrumentation.md)** - Manually instrument network requests from third-party libraries like gRPC
- **[Error Handling](./error-handling.md)** - Record and track errors that occur in your app
- **[Performance Monitoring](./performance-monitoring.md)** - Track performance metrics for critical operations
- **[Crash Reporting](./crash-reporting.md)** - Configure crash reporting and integrate with Crashlytics
- **[Breadcrumbs](./breadcrumbs.md)** - Add lightweight logging context to sessions

## When to Use Manual Instrumentation

Consider adding manual instrumentation when:

- You need to track business-specific metrics not covered by automatic instrumentation
- You want to measure performance of critical algorithms or operations
- You need to track user journeys across multiple screens
- You want to add custom context to your telemetry data
- You need to capture application-specific events
- You want to track third-party SDK interactions
- You're using network libraries that don't use URLSession (like gRPC)

## Basic Principles

Effective manual instrumentation follows these principles:

- **Consistent naming** - Use a consistent naming convention for spans and events
- **Appropriate granularity** - Create spans that are neither too broad nor too narrow
- **Relevant attributes** - Add attributes that provide useful context
- **Error capturing** - Record errors within the proper context
- **Proper span hierarchy** - Create logical parent-child relationships

## Getting Started

The most common way to start with manual instrumentation is by creating custom spans:

```swift
// Create and start a span
let span = Embrace.client?.startSpan(name: "important_operation")

// Perform your operation
// ...

// Add some context to the span
span?.setAttribute(key: "operation_size", value: "large")

// Record success or failure
if success {
    span?.end()
} else {
    span?.recordError(error)
    span?.setStatus(.error)
    span?.end()
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

## Integration with Automatic Instrumentation

Manual instrumentation complements automatic instrumentation. For example:

- Add custom attributes to automatically captured spans
- Create custom spans as children of automatically captured spans
- Use custom events to mark significant points within automatically tracked user flows

<!-- TODO: Add more robust code examples showing integration between automatic and manual instrumentation
TODO: Add code samples showing complex scenarios and best practices
TODO: Link to blog posts with case studies of effective instrumentation approaches  -->
