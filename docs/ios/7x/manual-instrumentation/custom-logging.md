---
title: Logging
description: Capture log messages with different severity levels in your Apple app
sidebar_position: 2
---

## Logging

Embrace's logging capabilities allow you to capture log messages with different severity levels, providing valuable context for troubleshooting and debugging issues in your app.

### Understanding Logging in Embrace

Logs in Embrace serve several purposes:

- Providing context about what happened during a session
- Highlighting important application events
- Capturing debug information for troubleshooting
- Tracking errors and warnings that might affect user experience

Logs are organized by severity level and are associated with the session in which they occurred.

### Log Severity Levels

Embrace supports multiple log severity levels:

- **Info**: General information about app operation
- **Warning**: Potential issues that didn't prevent functionality
- **Error**: Errors that affected functionality but didn't crash the app

### Basic Logging

The simplest way to log a message is with the `log` method:

```swift
// Log an informational message
EmbraceIO.shared.log("User viewed product details", severity: .info)

// Log a warning
EmbraceIO.shared.log("Image failed to load but fallback displayed", severity: .warn)

// Log an error
EmbraceIO.shared.log("Payment processing failed", severity: .error)
```

### Adding Properties to Logs

You can add additional context to your logs with properties:

```swift
// Log with attributes
EmbraceIO.shared.log(
    "Purchase attempt failed",
    severity: .error,
    attributes: [
        "product_id": productId,
        "price": price.description,
        "payment_method": paymentMethod,
        "error_code": errorCode.description
    ]
)
```

Properties help you filter and search logs more effectively.

### Integrating with Existing Logging Systems

#### Using OSLog / Unified Logging

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
            EmbraceIO.shared.log(message, severity: .debug)
        case .info:
            EmbraceIO.shared.log(message, severity: .info)
        case .error:
            EmbraceIO.shared.log(message, severity: .error)
        case .fault:
            EmbraceIO.shared.log(message, severity: .error)
        default:
            EmbraceIO.shared.log(message, severity: .info)
        }
    }
}

// Usage
Logger.log("API request started", to: Logger.network, type: .info)
```

#### Using CocoaLumberjack

If you're using CocoaLumberjack, you can create a custom logger that forwards logs to Embrace:

```swift
import CocoaLumberjack

class EmbraceLogger: DDAbstractLogger {
    override func log(message logMessage: DDLogMessage) {
        let message = logMessage.message

        // Map CocoaLumberjack log levels to Embrace severities
        let severity: EmbraceLogSeverity
        switch logMessage.level {
        case .verbose, .debug:
            severity = .debug
        case .info:
            severity = .info
        case .warning:
            severity = .warn
        case .error:
            severity = .error
        @unknown default:
            severity = .info
        }

        // Forward to Embrace
        EmbraceIO.shared.log(message, severity: severity)
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

### Best Practices for Logging

#### Log Levels

Use appropriate log levels:

- **Info**: General operational information
- **Warning**: Unexpected behavior that doesn't impact functionality
- **Error**: Issues that impact functionality but don't crash the app

#### Contextual Information

Include relevant context in logs:

- User actions that preceded the log
- Relevant IDs (user ID, session ID, request ID)
- State information that helps understand the context
- Error codes and descriptions

#### Performance Considerations

Be mindful of logging frequency:

- Avoid excessive logging in performance-critical paths as it can impact app performance and increase data transmission
- Consider batching logs for high-frequency events to reduce overhead
- Use debug logs for verbose information that's only needed during development
- Excessive logging can impact battery life, network usage, and storage requirements

#### Sensitive Information

Never log sensitive data:

- Authentication credentials
- Personal identifiable information (PII)
- Payment information
- Access tokens

#### Structured Logging

Use a consistent structure for log messages:

- Start with the event or action being logged
- Use properties for structured data rather than concatenating into the message
- Group related logs using consistent naming

<!-- TODO: Add examples for integrating with other popular iOS logging frameworks
TODO: Include best practices for log rotation and privacy considerations  -->
