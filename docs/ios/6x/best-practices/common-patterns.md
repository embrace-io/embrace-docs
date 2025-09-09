---
title: Common Patterns
description: Common implementation patterns for the Embrace iOS SDK 6.x
sidebar_position: 4
---

# Common Implementation Patterns

This guide presents several common implementation patterns for the Embrace iOS SDK 6.x that can help you get the most value from mobile observability in your app.

## Structuring View Names for Better Analytics

### Hierarchical View Naming

For better organization in dashboards, use hierarchical names for your views:

```swift
// Configure a consistent view naming strategy
let viewOptions = ViewCaptureServiceOptions(
    nameForViewController: { viewController in
        switch viewController {
        case is ProfileViewController:
            return "profile/main"
        case is ProfileEditViewController:
            return "profile/edit"
        case is ProfileSettingsViewController:
            return "profile/settings"
        default:
            // Default to class name
            return String(describing: type(of: viewController))
        }
    }
)
```

## Tracking User Flows

### Tracing Multi-Step Processes

For complex user flows like checkout or onboarding:

```swift
class CheckoutCoordinator {
    private var checkoutSpan: Span?

    func startCheckout() {
        // Start a parent span for the whole checkout flow
        checkoutSpan = Embrace.client.startSpan(name: "checkout_flow")
        checkoutSpan?.setAttribute(key: "cart_value", value: cart.totalValue)
        checkoutSpan?.setAttribute(key: "items_count", value: cart.items.count)

        navigateToShippingScreen()
    }

    func navigateToShippingScreen() {
        // Child span for the shipping step
        let shippingSpan = Embrace.client.startSpan(name: "checkout_shipping", parent: checkoutSpan)
        // Show shipping screen
        // ...
        shippingSpan.end()
    }

    func navigateToPaymentScreen() {
        // Child span for the payment step
        let paymentSpan = Embrace.client.startSpan(name: "checkout_payment", parent: checkoutSpan)
        // Show payment screen
        // ...
        paymentSpan.end()
    }

    func completeCheckout(success: Bool) {
        // Record the outcome
        checkoutSpan?.setAttribute(key: "checkout_success", value: success)

        // Log a business event
        if success {
            Embrace.client?.log("Checkout completed successfully", 
                               severity: .info,
                               attributes: ["order_id": orderId])
        } else {
            Embrace.client?.log("Checkout failed", 
                               severity: .warn,
                               attributes: ["failure_reason": failureReason])
        }

        // End the parent span
        checkoutSpan?.end()
        checkoutSpan = nil
    }
}
```

## Handling Network Requests

### Tracking API Performance by Endpoint

To analyze API performance by endpoint category:

```swift
// Set up network options with endpoint categorization
let networkOptions = NetworkCaptureServiceOptions(
    urlSanitizer: { url in
        // Keep the original URL
        return url
    },
    urlAttributeExtractor: { url in
        // Extract endpoint category and version
        var attributes: [String: String] = [:]

        if let host = url.host {
            attributes["api_host"] = host
        }

        // Categorize endpoints
        if url.path.contains("/v2/products") {
            attributes["endpoint_type"] = "product_api"
            attributes["api_version"] = "v2"
        } else if url.path.contains("/v1/users") {
            attributes["endpoint_type"] = "user_api"
            attributes["api_version"] = "v1"
        }

        return attributes
    }
)
```

## Error Tracking and Categorization

### Consistent Error Logging

Establish a consistent error logging pattern:

```swift
enum AppError: Error {
    case networkFailure(underlying: Error)
    case dataParsingFailure(reason: String)
    case businessLogicError(code: Int, message: String)
    // Other error types...
}

// Extension to provide consistent error logging
extension AppError {
    func logToEmbrace() {
        var attributes: [String: Any] = [:]
        var errorName = ""
        var errorMessage = ""

        switch self {
        case .networkFailure(let error):
            errorName = "network_failure"
            errorMessage = error.localizedDescription
            attributes["underlying_error"] = String(describing: error)

        case .dataParsingFailure(let reason):
            errorName = "parsing_failure"
            errorMessage = reason

        case .businessLogicError(let code, let message):
            errorName = "business_logic_error"
            errorMessage = message
            attributes["error_code"] = code
        }

        // Log the error with consistent formatting
        Embrace.client.log(errorMessage, 
                           severity: .error,
                           attributes: attributes)
    }
}

// Usage
func fetchData() {
    apiClient.fetch() { result in
        switch result {
        case .success(let data):
            // Handle success
        case .failure(let error):
            let appError = AppError.networkFailure(underlying: error)
            appError.logToEmbrace()
        }
    }
}
```

## Feature Flagging Integration

### Tracking Feature Flag Impact

If your app uses feature flags, track their effect on performance:

```swift
func initializeFeatureFlags() {
    // Start a span for feature flag initialization
    let span = Embrace.client.startSpan(name: "feature_flags_initialization")

    featureFlagSystem.initialize { flags in
        // Record which flags are active
        for (flagName, isEnabled) in flags {
            span.setAttribute(key: "flag_\(flagName)", value: isEnabled)

            // Also add key flags as session attributes for easier filtering
            if ["new_checkout", "experimental_algorithm"].contains(flagName) {
                Embrace.client.addSessionAttribute(key: "flag_\(flagName)", value: isEnabled)
            }
        }

        span.end()
    }
}
```

## Dependency Injection Pattern

### SDK Abstraction for Testing

Create an abstraction for the Embrace SDK to facilitate testing:

```swift
protocol AnalyticsProvider {
    func log(_ message: String, severity: LogSeverity, attributes: [String: String])
    func buildSpan(name: String, type: SpanType) -> SpanBuilder
    func addSessionProperty(key: String, value: String, permanent: Bool)
    // Other methods...
}

// Production implementation
class EmbraceAnalyticsProvider: AnalyticsProvider {
    func log(_ message: String, severity: LogSeverity, attributes: [String: String] = [:]) {
        Embrace.client?.log(message, severity: severity, attributes: attributes ?? [:])
    }

    func buildSpan(name: String, type: SpanType) -> SpanBuilder {
        return Embrace.client?.buildSpan(name: name, type: type) ?? EmptySpanBuilder()
    }

    func addSessionProperty(key: String, value: String, permanent: Bool) {
        Embrace.client?.metadata?.addProperty(key: key, value: value, lifespan: permanent ? .permanent : .session)
    }
    // Implement other methods...
}

// Mock implementation for testing
class MockAnalyticsProvider: AnalyticsProvider {
    var loggedMessages: [(message: String, severity: LogSeverity, attributes: [String: String])] = []
    var builtSpans: [(name: String, type: SpanType)] = []
    var sessionProperties: [String: String] = [:]

    func log(_ message: String, severity: LogSeverity, attributes: [String: String]?) {
        loggedMessages.append((message, severity, attributes))
    }

    func buildSpan(name: String, type: SpanType) -> SpanBuilder {
        builtSpans.append((name, type))
        return MockSpanBuilder(name: name)
    }

    func addSessionProperty(key: String, value: String, permanent: Bool) {
        sessionProperties[key] = value
    }
    // Implement other methods...
}

// Usage in your app
class AppFeature {
    private let analytics: AnalyticsProvider

    init(analytics: AnalyticsProvider = EmbraceAnalyticsProvider()) {
        self.analytics = analytics
    }

    func performAction() {
        let span = analytics.buildSpan(name: "perform_action", type: .performance).startSpan()
        // Do something
        analytics.log("Action performed", severity: .info, attributes: [:])
        span.end()
    }
}
```

## Handling Asynchronous Operations

### Tracing Asynchronous Tasks

For long-running asynchronous operations:

```swift
func performAsyncTask() async throws -> Result {
    // Start a span for the entire async operation
    let span = Embrace.client.startSpan(name: "async_operation")

    do {
        // First step
        span.addEvent(name: "starting_first_step")
        let intermediateResult = try await firstStep()
        span.addEvent(name: "completed_first_step")

        // Second step
        span.addEvent(name: "starting_second_step")
        let finalResult = try await secondStep(intermediateResult)
        span.addEvent(name: "completed_second_step")

        // Record success
        span.setAttribute(key: "status", value: "success")
        span.end()

        return finalResult
    } catch {
        // Record error details
        span.setAttribute(key: "status", value: "error")
        span.setAttribute(key: "error_type", value: String(describing: type(of: error)))
        span.setAttribute(key: "error_message", value: error.localizedDescription)
        span.end()

        throw error
    }
}
```

## Handling Background Tasks

### Background Session Management

For monitoring background tasks:

```swift
class BackgroundTaskManager {
    func beginBackgroundTask(identifier: String) {
        // Log the start of a background task
        Embrace.client?.log("Background task started", 
                           severity: .info,
                           attributes: ["task_id": identifier])

        // Begin UIApplication background task
        var backgroundTaskID = UIBackgroundTaskIdentifier.invalid
        backgroundTaskID = UIApplication.shared.beginBackgroundTask(withName: identifier) {
            // Log when the background task is about to expire
            Embrace.client?.log("Background task expiring", 
                               severity: .warn,
                               attributes: ["task_id": identifier])

            UIApplication.shared.endBackgroundTask(backgroundTaskID)
        }

        // Store the background task ID
        backgroundTaskIDs[identifier] = backgroundTaskID
    }

    func endBackgroundTask(identifier: String) {
        guard let taskID = backgroundTaskIDs[identifier] else { return }

        // Log the completion of a background task
        Embrace.client?.log("Background task completed", 
                           severity: .info,
                           attributes: ["task_id": identifier])

        // End the UIApplication background task
        UIApplication.shared.endBackgroundTask(taskID)
        backgroundTaskIDs.removeValue(forKey: identifier)
    }

    private var backgroundTaskIDs: [String: UIBackgroundTaskIdentifier] = [:]
}
```

## Summary

These implementation patterns showcase best practices for:

- Organizing view names for better analytics
- Tracking multi-step user flows with parent/child spans
- Analyzing API performance by endpoint category
- Consistent error tracking and categorization  
- Feature flag impact tracking
- Dependency injection for testing
- Asynchronous operation tracing
- Background task monitoring

By applying these patterns in your app, you'll create a more comprehensive and useful observability implementation.

<!-- TODO: Add patterns for SwiftUI apps specifically  -->
