---
title: Hang Detection
description: Automatically detect and monitor main thread hangs in your iOS app with Embrace
sidebar_position: 7
---

# Hang Detection

The Embrace SDK automatically monitors your application's main thread for app hangs, providing visibility into UI freezes and unresponsive behavior that can frustrate users.

## What are Hangs?

A hang occurs when your app's main thread (UI thread) is blocked for too long, preventing the app from responding to user interactions. During a hang, your app may appear frozen—buttons don't respond, animations stop, and the UI becomes unresponsive.

Common causes of hangs include:

- Performing heavy computations on the main thread
- Synchronous network requests
- Large file I/O operations
- Inefficient database queries
- Deadlocks or race conditions
- Slow third-party SDK initialization

Even hangs as short as 250 milliseconds can be noticeable to users and negatively impact the user experience.

For more information about understanding and improving hangs in iOS apps, see Apple's documentation:

- [Understanding Hangs in Your App](https://developer.apple.com/documentation/xcode/understanding-hangs-in-your-app)
- [Improving App Responsiveness](https://developer.apple.com/documentation/xcode/improving-app-responsiveness)

## How Hang Detection Works

The SDK automatically monitors the main thread using a dedicated watchdog thread. When the main thread is blocked for longer than 249 milliseconds (Apple's recommended threshold), a hang is detected and reported with:

- Duration of the hang
- Stack traces to identify the blocking code (when enabled)
- Associated session and user context

## Key Benefits

- Automatically detect UI freezes and unresponsive behavior
- Identify code causing main thread blockages
- Track hang frequency and duration
- No code changes required

## Configuration

Hang detection is enabled by default. You can customize settings during development or testing by implementing a custom `EmbraceConfigurable`:

```swift
import EmbraceIO
import EmbraceConfiguration

// Create a custom configuration class
class CustomConfig: EmbraceConfigurable {
    // Customize hang detection limits
    var hangLimits = HangLimits(
        hangPerSession: 200,    // Max hangs to capture per session
        samplesPerHang: 5       // Max stack trace samples per hang
    )

    // Required EmbraceConfigurable properties with defaults
    var isSDKEnabled: Bool = true
    // ... add all other configs here

    func update(completion: (Bool, (any Error)?) -> Void) {
        completion(false, nil)
    }
}

// Initialize Embrace with custom configuration
let options = Embrace.Options(
    appId: "YOUR_APP_ID",
    platform: .default
)

do {
    try Embrace.setup(options: options)
    try Embrace.client?.start()
} catch {
    print("Failed to setup Embrace: \(error)")
}
```

:::info
In production, hang detection is typically controlled via Embrace's remote configuration system.
:::

### Configuration Options

#### HangLimits

- **`hangPerSession`** (default: 200): Maximum hangs to capture per session. Set to `0` to disable hang detection.

- **`samplesPerHang`** (default: 0): Number of stack trace samples to capture during a hang. Default `0` captures only the initial stack trace. Increase to 5-10 when debugging to see how the stack evolves over time.

### Hang Detection Threshold

The SDK uses a fixed threshold of **249 milliseconds** based on Apple's recommendations. This threshold captures hangs that are noticeable to users and cannot be customized.

## Data Captured

For each hang, the SDK captures:

- Start time and duration
- Stack traces (when `samplesPerHang > 0`)
- Session context

:::warning dSYM Upload Required
Upload dSYM files to see symbolicated stack traces. See [dSYM Upload Guide](../getting-started/dsym-upload.md).
:::

## How Hangs Appear in OpenTelemetry

Hangs are reported as OpenTelemetry spans with the name `emb-thread-blockage`. Stack trace samples (when enabled) are attached as span events.

## Integration with Other Features

Hangs are automatically correlated with:

- Sessions and user identification
- Active views
- Network requests
- Crashes

## Best Practices

### Default Settings

The default configuration (`hangPerSession: 200`, `samplesPerHang: 0`) is optimized for production with minimal overhead.

### Common Hang Sources

Common code patterns that cause hangs:

```swift
// Bad: Synchronous network request on main thread
let data = try Data(contentsOf: url)  // Blocks until download completes

// Good: Async network request
URLSession.shared.dataTask(with: url) { data, response, error in
    // Handle response on background thread
}.resume()

// Bad: Heavy computation on main thread
let result = processLargeDataset(data)  // Blocks UI

// Good: Background computation
DispatchQueue.global(qos: .userInitiated).async {
    let result = processLargeDataset(data)
    DispatchQueue.main.async {
        // Update UI with result
    }
}

// Bad: Synchronous database query on main thread
let users = try context.fetch(fetchRequest)  // May block for large result sets

// Good: Async database query
context.perform {
    let users = try? context.fetch(fetchRequest)
    // Process results on background context
}
```

### Reducing Hangs

- Move heavy work off the main thread
- Use async/await or GCD for long-running operations
- Optimize rendering and view hierarchy complexity
- Profile with Instruments to identify bottlenecks

## Disabling Hang Detection

Set `hangPerSession: 0` in your configuration to disable hang detection.

## Troubleshooting

### Not Seeing Hang Data

- Verify `hangPerSession > 0`
- Confirm SDK is properly initialized
- Test with `Thread.sleep(forTimeInterval: 0.5)` on the main thread
- Check sessions are uploading successfully

### Stack Traces Not Symbolicated

Ensure dSYM files are uploaded for your app version. See [dSYM Upload Guide](../getting-started/dsym-upload.md).

## Related Documentation

- [Performance Monitoring](../manual-instrumentation/performance-monitoring.md) - Manual performance instrumentation
- [Session Reporting](../getting-started/session-reporting.md) - Understanding session data
- [dSYM Upload](../getting-started/dsym-upload.md) - Symbolication setup
- [Configuration Options](../getting-started/configuration-options.md) - Complete SDK configuration
- [View Tracking](./view-uikit-tracking.md) - Correlate hangs with specific views
