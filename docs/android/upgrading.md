# Upgrade guide

## Upgrading from 6.x to 7.x

Version 7 of the Embrace Android SDK introduces several breaking changes and enhancements. You should update your app to accommodate these changes before building with 7.x.

Below is a list of everything that has changed and how to address it in your codebase.

### Breaking changes

- The **embrace-android-fcm** and **embrace-android-compose** Gradle modules are no longer automatically added by Embrace’s Gradle plugin.  
  - **Action**: Add them manually to your `build.gradle` if you need them.
- The `startMoment/endMoment` APIs have been removed.  
  - **Action**: Use `startSpan/recordSpan` instead.
- `Embrace.AppFramework` is now a top-level class named `AppFramework`.
- `Embrace.LastRunEndState` is now a top-level class named `LastRunEndState`.
- Some public APIs are now implemented in Kotlin rather than Java, with slight changes to their signatures.  
  - **Action**: Replace Java overloads with Kotlin default parameters where applicable.
- View taps no longer capture coordinates by default.  
  - **Action**: Set `sdk_config.taps.capture_coordinates = true` in your `embrace-config.json` if you need them.
- Several internally used classes and symbols have been hidden from the public API.
- Recording a custom trace ID from a custom request header is no longer supported.  
  - **Action**: Continue using `x-emb-trace-id` for custom trace IDs.
- Methods to add and remove the `payer` Persona have been removed.  
  - **Action**: Use the generic Persona API methods with the name `"payer"`.
- The `setAppId` API has been removed (changing `appId` at runtime is no longer supported).
- Several remote and local config properties have been removed.  
  - **Action**: If you specify any of these in `embrace-config.json`, remove them:
    - `sdk_config.beta_features_enabled`
    - `sdk_config.anr.capture_google`
    - `sdk_config.background_activity.manual_background_activity_limit`
    - `sdk_config.background_activity.min_background_activity_duration`
    - `sdk_config.background_activity.max_cached_activities`
    - `sdk_config.base_urls.images`
    - `sdk_config.networking.trace_id_header`
    - `sdk_config.startup_moment.automatically_end`
- The following properties are removed from the Embrace Gradle plugin.  
  - **Action**: Remove them if they appear in your build scripts:
    - `customSymbolsDirectory`
    - `jarSkipList`
    - `encodeExtractedFileNames`
- Embrace no longer attempts to detect other signal handlers and reinstall itself by default.  
  - **Action**: If you notice changes in NDK crash reports, you can re-enable this behavior with `sdk_config.sig_handler_detection = true`.

:::info Summary
- Remove deprecated properties from your Gradle files.  
- Replace usage of any deprecated methods (see table below). 
- Remove references to internal symbols that were previously exposed.
- Use **OkHttp 4.0.0** or later (though 3.13.0+ is supported, it’s not recommended).
:::

## Moments have been superseded by Traces

[Traces](/docs/android/features/traces.md) serve the same purposes as [Moments](/docs/android/features/moments.md), with greatly enhanced capabilities. Built on [OTel Spans](https://opentelemetry.io/docs/concepts/signals/traces/), Traces capture end-to-end journeys made of multiple spans. Traces can contain many spans as "children", as well as attributes and events that offer flexibility on the client and numerous aggregation options on the backend. This instrumentation allows you trace an entire process by breaking it down into smaller units of work.

A span is simply an operation occurring over a period of time. Using spans, you can track how long operations within the app take, and more. Note that, in building on existing OTel APIs, the Embrace Android SDK does not have instrumentation for an object called a "trace". Instead, a trace is the root span for a given workflow.

### Sample usage

Here is an example of how spans and traces replace and enhance the existing Moment feature:

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

<Tabs groupId="android-language" queryString="android-language">
<TabItem value="kotlin" label="Kotlin">
  
```kotlin
val span = Embrace.getInstance().startSpan("my-identifier") // start span
// add events and attributes to span
span?.stop() // stop span
```
</TabItem>
</Tabs>

For more detail on the additional things you can do with spans please see the [Traces](/docs/android/features/traces.md) documentation.

## Remove deprecated properties from your build.gradle

These 5 deprecated properties have been removed from our Gradle plugin. Please remove them from your `app/build.gradle` file.

```groovy
swazzler {
    ...
    forceOkHttpWrapperInjection = true/false
    forceFcmWrapperInjection = true/false
    useNewDependencyInstaller = true/false
    forceVolleyWrapperInjection = true/false
    instrumentVolley = true/false
    ...
}
```

## Replace usage of deprecated methods with new ones

Version 6.0.0 of the Embrace Android SDK removed some methods that had been deprecated in 5.x. The renamed methods were removed to reduce confusion and increase consistency across the Embrace SDKs on various platforms, and their replacements behave the same way as the old ones. The methods removed entirely are for functionality that we no longer support. If you were using them for a specific use-case, please speak to us about how you can use the existing APIs instead.

| Old API                                               | New API                                                             | Comments                                                              |
|-------------------------------------------------------|---------------------------------------------------------------------|:----------------------------------------------------------------------|
| `Embrace.getInstance().startFragment(String)`         | `Embrace.getInstance().startView(String)`                           | Renamed function to better describe functionality.                    |
| `Embrace.getInstance().endFragment(String)`           | `Embrace.getInstance().endView(String)`                             | Renamed function to better describe functionality.                    |
| `Embrace.getInstance().setUserPersona(String)`        | `Embrace.getInstance().addUserPersona(String)`                      | Renamed function to better describe functionality.                    |
| `Embrace.getInstance().logBreadcrumb(String)`         | `Embrace.getInstance().addBreadcrumb(String)`                       | Renamed function to better describe functionality.                    |
| `Embrace.getInstance().startEvent()`                  | `Embrace.getInstance().startMoment(String)`                         | Renamed function to better describe functionality.                    |
| `Embrace.getInstance().endEvent()`                    | `Embrace.getInstance().endMoment(String)`                           | Renamed function to better describe functionality.                    |
| `Embrace.getInstance().logInfo(String, ...)`          | `Embrace.getInstance().logMessage(...)`                             | Altered function signature to standardise behavior.                   |
| `Embrace.getInstance().logWarning(String, ...)`       | `Embrace.getInstance().logMessage(...)`                             | Altered function signature to standardise behavior.                   |
| `Embrace.getInstance().logError(String, ...)`         | `Embrace.getInstance().logMessage(...)`                             | Altered function signature to standardise behavior.                   |
| `Embrace.getInstance().logError(Throwable)`           | `Embrace.getInstance().logException()`                              | Altered function signature to standardise behavior.                   |
| `Embrace.getInstance().logError(StacktraceElement[])` | `Embrace.getInstance().logCustomStacktrace()`                       | Altered function signature to standardise behavior.                   |
| `EmbraceLogger`                                       | `Embrace.getInstance().logMessage()`                                | Moved function calls to main Embrace interface.                       |
| `LogType`                                             | `Severity`                                                          | Use Severity enum rather than LogType.                                |
| `PurchaseFlow`                                        | None                                                                | Please contact Embrace if you have a use-case for this functionality. |
| `RegistrationFlow`                                    | None                                                                | Please contact Embrace if you have a use-case for this functionality. |
| `SubscriptionFlow`                                    | None                                                                | Please contact Embrace if you have a use-case for this functionality. |
| `Embrace.getInstance().logNetworkCall()`              | `Embrace.getInstance().recordNetworkRequest(EmbraceNetworkRequest.fromCompletedRequest(...))` | Renamed function to better describe functionality.                    |
| `Embrace.getInstance().logNetworkRequest()`              | `Embrace.getInstance().recordNetworkRequest(EmbraceNetworkRequest.fromCompletedRequest(...))` | Renamed function to better describe functionality.                    |
| `Embrace.getInstance().logNetworkClientError()`       | `Embrace.getInstance().recordNetworkRequest(EmbraceNetworkRequest.fromIncompleteRequest(...))` | Renamed function to better describe functionality.                    |

### Previously deprecated APIs that have been removed

| Old API                                     | Comments                                                 |
|---------------------------------------------|----------------------------------------------------------|
| `ConnectionQuality`                         | Deprecated API that is no longer supported.              |
| `ConnectionQualityListener`                 | Deprecated API that is no longer supported.              |
| `Embrace.enableStartupTracing()`            | Deprecated API that is no longer supported.              |
| `Embrace.enableEarlyAnrCapture()`           | Deprecated API that is no longer supported.              |
| `Embrace.setLogLevel()`                     | Deprecated API that is no longer supported.              |
| `Embrace.enableDebugLogging()`              | Deprecated API that is no longer supported.              |
| `Embrace.disableDebugLogging()`             | Deprecated API that is no longer supported.              |
| `Embrace.logUnhandledJsException()`         | Deprecated internal API that was unintentionally visible |
| `Embrace.logUnhandledUnityException()`      | Deprecated internal API that was unintentionally visible |
| `Embrace.setReactNativeVersionNumber()`     | Deprecated internal API that was unintentionally visible |
| `Embrace.setJavaScriptPatchNumber()`        | Deprecated internal API that was unintentionally visible |
| `Embrace.setJavaScriptBundleURL()`          | Deprecated internal API that was unintentionally visible |
| `Embrace.setUnityMetaData()`                | Deprecated internal API that was unintentionally visible |
| `Embrace.logDartError()`                    | Deprecated internal API that was unintentionally visible |
| `Embrace.logDartErrorWithType()`            | Deprecated internal API that was unintentionally visible |
| `Embrace.setEmbraceFlutterSdkVersion()`     | Deprecated internal API that was unintentionally visible |
| `Embrace.setDartVersion()`                  | Deprecated internal API that was unintentionally visible |
| `Embrace.addConnectionQualityListener()`    | Deprecated internal API that was unintentionally visible |
| `Embrace.removeConnectionQualityListener()` | Deprecated internal API that was unintentionally visible |
| `Embrace.logPushNotification()`             | Deprecated internal API that was unintentionally visible |
| `EmbraceNetworkRequest.withByteIn()`        | Use `withBytesIn()` instead                              |
| `EmbraceNetworkRequest.withByteOut()`       | Use `withBytesOut()` instead                             |
| `EmbraceNetworkRequestV2.withByteIn()`      | Use `withBytesIn()` instead                              |
| `EmbraceNetworkRequestV2.withByteOut()`     | Use `withBytesOut()` instead                             |

## Hidden symbols

The following internal symbols have been hidden. These were unintentionally exposed in 5.x. Please get in touch if you had a use-case for these symbols that isn't
supported with the new API.

- `Absent`
- `ActivityListener`
- `AndroidToUnityCallback`
- `ApkToolsConfig`
- `BuildInfo`
- `CheckedBiConsumer`
- `CheckedBiFunction`
- `CheckedBinaryOperator`
- `CheckedBiPredicate`
- `CheckedConsumer`
- `CheckedFunction`
- `CheckedPredicate`
- `CheckedRunnable`
- `CheckedSupplier`
- `CountingOutputStream`
- `Embrace.<init>`
- `EmbraceConnection`
- `EmbraceHttpUrlConnection`
- `EmbraceHttpUrlConnectionOverride`
- `EmbraceHttpUrlStreamHandler`
- `EmbraceHttpsUrlConnection`
- `EmbraceHttpsUrlStreamHandler`
- `EmbraceUrl`
- `EmbraceUrlStreamHandler`
- `EmbraceUrlStreamHandlerFactory`
- `EmbraceEvent`
- `EmbraceConnectionImpl`
- `EmbraceUrlAdapter`
- `EmbraceUrlImpl`
- `Event`
- `ExecutorUtils`
- `HandleExceptionError`
- `NetworkCaptureEncryptionManager`
- `Optional`
- `Preconditions`
- `Present`
- `RnActionBreadcrumb`
- `ThreadUtils`
- `Unchecked`
- `Uuid`

## Only use OkHttp versions that are at least 4.0.0

With the minimum API version being 21 (Android 5.0), version 4.0.0 of OkHttp is now the recommended minimum for use at runtime. While support for OkHttp 3.13.0+ was added in SDK version 6.3.2, it is not recommended, as newer versions are more performant. See the [changelog for 6.0.0](/android/changelog/#600) for details about the other new minimum requirements.
