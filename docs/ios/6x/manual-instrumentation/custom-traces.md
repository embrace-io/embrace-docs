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

The simplest way to create a span is with the `startSpan` method:

```swift
let span = Embrace.client?.startSpan(name: "image_processing")

// Your code here
performImageProcessing()

span?.end()
```

### Using Closures

For operations contained within a single function, you can use the closure-based API:

```swift
Embrace.client?.createSpan(name: "data_calculation") { span in
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
let span = Embrace.client?.startSpan(name: "network_request")

performAsyncOperation { result, error in
    if let error = error {
        span?.recordError(error)
        span?.setStatus(.error)
    } else {
        span?.setAttribute(key: "result_count", value: result.count.description)
    }
    span?.end()
}
```

## Span Attributes

Add context to your spans with attributes:

```swift
let span = Embrace.client?.startSpan(name: "checkout_process")

span?.setAttribute(key: "cart_item_count", value: "5")
span?.setAttribute(key: "total_amount", value: "99.99")
span?.setAttribute(key: "payment_method", value: "credit_card")

// Complete checkout process

span?.end()
```

You can add attributes at any point before the span is ended.

## Span Hierarchy

Create parent-child relationships between spans to represent nested operations:

```swift
let parentSpan = Embrace.client?.startSpan(name: "data_sync")

// Start a child span
let childSpan = parentSpan?.createChildSpan(name: "fetch_remote_data")
fetchRemoteData { result in
    childSpan?.end()

    // Create another child span
    let processSpan = parentSpan?.createChildSpan(name: "process_data")
    processData(result) { success in
        processSpan?.end()
        parentSpan?.end()
    }
}
```

This creates a hierarchy that helps visualize the relationship between operations.

## Custom Span Types

You can specify a span type to categorize different kinds of operations:

```swift
let span = Embrace.client?.startSpan(
    name: "payment_processing",
    type: "business_transaction"
)

// Process payment

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
let span = Embrace.client?.startSpan(name: "important_operation")
defer { span?.end() }

// Your code here, even if it throws an exception, span will be ended
```

### Capturing Meaningful Data

Add attributes that would be useful for troubleshooting:

```swift
span?.setAttribute(key: "user_tier", value: "premium")
span?.setAttribute(key: "data_size", value: dataSize.description)
span?.setAttribute(key: "retry_count", value: retryCount.description)
```

## Common Use Cases

### API Client Instrumentation

```swift
func fetchUserProfile(userId: String, completion: @escaping (Result<UserProfile, Error>) -> Void) {
    let span = Embrace.client?.startSpan(name: "api_fetch_user_profile")
    span?.setAttribute(key: "user_id", value: userId)

    apiClient.get("/users/\(userId)") { result in
        switch result {
        case .success(let data):
            span?.setAttribute(key: "data_size", value: data.count.description)
            span?.end()
            // Process data and call completion
        case .failure(let error):
            span?.recordError(error)
            span?.setStatus(.error)
            span?.end()
            completion(.failure(error))
        }
    }
}
```

### Database Operations

```swift
func saveUserPreferences(preferences: Preferences) throws {
    let span = Embrace.client?.startSpan(name: "db_save_preferences")
    defer { span?.end() }

    span?.setAttribute(key: "preference_count", value: preferences.count.description)

    do {
        try database.write { transaction in
            transaction.setObject(preferences, forKey: "user_preferences")
        }
    } catch let error {
        span?.recordError(error)
        span?.setStatus(.error)
        throw error
    }
}
```

### Performance-Critical Algorithms

```swift
func processFeed(posts: [Post]) -> [ProcessedPost] {
    let span = Embrace.client?.startSpan(name: "algorithm_feed_processing")
    span?.setAttribute(key: "post_count", value: posts.count.description)

    // Measure the main processing algorithm
    let result = performFeedProcessing(posts)

    span?.setAttribute(key: "processed_count", value: result.count.description)
    span?.end()

    return result
}
```

<!-- TODO: Add more examples showing complex trace structures with multiple nested spans, especially for navigation between screens
TODO: Include examples for measuring key user flows through the application  -->
