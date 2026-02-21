---
title: Network instrumentation
description: Manually instrument network requests from third-party libraries like gRPC
sidebar_position: 3
---

# Network instrumentation

While Embrace's [automatic instrumentation](../automatic-instrumentation/network-monitoring.md) captures [`URLSession`](https://developer.apple.com/documentation/foundation/urlsession) requests out of the box, manual network instrumentation allows you to track requests made by third-party libraries like gRPC that don't use URLSession.

## When to use manual network instrumentation

Consider manual network instrumentation when:

- Using gRPC or other RPC frameworks
- Using third-party networking libraries (Alamofire, AFNetworking, etc.)
- Implementing custom network protocols
- Adding business-specific context to network requests
- Tracking network operations that bypass URLSession

## Required imports

```swift
import Foundation
import EmbraceIO
```

## gRPC instrumentation

Since gRPC libraries like [`grpc-swift`](https://github.com/grpc/grpc-swift) don't use `URLSession`, their network requests aren't automatically captured. You can manually create spans that appear as HTTP requests in the [networking section](/product/network/index.md) of the Embrace dashboard.

### Basic gRPC span creation

```swift
class GRPCInstrumentation {
    func recordGRPCRequest(
        service: String,
        method: String,
        startTime: Date,
        endTime: Date,
        statusCode: Int? = nil,
        requestSize: Int? = nil,
        responseSize: Int? = nil,
        error: Error? = nil
    ) {
        guard let embrace = Embrace.client else { return }

        // Create a URL-like identifier for the gRPC call
        let grpcURL = "grpc://\(service)/\(method)"

        // Build attributes using HTTP semantic conventions
        var attributes: [String: String] = [
            "url.full": grpcURL,
            "http.request.method": "POST", // gRPC uses POST
            "rpc.service": service,
            "rpc.method": method
        ]

        if let requestSize = requestSize {
            attributes["http.request.body.size"] = String(requestSize)
        }

        if let statusCode = statusCode {
            attributes["http.response.status_code"] = String(statusCode)
        }

        if let responseSize = responseSize {
            attributes["http.response.body.size"] = String(responseSize)
        }

        if let error = error {
            let nsError = error as NSError
            attributes["error.type"] = nsError.domain
            attributes["error.code"] = String(nsError.code)
            attributes["error.message"] = error.localizedDescription
        }

        // Record the span
        embrace.recordCompletedSpan(
            name: "POST /\(service)/\(method)",
            type: .networkRequest,
            parent: nil,
            startTime: startTime,
            endTime: endTime,
            attributes: attributes,
            events: [],
            errorCode: error != nil ? .failure : nil
        )
    }
}
```

### Real-time gRPC span creation

For ongoing gRPC requests, create spans that you can update during the call:

```swift
func startGRPCSpan(service: String, method: String) -> Span? {
    guard let embrace = Embrace.client else { return nil }

    let grpcURL = "grpc://\(service)/\(method)"
    let attributes = [
        "url.full": grpcURL,
        "http.request.method": "POST",
        "rpc.service": service,
        "rpc.method": method
    ]

    return embrace.buildSpan(
        name: "POST /\(service)/\(method)",
        type: .networkRequest,
        attributes: attributes
    ).startSpan()
}

// Usage example
let span = startGRPCSpan(service: "UserService", method: "GetUser")
// ... perform gRPC call ...
span?.setAttribute(key: "http.response.status_code", value: "200")
span?.setAttribute(key: "http.response.body.size", value: "1024")
span?.end()
```

### Integration with grpc-swift

Here's how to integrate with the `grpc-swift` library:

```swift
import GRPC
import EmbraceIO

extension GRPCClient {
    func makeInstrumentedCall<Request, Response>(
        path: String,
        request: Request,
        callOptions: CallOptions? = nil,
        handler: @escaping (Response) -> Void
    ) {
        let startTime = Date()
        let span = startGRPCSpan(service: "YourService", method: path)

        // Make the actual gRPC call
        let call = makeUnaryCall(
            path: path,
            request: request,
            callOptions: callOptions
        )

        call.response.whenComplete { result in
            let endTime = Date()

            switch result {
            case .success(let response):
                span?.setAttribute(key: "http.response.status_code", value: "200")
                span?.end()
                handler(response)

            case .failure(let error):
                span?.setAttribute(key: "error.type", value: String(describing: type(of: error)))
                span?.setAttribute(key: "error.message", value: error.localizedDescription)
                span?.end(errorCode: .failure)
            }
        }
    }
}
```

## Third-party library instrumentation

### Alamofire integration

```swift
import Alamofire
import EmbraceIO

extension Session {
    func instrumentedRequest(
        _ url: URLConvertible,
        method: HTTPMethod = .get,
        parameters: Parameters? = nil,
        encoding: ParameterEncoding = URLEncoding.default,
        headers: HTTPHeaders? = nil
    ) -> DataRequest {
        let span = Embrace.client?.buildSpan(
            name: "\(method.rawValue) \(url)",
            type: .networkRequest
        )?.startSpan()

        let request = self.request(
            url,
            method: method,
            parameters: parameters,
            encoding: encoding,
            headers: headers
        )

        return request.responseData { response in
            // Add response details to span
            if let statusCode = response.response?.statusCode {
                span?.setAttribute(key: "http.response.status_code", value: String(statusCode))
            }

            if let error = response.error {
                span?.setAttribute(key: "error.message", value: error.localizedDescription)
                span?.end(errorCode: .failure)
            } else {
                span?.end()
            }
        }
    }
}
```

## Required information for manual networking

To ensure your network spans appear as network requests in the Embrace dashboard, you should add all required information listed below. Additionally, you can include some optional attributes to the network spans to enrich the telemetry you gather.

### Required information

Span type must be **`.networkRequest`** for these spans to show as network requests. This is required for proper categorization on Embrace's backend.

#### Required attributes

Additionally, the following attributes are required on the span for your network request:

- **`url.full`** - Complete URL or service identifier
- **`http.request.method`** - HTTP method (`GET`, `POST`, etc.)
- **`http.response.status_code`** - Response status code (200, 403, etc.)

### Optional attributes

- **`http.request.body.size`** - Request payload size
- **`http.response.body.size`** - Response payload size
- **`error.type`** - Error type for failed requests
- **`error.code`** - Error code
- **`error.message`** - Error description

### Naming convention

For the span's name, use the format: `"{METHOD} {path}"` (e.g., `GET /api/users`, `POST /UserService/GetUser`)

## Best practices

### 1. Consistent naming

Use the same service and method names as your API definitions:

```swift
// Good
span?.name = "POST /UserService/GetUser"

// Avoid
span?.name = "user_fetch_operation"
```

### 2. Include timing

Always record accurate start and end times:

```swift
let startTime = Date()
// ... perform network operation ...
let endTime = Date()

embrace.recordCompletedSpan(
    name: "POST /api/users",
    type: .networkRequest,
    parent: nil,
    startTime: startTime,
    endTime: endTime,
    attributes: attributes,
    events: [],
    errorCode: nil
)
```

### 3. Error handling

Capture both network errors and business logic errors:

```swift
// Network error
if let networkError = error as? URLError {
    attributes["error.type"] = "URLError"
    attributes["error.code"] = String(networkError.code.rawValue)
    attributes["error.message"] = networkError.localizedDescription
}

// Business logic error (e.g., 404, 500)
if let httpResponse = response as? HTTPURLResponse, httpResponse.statusCode >= 400 {
    attributes["http.response.status_code"] = String(httpResponse.statusCode)
    errorCode = .failure
}
```

### 4. Request/response sizes

Include payload sizes for performance analysis:

```swift
// Before sending request
attributes["http.request.body.size"] = String(requestData.count)

// After receiving response
attributes["http.response.body.size"] = String(responseData.count)
```

### 5. Parent spans

Create parent spans for complex operations with multiple network calls:

```swift
// Parent span for the entire user profile loading operation
let parentSpan = embrace.buildSpan(
    name: "load_user_profile",
    type: .performance
).startSpan()

// Child spans for individual network requests
let userSpan = embrace.buildSpan(
    name: "GET /api/user",
    type: .networkRequest
).setParent(parentSpan).startSpan()

let preferencesSpan = embrace.buildSpan(
    name: "GET /api/preferences",
    type: .networkRequest
).setParent(parentSpan).startSpan()
```

## Common patterns

### Request wrapper function

```swift
func trackNetworkRequest<T>(
    name: String,
    url: String,
    method: String,
    operation: @escaping () async throws -> T
) async throws -> T {
    let span = Embrace.client?.buildSpan(
        name: name,
        type: .networkRequest,
        attributes: [
            "url.full": url,
            "http.request.method": method
        ]
    )?.startSpan()

    do {
        let result = try await operation()
        span?.setAttribute(key: "http.response.status_code", value: "200")
        span?.end()
        return result
    } catch {
        span?.setAttribute(key: "error.message", value: error.localizedDescription)
        span?.end(errorCode: .failure)
        throw error
    }
}

// Usage
let userData = try await trackNetworkRequest(
    name: "GET /api/user",
    url: "https://api.example.com/user/123",
    method: "GET"
) {
    return try await fetchUserData()
}
```

### Custom protocol instrumentation

For WebSocket or other custom protocols:

```swift
class WebSocketInstrumentation {
    private var connectionSpan: Span?

    func startConnection(url: String) {
        connectionSpan = Embrace.client?.buildSpan(
            name: "WebSocket Connection",
            type: .networkRequest,
            attributes: [
                "url.full": url,
                "protocol": "websocket"
            ]
        )?.startSpan()
    }

    func recordMessage(direction: String, size: Int) {
        connectionSpan?.addEvent(
            name: "websocket.message",
            attributes: [
                "direction": direction,
                "size": String(size)
            ]
        )
    }

    func endConnection(error: Error? = nil) {
        if let error = error {
            connectionSpan?.setAttribute(key: "error.message", value: error.localizedDescription)
            connectionSpan?.end(errorCode: .failure)
        } else {
            connectionSpan?.end()
        }
    }
}
```

## Summary

By following these patterns and examples, you can instrument network requests from any third-party library to appear alongside your automatically-captured `URLSession` requests in the Embrace dashboard.
