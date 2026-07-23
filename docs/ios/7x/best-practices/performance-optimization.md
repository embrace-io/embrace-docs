---
title: Performance Optimization
description: Tips for optimizing performance with the Embrace iOS SDK 7.x
sidebar_position: 1
---

## Performance Optimization

The Embrace iOS SDK is designed to have minimal impact on your application's performance. However, there are several best practices you can follow to ensure the SDK operates efficiently.

### SDK Configuration

#### Set Appropriate Log Level

In production builds, set the log level to `.error` or `.warning` to minimize console logging:

```swift
let options = EmbraceIO.Options.withAppId(
    "YOUR_APP_ID",
    logLevel: .error // Use .verbose only for debugging
)
```

#### Configure Capture Services Selectively

Only enable the capture services you need. Build the service list explicitly instead of relying on `addDefaults()`:

```swift
let services = CaptureServicesOptionsBuilder()
    .addUrlSessionCaptureService(withOptions: URLSessionCaptureService.Options())
    .addViewCaptureService(withOptions: ViewCaptureService.Options())
    // Only include the services you actually need
    .build()

let options = EmbraceIO.Options.withAppId(
    "YOUR_APP_ID",
    captureServices: services
)
```

### Network Monitoring Optimization

#### Filter Network Requests

Reduce noise by ignoring high-volume or irrelevant endpoints with `ignoredURLs`. Any request URL containing one of these strings is skipped:

```swift
let networkOptions = URLSessionCaptureService.Options(
    ignoredURLs: [
        "analytics.example.com",
        "metrics.myapp.com"
    ]
)
```

### View Tracking Optimization

#### Be Selective with View Tracking

Configure the `ViewCaptureService` to exclude view controllers you don't need to track using `viewControllerBlockList`, and disable the instrumentation you don't need:

```swift
let viewOptions = ViewCaptureService.Options(
    instrumentVisibility: true,
    instrumentFirstRender: false, // Skip first-render instrumentation if not needed
    viewControllerBlockList: ViewControllerBlockList()
)
```

### Memory Management

#### Limit Custom Attributes

Be mindful of the number and size of custom attributes you add to sessions, logs, or spans:

```swift
// Good practice: use small, relevant attributes
EmbraceIO.shared.setProperty(key: "user_tier", value: "premium", lifespan: .session)

// Avoid: large string values or too many attributes
// This could impact memory usage
EmbraceIO.shared.setProperty(key: "user_full_details", value: largeJSONString, lifespan: .session)
```

#### Avoid Excessive Logging

Use logs strategically and avoid excessive logging, particularly for high-frequency events:

```swift
// Avoid logging high-frequency events like scrolling
tableView.didScroll { [weak self] in
    // Don't do this:
    // EmbraceIO.shared.log("User scrolled table view", severity: .info)

    // Instead, maybe log only significant scroll events
    if reachedBottom {
        EmbraceIO.shared.log("User reached end of content", severity: .info)
    }
}
```

### Batch Operations

For operations that generate many log entries or spans, consider batching them or using a single parent span:

```swift
// Instead of starting/ending many small spans
func processItems(items: [Item]) {
    // Start a parent span
    let parentSpan = EmbraceIO.shared.createSpan(name: "process_items_batch")

    for item in items {
        // Process each item
        processItem(item)
    }

    // End the parent span
    parentSpan?.end()
}
```

### Background Execution

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

### Trace Management

#### Use Trace Sampling

For very high-volume operations, consider implementing trace sampling to reduce the volume of data:

```swift
// Only trace some percentage of a high-frequency operation
func highFrequencyOperation() {
    // Simple sampling approach
    let shouldTrace = Double.random(in: 0...1) < 0.1 // 10% sample rate

    if shouldTrace {
        let span = EmbraceIO.shared.createSpan(name: "high_frequency_operation")
        // Perform operation
        span?.end()
    } else {
        // Just perform operation without tracing
    }
}
```

### Testing Performance Impact

Regularly profile your app with Instruments to ensure the Embrace SDK is not causing performance issues:

- Use Time Profiler to identify if any Embrace methods are consuming excessive CPU time
- Use Allocations instrument to check if the SDK is causing memory growth
- Compare app performance metrics with and without the SDK enabled

### Summary

- Configure the SDK appropriately for your production environment
- Be selective with what you monitor and log
- Limit the size and frequency of custom attributes
- Use batching for high-frequency operations
- Regularly test the performance impact of your Embrace implementation

By following these guidelines, you can ensure that the Embrace SDK provides valuable insights into your app's performance without negatively impacting the user experience.

<!-- TODO: Add specific performance benchmarks for different SDK configurations  -->
