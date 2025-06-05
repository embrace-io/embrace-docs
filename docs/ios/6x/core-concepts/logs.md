---
title: Logs
description: Understanding logs in the Embrace iOS SDK 6.x
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Logs

Logs provide contextual information about your application's state and events that occur during a session. The Embrace SDK's logging capabilities help you track, troubleshoot, and receive alerts about important events.

## What are Logs?

In the Embrace SDK, logs are records of events with associated severity levels, timestamps, and optional attributes. They provide critical information that can help you understand:

- Error conditions
- Warning situations
- Important state changes
- Significant user actions
- System events

Logs are especially valuable for capturing information that requires immediate attention or for troubleshooting specific issues.

## When to Use Logs

While Embrace automatically captures sessions and their associated data, there are scenarios where you may want to add custom logs:

- Hunting difficult bugs
- Troubleshooting for high-value users
- Monitoring new version rollouts
- Tracking critical business events
- Capturing error conditions that need immediate attention

## Using the Log API

The Embrace SDK provides a simple API for logging messages:

<Tabs groupId="ios-language" queryString="ios-language">
<TabItem value="swift" label="Swift">

```swift
let attributes = ["property_a": "value_a", "property_b": "value_b"]
Embrace.client?.log(
    "Loading not finished in time.", // message
    severity: .warn,
    timestamp: Date.now,
    attributes: attributes
)
```

</TabItem>
</Tabs>

The log method takes the following parameters:

1. **message**: A string representing the log message itself
2. **severity**: The [LogSeverity](https://github.com/embrace-io/embrace-apple-sdk/blob/main/Sources/EmbraceCommonInternal/Models/LogSeverity.swift) of the event (e.g., info, warn, error)
3. **timestamp**: When this log event occurred
4. **attributes**: A dictionary of key-value pairs for additional context and filtering

## Log Limits

Embrace enforces certain limits on logs:

- Maximum number of logs per session: 500
- Maximum size of logs: 10,000 bytes

If your application exceeds these limits, the newest logs will be kept and the oldest logs will be dropped.

## Log Batching

To optimize device and network performance, Embrace batches logs according to the following criteria:

- A maximum of **2 seconds** between logs: After receiving a log, we wait for 2 seconds. If no additional log arrives during that period, we send it to the backend.
- A maximum of **5 seconds** for batch lifetime: Log batches should not exist for more than 5 seconds.
- A maximum of **50 logs** per batch: This prevents issues with large batches.

## File Attachments with Logs

You can attach data to logs to provide more context for troubleshooting:

### Embrace-Hosted Attachments

```swift
let attributes = ["property_a": "value_a", "property_b": "value_b"]
Embrace.client?.log(
    "This is a log with an Embrace-hosted attachment", // message
    severity: .info,
    timestamp: Date.now,
    attachment: someData, // NSData/Data
    attributes: attributes
)
```

Limitations for Embrace-hosted attachments:
- Maximum of 5 attachments per session
- Maximum attachment size of 1 MiB (1048576 bytes)

### User-Hosted Attachments

If you need more attachments or larger files, you can host the attachments yourself and reference them:

```swift
let attributes = ["property_a": "value_a", "property_b": "value_b"]
Embrace.client?.log(
    "This is a log with a user-hosted attachment", // message
    severity: .info,
    timestamp: Date.now,
    attachmentId: attachmentId, // String
    attachmentUrl: attachmentUrl, // URL
    attributes: attributes
)
```

## Log Alerting

One of the most powerful features of Embrace logs is the ability to set up alerts based on log events. Using the Embrace Dashboard, you can configure email alerts to be sent to your team when certain thresholds are met.

For example, if you have a steady rate of 1% for a given log event, you can set a threshold to receive an alert if it rises significantly.

## Logs vs Other Concepts

- **Logs vs Traces**: While traces focus on performance and operation flow, logs provide contextual information about events and states
- **Logs vs Sessions**: Logs are events within a session that provide additional context
- **Logs vs Breadcrumbs**: Logs are more detailed and can trigger alerts, while breadcrumbs are simpler markers of user journey steps

## Best Practices

- **Be selective**: Excessive logging can impact performance and battery life
- **Use appropriate severity levels**: Reserve error and warning levels for actual problematic situations
- **Add meaningful attributes**: This helps with filtering and understanding context
- **Keep messages clear and concise**: This makes troubleshooting easier
- **Consider timing**: Use the timestamp parameter to accurately reflect when events actually occurred
- **Batch related logs**: Log related information together using consistent attribute keys

## Common Logging Patterns

### Network Failure Logging

Track network issues with detailed context for troubleshooting:

```swift
func handleNetworkRequest(url: URL, completion: @escaping (Result<Data, Error>) -> Void) {
    let startTime = Date()
    
    URLSession.shared.dataTask(with: url) { data, response, error in
        let duration = Date().timeIntervalSince(startTime)
        let httpResponse = response as? HTTPURLResponse
        
        if let error = error {
            // Log network errors with detailed context
            Embrace.client?.log(
                "Network request failed",
                severity: .error,
                attributes: [
                    "network.url": url.absoluteString,
                    "network.error_code": String((error as NSError).code),
                    "network.error_domain": (error as NSError).domain,
                    "network.duration_ms": String(Int(duration * 1000)),
                    "network.retry_count": "0" // Increment if retrying
                ]
            )
        } else if let httpResponse = httpResponse {
            if httpResponse.statusCode >= 400 {
                // Log HTTP errors
                Embrace.client?.log(
                    "HTTP request returned error status",
                    severity: .warning,
                    attributes: [
                        "network.url": url.absoluteString,
                        "network.status_code": String(httpResponse.statusCode),
                        "network.duration_ms": String(Int(duration * 1000)),
                        "network.response_size": String(data?.count ?? 0)
                    ]
                )
            } else {
                // Log successful requests for monitoring
                Embrace.client?.log(
                    "Network request completed successfully",
                    severity: .info,
                    attributes: [
                        "network.url": url.absoluteString,
                        "network.status_code": String(httpResponse.statusCode),
                        "network.duration_ms": String(Int(duration * 1000)),
                        "network.response_size": String(data?.count ?? 0)
                    ]
                )
            }
        }
        
        completion(data != nil ? .success(data!) : .failure(error ?? URLError(.unknown)))
    }.resume()
}
```

### Authentication Flow Logging

Track authentication events for security monitoring:

```swift
class AuthenticationManager {
    func login(username: String, password: String) async throws -> AuthResult {
        let loginStartTime = Date()
        
        // Log login attempt
        Embrace.client?.log(
            "User login attempt started",
            severity: .info,
            attributes: [
                "auth.username_hash": username.sha256, // Hash for privacy
                "auth.method": "password",
                "auth.client_version": Bundle.main.infoDictionary?["CFBundleShortVersionString"] as? String ?? "unknown"
            ]
        )
        
        do {
            let result = try await performLogin(username: username, password: password)
            let duration = Date().timeIntervalSince(loginStartTime)
            
            // Log successful login
            Embrace.client?.log(
                "User login successful",
                severity: .info,
                attributes: [
                    "auth.username_hash": username.sha256,
                    "auth.duration_ms": String(Int(duration * 1000)),
                    "auth.user_tier": result.userTier,
                    "auth.session_type": result.sessionType
                ]
            )
            
            // Update user context
            Embrace.client?.metadata.userIdentifier = result.userId
            try? Embrace.client?.metadata.add(persona: PersonaTag("authenticated"), lifespan: .process)
            
            return result
            
        } catch let authError as AuthenticationError {
            let duration = Date().timeIntervalSince(loginStartTime)
            
            // Log authentication failure with detailed error info
            Embrace.client?.log(
                "User login failed",
                severity: .warning,
                attributes: [
                    "auth.username_hash": username.sha256,
                    "auth.error_type": authError.type.rawValue,
                    "auth.error_code": String(authError.code),
                    "auth.duration_ms": String(Int(duration * 1000)),
                    "auth.retry_count": String(authError.retryCount)
                ]
            )
            
            throw authError
        }
    }
    
    func logout() {
        Embrace.client?.log(
            "User logout initiated",
            severity: .info,
            attributes: [
                "auth.logout_type": "user_initiated",
                "auth.session_duration": String(getCurrentSessionDuration())
            ]
        )
        
        // Clear user context
        Embrace.client?.metadata.userIdentifier = nil
        Embrace.client?.metadata.clearUserProperties()
    }
}
```

### Performance Bottleneck Logging

Log performance issues with detailed timing information:

```swift
class PerformanceLogger {
    func trackCriticalOperation<T>(
        operation: String,
        expectedDuration: TimeInterval,
        work: () async throws -> T
    ) async rethrows -> T {
        let startTime = Date()
        let startMemory = getCurrentMemoryUsage()
        
        do {
            let result = try await work()
            let duration = Date().timeIntervalSince(startTime)
            let endMemory = getCurrentMemoryUsage()
            let memoryDelta = endMemory - startMemory
            
            // Log performance metrics
            let severity: LogSeverity = duration > expectedDuration ? .warning : .info
            let message = duration > expectedDuration ? 
                "Operation exceeded expected duration" : 
                "Operation completed within expected time"
            
            Embrace.client?.log(
                message,
                severity: severity,
                attributes: [
                    "performance.operation": operation,
                    "performance.duration_ms": String(Int(duration * 1000)),
                    "performance.expected_duration_ms": String(Int(expectedDuration * 1000)),
                    "performance.memory_delta_mb": String(format: "%.2f", memoryDelta / 1024 / 1024),
                    "performance.exceeded_threshold": String(duration > expectedDuration),
                    "performance.device_model": UIDevice.current.model
                ]
            )
            
            return result
            
        } catch {
            let duration = Date().timeIntervalSince(startTime)
            
            // Log performance issues that led to errors
            Embrace.client?.log(
                "Critical operation failed with performance implications",
                severity: .error,
                attributes: [
                    "performance.operation": operation,
                    "performance.duration_ms": String(Int(duration * 1000)),
                    "performance.error_type": String(describing: type(of: error)),
                    "performance.error_message": error.localizedDescription
                ]
            )
            
            throw error
        }
    }
    
    func logMemoryPressure(level: MemoryPressureLevel) {
        Embrace.client?.log(
            "Memory pressure detected",
            severity: level == .critical ? .error : .warning,
            attributes: [
                "memory.pressure_level": level.rawValue,
                "memory.current_usage_mb": String(format: "%.2f", getCurrentMemoryUsage() / 1024 / 1024),
                "memory.available_mb": String(format: "%.2f", getAvailableMemory() / 1024 / 1024),
                "memory.app_state": UIApplication.shared.applicationState.description
            ]
        )
    }
    
    private func getCurrentMemoryUsage() -> UInt64 {
        var info = mach_task_basic_info()
        var count = mach_msg_type_number_t(MemoryLayout<mach_task_basic_info>.size)/4
        
        let kerr: kern_return_t = withUnsafeMutablePointer(to: &info) {
            $0.withMemoryRebound(to: integer_t.self, capacity: 1) {
                task_info(mach_task_self_, task_flavor_t(MACH_TASK_BASIC_INFO), $0, &count)
            }
        }
        
        return kerr == KERN_SUCCESS ? info.resident_size : 0
    }
}

enum MemoryPressureLevel: String {
    case normal = "normal"
    case warning = "warning" 
    case critical = "critical"
}
```

### Database Operation Logging

Track database performance and errors:

```swift
class DatabaseLogger {
    func logDatabaseOperation<T>(
        operation: String,
        table: String,
        work: () throws -> T
    ) rethrows -> T {
        let startTime = Date()
        
        do {
            let result = try work()
            let duration = Date().timeIntervalSince(startTime)
            
            // Log successful database operations
            Embrace.client?.log(
                "Database operation completed",
                severity: duration > 1.0 ? .warning : .debug, // Warn if over 1 second
                attributes: [
                    "database.operation": operation,
                    "database.table": table,
                    "database.duration_ms": String(Int(duration * 1000)),
                    "database.thread": Thread.isMainThread ? "main" : "background"
                ]
            )
            
            return result
            
        } catch {
            let duration = Date().timeIntervalSince(startTime)
            
            // Log database errors with context
            Embrace.client?.log(
                "Database operation failed",
                severity: .error,
                attributes: [
                    "database.operation": operation,
                    "database.table": table,
                    "database.duration_ms": String(Int(duration * 1000)),
                    "database.error_code": String((error as NSError).code),
                    "database.error_domain": (error as NSError).domain,
                    "database.error_message": error.localizedDescription,
                    "database.thread": Thread.isMainThread ? "main" : "background"
                ]
            )
            
            throw error
        }
    }
}
```

### UI Responsiveness Logging

Track UI performance issues:

```swift
class UIPerformanceLogger {
    func logViewControllerLifecycle(
        viewController: String,
        lifecycle: String,
        duration: TimeInterval
    ) {
        let severity: LogSeverity = duration > 0.5 ? .warning : .debug
        
        Embrace.client?.log(
            "View controller lifecycle event",
            severity: severity,
            attributes: [
                "ui.view_controller": viewController,
                "ui.lifecycle_event": lifecycle,
                "ui.duration_ms": String(Int(duration * 1000)),
                "ui.is_slow": String(duration > 0.5),
                "ui.device_orientation": UIDevice.current.orientation.description
            ]
        )
    }
    
    func logMainThreadBlock(duration: TimeInterval, operation: String) {
        if duration > 0.1 { // Log if main thread blocked for more than 100ms
            Embrace.client?.log(
                "Main thread blocked",
                severity: duration > 0.5 ? .error : .warning,
                attributes: [
                    "ui.blocked_duration_ms": String(Int(duration * 1000)),
                    "ui.blocking_operation": operation,
                    "ui.severity_level": duration > 0.5 ? "critical" : "moderate"
                ]
            )
        }
    }
}
```

These patterns provide comprehensive logging for the most common performance and reliability issues in iOS applications, helping you quickly identify and resolve problems.
