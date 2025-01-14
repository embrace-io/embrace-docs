---
title: TapCaptureService
description: Learn about how to instrument taps in your app.
sidebar_position: 2
---

# Tap Capture Service

The `TapCaptureService` captures screen taps in your app and generates OpenTelemetry span events when a `UITouch` event is triggered on a `UIView`.

You can pass a custom `TapCaptureService.Options` instance when initializing the service to configure it.

### Ignoring specific views

You can prevent the Embrace Apple SDK to capture taps on specific views by using the `TapCaptureService.Options.ignoredViewTypes` array.

Any `UITouch` with a target view which type is included in `ignoredViewTypes` will be ignored by the service.

:::info
Some system managed views (like the keyboard) are ignored by default.
:::

### Capture tap coordinates

The span events generated by this service contain the tap coordinates by default.

You can disable this by setting `TapCaptureService.Options.captureTapCoordinates` to false.

### TapCaptureServiceDelegate

You can set a custom `TapCaptureServiceDelegate` to `TapCaptureService.Options.delegate`.

This protocol allows you to define if a tap should be captured (or if its coordinates should be captured) on demand.

Example:

```swift
class MyCustomView: UIView {

}

// this delegate will only allow the Embrace Apple SDK to capture taps done on views
// of the type `MyCustomView`.
class MyTapCaptureServiceDelegate: TapCaptureServiceDelegate {
    func shouldCaptureTap(onView: UIView) -> Bool {
        return onView is MyCustomView
    }

    func shouldCaptureTapCoordinates(onView: UIView) -> Bool {
        return onView is MyCustomView
    }
}