---
title: Performance Optimization
description: Tips for optimizing performance with the Embrace iOS SDK 6.x
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Performance Optimization

The Embrace iOS SDK is designed to have minimal impact on your application's performance. However, there are several best practices you can follow to ensure the SDK operates efficiently.

## SDK Configuration

### Set Appropriate Log Level

In production builds, set the log level to `.error` or `.warning` to minimize console logging:

<Tabs groupId="embrace-client">
<TabItem value="embraceio" label="EmbraceIO" default>

```swift
let options = EmbraceIO.Options.withAppId(
    "YOUR_APP_ID",
    logLevel: .error // Use .verbose only for debugging
)
```

</TabItem>
<TabItem value="embrace" label="Embrace">

```swift
let options = Embrace.Options(
    appId: "YOUR_APP_ID",
    logLevel: .error // Use .verbose only for debugging
)
```

</TabItem>
</Tabs>

### Configure Capture Services Selectively

Only enable the capture services you need:

<Tabs groupId="embrace-client">
<TabItem value="embraceio" label="EmbraceIO" default>

```swift
let options = EmbraceIO.Options.withAppId(
    "YOUR_APP_ID",
    enabledCaptureServices: [
        .networkCaptureService,
        .viewCaptureService
        // Only include services you actually need
    ]
)
```

</TabItem>
<TabItem value="embrace" label="Embrace">

```swift
let options = Embrace.Options(
    appId: "YOUR_APP_ID",
    enabledCaptureServices: [
        .networkCaptureService,
        .viewCaptureService
        // Only include services you actually need
    ]
)
```

</TabItem>
</Tabs>

## Network Monitoring Optimization

### Filter Network Requests

Limit network monitoring to only the domains or paths you care about:

```swift
let networkOptions = NetworkCaptureServiceOptions(
    urlSanitizer: { url in
        // Only track specific domains
        if url.host?.contains("your-api-domain.com") == true {
            return url
        }
        return nil // Don't capture other domains
    }
)
```

### Limit Body Capture

Avoid capturing large request or response bodies, as this can increase memory usage:

```swift
let networkOptions = NetworkCaptureServiceOptions(
    responseBodyCapturePredicate: { request, response, data in
        // Only capture JSON responses smaller than 10KB
        guard let data = data, data.count < 10 * 1024 else {
            return false
        }
        return response.mimeType?.contains("application/json") == true
    }
)
```

## View Tracking Optimization

### Be Selective with View Tracking

Configure the ViewCaptureService to only track important views:

```swift
let viewOptions = ViewCaptureServiceOptions(
    shouldTrackViewController: { viewController in
        // Filter out views you don't need to track
        return !(viewController is UIAlertController)
    }
)
```

## Memory Management

### Limit Custom Attributes

Be mindful of the number and size of custom attributes you add to sessions, logs, or spans:

<Tabs groupId="embrace-client">
<TabItem value="embraceio" label="EmbraceIO" default>

```swift
// Good practice: use small, relevant attributes
try? EmbraceIO.shared.setProperty(key: "user_tier", value: "premium", lifespan: .session)

// Avoid: large string values or too many attributes
// This could impact memory usage
try? EmbraceIO.shared.setProperty(key: "user_full_details", value: largeJSONString, lifespan: .session)
```

</TabItem>
<TabItem value="embrace" label="Embrace">

```swift
// Good practice: use small, relevant attributes
Embrace.client.addSessionAttribute(key: "user_tier", value: "premium")

// Avoid: large string values or too many attributes
// This could impact memory usage
Embrace.client.addSessionAttribute(key: "user_full_details", value: largeJSONString)
```

</TabItem>
</Tabs>

### Avoid Excessive Logging

Use logs strategically and avoid excessive logging, particularly for high-frequency events:

<Tabs groupId="embrace-client">
<TabItem value="embraceio" label="EmbraceIO" default>

```swift
// Avoid logging high-frequency events like scrolling
tableView.didScroll { [weak self] in
    // Don't do this:
    // try EmbraceIO.shared.log("User scrolled table view", severity: .info)

    // Instead, maybe log only significant scroll events
    if reachedBottom {
        try EmbraceIO.shared.log("User reached end of content", severity: .info)
    }
}
```

</TabItem>
<TabItem value="embrace" label="Embrace">

```swift
// Avoid logging high-frequency events like scrolling
tableView.didScroll { [weak self] in
    // Don't do this:
    // Embrace.client.logMessage("User scrolled table view")

    // Instead, maybe log only significant scroll events
    if reachedBottom {
        Embrace.client.logMessage("User reached end of content")
    }
}
```

</TabItem>
</Tabs>

## Batch Operations

For operations that generate many log entries or spans, consider batching them or using a single parent span:

<Tabs groupId="embrace-client">
<TabItem value="embraceio" label="EmbraceIO" default>

```swift
// Instead of starting/ending many small spans
func processItems(items: [Item]) {
    // Start a parent span
    let parentSpan = EmbraceIO.shared.buildSpan(name: "process_items_batch").startSpan()

    for item in items {
        // Process each item
        processItem(item)
    }

    // End the parent span
    parentSpan.end()
}
```

</TabItem>
<TabItem value="embrace" label="Embrace">

```swift
// Instead of starting/ending many small spans
func processItems(items: [Item]) {
    // Start a parent span
    let parentSpan = Embrace.client.startSpan(name: "process_items_batch")

    for item in items {
        // Process each item
        processItem(item)
    }

    // End the parent span
    parentSpan.end()
}
```

</TabItem>
</Tabs>

## Background Execution

Minimize SDK operations during app background time:

```swift
// In AppDelegate or SceneDelegate
func sceneDidEnterBackground(_ scene: UIScene) {
    // Perform any essential Embrace operations before backgrounding

    // Consider pausing non-critical monitoring when in background
    if let customService = yourCustomMonitoringService {
        customService.pauseMonitoring()
    }
}
```

## Trace Management

### Use Trace Sampling

For very high-volume operations, consider implementing trace sampling to reduce the volume of data:

<Tabs groupId="embrace-client">
<TabItem value="embraceio" label="EmbraceIO" default>

```swift
// Only trace some percentage of a high-frequency operation
func highFrequencyOperation() {
    // Simple sampling approach
    let shouldTrace = Double.random(in: 0...1) < 0.1 // 10% sample rate

    if shouldTrace {
        let span = EmbraceIO.shared.buildSpan(name: "high_frequency_operation").startSpan()
        // Perform operation
        span.end()
    } else {
        // Just perform operation without tracing
    }
}
```

</TabItem>
<TabItem value="embrace" label="Embrace">

```swift
// Only trace some percentage of a high-frequency operation
func highFrequencyOperation() {
    // Simple sampling approach
    let shouldTrace = Double.random(in: 0...1) < 0.1 // 10% sample rate

    if shouldTrace {
        let span = Embrace.client.startSpan(name: "high_frequency_operation")
        // Perform operation
        span.end()
    } else {
        // Just perform operation without tracing
    }
}
```

</TabItem>
</Tabs>

## Testing Performance Impact

Regularly profile your app with Instruments to ensure the Embrace SDK is not causing performance issues:

- Use Time Profiler to identify if any Embrace methods are consuming excessive CPU time
- Use Allocations instrument to check if the SDK is causing memory growth
- Compare app performance metrics with and without the SDK enabled

## Summary

- Configure the SDK appropriately for your production environment
- Be selective with what you monitor and log
- Limit the size and frequency of custom attributes
- Use batching for high-frequency operations
- Regularly test the performance impact of your Embrace implementation

By following these guidelines, you can ensure that the Embrace SDK provides valuable insights into your app's performance without negatively impacting the user experience.

<!-- TODO: Add specific performance benchmarks for different SDK configurations  -->
