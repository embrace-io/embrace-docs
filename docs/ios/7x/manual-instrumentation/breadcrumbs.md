---
title: Breadcrumbs
description: Add lightweight logging context to your iOS 7.x app sessions with breadcrumbs
sidebar_position: 6
---

## Breadcrumbs

Breadcrumbs are a lightweight way to add logging to your session. They provide context to user activity in sessions, while adding little CPU or memory overhead.

### Adding Context to Sessions

Embrace can collect basic session data and crashes as you've already seen in the [Crash Reporting](/ios/7x/manual-instrumentation/crash-reporting) and [Sessions](/ios/7x/core-concepts/sessions) sections. Embrace can also collect your logging data and include it as context within your sessions.

#### Basic Breadcrumb Usage

Here's how you add a breadcrumb to the session:

```swift
EmbraceIO.shared.addBreadcrumb("User tapped checkout button")
```

:::info Character Limit
Breadcrumb messages must be 256 characters or less.
:::

#### OpenTelemetry Foundation

Note that the `addBreadcrumb(_:)` method adds an `EmbraceSpanEvent` to the session span. Embrace's Breadcrumbs are an OpenTelemetry-compliant subclass of SpanEvents, and are added in-context in the User Timeline.

### Advanced Breadcrumb Usage

#### Breadcrumbs in Different Contexts

##### User Actions

```swift
// User interface interactions
EmbraceIO.shared.addBreadcrumb("User opened settings screen")
EmbraceIO.shared.addBreadcrumb("User enabled notifications")
EmbraceIO.shared.addBreadcrumb("User logged out")
```

##### Application State Changes

```swift
// App lifecycle events
EmbraceIO.shared.addBreadcrumb("App entered background")
EmbraceIO.shared.addBreadcrumb("App became active")
EmbraceIO.shared.addBreadcrumb("Memory warning received")
```

##### Business Logic Events

```swift
// Important business events
EmbraceIO.shared.addBreadcrumb("Cart updated")
EmbraceIO.shared.addBreadcrumb("Search performed")
EmbraceIO.shared.addBreadcrumb("Filter applied")
```

### Best Practices

#### What to Log as Breadcrumbs

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

#### Breadcrumb Naming Conventions

Use clear, consistent naming for your breadcrumbs:

```swift
// Good: Clear and descriptive
EmbraceIO.shared.addBreadcrumb("User started checkout process")
EmbraceIO.shared.addBreadcrumb("Payment validation failed")
EmbraceIO.shared.addBreadcrumb("Order confirmation displayed")

// Avoid: Vague or inconsistent
EmbraceIO.shared.addBreadcrumb("Something happened")
EmbraceIO.shared.addBreadcrumb("Error")
```

#### Performance Considerations

Breadcrumbs are designed to be lightweight, but consider:

- **Frequency**: Don't add breadcrumbs in tight loops or high-frequency callbacks
- **Content**: Keep messages concise
- **Timing**: Add breadcrumbs at meaningful moments, not every minor state change

#### SwiftUI View Lifecycle Considerations

When using breadcrumbs in SwiftUI views, be aware that view lifecycle methods like `onAppear` can be called multiple times due to SwiftUI's reactive rendering. This can result in duplicate breadcrumbs that inflate metrics and show incorrect abandonment rates in user flow tracking.

**Common Issue:**

```swift
// This will log multiple times as the view re-renders
struct ProductView: View {
    var body: some View {
        Text("Product Details")
            .onAppear {
                EmbraceIO.shared.addBreadcrumb("Product Viewed")
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
                EmbraceIO.shared.addBreadcrumb("Product Viewed")
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
        EmbraceIO.shared.addBreadcrumb("Product Viewed")
        hasTracked = true
    }
}
```

For comprehensive SwiftUI instrumentation patterns, including navigation tracking, multi-step forms, and action handlers, see the [SwiftUI-Specific Patterns](/ios/7x/best-practices/common-patterns#swiftui-specific-patterns) guide.

### Integration with Other Features

#### Breadcrumbs and Crash Reports

Breadcrumbs provide valuable context when analyzing crash reports. They show the sequence of user actions leading up to a crash:

```swift
// These breadcrumbs will appear in crash reports
EmbraceIO.shared.addBreadcrumb("User started video playback")
EmbraceIO.shared.addBreadcrumb("Video buffer underrun detected")
EmbraceIO.shared.addBreadcrumb("Attempting to recover playback")
// Crash occurs here - breadcrumbs provide context
```

#### Breadcrumbs and Custom Traces

Breadcrumbs can complement [custom traces](/ios/7x/manual-instrumentation/custom-traces) by providing additional context:

```swift
// Start a custom trace for a complex operation
let trace = EmbraceIO.shared.createSpan(name: "user_onboarding")

// Add breadcrumbs to provide detailed context
EmbraceIO.shared.addBreadcrumb("Onboarding step 1: Welcome screen")
EmbraceIO.shared.addBreadcrumb("Onboarding step 2: Permissions requested")
EmbraceIO.shared.addBreadcrumb("Onboarding step 3: Account creation")

trace?.end()
```

### Viewing Breadcrumbs in the Dashboard

Breadcrumbs appear in several places in the Embrace dashboard:

- **Session Timeline** - Shows breadcrumbs in chronological order with other session events
- **Crash Reports** - Displays breadcrumbs leading up to crashes
- **User Journey** - Provides context for understanding user behavior patterns

### Common Use Cases

#### E-commerce App

```swift
EmbraceIO.shared.addBreadcrumb("Product search")
EmbraceIO.shared.addBreadcrumb("Product viewed")
EmbraceIO.shared.addBreadcrumb("Added to cart")
EmbraceIO.shared.addBreadcrumb("Checkout initiated")
EmbraceIO.shared.addBreadcrumb("Payment completed")
```

#### Media App

```swift
EmbraceIO.shared.addBreadcrumb("Content browsing")
EmbraceIO.shared.addBreadcrumb("Video selected")
EmbraceIO.shared.addBreadcrumb("Playback started")
EmbraceIO.shared.addBreadcrumb("Playback paused")
```

#### Social App

```swift
EmbraceIO.shared.addBreadcrumb("Feed refreshed")
EmbraceIO.shared.addBreadcrumb("Post liked")
EmbraceIO.shared.addBreadcrumb("Comment added")
EmbraceIO.shared.addBreadcrumb("Profile viewed")
```

### Next Steps

- Learn about [Custom Logging](/ios/7x/manual-instrumentation/custom-logging) for more detailed logging
- Explore [Custom Traces](/ios/7x/manual-instrumentation/custom-traces) for performance monitoring
- Check out [Best Practices](/ios/7x/best-practices/common-patterns) for optimal breadcrumb usage patterns
