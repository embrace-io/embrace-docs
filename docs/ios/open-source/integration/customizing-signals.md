---
title: Customizing Signals
description: Customize the Signals You Receive From Embrace
sidebar_position: 4
---

# Customize the Signals You Receive From Embrace

The Embrace Apple SDK is built to provide automatic instrumentation for the most important mobile signals, right out of the box. However, it is possible to customize the signals that you receive when you [set up](/ios/open-source/integration/embrace-options.md) the SDK.

## Automatic Signals

With the [convenience initializer](/ios/open-source/integration/embrace-options/#configuration-options) provided for initial setup, the SDK adds a default set of [CaptureServices](https://github.com/embrace-io/embrace-apple-sdk/blob/main/Sources/EmbraceCaptureService/CaptureService.swift) objects that instrument the app automatically. Each service is an extension of that base class, and so each service is instrumented to capture its signals and map them to OpenTelemetry spans.

The services pre-configured by default in the [CaptureServiceBuilder](https://github.com/embrace-io/embrace-apple-sdk/blob/main/Sources/EmbraceIO/Capture/CaptureServiceBuilder.swift#L42) are:

- `URLSessionCaptureService`: generates OpenTelemetry spans for network requests that use `URLSession`.
- `TapCaptureService`: generates OpenTelemetry span events for taps on the screen.
- `ViewCaptureService`: generates OpenTelemtry spans for `UIViewControllers`.
- `WebViewCaptureService`: generates OpenTelemetry span events when a `WKWebView` loads an URL or throws an error.
- `LowMemoryWarningCaptureService`: generates OpenTelemetry span events when the application receives a low memory warning.
- `LowPowerModeCaptureService`: generates OpenTelemetry spans when the phone is running in low power mode.

## Customizing the Signals You Receive

If you wish to add, remove, or change the CaptureServices that your SDK will make use of, you should explicitly add only the services that you want when initializing the SDK. When setting up the SDK using `Embrace.Options`, use the [`CaptureServiceBuilder`](https://github.com/embrace-io/embrace-apple-sdk/blob/main/Sources/EmbraceIO/Capture/CaptureServiceBuilder.swift) object to specify the services that you want before building the object:

```swift
// in your App init, specify the CaptureServices
// Here, we add only the `URLSessionCaptureService`, `TapCaptureService`, and `ViewCaptureService`
let services = CaptureServiceBuilder()
    .add(.urlSession())
    .add(.tap())
    .add(.view())
    .build()

// then, initialize the SDK with these specified services

try Embrace
    .setup(
        options: Embrace.Options(
            appId: "APPID",
            captureServices: services
            //...other optiosn
        )
    )
    .start()
```

## Extending `CaptureServices` to Add Your Own Instrumentation

In addition to customizing the automatic instrumentation your app will receive from the SDK, you can add your own sets of signals that you wish to automatically extend. Adding your category of "automatic" signals extends the base class [CaptureServices](https://github.com/embrace-io/embrace-apple-sdk/blob/main/Sources/EmbraceCaptureService/CaptureService.swift) for whatever purposes you might need. After testing, you can then initialize your CaptureService with the others provided by Embrace.

As a simple example, if you wished to automatically capture when a screenshot was taken in the app, you could extend the base CaptureService to add a span event to respond to the `UIApplication`'s `userDidTakeScreenshotNotification` notification.

```swift
public class ScreenshotCaptureService: CaptureService {

    public var onScreenshotCaptured: (() -> Void)?

    @ThreadSafe var started = false

    deinit {
        NotificationCenter.default.removeObserver(self)
    }

    public override func onInstall() {
        NotificationCenter.default.addObserver(
            self,
            selector: #selector(didTakeScreenshot),
            name: NSNotification.Name.userDidTakeScreenshotNotification,
            object: nil
        )
    }

    @objc func didTakeScreenshot(notification: Notification) {
        guard state == .active else {
            return
        }

        let event = RecordingSpanEvent(
            name: MySemantics.ScreenshotTaken.name,
            timestamp: Date(),
            attributes: [
                MySemantics.keyEmbraceType: .string(MySemantics.screenshotTaken.rawValue)
            ]
        )

        if add(event: event) {
            onScreenshotCaptured?()
        }
    }
}
```

Additional configuration, especially to the [session span](/ios/open-source/#how-we-built-it), would be necessary to make this CaptureService useful, but you can see here how intuitive it is to add your own automatic instrumentation. 

Consider opening a pull request on the SDK's [GitHub repository](https://github.com/embrace-io/embrace-apple-sdk/) with any instrumentation you've found useful!
