---
title: Debugging Tips
description: Strategies for debugging and troubleshooting the Embrace iOS SDK 7.x
sidebar_position: 3
---

## Debugging Tips

The Embrace iOS SDK provides several tools and techniques to help you diagnose issues. This guide outlines best practices for debugging and troubleshooting when integrating or using the SDK.

### Enabling Verbose Logging

For debugging purposes, increase the log level during development to see detailed SDK operations:

```swift
let options = EmbraceIO.Options.withAppId(
    "YOUR_APP_ID",
    logLevel: .verbose // Set to verbose during development
)
```

The available log levels are:

- `.none`: No logs will be printed
- `.error`: Only error messages are printed
- `.warning`: Errors and warnings are printed
- `.info`: Errors, warnings, and basic info logs are printed
- `.debug`: Includes more detailed debugging information
- `.verbose`: Most verbose output, includes all logging

### Identifying SDK Initialization Issues

If you're experiencing issues with SDK initialization:

1. Check for errors during start:

```swift
do {
    try EmbraceIO.start(options: options)
} catch let error {
    print("Embrace SDK failed to initialize: \(error.localizedDescription)")
    // Log additional debug information
    print("Options used: \(String(describing: options))")
}
```

2. Verify your App ID is correct and that it matches your environment (development/production)

3. Check the console for any warnings or errors from the Embrace SDK

### Troubleshooting Network Issues

If you're not seeing network requests in your Embrace dashboard:

#### Verify Network Capture Service Configuration

```swift
// Make sure the URLSession capture service is enabled and not
// ignoring the URLs you're trying to debug
let services = CaptureServicesOptionsBuilder()
    .addDefaults()
    .addUrlSessionCaptureService(withOptions: URLSessionCaptureService.Options(
        ignoredURLs: [] // Capture all URLs during debugging
    ))
    .build()

let options = EmbraceIO.Options.withAppId(
    "YOUR_APP_ID",
    captureServices: services
)
```

#### Test with Curl or Network Debug Tools

Send a test network request that's easy to identify:

```swift
// In your test code
let testURL = URL(string: "https://httpbin.org/get?test=embrace_debug")!
let task = URLSession.shared.dataTask(with: testURL) { data, response, error in
    print("Test request completed: \(String(describing: response))")
}
task.resume()
```

Then check if this appears in your Embrace dashboard or logs.

### Verifying Session Tracking

If sessions aren't being tracked properly:

1. Check that session start/end events appear in logs:

```swift
// Enable verbose logging to see session events
try EmbraceIO.start(options: EmbraceIO.Options.withAppId(
    "YOUR_APP_ID",
    logLevel: .verbose
))
```

2. Force a new session for testing:

```swift
// For debugging only
// Ends the current user session and immediately starts a new one
EmbraceIO.shared.endUserSession()
```

### Debugging Custom Traces

If your custom traces aren't appearing:

1. Add more context to your spans to make them easier to identify:

```swift
let span = EmbraceIO.shared.createSpan(name: "debug_trace")
span?.setAttribute(key: "debug_id", value: UUID().uuidString)
span?.setAttribute(key: "timestamp", value: Date().timeIntervalSince1970)
// ... operations ...
span?.end()
```

2. Check for hierarchy issues (child spans must be created within parent spans):

```swift
let parentSpan = EmbraceIO.shared.createSpan(name: "parent_operation")

// Correct - child span is related to parent
let childSpan = EmbraceIO.shared.createSpan(name: "child_operation", parentSpan: parentSpan)
childSpan?.end()

parentSpan?.end()
```

### Testing Crash Reporting

To verify crash reporting is working correctly:

1. Implement a debug-only crash trigger:

```swift
#if DEBUG
func triggerTestCrash() {
    // Add a unique identifier to help identify this crash in the dashboard
    EmbraceIO.shared.setProperty(key: "test_crash_id", value: UUID().uuidString, lifespan: .session)

    // Force a crash
    let array: [Int] = []
    let _ = array[10] // This will crash with index out of bounds
}
#endif
```

2. Check that crash reports appear in your Embrace dashboard

3. Verify dSYM files are properly uploaded to symbolicate crashes

### Debugging View Tracking

If view controller tracking isn't working as expected:

1. Implement a custom view controller logger to verify tracking:

```swift
class DebugViewController: UIViewController {
    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        print("DebugVC appeared: \(self.description)")

        // Check if Embrace has the current view name
        if let vcName = EmbraceIO.shared.currentView {
            print("Embrace current view: \(vcName)")
        } else {
            print("Embrace current view: nil")
        }
    }
}
```

### Checking OpenTelemetry Export

If you're using OpenTelemetry export and not seeing data:

1. Add a debug exporter to verify data is being collected:

```swift
// Add a console exporter for debugging
let options = EmbraceIO.Options.withAppId(
    "YOUR_APP_ID",
    otel: EmbraceIO.OTelOptions(
        spanExporters: [ConsoleSpanExporter()],
        logExporters: [ConsoleLogRecordExporter()]
    )
)
```

### Using Xcode Debugger

Set breakpoints in your integration code to inspect the SDK's state:

1. Add symbolic breakpoints for key Embrace methods:
   - In Xcode, go to Breakpoint Navigator
   - Click '+' and select "Symbolic Breakpoint"
   - Enter Embrace method names like `Embrace.start` or `EmbraceClient.logMessage`

2. Use the debugger console to inspect SDK state:

```text
po EmbraceIO.shared.state
po EmbraceIO.shared.currentUserSessionId
```

### Investigating Memory Issues

If you suspect memory issues related to the SDK:

1. Use Instruments' Allocations tool to track memory usage
2. Look for retained cycles involving Embrace callbacks
3. Check for large objects being stored as attributes or in logs

```swift
// Bad practice - storing large objects
let largeObject = // ... some large object
EmbraceIO.shared.setProperty(key: "data", value: String(describing: largeObject), lifespan: .session)

// Better - store only identifiers or small summaries
EmbraceIO.shared.setProperty(key: "data_id", value: largeObject.id, lifespan: .session)
```

### Getting SDK Version and Status

You can check the SDK version and status programmatically:

```swift
// Print SDK version
if let sdkVersion = EmbraceIO.shared.sdkVersion {
    print("Embrace SDK Version: \(sdkVersion)")
}

// Check the SDK state
let state = EmbraceIO.shared.state
print("Embrace SDK state: \(state)")
```

### Summary

- Use verbose logging during development
- Implement proper error handling for setup and start
- Add debug attributes to traces, sessions, and logs
- Create test cases for key functionality
- Use Xcode debugging tools to inspect SDK state

By following these debugging tips, you can more quickly identify and resolve issues with the Embrace SDK integration.

<!-- TODO: Add information about reviewing debug logs in the Embrace dashboard  -->
