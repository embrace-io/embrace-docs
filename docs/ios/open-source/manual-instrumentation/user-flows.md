---
title: User Flows
description: Track complex user journeys across multiple screens and operations in your iOS app
sidebar_position: 5
---

# User Flows

User flows in Embrace allow you to track complex user journeys that span multiple screens, network requests, and operations. By marking the start and end of important user journeys, you can gain insights into how users interact with key features of your app.

## Understanding User Flows

User flows represent end-to-end processes in your app, such as:
- Onboarding sequences
- Checkout processes
- Content creation workflows
- Account setup procedures
- Multi-step transactions

Tracking these flows helps you understand:
- How long users spend in each flow
- Where users abandon flows
- Which steps cause the most friction
- How changes impact flow performance

## Starting a Flow

To begin tracking a user flow, call the `startUserFlow` method:

```swift
// Start tracking the checkout flow
let flowId = Embrace.client?.startUserFlow(name: "checkout")

// Store the flowId for later use
self.currentCheckoutFlowId = flowId
```

The `startUserFlow` method returns a unique flow identifier that you'll use to add events and end the flow.

## Adding Events to a Flow

As the user progresses through the flow, add events to mark important milestones:

```swift
// User reached the shipping information step
Embrace.client?.addUserFlowEvent(
    name: "shipping_info",
    flowId: currentCheckoutFlowId
)

// User completed shipping information
Embrace.client?.addUserFlowEvent(
    name: "shipping_info_completed",
    flowId: currentCheckoutFlowId,
    properties: [
        "shipping_method": shippingMethod,
        "has_saved_address": hasSavedAddress ? "true" : "false"
    ]
)
```

You can add custom properties to flow events to provide additional context.

## Ending a Flow

When the user completes or abandons the flow, mark it as ended:

```swift
// User successfully completed checkout
Embrace.client?.endUserFlow(
    flowId: currentCheckoutFlowId,
    properties: [
        "order_id": orderId,
        "total_amount": totalAmount.description,
        "payment_method": paymentMethod
    ]
)
```

You can add properties to the end event to capture the final outcome of the flow.

## Flow Success or Failure

You can explicitly indicate whether a flow was successful or failed:

```swift
// For a successful flow
Embrace.client?.endUserFlow(
    flowId: currentCheckoutFlowId,
    properties: ["order_id": orderId],
    success: true
)

// For a failed flow
Embrace.client?.endUserFlow(
    flowId: currentCheckoutFlowId,
    properties: ["error_reason": errorReason],
    success: false
)
```

This helps you track completion rates and analyze failure patterns.

## Complex Flow Example

Here's a more complete example of tracking a checkout flow across multiple view controllers:

```swift
class CheckoutCoordinator {
    private var flowId: String?
    
    func startCheckout(with cart: Cart) {
        // Start the checkout flow
        flowId = Embrace.client?.startUserFlow(name: "checkout")
        
        // Add initial properties
        Embrace.client?.addUserFlowEvent(
            name: "checkout_started",
            flowId: flowId,
            properties: [
                "cart_item_count": cart.items.count.description,
                "cart_value": cart.totalValue.description
            ]
        )
        
        // Show the shipping screen
        showShippingScreen()
    }
    
    func showShippingScreen() {
        let shippingVC = ShippingViewController()
        shippingVC.delegate = self
        navigationController.pushViewController(shippingVC, animated: true)
        
        // Log screen transition in flow
        Embrace.client?.addUserFlowEvent(
            name: "shipping_screen_shown",
            flowId: flowId
        )
    }
    
    func didCompleteShipping(with info: ShippingInfo) {
        // Log shipping completion
        Embrace.client?.addUserFlowEvent(
            name: "shipping_completed",
            flowId: flowId,
            properties: [
                "shipping_method": info.method,
                "delivery_speed": info.deliverySpeed.rawValue
            ]
        )
        
        // Show payment screen
        showPaymentScreen()
    }
    
    func showPaymentScreen() {
        let paymentVC = PaymentViewController()
        paymentVC.delegate = self
        navigationController.pushViewController(paymentVC, animated: true)
        
        // Log screen transition in flow
        Embrace.client?.addUserFlowEvent(
            name: "payment_screen_shown",
            flowId: flowId
        )
    }
    
    func didCompletePayment(with info: PaymentInfo) {
        // Log payment completion
        Embrace.client?.addUserFlowEvent(
            name: "payment_completed",
            flowId: flowId,
            properties: [
                "payment_method": info.method.rawValue,
                "is_saved_payment": info.isSavedPayment ? "true" : "false"
            ]
        )
        
        // Process order
        processOrder()
    }
    
    func processOrder() {
        // Log order processing
        Embrace.client?.addUserFlowEvent(
            name: "processing_order",
            flowId: flowId
        )
        
        orderService.submitOrder { [weak self] result in
            guard let self = self else { return }
            
            switch result {
            case .success(let order):
                // Log successful order
                Embrace.client?.addUserFlowEvent(
                    name: "order_created",
                    flowId: self.flowId,
                    properties: ["order_id": order.id]
                )
                
                // End the flow successfully
                Embrace.client?.endUserFlow(
                    flowId: self.flowId,
                    properties: [
                        "order_id": order.id,
                        "total_amount": order.totalAmount.description
                    ],
                    success: true
                )
                
                self.showOrderConfirmation(order)
                
            case .failure(let error):
                // End the flow with failure
                Embrace.client?.endUserFlow(
                    flowId: self.flowId,
                    properties: ["error": error.localizedDescription],
                    success: false
                )
                
                self.showError(error)
            }
        }
    }
    
    func userCancelledCheckout() {
        // User abandoned the checkout
        Embrace.client?.endUserFlow(
            flowId: flowId,
            properties: ["reason": "user_cancelled"],
            success: false
        )
    }
}
```

## User Flow Best Practices

### Flow Naming

Use consistent naming conventions for your flows:
- Use snake_case for flow names
- Be descriptive but concise
- Use names that clearly identify the business process

Examples:
- `checkout`
- `user_registration`
- `content_creation`
- `account_linking`

### Event Naming

For events within flows:
- Use a verb-noun format to describe the action
- Indicate the state (started, completed, failed)
- Keep related events consistent

Examples:
- `shipping_info_entered`
- `payment_method_selected`
- `order_submitted`
- `verification_failed`

### Flow Scope

Choose an appropriate scope for your flows:
- Too narrow: `button_tap` (better as a regular event)
- Too broad: `app_usage` (too general to be useful)
- Just right: `checkout`, `onboarding`, `account_setup`

### Flow Properties

Add properties that provide business context:
- Include business metrics (order values, item counts)
- Track user choices (selected options, preferences)
- Note important state (new vs. returning customer)
- Record outcomes (success reason, failure reason)

### Flow Management

Properly manage flows in your app architecture:
- Store flow IDs in a way that survives view controller transitions
- Consider using coordinators or view models to manage flow state
- Handle edge cases like app termination during a flow
- Don't forget to end flows, even when they're abandoned

## Common Use Cases

### Onboarding Flow

```swift
class OnboardingCoordinator {
    private var flowId: String?
    
    func startOnboarding() {
        flowId = Embrace.client?.startUserFlow(name: "onboarding")
        showWelcomeScreen()
    }
    
    func onboardingStepCompleted(step: String, properties: [String: String] = [:]) {
        Embrace.client?.addUserFlowEvent(
            name: "\(step)_completed",
            flowId: flowId,
            properties: properties
        )
    }
    
    func onboardingCompleted(success: Bool) {
        Embrace.client?.endUserFlow(
            flowId: flowId,
            properties: ["completed_all_steps": success ? "true" : "false"],
            success: success
        )
    }
}
```

### User Registration

```swift
class RegistrationController {
    private var flowId: String?
    
    func beginRegistration() {
        flowId = Embrace.client?.startUserFlow(name: "registration")
        
        Embrace.client?.addUserFlowEvent(
            name: "registration_started",
            flowId: flowId,
            properties: [
                "source": registrationSource,
                "has_referral": hasReferralCode ? "true" : "false"
            ]
        )
    }
    
    func submitRegistration(email: String, password: String) {
        Embrace.client?.addUserFlowEvent(
            name: "registration_submitted",
            flowId: flowId
        )
        
        authService.register(email: email, password: password) { [weak self] result in
            guard let self = self else { return }
            
            switch result {
            case .success(let user):
                Embrace.client?.endUserFlow(
                    flowId: self.flowId,
                    properties: ["user_id": user.id],
                    success: true
                )
                
            case .failure(let error):
                Embrace.client?.endUserFlow(
                    flowId: self.flowId,
                    properties: ["error": error.localizedDescription],
                    success: false
                )
            }
        }
    }
}
```

TODO: Add examples of how user flows appear in the Embrace dashboard
TODO: Add code samples for handling flows that span multiple app sessions
TODO: Add examples of tracking conversion metrics with flows 