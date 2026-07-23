---
title: Error Handling
description: Track and manage errors in your Apple app with Embrace
sidebar_position: 3
---

## Error Handling

Tracking and handling errors is crucial for understanding problems in your app. Embrace provides comprehensive error tracking capabilities that help you identify and fix issues quickly.

### Types of Errors

Embrace categorizes errors into different types:

- **Crashes**: Unhandled exceptions that terminate your app
- **Handled Exceptions**: Exceptions that are caught and handled by your code
- **Error Events**: Error conditions that don't throw exceptions but represent failures
- **Network Errors**: Failed network requests and API calls

### Tracking Handled Errors

#### Basic Error Logging

The simplest way to track a handled error is to log it with `.error` severity:

```swift
do {
    try riskyOperation()
} catch let error {
    EmbraceIO.shared.log(
        "riskyOperation failed: \(error.localizedDescription)",
        severity: .error
    )

    // Handle the error
}
```

#### Adding Context to Errors

Add properties to provide more context:

```swift
do {
    try uploadImage(image: image)
} catch let error {
    EmbraceIO.shared.log(
        "Failed to upload image: \(error.localizedDescription)",
        severity: .error,
        attributes: [
            "image_size": "\(image.size.width)x\(image.size.height)",
            "file_size": "\(imageData.count) bytes",
            "format": "jpeg"
        ]
    )
    // Handle the error
}
```

#### Recording Errors in Spans

When using spans to track operations, record errors within the span context:

```swift
let span = EmbraceIO.shared.createSpan(name: "user_authentication")

do {
    try authenticate(username: username, password: password)
    span?.end()
} catch let error {
    span?.setAttribute(key: "error.message", value: error.localizedDescription)
    span?.end(errorCode: .failure)

    // Also log the error
    EmbraceIO.shared.log(
        "Authentication failed: \(error.localizedDescription)",
        severity: .error,
        attributes: [
            "username": username,
            "authentication_method": "password"
        ]
    )
}
```

### Common Error Handling Patterns

#### JSON Parsing Errors

```swift
func parseUserProfile(data: Data) -> Result<UserProfile, Error> {
    do {
        let decoder = JSONDecoder()
        let userProfile = try decoder.decode(UserProfile.self, from: data)
        return .success(userProfile)
    } catch let error {
        // Log JSON parsing error with details
        EmbraceIO.shared.log(
            "JSON parsing failed: \(error.localizedDescription)",
            severity: .error,
            attributes: [
                "data_length": data.count.description,
                "error_type": "json_parsing",
                "object_type": String(describing: UserProfile.self)
            ]
        )

        if let dataString = String(data: data, encoding: .utf8) {
            // If data is small enough, include a preview
            if dataString.count < 100 {
                EmbraceIO.shared.log(
                    "Failed to parse JSON data: \(dataString)",
                    severity: .error
                )
            }
        }

        return .failure(error)
    }
}
```

#### Core Data Errors

```swift
func saveContext() {
    let context = persistentContainer.viewContext
    if context.hasChanges {
        do {
            try context.save()
        } catch let error as NSError {
            EmbraceIO.shared.log(
                "Core Data save failed: \(error.localizedDescription)",
                severity: .error,
                attributes: [
                    "operation": "core_data_save",
                    "entity_count": context.insertedObjects.count.description,
                    "updated_count": context.updatedObjects.count.description,
                    "deleted_count": context.deletedObjects.count.description
                ]
            )

            // Optional: Log specific entity errors
            for (entity, error) in error.userInfo[NSDetailedErrorsKey] as? [NSManagedObject: NSError] ?? [:] {
                EmbraceIO.shared.log(
                    "Entity save error: \(entity.entity.name ?? "Unknown entity")",
                    severity: .error,
                    attributes: [
                        "error_code": error.code.description,
                        "entity_id": entity.objectID.uriRepresentation().absoluteString
                    ]
                )
            }
        }
    }
}
```

### Creating Custom Errors

Define custom errors to provide more context:

```swift
enum PaymentError: Error {
    case insufficientFunds
    case invalidPaymentMethod
    case transactionDeclined(code: String)
    case serverError(message: String)
}

func processPayment() {
    do {
        // Payment processing logic
        let paymentResult = try paymentGateway.processPayment(amount: 99.99)

        // Success handling
    } catch let error as PaymentError {
        // Handle and log specific payment errors
        switch error {
        case .insufficientFunds:
            EmbraceIO.shared.log(
                "Payment failed: Insufficient funds",
                severity: .error,
                attributes: ["error_type": "payment_insufficient_funds"]
            )

        case .invalidPaymentMethod:
            EmbraceIO.shared.log(
                "Payment failed: Invalid payment method",
                severity: .error,
                attributes: ["error_type": "payment_invalid_method"]
            )

        case .transactionDeclined(let code):
            EmbraceIO.shared.log(
                "Payment failed: Transaction declined",
                severity: .error,
                attributes: [
                    "error_type": "payment_declined",
                    "decline_code": code
                ]
            )

        case .serverError(let message):
            EmbraceIO.shared.log(
                "Payment failed: Server error",
                severity: .error,
                attributes: [
                    "error_type": "payment_server_error",
                    "server_message": message
                ]
            )
        }
    } catch let error {
        // Handle and log other unexpected errors
        EmbraceIO.shared.log(
            "Payment failed: \(error.localizedDescription)",
            severity: .error,
            attributes: [
                "error_type": "payment_unknown_error"
            ]
        )
    }
}
```

### Best Practices for Error Handling

#### Group Related Errors

Use consistent naming and grouping for related errors:

```swift
// Add consistent properties for all network errors
func logNetworkError(_ error: Error, endpoint: String, method: String) {
    EmbraceIO.shared.log(
        "Network error: \(error.localizedDescription)",
        severity: .error,
        attributes: [
            "error_category": "network",
            "endpoint": endpoint,
            "method": method,
            "timestamp": ISO8601DateFormatter().string(from: Date())
        ]
    )
}
```

#### Include Troubleshooting Information

Add details that will help with debugging:

```swift
// Log detailed info about the state when the error occurred
EmbraceIO.shared.log(
    "Error occurred: \(error.localizedDescription)",
    severity: .error,
    attributes: [
        "user_state": userState.rawValue,
        "network_status": networkReachability.currentStatus.rawValue,
        "cache_status": cache.isFull ? "full" : "available",
        "memory_warning": hasReceivedMemoryWarning ? "true" : "false",
        "app_uptime": String(format: "%.2f", ProcessInfo.processInfo.systemUptime)
    ]
)
```

#### Avoid Over-Logging

Don't log the same error multiple times:

```swift
// Only log errors that meet certain criteria
if shouldLogError(error, retryCount: currentRetryCount) {
    EmbraceIO.shared.log(
        "Error: \(error.localizedDescription)",
        severity: .error
    )
}

func shouldLogError(_ error: Error, retryCount: Int) -> Bool {
    // Don't log during retries, only log the final failure
    if retryCount < maxRetryCount {
        return false
    }

    // Don't log certain expected errors
    if let nsError = error as NSError {
        if nsError.domain == NSURLErrorDomain && nsError.code == NSURLErrorCancelled {
            return false
        }
    }

    return true
}
```

#### Categorize Errors

Use consistent error categorization:

```swift
enum ErrorCategory: String {
    case network = "network"
    case database = "database"
    case authentication = "authentication"
    case validation = "validation"
    case businessLogic = "business_logic"
    case externalService = "external_service"
}

func logCategorizedError(_ error: Error, category: ErrorCategory, attributes: [String: String] = [:]) {
    var allAttributes = attributes
    allAttributes["error_category"] = category.rawValue

    EmbraceIO.shared.log(
        "\(category.rawValue.capitalized) error: \(error.localizedDescription)",
        severity: .error,
        attributes: allAttributes
    )
}
```

#### Correlate Errors with User Actions

Link errors to user actions when possible:

```swift
// Track the last user action to correlate with errors
var lastUserAction: String?

func trackUserAction(_ action: String) {
    lastUserAction = action
    // Other tracking...
}

func logErrorWithUserContext(_ error: Error) {
    var properties: [String: String] = [:]

    if let lastAction = lastUserAction {
        properties["last_user_action"] = lastAction
    }

    EmbraceIO.shared.log(
        "Error after user action: \(error.localizedDescription)",
        severity: .error,
        attributes: properties
    )
}
```

<!-- TODO: Add examples for handling background task errors
TODO: Add examples showing how to properly handle errors in SwiftUI
TODO: Include examples for aggregating similar errors to identify patterns  -->
