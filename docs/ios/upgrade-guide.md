---
title: Upgrade guide
description: Upgrading from iOS 5x SDK to Apple 6x SDK
sidebar_position: 7
---

# Upgrade guide

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

Luckily, [Performance Traces](/docs/ios/open-source/tracing.md) serve the same purposes as Moments, with greatly enhanced capabilities. Built on [OTel Spans](https://opentelemetry.io/docs/concepts/signals/traces/), Performance Traces capture end-to-end journeys made of multiple spans. Traces can contain many spans as "children", as well as attributes and events that off flexibility on the client and numerous aggregation options on the backend. This allows you trace an entire process by breaking it down into smaller units of work.

Traces can be instrumented in the same places as your Moments. For more information on the interface and options, please read [Migrating from Moments to Traces](/docs/ios//moments-to-tracing.md) guide.

## Replace deprecated method calls with new ones

Unless otherwise noted below, the Apple 6 SDK calls its methods on `Embrace.client` and iOS 5 SDK calls its methods on `Embrace.sharedInstance()`

| iOS 5 | Apple 6 | Comments |
|-|-|:-|
| `.isStarted`| `.started` | |
| `.startWithLaunchOptions` | `.setup(options)` and `.start()` | |
| `.getLastRunEndState` | Not yet available | |
| `.addSessionProperty` | `.metadata.addProperty(key:value:lifespan:)` | Adding a property to a session.|
| `.removeSessionProperty` | `.metadata.removeProperty(key:lifespan:)` | Remove a property to a session.|
| `.endSession` | `.endSession` | | 
| `.getCurrentSessionId` | `.currentSessionId()`| |
| `.logBreadcrumbWithMessage` | `.add(event)` or `.add(events)` | Breadcrumbs are SpanEvents |
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
| `.setUserPersona` | `.metadata.addPersonaTag(_ value:lifespan:)` | | 
| `.clearUserPersona` | `.metadata.removePersonaTag(value: lifespan:)` | | 
| `.clearAllUserPersonas` | `.metadata.removeAllPersonaTags(lifespans:)` ||
| `.getDeviceId` | `.currentDeviceId()` | | 

## Features that have been deprecated and removed

As noted above, Moments have been deprecated and are not available in Embrace Apple 6. Other deprecated features include:
- NSURLConnection capture
- Screenshots
- App disk usage (including free disk space and CPU "spike")

## Features still to be migrated 

In upcoming minor versions, you can expect to see familiar features from the iOS 5 SDK. While these are useful and will remain in use, we chose to prioritize migration of important paradigms like Performance Tracing and Auto-instrumentation while building on OpenTelemetry signals. Some upcoming features include:
- User Personas
- Push Notification Info
- Remote config to disable network capture based on URL regexes
- Local config to disable URLs to capture
- Local config to disable webview capture
- Local config to enable stripping of webview query params
- Manually instrumenting network requests
- Network body capture
- Set user as "payer"
