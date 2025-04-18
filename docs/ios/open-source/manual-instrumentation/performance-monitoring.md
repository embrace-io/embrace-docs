---
title: Performance Monitoring
description: Monitor and optimize your iOS app's performance with Embrace
sidebar_position: 4
---

# Performance Monitoring

Performance monitoring helps you track, measure, and optimize your app's performance. Embrace provides tools to monitor various aspects of your app's performance and identify bottlenecks.

## Performance Metrics

You can track several types of performance metrics in your iOS app:

- **Duration metrics**: How long operations take to complete
- **Resource usage**: Memory and CPU consumption
- **Frequency metrics**: How often operations occur
- **Custom performance metrics**: Application-specific measurements

## Tracking Operation Duration

The most common performance metric is operation duration, which you can track using spans:

```swift
func loadData() {
    let span = Embrace.client?.startSpan(name: "data_loading")
    
    // Perform data loading
    let data = fetchDataFromCache()
    
    span?.setAttribute(key: "data_size", value: "\(data.count)")
    span?.end()
}
```

For more complex operations, create a hierarchy of spans:

```swift
func renderFeed() {
    let renderSpan = Embrace.client?.startSpan(name: "feed_rendering")
    
    // 1. Load data
    let dataSpan = renderSpan?.createChildSpan(name: "feed_data_loading")
    let feedItems = loadFeedData()
    dataSpan?.setAttribute(key: "item_count", value: "\(feedItems.count)")
    dataSpan?.end()
    
    // 2. Process images
    let imageSpan = renderSpan?.createChildSpan(name: "feed_image_processing")
    processFeedImages(feedItems)
    imageSpan?.end()
    
    // 3. Update UI
    let uiSpan = renderSpan?.createChildSpan(name: "feed_ui_update")
    updateUI(with: feedItems)
    uiSpan?.end()
    
    renderSpan?.end()
}
```

## Custom Performance Events

Custom events allow you to mark significant points in your code execution:

```swift
// Track when the app finishes initial loading
Embrace.client?.logMessage(
    "App fully loaded",
    severity: .info,
    properties: [
        "initial_load_time_ms": "\(loadTimeInMilliseconds)",
        "cached_resources": "\(cachedResourceCount)",
        "network_resources": "\(networkResourceCount)"
    ]
)
```

## Tracking Resource Usage

You can track resource usage manually at key points:

```swift
func trackMemoryUsage(operation: String) {
    var info = mach_task_basic_info()
    var count = mach_msg_type_number_t(MemoryLayout<mach_task_basic_info>.size)/4
    
    let result: kern_return_t = withUnsafeMutablePointer(to: &info) {
        $0.withMemoryRebound(to: integer_t.self, capacity: Int(count)) {
            task_info(mach_task_self_, task_flavor_t(MACH_TASK_BASIC_INFO), $0, &count)
        }
    }
    
    if result == KERN_SUCCESS {
        let usedMemory = Float(info.resident_size) / (1024 * 1024) // Convert to MB
        
        Embrace.client?.logMessage(
            "Memory usage checkpoint",
            severity: .info,
            properties: [
                "operation": operation,
                "memory_used_mb": String(format: "%.2f", usedMemory)
            ]
        )
    }
}

// Usage at key points
trackMemoryUsage(operation: "after_image_processing")
trackMemoryUsage(operation: "after_data_loaded")
```

## Performance Attributes

Add performance attributes to spans to provide more context:

```swift
func loadUserProfile() {
    let span = Embrace.client?.startSpan(name: "user_profile_loading")
    
    // Set attributes that impact performance
    span?.setAttribute(key: "cache_state", value: isCached ? "hit" : "miss")
    span?.setAttribute(key: "image_count", value: "\(profile.images.count)")
    span?.setAttribute(key: "connection_type", value: networkType.rawValue)
    
    // Load the profile
    let profile = fetchUserProfile()
    
    // Add result attributes
    span?.setAttribute(key: "profile_size_kb", value: "\(profileSizeInKB)")
    span?.setAttribute(key: "loading_time_ms", value: "\(loadingTimeInMS)")
    
    span?.end()
}
```

## Monitoring Critical User Flows

Track performance across user flows by linking spans:

```swift
func checkoutProcess() {
    // 1. Start the main checkout span
    let checkoutSpan = Embrace.client?.startSpan(name: "checkout_flow")
    
    // 2. Cart validation
    validateCart { [weak self] success in
        if success {
            // 3. Payment processing
            self?.processPayment { paymentSuccess in
                if paymentSuccess {
                    // 4. Order confirmation
                    self?.confirmOrder { orderSuccess in
                        if orderSuccess {
                            checkoutSpan?.setAttribute(key: "checkout_result", value: "success")
                        } else {
                            checkoutSpan?.setAttribute(key: "checkout_result", value: "failed_at_confirmation")
                        }
                        checkoutSpan?.end()
                    }
                } else {
                    checkoutSpan?.setAttribute(key: "checkout_result", value: "failed_at_payment")
                    checkoutSpan?.end()
                }
            }
        } else {
            checkoutSpan?.setAttribute(key: "checkout_result", value: "failed_at_validation")
            checkoutSpan?.end()
        }
    }
}

// Helper methods with their own spans
func validateCart(completion: @escaping (Bool) -> Void) {
    let span = Embrace.client?.startSpan(name: "cart_validation")
    
    // Validation logic
    let isValid = performCartValidation()
    
    span?.setAttribute(key: "cart_valid", value: isValid ? "true" : "false")
    span?.end()
    
    completion(isValid)
}

func processPayment(completion: @escaping (Bool) -> Void) {
    let span = Embrace.client?.startSpan(name: "payment_processing")
    
    // Payment logic
    performPayment { success in
        span?.setAttribute(key: "payment_success", value: success ? "true" : "false")
        span?.end()
        
        completion(success)
    }
}

func confirmOrder(completion: @escaping (Bool) -> Void) {
    let span = Embrace.client?.startSpan(name: "order_confirmation")
    
    // Order confirmation logic
    confirmOrderOnServer { success in
        span?.setAttribute(key: "confirmation_success", value: success ? "true" : "false")
        span?.end()
        
        completion(success)
    }
}
```

## Tracking UI Performance

Monitor UI rendering and user interaction performance:

```swift
class ProductListViewController: UIViewController {
    override func viewDidLoad() {
        super.viewDidLoad()
        Embrace.client?.logMessage("ProductList viewDidLoad started", severity: .info)
        
        // Setup UI
        setupUI()
        
        Embrace.client?.logMessage("ProductList viewDidLoad completed", severity: .info)
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        
        let span = Embrace.client?.startSpan(name: "product_list_loading")
        
        // Load data
        loadProducts { [weak self, weak span] products in
            self?.updateUI(with: products)
            
            span?.setAttribute(key: "product_count", value: "\(products.count)")
            span?.end()
        }
    }
    
    private func loadProducts(completion: @escaping ([Product]) -> Void) {
        // Loading logic
    }
    
    private func updateUI(with products: [Product]) {
        let span = Embrace.client?.startSpan(name: "product_list_ui_update")
        
        // UI update logic
        collectionView.reloadData()
        
        span?.end()
    }
}
```

## Custom Attributes for Performance Context

Add custom attributes to provide context for performance analysis:

```swift
// Track device-specific attributes
Embrace.client?.addSessionProperty(
    name: "device_performance_tier",
    value: determineDevicePerformanceTier() // e.g., "high", "medium", "low"
)

// Track user-specific attributes that might affect performance
if let userSubscriptionTier = userManager.currentUser?.subscriptionTier {
    Embrace.client?.addSessionProperty(name: "subscription_tier", value: userSubscriptionTier)
}

// Track app configuration that impacts performance
Embrace.client?.addSessionProperty(name: "image_quality", value: appSettings.imageQuality.rawValue)
Embrace.client?.addSessionProperty(name: "animations_enabled", value: appSettings.animationsEnabled ? "true" : "false")
```

## Performance Optimization Best Practices

### Set Performance Budgets

Define performance thresholds and log when they're exceeded:

```swift
func measureOperation(name: String, budget: TimeInterval, operation: () -> Void) {
    let startTime = CFAbsoluteTimeGetCurrent()
    
    operation()
    
    let duration = CFAbsoluteTimeGetCurrent() - startTime
    
    // Log if the operation exceeds its budget
    if duration > budget {
        Embrace.client?.logMessage(
            "Performance budget exceeded",
            severity: .warning,
            properties: [
                "operation": name,
                "duration": String(format: "%.4f", duration),
                "budget": String(format: "%.4f", budget),
                "overage_pct": String(format: "%.2f", (duration - budget) / budget * 100)
            ]
        )
    }
}

// Usage
measureOperation(name: "image_processing", budget: 0.1) {
    processImage(image)
}
```

### Identify Performance Regressions

Use custom events to track performance metrics over time:

```swift
func trackStartupPerformance() {
    let metrics = collectStartupMetrics()
    
    Embrace.client?.logMessage(
        "App startup completed",
        severity: .info,
        properties: [
            "time_to_interactive_ms": "\(metrics.timeToInteractive)",
            "initialization_time_ms": "\(metrics.initializationTime)",
            "resource_loading_time_ms": "\(metrics.resourceLoadingTime)",
            "first_frame_time_ms": "\(metrics.firstFrameTime)"
        ]
    )
}
```

### Correlate Performance with User Experience

Track how performance impacts user experience:

```swift
func trackScrollPerformance() {
    let scrollSpan = Embrace.client?.startSpan(name: "feed_scrolling")
    
    var dropFrameCount = 0
    let fpsCalculator = FPSCalculator()
    
    // Start monitoring scroll performance
    fpsCalculator.start()
    
    // When scrolling ends
    scrollDidEnd { [weak scrollSpan] in
        let performanceMetrics = fpsCalculator.stop()
        
        scrollSpan?.setAttribute(key: "avg_fps", value: String(format: "%.2f", performanceMetrics.averageFPS))
        scrollSpan?.setAttribute(key: "min_fps", value: String(format: "%.2f", performanceMetrics.minFPS))
        scrollSpan?.setAttribute(key: "max_fps", value: String(format: "%.2f", performanceMetrics.maxFPS))
        scrollSpan?.setAttribute(key: "dropped_frames", value: "\(performanceMetrics.droppedFrames)")
        
        scrollSpan?.end()
    }
}
```

TODO: Add examples for measuring performance in SwiftUI
TODO: Include examples for tracking performance with async/await operations
TODO: Add examples for benchmarking critical operations 