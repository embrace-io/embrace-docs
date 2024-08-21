---
title: Configuration using Embrace Options
sidebar_position: 4
---

# Configuring the SDK

The `Embrace.Options` object used to initialize your Embrace client is the configuration object for the SDK. It allows you to customize Embrace's behavior in the SDK. Many of these arguments are optional and are not required to get your app up and running.

## Configuration Options

Here is a [convenience initializer](https://github.com/embrace-io/embrace-apple-sdk/blob/main/Sources/EmbraceIO/Options/Options%2BCaptureService.swift) of the `Embrace.Options` object from the recommended `EmbraceIO` product, with all configurations included:

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

The configuration arguments here are:
- `appId`: the App ID for your Embrace application. This is the only required field. This can be found in your [dashboard.](/ios/5x/integration/login-embrace-dashboard)
- `appGroudId`: the ID for the [Apple App Group](https://developer.apple.com/documentation/xcode/configuring-app-groups) that your app belongs to, if any.
- `platform`: the mobile platform that the current application is running in. `.default` points to iOS, but there are also options for Unity, ReactNative, and Flutter.
- `endpoints`: the [`Embrace.Endpoints`](https://github.com/embrace-io/embrace-apple-sdk/blob/main/Sources/EmbraceCore/Options/Embrace%2BEndpoints.swift) object that configure the endpoints the SDK can use to upload data and fetch remote configurations.
- `logLevel`: the level of severity for Xcode console logs. Set to `.none` to turn off console logging.
- `export`: an [`OpenTelemetryExport`](https://github.com/embrace-io/embrace-apple-sdk/blob/main/Sources/EmbraceCore/Public/OpenTelemetryExport.swift) object that can export logs and traces to the backend of your choice.

:::info 
If you are not an existing Embrace customer, you can still start the SDK by using `NOEMB` as your appId.
:::

Additional arguments from the [core Embrace.Options initializer](https://github.com/embrace-io/embrace-apple-sdk/blob/main/Sources/EmbraceCore/Options/Embrace%2BOptions.swift#L37) may add flexibility with additional configuration for:
- `captureServices`: out-of-the-box [`CaptureServices`](https://github.com/embrace-io/embrace-apple-sdk/blob/main/Sources/EmbraceCore/Capture/CaptureServices.swift) that automatically capture the mobile events that Embrace's SDK sends to the backend, like networking and memory warnings. You can extend the base `CaptureService` for new services that fit your use-case.
- `crashReporter`: by default, an [`EmbraceCrashReporter`](https://github.com/embrace-io/embrace-apple-sdk/blob/main/Sources/EmbraceCrash/EmbraceCrashReporter.swift).

## Building for Different Releases

Building `Embrace.Options` in-code allows flexibility for changing the Embrace application you're working on. When initializing the SDK, you can provide different `Embrace.Options` at compile time to switch build configurations:

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
            appId: "Your App ID",
            appGroupId: nil
        )
    }
#endif
```
