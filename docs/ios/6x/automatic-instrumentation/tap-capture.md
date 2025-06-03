---
title: Tap Capture
description: Automatically monitor user interactions with your iOS app
sidebar_position: 3
---

# Tap Capture

The Embrace SDK's `TapCaptureService` automatically instruments tap events throughout your app, providing visibility into user interactions and the screens they engage with most.

## How Tap Capture Works

The tap capture service monitors user tap events in your app and creates OpenTelemetry spans for each interaction. These spans capture:
- The time of tap
- The view that was tapped
- Optional tap coordinates
- Custom attributes (if configured)

This data helps identify screens with high user engagement, troubleshoot UI responsiveness issues, and understand user behavior patterns.

## Configuration

You can customize tap capture behavior when initializing the Embrace SDK:

```swift
let services = CaptureServiceBuilder()
    .add(.tap(options: TapCaptureService.Options(
        ignoreClassNames: ["UITableView", "UIScrollView"],
        captureTapCoordinates: true,
        delegate: myCustomDelegate
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

## Customization Options

### Ignoring Specific Views

You can configure the tap capture service to ignore taps on specific UIView classes:

```swift
TapCaptureService.Options(
    ignoreClassNames: ["UIButton", "UITableViewCell", "UICollectionViewCell"]
)
```

This is useful when you want to focus on particular interactions or exclude high-volume tap areas.

### Capturing Tap Coordinates

Enable coordinate capture to record the exact location of each tap:

```swift
TapCaptureService.Options(
    captureTapCoordinates: true
)
```

When enabled, tap coordinates will be included as attributes in the generated spans:
- `emb.tap.x`: X-coordinate of the tap
- `emb.tap.y`: Y-coordinate of the tap

### Custom Tap Capture Delegate

For fine-grained control over which taps are captured, you can implement a custom delegate:

```swift
class MyTapDelegate: TapCaptureServiceDelegate {
    func shouldCaptureTap(on view: UIView, at point: CGPoint) -> Bool {
        // Custom logic to determine if this tap should be captured

        // For example, only capture taps on important views
        if view.accessibilityIdentifier?.hasPrefix("important_") == true {
            return true
        }

        // Or ignore taps in a specific area of the screen
        if point.y < 100 {  // Ignore taps near the top of the screen
            return false
        }

        return true
    }
}

// Then use this delegate when configuring the service
let myDelegate = MyTapDelegate()
TapCaptureService.Options(
    delegate: myDelegate
)
```

## Understanding Tap Data

Tap events are captured as OpenTelemetry spans with the following attributes:

- `emb.tap.view_class`: The class name of the tapped view
- `emb.tap.view_id`: The accessibility identifier of the view (if available)
- `emb.tap.x` and `emb.tap.y`: Tap coordinates (if enabled)
- `emb.view_controller`: The class name of the view controller containing the tapped view

## Example Use Cases

### User Flow Analysis

Tap capture data can reveal how users navigate through your app and which features they interact with most frequently.

### UI Responsiveness Monitoring

By combining tap data with view performance metrics, you can identify areas where your app may be slow to respond to user input.

### Feature Engagement Tracking

Monitor which features users are engaging with and identify areas of your app that may need better visibility or redesign.

### A/B Testing Analysis

When running A/B tests, tap data can provide insights into how different UI variations affect user behavior and engagement.

## Best Practices

- Be selective about which views you monitor to avoid capturing excessive data
- Use accessibility identifiers on important UI elements to make tap events more meaningful
- Consider user privacy when capturing detailed interaction data
- Combine tap data with session information to build comprehensive user journey maps
- Use tap coordinates sparingly, only when the precise location of interaction is important

 <!-- TODO: Add examples of how tap data appears in the Embrace dashboard, including any visualizations or reports that highlight user interaction patterns  -->
