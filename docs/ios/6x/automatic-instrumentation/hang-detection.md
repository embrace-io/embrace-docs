---
title: Hang Detection
description: Automatically detect and monitor main thread hangs in your iOS app with Embrace
sidebar_position: 7
---

# Hang Detection

The Embrace SDK automatically monitors your application's main thread for hangs (also known as Application Not Responding or ANR events), providing visibility into UI freezes and unresponsive behavior that can frustrate users.

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

## How Hang Detection Works

Embrace uses two complementary mechanisms to detect and report hangs:

### 1. Real-time Hang Detection (HangWatchdog)

The SDK uses a dedicated high-priority watchdog thread that monitors the main `RunLoop` for blockages. This provides:

- **Immediate Detection**: Hangs are detected in real-time as they occur
- **Configurable Threshold**: By default, hangs lasting longer than 249 milliseconds are captured (Apple's recommended threshold)
- **Stack Trace Sampling**: Optionally captures periodic stack traces during the hang to identify the blocking code
- **Continuous Monitoring**: Tracks hang duration and updates while the hang persists

**Detection Mechanism:**

- A `CFRunLoopObserver` monitors the main RunLoop for activity
- A separate high-priority watchdog thread runs a timer that checks for blockages
- When the main thread fails to respond within the threshold, a hang is reported
- The watchdog continues tracking until the main thread becomes responsive again

### 2. MetricKit Hang Reporting

On iOS 14+, the SDK also receives system-level hang reports from Apple's MetricKit framework:

- **System-Level Detection**: Apple's diagnostics framework identifies hangs using system-wide monitoring
- **Historical Data**: Receives hang reports for events that occurred since the last app launch
- **Lower Overhead**: System handles detection without additional in-app overhead

Both mechanisms work together to provide comprehensive hang detection coverage.

## Key Benefits

- Identify UI freezes and unresponsive behavior automatically
- Pinpoint the exact code causing main thread blockages
- Track hang frequency and duration across user sessions
- Prioritize fixes based on user impact and occurrence rates
- Correlate hangs with other app behavior and user actions
- No code changes required—works automatically

## Configuration

Hang detection is enabled by default when you initialize the Embrace SDK. In production, hang detection behavior is typically controlled via Embrace's remote configuration system, which allows you to adjust settings without releasing a new app version.

For custom configurations during development or testing, you can configure hang detection by implementing a custom `EmbraceConfigurable`:

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
    var isBackgroundSessionEnabled: Bool = false
    var isNetworkSpansForwardingEnabled: Bool = false
    var isUiLoadInstrumentationEnabled: Bool = true
    var isWalModeEnabled: Bool = true
    var viewControllerClassNameBlocklist: [String] = []
    var uiInstrumentationCaptureHostingControllers: Bool = false
    var isSwiftUiViewInstrumentationEnabled: Bool = true
    var isMetricKitEnabled: Bool = false
    var isMetricKitInstrumentationEnabled: Bool = false
    var isMetricKitCrashCaptureEnabled: Bool = false
    var metricKitCrashSignals: [String] = []
    var isMetricKitHangCaptureEnabled: Bool = false
    var spanEventsLimits = SpanEventsLimits()
    var logsLimits = LogsLimits()
    var internalLogLimits = InternalLogLimits()
    var networkPayloadCaptureRules = [NetworkPayloadCaptureRule]()
    var useLegacyUrlSessionProxy: Bool = false

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

:::info Production Configuration
In most production scenarios, you don't need to implement custom configurations. Embrace's remote configuration system manages hang detection settings dynamically, allowing real-time adjustments without app updates.
:::

### Configuration Options

#### HangLimits

Configure hang detection limits to control data volume and overhead:

- **`hangPerSession`** (default: 200)
  - Maximum number of hangs to capture per session
  - Set to `0` to disable hang detection entirely
  - Prevents excessive data collection during severely degraded performance

- **`samplesPerHang`** (default: 0)
  - Maximum number of additional stack trace samples to capture while a hang persists
  - Set to `0` to capture only the initial stack trace when the hang is first detected, without periodic sampling during the hang
  - Higher values provide more detail by capturing multiple stack snapshots throughout the hang, but increase overhead
  - Recommended: 3-10 samples for detailed debugging to see how the stack trace evolves

:::tip
The default `samplesPerHang: 0` minimizes overhead while still capturing the initial stack trace when a hang starts, which is sufficient for identifying most issues. Increase sampling (e.g., `samplesPerHang: 5-10`) when actively debugging hang issues or for a small percentage of users to see how the blocking code evolves over time.
:::

### Hang Detection Threshold

The SDK uses a fixed threshold of **249 milliseconds** for hang detection, based on Apple's recommendations for responsive UI. This threshold:

- Matches Apple's MetricKit hang detection threshold
- Captures hangs that are noticeable to users
- Balances sensitivity with false positive prevention
- Cannot be customized to ensure consistency across all apps

:::info
The 249ms threshold is based on Apple's guidance that UI updates should complete within one frame (16.67ms at 60fps), with some tolerance for occasional slowdowns. Hangs exceeding this threshold are likely to be perceived by users.
:::

### MetricKit Configuration

MetricKit hang reporting is **disabled by default** and is controlled via Embrace's remote configuration system. When enabled remotely, the SDK automatically receives system-level hang diagnostics from Apple's MetricKit framework on iOS 14+. No code changes are required—simply enable the feature through your Embrace dashboard configuration.

## Data Captured

For each hang detected, the Embrace SDK captures:

### Hang Event Data

- **Start Time**: When the hang began
- **Duration**: Total time the main thread was blocked
- **Timestamp**: High-precision timestamp using monotonic clock
- **Session Context**: Associated session ID and metadata

### Stack Trace Samples (when enabled)

When `samplesPerHang > 0`, the SDK periodically captures stack traces during the hang:

- **Frame Information**: Function names, classes, and line numbers (when available)
- **Sample Timing**: When each stack trace was captured relative to hang start
- **Capture Overhead**: Time spent capturing the stack trace (for performance monitoring)
- **Symbolication**: Automatically symbolicated when dSYM files are uploaded

:::warning dSYM Upload Required
To see symbolicated stack traces in the Embrace dashboard, ensure you upload dSYM files after each app release. See [dSYM Upload Guide](../getting-started/dsym-upload.md) for details.
:::

### MetricKit Hang Data

For system-level hangs reported by MetricKit:

- **Hang Duration**: System-measured hang duration
- **Diagnostic Payload**: Raw MetricKit diagnostic information
- **Timestamp Range**: Start and end time of the hang event

## How Hangs Appear in OpenTelemetry

Hang events are reported as OpenTelemetry spans and events:

### Hang Span

Each hang creates a span with:

- **Span Name**: `emb-thread-blockage`
- **Span Type**: `thread_blockage` (performance span)
- **Attributes**:
  - `last_known_time_unix_nano`: Hang detection timestamp (high-precision monotonic time)
  - `interval_code`: Hang interval classification (currently always "0")
  - `thread_priority`: Thread priority value (currently always "0")
  - Duration: Automatically calculated from span start/end times

### Stack Trace Samples

Each stack trace sample creates a span event with:

- **Event Name**: `thread_blockage_sample`
- **Attributes**:
  - `emb.type`: Event type identifier (always "thread_blockage_sample")
  - `sample_overhead`: Time to capture the stack trace (nanoseconds)
  - `frame_count`: Number of frames in the stack trace
  - `emb.stacktrace.ios`: Base64-encoded JSON array of symbolicated stack frames

### MetricKit Logs

System-level hangs create OpenTelemetry logs with:

- **Log Type**: `ios.hang`
- **Severity**: Warning
- **Attributes**:
  - `log.record.uid`: Unique identifier for this hang report
  - `emb.provider`: "metrickit" (indicates the data source)
  - `emb.payload`: Raw MetricKit diagnostic payload (JSON string)
  - `emb.payload.timestamp`: Timestamp when the log was created (nanoseconds since 1970)
  - `diagnostic.timestamp_start`: Hang start time (nanoseconds since 1970)
  - `diagnostic.timestamp_end`: Hang end time (nanoseconds since 1970)

## Integration with Other Features

Hang detection integrates seamlessly with other Embrace features:

- **Session Association**: Hangs are linked to the session in which they occurred
- **User Identification**: Hangs are associated with the affected user
- **View Tracking**: Correlate hangs with the active view controller or SwiftUI view
- **Network Monitoring**: Identify if network requests coincide with hang events
- **Crash Reporting**: Hangs that occur immediately before crashes provide critical context

## Best Practices

### Production Settings

For production apps, the default remote configuration provides conservative settings optimized for minimal overhead:

- `hangPerSession: 200` - Reasonable limit for most apps
- `samplesPerHang: 0` - Captures initial stack trace only, minimizing overhead

This configuration:

- Captures hang occurrence, duration, and the initial blocking stack trace
- Minimizes performance impact
- Provides sufficient data for identifying problematic areas

:::info
These settings are managed automatically via Embrace's remote configuration. You typically don't need to customize them in your code.
:::

### Debugging Settings

When actively debugging hang issues, you can increase sampling via remote configuration or by implementing a custom configuration for development builds:

```swift
class DebugHangConfig: EmbraceConfigurable {
    var hangLimits = HangLimits(
        hangPerSession: 200,
        samplesPerHang: 10      // Detailed stack trace sampling
    )

    // ... other required EmbraceConfigurable properties with defaults
}
```

This provides:

- Multiple stack snapshots throughout each hang (up to 10 samples)
- Better visibility into what code is blocking the main thread and how it evolves
- More context for reproducing and fixing issues

:::caution Performance Impact
Stack trace sampling requires briefly suspending the main thread, which adds minimal overhead but should be used judiciously in production. Consider enabling detailed sampling for a small percentage of users or in pre-production builds.
:::

### Interpreting Hang Data

When analyzing hang data in the Embrace dashboard:

1. **Look for Patterns**: Are hangs concentrated in specific views or features?
2. **Check Duration**: Short hangs (`<500ms`) vs. long hangs (`>1s`) may have different causes
3. **Review Stack Traces**: Identify the common blocking operations
4. **Correlate with Sessions**: Do hangs occur more frequently in certain user segments?
5. **Monitor Frequency**: Track whether fixes reduce hang occurrence

### Common Hang Sources

Common code patterns that cause hangs:

```swift
// ❌ Bad: Synchronous network request on main thread
let data = try Data(contentsOf: url)  // Blocks until download completes

// ✅ Good: Async network request
URLSession.shared.dataTask(with: url) { data, response, error in
    // Handle response on background thread
}.resume()

// ❌ Bad: Heavy computation on main thread
let result = processLargeDataset(data)  // Blocks UI

// ✅ Good: Background computation
DispatchQueue.global(qos: .userInitiated).async {
    let result = processLargeDataset(data)
    DispatchQueue.main.async {
        // Update UI with result
    }
}

// ❌ Bad: Synchronous database query on main thread
let users = try context.fetch(fetchRequest)  // May block for large result sets

// ✅ Good: Async database query
context.perform {
    let users = try? context.fetch(fetchRequest)
    // Process results on background context
}
```

### Reducing Hangs

To minimize hangs in your app:

1. **Move Work Off Main Thread**: Use `DispatchQueue.global()` or `Task` for heavy operations
2. **Use Async/Await**: Leverage Swift concurrency for better async code
3. **Optimize Rendering**: Reduce view hierarchy complexity and layer operations
4. **Lazy Load Data**: Don't load everything upfront; load as needed
5. **Profile Regularly**: Use Instruments Time Profiler to identify slow operations
6. **Test on Older Devices**: Hangs are more likely on slower hardware

## Disabling Hang Detection

To disable hang detection entirely, you can request this configuration through your Embrace dashboard's remote configuration settings, which will set `hangPerSession` to `0` for your app.

Alternatively, for development or testing purposes, you can disable it via a custom configuration:

```swift
class NoHangConfig: EmbraceConfigurable {
    var hangLimits = HangLimits(
        hangPerSession: 0,  // Disables hang detection
        samplesPerHang: 0
    )

    // ... other required EmbraceConfigurable properties
}
```

:::warning
Disabling hang detection removes valuable visibility into app responsiveness issues. Only disable if you have specific performance or technical requirements.
:::

## Advanced Usage

### Custom Hang Monitoring

While the SDK automatically monitors the main RunLoop, you can also create custom `HangWatchdog` instances to monitor other RunLoops:

```swift
import EmbraceCore

// Monitor a custom RunLoop
let customWatchdog = HangWatchdog(
    threshold: 0.5,  // 500ms threshold
    runLoop: myCustomRunLoop
)

customWatchdog.hangObserver = MyCustomHangObserver()
```

:::info
This is an advanced feature rarely needed for typical apps. The default main thread monitoring is sufficient for most use cases.
:::

## Troubleshooting

### Not Seeing Hang Data

If hangs aren't appearing in the dashboard:

1. **Check Configuration**: Ensure `hangPerSession > 0`
2. **Verify SDK Initialization**: Confirm Embrace is properly initialized and started
3. **Trigger a Test Hang**: Add a deliberate `Thread.sleep(forTimeInterval: 0.5)` on the main thread
4. **Check Session Upload**: Ensure sessions are being uploaded successfully
5. **Review Remote Config**: MetricKit hang reporting may be controlled remotely

### Stack Traces Not Symbolicated

If stack traces show memory addresses instead of function names:

1. **Upload dSYMs**: Ensure dSYM files are uploaded for your app version
2. **Check Build Settings**: Verify debug symbols are generated
3. **Validate App Version**: Confirm the dSYM version matches the running app version
4. **Review Upload Status**: Check the Embrace dashboard for dSYM processing status

### High Hang Counts

If you're seeing excessive hangs:

1. **Review Threshold**: Remember that 249ms is sensitive; some hangs may be brief and unavoidable
2. **Analyze Patterns**: Look for specific views or operations causing most hangs
3. **Check Device Distribution**: Older devices may report more hangs
4. **Monitor System Conditions**: Low memory or low power mode can contribute to hangs

## Related Documentation

- [Performance Monitoring](../manual-instrumentation/performance-monitoring.md) - Manual performance instrumentation
- [Session Reporting](../getting-started/session-reporting.md) - Understanding session data
- [dSYM Upload](../getting-started/dsym-upload.md) - Symbolication setup
- [Configuration Options](../getting-started/configuration-options.md) - Complete SDK configuration
- [View Tracking](./view-uikit-tracking.md) - Correlate hangs with specific views
