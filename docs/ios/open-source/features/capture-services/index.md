---
title: Capture Services
description: Learn about the automatic instrumentation provided by the Embrace SDK
sidebar_position: 1
---

# Capture Services

The Embrace Apple SDK provides several Capture Services that automatically capture data from your mobile application and transform it into OpenTelemetry signals. Depending on the specific activity being tracked, the automatic instrumentation might create OTel spans for the event, or might create OTel span events that attach to the [session span](/ios/open-source/#how-we-built-it).

These services are configured when initializing the Embrace Apple SDK, and you can also create your own custom services to add new automatic instrumentation.

See more [here](/ios/open-source/integration/customizing-signals/#extending-captureservices-to-add-your-own-instrumentation).

Here's the list of services the Embrace Apple SDK provides:

* [`URLSessionCaptureService`](/ios/open-source/features/capture-services/url-session.md): generates OpenTelemetry spans for network requests made through `URLSession`.
* [`TapCaptureService`](/ios/open-source/features/capture-services/tap.md): generates OpenTelemetry span events for taps on the screen.
* [`ViewCaptureService`](/ios/open-source/features/capture-services/ui-view-controller.md): generates OpenTelemetry spans that measure `UIViewControllers` load and render times.
* [`WebViewCaptureService`](/ios/open-source/features/capture-services/web-view.md): generates OpenTelemetry span events when a `WKWebView` loads an URL or throws an error.
- [`LowMemoryWarningCaptureService`](/ios/open-source/features/capture-services/low-memory.md): generates OpenTelemetry span events when the application receives a low memory warning.
- [`LowPowerModeCaptureService`](/ios/open-source/features/capture-services/low-power.md): generates OpenTelemetry spans when the phone is running in low power mode.
* [`PushNotificationCaptureService`](/ios/open-source/features/capture-services/push-notifications.md): Instrumentation for push notifications received by the app. This generates OpenTelemetry span events with certain push notification data attached.
