# Upgrade Guide

# Upgrading from 5.x to 6.x

:::info Summary
- Remove deprecated properties from Gradle file
- Replace usage of deprecated methods
- Remove references to internal symbols that were previously exposed
- Only use OkHttp versions that are at least 4.0.0 (3.13.0+ supported as of 6.3.2)
:::

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