# Upgrade Guide

## Upgrading from 7.x to 8.x

### Minimum supported versions

The Embrace Android SDK supports the following minimum versions of dependent technologies at build and run time:

| Technology                       | Old minimum version | New minimum version |
|----------------------------------|---------------------|---------------------|
| JDK (Build-time)                 | 11                  | 17                  |
| Kotlin (Run-time and build-time) | 1.8.22              | 2.0.21              |
| Gradle (minSdk 26+)              | 7.5.1               | 8.0.2               |
| AGP (minSdk 26+)                 | 7.4.2               | 8.0.2               |

At runtime, the minimum supported Android version remains 5.0 (i.e. `minSdk` = 21). If your minSdk is less than 26, you will still require
Gradle 8.4 and AGP 8.3.0 to workaround a desugaring issue.

### Language compatibility target

The Embrace Android SDK is compiled using the following language compatibility targets:

| Technology                | Old target | New target |
|---------------------------|------------|------------|
| Java                      | 1.8        | 11         |
| Kotlin (Language and API) | 1.8        | 2.0        |

### Embrace Gradle Plugin renamed

The Embrace Gradle Plugin artifact and plugin ID have been renamed:

| Type        | Old name                      | New name                           |
|-------------|-------------------------------|------------------------------------|
| Artifact ID | `io.embrace:embrace-swazzler` | `io.embrace:embrace-gradle-plugin` |
| Plugin ID   | `io.embrace.swazzler`         | `io.embrace.gradle`                |

Replace references to the old Embrace Gradle Plugin name with the new one. Your configuration files should reference the plugin in one
of the following ways:

#### Version Catalogs (gradle/libs.versions.toml):

```toml
[plugins]
embrace = { id = "io.embrace.gradle", version.ref = "embrace" }
```

#### Non-Catalog Configuration (settings.gradle or settings.gradle.kts):

```kotlin
pluginManagement {
    plugins {
        id("io.embrace.gradle") version "${embrace_version}"
    }
}
```

#### Legacy Buildscript (root build.gradle):

```groovy
buildscript {
    dependencies {
        classpath "io.embrace:embrace-gradle-plugin:${embrace_version}"
    }
}
```

### OpenTelemetry support evolution

The SDK is moving towards supporting OpenTelemetry via a native Kotlin
API ([opentelemetry-kotlin](https://github.com/embrace-io/opentelemetry-kotlin)). Currently, the Kotlin API
is used internally for capturing telemetry, but under the hood [opentelemetry-java](https://github.com/open-telemetry/opentelemetry-java) is
still responsible for processing the telemetry.

To use the Kotlin API in your app, which is in the process of being donated to OpenTelemetry and is still subject to changes before it
becomes stable, you must include the module `io.embrace.opentelemetry.kotlin:opentelemetry-kotlin-api` in your app. With that, you can
call the `Embrace.getOpenTelemetryKotlin()` function once the Embrace SDK is initialized to obtain an `OpenTelemetry` object with which
you can instantiate OTel Tracers and Loggers. You can also add your own implementations of Kotlin Span and Log exporters, then configure
the Embrace Android SDK to use them by calling them `Embrace.addSpanExporter()` and `Embrace.addLogRecordExporter()`.

As part of this evolution, opentelemetry-java's API are not used internally or exported by default by the Embrace SDK. A compatibility
layer is provided for those who currently use the Java OTel Tracing API or Java exporters with the Embrace SDK. To access that,
include the new `io.embrace:embrace-android-otel-java` module in your app's classpath, which adds the following extension functions
to the `Embrace` object:

- `getJavaOpenTelemetry()`
- `addJavaSpanExporter()`
- `addJavaLogRecordExporter()`

These methods allow you to use the associated Java OTel API integration points supported by older versions of the Embrace Android SDK.

### Embrace.getInstance() deprecation

`Embrace.getInstance()` is deprecated in favour of `Embrace`. For example, you can now call `Embrace.start(Context)` instead
of `Embrace.getInstance().start(Context)`.

### Internal modularization

The Embrace SDK is going through a process of modularization. If you rely on `embrace-android-sdk` then you should notice
very little change as most alterations are internal. However, you should be aware that:

- `embrace-android-compose` has been renamed as `embrace-android-instrumentation-compose-tap`
- `embrace-android-fcm` has been renamed as `embrace-android-instrumentation-fcm`
- `embrace-android-okhttp3` has been renamed as `embrace-android-instrumentation-okhttp`

`embrace.autoAddEmbraceDependencies` is deprecated and will be removed in a future release. You should add the
`io.embrace:embrace-android-sdk` module to your classpath manually if you reference any Embrace Android SDK API directly in your app.

### Http(s)URLConnection network request instrumentation changes

Basic instrumentation for HTTPS network requests made using the `HttpsURLConnection` API is enabled by default and controlled by
the `sdk_config.networking.enable_huc_lite_instrumentation` configuration flag. It will capture the request duration, status, as well
as errors. It does not support advanced features like network request forwarding or request or response body sizes. Use the detailed
instrumentation if you wish to enable those features.

Detailed instrumentation for both HTTP and HTTPS requests using the `HttpURLConnection` and `HttpsURLConnection` APIs, which was enabled
by default in previous versions, is now disabled by default. The configuration flag to control this
remains `sdk_config.networking.enable_native_monitoring`.

If you wish to use the detailed instrumentation for these requests, you must include the
module `io.embrace:embrace-android-instrumentation-huc` in your app's classpath.

This DOES NOT affect instrumentation of network requests made using `OkHttp`.

### Altered APIs

Various deprecated APIs have been removed. Please migrate to the documented new APIs where applicable, or
get in touch if you do have a use-case that is no longer met.

#### Embrace Android SDK removed APIs

| Old API                                                                 | New API                                                                                                |
|-------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------|
| `Embrace.getInstance().start(Context, AppFramework)`                    | `Embrace.start(Context)`                                                                               |
| `Embrace.getInstance().addLogRecordExporter(LogRecordExporter)`         | Type changed to opentelemetry-kotlin API. Alternative available in `embrace-android-otel-java` module. |
| `Embrace.getInstance().addSpanExporter(SpanExporter)`                   | Type changed to opentelemetry-kotlin API. Alternative available in `embrace-android-otel-java` module. |
| `Embrace.getInstance().getOpenTelemetry()`                              | `Embrace.getOpenTelemetryKotlin()` or `Embrace.getJavaOpenTelemetry()`                                 |
| `Embrace.getInstance().setResourceAttribute(AttributeKey, String)`      | `Embrace.setResourceAttribute(String, String)`                                                         |
| `EmbraceSpan.addLink(SpanContext)`                                      | Type changed to symbol declared in embrace-android-sdk.                                                |
| `EmbraceSpan.addLink(SpanContext, Map)`                                 | Type changed to symbol declared in embrace-android-sdk.                                                |
| `EmbraceSpan.getSpanContext()`                                          | Type changed to symbol declared in embrace-android-sdk.                                                |
| `Embrace.getInstance().trackWebViewPerformance(String, ConsoleMessage)` | Obsolete - no alternative provided.                                                                    |
| `Embrace.getInstance().trackWebViewPerformance(String, String)`         | Obsolete - no alternative provided.                                                                    |
| `AppFramework`                                                          | Obsolete - no alternative provided.                                                                    |
| `StartupActivity`                                                       | Obsolete - no alternative provided.                                                                    |
| `Embrace.getInstance().registerComposeActivityListener()`               | Obsolete - no alternative provided.                                                                    |
| `Embrace.getInstance().unregisterComposeActivityListener()`             | Obsolete - no alternative provided.                                                                    |
| `Embrace.getInstance().logWebView(String)`                              | Obsolete - no alternative provided.                                                                    |

#### New Embrace Gradle Plugin DSL

The Embrace Gradle Plugin previously had a DSL via the `swazzler` extension. This has been replaced with a new DSL via the `embrace`
extension.

| Old API                                               | New API                                                                 |
|-------------------------------------------------------|-------------------------------------------------------------------------|
| `swazzler.disableDependencyInjection`                 | `embrace.autoAddEmbraceDependencies`                                    |
| `swazzler.disableComposeDependencyInjection`          | `embrace.autoAddEmbraceComposeClickDependency`                          |
| `swazzler.instrumentOkHttp`                           | `embrace.bytecodeInstrumentation.okhttpEnabled`                         |
| `swazzler.instrumentOnClick`                          | `embrace.bytecodeInstrumentation.onClickEnabled`                        |
| `swazzler.instrumentOnLongClick`                      | `embrace.bytecodeInstrumentation.onLongClickEnabled`                    |
| `swazzler.instrumentWebview`                          | `embrace.bytecodeInstrumentation.webviewOnPageStartedEnabled`           |
| `swazzler.instrumentFirebaseMessaging`                | `embrace.bytecodeInstrumentation.firebasePushNotificationsEnabled`      |
| `swazzler.classSkipList`                              | `embrace.bytecodeInstrumentation.classIgnorePatterns`                   |
| `swazzler.variantFilter`                              | `embrace.buildVariantFilter`                                            |
| `SwazzlerExtension.Variant.enabled`                   | `embrace.buildVariantFilter.disableBytecodeInstrumentationForVariant()` |
| `SwazzlerExtension.Variant.swazzlerOff`               | `embrace.buildVariantFilter.disablePluginForVariant()`                  |
| `SwazzlerExtension.Variant.setSwazzlingEnabled()`     | `embrace.buildVariantFilter.disableBytecodeInstrumentationForVariant()` |
| `SwazzlerExtension.Variant.disablePluginForVariant()` | `embrace.buildVariantFilter.disablePluginForVariant()`                  |
| `embrace.disableCollectBuildData`                     | `embrace.telemetryEnabled`                                              |
| `swazzler.customSymbolsDirectory`                     | `embrace.customSymbolsDirectory`                                        |
| `swazzler.forceIncrementalOverwrite`                  | Obsolete - no alternative provided.                                     |
| `swazzler.disableRNBundleRetriever`                   | Obsolete - no alternative provided.                                     |

The following project properties are now ignored and have no effect. You should remove them from your `gradle.properties` file:

- `embrace.logLevel`
- `embrace.instrumentationScope`

#### Embrace Android SDK overload changes

The following functions had overloads manually defined. These have been replaced with one function
that uses Kotlin's default parameter values.

| Altered APIs                                  |
|-----------------------------------------------|
| `Embrace.getInstance().logCustomStacktrace()` |
| `Embrace.getInstance().logException()`        |
| `Embrace.getInstance().logMessage()`          |
| `Embrace.getInstance().createSpan()`          |
| `Embrace.getInstance().recordCompletedSpan()` |
| `Embrace.getInstance().recordSpan()`          |
| `Embrace.getInstance().startSpan()`           |
| `Embrace.getInstance().endSession()`          |
| `EmbraceSpan.addEvent()`                      |
| `EmbraceSpan.addLink()`                       |
| `EmbraceSpan.recordException()`               |
| `EmbraceSpan.start()`                         |
| `EmbraceSpan.stop()`                          |

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

[Traces](/android/features/traces.md) serve the same purposes as [Moments](/android/features/moments.md), with greatly enhanced capabilities. Built on [OTel Spans](https://opentelemetry.io/docs/concepts/signals/traces/), Traces capture end-to-end journeys made of multiple spans. Traces can contain many spans as "children", as well as attributes and events that offer flexibility on the client and numerous aggregation options on the backend. This instrumentation allows you trace an entire process by breaking it down into smaller units of work.

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
val span = Embrace.startSpan("my-identifier") // start span
// add events and attributes to span
span?.stop() // stop span
```

</TabItem>
</Tabs>

For more detail on the additional things you can do with spans please see the [Traces](/android/features/traces.md) documentation.

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
| `Embrace.getInstance().logInfo(String, ...)`          | `Embrace.getInstance().logMessage(...)`                             | Altered function signature to standardise behavior. logInfo(String) without extra parameters is still a valid API.                   |
| `Embrace.getInstance().logWarning(String, ...)`       | `Embrace.getInstance().logMessage(...)`                             | Altered function signature to standardise behavior. logWarning(String) without extra parameters is still a valid API.                  |
| `Embrace.getInstance().logError(String, ...)`         | `Embrace.getInstance().logMessage(...)`                             | Altered function signature to standardise behavior. logError(String) without extra parameters is still a valid API.                  |
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
