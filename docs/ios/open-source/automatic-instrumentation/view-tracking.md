---
title: View Tracking
description: Monitor UIViewController lifecycle and performance in your iOS app
sidebar_position: 2
---

# View Tracking

The Embrace SDK's `ViewCaptureService` automatically instruments `UIViewController` load and render times, giving you visibility into screen performance and user experience.

## How View Tracking Works

The view tracking service monitors the lifecycle of `UIViewController` instances in your app and generates OpenTelemetry spans for key events such as:
- View loading time
- Render time (time to first render)
- Time to interactive
- View visibility duration
- View lifecycle events

This data helps you identify slow screens, optimize user experience, and understand user navigation patterns.

## Configuration

You can customize view tracking behavior when initializing the Embrace SDK:

```swift
let services = CaptureServiceBuilder()
    .add(.view(options: ViewCaptureService.Options(
        instrumentVisibility: true,  // Track screen visibility
        instrumentFirstRender: true  // Track first render time
    )))
    .addDefaults()
    .build()

try Embrace
    .setup(
        options: Embrace.Options(
            appId: "APPID",
            captureServices: services
            //...other options
        )
    )
    .start()
```

## Available Tracking Features

### Screen Visibility Tracking

When `instrumentVisibility` is enabled, the service generates spans that:
- Start when a `UIViewController` appears (`viewDidAppear`)
- End when it disappears (`viewDidDisappear`)

This provides insights into how long users spend on each screen and their navigation patterns.

### Time to First Render

When `instrumentFirstRender` is enabled, the service generates spans that:
- Start when a `UIViewController` is loaded (`viewDidLoad`)
- End when it becomes visible for the first time (`viewDidAppear`)

The service also creates child spans for each stage in the process:
- `viewDidLoad`
- `viewWillAppear`
- `viewIsAppearing` (including animations)
- `viewDidAppear`

If a user navigates away before the view appears, the spans will be marked with error status `.userAbandon`.

:::warning
If you're using the Embrace Dashboard, you might need to contact Embrace support to enable this feature through remote configuration.

If you're not using the Embrace Dashboard, enable this by passing a custom `EmbraceConfigurable` with `isUiLoadInstrumentationEnabled` set to true when initializing the SDK.
:::

### Time to Interactive

This feature tracks the time until a view is ready for user interaction. To use it:

1. Enable `instrumentFirstRender` in the options
2. Implement the `InteractableViewController` protocol in your view controllers
3. Call `setInteractionReady()` when the view is ready for interaction

```swift
class MyViewController: UIViewController, InteractableViewController {
    override func viewDidLoad() {
        super.viewDidLoad()

        // Some async operation
        MyDataFetcher.fetch { [weak self] data in
            self?.loadData(data)
            self?.setInteractionReady()  // Mark view as interactive
        }
    }
}
```

If the user navigates away before the view becomes interactive, spans will be marked with error status `.userAbandon`.

### Custom View Naming

By default, the SDK uses the class name of your `UIViewController` for identification. You can customize this by implementing the `EmbraceViewControllerCustomization` protocol:

```swift
class ProfileViewController: UIViewController, EmbraceViewControllerCustomization {
    // Return a custom name for this view in Embrace
    var nameForViewControllerInEmbrace: String? {
        return "User Profile Screen"
    }
    
    // Determine if this view should be tracked by Embrace
    var shouldCaptureViewInEmbrace: Bool {
        return true
    }
}
```

### Custom Child Spans

When first render instrumentation is enabled, you can add custom child spans to track specific operations during view loading:

```swift
class MyViewController: UIViewController, InstrumentableViewController {
    override func viewDidLoad() {
        super.viewDidLoad()

        let childSpan = buildChildSpan(name: "data-fetch").startSpan()

        // Some async operation
        MyDataFetcher.fetch { [weak self] data in
            self?.loadData(data)
            childSpan.end()
        }
    }
}
```

### Adding Custom Attributes

You can add custom attributes to the view trace to provide additional context:

```swift
class MyViewController: UIViewController, InstrumentableViewController {
    override func viewDidLoad() {
         super.viewDidLoad()
         try? instrumentView()
    }

    func instrumentView() throws {
        try addAttributesToTrace(
            [
                "feature_enabled": "true",
                "user_segment": "premium",
                "content_type": "article"
            ]
        )
    }
}
```

## Best Practices

- Enable both visibility and render tracking for comprehensive view performance data
- Implement `InteractableViewController` for screens with complex loading or asynchronous content
- Add custom attributes to help segment and filter view performance data
- Use custom child spans to track critical operations during view loading
- Set custom view names for better readability in the dashboard
- Focus on screens that are critical to your user experience for optimization

## Common Use Cases

- Identifying slow-loading screens
- Monitoring the impact of code changes on UI performance
- Understanding user navigation patterns
- Detecting when users abandon screens before they fully load
- Correlating network activity with view performance

## TODO: Add examples of how view tracking data appears in the Embrace dashboard and how to interpret the results 