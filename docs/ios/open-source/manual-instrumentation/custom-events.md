---
title: Custom Events
description: Capture discrete events and user actions in your iOS app
sidebar_position: 2
---

# Custom Events

Custom events allow you to track discrete, momentary occurrences in your app. Unlike spans, which measure operations with a duration, events represent instantaneous actions or state changes.

## Understanding Custom Events

Events in Embrace are useful for tracking:
- User actions (button taps, feature usage)
- State changes (login, logout, subscription status changes)
- Business events (purchase, signup, content engagement)
- System notifications (low memory warnings, background/foreground transitions)

Events provide a timeline of important occurrences throughout a user's session.

## Logging Events

The primary way to capture custom events is through the `logBreadcrumb` method:

```swift
// Simple event with just a name
Embrace.client?.logBreadcrumb(name: "user_tapped_checkout_button")

// Event with additional properties
Embrace.client?.logBreadcrumb(
    name: "product_added_to_cart",
    properties: [
        "product_id": "12345",
        "product_name": "Premium Widget",
        "price": "29.99",
        "currency": "USD"
    ]
)
```

## Event Types

You can categorize events using different event types:

```swift
// Log a user action
Embrace.client?.logBreadcrumb(
    name: "filter_applied",
    type: .userAction,
    properties: ["filter_type": "price", "range": "10-50"]
)

// Log a view event
Embrace.client?.logBreadcrumb(
    name: "viewed_product_details",
    type: .viewChange,
    properties: ["product_id": "12345"]
)

// Log a network-related event
Embrace.client?.logBreadcrumb(
    name: "api_rate_limit_approaching",
    type: .networkRequest,
    properties: ["remaining_calls": "5", "reset_time": "3600"]
)
```

Available event types include:
- `.userAction` - User interactions with the app
- `.networkRequest` - Network-related events
- `.viewChange` - UI and navigation events
- `.system` - System-level events
- `.custom` - For events that don't fit other categories

## Event Properties

Add context to your events with properties:

```swift
Embrace.client?.logBreadcrumb(
    name: "completed_purchase",
    properties: [
        "order_id": orderID,
        "total_amount": totalAmount.description,
        "item_count": itemCount.description,
        "payment_method": paymentMethod,
        "is_first_purchase": isFirstPurchase ? "true" : "false"
    ]
)
```

Properties should contain information that would be valuable for:
- Understanding user behavior
- Troubleshooting issues
- Analyzing business metrics
- Segmenting analytics data

## Automatically Tracked Events

Embrace automatically captures certain events, such as:
- App lifecycle events (foreground, background)
- Low memory warnings
- Screen orientation changes
- Network connectivity changes

Your custom events will appear alongside these automatic events in the timeline.

## Common Use Cases

### Tracking Feature Usage

```swift
func trackFeatureUsage(featureName: String) {
    Embrace.client?.logBreadcrumb(
        name: "feature_used",
        type: .userAction,
        properties: [
            "feature_name": featureName,
            "user_tier": UserManager.shared.currentUserTier,
            "session_duration": sessionManager.currentSessionDuration.description
        ]
    )
}

// Then use throughout your codebase
@IBAction func shareButtonTapped() {
    trackFeatureUsage(featureName: "content_sharing")
    // Show sharing UI
}
```

### Tracking Business Events

```swift
func completeRegistration(user: User) {
    // Register the user
    UserManager.shared.register(user)
    
    // Log the business event
    Embrace.client?.logBreadcrumb(
        name: "user_registered",
        type: .custom,
        properties: [
            "referral_source": user.referralSource ?? "direct",
            "has_completed_profile": user.hasCompletedProfile ? "true" : "false",
            "account_type": user.accountType.rawValue
        ]
    )
}
```

### Tracking User Journey

```swift
class CheckoutCoordinator {
    func beginCheckout() {
        Embrace.client?.logBreadcrumb(
            name: "checkout_started",
            type: .userAction
        )
        
        showShippingScreen()
    }
    
    func showShippingScreen() {
        Embrace.client?.logBreadcrumb(
            name: "shipping_screen_shown",
            type: .viewChange
        )
        
        // Show shipping screen
    }
    
    func shippingInfoSubmitted(shippingInfo: ShippingInfo) {
        Embrace.client?.logBreadcrumb(
            name: "shipping_info_submitted",
            type: .userAction,
            properties: [
                "shipping_method": shippingInfo.method,
                "has_saved_address": shippingInfo.isSavedAddress ? "true" : "false"
            ]
        )
        
        showPaymentScreen()
    }
    
    // And so on...
}
```

## Best Practices

### Naming Conventions

Use clear, descriptive names for your events. Consider a naming convention such as:
- Use snake_case for event names
- Use verbs in past tense for actions that occurred
- Use consistent prefixes for related events

Good examples:
- `user_tapped_login_button`
- `payment_completed`
- `feature_enabled`
- `filter_applied`

### Property Values

All property values must be strings. For non-string types, convert them to strings:

```swift
"count": count.description,
"price": String(format: "%.2f", price),
"is_enabled": isEnabled ? "true" : "false"
```

### Data Volume

Be judicious about the number of events you log. Focus on:
- Business-critical user actions
- Important state changes
- Events needed for troubleshooting
- Key points in user journeys

### Sensitive Data

Avoid including sensitive information in event properties:
- No personally identifiable information (PII)
- No authentication tokens or credentials
- No sensitive business data
- No health or financial details

## Event Analysis

Events can be analyzed in several ways:
- Chronologically within a user session
- Aggregated across sessions to understand feature usage
- Filtered to trace user journeys
- Correlated with crashes or ANRs to understand what led to issues

TODO: Add examples of how custom events appear in the Embrace dashboard
TODO: Add more real-world examples for common app categories (e-commerce, media, etc.)
TODO: Add code samples for integrating with analytics frameworks 