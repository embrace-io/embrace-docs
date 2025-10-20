---
title: Breadcrumbs
description: Add lightweight logging context to your iOS 6.x app sessions with breadcrumbs
sidebar_position: 6
---

# Breadcrumbs

Breadcrumbs are a lightweight way to add logging to your session. They provide context to user activity in sessions, while adding little CPU or memory overhead.

## Adding Context to Sessions

Embrace can collect basic session data and crashes as you've already seen in the [Crash Reporting](/ios/6x/manual-instrumentation/crash-reporting) and [Sessions](/ios/6x/core-concepts/sessions) sections. Embrace can also collect your logging data and include it as context within your sessions.

### Basic Breadcrumb Usage

Here's how you add a breadcrumb to the session:

```swift
Embrace.client?.add(event: .breadcrumb("User tapped checkout button"))
```

:::info Character Limit
Breadcrumb messages must be 256 characters or less.
:::

### OpenTelemetry Foundation

Note that the `.add(event:)` method adds a SpanEvent to the session span. Embrace's Breadcrumbs are an OpenTelemetry-compliant subclass of SpanEvents, and are added in-context in the User Timeline.

## Advanced Breadcrumb Usage

### Breadcrumbs in Different Contexts

#### User Actions

```swift
// User interface interactions
Embrace.client?.add(event: .breadcrumb("User opened settings screen"))
Embrace.client?.add(event: .breadcrumb("User enabled notifications"))
Embrace.client?.add(event: .breadcrumb("User logged out"))
```

#### Application State Changes

```swift
// App lifecycle events
Embrace.client?.add(event: .breadcrumb("App entered background"))
Embrace.client?.add(event: .breadcrumb("App became active"))
Embrace.client?.add(event: .breadcrumb("Memory warning received"))
```

#### Business Logic Events

```swift
// Important business events
Embrace.client?.add(event: .breadcrumb("Cart updated"))
Embrace.client?.add(event: .breadcrumb("Search performed"))
Embrace.client?.add(event: .breadcrumb("Filter applied"))
```

## Best Practices

### What to Log as Breadcrumbs

**Good candidates for breadcrumbs:**

- User interactions (button taps, screen transitions)
- Important application state changes
- Business logic milestones
- Network request initiation (not detailed responses)
- Error conditions that don't crash the app

**Avoid logging as breadcrumbs:**

- Sensitive user data (passwords, personal information)
- High-frequency events (scroll events, timer ticks)
- Large data payloads
- Detailed network responses

### Breadcrumb Naming Conventions

Use clear, consistent naming for your breadcrumbs:

```swift
// Good: Clear and descriptive
Embrace.client?.add(event: .breadcrumb("User started checkout process"))
Embrace.client?.add(event: .breadcrumb("Payment validation failed"))
Embrace.client?.add(event: .breadcrumb("Order confirmation displayed"))

// Avoid: Vague or inconsistent
Embrace.client?.add(event: .breadcrumb("Something happened"))
Embrace.client?.add(event: .breadcrumb("Error"))
```

### Performance Considerations

Breadcrumbs are designed to be lightweight, but consider:

- **Frequency**: Don't add breadcrumbs in tight loops or high-frequency callbacks
- **Content**: Keep messages concise
- **Timing**: Add breadcrumbs at meaningful moments, not every minor state change

### SwiftUI View Lifecycle Considerations

When using breadcrumbs in SwiftUI views, be aware that view lifecycle methods like `onAppear` can be called multiple times due to SwiftUI's reactive rendering. This can result in duplicate breadcrumbs that inflate metrics and show incorrect abandonment rates in user flow tracking.

**Common Issue:**

```swift
// This will log multiple times as the view re-renders
struct ProductView: View {
    var body: some View {
        Text("Product Details")
            .onAppear {
                Embrace.client?.add(event: .breadcrumb("Product Viewed"))
            }
    }
}
```

**Recommended Approach:**

Use state-based tracking to prevent duplicates:

```swift
struct ProductView: View {
    @State private var hasLogged = false

    var body: some View {
        Text("Product Details")
            .onAppear {
                guard !hasLogged else { return }
                Embrace.client?.add(event: .breadcrumb("Product Viewed"))
                hasLogged = true
            }
    }
}
```

Alternatively, move tracking logic to a ViewModel:

```swift
class ProductViewModel: ObservableObject {
    private var hasTracked = false

    func trackView() {
        guard !hasTracked else { return }
        Embrace.client?.add(event: .breadcrumb("Product Viewed"))
        hasTracked = true
    }
}
```

For comprehensive SwiftUI instrumentation patterns, including navigation tracking, multi-step forms, and action handlers, see the [SwiftUI-Specific Patterns](/ios/6x/best-practices/common-patterns#swiftui-specific-patterns) guide.

## Integration with Other Features

### Breadcrumbs and Crash Reports

Breadcrumbs provide valuable context when analyzing crash reports. They show the sequence of user actions leading up to a crash:

```swift
// These breadcrumbs will appear in crash reports
Embrace.client?.add(event: .breadcrumb("User started video playback"))
Embrace.client?.add(event: .breadcrumb("Video buffer underrun detected"))
Embrace.client?.add(event: .breadcrumb("Attempting to recover playback"))
// Crash occurs here - breadcrumbs provide context
```

### Breadcrumbs and Custom Traces

Breadcrumbs can complement [custom traces](/ios/6x/manual-instrumentation/custom-traces) by providing additional context:

```swift
// Start a custom trace for a complex operation
let trace = Embrace.client?.buildSpan(name: "user_onboarding")
    .startSpan()

// Add breadcrumbs to provide detailed context
Embrace.client?.add(event: .breadcrumb("Onboarding step 1: Welcome screen"))
Embrace.client?.add(event: .breadcrumb("Onboarding step 2: Permissions requested"))
Embrace.client?.add(event: .breadcrumb("Onboarding step 3: Account creation"))

trace?.end()
```

## Viewing Breadcrumbs in the Dashboard

Breadcrumbs appear in several places in the Embrace dashboard:

- **Session Timeline** - Shows breadcrumbs in chronological order with other session events
- **Crash Reports** - Displays breadcrumbs leading up to crashes
- **User Journey** - Provides context for understanding user behavior patterns

## Common Use Cases

### E-commerce App

```swift
Embrace.client?.add(event: .breadcrumb("Product search"))
Embrace.client?.add(event: .breadcrumb("Product viewed"))
Embrace.client?.add(event: .breadcrumb("Added to cart"))
Embrace.client?.add(event: .breadcrumb("Checkout initiated"))
Embrace.client?.add(event: .breadcrumb("Payment completed"))
```

### Media App

```swift
Embrace.client?.add(event: .breadcrumb("Content browsing"))
Embrace.client?.add(event: .breadcrumb("Video selected"))
Embrace.client?.add(event: .breadcrumb("Playback started"))
Embrace.client?.add(event: .breadcrumb("Playback paused"))
```

### Social App

```swift
Embrace.client?.add(event: .breadcrumb("Feed refreshed"))
Embrace.client?.add(event: .breadcrumb("Post liked"))
Embrace.client?.add(event: .breadcrumb("Comment added"))
Embrace.client?.add(event: .breadcrumb("Profile viewed"))
```

## Next Steps

- Learn about [Custom Logging](/ios/6x/manual-instrumentation/custom-logging) for more detailed logging
- Explore [Custom Traces](/ios/6x/manual-instrumentation/custom-traces) for performance monitoring
- Check out [Best Practices](/ios/6x/best-practices/common-patterns) for optimal breadcrumb usage patterns
