---
title: Error Handling
description: Track and manage errors in your iOS app with Embrace
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Error Handling

Tracking and handling errors is crucial for understanding problems in your app. Embrace provides comprehensive error tracking capabilities that help you identify and fix issues quickly.

## Types of Errors

Embrace categorizes errors into different types:

- **Crashes**: Unhandled exceptions that terminate your app
- **Handled Exceptions**: Exceptions that are caught and handled by your code
- **Error Events**: Error conditions that don't throw exceptions but represent failures
- **Network Errors**: Failed network requests and API calls

## Tracking Handled Errors

### Basic Error Logging

The simplest way to track an error is with the error recording methods:

<Tabs groupId="embrace-client">
<TabItem value="embraceio" label="EmbraceIO" default>

```swift
do {
    try riskyOperation()
} catch let error {
    // In Embrace 6.x, you can record errors through spans
    let span = EmbraceIO.shared.buildSpan(name: "riskyOperation").startSpan()
    span.recordError(error)
    span.setStatus(.error)
    span.end()

    // Handle the error
}
```

</TabItem>
<TabItem value="embrace" label="Embrace">

```swift
do {
    try riskyOperation()
} catch let error {
    // In Embrace 6.x, you can record errors through spans
    let span = Embrace.client?.startSpan(name: "riskyOperation")
    span?.recordError(error)
    span?.setStatus(.error)
    span?.end()

    // Handle the error
}
```

</TabItem>
</Tabs>

### Adding Context to Errors

Add properties to provide more context:

<Tabs groupId="embrace-client">
<TabItem value="embraceio" label="EmbraceIO" default>

```swift
do {
    try uploadImage(image: image)
} catch let error {
    try? EmbraceIO.shared.log(
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

</TabItem>
<TabItem value="embrace" label="Embrace">

```swift
do {
    try uploadImage(image: image)
} catch let error {
    Embrace.client?.log(
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

</TabItem>
</Tabs>

### Recording Errors in Spans

When using spans to track operations, record errors within the span context:

<Tabs groupId="embrace-client">
<TabItem value="embraceio" label="EmbraceIO" default>

```swift
let span = EmbraceIO.shared.buildSpan(name: "user_authentication").startSpan()

do {
    try authenticate(username: username, password: password)
    span.end()
} catch let error {
    span.recordError(error)
    span.setStatus(.error)
    span.end()

    // Also log the error
    try? EmbraceIO.shared.log(
        "Authentication failed: \(error.localizedDescription)",
        severity: .error,
        attributes: [
            "username": username,
            "authentication_method": "password"
        ]
    )
}
```

</TabItem>
<TabItem value="embrace" label="Embrace">

```swift
let span = Embrace.client?.startSpan(name: "user_authentication")

do {
    try authenticate(username: username, password: password)
    span?.end()
} catch let error {
    span?.recordError(error)
    span?.setStatus(.error)
    span?.end()

    // Also log the error
    Embrace.client?.log(
        "Authentication failed: \(error.localizedDescription)",
        severity: .error,
        attributes: [
            "username": username,
            "authentication_method": "password"
        ]
    )
}
```

</TabItem>
</Tabs>

## Common Error Handling Patterns

### Network Error Handling

<Tabs groupId="embrace-client">
<TabItem value="embraceio" label="EmbraceIO" default>

```swift
func fetchData(completion: @escaping (Result<Data, Error>) -> Void) {
    let url = URL(string: "https://api.example.com/data")!

    let task = URLSession.shared.dataTask(with: url) { data, response, error in
        if let error = error {
            // Log network error
            try? EmbraceIO.shared.log(
                "Network request failed: \(error.localizedDescription)",
                severity: .error,
                attributes: [
                    "url": url.absoluteString,
                    "method": "GET"
                ]
            )
            completion(.failure(error))
            return
        }

        guard let httpResponse = response as? HTTPURLResponse else {
            let error = NSError(domain: "NetworkService", code: -1, userInfo: [NSLocalizedDescriptionKey: "Invalid response"])
            try? EmbraceIO.shared.log(
                "Invalid network response: \(error.localizedDescription)",
                severity: .error
            )
            completion(.failure(error))
            return
        }

        guard (200...299).contains(httpResponse.statusCode) else {
            // Create and log a custom error for HTTP error status
            let error = NSError(
                domain: "NetworkService",
                code: httpResponse.statusCode,
                userInfo: [
                    NSLocalizedDescriptionKey: "HTTP Error: \(httpResponse.statusCode)"
                ]
            )

            try? EmbraceIO.shared.log(
                "HTTP error: \(error.localizedDescription)",
                severity: .error,
                attributes: [
                    "url": url.absoluteString,
                    "status_code": String(httpResponse.statusCode),
                    "response_headers": httpResponse.allHeaderFields.description
                ]
            )

            completion(.failure(error))
            return
        }

        guard let data = data else {
            let error = NSError(domain: "NetworkService", code: -2, userInfo: [NSLocalizedDescriptionKey: "No data received"])
            try? EmbraceIO.shared.log(
                "No data received: \(error.localizedDescription)",
                severity: .error
            )
            completion(.failure(error))
            return
        }

        completion(.success(data))
    }

    task.resume()
}
```

</TabItem>
<TabItem value="embrace" label="Embrace">

```swift
func fetchData(completion: @escaping (Result<Data, Error>) -> Void) {
    let url = URL(string: "https://api.example.com/data")!

    let task = URLSession.shared.dataTask(with: url) { data, response, error in
        if let error = error {
            // Log network error
            Embrace.client?.log(
                "Network request failed: \(error.localizedDescription)",
                severity: .error,
                attributes: [
                    "url": url.absoluteString,
                    "method": "GET"
                ]
            )
            completion(.failure(error))
            return
        }

        guard let httpResponse = response as? HTTPURLResponse else {
            let error = NSError(domain: "NetworkService", code: -1, userInfo: [NSLocalizedDescriptionKey: "Invalid response"])
            Embrace.client?.log(
                "Invalid network response: \(error.localizedDescription)",
                severity: .error
            )
            completion(.failure(error))
            return
        }

        guard (200...299).contains(httpResponse.statusCode) else {
            // Create and log a custom error for HTTP error status
            let error = NSError(
                domain: "NetworkService",
                code: httpResponse.statusCode,
                userInfo: [
                    NSLocalizedDescriptionKey: "HTTP Error: \(httpResponse.statusCode)"
                ]
            )

            Embrace.client?.log(
                "HTTP error: \(error.localizedDescription)",
                severity: .error,
                attributes: [
                    "url": url.absoluteString,
                    "status_code": String(httpResponse.statusCode),
                    "response_headers": httpResponse.allHeaderFields.description
                ]
            )

            completion(.failure(error))
            return
        }

        guard let data = data else {
            let error = NSError(domain: "NetworkService", code: -2, userInfo: [NSLocalizedDescriptionKey: "No data received"])
            Embrace.client?.log(
                "No data received: \(error.localizedDescription)",
                severity: .error
            )
            completion(.failure(error))
            return
        }

        completion(.success(data))
    }

    task.resume()
}
```

</TabItem>
</Tabs>

### JSON Parsing Errors

<Tabs groupId="embrace-client">
<TabItem value="embraceio" label="EmbraceIO" default>

```swift
func parseUserProfile(data: Data) -> Result<UserProfile, Error> {
    do {
        let decoder = JSONDecoder()
        let userProfile = try decoder.decode(UserProfile.self, from: data)
        return .success(userProfile)
    } catch let error {
        // Log JSON parsing error with details
        try? EmbraceIO.shared.log(
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
                try? EmbraceIO.shared.log(
                    "Failed to parse JSON data: \(dataString)",
                    severity: .error
                )
            }
        }

        return .failure(error)
    }
}
```

</TabItem>
<TabItem value="embrace" label="Embrace">

```swift
func parseUserProfile(data: Data) -> Result<UserProfile, Error> {
    do {
        let decoder = JSONDecoder()
        let userProfile = try decoder.decode(UserProfile.self, from: data)
        return .success(userProfile)
    } catch let error {
        // Log JSON parsing error with details
        Embrace.client?.log(
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
                Embrace.client?.log(
                    "Failed to parse JSON data: \(dataString)",
                    severity: .error
                )
            }
        }

        return .failure(error)
    }
}
```

</TabItem>
</Tabs>

### Core Data Errors

<Tabs groupId="embrace-client">
<TabItem value="embraceio" label="EmbraceIO" default>

```swift
func saveContext() {
    let context = persistentContainer.viewContext
    if context.hasChanges {
        do {
            try context.save()
        } catch let error as NSError {
            try? EmbraceIO.shared.log(
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
                try? EmbraceIO.shared.log(
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

</TabItem>
<TabItem value="embrace" label="Embrace">

```swift
func saveContext() {
    let context = persistentContainer.viewContext
    if context.hasChanges {
        do {
            try context.save()
        } catch let error as NSError {
            Embrace.client?.log(
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
                Embrace.client?.log(
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

</TabItem>
</Tabs>

## Creating Custom Errors

Define custom errors to provide more context:

<Tabs groupId="embrace-client">
<TabItem value="embraceio" label="EmbraceIO" default>

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
            try? EmbraceIO.shared.log(
                "Payment failed: Insufficient funds",
                severity: .error,
                attributes: ["error_type": "payment_insufficient_funds"]
            )

        case .invalidPaymentMethod:
            try? EmbraceIO.shared.log(
                "Payment failed: Invalid payment method",
                severity: .error,
                attributes: ["error_type": "payment_invalid_method"]
            )

        case .transactionDeclined(let code):
            try? EmbraceIO.shared.log(
                "Payment failed: Transaction declined",
                severity: .error,
                attributes: [
                    "error_type": "payment_declined",
                    "decline_code": code
                ]
            )

        case .serverError(let message):
            try? EmbraceIO.shared.log(
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
        try? EmbraceIO.shared.log(
            "Payment failed: \(error.localizedDescription)",
            severity: .error,
            attributes: [
                "error_type": "payment_unknown_error"
            ]
        )
    }
}
```

</TabItem>
<TabItem value="embrace" label="Embrace">

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
            Embrace.client?.log(
                "Payment failed: Insufficient funds",
                severity: .error,
                attributes: ["error_type": "payment_insufficient_funds"]
            )

        case .invalidPaymentMethod:
            Embrace.client?.log(
                "Payment failed: Invalid payment method",
                severity: .error,
                attributes: ["error_type": "payment_invalid_method"]
            )

        case .transactionDeclined(let code):
            Embrace.client?.log(
                "Payment failed: Transaction declined",
                severity: .error,
                attributes: [
                    "error_type": "payment_declined",
                    "decline_code": code
                ]
            )

        case .serverError(let message):
            Embrace.client?.log(
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
        Embrace.client?.log(
            "Payment failed: \(error.localizedDescription)",
            severity: .error,
            attributes: [
                "error_type": "payment_unknown_error"
            ]
        )
    }
}
```

</TabItem>
</Tabs>

## Best Practices for Error Handling

### Group Related Errors

Use consistent naming and grouping for related errors:

<Tabs groupId="embrace-client">
<TabItem value="embraceio" label="EmbraceIO" default>

```swift
// Add consistent properties for all network errors
func logNetworkError(_ error: Error, endpoint: String, method: String) {
    try? EmbraceIO.shared.log(
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

</TabItem>
<TabItem value="embrace" label="Embrace">

```swift
// Add consistent properties for all network errors
func logNetworkError(_ error: Error, endpoint: String, method: String) {
    Embrace.client?.log(
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

</TabItem>
</Tabs>

### Include Troubleshooting Information

Add details that will help with debugging:

<Tabs groupId="embrace-client">
<TabItem value="embraceio" label="EmbraceIO" default>

```swift
// Log detailed info about the state when the error occurred
try? EmbraceIO.shared.log(
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

</TabItem>
<TabItem value="embrace" label="Embrace">

```swift
// Log detailed info about the state when the error occurred
Embrace.client?.log(
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

</TabItem>
</Tabs>

### Avoid Over-Logging

Don't log the same error multiple times:

<Tabs groupId="embrace-client">
<TabItem value="embraceio" label="EmbraceIO" default>

```swift
// Only log errors that meet certain criteria
if shouldLogError(error, retryCount: currentRetryCount) {
    try? EmbraceIO.shared.log(
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

</TabItem>
<TabItem value="embrace" label="Embrace">

```swift
// Only log errors that meet certain criteria
if shouldLogError(error, retryCount: currentRetryCount) {
    Embrace.client?.log(
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

</TabItem>
</Tabs>

### Categorize Errors

Use consistent error categorization:

<Tabs groupId="embrace-client">
<TabItem value="embraceio" label="EmbraceIO" default>

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

    try? EmbraceIO.shared.log(
        "\(category.rawValue.capitalized) error: \(error.localizedDescription)",
        severity: .error,
        attributes: allAttributes
    )
}
```

</TabItem>
<TabItem value="embrace" label="Embrace">

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

    Embrace.client?.log(
        "\(category.rawValue.capitalized) error: \(error.localizedDescription)",
        severity: .error,
        attributes: allAttributes
    )
}
```

</TabItem>
</Tabs>

### Correlate Errors with User Actions

Link errors to user actions when possible:

<Tabs groupId="embrace-client">
<TabItem value="embraceio" label="EmbraceIO" default>

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

    try? EmbraceIO.shared.log(
        "Error after user action: \(error.localizedDescription)",
        severity: .error,
        attributes: properties
    )
}
```

</TabItem>
<TabItem value="embrace" label="Embrace">

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

    Embrace.client?.log(
        "Error after user action: \(error.localizedDescription)",
        severity: .error,
        attributes: properties
    )
}
```

</TabItem>
</Tabs>

<!-- TODO: Add examples for handling background task errors
TODO: Add examples showing how to properly handle errors in SwiftUI
TODO: Include examples for aggregating similar errors to identify patterns  -->
