---
title: Traces
description: Track the duration and performance of custom operations in your iOS app
sidebar_position: 1
---

# Traces

Custom traces allow you to measure the duration of specific operations in your app, providing insights into performance and behavior of code paths that matter to your business. Traces are implemented using spans from the OpenTelemetry standard.

## What are Traces and Spans?

In OpenTelemetry:

- A **trace** represents the entire journey of a request or operation through your system
- **Spans** are the building blocks of a trace, representing individual units of work or operations

Each span:

- Has a name and type
- Tracks when the operation started and ended
- Can include attributes (key-value pairs) that provide context
- Can record errors that occurred during the operation
- Can have parent-child relationships with other spans
- **Must be ended** to properly capture the operation's duration and avoid memory leaks

Embrace uses spans to visualize and analyze the performance of operations in your app.

## Required Imports

To use custom traces in your Swift code, you need the following imports:

```swift
import Foundation
import EmbraceIO
import OpenTelemetryApi  // Only required for parent-child span relationships
```

**Note:** The `OpenTelemetryApi` import is only required when:

- Creating parent-child span relationships using `.setParent()`
- Storing spans as class properties or variables with explicit `Span` type annotations
- Using advanced span manipulation methods

For basic span creation and `recordSpan` usage, only `EmbraceIO` is needed.

## Creating Spans

Embrace provides several ways to create custom spans depending on your needs:

### Basic Span Creation

Create a span using the `buildSpan` method:

```swift
let span = Embrace.client?.buildSpan(
    name: "image_processing", 
    type: .performance
).startSpan()

// Your code here
performImageProcessing()

span.end()
```

### Using Closures

For operations contained within a single function, you can use the closure-based API:

```swift
let result = Embrace.recordSpan(
    name: "data_calculation", 
    type: .performance,
    attributes: [
        "input_size": String(inputData.count),
        "algorithm": "fast_math"
    ]
) { span in
    // Your code here
    let result = performCalculation()

    // Add dynamic attributes to the span
    span?.setAttribute(key: "calculation_result", value: result.description)

    return result
}
```

**Important:**  

- The `span` parameter in the closure is optional (`Span?`), so always use optional chaining (`span?.setAttribute`) when calling methods on it.
- **Never call `span?.end()` within a `recordSpan` closure** - the span is automatically ended when the closure completes. Calling `end()` manually can cause undefined behavior.

### Async Operations

For asynchronous operations, start the span before the operation begins and end it when the operation completes:

```swift
guard let embrace = Embrace.client else { return }
let span = embrace.buildSpan(
    name: "network_request", 
    type: .performance
).startSpan()

performAsyncOperation { result, error in
    if let error = error {
        span.end(error: error)
    } else {
        span.setAttribute(key: "result_count", value: result.count.description)
        span.end()
    }
}
```

## Span Attributes

Add context to your spans with attributes. You can set attributes in two ways:

### Setting Multiple Attributes at Creation

```swift
let span = Embrace.client?.buildSpan(
    name: "checkout_process", 
    type: .performance,
    attributes: [
        "cart_item_count": "5",
        "total_amount": "99.99",
        "payment_method": "credit_card"
    ]
).startSpan()

// Complete checkout process
span.end()
```

### Setting Individual Attributes

```swift
// Ensure we initialized embrace
guard let embrace = Embrace.client else { return }

// Create the span
let span = embrace.buildSpan(
    name: "checkout_process", 
    type: .performance
).startSpan()

// Add some attributes relevant to the checkout
span.setAttribute(key: "cart_item_count", value: "5")
span.setAttribute(key: "total_amount", value: "99.99")
span.setAttribute(key: "payment_method", value: "credit_card")

// Complete checkout process
span.end()
```

### Hybrid Approach

```swift
// Ensure we initialized embrace
guard let embrace = Embrace.client else { return }

// Set known attributes upfront
let span = embrace.buildSpan(
    name: "api_request",
    type: .performance,
    attributes: [
        "endpoint": "/users/profile",
        "method": "GET",
        "user_id": userId
    ]
).startSpan()

// Add dynamic attributes during execution
span.setAttribute(key: "response_size", value: String(responseData.count))
span.setAttribute(key: "cache_status", value: cacheHit ? "hit" : "miss")

span.end()
```

**Best Practices:**

- Use the **attributes dictionary** for static values known at span creation
- Use **setAttribute()** for dynamic values computed during span execution
- **Attribute values must be strings** - convert numbers and booleans to strings
- You can add attributes at any point before the span is ended

## Span Hierarchy

Create parent-child relationships between spans to represent nested operations:

```swift
let parentSpan = Embrace.client?.buildSpan(
    name: "data_sync", 
    type: .performance
).startSpan()

// Start a child span using recordSpan with parent parameter
let result = Embrace.recordSpan(
    name: "fetch_remote_data",
    parent: parentSpan,
    type: .performance
) { childSpan in
    return fetchRemoteData()
}

// Create another child span
Embrace.recordSpan(
    name: "process_data",
    parent: parentSpan,
    type: .performance
) { processSpan in
    processData(result)
}

parentSpan.end()
```

This creates a hierarchy that helps visualize the relationship between operations.

## Custom Span Types

You can specify a span type to categorize different kinds of operations:

```swift
let span = Embrace.client?.buildSpan(
    name: "payment_processing",
    type: .performance // Use SpanType enum values like .performance, .ux, .system
).startSpan()

// Process payment

span.end()
```

Available span types include:

- `.performance` - For performance monitoring *(default if not specified)*
- `.ux` - For user experience tracking
- `.system` - For system-level operations

**Note:** If you don't specify a `type` parameter, `.performance` is used by default.

## Span Links

Span links correlate one or more spans together that are causally related but don’t have a typical parent-child relationship. These links may correlate spans within the same trace or across different traces.

You can add links to other spans when building a span:

```swift
// Build a new span
let builder = Embrace.client?.buildSpan(name: "mySpan")

// Set a SpanLink
builder?.addLink(spanContext: linkContext, attributes: linkAttributes)

// Start the span
let span = builder?.startSpan()

// End the span
// ...
span?.end()
```

## Best Practices

### Naming Conventions

Use clear, descriptive names for your spans. Consider a naming convention such as:

- Use camelCase for span names to maintain consistency with Swift naming conventions
- Include the general category followed by the specific operation
- Be consistent across your codebase

Good examples:

- `networkFetchUserProfile`
- `databaseSavePreferences`
- `renderingProductList`

### Granularity

Choose an appropriate level of granularity for your spans:

- Too coarse: `app_startup` (better to break into component parts)
- Too fine-grained: `increment_counter` (likely too small to be useful)
- Just right: `image_cache_lookup`, `user_authentication`

### Resource Management

Always end your spans to avoid memory leaks. Consider using Swift's `defer` statement for safety:

```swift
guard let embrace = Embrace.client else { return }
let span = embrace.buildSpan(
    name: "important_operation", 
    type: .performance
).startSpan()
defer { span.end() }

// Your code here, even if it throws an exception, span will be ended
```

### Capturing Meaningful Data

Add attributes that would be useful for troubleshooting:

```swift
guard let embrace = Embrace.client else { return }
let span = embrace.buildSpan(name: "data_operation").startSpan()

span.setAttribute(key: "user_tier", value: "premium")
span.setAttribute(key: "data_size", value: dataSize.description)
span.setAttribute(key: "retry_count", value: retryCount.description)

span.end()
```

## Common Use Cases

### API Client Instrumentation

```swift
func fetchUserProfile(userId: String, completion: @escaping (Result<UserProfile, Error>) -> Void) {
    guard let embrace = Embrace.client else {
        completion(.failure(APIError.instrumentationUnavailable))
        return
    }

    let span = embrace.buildSpan(
        name: "api_fetch_user_profile", 
        type: .performance
    ).startSpan()

    span.setAttribute(key: "user_id", value: userId)

    apiClient.get("/users/\(userId)") { result in
        switch result {
        case .success(let data):
            span.setAttribute(key: "data_size", value: data.count.description)
            span.end()
            // Process data and call completion
        case .failure(let error):
            span.setAttribute(key: "error.message", value: error.localizedDescription)
            span.end(error: error)
            completion(.failure(error))
        }
    }
}
```

### Database Operations

```swift
func saveUserPreferences(preferences: Preferences) throws {
    guard let span = Embrace.client?.buildSpan(
        name: "db_save_preferences", 
        type: .performance
    ).startSpan() else {
        throw DatabaseError.instrumentationUnavailable
    }
    defer { span.end() }

    span.setAttribute(key: "preference_count", value: preferences.count.description)

    do {
        try database.write { transaction in
            transaction.setObject(preferences, forKey: "user_preferences")
        }
    } catch let error {
        span.setAttribute(key: "error.message", value: error.localizedDescription)
        span.end(error: error)
        throw error
    }
}
```

### Performance-Critical Algorithms

```swift
func processFeed(posts: [Post]) -> [ProcessedPost] {
    guard let span = Embrace.client?.buildSpan(
        name: "algorithm_feed_processing", 
        type: .performance
    ).startSpan() else {
        // Fallback to processing without instrumentation
        return performFeedProcessing(posts)
    }
    defer { span.end() }

    span.setAttribute(key: "post_count", value: posts.count.description)

    // Measure the main processing algorithm
    let result = performFeedProcessing(posts)

    span.setAttribute(key: "processed_count", value: result.count.description)

    return result
}
```

## Complex User Flow Examples

### Navigation Flow Tracking

Track user navigation through your app with hierarchical spans:

```swift
class NavigationFlowTracker {
    private var userJourneySpan: Span?

    func startUserJourney(from startScreen: String) {
        userJourneySpan = Embrace.client?.buildSpan(
            name: "user_journey",
            type: .ux,
            attributes: [
                "journey.start_screen": startScreen,
                "journey.session_id": Embrace.client?.currentSessionId() ?? "unknown"
            ]
        ).startSpan()
    }

    func trackScreenTransition(from: String, to: String) {
        Embrace.recordSpan(
            name: "screen_transition",
            parent: userJourneySpan,
            type: .ux,
            attributes: [
                "transition.from": from,
                "transition.to": to
            ]
        ) { transitionSpan in
            // Add transition-specific events
            transitionSpan?.addEvent(name: "transition_started")

            // Simulate transition work
            let success = performTransition(from: from, to: to)

            if success {
                transitionSpan?.addEvent(name: "transition_completed")
            } else {
                transitionSpan?.addEvent(name: "transition_failed")
                // Error will be handled by span.end(error:) if needed
            }
        }
    }

    func endUserJourney(reason: String) {
        userJourneySpan?.setAttribute(key: "journey.end_reason", value: reason)
        userJourneySpan?.end()
        userJourneySpan = nil
    }
}
```

### Game or Interaction Flow Measurement

Track complex multi-stage user interactions:

```swift
class GameFlowTracker {
    private var gameSpan: Span?
    private var roundSpan: Span?
    private var currentRound = 0

    func startGame(gameType: String) {
        gameSpan = Embrace.client?.buildSpan(
            name: "game_session",
            type: .ux,
            attributes: [
                "game.type": gameType,
                "game.start_time": ISO8601DateFormatter().string(from: Date())
            ]
        ).startSpan()
    }

    func startRound() {
        currentRound += 1

        // End previous round if exists
        roundSpan?.end()

        // Start new round as child of game span
        roundSpan = Embrace.client?.buildSpan(
            name: "game_round",
            type: .ux,
            attributes: [
                "round.number": String(currentRound),
                "round.start_time": ISO8601DateFormatter().string(from: Date())
            ]
        ).startSpan()
    }

    func recordUserAction(action: String, isCorrect: Bool, reactionTime: TimeInterval) {
        Embrace.recordSpan(
            name: "user_action",
            parent: roundSpan,
            type: .ux,
            attributes: [
                "action.type": action,
                "action.correct": String(isCorrect),
                "action.reaction_time_ms": String(Int(reactionTime * 1000))
            ]
        ) { actionSpan in
            if !isCorrect {
                // Handle incorrect action - could end with error if needed
                actionSpan?.setAttribute(key: "action.error", value: "incorrect_action")
            }
        }
    }

    func endRound(score: Int, success: Bool) {
        roundSpan?.setAttribute(key: "round.score", value: String(score))
        roundSpan?.setAttribute(key: "round.success", value: String(success))

        if !success {
            roundSpan?.setAttribute(key: "round.failure_reason", value: "round_failed")
        }

        roundSpan?.end()
        roundSpan = nil
    }

    func endGame(finalScore: Int, totalRounds: Int) {
        gameSpan?.setAttribute(key: "game.final_score", value: String(finalScore))
        gameSpan?.setAttribute(key: "game.total_rounds", value: String(totalRounds))
        gameSpan?.setAttribute(key: "game.average_score", value: String(finalScore / max(totalRounds, 1)))
        gameSpan?.end()
        gameSpan = nil
    }
}
```

### E-commerce Checkout Flow

Track a complete user purchase journey:

```swift
class CheckoutFlowTracker {
    private var checkoutSpan: Span?

    func startCheckout(cartValue: Double, itemCount: Int) {
        checkoutSpan = Embrace.client?.buildSpan(
            name: "checkout_flow",
            type: .ux,
            attributes: [
                "checkout.cart_value": String(format: "%.2f", cartValue),
                "checkout.item_count": String(itemCount),
                "checkout.started_at": ISO8601DateFormatter().string(from: Date())
            ]
        ).startSpan()
    }

    func trackCheckoutStep(step: String, duration: TimeInterval? = nil) {
        return Embrace.recordSpan(
            name: "checkout_step",
            parent: checkoutSpan,
            type: .ux,
            attributes: [
                "step.name": step,
                "step.timestamp": ISO8601DateFormatter().string(from: Date())
            ]
        ) { stepSpan in
            if let duration = duration {
                stepSpan?.setAttribute(key: "step.duration_ms", value: String(Int(duration * 1000)))
            }
            return stepSpan
        }
    }

    func trackPaymentFlow(paymentMethod: String) {
        Embrace.recordSpan(
            name: "payment_processing",
            parent: checkoutSpan,
            type: .ux,
            attributes: [
                "payment.method": paymentMethod
            ]
        ) { paymentSpan in
            // Track payment validation as nested span
            Embrace.recordSpan(
                name: "payment_validation",
                parent: paymentSpan,
                type: .performance
            ) { validationSpan in
                // Simulate validation work
                Thread.sleep(forTimeInterval: 2.0)
            }

            // Track payment completion
            paymentSpan?.setAttribute(key: "payment.status", value: "completed")
        }
    }

    func completeCheckout(orderId: String, success: Bool, error: Error? = nil) {
        if success {
            checkoutSpan?.setAttribute(key: "checkout.order_id", value: orderId)
            checkoutSpan?.setAttribute(key: "checkout.status", value: "completed")
        } else {
            checkoutSpan?.setAttribute(key: "checkout.status", value: "failed")
            if let error = error {
                checkoutSpan?.setAttribute(key: "error.message", value: error.localizedDescription)
                checkoutSpan?.end(error: error)
                return
            }
        }

        checkoutSpan?.end()
        checkoutSpan = nil
    }
}
```

### SwiftUI Navigation with Embrace Integration

Track navigation in SwiftUI apps with automatic and manual instrumentation:

```swift
struct ShoppingAppView: View {
    @State private var selectedTab = 0
    @State private var showingProductDetail = false

    var body: some View {
        TabView(selection: $selectedTab) {
            ProductListView()
                .tabItem { Label("Products", systemImage: "list.bullet") }
                .tag(0)
                .onAppear {
                    trackTabSelection("products")
                }

            CartView()
                .tabItem { Label("Cart", systemImage: "cart") }
                .tag(1)
                .onAppear {
                    trackTabSelection("cart")
                }
        }
        .onChange(of: selectedTab) { newTab in
            trackTabChange(to: newTab)
        }
    }

    private func trackTabSelection(_ tabName: String) {
        Embrace.recordSpan(
            name: "tab_selection",
            type: .ux,
            attributes: [
                "tab.name": tabName,
                "tab.selection_time": ISO8601DateFormatter().string(from: Date())
            ]
        ) { span in
            // Tab tracking logic here
        }
    }

    private func trackTabChange(to newTab: Int) {
        let tabNames = ["products", "cart"]
        guard newTab < tabNames.count,
              let client = Embrace.client else { return }

        try? client.metadata.addProperty(
            key: "current_tab",
            value: tabNames[newTab],
            lifespan: .session
        )
    }
}
```

These examples demonstrate how to create comprehensive trace structures that provide deep insights into user behavior, performance bottlenecks, and application flow patterns.
