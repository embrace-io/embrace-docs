---
title: Basic Setup
description: Setting up the Embrace iOS SDK 6.x in your application
sidebar_position: 2
---

# Basic Setup

Unlike previous versions, Embrace's 6.x SDK does not use a `.plist` file to configure your application. Instead, the SDK is centered around and configured through the [`Embrace`](https://github.com/embrace-io/embrace-apple-sdk/blob/main/Sources/EmbraceCore/Embrace.swift) class.

The `Embrace` class is the main interface for the Embrace SDK. It provides methods to configure, start, and interact with the SDK. The SDK is configured using an [`Embrace.Options`](https://github.com/embrace-io/embrace-apple-sdk/blob/main/Sources/EmbraceCore/Options/Embrace%2BOptions.swift) instance passed in the setup static method.

## Prerequisites

Before setting up the SDK, you need:

- An Embrace App ID (obtained from the Embrace Dashboard)
- The SDK installed in your project ([see installation guide](/ios/6x/getting-started/installation.md))

## Initializing the Embrace Client

Embrace should be configured and started as close to the launch of the application as possible. Below is an example setup for a straightforward SwiftUI application:

```swift
import EmbraceIO
import SwiftUI

struct NewEmbraceApp: App {
    init() {
        do {
            try Embrace
                .setup(
                    options: Embrace.Options(
                        appId: "YOUR_APP_ID"  // Your App ID from Embrace Dashboard
                    )
                )
                .start()
        } catch let e {
            print("Error starting Embrace \(e.localizedDescription)")
        }
    }
}
```

### For UIKit Applications

For UIKit applications, initialize Embrace in your AppDelegate's `application(_:didFinishLaunchingWithOptions:)` method:

```swift
import EmbraceIO
import UIKit

@main
class AppDelegate: UIResponder, UIApplicationDelegate {
    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        do {
            try Embrace
                .setup(
                    options: Embrace.Options(
                        appId: "YOUR_APP_ID"  // Your App ID from Embrace Dashboard
                    )
                )
                .start()
        } catch let e {
            print("Error starting Embrace \(e.localizedDescription)")
        }

        return true
    }
}
```

## Configuration Options

The most commonly used options for SDK initialization include:

```swift
Embrace.Options(
    appId: "YOUR_APP_ID",         // Required for sending data to Embrace
    appGroupId: "group.your.id",  // Optional: for app extensions sharing data
    logLevel: .default,           // Controls SDK's console logging verbosity
    export: nil                   // Optional: for OpenTelemetry export
)
```

Available log levels include:
- `.none` - No logging
- `.trace`, `.debug`, `.info`, `.warning`, `.error` - Increasing levels of severity
- `.default` - Uses `.debug` in DEBUG builds, `.error` in RELEASE builds

For more advanced configuration options, see the [Configuration Options](/ios/6x/getting-started/configuration-options.md) page.

## Error Handling

Both the `.setup` and the `.start` methods can throw errors. While it's unlikely that the SDK fails during startup, it's possible in edge cases such as:

- No disk space is available for Embrace's data stores
- Data stores have been corrupted

You can handle errors with a `do-try-catch` statement as shown above, or use Swift's Optional try for silent failure:

```swift
// Optional try for silent failure
try? Embrace
    .setup(options: Embrace.Options(appId: "YOUR_APP_ID"))
    .start()

// Later in your code
// If setup failed, this will simply not create a span
let span = Embrace.client?.buildSpan(
    name: "user-action", 
    type: .performance
).startSpan()
// ...
span?.end()
```

## Accessing the Embrace Client

Once `setup` has succeeded, you can access the Embrace instance in two ways:

1. Store a reference from the setup call:

```swift
let embrace = try Embrace
    .setup(options: embraceOptions)
    .start()

// Later in your code
embrace.buildSpan(name: "my-operation", type: .performance).startSpan()
```

2. Use the static client property:

```swift
// After setup has been called
Embrace.client?.buildSpan(name: "my-operation", type: .performance).startSpan()
```

## Checking SDK Status

If you need to know whether the SDK has started successfully, you can access the status:

```swift
switch Embrace.client?.state {
case .started:
    // SDK is running
case .initialized:
    // SDK is initialized but not started
case .notInitialized, nil:
    // SDK failed to initialize or hasn't been initialized yet
}
```

> Note: The `started` property is deprecated. Use the `state` property instead which provides more detailed status information.

## Next Steps

After basic setup, you can:

- [Configure additional options](/ios/6x/getting-started/configuration-options.md) to customize the SDK's behavior
- Learn about [Sessions](/ios/6x/core-concepts/sessions.md) and how they track user activity
- Explore [Traces & Spans](/ios/6x/core-concepts/traces-spans.md) for performance monitoring
- Set up [automatic instrumentation](/ios/6x/automatic-instrumentation/index.md) for network monitoring and other features
