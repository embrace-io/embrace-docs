---
title: Performance Optimization
description: Tips for optimizing performance with the Embrace iOS SDK 6.x
sidebar_position: 1
---

# Performance Optimization

The Embrace iOS SDK is designed to have minimal impact on your application's performance. However, there are several best practices you can follow to ensure the SDK operates efficiently.

## SDK Configuration

### Set Appropriate Log Level

In production builds, set the log level to `.error` or `.warning` to minimize console logging:

```swift
let options = Embrace.Options(
    appId: "YOUR_APP_ID",
    logLevel: .error // Use .verbose only for debugging
)
```

### Configure Capture Services Selectively

Only enable the capture services you need:

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

```swift
// Good practice: use small, relevant attributes
Embrace.client.addSessionAttribute(key: "user_tier", value: "premium")

// Avoid: large string values or too many attributes
// This could impact memory usage
Embrace.client.addSessionAttribute(key: "user_full_details", value: largeJSONString)
```

### Avoid Excessive Logging

Use logs strategically and avoid excessive logging, particularly for high-frequency events:

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

## Batch Operations

For operations that generate many log entries or spans, consider batching them or using a single parent span:

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

## Testing Performance Impact

Regularly profile your app with Instruments to ensure the Embrace SDK is not causing performance issues:

1. Use Time Profiler to identify if any Embrace methods are consuming excessive CPU time
2. Use Allocations instrument to check if the SDK is causing memory growth
3. Compare app performance metrics with and without the SDK enabled

## Summary

- Configure the SDK appropriately for your production environment
- Be selective with what you monitor and log
- Limit the size and frequency of custom attributes
- Use batching for high-frequency operations
- Regularly test the performance impact of your Embrace implementation

By following these guidelines, you can ensure that the Embrace SDK provides valuable insights into your app's performance without negatively impacting the user experience.
