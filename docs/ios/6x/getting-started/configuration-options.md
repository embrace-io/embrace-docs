---
title: Configuration Options
description: Advanced configuration options for the Embrace iOS SDK 6.x
sidebar_position: 3
---

# Configuration Options

The `Embrace.Options` object used to initialize your Embrace client provides extensive configuration capabilities for the SDK. Many of these arguments are optional and are not required for basic functionality but allow you to customize Embrace's behavior to suit your needs.

## Available Configuration Options

Here is a comprehensive view of the available options:

```swift
Embrace.Options(
    appId: "Your App ID",
    appGroupId: "Your App Group ID",
    platform: .default,
    endpoints: Embrace.Endpoints(
        baseURL: "baseURLString",
        developmentBaseURL: "developmentBaseURLString",
        configBaseURL: "configBaseURLString"
    ),
    logLevel: .default,
    export: OpenTelemetryExport(
        spanExporter: JaegerSpanExporter(
            serviceName: "jaegerServiceName",
            collectorAddress: "jaegerCollectorAddress"
        )
    )
)
```

### Core Setup Parameters

- **`appId`**: The App ID for your Embrace application. This is the only required field for basic setup. You can find this in your Embrace dashboard.
- **`appGroupId`**: The ID for the [Apple App Group](https://developer.apple.com/documentation/xcode/configuring-app-groups) that your app belongs to, if any.
- **`platform`**: The mobile platform that the current application is running in. `.default` points to iOS, but there are also options for Unity, ReactNative, and Flutter.
- **`endpoints`**: The [`Embrace.Endpoints`](https://github.com/embrace-io/embrace-apple-sdk/blob/main/Sources/EmbraceCore/Options/Embrace%2BEndpoints.swift) object that configures the endpoints the SDK can use to upload data and fetch remote configurations.
- **`logLevel`**: The level of severity for Xcode console logs. Set to `.none` to turn off console logging.
- **`export`**: An [`OpenTelemetryExport`](https://github.com/embrace-io/embrace-apple-sdk/blob/main/Sources/EmbraceCore/Public/OpenTelemetryExport.swift) object that can export logs and traces to the backend of your choice.

### Advanced Options

Additional arguments from the [core Embrace.Options initializer](https://github.com/embrace-io/embrace-apple-sdk/blob/main/Sources/EmbraceCore/Options/Embrace%2BOptions.swift#L37) provide more flexibility:

- **`captureServices`**: Out-of-the-box [`CaptureServices`](https://github.com/embrace-io/embrace-apple-sdk/blob/main/Sources/EmbraceCore/Capture/CaptureServices.swift) that automatically capture mobile events like networking and memory warnings. When using the convenience initializers, the SDK includes services for URLSession network monitoring, view tracking, tap capture, WebView monitoring, and system events (but not push notifications, which must be added manually). You can extend the base `CaptureService` for new services that fit your use case.
- **`crashReporter`**: By default, an [`EmbraceCrashReporter`](https://github.com/embrace-io/embrace-apple-sdk/blob/main/Sources/EmbraceCore/Crash/EmbraceCrashReporter.swift) is used, but you can customize this.

## Using the SDK Without the Embrace Dashboard

Versions 6.5 and higher of the Embrace Apple SDK allow developers to use the SDK without connecting to Embrace. You can initialize the SDK without an `appId` argument if you are using an exporter to send your mobile telemetry to a different source:

```swift
Embrace.Options(
    export: .init(
        spanExporter: OtlpHttpTraceExporter(
            // Set up the destination for your exported spans
        )
    )
)
```

You can also set up different capabilities to replace the configuration that Embrace offers:

```swift
Embrace.Options(
    export: .init(
        spanExporter: OtlpHttpTraceExporter(
            // Set up the destination for your exported spans
        ),
        logExporter: OtlpHttpLogExporter(
            // Set up the destination for your exported logs
        )
    ),
    logLevel: .debug,
    runtimeConfiguration: MyConfigurable()  // Custom configuration implementation
)
```

Note that with this setup, the SDK does not connect to the Embrace backend and doesn't receive remote configuration options. The `runtimeConfiguration` argument uses an [EmbraceConfigurable object](https://github.com/embrace-io/embrace-apple-sdk/blob/main/Sources/EmbraceConfiguration/EmbraceConfigurable.swift) that replaces the remote configuration.

## Environment-Specific Configurations

You can create different configurations for different environments (development, staging, production) using compile-time conditions:

```swift
#if DEBUG
    var embraceOptions: Embrace.Options {
        return .init(
            appId: "Your Debug App ID",
            appGroupId: nil,
            logLevel: .debug
        )
    }
#else
    var embraceOptions: Embrace.Options {
        return .init(
            appId: "Your Production App ID",
            appGroupId: nil
        )
    }
#endif
```

This allows you to have more verbose logging in development while keeping production builds streamlined.

## Recommendations for Optimal Configuration

- For development builds, use `.debug` log level to get more information
- For production builds, use the default log level or `.none` to minimize console output
- Configure capture services based on your application's needs
- Set up appropriate error handling for SDK initialization
- If using push notifications, add the `PushNotificationCaptureService` manually

## Next Steps

After configuring the SDK, you should explore:

- [Migration from 5.x](/ios/6x/getting-started/migration-guide.md) if you're upgrading
- Core concepts to understand how the SDK works
- Automatic instrumentation for built-in monitoring capabilities 
