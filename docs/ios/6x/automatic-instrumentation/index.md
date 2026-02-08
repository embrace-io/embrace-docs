---
title: Automatic Instrumentation
description: Overview of automatic instrumentation capabilities in the Embrace iOS SDK 6.x
sidebar_position: 3
---

# Automatic Instrumentation

The Embrace iOS SDK provides several built-in Capture Services that automatically instrument your application with minimal setup. These services collect valuable telemetry data and convert them into OpenTelemetry signals like spans and events.

## What is Automatic Instrumentation?

Automatic instrumentation refers to the SDK's ability to monitor and collect data about your application's behavior without requiring you to add manual instrumentation code throughout your app. This provides:

- Immediate visibility into app performance
- Reduced development overhead
- Consistent data collection
- Standard metrics across different areas of your app

## Available Capture Services

The Embrace SDK includes the following automatic instrumentation capabilities:

- **[Network Monitoring](./network-monitoring.md)** - Tracks `URLSession` network requests, timing, headers, and responses
- **[UIKit View Tracking](./view-uikit-tracking.md)** - Measures `UIViewController` lifecycle, load times, and visibility
- **[SwiftUI View Tracking](./view-swiftui-tracking.md)** - Measures `View` lifecycle, load times, and visibility
- **[Tap Capture](./tap-capture.md)** - Records user interactions with your app's interface
- **[Push Notifications](./push-notifications.md)** - Captures push notification events received by your app
- **[WebView Monitoring](./webview-monitoring.md)** - Tracks URL loads and errors in `WKWebView` components
- **[Hang Detection](./hang-detection.md)** - Monitors main thread hangs and UI freezes with stack trace sampling

Additionally, the SDK monitors system events like low memory warnings and low power mode to help you understand environmental impacts on your app's performance.

## How Capture Services Work

Each capture service specializes in monitoring a specific aspect of your application. Depending on the service, it may:

- Generate OpenTelemetry spans that track the duration of operations
- Create span events that mark points in time when something occurs
- Attach attributes to spans to provide contextual information
- Create parent-child relationships between spans to show relationships

All of this data is collected automatically and integrated with your session data, providing a comprehensive view of your application's behavior.

## Configuring Automatic Instrumentation

The capture services are configured when you initialize the Embrace SDK. You can use default settings or customize the behavior of each service:

```swift
// Use all default capture services
let options = Embrace.Options(
    appId: "YOUR_APP_ID",
    // Other options...
)

// OR customize specific services
let urlSessionOptions = URLSessionCaptureService.Options(
    injectTracingHeader: true,
    ignoredURLs: ["analytics.example.com"] 
)

let services = CaptureServiceBuilder()
    .add(.urlSession(options: urlSessionOptions))
    .add(.view(options: ViewCaptureService.Options(
        instrumentVisibility: true, 
        instrumentFirstRender: true
    )))
    .addDefaults() // Add other default services
    .build()

let options = Embrace.Options(
    appId: "YOUR_APP_ID",
    captureServices: services,
    // Other options...
)
```

## Extending Automatic Instrumentation

While the built-in capture services cover many common scenarios, you can also create your own custom capture services to instrument specific aspects of your application:

```swift
// Create a custom capture service (example)
class MyCustomCaptureService: CaptureService {
    // Implementation details...
}

// Add it to your services
let services = CaptureServiceBuilder()
    .addDefaults()
    .add(MyCustomCaptureService())
    .build()
```

## Best Practices

To get the most out of automatic instrumentation:

- Start with the default capture services to get baseline metrics
- Customize services to focus on the most important areas of your app
- Filter out noise (like analytics requests) that could clutter your data
- Combine automatic instrumentation with strategic manual instrumentation for comprehensive coverage
- Review the data collected regularly to identify optimization opportunities

## Next Steps

Explore each capture service in detail to understand its capabilities and configuration options:  
