---
title: Capture Services
description: Reference documentation for Embrace SDK's automatic instrumentation services
sidebar_position: 4
---

# Capture Services

Capture Services are core components of the Embrace SDK that provide automatic instrumentation of your application. Each service focuses on capturing specific types of data and events.

## Available Capture Services

The SDK includes the following built-in capture services:

1. **NetworkCaptureService** - Captures HTTP/HTTPS network requests and responses
2. **ViewCaptureService** - Tracks UIViewController lifecycle and performance
3. **TapCaptureService** - Records user interaction with your app's interface
4. **WebViewCaptureService** - Monitors WKWebView performance and errors
5. **LowMemoryWarningCaptureService** - Detects low memory warnings
6. **LowPowerModeCaptureService** - Tracks low power mode
7. **PushNotificationCaptureService** - Captures push notification events

## NetworkCaptureService

Captures network requests and responses to provide visibility into API performance, error rates, and data transfer volumes.

### Options

```swift
struct NetworkCaptureServiceOptions {
    init(
        captureRequestHeaders: Bool = true,
        captureResponseHeaders: Bool = true,
        captureBodies: NetworkBodyCaptureOptions = .none,
        urlPatternBlocklist: [String] = [],
        headerKeys: HeaderFilterKeys = .init(),
        requestHeaderFilter: ((URLRequest) -> [String: String]?)? = nil,
        responseHeaderFilter: ((URLResponse) -> [String: String]?)? = nil,
        requestBodyCapturePredicate: ((URLRequest, Data?) -> Bool)? = nil,
        responseBodyCapturePredicate: ((URLRequest, URLResponse?, Data?) -> Bool)? = nil
    )
}
```

**Parameters**:
- `captureRequestHeaders`: Whether to capture request headers.
- `captureResponseHeaders`: Whether to capture response headers.
- `captureBodies`: Options for capturing request and response bodies.
- `urlPatternBlocklist`: List of URL patterns to exclude from capture.
- `headerKeys`: Configuration for header key filtering.
- `requestHeaderFilter`: Custom filter for request headers.
- `responseHeaderFilter`: Custom filter for response headers.
- `requestBodyCapturePredicate`: Custom predicate for determining when to capture request bodies.
- `responseBodyCapturePredicate`: Custom predicate for determining when to capture response bodies.

### NetworkBodyCaptureOptions

```swift
enum NetworkBodyCaptureOptions {
    case none
    case request
    case response
    case both
}
```

**GitHub Source**: [EmbraceCaptureService](https://github.com/embrace-io/embrace-apple-sdk/blob/main/Sources/EmbraceCaptureService/CaptureService.swift)

## ViewCaptureService

Captures UIViewController lifecycle events to measure screen load times, rendering performance, and navigation patterns.

### Options

```swift
struct ViewCaptureServiceOptions {
    init(
        captureFrameRates: Bool = true,
        viewNameProvider: ((UIViewController) -> String?)? = nil,
        viewAttributesProvider: ((UIViewController) -> [String: String]?)? = nil,
        viewNameFilter: ((UIViewController) -> Bool)? = nil
    )
}
```

**Parameters**:
- `captureFrameRates`: Whether to capture frame rate information.
- `viewNameProvider`: Custom function for providing view names.
- `viewAttributesProvider`: Custom function for providing additional view attributes.
- `viewNameFilter`: Filter function to determine which views to track.

**GitHub Source**: [EmbraceCaptureService](https://github.com/embrace-io/embrace-apple-sdk/blob/main/Sources/EmbraceCaptureService/CaptureService.swift)

## TapCaptureService

Captures user tap interactions to provide insights into user engagement and interaction patterns.

### Options

```swift
struct TapCaptureServiceOptions {
    init(
        captureCoordinates: Bool = true,
        targetProvider: ((UIView) -> String?)? = nil,
        viewFilter: ((UIView) -> Bool)? = nil
    )
}
```

**Parameters**:
- `captureCoordinates`: Whether to capture tap coordinates.
- `targetProvider`: Custom function for providing tap target identifiers.
- `viewFilter`: Filter function to determine which views to track taps for.

**GitHub Source**: [EmbraceCaptureService](https://github.com/embrace-io/embrace-apple-sdk/blob/main/Sources/EmbraceCaptureService/CaptureService.swift)

## WebViewCaptureService

Captures WKWebView loading performance and JavaScript errors.

### Options

```swift
struct WebViewCaptureServiceOptions {
    init(
        captureJavaScriptErrors: Bool = true,
        captureJavaScriptLogs: Bool = false
    )
}
```

**Parameters**:
- `captureJavaScriptErrors`: Whether to capture JavaScript errors.
- `captureJavaScriptLogs`: Whether to capture JavaScript console logs.

**GitHub Source**: [EmbraceCaptureService](https://github.com/embrace-io/embrace-apple-sdk/blob/main/Sources/EmbraceCaptureService/CaptureService.swift)

## PushNotificationCaptureService

Captures push notification events including arrivals and user interactions.

### Options

```swift
struct PushNotificationCaptureServiceOptions {
    init(
        captureNotificationContent: Bool = false,
        payloadAttributesFilter: ((UserInfo) -> [String: String]?)? = nil
    )
}
```

**Parameters**:
- `captureNotificationContent`: Whether to capture notification content.
- `payloadAttributesFilter`: Filter for notification payload attributes to capture.

**GitHub Source**: [EmbraceCaptureService](https://github.com/embrace-io/embrace-apple-sdk/blob/main/Sources/EmbraceCaptureService/CaptureService.swift)

## LowMemoryWarningCaptureService

Captures low memory warning events from iOS.

This service doesn't have configurable options.

**GitHub Source**: [EmbraceCaptureService](https://github.com/embrace-io/embrace-apple-sdk/blob/main/Sources/EmbraceCaptureService/CaptureService.swift)

## LowPowerModeCaptureService

Captures device low power mode state changes.

This service doesn't have configurable options.

**GitHub Source**: [EmbraceCaptureService](https://github.com/embrace-io/embrace-apple-sdk/blob/main/Sources/EmbraceCaptureService/CaptureService.swift)

## Custom Capture Services

You can also extend the SDK by creating your own custom capture services.

### Implementing a Custom Capture Service

Custom capture services must conform to the `CaptureService` protocol:

```swift
protocol CaptureService {
    var type: CaptureServiceType { get }
    func setup(with dependencies: EmbraceCaptureDependencies) -> Bool
    func stop()
}
```

See [Extending CaptureServices to Add Your Own Instrumentation](../manual-instrumentation/custom-traces.md) for more details.

## Code Examples

### Configuring Network Capture

```swift
let networkOptions = NetworkCaptureServiceOptions(
    captureRequestHeaders: true,
    captureResponseHeaders: true,
    urlPatternBlocklist: [
        "^https://analytics\\.example\\.com",
        "^https://.*\\.sensitiveapi\\.com"
    ],
    headerKeys: .init(
        requestHeadersBlocklist: ["Authorization", "Cookie"],
        responseHeadersBlocklist: ["Set-Cookie"]
    )
)

let services = CaptureServiceBuilder()
    .add(.network(options: networkOptions))
    .build()

let options = Embrace.Options(
    appId: "YOUR_APP_ID",
    captureServices: services
)
```

### Configuring View Capture

```swift
let viewOptions = ViewCaptureServiceOptions(
    captureFrameRates: true,
    viewNameProvider: { viewController in
        // Use a custom name based on view properties
        if let tabController = viewController as? UITabBarController {
            return "Tab-\(tabController.selectedIndex)"
        }
        // Default to class name
        return String(describing: type(of: viewController))
    },
    viewAttributesProvider: { viewController in
        // Add custom attributes to view spans
        if let productVC = viewController as? ProductViewController {
            return [
                "product_id": productVC.productId,
                "category": productVC.category
            ]
        }
        return nil
    },
    viewNameFilter: { viewController in
        // Only capture main screens, not utility views
        return !(viewController is UIAlertController)
    }
)

let services = CaptureServiceBuilder()
    .add(.view(options: viewOptions))
    .build()
```

### Configuring Tap Capture

```swift
let tapOptions = TapCaptureServiceOptions(
    captureCoordinates: true,
    targetProvider: { view in
        // Provide meaningful names for tap targets
        if let button = view as? UIButton, let label = button.titleLabel?.text {
            return "Button-\(label)"
        }
        if let cell = view as? UITableViewCell, let identifier = cell.reuseIdentifier {
            return "Cell-\(identifier)"
        }
        return view.accessibilityIdentifier
    },
    viewFilter: { view in
        // Only capture taps on interactive elements
        return view is UIButton || view is UITableViewCell || view.isUserInteractionEnabled
    }
)

let services = CaptureServiceBuilder()
    .add(.tap(options: tapOptions))
    .build()
```

### Configuring All Capture Services

```swift
let services = CaptureServiceBuilder()
    .add(.network(options: networkOptions))
    .add(.view(options: viewOptions))
    .add(.tap(options: tapOptions))
    .add(.webView(options: webViewOptions))
    .add(.pushNotification(options: pushOptions))
    .add(.lowMemoryWarning)
    .add(.lowPowerMode)
    .build()

let options = Embrace.Options(
    appId: "YOUR_APP_ID",
    captureServices: services
)
```

TODO: Add examples of implementing and registering custom capture services. 