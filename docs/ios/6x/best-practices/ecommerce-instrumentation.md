---
title: E-commerce Instrumentation Best Practices
description: Best practices for instrumenting e-commerce iOS apps with Embrace SDK 6.x to track user journeys and optimize business metrics
sidebar_position: 5
---

# E-commerce Instrumentation Best Practices

This guide provides comprehensive best practices for instrumenting e-commerce iOS applications with the Embrace SDK 6.x. Learn how to effectively track user journeys, monitor critical business flows, and optimize your app's performance for maximum conversion.

## Overview

E-commerce apps require specialized instrumentation to track complex user journeys, monitor critical business flows, and identify optimization opportunities. The Embrace SDK provides multiple telemetry types that work together to give you comprehensive visibility into your app's performance and user experience.

### Key E-commerce User Journeys

Most e-commerce apps center around these critical user flows:

1. **Authentication Flow** - User login, registration, and account management
2. **Product Discovery** - Search, browsing, filtering, and product viewing
3. **Purchase Flow** - Cart management, checkout, payment, and order completion
4. **Post-Purchase** - Order tracking, reviews, and customer support

## Authentication Flow Instrumentation

### Login Journey Tracking

Track the complete login experience using breadcrumbs and spans:

```swift
// INCORRECT (Legacy API)
Embrace.client?.addBreadcrumb("User login started")

// CORRECT (Embrace 6.x API)
Embrace.client?.add(event: .breadcrumb("USER_LOGIN_STARTED_EMAIL"))
```

#### Complete Login Flow Implementation

```swift
class AuthenticationManager {
    private let embraceService = EmbraceService.shared

    func signInWithEmail(email: String, password: String) async {
        // Start performance tracking
        let span = Embrace.client?.buildSpan(
            name: "email_sign_in",
            type: .performance
        ).startSpan()

        // Track login attempt
        Embrace.client?.add(event: .breadcrumb("USER_LOGIN_STARTED_EMAIL"))

        span?.setAttribute(key: "auth.method", value: "email")
        span?.setAttribute(key: "auth.provider", value: "firebase")

        do {
            let result = try await authenticateUser(email: email, password: password)

            if result.success {
                // Track successful login
                Embrace.client?.add(event: .breadcrumb("USER_LOGIN_SUCCESS_EMAIL"))

                // Add user context to session
                Embrace.client?.metadata?.addProperty(
                    key: "user_id",
                    value: result.userId,
                    lifespan: .permanent
                )

                span?.setAttribute(key: "auth.success", value: "true")
            } else {
                // Track login failure
                Embrace.client?.add(event: .breadcrumb("USER_LOGIN_FAILED_EMAIL"))

                span?.setAttribute(key: "auth.success", value: "false")
                span?.setAttribute(key: "failure_reason", value: result.errorMessage)
            }
        } catch {
            Embrace.client?.add(event: .breadcrumb("USER_LOGIN_ERROR_EMAIL"))

            span?.setAttribute(key: "auth.success", value: "false")
            span?.setAttribute(key: "error.message", value: error.localizedDescription)
        }

        span?.end()
    }
}
```

### Multi-Provider Authentication

For apps supporting multiple authentication providers:

```swift
// Track different authentication methods
Embrace.client?.add(event: .breadcrumb("USER_LOGIN_STARTED_GOOGLE"))
Embrace.client?.add(event: .breadcrumb("USER_LOGIN_STARTED_APPLE"))
Embrace.client?.add(event: .breadcrumb("USER_LOGIN_STARTED_FACEBOOK"))

// Track biometric authentication
Embrace.client?.add(event: .breadcrumb("USER_LOGIN_STARTED_BIOMETRIC"))
Embrace.client?.add(event: .breadcrumb("USER_LOGIN_SUCCESS_BIOMETRIC"))
```

## Purchase Flow Instrumentation

### Multi-Stage Checkout Tracking

Track the complete checkout process with breadcrumbs and custom spans:

```swift
class CheckoutCoordinator: ObservableObject {
    private let embraceService = EmbraceService.shared

    init(cartManager: CartManager) {
        // Track checkout initiation
        Embrace.client?.add(event: .breadcrumb("CHECKOUT_STARTED"))

        // Start checkout performance tracking
        let span = Embrace.client?.buildSpan(
            name: "checkout_flow",
            type: .performance
        ).startSpan()

        span?.setAttribute(key: "cart.items_count", value: String(cartManager.totalItems))
        span?.setAttribute(key: "cart.total_value", value: String(cartManager.subtotal))
    }

    func completeShippingStep() {
        // Track shipping completion
        Embrace.client?.add(event: .breadcrumb("CHECKOUT_SHIPPING_COMPLETED"))

        // Log structured data for analytics
        Embrace.client?.log(
            "Shipping information completed",
            severity: .info,
            attributes: [
                "shipping_method": selectedShippingMethod.name,
                "shipping_cost": String(selectedShippingMethod.cost),
                "delivery_estimate": selectedShippingMethod.estimatedDays
            ]
        )
    }

    func completePaymentStep() {
        // Track payment completion
        Embrace.client?.add(event: .breadcrumb("CHECKOUT_PAYMENT_COMPLETED"))

        Embrace.client?.log(
            "Payment information completed",
            severity: .info,
            attributes: [
                "payment_method": selectedPaymentMethod.type,
                "payment_provider": selectedPaymentMethod.provider
            ]
        )
    }

    func placeOrder() async -> Result<Order, Error> {
        // Track order placement attempt
        Embrace.client?.add(event: .breadcrumb("PLACE_ORDER_INITIATED"))

        do {
            let order = try await processOrder()

            // Track successful order completion
            Embrace.client?.add(event: .breadcrumb("ORDER_PLACED_SUCCESS"))

            // Log business metrics
            Embrace.client?.log(
                "Order placed successfully",
                severity: .info,
                attributes: [
                    "order_id": order.id,
                    "order_total": String(order.total),
                    "items_count": String(order.items.count),
                    "payment_method": order.paymentMethod.type
                ]
            )

            return .success(order)
        } catch {
            // Track order failure
            Embrace.client?.add(event: .breadcrumb("ORDER_PLACED_FAILED"))

            Embrace.client?.log(
                "Order placement failed",
                severity: .error,
                attributes: [
                    "error_type": String(describing: type(of: error)),
                    "error_message": error.localizedDescription,
                    "cart_value": String(cartTotal)
                ]
            )

            return .failure(error)
        }
    }
}
```

### Payment Processing Monitoring

Track payment processing with detailed error handling:

```swift
class PaymentProcessor {
    func processPayment(amount: Double, method: PaymentMethod) async -> PaymentResult {
        let span = Embrace.client?.buildSpan(
            name: "payment_processing",
            type: .performance
        ).startSpan()

        // Track payment attempt
        Embrace.client?.add(event: .breadcrumb("PAYMENT_PROCESSING_STARTED"))

        span?.setAttribute(key: "payment.amount", value: String(amount))
        span?.setAttribute(key: "payment.method", value: method.type)
        span?.setAttribute(key: "payment.provider", value: method.provider)

        do {
            let result = try await processWithProvider(amount: amount, method: method)

            if result.success {
                Embrace.client?.add(event: .breadcrumb("PAYMENT_PROCESSING_SUCCESS"))

                span?.setAttribute(key: "payment.success", value: "true")
                span?.setAttribute(key: "payment.transaction_id", value: result.transactionId)
            } else {
                Embrace.client?.add(event: .breadcrumb("PAYMENT_PROCESSING_FAILED"))

                span?.setAttribute(key: "payment.success", value: "false")
                span?.setAttribute(key: "payment.error_code", value: result.errorCode)

                // Log payment failure for analysis
                Embrace.client?.log(
                    "Payment processing failed",
                    severity: .error,
                    attributes: [
                        "payment_amount": String(amount),
                        "payment_method": method.type,
                        "error_code": result.errorCode,
                        "error_message": result.errorMessage
                    ]
                )
            }

            return result
        } catch {
            Embrace.client?.add(event: .breadcrumb("PAYMENT_PROCESSING_ERROR"))

            span?.setAttribute(key: "payment.success", value: "false")
            span?.setAttribute(key: "error.message", value: error.localizedDescription)

            throw error
        } finally {
            span?.end()
        }
    }
}
```

## Product Discovery Instrumentation

### Search and Browse Tracking

Monitor how users discover and interact with products:

```swift
class ProductSearchManager {
    func performSearch(query: String, filters: [String: String] = [:]) async {
        let span = Embrace.client?.buildSpan(
            name: "product_search",
            type: .performance
        ).startSpan()

        // Track search attempt
        Embrace.client?.add(event: .breadcrumb("PRODUCT_SEARCH_PERFORMED"))

        span?.setAttribute(key: "search.query", value: query)
        span?.setAttribute(key: "search.filters_count", value: String(filters.count))

        do {
            let results = try await searchProducts(query: query, filters: filters)

            // Track search completion
            Embrace.client?.add(event: .breadcrumb("PRODUCT_SEARCH_COMPLETED"))

            // Log search analytics
            Embrace.client?.log(
                "Product search completed",
                severity: .info,
                attributes: [
                    "search_query": query,
                    "results_count": String(results.count),
                    "search_duration_ms": String(span?.duration ?? 0),
                    "has_filters": String(!filters.isEmpty)
                ]
            )

            span?.setAttribute(key: "search.results_count", value: String(results.count))
        } catch {
            Embrace.client?.log(
                "Product search failed",
                severity: .error,
                attributes: [
                    "search_query": query,
                    "error_message": error.localizedDescription
                ]
            )
        }

        span?.end()
    }
}
```

### Product Interaction Tracking

Track detailed product engagement:

```swift
class ProductDetailViewController: UIViewController {
    func trackProductView(product: Product) {
        // Track product view
        Embrace.client?.add(event: .breadcrumb("PRODUCT_VIEWED"))

        let span = Embrace.client?.buildSpan(
            name: "product_view",
            type: .performance
        ).startSpan()

        span?.setAttribute(key: "product.id", value: product.id)
        span?.setAttribute(key: "product.category", value: product.category)
        span?.setAttribute(key: "product.price", value: String(product.price))
        span?.setAttribute(key: "product.availability", value: product.inStock ? "in_stock" : "out_of_stock")

        // Log for business analytics
        Embrace.client?.log(
            "Product viewed",
            severity: .info,
            attributes: [
                "product_id": product.id,
                "product_name": product.name,
                "product_category": product.category,
                "product_price": String(product.price)
            ]
        )

        span?.end()
    }

    func trackAddToCart(product: Product, quantity: Int) {
        Embrace.client?.add(event: .breadcrumb("PRODUCT_ADDED_TO_CART"))

        let span = Embrace.client?.buildSpan(
            name: "add_to_cart",
            type: .performance
        ).startSpan()

        span?.setAttribute(key: "product.id", value: product.id)
        span?.setAttribute(key: "cart.quantity", value: String(quantity))
        span?.setAttribute(key: "cart.item_value", value: String(product.price * Double(quantity)))

        Embrace.client?.log(
            "Product added to cart",
            severity: .info,
            attributes: [
                "product_id": product.id,
                "quantity": String(quantity),
                "total_value": String(product.price * Double(quantity))
            ]
        )

        span?.end()
    }
}
```

## User Journey Configuration in Embrace Dashboard

### Setting Up User Flows

Based on your Embrace dashboard screenshots, you can create comprehensive user flows using different event types:

#### 1. Authentication Flow Configuration

**Flow Name:** "User Authentication Journey"
**Description:** "Track user login and registration success rates"

- **Start Event:**
  - Type: `Breadcrumb`
  - Pattern: `USER_LOGIN_STARTED_*`
- **End Event:**
  - Type: `Breadcrumb`
  - Pattern: `USER_LOGIN_SUCCESS_*` OR `USER_LOGIN_FAILED_*`
- **Timeout:** 120,000ms (2 minutes)

#### 2. Purchase Flow Configuration

**Flow Name:** "E-commerce Purchase Funnel"
**Description:** "User journey from product discovery through checkout completion"

- **Start Event:**
  - Type: `Log`
  - Pattern: `Product viewed` (from log messages)
- **End Event:**
  - Type: `Log`
  - Pattern: `Order placed successfully` (from log messages)
- **Timeout:** 1,800,000ms (30 minutes)

#### 3. Cart Abandonment Flow

**Flow Name:** "Cart Abandonment Analysis"
**Description:** "Track users who add items to cart but don't complete purchase"

- **Start Event:**
  - Type: `Breadcrumb`
  - Pattern: `PRODUCT_ADDED_TO_CART`
- **End Event:**
  - Type: `Breadcrumb`
  - Pattern: `ORDER_PLACED_SUCCESS`
- **Timeout:** 7,200,000ms (2 hours)

## Network Request Instrumentation

### API Performance Monitoring

Track e-commerce API performance with detailed categorization:

```swift
let networkOptions = NetworkCaptureServiceOptions(
    urlSanitizer: { url in
        // Keep original URL for analysis
        return url
    },
    urlAttributeExtractor: { url in
        var attributes: [String: String] = [:]

        // Categorize e-commerce endpoints
        if url.path.contains("/api/v1/products") {
            attributes["endpoint_type"] = "product_api"
            attributes["api_version"] = "v1"
        } else if url.path.contains("/api/v2/cart") {
            attributes["endpoint_type"] = "cart_api"
            attributes["api_version"] = "v2"
        } else if url.path.contains("/api/v1/checkout") {
            attributes["endpoint_type"] = "checkout_api"
            attributes["api_version"] = "v1"
        } else if url.path.contains("/api/v1/auth") {
            attributes["endpoint_type"] = "auth_api"
            attributes["api_version"] = "v1"
        }

        // Add environment context
        if let host = url.host {
            attributes["api_environment"] = host.contains("staging") ? "staging" : "production"
        }

        return attributes
    }
)
```

## Error Tracking and Categorization

### E-commerce Specific Error Handling

Create consistent error tracking patterns for common e-commerce scenarios:

```swift
enum EcommerceError: Error {
    case productNotAvailable(productId: String)
    case paymentDeclined(reason: String)
    case inventoryInsufficient(requested: Int, available: Int)
    case shippingUnavailable(zipCode: String)
    case priceChanged(originalPrice: Double, newPrice: Double)
}

extension EcommerceError {
    func logToEmbrace() {
        var attributes: [String: String] = [:]
        var errorCategory = ""
        var severity: LogSeverity = .error

        switch self {
        case .productNotAvailable(let productId):
            errorCategory = "inventory_error"
            attributes["product_id"] = productId
            attributes["error_type"] = "product_unavailable"

        case .paymentDeclined(let reason):
            errorCategory = "payment_error"
            attributes["decline_reason"] = reason
            attributes["error_type"] = "payment_declined"

        case .inventoryInsufficient(let requested, let available):
            errorCategory = "inventory_error"
            attributes["requested_quantity"] = String(requested)
            attributes["available_quantity"] = String(available)
            attributes["error_type"] = "insufficient_inventory"

        case .shippingUnavailable(let zipCode):
            errorCategory = "shipping_error"
            attributes["zip_code"] = zipCode
            attributes["error_type"] = "shipping_unavailable"
            severity = .warn

        case .priceChanged(let originalPrice, let newPrice):
            errorCategory = "pricing_error"
            attributes["original_price"] = String(originalPrice)
            attributes["new_price"] = String(newPrice)
            attributes["error_type"] = "price_changed"
            severity = .warn
        }

        attributes["error_category"] = errorCategory

        Embrace.client?.log(
            localizedDescription,
            severity: severity,
            attributes: attributes
        )
    }
}
```

## Performance Optimization

### Critical Performance Patterns

#### Lazy Loading Implementation

```swift
class ProductImageLoader {
    func loadProductImage(url: URL) async -> UIImage? {
        let span = Embrace.client?.buildSpan(
            name: "product_image_load",
            type: .performance
        ).startSpan()

        span?.setAttribute(key: "image.url", value: url.absoluteString)
        span?.setAttribute(key: "image.type", value: "product")

        do {
            let image = try await loadImage(from: url)
            span?.setAttribute(key: "image.load_success", value: "true")
            span?.setAttribute(key: "image.size_bytes", value: String(image.pngData()?.count ?? 0))

            return image
        } catch {
            span?.setAttribute(key: "image.load_success", value: "false")
            span?.setAttribute(key: "error.message", value: error.localizedDescription)

            Embrace.client?.log(
                "Product image load failed",
                severity: .warn,
                attributes: [
                    "image_url": url.absoluteString,
                    "error": error.localizedDescription
                ]
            )

            return nil
        } finally {
            span?.end()
        }
    }
}
```

#### Background Task Monitoring

```swift
class InventoryUpdateManager {
    func performBackgroundInventoryUpdate() {
        let backgroundTaskID = UIApplication.shared.beginBackgroundTask(withName: "inventory_update") {
            Embrace.client?.log(
                "Background inventory update expired",
                severity: .warn,
                attributes: ["task_type": "inventory_update"]
            )
        }

        Embrace.client?.add(event: .breadcrumb("BACKGROUND_INVENTORY_UPDATE_STARTED"))

        Task {
            do {
                try await updateInventoryFromServer()

                Embrace.client?.add(event: .breadcrumb("BACKGROUND_INVENTORY_UPDATE_COMPLETED"))

                Embrace.client?.log(
                    "Background inventory update completed",
                    severity: .info,
                    attributes: ["task_type": "inventory_update"]
                )
            } catch {
                Embrace.client?.log(
                    "Background inventory update failed",
                    severity: .error,
                    attributes: [
                        "task_type": "inventory_update",
                        "error": error.localizedDescription
                    ]
                )
            }

            UIApplication.shared.endBackgroundTask(backgroundTaskID)
        }
    }
}
```

## Session Context and Metadata

### E-commerce Session Enrichment

Add relevant business context to every session:

```swift
class SessionContextManager {
    func setupEcommerceContext() {
        // User context
        if let user = currentUser {
            Embrace.client?.metadata?.addProperty(
                key: "user_tier",
                value: user.membershipTier,
                lifespan: .session
            )

            Embrace.client?.metadata?.addProperty(
                key: "user_registration_date",
                value: user.registrationDate.iso8601String,
                lifespan: .permanent
            )
        }

        // App context
        Embrace.client?.metadata?.addProperty(
            key: "app_feature_flags",
            value: getActiveFeatureFlags().joined(separator: ","),
            lifespan: .session
        )

        // Business context
        Embrace.client?.metadata?.addProperty(
            key: "current_promotion",
            value: getCurrentPromotionId(),
            lifespan: .session
        )

        // Cart context
        if let cart = currentCart, !cart.isEmpty {
            Embrace.client?.metadata?.addProperty(
                key: "cart_items_count",
                value: String(cart.items.count),
                lifespan: .session
            )

            Embrace.client?.metadata?.addProperty(
                key: "cart_total_value",
                value: String(cart.totalValue),
                lifespan: .session
            )
        }
    }
}
```

## Testing and Validation

### Instrumentation Testing Strategy

Create automated tests to verify your instrumentation:

```swift
class InstrumentationTests: XCTestCase {
    var mockEmbraceService: MockEmbraceService!

    override func setUp() {
        super.setUp()
        mockEmbraceService = MockEmbraceService()
    }

    func testLoginFlowBreadcrumbs() {
        let authManager = AuthenticationManager(embraceService: mockEmbraceService)

        authManager.signInWithEmail(email: "test@example.com", password: "password")

        // Verify breadcrumbs were logged
        XCTAssertTrue(mockEmbraceService.breadcrumbs.contains("USER_LOGIN_STARTED_EMAIL"))
        XCTAssertTrue(mockEmbraceService.breadcrumbs.contains("USER_LOGIN_SUCCESS_EMAIL"))
    }

    func testPurchaseFlowSpans() {
        let checkoutCoordinator = CheckoutCoordinator(embraceService: mockEmbraceService)

        checkoutCoordinator.startCheckout()
        checkoutCoordinator.completeShippingStep()
        checkoutCoordinator.completePaymentStep()

        // Verify spans were created
        XCTAssertEqual(mockEmbraceService.spans.count, 3)
        XCTAssertEqual(mockEmbraceService.spans.first?.name, "checkout_flow")
    }
}
```

## Common Anti-Patterns to Avoid

### Incorrect Implementations

```swift
// DON'T: Use legacy API
Embrace.client?.addBreadcrumb("User action")

// DON'T: Log sensitive data
Embrace.client?.log("User logged in", attributes: [
    "password": userPassword, // Never log sensitive data
    "credit_card": cardNumber  // Never log PII
])

// DON'T: Create too many spans
for product in products {
    let span = Embrace.client?.buildSpan(name: "process_product").startSpan()
    // This creates excessive spans
    span?.end()
}

// DON'T: Use non-descriptive names
Embrace.client?.add(event: .breadcrumb("Action")) // Too vague
```

### Correct Implementations

```swift
// DO: Use correct 6.x API
Embrace.client?.add(event: .breadcrumb("USER_CHECKOUT_STARTED"))

// DO: Log business-relevant data only
Embrace.client?.log("User logged in", severity: .info, attributes: [
    "auth_method": "email",
    "user_tier": "premium"
])

// DO: Batch similar operations
let span = Embrace.client?.buildSpan(name: "process_product_batch").startSpan()
for product in products {
    // Process products within single span
    processProduct(product)
}
span?.end()

// DO: Use descriptive, consistent naming
Embrace.client?.add(event: .breadcrumb("PRODUCT_ADDED_TO_CART"))
```

## Summary

Effective e-commerce instrumentation with Embrace SDK 6.x requires:

1. **Comprehensive User Journey Tracking** - Use breadcrumbs and spans to track complete user flows
2. **Business Context Integration** - Include relevant business metrics in your telemetry
3. **Performance Monitoring** - Track critical operations like payment processing and API calls
4. **Error Categorization** - Implement consistent error tracking for e-commerce scenarios
5. **Dashboard Configuration** - Set up user flows in Embrace dashboard to monitor conversion rates
6. **Testing Strategy** - Validate your instrumentation with automated tests

By following these patterns, you'll gain deep insights into your e-commerce app's performance, user behavior, and business metrics, enabling data-driven optimization of your user experience and conversion rates.

## Next Steps

- Review [Custom Traces](/ios/6x/manual-instrumentation/custom-traces) for advanced performance monitoring
- Explore [Network Monitoring](/ios/6x/automatic-instrumentation/network-monitoring) for API performance tracking
- Check [Security Considerations](/ios/6x/best-practices/security-considerations) for data privacy guidelines