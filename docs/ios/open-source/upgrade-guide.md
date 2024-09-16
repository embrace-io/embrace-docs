---
title: Upgrade Guide
description: Upgrading from iOS 5x SDK to Apple 6x SDK
sidebar_position: 1
---

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

For more information about starting the SDK in-code, please read [The Embrace Client](/docs/ios/open-source/embrace-client.md). For more information on configuration options, please read [Configuring the SDK](/docs/ios/open-source/embrace-options.md).

## Moments have been replaced by Traces

[Moments](/docs/ios/5x/features/moments.md) have not been added to the Embrace Apple 6 SDK, and will not be available when upgrading from version 5 to version 6. We made this decision as part of our migration to build on top of OpenTelemetry APIs and to standardize the telemetry coming from our SDKs.

Luckily, [Performance Traces](/docs/ios/open-source/tracing.md) serve the same purposes as Moments, with greatly enhanced capabilities. Built on [OTel Spans](https://opentelemetry.io/docs/concepts/signals/traces/), Performance Traces capture end-to-end journeys made of multiple spans. Traces can contain many spans as "children", as well as attributes and events that offer flexibility on the client and numerous aggregation options on the backend. This instrumentation allows you trace an entire process by breaking it down into smaller units of work.

A span is simply an operation occurring over a period of time. Using spans, you can track how long operations within the app take, and more. Note that, in building on existing OTel APIs, the Embrace Apple SDK does not have instrumentation for an object called a "trace". Instead, a trace is the root span for a given workflow.

### Sample usage

Here is an example of how spans and traces replace and enhance the existing Moment feature:

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

<Tabs groupId="ios-language" queryString="ios-language">
<TabItem value="swift" label="Swift">

```swift
// Using Moments in Embrace iOS 5
Embrace.sharedInstance().startMoment(withName: "add-cart-item")
Embrace.sharedInstance().endMoment(withName: "add-cart-item")

// Using Traces in Embrace Apple 6
// First, unwrap the Embrace instance
guard let embraceInstance = Embrace.client else { return }
            

//Add a root span
let addCartParentSpan = embraceInstance
            .buildSpan(name: "add-to-cart")
            .markAsKeySpan() //makes the parent trace
            .startSpan()

// Add child spans
let addCartTapSpan = embraceInstance
            .buildSpan(name: "add-cart-tapped")
            .setParent(addCartParentSpan)
            .startSpan()

let addCartRequestSpan = embraceInstance
            .buildSpan(name: "add-cart-request")
            .setParent(addCartParentSpan)
            .startSpan()

let addCartUpdateUISpan = embraceInstance
            .buildSpan(name: "add-cart-update-ui")
            .setParent(addCartParentSpan)
            .startSpan()

//when tap event ends
addCartTapSpan.end()

//when network response is received
addCartRequestSpan.end()

//when the UI is updated and you've determined the add cart interaction is over
addCartUpdateUISpan.end()
addCartParentSpan.end()
```

</TabItem>
</Tabs>


Traces can be instrumented in the same places as your Moments, but provide much more.


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
| `.setUsername` | `.metadata.userName = "EmBot"` | | 
| `.clearUsername` | `.metadata.userName = nil` | | 
| `.setUserEmail` | `.metadata.userEmail = "embot@embrace.io"` | | 
| `.clearUserEmail` | `.metadata.userEmail = nil` | | 
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

## Features still to be migrated 

In upcoming minor versions, you can expect to see familiar features from the iOS 5 SDK. While these are useful and will remain in use, we chose to prioritize migration of important paradigms like Performance Tracing and Auto-instrumentation while building on OpenTelemetry signals. Some upcoming features include:

- Config Capabilities 
    - Remote config to disable network capture based on URL regexes
    - Local config to disable URLs to capture
    - Local config to disable webview capture
    - Local config to enable stripping of webview query params
- Manually instrumenting network requests
- Network body capture
- Extension Insights

