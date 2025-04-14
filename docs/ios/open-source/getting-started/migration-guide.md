---
title: Migration Guide
description: Upgrading from iOS 5.x SDK to iOS 6.x SDK
sidebar_position: 4
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Migration Guide: 5.x to 6.x

This guide will help you transition from the Embrace iOS 5.x SDK to the new 6.x SDK. The 6.x SDK is our open-source implementation built on OpenTelemetry, providing enhanced functionality and modern Swift support.

## Key Changes Summary

- SDK initialization and configuration is now done in code (not .plist files)
- Moments have been replaced by Traces (based on OpenTelemetry spans)
- Several API methods have been deprecated and replaced
- Some features have been removed or changed significantly
- Architecture is now based on OpenTelemetry primitives

## SDK Initialization Changes

As of version 6.0.0, Embrace Apple SDK no longer uses a .plist file to hold configuration. Instead, you set up the SDK in your code.

Initialize the SDK as close as possible to the launch of your app, using the Embrace client with an `Embrace.Options` object:

```swift
import EmbraceIO
import SwiftUI

struct NewEmbraceApp: App {
    init() {
        do {
            try Embrace
                .setup(
                    options: Embrace.Options(
                        appId: "12345"
                        logLevel: .default,
                        crashReporter: EmbraceCrashReporter(),
                        // Other configuration options
                    )
                )
                .start()
        } catch let e {
            print("Error starting Embrace \(e.localizedDescription)")
        }
    }
}
```

For more information, see:
- [Basic Setup](/ios/open-source/getting-started/basic-setup.md)
- [Configuration Options](/ios/open-source/getting-started/configuration-options.md)

## Moments to Traces Transition

Moments have been replaced by Traces in the 6.x SDK. This change is part of our migration to build on top of OpenTelemetry APIs and standardize telemetry.

Traces, built on [OTel Spans](https://opentelemetry.io/docs/concepts/signals/traces/), provide enhanced capabilities:
- They capture end-to-end journeys composed of multiple spans
- Traces can contain many spans as "children"
- They support attributes and events for flexibility and aggregation
- A trace is effectively the root span for a given workflow

### Migration Examples

<Tabs groupId="ios-language" queryString="ios-language">
<TabItem value="swift" label="Swift">

```swift
/* ******************************* */
// Using Moments in Embrace 5.X
Embrace.sharedInstance().startMoment(withName: "add-cart-item")
// Perform add cart logic
Embrace.sharedInstance().endMoment(withName: "add-cart-item")

/* ******************************* */
// Using Traces in Embrace 6.X (shorthand)
Embrace.recordSpan(name: "add-cart-item") { span in
    // perform add cart logic
}

/* ******************************* */
// Using Traces in Embrace 6.x (full)
let span = Embrace.client?.buildSpan(name: "add-cart-item")
                .startSpan()
// Perform add cart logic
span?.end()
```

</TabItem>
</Tabs>

Traces can be extended with parent/child relationships and point-in-time "SpanEvents":

<Tabs groupId="ios-language" queryString="ios-language">
<TabItem value="swift" label="Swift">

```swift
/* ******************************* */
// Tracing in Embrace 6.x
// Create root span
let addCartSpan = Embrace.client?.buildSpan(name: "add-cart-item")
                .startSpan()


// Add SpanEvent
addCartSpan?.addEvent(name: "quantity-changed")

// Add child Span
let addCartUIUpdateSpan = Embrace.client?.buildSpan(name: "add-cart-ui-update")
                            .setParent(addCartSpan)
                            .startSpan()
// Perform UI update logic
addCartUIUpdateSpan.end()

// Perform other add-cart-item logic
addCartSpan?.end()
```

</TabItem>
</Tabs>

To store a Span in object scope, you need to import the OpenTelemetry API:

<Tabs groupId="ios-language" queryString="ios-language">
<TabItem value="swift" label="Swift">

```swift
/* ******************************* */
// Imports for new object
import Foundation
import EmbraceIO
import OpenTelemetryApi

// New object definition
class MyClass {
    
    // Create a Span property that will be available across the object
    var activitySpan: Span? = nil // Span here comes from `OpenTelemetryApi`, not `EmbraceIO`

    func activityStart() {
        // Something starts
        // ...
        // And we want to trace it
        activitySpan = Embrace.client?.buildSpan(name: "activity")
                .startSpan()
    }

    func activityChanged() {
        // Something changed
        // ...
        // And we want to note it
        activitySpan?.addEvent(name: "activity-changed")
    }

    func activitySuccessfully() {
        // Something ended
        // ...
        activitySpan?.end()
    }

    func activityEnded(with failure: EmbraceIO.ErrorCode) {
        // Something ended unsuccessfully
        // ...
        activitySpan?.end(errorCode: failure)
    }
}
```

</TabItem>
</Tabs>

### App Startup Changes

The `endAppStartup` Moment from prior versions has been **removed** in 6.x. Instead, measure app startup using a **custom trace**.

This allows for more flexibility and accuracy, as traces can incorporate signals from both native lifecycle events and third-party libraries.

To track app startup, create a trace with child spans that capture key moments in your app's initialization. You can even measure events that occurred before the Embrace SDK initialized by using timestamps.

Embrace also automatically records a span called **`emb-setup`**, which measures the time it takes for the SDK itself to launch.

## API Method Changes

Many methods from the 5.x SDK have been replaced with new equivalents in 6.x:

| 5.x Method | 6.x Equivalent |
|------------|----------------|
| `Embrace.sharedInstance()` | `Embrace.client` |
| `startMoment()` / `endMoment()` | `buildSpan().startSpan()` / `span.end()` |
| `logMessage()` | `Embrace.client?.logMessage()` |
| `setUserIdentifier()` | `Embrace.client?.setUserIdentifier()` |
| `setUsername()` | `Embrace.client?.setUsername()` |
| `setUserEmail()` | `Embrace.client?.setUserEmail()` |
| `setUserAsPayer()` | `Embrace.client?.setUserAsPayer()` |
| `clearUserEmail()` / `clearUsername()` | `Embrace.client?.clearUserEmail()` / `clearUsername()` |
| `clearAllUserPersonas()` | `Embrace.client?.clearAllUserPersonas()` |
| `endAppStartup()` | Create a custom trace/span (see above) |

## Next Steps

After migrating to the 6.x SDK, we recommend:

1. Review the [Core Concepts](/ios/open-source/core-concepts/sessions.md) documentation to understand the new architecture
2. Explore the new [Automatic Instrumentation](/ios/open-source/automatic-instrumentation/network-monitoring.md) capabilities
3. Learn about [Manual Instrumentation](/ios/open-source/manual-instrumentation/custom-traces.md) for custom traces and logs

## Need Help?

If you encounter issues during migration, please reach out on the [community slack](https://community.embrace.io) or email [support@embrace.com](mailto:support@embrace.com). 