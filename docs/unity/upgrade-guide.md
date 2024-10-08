# Upgrade Guide

# Upgrading from 1.x to 2.x

:::info Summary
- On iOS, Embrace Unity SDK requires additional initialization step via code.
- Moments have been replaced by Traces
- Some deprecated features have been removed
- Remove deprecated properties from Gradle file
- Some features still have yet to be migrated
:::

## iOS SDK Code Initialization

The Embrace Unity SDK internally depends on the Embrace Apple SDK. As a result, from 6.0.0 onwards the SDK no longer uses a .plist file to hold Embrace-specific configuration. 

You should continue to configure the Embrace Unity SDK on iOS the same as before, but now requiring that you pass the `App Id` via `EmbraceStartupArgs` when calling `StartSDK`

```cs
// Old 1.x Method
Embrace.Instance.StartSDK();

// New 2.x Method
EmbraceStartupArgs args = new EmbraceStartupArgs("AppID");
Embrace.Instance.StartSDK(args);
```

The Embrace Apple SDK has additional configuration options available; these are not yet configurable in the Embrace Unity SDK. In the future these will become available via `EmbraceStartupArgs`

## Moments have been replaced by Traces

[Moments](/docs/unity/features/moments.md) are not present in Unity 2.x onwards. We made this decision as part of our migration to build on top of OpenTelemetry APIs and to standardize the telemetry coming from our SDKs.

Luckily, [Performance Traces](/docs/unity/features/performance-tracing.md) serve the same purposes as Moments, with greatly enhanced capabilities. Built on [OTel Spans](https://opentelemetry.io/docs/concepts/signals/traces/), Performance Traces capture end-to-end journeys made of multiple spans. Traces can contain many spans as "children", as well as attributes and events that offer flexibility on the client and numerous aggregation options on the backend. This instrumentation allows you trace an entire process by breaking it down into smaller units of work.

A span is simply an operation occurring over a period of time. Using spans, you can track how long operations within the app take, and more. Note that, in building on existing OTel APIs, the Embrace Unity SDK does not have instrumentation for an object called a "trace". Instead, a trace is the root span for a given workflow.

For usage, please refer to our documentation on [Performance Traces](/docs/unity/features/performance-tracing.md).

## Some deprecated features have been removed
- Embrace Android Bug Shake API removed
- `logUnhandledUnityException`
    - Use `LogUnhandledUnityException` instead
- `LogMessage` with the `allowScreenshot` argument
    - Remove the `allowScreenshot` bool from all `LogMessage` calls
- `IMoments` API removed
- `LogNetworkRequest` and `RecordNetworkRequest` removed
    - Use `RecordCompleteNetworkRequest` and `RecordIncompleteNetworkRequest` instead
- `SetUserPersona` removed
    - Use `AddUserPersona` instead

## Remove deprecated properties from Gradle file

Please refer to the [list](/docs/android/upgrading/#remove-deprecated-properties-from-your-buildgradle) on the Embrace Android SDK Upgrade Guide for now deprecated `build.gradle` properties.

## Some features still have yet to be migrated
- Replacement for `EndAppStartup` planned for both Embrace Android and Embrace Apple SDKs
- Please refer to the Embrace Apple SDK [Upgrade Guide](/docs/ios/open-source/upgrade-guide/#features-still-to-be-migrated) for as of yet unsupported features on iOS