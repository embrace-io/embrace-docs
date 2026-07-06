---
title: Basic Setup
description: Setting up the Embrace iOS SDK 7.x in your application
sidebar_position: 2
---

## Basic Setup

Embrace's 7.x SDK does not use a `.plist` file to configure your application. Instead, the SDK is configured and started entirely in code through the [`EmbraceIO`](https://github.com/embrace-io/embrace-apple-sdk/blob/main/Sources/EmbraceIO/EmbraceIO.swift) class.

`EmbraceIO` is the single public interface for the Embrace SDK. Unlike 6.x — which exposed both an `EmbraceIO` convenience layer and a lower-level `Embrace` client — 7.x has one entry point. The SDK is configured and started in a single call using an [`EmbraceIO.Options`](https://github.com/embrace-io/embrace-apple-sdk/blob/main/Sources/EmbraceIO/Options/EmbraceIO%2BOptions.swift) instance.

### Prerequisites

Before setting up the SDK, you need:

- An Embrace App ID (obtained from the Embrace Dashboard)
- The SDK installed in your project ([see installation guide](/ios/7x/getting-started/installation.md))

### Initializing the Embrace SDK

Embrace should be configured and started as close to the launch of the application as possible. In 7.x, `EmbraceIO.start(options:)` configures and starts the SDK in one step — there is no separate `setup` call. Below is an example for a straightforward SwiftUI application:

```swift
import EmbraceIO
import SwiftUI

struct NewEmbraceApp: App {
    init() {
        do {
            try EmbraceIO.start(
                options: EmbraceIO.Options.withAppId(
                    "YOUR_APP_ID"  // Your App ID from Embrace Dashboard
                )
            )
        } catch let e {
            print("Error starting Embrace \(e.localizedDescription)")
        }
    }
}
```

#### For UIKit Applications

For UIKit applications, initialize Embrace in your AppDelegate's `application(_:didFinishLaunchingWithOptions:)` method:

```swift
import EmbraceIO
import UIKit

@main
class AppDelegate: UIResponder, UIApplicationDelegate {
    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        do {
            try EmbraceIO.start(
                options: EmbraceIO.Options.withAppId(
                    "YOUR_APP_ID"  // Your App ID from Embrace Dashboard
                )
            )
        } catch let e {
            print("Error starting Embrace \(e.localizedDescription)")
        }

        return true
    }
}
```

### Configuration Options

The most commonly used options for SDK initialization include:

```swift
EmbraceIO.Options.withAppId(
    "YOUR_APP_ID",            // Required for sending data to Embrace
    crashReporter: .embrace,  // .embrace (default), .crashlytics, or .none
    logLevel: .default,       // Controls SDK's console logging verbosity
    otel: nil                 // Optional: for OpenTelemetry export
)
```

Available log levels include:

- `.none` - No logging
- `.trace`, `.debug`, `.info`, `.warning`, `.error` - Increasing levels of severity
- `.default` - Uses `.debug` in DEBUG builds, `.error` in RELEASE builds

:::info Removed in 7.x
The `appGroupId` option has been removed. The `export` and `processors` options have been
replaced by the `otel` option, which takes an [`EmbraceIO.OTelOptions`](/ios/7x/advanced-features/opentelemetry-export.md).
:::

For more advanced configuration options, see the [Configuration Options](/ios/7x/getting-started/configuration-options.md) page.

### Error Handling

The `EmbraceIO.start(options:)` method can throw errors. While it's unlikely that the SDK fails during startup, it's possible in edge cases such as:

- No disk space is available for Embrace's data stores
- Data stores have been corrupted
- The SDK is started off the main thread, or with an invalid App ID

You can handle errors with a `do-try-catch` statement as shown above, or use Swift's optional try for silent failure:

```swift
// Optional try for silent failure
try? EmbraceIO.start(options: EmbraceIO.Options.withAppId("YOUR_APP_ID"))

// Later in your code
// If startup failed, this will simply not create a span
let span = EmbraceIO.shared.createSpan(
    name: "user-action",
    type: .performance
)
// ...
span?.end()
```

### Accessing the Embrace SDK

`EmbraceIO.start(options:)` is a static call. After it succeeds, use the shared instance to interact with the SDK:

```swift
// After start has been called
EmbraceIO.shared.createSpan(name: "my-operation", type: .performance)
```

### Checking SDK Status

If you need to know whether the SDK has started successfully, you can access the state:

```swift
switch EmbraceIO.shared.state {
case .started:
    // SDK is running
case .initialized:
    // SDK is initialized but not started
case .notInitialized:
    // SDK failed to initialize or hasn't been initialized yet
default:
    break
}
```

You can also check `EmbraceIO.shared.isSDKEnabled` to see whether the SDK is started and has not been disabled through remote configuration.

### Next Steps

After basic setup, you can:

- [Configure additional options](/ios/7x/getting-started/configuration-options.md) to customize the SDK's behavior
- Learn about [Sessions](/ios/7x/core-concepts/sessions.md) and how they track user activity
- Explore [Traces & Spans](/ios/7x/core-concepts/traces-spans.md) for performance monitoring
- Set up [automatic instrumentation](/ios/7x/automatic-instrumentation/index.md) for network monitoring and other features
