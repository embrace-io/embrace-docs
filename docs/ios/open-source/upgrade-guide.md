---
title: Upgrade Guide
description: Upgrading from iOS 5x SDK to Apple 6x SDK
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Upgrade Guide

## Upgrading from iOS 5x SDK to Apple 6x SDK

:::info Summary
- Embrace Apple SDK is now configured in your code
- Moments have been replaced by Traces
- Replace deprecated method calls with new ones
- Some features have been deprecated and removed
- Some features still have to be migrated
:::

## SDK initialization and configuration is triggered in-code

As of version 6.0.0, Embrace Apple SDK no longer uses a .plist file to hold Embrace-specific configuration. Instead, you should set up the SDK in your code.

As close as possible to the launch of your app, you should initialize the SDK with the Embrace client. The various configuration options for the Embrace Apple SDK are set using an [`Embrace.Options`](https://github.com/embrace-io/embrace-apple-sdk/blob/main/Sources/EmbraceCore/Options/Embrace%2BOptions.swift) object that you can tailor to your needs.

Here is example SwiftUI App object in which the SDK is configured, and then started:

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

For more information about starting the SDK in-code, please read [The Embrace Client](/ios/open-source/integration/embrace-client.md). For more information on configuration options, please read [Configuring the SDK](/docs/ios/open-source/integration/embrace-options.md).

## Moments have been replaced by Traces

[Moments](/docs/ios/5x/features/moments.md) have not been added to the Embrace Apple 6 SDK, and will not be available when upgrading from version 5 to version 6. We made this decision as part of our migration to build on top of OpenTelemetry APIs and to standardize the telemetry coming from our SDKs.

Luckily, [Traces](/docs/ios/open-source/features/traces.md) serve the same purposes as Moments, with greatly enhanced capabilities. Built on [OTel Spans](https://opentelemetry.io/docs/concepts/signals/traces/), Traces capture end-to-end journeys made of multiple spans. Traces can contain many spans as "children", as well as attributes and events that offer flexibility on the client and numerous aggregation options on the backend. This instrumentation allows you trace an entire process by breaking it down into smaller units of work.

A span is simply an operation occurring over a period of time. Using spans, you can track how long operations within the app take, and more. Note that, in building on existing OTel APIs, the Embrace Apple SDK does not have instrumentation for an object called a "trace". Instead, a trace is the root span for a given workflow.

### Sample usage

Here is an example of how spans and traces replace and enhance the existing Moment feature:

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

Traces can be instrumented in the same places as your Moments. The benefit of Tracing is you can extend a Span by adding parent/child relationships or by adding specific point-in-time "SpanEvents".

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

### Startup Moment

We are working on a replacement for the `endAppStartup` Moment from prior versions, creating a trace-based measurement that will make better use of the device and system's signals. The prior implementation left much to be desired, and using OTel tracing will allow us to combine signals from libraries, both native and third-party, to more-accurately model the startup activity in apps.

If you wish to create your own version of the `endAppStartup` Moment, you can create a trace with child spans that measure various parts of the app's initialization.

Measuring startup can be infinitely customizable, as you can add spans encapsulating native lifecycle events, any 3rd-party framework starts, and other factors that affect time prior to a user's ability to interact with the app. Using timestamps and a [span record](/ios/open-source/features/traces/#recording-a-completed-span), you can even measure events that occurred before the Embrace SDK. Additionally, Embrace's SDK creates a span `emb-setup` that measures the time for Embrace itself to launch.

## Replace deprecated method calls with new ones

Unless otherwise noted below, the Apple 6 SDK calls its methods on `Embrace.client` and iOS 5 SDK calls its methods on `Embrace.sharedInstance()`

| iOS 5 | Apple 6 | Comments |
|-|-|:-|
| `.isStarted`| `.started` | |
| `.startWithLaunchOptions` | `.setup(options)` and `.start()` | |
| `.getLastRunEndState` | `.lastRunEndState()` | |
| `.addSessionProperty` | `.metadata.addProperty(key:value:lifespan:)` | Adding a property to a session.|
| `.removeSessionProperty` | `.metadata.removeProperty(key:lifespan:)` | Remove a property to a session.|
| `.endSession` | `.endSession` | |
| `.getCurrentSessionId` | `.currentSessionId()`| |
| `.logBreadcrumbWithMessage("this is a crumb")` | `add(event: .breadcrumb("this is a crumb"))` | Breadcrumbs are now SpanEvents on the Session Span |
| `.startSpanWithName` | `.buildSpan(name:type:attributes:)` and `.startSpan()` | |
| `.stopSpanWithId` | `.buildSpan(name:type:attributes:)` and `.endSpan()` | |
| `.addSpanEventToSpanId` | `.addEvent(name:)` on existing Span | |
| `.addSpanAttributesToSpanId` | `.setAttribute(key:value:)` on existing Span | |
| `.recordCompletedSpanWithName` | `.recordSpan<T>(name:type:attributes:, spanOperation)` | |
| `.logMessage` | `.log(_ message:severity:timestamp:attributes:)` | |
| `.logNetworkRequest` | Not yet available | |
| `.setUserIdentifier` | `.metadata.userIdentifier = "jk12345lol"` | |
| `.clearUserIdentifier` | `.metadata.userIdentifier = nil` | |
| `.setUserPersona` | `.metadata.add(persona:lifespan:)` | |
| `.setUserAsPayer` | `.metadata.add(persona:lifespan:)` | There're a set of already exposed `PersonaTag` like `.payer`|
| `.clearUserPersona` | `.metadata.removePersonaTag(value: lifespan:)` | |
| `.clearUserAsPayer` | `.metadata.removePersonaTag(value: lifespan:)` |There're a set of already exposed `PersonaTag` like `.payer`|
| `.clearAllUserPersonas` | `.metadata.removeAllPersonaTags(lifespans:)` ||
| `.getDeviceId` | `.currentDeviceId()` | |

## Features that have been deprecated and removed

As noted above, Moments have been deprecated and are not available in Embrace Apple 6. Other deprecated features include:
- NSURLConnection capture
- Screenshots
- App disk usage (including free disk space and CPU "spike")
- `.startView` and `.endView` have been removed. Use spans with the SpanType `.ux` to record information about your view lifecycles
- Extension Insights
