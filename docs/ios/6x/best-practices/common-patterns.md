---
title: Common Patterns
description: Common implementation patterns for the Embrace iOS SDK 6.x
sidebar_position: 4
---

# Common Implementation Patterns

This guide presents several common implementation patterns for the Embrace iOS SDK 6.x that can help you get the most value from mobile observability in your app.

## Structuring View Names for Better Analytics

### Hierarchical View Naming

For better organization in dashboards, use hierarchical names for your views by implementing the `EmbraceViewControllerCustomization` protocol:

```swift
// Implement the protocol on your view controllers to customize their names
class ProfileViewController: UIViewController, EmbraceViewControllerCustomization {
    var nameForViewControllerInEmbrace: String? { "profile/main" }
}

class ProfileEditViewController: UIViewController, EmbraceViewControllerCustomization {
    var nameForViewControllerInEmbrace: String? { "profile/edit" }
}

class ProfileSettingsViewController: UIViewController, EmbraceViewControllerCustomization {
    var nameForViewControllerInEmbrace: String? { "profile/settings" }
}

// For view controllers that should not be captured:
class InternalViewController: UIViewController, EmbraceViewControllerCustomization {
    var shouldCaptureViewInEmbrace: Bool { false }
}
```

## Tracking User Flows

### Tracing Multi-Step Processes

For complex user flows like checkout or onboarding:

```swift
class CheckoutCoordinator {
    private var checkoutSpan: Span?

    func startCheckout() {
        // Start a parent span for the whole checkout flow
        // You can add attributes through the builder or after starting the span
        checkoutSpan = Embrace.client?
            .buildSpan(
                name: "checkout_flow",
                attributes: [
                    "cart_value": String(cart.totalValue),
                    "items_count": String(cart.items.count)
                ]
            )
            .startSpan()

        navigateToShippingScreen()
    }

    func navigateToShippingScreen() {
        // Child span for the shipping step
        // Use if-let to avoid blocking navigation if span tracking fails
        if let parentSpan = checkoutSpan {
            let shippingSpan = Embrace.client?.buildSpan(name: "checkout_shipping")
                .setParent(parentSpan)
                .startSpan()
            // Span will be ended after shipping screen is shown
            shippingSpan?.end()
        }
        // Show shipping screen
        // ...
    }

    func navigateToPaymentScreen() {
        // Child span for the payment step
        // Use if-let to avoid blocking navigation if span tracking fails
        if let parentSpan = checkoutSpan {
            let paymentSpan = Embrace.client?.buildSpan(name: "checkout_payment")
                .setParent(parentSpan)
                .startSpan()
            // Span will be ended after payment screen is shown
            paymentSpan?.end()
        }
        // Show payment screen
        // ...
    }

    func completeCheckout(success: Bool) {
        // Record the outcome
        checkoutSpan?.setAttribute(key: "checkout_success", value: String(success))

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

To analyze API performance by endpoint category, create a custom request data source:

```swift
// Create a custom data source to modify requests before capture
class APIRequestDataSource: NSObject, URLSessionRequestsDataSource {
    func modifiedRequest(for request: URLRequest) -> URLRequest {
        // You can modify the request here if needed
        // For example, to sanitize URLs containing sensitive data
        guard let url = request.url else { return request }

        var modifiedRequest = request

        // Example: Remove sensitive query parameters
        if var components = URLComponents(url: url, resolvingAgainstBaseURL: false) {
            // Filter out sensitive parameters
            components.queryItems = components.queryItems?.filter { item in
                !["token", "api_key", "session_id"].contains(item.name)
            }

            if let sanitizedURL = components.url {
                modifiedRequest.url = sanitizedURL
            }
        }

        return modifiedRequest
    }
}

// Configure network capture with the custom data source
let requestsDataSource = APIRequestDataSource()
let networkOptions = URLSessionCaptureService.Options(
    injectTracingHeader: true,
    requestsDataSource: requestsDataSource,
    ignoredURLs: ["internal-analytics.company.com"]
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
        var attributes: [String: String] = [:]
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
            attributes["error_code"] = String(code)
        }

        // Log the error with consistent formatting
        Embrace.client?.log(errorMessage,
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
    let span = Embrace.client?.buildSpan(name: "feature_flags_initialization").startSpan()

    featureFlagSystem.initialize { flags in
        // Record which flags are active
        for (flagName, isEnabled) in flags {
            span?.setAttribute(key: "flag_\(flagName)", value: String(isEnabled))

            // Also add key flags as session attributes for easier filtering
            if ["new_checkout", "experimental_algorithm"].contains(flagName) {
                try? Embrace.client?.metadata?.addProperty(key: "flag_\(flagName)", value: String(isEnabled), lifespan: .session)
            }
        }

        span?.end()
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
        try? Embrace.client?.metadata?.addProperty(key: key, value: value, lifespan: permanent ? .permanent : .session)
    }
    // Implement other methods...
}

// Mock implementation for testing
class MockAnalyticsProvider: AnalyticsProvider {
    var loggedMessages: [(message: String, severity: LogSeverity, attributes: [String: String])] = []
    var builtSpans: [(name: String, type: SpanType)] = []
    var sessionProperties: [String: String] = [:]

    func log(_ message: String, severity: LogSeverity, attributes: [String: String] = [:]) {
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
    let span = Embrace.client?.buildSpan(name: "async_operation").startSpan()

    do {
        // First step
        span?.addEvent(name: "starting_first_step")
        let intermediateResult = try await firstStep()
        span?.addEvent(name: "completed_first_step")

        // Second step
        span?.addEvent(name: "starting_second_step")
        let finalResult = try await secondStep(intermediateResult)
        span?.addEvent(name: "completed_second_step")

        // Record success
        span?.setAttribute(key: "status", value: "success")
        span?.end()

        return finalResult
    } catch {
        // Record error details
        span?.setAttribute(key: "status", value: "error")
        span?.setAttribute(key: "error_type", value: String(describing: type(of: error)))
        span?.setAttribute(key: "error_message", value: error.localizedDescription)
        span?.end()

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

## SwiftUI-Specific Patterns

SwiftUI's reactive view system can present unique challenges for instrumentation. Views can re-render frequently due to state changes, and lifecycle methods may be called multiple times. These patterns help you avoid duplicate telemetry and create accurate user journey tracking.

:::tip Best Practice
For SwiftUI apps, **we strongly recommend using Embrace's view modifiers and macros** for automatic view tracking instead of manual breadcrumbs. These built-in tools handle view lifecycle complexities and prevent duplicate tracking automatically.

**Reserve manual instrumentation for:**
- **User actions** (button taps, form submissions, gestures)
- **Business logic events** (checkout completion, purchases, feature usage)
- **Custom workflows** that aren't automatically captured

This approach provides cleaner code, reduces instrumentation errors, and ensures consistent tracking across your app. The patterns shown below are for cases where manual instrumentation is necessary.
:::

### Avoiding Duplicate Breadcrumbs in View Lifecycle

SwiftUI views re-render when their state changes, which can cause `onAppear` to be called multiple times. This leads to duplicate breadcrumbs that inflate user flow metrics and incorrectly show high abandonment rates.

#### Problem: Duplicate Breadcrumbs

```swift
// AVOID: This will log multiple times as the view re-renders
struct CartView: View {
    var body: some View {
        VStack {
            Text("Shopping Cart")
        }
        .onAppear {
            // This gets called every time the view appears or re-renders
            Embrace.client?.add(event: .breadcrumb("Cart Page Viewed"))
        }
    }
}
```

#### Solution 1: State-Based Tracking

Use `@State` to track whether the breadcrumb has been logged:

```swift
// RECOMMENDED: Logs once per view lifecycle
struct CartView: View {
    @State private var hasLoggedView = false

    var body: some View {
        VStack {
            Text("Shopping Cart")
        }
        .onAppear {
            guard !hasLoggedView else { return }
            Embrace.client?.add(event: .breadcrumb("Cart Page Viewed"))
            hasLoggedView = true
        }
    }
}
```

#### Solution 2: ViewModel-Based Tracking

Move breadcrumb logic to a ViewModel with built-in duplicate protection:

```swift
// RECOMMENDED: Centralized tracking with protection
class CartViewModel: ObservableObject {
    private var hasTrackedView = false

    func trackPageView() {
        guard !hasTrackedView else { return }
        Embrace.client?.add(event: .breadcrumb("Cart Page Viewed"))
        hasTrackedView = true
    }
}

struct CartView: View {
    @StateObject private var viewModel = CartViewModel()

    var body: some View {
        VStack {
            Text("Shopping Cart")
        }
        .onAppear {
            viewModel.trackPageView()
        }
    }
}
```

#### Solution 3: Task-Based Approach

For iOS 15+, use the `.task` modifier which provides better lifecycle management:

```swift
// RECOMMENDED: Task automatically cancels when view disappears
struct CheckoutView: View {
    var body: some View {
        VStack {
            Text("Checkout")
        }
        .task {
            // Runs once when view appears, cancels when view disappears
            Embrace.client?.add(event: .breadcrumb("Checkout Page Viewed"))
        }
    }
}
```

### Navigation-Based Breadcrumb Tracking

For simple navigation flows, track breadcrumbs in navigation events rather than view lifecycle:

```swift
struct ProductListView: View {
    @State private var selectedProduct: Product?

    var body: some View {
        NavigationStack {
            List(products) { product in
                NavigationLink(value: product) {
                    ProductRow(product: product)
                }
            }
            .navigationDestination(for: Product.self) { product in
                ProductDetailView(product: product)
                    .onAppear {
                        // Track navigation event, not view appearance
                        Embrace.client?.add(event: .breadcrumb(
                            "Product Detail Viewed",
                            properties: ["product_id": product.id]
                        ))
                    }
            }
        }
    }
}
```

:::note
For more complex navigation flows with multiple steps or when you need centralized navigation tracking, consider using a coordinator pattern as shown in the [Multi-Step Form Tracking](#multi-step-form-tracking) section below.
:::

### User Action Tracking in SwiftUI

Track user actions in event handlers rather than view rendering methods:

```swift
struct AddToCartButton: View {
    let product: Product
    @EnvironmentObject var cart: CartManager

    var body: some View {
        Button("Add to Cart") {
            // Track user action when button is tapped
            Embrace.client?.add(event: .breadcrumb(
                "Product Added to Cart",
                properties: [
                    "product_id": product.id,
                    "product_name": product.name,
                    "product_price": String(product.price)
                ]
            ))

            cart.add(product)
        }
    }
}
```

### Multi-Step Form Tracking

Track form progression without duplicates using a coordinator:

```swift
class CheckoutFlowCoordinator: ObservableObject {
    @Published var currentStep: CheckoutStep = .shipping
    private var trackedSteps: Set<CheckoutStep> = []

    func trackStep(_ step: CheckoutStep) {
        guard !trackedSteps.contains(step) else { return }

        Embrace.client?.add(event: .breadcrumb(
            "Checkout Step Viewed",
            properties: ["step": step.rawValue]
        ))

        trackedSteps.insert(step)
    }

    func advanceToStep(_ step: CheckoutStep) {
        currentStep = step
        trackStep(step)
    }
}

struct CheckoutFlow: View {
    @StateObject private var coordinator = CheckoutFlowCoordinator()

    var body: some View {
        VStack {
            switch coordinator.currentStep {
            case .shipping:
                ShippingView(coordinator: coordinator)
            case .payment:
                PaymentView(coordinator: coordinator)
            case .review:
                ReviewView(coordinator: coordinator)
            }
        }
        .onAppear {
            coordinator.trackStep(.shipping)
        }
    }
}
```

### Observable Macro Pattern (iOS 17+)

For apps using the `@Observable` macro, use a similar pattern:

```swift
@Observable
class ProductViewModel {
    private var hasTrackedView = false

    func trackProductView(productId: String) {
        guard !hasTrackedView else { return }

        Embrace.client?.add(event: .breadcrumb(
            "Product Viewed",
            properties: ["product_id": productId]
        ))

        hasTrackedView = true
    }
}
```

### Best Practices Summary for SwiftUI

**Avoid placing breadcrumbs in:**

- View body computations
- `@Published` property observers that trigger on UI updates
- Conditional rendering blocks (e.g., `if/else` statements in view body)
- High-frequency SwiftUI modifiers (e.g., `.onChange` for text field input)

**Recommended placement:**

- `.onAppear` with duplicate protection using `@State`
- User action handlers (button taps, gestures, form submissions)
- Navigation transition events
- ViewModel methods with built-in tracking flags
- `.task` modifier for iOS 15+

SwiftUI's reactive rendering requires explicit duplicate prevention. Use state-based guards or move tracking logic to ViewModels with built-in protection to ensure accurate telemetry.

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
- SwiftUI duplicate prevention and lifecycle management

By applying these patterns in your app, you'll create a more comprehensive and useful observability implementation.
