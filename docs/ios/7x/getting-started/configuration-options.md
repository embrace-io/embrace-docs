---
title: Configuration Options
description: Advanced configuration options for the Embrace Apple SDK 7.x
sidebar_position: 3
---

## Configuration Options

The `EmbraceIO.Options` object used to initialize your Embrace SDK provides extensive configuration capabilities. Many of these arguments are optional and are not required for basic functionality but allow you to customize Embrace's behavior to suit your needs.

`EmbraceIO.Options` is created through factory methods rather than a public initializer:

- `EmbraceIO.Options.withAppId(_:...)` — the standard way to configure the SDK against your Embrace App ID.
- `EmbraceIO.Options.withLocalConfiguration(_:...)` — used when running the SDK without an App ID (for example, when exporting exclusively to your own OpenTelemetry backend).

### Available Configuration Options

Here is a comprehensive view of the available options:

```swift
EmbraceIO.Options.withAppId(
    "Your App ID",
    platform: .default,
    endpoints: EmbraceEndpoints(
        baseURL: "baseURLString",
        developmentBaseURL: "developmentBaseURLString",
        configBaseURL: "configBaseURLString"
    ),
    captureServices: .default(),
    crashReporter: .embrace,
    logLevel: .default,
    otel: EmbraceIO.OTelOptions(
        spanExporters: [
            JaegerSpanExporter(
                serviceName: "jaegerServiceName",
                collectorAddress: "jaegerCollectorAddress"
            )
        ]
    )
)
```

#### Core Setup Parameters

- **`appId`**: The App ID for your Embrace application. This is the only required field for basic setup. You can find this in your Embrace dashboard.
- **`platform`**: The mobile platform that the application is using, as an `EmbracePlatform`. `.default` should be used for native apps , but there are also options for Unity, ReactNative, and Flutter.
- **`endpoints`**: The [`EmbraceEndpoints`](https://github.com/embrace-io/embrace-apple-sdk/blob/main/Sources/EmbraceCore/Options/Embrace%2BEndpoints.swift) object that configures the endpoints the SDK can use to upload data and fetch remote configurations.
- **`captureServices`**: The [`EmbraceIO.CaptureServicesOptions`](/ios/7x/api-reference/capture-services.md) that determine which out-of-the-box services automatically capture mobile events like networking and memory warnings. `.default()` installs the standard set of services.
- **`crashReporter`**: Selects the crash reporter to install. This is an enum with three cases: `.embrace` (the default, Embrace's bundled reporter), `.crashlytics` (bridge crash data from Firebase Crashlytics), or `.none` (install no crash reporter).
- **`logLevel`**: The `EmbraceLogLevel` used for Xcode console logs. Set to `.none` to turn off console logging.
- **`otel`**: An [`EmbraceIO.OTelOptions`](/ios/7x/advanced-features/opentelemetry-export.md) object that can export logs and traces to the backend of your choice.

:::info Removed in 7.x
The 6.x `appGroupId` option has been removed. The 6.x `export` / `processors` options are
replaced by the `otel` option (`EmbraceIO.OTelOptions`), which now accepts arrays of span and
log exporters and processors.
:::

### Using the SDK Without the Embrace Dashboard

The Embrace Apple SDK can be used without connecting to Embrace. Use the `withLocalConfiguration` factory when you are exporting your mobile telemetry to a different source. In this mode the `otel` option is required, since the generated data will not be uploaded to Embrace's servers:

```swift
EmbraceIO.Options.withLocalConfiguration(
    otel: EmbraceIO.OTelOptions(
        spanExporters: [
            OtlpHttpTraceExporter(
                // Set up the destination for your exported spans
            )
        ]
    )
)
```

You can also set up different capabilities to replace the configuration that Embrace offers:

```swift
EmbraceIO.Options.withLocalConfiguration(
    MyConfigurable(),  // Custom EmbraceConfigurable implementation
    logLevel: .debug,
    otel: EmbraceIO.OTelOptions(
        spanExporters: [
            OtlpHttpTraceExporter(
                // Set up the destination for your exported spans
            )
        ],
        logExporters: [
            OtlpHttpLogExporter(
                // Set up the destination for your exported logs
            )
        ]
    )
)
```

Note that with this setup, the SDK does not connect to the Embrace backend and doesn't receive remote configuration options. The first argument is an [`EmbraceConfigurable`](https://github.com/embrace-io/embrace-apple-sdk/blob/main/Sources/EmbraceConfiguration/EmbraceConfigurable.swift) object that replaces the remote configuration (it defaults to `.default`).

### Environment-Specific Configurations

You can create different configurations for different environments (development, staging, production) using compile-time conditions:

```swift
#if DEBUG
    var embraceOptions: EmbraceIO.Options {
        return .withAppId(
            "Your Debug App ID",
            logLevel: .debug
        )
    }
#else
    var embraceOptions: EmbraceIO.Options {
        return .withAppId(
            "Your Production App ID"
        )
    }
#endif
```

This allows you to have more verbose logging in development while keeping production builds streamlined.

### Recommendations for Optimal Configuration

- For development builds, use `.debug` log level to get more information
- For production builds, use the default log level or `.none` to minimize console output
- Configure capture services based on your application's needs
- Set up appropriate error handling for SDK initialization
- If using push notifications, add the push notification capture service

### Next Steps

After configuring the SDK, you should explore:

- [Migration from 6.x](/ios/7x/getting-started/migration-guide.md) if you're upgrading
- Core concepts to understand how the SDK works
- Automatic instrumentation for built-in monitoring capabilities
