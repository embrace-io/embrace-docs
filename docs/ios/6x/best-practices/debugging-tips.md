---
title: Debugging Tips
description: Strategies for debugging and troubleshooting the Embrace iOS SDK 6.x
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Debugging Tips

The Embrace iOS SDK provides several tools and techniques to help you diagnose issues. This guide outlines best practices for debugging and troubleshooting when integrating or using the SDK.

## Enabling Verbose Logging

For debugging purposes, increase the log level during development to see detailed SDK operations:

<Tabs groupId="embrace-client">
<TabItem value="embraceio" label="EmbraceIO" default>

```swift
let options = EmbraceIO.Options.withAppId(
    "YOUR_APP_ID",
    logLevel: .verbose // Set to verbose during development
)
```

</TabItem>
<TabItem value="embrace" label="Embrace">

```swift
let options = Embrace.Options(
    appId: "YOUR_APP_ID",
    logLevel: .verbose // Set to verbose during development
)
```

</TabItem>
</Tabs>

The available log levels are:

- `.none`: No logs will be printed
- `.error`: Only error messages are printed
- `.warning`: Errors and warnings are printed
- `.info`: Errors, warnings, and basic info logs are printed
- `.debug`: Includes more detailed debugging information
- `.verbose`: Most verbose output, includes all logging

## Identifying SDK Initialization Issues

If you're experiencing issues with SDK initialization:

1. Check for errors during setup and start:

<Tabs groupId="embrace-client">
<TabItem value="embraceio" label="EmbraceIO" default>

```swift
do {
    try EmbraceIO
        .setup(options: options)
    try EmbraceIO.shared.start()
} catch let error {
    print("Embrace SDK failed to initialize: \(error.localizedDescription)")
    // Log additional debug information
    print("Options used: \(String(describing: options))")
}
```

</TabItem>
<TabItem value="embrace" label="Embrace">

```swift
do {
    try Embrace
        .setup(options: options)
        .start()
} catch let error {
    print("Embrace SDK failed to initialize: \(error.localizedDescription)")
    // Log additional debug information
    print("Options used: \(String(describing: options))")
}
```

</TabItem>
</Tabs>

2. Verify your App ID is correct and that it matches your environment (development/production)

3. Check the console for any warnings or errors from the Embrace SDK

## Troubleshooting Network Issues

If you're not seeing network requests in your Embrace dashboard:

### Verify Network Capture Service Configuration

<Tabs groupId="embrace-client">
<TabItem value="embraceio" label="EmbraceIO" default>

```swift
// Make sure the network capture service is enabled
let options = EmbraceIO.Options.withAppId(
    "YOUR_APP_ID",
    enabledCaptureServices: [
        .networkCaptureService,
        // other services...
    ]
)

// Check if network options are correctly configured
let networkOptions = NetworkCaptureServiceOptions(
    urlPredicate: { url in
        // Add debug print to see what's being evaluated
        print("Embrace evaluating URL: \(url)")
        return true // Capture all during debugging
    }
)
```

</TabItem>
<TabItem value="embrace" label="Embrace">

```swift
// Make sure the network capture service is enabled
let options = Embrace.Options(
    appId: "YOUR_APP_ID",
    enabledCaptureServices: [
        .networkCaptureService,
        // other services...
    ]
)

// Check if network options are correctly configured
let networkOptions = NetworkCaptureServiceOptions(
    urlPredicate: { url in
        // Add debug print to see what's being evaluated
        print("Embrace evaluating URL: \(url)")
        return true // Capture all during debugging
    }
)
```

</TabItem>
</Tabs>

### Test with Curl or Network Debug Tools

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

## Verifying Session Tracking

If sessions aren't being tracked properly:

1. Check that session start/end events appear in logs:

<Tabs groupId="embrace-client">
<TabItem value="embraceio" label="EmbraceIO" default>

```swift
// Enable verbose logging to see session events
try EmbraceIO.setup(options: EmbraceIO.Options.withAppId(
    "YOUR_APP_ID",
    logLevel: .verbose
))
```

</TabItem>
<TabItem value="embrace" label="Embrace">

```swift
// Enable verbose logging to see session events
Embrace.setup(options: Embrace.Options(
    appId: "YOUR_APP_ID",
    logLevel: .verbose
))
```

</TabItem>
</Tabs>

2. Force a new session for testing:

<Tabs groupId="embrace-client">
<TabItem value="embraceio" label="EmbraceIO" default>

```swift
// For debugging only
EmbraceIO.shared.endCurrentSession()
EmbraceIO.shared.startNewSession()
```

</TabItem>
<TabItem value="embrace" label="Embrace">

```swift
// For debugging only
Embrace.client.endSession()
Embrace.client.startSession()
```

</TabItem>
</Tabs>

## Debugging Custom Traces

If your custom traces aren't appearing:

1. Add more context to your spans to make them easier to identify:

<Tabs groupId="embrace-client">
<TabItem value="embraceio" label="EmbraceIO" default>

```swift
let span = EmbraceIO.shared.buildSpan(name: "debug_trace").startSpan()
span.setAttribute(key: "debug_id", value: UUID().uuidString)
span.setAttribute(key: "timestamp", value: Date().timeIntervalSince1970)
// ... operations ...
span.end()
```

</TabItem>
<TabItem value="embrace" label="Embrace">

```swift
let span = Embrace.client.startSpan(name: "debug_trace")
span.setAttribute(key: "debug_id", value: UUID().uuidString)
span.setAttribute(key: "timestamp", value: Date().timeIntervalSince1970)
// ... operations ...
span.end()
```

</TabItem>
</Tabs>

2. Check for hierarchy issues (child spans must be created within parent spans):

<Tabs groupId="embrace-client">
<TabItem value="embraceio" label="EmbraceIO" default>

```swift
let parentSpan = EmbraceIO.shared.buildSpan(name: "parent_operation").startSpan()

// Correct - child span is related to parent
let childSpan = EmbraceIO.shared.buildSpan(name: "child_operation")
    .setParent(parentSpan)
    .startSpan()
childSpan.end()

parentSpan.end()
```

</TabItem>
<TabItem value="embrace" label="Embrace">

```swift
let parentSpan = Embrace.client.startSpan(name: "parent_operation")

// Correct - child span is related to parent
let childSpan = Embrace.client.startSpan(name: "child_operation", parent: parentSpan)
childSpan.end()

parentSpan.end()
```

</TabItem>
</Tabs>

## Testing Crash Reporting

To verify crash reporting is working correctly:

1. Implement a debug-only crash trigger:

<Tabs groupId="embrace-client">
<TabItem value="embraceio" label="EmbraceIO" default>

```swift
#if DEBUG
func triggerTestCrash() {
    // Add a unique identifier to help identify this crash in the dashboard
    try? EmbraceIO.shared.setProperty(key: "test_crash_id", value: UUID().uuidString, lifespan: .session)

    // Force a crash
    let array: [Int] = []
    let _ = array[10] // This will crash with index out of bounds
}
#endif
```

</TabItem>
<TabItem value="embrace" label="Embrace">

```swift
#if DEBUG
func triggerTestCrash() {
    // Add a unique identifier to help identify this crash in the dashboard
    Embrace.client.addSessionAttribute(key: "test_crash_id", value: UUID().uuidString)

    // Force a crash
    let array: [Int] = []
    let _ = array[10] // This will crash with index out of bounds
}
#endif
```

</TabItem>
</Tabs>

2. Check that crash reports appear in your Embrace dashboard

3. Verify dSYM files are properly uploaded to symbolicate crashes

## Debugging View Tracking

If view controller tracking isn't working as expected:

1. Implement a custom view controller logger to verify tracking:

<Tabs groupId="embrace-client">
<TabItem value="embraceio" label="EmbraceIO" default>

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

</TabItem>
<TabItem value="embrace" label="Embrace">

```swift
class DebugViewController: UIViewController {
    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        print("DebugVC appeared: \(self.description)")

        // Check if Embrace has the current view name
        if let vcName = Embrace.client.currentView {
            print("Embrace current view: \(vcName)")
        } else {
            print("Embrace current view: nil")
        }
    }
}
```

</TabItem>
</Tabs>

## Checking OpenTelemetry Export

If you're using OpenTelemetry export and not seeing data:

1. Add a debug exporter to verify data is being collected:

<Tabs groupId="embrace-client">
<TabItem value="embraceio" label="EmbraceIO" default>

```swift
// Add a console exporter for debugging
let consoleExporter = OpenTelemetryExporterOptions(
    spanExporter: ConsoleSpanExporter(),
    logRecordExporter: ConsoleLogRecordExporter()
)

let options = EmbraceIO.Options.withAppId(
    "YOUR_APP_ID",
    openTelemetryExporterOptions: consoleExporter
)
```

</TabItem>
<TabItem value="embrace" label="Embrace">

```swift
// Add a console exporter for debugging
let consoleExporter = OpenTelemetryExporterOptions(
    spanExporter: ConsoleSpanExporter(),
    logRecordExporter: ConsoleLogRecordExporter()
)

let options = Embrace.Options(
    appId: "YOUR_APP_ID",
    openTelemetryExporterOptions: consoleExporter
)
```

</TabItem>
</Tabs>

## Using Xcode Debugger

Set breakpoints in your integration code to inspect the SDK's state:

1. Add symbolic breakpoints for key Embrace methods:
   - In Xcode, go to Breakpoint Navigator
   - Click '+' and select "Symbolic Breakpoint"
   - Enter Embrace method names like `Embrace.start` or `EmbraceClient.logMessage`

2. Use the debugger console to inspect SDK state:

<Tabs groupId="embrace-client">
<TabItem value="embraceio" label="EmbraceIO" default>

```text
po EmbraceIO.shared.isStarted
po EmbraceIO.shared.currentSessionId
```

</TabItem>
<TabItem value="embrace" label="Embrace">

```text
po Embrace.client.isStarted
po Embrace.client.currentSessionId
```

</TabItem>
</Tabs>

## Investigating Memory Issues

If you suspect memory issues related to the SDK:

1. Use Instruments' Allocations tool to track memory usage
2. Look for retained cycles involving Embrace callbacks
3. Check for large objects being stored as attributes or in logs

<Tabs groupId="embrace-client">
<TabItem value="embraceio" label="EmbraceIO" default>

```swift
// Bad practice - storing large objects
let largeObject = // ... some large object
try? EmbraceIO.shared.setProperty(key: "data", value: String(describing: largeObject), lifespan: .session)

// Better - store only identifiers or small summaries
try? EmbraceIO.shared.setProperty(key: "data_id", value: largeObject.id, lifespan: .session)
```

</TabItem>
<TabItem value="embrace" label="Embrace">

```swift
// Bad practice - storing large objects
let largeObject = // ... some large object
Embrace.client.addSessionAttribute(key: "data", value: String(describing: largeObject))

// Better - store only identifiers or small summaries
Embrace.client.addSessionAttribute(key: "data_id", value: largeObject.id)
```

</TabItem>
</Tabs>

## Getting SDK Version and Status

You can check the SDK version and status programmatically:

<Tabs groupId="embrace-client">
<TabItem value="embraceio" label="EmbraceIO" default>

```swift
// Print SDK version
if let sdkVersion = EmbraceIO.shared.sdkVersion {
    print("Embrace SDK Version: \(sdkVersion)")
}

// Check if SDK is started
let isStarted = EmbraceIO.shared.isStarted
print("Embrace SDK started: \(isStarted)")
```

</TabItem>
<TabItem value="embrace" label="Embrace">

```swift
// Print SDK version
if let sdkVersion = Embrace.client.sdkVersion {
    print("Embrace SDK Version: \(sdkVersion)")
}

// Check if SDK is started
let isStarted = Embrace.client.isStarted
print("Embrace SDK started: \(isStarted)")
```

</TabItem>
</Tabs>

## Summary

- Use verbose logging during development
- Implement proper error handling for setup and start
- Add debug attributes to traces, sessions, and logs
- Create test cases for key functionality
- Use Xcode debugging tools to inspect SDK state

By following these debugging tips, you can more quickly identify and resolve issues with the Embrace SDK integration.

<!-- TODO: Add information about reviewing debug logs in the Embrace dashboard  -->
