---
title: Logging
description: Capture log messages with different severity levels in your iOS app
sidebar_position: 6
---

# Logging

Embrace's logging capabilities allow you to capture log messages with different severity levels, providing valuable context for troubleshooting and debugging issues in your app.

## Understanding Logging in Embrace

Logs in Embrace serve several purposes:
- Providing context about what happened during a session
- Highlighting important application events
- Capturing debug information for troubleshooting
- Tracking errors and warnings that might affect user experience

Logs are organized by severity level and are associated with the session in which they occurred.

## Log Severity Levels

Embrace supports multiple log severity levels:

- **Info**: General information about app operation
- **Warning**: Potential issues that didn't prevent functionality
- **Error**: Errors that affected functionality but didn't crash the app
- **Debug**: Detailed information for debugging (not visible in production by default)

## Basic Logging

The simplest way to log a message is with the `logMessage` method:

```swift
// Log an informational message
Embrace.client?.logMessage("User viewed product details", severity: .info)

// Log a warning
Embrace.client?.logMessage("Image failed to load but fallback displayed", severity: .warning)

// Log an error
Embrace.client?.logMessage("Payment processing failed", severity: .error)

// Log debug information
Embrace.client?.logMessage("Cache hit ratio: 0.85", severity: .debug)
```

## Adding Properties to Logs

You can add additional context to your logs with properties:

```swift
// Log with properties
Embrace.client?.logMessage(
    "Purchase attempt failed",
    severity: .error,
    properties: [
        "product_id": productId,
        "price": price.description,
        "payment_method": paymentMethod,
        "error_code": errorCode.description
    ]
)
```

Properties help you filter and search logs more effectively.

## Logging Errors

For errors, you can use a specialized method that captures the error object:

```swift
do {
    try processPayment(amount: amount)
} catch let error {
    Embrace.client?.logError(
        error,
        properties: [
            "amount": amount.description,
            "currency": currency,
            "payment_method": paymentMethod
        ]
    )
    // Handle the error
}
```

This preserves the error type and message for better debugging.

## Integrating with Existing Logging Systems

### Using OSLog / Unified Logging

If you're using Apple's Unified Logging system, you can integrate it with Embrace:

```swift
import os.log

class Logger {
    private static let subsystem = "com.yourcompany.yourapp"
    static let network = OSLog(subsystem: subsystem, category: "network")
    static let ui = OSLog(subsystem: subsystem, category: "ui")
    static let data = OSLog(subsystem: subsystem, category: "data")
    
    static func log(_ message: String, to log: OSLog, type: OSLogType) {
        os_log("%{public}@", log: log, type: type, message)
        
        // Mirror to Embrace
        switch type {
        case .debug:
            Embrace.client?.logMessage(message, severity: .debug)
        case .info:
            Embrace.client?.logMessage(message, severity: .info)
        case .error:
            Embrace.client?.logMessage(message, severity: .error)
        case .fault:
            Embrace.client?.logMessage(message, severity: .error)
        default:
            Embrace.client?.logMessage(message, severity: .info)
        }
    }
}

// Usage
Logger.log("API request started", to: Logger.network, type: .info)
```

### Using CocoaLumberjack

If you're using CocoaLumberjack, you can create a custom logger that forwards logs to Embrace:

```swift
import CocoaLumberjack

class EmbraceLogger: DDAbstractLogger {
    override func log(message logMessage: DDLogMessage) {
        let message = logMessage.message
        
        // Map CocoaLumberjack log levels to Embrace severities
        let severity: Embrace.LogSeverity
        switch logMessage.level {
        case .verbose, .debug:
            severity = .debug
        case .info:
            severity = .info
        case .warning:
            severity = .warning
        case .error:
            severity = .error
        @unknown default:
            severity = .info
        }
        
        // Forward to Embrace
        Embrace.client?.logMessage(message, severity: severity)
    }
}

// Setup in AppDelegate
func setupLogging() {
    let embraceLogger = EmbraceLogger()
    DDLog.add(embraceLogger)
    
    // Other logger setup
    let fileLogger = DDFileLogger()
    DDLog.add(fileLogger)
    
    let consoleLogger = DDOSLogger.sharedInstance
    DDLog.add(consoleLogger)
}
```

## Common Logging Patterns

### Logging App Lifecycle

```swift
class AppDelegate: UIResponder, UIApplicationDelegate {
    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        // Setup Embrace
        setupEmbrace()
        
        // Log app launch
        Embrace.client?.logMessage(
            "App launched",
            severity: .info,
            properties: [
                "launch_type": launchOptions != nil ? "from_notification" : "normal",
                "os_version": UIDevice.current.systemVersion
            ]
        )
        
        return true
    }
    
    func applicationDidEnterBackground(_ application: UIApplication) {
        Embrace.client?.logMessage("App entered background", severity: .info)
    }
    
    func applicationWillEnterForeground(_ application: UIApplication) {
        Embrace.client?.logMessage("App will enter foreground", severity: .info)
    }
}
```

### Logging Network Activity

```swift
class APIClient {
    func performRequest<T: Decodable>(_ request: URLRequest, completion: @escaping (Result<T, Error>) -> Void) {
        let requestId = UUID().uuidString
        
        Embrace.client?.logMessage(
            "API request started",
            severity: .info,
            properties: [
                "request_id": requestId,
                "url": request.url?.absoluteString ?? "unknown",
                "method": request.httpMethod ?? "GET"
            ]
        )
        
        let startTime = Date()
        
        URLSession.shared.dataTask(with: request) { data, response, error in
            let duration = Date().timeIntervalSince(startTime)
            
            if let error = error {
                Embrace.client?.logError(
                    error,
                    properties: [
                        "request_id": requestId,
                        "duration": String(format: "%.2f", duration)
                    ]
                )
                completion(.failure(error))
                return
            }
            
            guard let httpResponse = response as? HTTPURLResponse else {
                let error = NSError(domain: "APIClient", code: -1, userInfo: [NSLocalizedDescriptionKey: "Invalid response"])
                Embrace.client?.logError(error)
                completion(.failure(error))
                return
            }
            
            if httpResponse.statusCode >= 400 {
                Embrace.client?.logMessage(
                    "API request failed with status \(httpResponse.statusCode)",
                    severity: .error,
                    properties: [
                        "request_id": requestId,
                        "status_code": String(httpResponse.statusCode),
                        "duration": String(format: "%.2f", duration),
                        "response_body": String(data: data ?? Data(), encoding: .utf8) ?? "empty"
                    ]
                )
                
                let error = NSError(domain: "APIClient", code: httpResponse.statusCode, userInfo: [NSLocalizedDescriptionKey: "HTTP error \(httpResponse.statusCode)"])
                completion(.failure(error))
                return
            }
            
            // Log successful request
            Embrace.client?.logMessage(
                "API request completed successfully",
                severity: .info,
                properties: [
                    "request_id": requestId,
                    "status_code": String(httpResponse.statusCode),
                    "duration": String(format: "%.2f", duration),
                    "response_size": String(data?.count ?? 0)
                ]
            )
            
            // Parse response
            do {
                guard let data = data else {
                    throw NSError(domain: "APIClient", code: -1, userInfo: [NSLocalizedDescriptionKey: "No data received"])
                }
                
                let decoded = try JSONDecoder().decode(T.self, from: data)
                completion(.success(decoded))
            } catch let decodingError {
                Embrace.client?.logError(
                    decodingError,
                    properties: [
                        "request_id": requestId,
                        "error_type": "decoding_error"
                    ]
                )
                completion(.failure(decodingError))
            }
        }.resume()
    }
}
```

### Logging User Actions

```swift
class CheckoutViewController: UIViewController {
    @IBAction func payButtonTapped(_ sender: UIButton) {
        Embrace.client?.logMessage(
            "User tapped pay button",
            severity: .info,
            properties: [
                "cart_value": cartManager.totalValue.description,
                "item_count": cartManager.itemCount.description,
                "payment_method": selectedPaymentMethod
            ]
        )
        
        processPayment()
    }
    
    private func processPayment() {
        paymentService.processPayment(amount: cartManager.totalValue) { [weak self] result in
            guard let self = self else { return }
            
            switch result {
            case .success(let transaction):
                Embrace.client?.logMessage(
                    "Payment processed successfully",
                    severity: .info,
                    properties: [
                        "transaction_id": transaction.id,
                        "amount": transaction.amount.description
                    ]
                )
                
                self.showConfirmation(transaction)
                
            case .failure(let error):
                Embrace.client?.logError(
                    error,
                    properties: [
                        "amount": self.cartManager.totalValue.description,
                        "payment_method": self.selectedPaymentMethod
                    ]
                )
                
                self.showError(error)
            }
        }
    }
}
```

## Best Practices

### Log Levels

Use the appropriate severity level for each log:
- **Info**: Normal operation events, user actions, state changes
- **Warning**: Non-critical issues, degraded functionality, retries
- **Error**: Failed operations, user-impacting issues
- **Debug**: Detailed troubleshooting information

### Meaningful Messages

Write clear, descriptive log messages:
- Include what happened and why it's significant
- Be specific but concise
- Include the operation context
- Use consistent terminology

Good examples:
- "User login failed: Invalid credentials"
- "Image cache missed for profile image ID 12345"
- "Payment processing timed out after 30 seconds"

### Structured Properties

Use properties for structured data that you might want to filter or search by:
- Use consistent property names across related logs
- Include IDs that can be used to correlate events
- Add quantitative data that might be useful for analysis
- Include state information that provides context

### Sensitive Data

Never log sensitive information:
- No passwords or authentication tokens
- No personally identifiable information (PII)
- No financial details
- No health information

### Volume Management

Be mindful of log volume:
- Don't log routine operations in high-volume code paths
- Use debug logs for detailed information that's only needed for troubleshooting
- Consider sampling for high-frequency events
- Focus on logs that provide actionable information

TODO: Add examples of how logs appear in the Embrace dashboard
TODO: Add code samples for logging best practices in different app categories
TODO: Add examples of integrating with SwiftLog 