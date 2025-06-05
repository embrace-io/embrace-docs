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
    type: .performance
) { span in
    // Your code here
    let result = performCalculation()

    // Add attributes to the span
    span?.setAttribute(key: "calculation_result", value: result.description)

    return result
}
```

### Async Operations

For asynchronous operations, start the span before the operation begins and end it when the operation completes:

```swift
let span = Embrace.client?.buildSpan(
    name: "network_request", 
    type: .performance
).startSpan()

performAsyncOperation { result, error in
    if let error = error {
        span.recordError(error)
        span.setStatus(.error)
    } else {
        span.setAttribute(key: "result_count", value: result.count.description)
    }
    span.end()
}
```

## Span Attributes

Add context to your spans with attributes:

```swift
let span = Embrace.client?.buildSpan(
    name: "checkout_process", 
    type: .performance
).startSpan()

span.setAttribute(key: "cart_item_count", value: "5")
span.setAttribute(key: "total_amount", value: "99.99")
span.setAttribute(key: "payment_method", value: "credit_card")

// Complete checkout process

span.end()
```

You can add attributes at any point before the span is ended.

## Span Hierarchy

Create parent-child relationships between spans to represent nested operations:

```swift
let parentSpan = Embrace.client?.buildSpan(
    name: "data_sync", 
    type: .performance
).startSpan()

// Start a child span
let childSpan = Embrace.client?.buildSpan(
    name: "fetch_remote_data", 
    type: .performance
)
.setParent(parentSpan)
.startSpan()

fetchRemoteData { result in
    childSpan.end()

    // Create another child span
    let processSpan = Embrace.client?.buildSpan(
        name: "process_data", 
        type: .performance
    )
    .setParent(parentSpan)
    .startSpan()
    
    processData(result) { success in
        processSpan.end()
        parentSpan.end()
    }
}
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
- `.performance` - For performance monitoring
- `.ux` - For user experience tracking
- `.system` - For system-level operations

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
let span = Embrace.client?.buildSpan(
    name: "important_operation", 
    type: .performance
).startSpan()
defer { span.end() }

// Your code here, even if it throws an exception, span will be ended
```

### Capturing Meaningful Data

Add attributes that would be useful for troubleshooting:

```swift
span.setAttribute(key: "user_tier", value: "premium")
span.setAttribute(key: "data_size", value: dataSize.description)
span.setAttribute(key: "retry_count", value: retryCount.description)
```

## Common Use Cases

### API Client Instrumentation

```swift
func fetchUserProfile(userId: String, completion: @escaping (Result<UserProfile, Error>) -> Void) {
    let span = Embrace.client?.buildSpan(
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
            span.status = .error(description: "API request failed")
            span.end()
            completion(.failure(error))
        }
    }
}
```

### Database Operations

```swift
func saveUserPreferences(preferences: Preferences) throws {
    let span = Embrace.client?.buildSpan(
        name: "db_save_preferences", 
        type: .performance
    ).startSpan()
    defer { span.end() }

    span.setAttribute(key: "preference_count", value: preferences.count.description)

    do {
        try database.write { transaction in
            transaction.setObject(preferences, forKey: "user_preferences")
        }
    } catch let error {
        span.setAttribute(key: "error.message", value: error.localizedDescription)
        span.status = .error(description: "Database save failed")
        throw error
    }
}
```

### Performance-Critical Algorithms

```swift
func processFeed(posts: [Post]) -> [ProcessedPost] {
    let span = Embrace.client?.buildSpan(
        name: "algorithm_feed_processing", 
        type: .performance
    ).startSpan()
    span.setAttribute(key: "post_count", value: posts.count.description)

    // Measure the main processing algorithm
    let result = performFeedProcessing(posts)

    span.setAttribute(key: "processed_count", value: result.count.description)
    span.end()

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
        let transitionSpan = Embrace.client?.buildSpan(
            name: "screen_transition",
            type: .ux,
            attributes: [
                "transition.from": from,
                "transition.to": to
            ]
        )
        .setParent(userJourneySpan)
        .startSpan()
        
        // Track the transition duration
        defer { transitionSpan?.end() }
        
        // Add transition-specific events
        transitionSpan?.addEvent(name: "transition_started")
        
        // Simulate transition work
        performTransition(from: from, to: to) { success in
            if success {
                transitionSpan?.addEvent(name: "transition_completed")
            } else {
                transitionSpan?.status = .error(description: "Navigation failed")
                transitionSpan?.addEvent(name: "transition_failed")
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
        )
        .setParent(gameSpan)
        .startSpan()
    }
    
    func recordUserAction(action: String, isCorrect: Bool, reactionTime: TimeInterval) {
        let actionSpan = Embrace.client?.buildSpan(
            name: "user_action",
            type: .ux,
            attributes: [
                "action.type": action,
                "action.correct": String(isCorrect),
                "action.reaction_time_ms": String(Int(reactionTime * 1000))
            ]
        )
        .setParent(roundSpan)
        .startSpan()
        
        if !isCorrect {
            actionSpan?.status = .error(description: "Incorrect user action")
        }
        
        actionSpan?.end()
    }
    
    func endRound(score: Int, success: Bool) {
        roundSpan?.setAttribute(key: "round.score", value: String(score))
        roundSpan?.setAttribute(key: "round.success", value: String(success))
        
        if !success {
            roundSpan?.status = .error(description: "Round failed")
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
        let stepSpan = Embrace.client?.buildSpan(
            name: "checkout_step",
            type: .ux,
            attributes: [
                "step.name": step,
                "step.timestamp": ISO8601DateFormatter().string(from: Date())
            ]
        )
        .setParent(checkoutSpan)
        .startSpan()
        
        if let duration = duration {
            stepSpan?.setAttribute(key: "step.duration_ms", value: String(Int(duration * 1000)))
        }
        
        return stepSpan
    }
    
    func trackPaymentFlow(paymentMethod: String) {
        let paymentSpan = Embrace.client?.buildSpan(
            name: "payment_processing",
            type: .ux,
            attributes: [
                "payment.method": paymentMethod
            ]
        )
        .setParent(checkoutSpan)
        .startSpan()
        
        // Track payment validation
        let validationSpan = Embrace.client?.buildSpan(
            name: "payment_validation",
            type: .performance
        )
        .setParent(paymentSpan)
        .startSpan()
        
        // Simulate payment processing
        DispatchQueue.main.asyncAfter(deadline: .now() + 2.0) {
            validationSpan?.end()
            
            // Track payment completion
            paymentSpan?.setAttribute(key: "payment.status", value: "completed")
            paymentSpan?.end()
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
                checkoutSpan?.status = .error(description: "Checkout failed")
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
        guard newTab < tabNames.count else { return }
        
        try? Embrace.client?.metadata.addProperty(
            key: "current_tab",
            value: tabNames[newTab],
            lifespan: .session
        )
    }
}
```

These examples demonstrate how to create comprehensive trace structures that provide deep insights into user behavior, performance bottlenecks, and application flow patterns.
