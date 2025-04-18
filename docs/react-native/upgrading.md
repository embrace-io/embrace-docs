---
title: Upgrade Guide
sidebar_position: 5
description: Upgrade guide for Embrace React Native SDK versions
---

# Upgrade guide

## Upgrading from 5.x to 6.x

:::info Summary

- Removal or replacement of various packages and methods, see sections below for details on specific migrations
- Initialization and configuration of the SDK on Android has been updated
- Automatic support for CodePush has been removed
- Unhandled promise rejection tracking is now opt-in
:::

Upgrade to the latest 6.x versions of the Embrace React Native SDK packages by either bumping to the latest version
manually in your package.json and running `yarn install` or `npm install` Or remove the existing packages entirely and
re-installing.

Then install the latest Cocoapods with:

```shell
cd ios && pod update EmbraceIO && pod install --repo-update
```

### Deprecated Packages

| Package                                              | Comments                                                                    |
| ---------------------------------------------------- | --------------------------------------------------------------------------- |
| `@embrace-io/react-native-orientation-change-tracer` | Use `useOrientationListener` from `@embrace-io/react-native` instead.       |
| `@embrace-io/react-native-web-tracker`               | No longer supported.                                                        |
| `@embrace-io/react-native-spans`                     | Functionality has been moved to `@embrace-io/react-native-tracer-provider`. |
| `@embrace-io/react-navigation`                       | Functionality has been moved to `@embrace-io/react-native-navigation`.      |
| `@embrace-io/react-native-apollo-graphql`            | No longer supported.                                                        |
| `@embrace-io/react-native-action-tracker`            | Functionality has been moved to `@embrace-io/react-native-redux`.           |

### Removed APIs

| Old API            | Comments                                                                               |
| ------------------ | -------------------------------------------------------------------------------------- |
| `logScreen`        | Use `addBreadcrumb(message: string)` instead.                                          |
| `setUserAsPayer`   | Use `addUserPersona("payer")` instead.                                                 |
| `clearUserAsPayer` | Use `clearUserPersona("payer")` instead.                                               |
| `startView`        | Interface changed and moved to the `@embrace-io/react-native-tracer-provider` package. |
| `endView`          | No longer supported. Call `end()` on the span returned by `startView` instead.         |

### Updating native initialization on Android

Specifying "react_native" as the app framework in the Android config is now required whereas previously only "app_id" and
"app_token" were. To update edit `android/app/src/main/embrace-config.json` in your app so that it matches the following:

```json
{
  "app_id": "xxxxx",
  "api_token": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "sdk_config": {
    "app_framework": "react_native"
  }
}
```

In addition, if you had previously run our install script or manually followed the steps for initializing the SDK from
native code on Android you will have the following line in your `MainApplication.java` or `MainApplication.kt`:

```kotlin
Embrace.getInstance().start(this, false, Embrace.AppFramework.REACT_NATIVE)
```

Since the app's framework is now passed through the config JSON this invocation of `start` is no longer supported. To
upgrade replace it with:

```kotlin
Embrace.getInstance().start(this)
```

### Migrating Traces

The `@embrace-io/react-native-spans` package has been removed and the functionality it provided is now available from the
`@embrace-io/react-native-tracer-provider` package. The interface for interacting with spans has also been updated to
conform to the OTel specification. To update, first switch your dependency to the new package and then migrate any
method calls in your code that used the [5.x Traces methods](/react-native/5x/features/traces) to the updated methods as
detailed in the [6.x Traces guide](/react-native/features/traces/).

### Migrating startView/endView calls

If you had previously been calling the `startView` and `endView` methods directly these have been moved from
`@embrace-io/react-native` to `@embrace-io/react-native-tracer-provider`. You will need to setup that package and invoke
`startView` using its updated signature as described in [Track Components](/react-native/features/components/).

### Migrating Redux actions instrumentation

If you had previously been using the `buildEmbraceMiddleware` method from the `@embrace-io/react-native-action-tracker`
package this has been renamed and moved to `@embrace-io/react-native-redux`. You will need to setup that package and
create the Embrace middleware using one of the updated methods as described in [Track Redux Actions](/react-native/features/redux-actions/).

### Migrating navigation instrumentation

Navigation instrumentation was previously split into two separate packages (`@embrace-io/react-navigation` + `@embrace-io/react-native-navigation`)
depending on which style of navigation was being instrumented. Now all navigation instrumentations resides in `@embrace-io/react-native-navigation`.
To migrate please review the instructions on the [Migrating from older versions](/react-native/features/navigation/#migrating-from-older-versions)
section of the navigation feature page.

### Removal of automated CodePush support

Previously our SDK would check if CodePush was integrated in the app and track OTA JS bundle updates for the purposes of
keeping symbolication of stack traces consistent. Given the [retirement of CodePush](https://learn.microsoft.com/en-us/appcenter/retirement)
this functionality has been removed.

If your app uses OTA updates you can call `setJavaScriptBundlePath(path: string)` whenever a new bundle is available
in order to have properly symbolicated stack traces. See [Symbolication with OTA updates](/react-native/integration/upload-symbol-files/#symbolication-with-ota-updates)
for more details.

### Unhandled promise rejection tracking is now opt-in

Previously our SDK setup tracking for unhandled promise rejection tracking automatically. Now this feature must be
explicitly enabled, see [Report Unhandled Promise Rejections](/react-native/features/unhandled-promise-rejections) for
more details.

### Fixed process for uploading sourcemaps on iOS Expo apps

If your app is using Expo and you have previously followed our symbol file upload guide or ran our automated install script
then please update your build phases with our latest instructions from [Uploading Native And Javascript Symbol Files](/react-native/integration/upload-symbol-files/?platform=ios#uploading-native-and-javascript-symbol-files)
to ensure that sourcemaps are uploaded correctly.

## Upgrading from 4.x to 5.x

:::info Summary

- Moments have been removed, Traces should be used in their place
- Configuration through `Embrace-Info.plist` on iOS has been removed, configuration is now done in code
- Native side initialization of the Embrace SDK has been rewritten in Swift
- Minimum versions for iOS deployment have been bumped ([details here](/react-native/integration/#ios))
- Minimum versions for Android Kotlin and AGP have been bumped ([details here](/react-native/integration/#android))
  :::

Upgrade to the latest 5.x versions of the Embrace React Native SDK packages by either bumping to the latest version
manually in your package.json and running `yarn install` or `npm install` Or remove the existing packages entirely and
re-installing.

Then install the latest Cocoapod with

```shell
cd ios && pod install --repo-update
```

### SDK initialization and configuration is triggered in-code

If you initialize the Embrace SDK in your JavaScript code it will need to be updated to include a `sdkConfig`
parameter to configure the iOS SDK:

```javascript
import React, {useEffect, useState} from 'react'
import {initialize} from '@embrace-io/react-native';

const App = ()=> {
  useEffect(() => {
    initialize({
      sdkConfig: {
        ios: {
          appId: "__APP_ID__",
        }
      }
    }).then(hasStarted => {
      if (hasStarted) {
         // do something
      }
    });
  }, []);

 return ...
}
export default App
```

#### Upgrade of native iOS code

The `Embrace-Info.plist` is no longer used for configuration and can be safely removed from your project.

Any existing initialization of the Embrace SDK that you had in your AppDelegate.m|mm|swift file should be removed. In
Objective-c this would be a line such as:

```objectivec
[[Embrace sharedInstance] startWithLaunchOptions:launchOptions framework:EMBAppFrameworkReactNative];
```

Or in Swift a line such as:

```swift
Embrace.sharedInstance().start(launchOptions: launchOptions, framework:.reactNative)
```

Replace these with the updated initialization code outlined in [Starting Embrace SDK from Android / iOS](/react-native/5x/integration/session-reporting#initialize-embrace-sdk)

### Moments have been replaced by Traces

APIs related to moments should be removed from your code.

Any place that you were previously instrumenting your app's performance using Moments can now be done using Performance
Tracing, please refer to [this guide](/react-native/features/traces/) for more information.

### Troubleshooting

#### Android

The minimum version of AGP required for the Embrace Gradle Plugin to work as expected is `7.4.2`. If an older version is used for building the React Native Android application it will still build successfully but the SDK won't be able to initialize properly, getting the following error in runtime even when everything is configured as expected:

```bash
Error occurred while initializing the Embrace SDK. Instrumentation may be disabled.
java.lang.IllegalStateException: Failed to load local config from resources.
	at io.embrace.android.embracesdk.internal.config.LocalConfigParser.fromResources(LocalConfigParser.kt:82)
	at io.embrace.android.embracesdk.internal.injection.ConfigModuleImpl.<init>(ConfigModuleImpl.kt:25)
	at io.embrace.android.embracesdk.internal.injection.ConfigModuleSupplierKt.createConfigModule(ConfigModuleSupplier.kt:31)
	at io.embrace.android.embracesdk.internal.injection.ModuleInitBootstrapper$5.invoke(ModuleInitBootstrapper.kt:31)
	at io.embrace.android.embracesdk.internal.injection.ModuleInitBootstrapper$5.invoke(ModuleInitBootstrapper.kt:31)
	at io.embrace.android.embracesdk.internal.injection.ModuleInitBootstrapper$init$2$result$6.invoke(ModuleInitBootstrapper.kt:151)
	at io.embrace.android.embracesdk.internal.injection.ModuleInitBootstrapper$init$2$result$6.invoke(ModuleInitBootstrapper.kt:150)
	at io.embrace.android.embracesdk.internal.injection.ModuleInitBootstrapper.init(ModuleInitBootstrapper.kt:468)
	at io.embrace.android.embracesdk.internal.injection.ModuleInitBootstrapper.init(ModuleInitBootstrapper.kt:150)
	at io.embrace.android.embracesdk.internal.injection.ModuleInitBootstrapper.init$default(ModuleInitBootstrapper.kt:114)
	at io.embrace.android.embracesdk.EmbraceImpl.startImpl(EmbraceImpl.kt:181)
	at io.embrace.android.embracesdk.EmbraceImpl.start(EmbraceImpl.kt:156)
	at io.embrace.android.embracesdk.Embrace.start(Embrace.java:106)
	at com.ensemble3.MainApplication.onCreate(MainApplication.java:56)
	at android.app.Instrumentation.callApplicationOnCreate(Instrumentation.java:1192)
	at android.app.ActivityThread.handleBindApplication(ActivityThread.java:6712)
	at android.app.ActivityThread.access$1300(ActivityThread.java:237)
	at android.app.ActivityThread$H.handleMessage(ActivityThread.java:1913)
	at android.os.Handler.dispatchMessage(Handler.java:106)
	at android.os.Looper.loop(Looper.java:223)
	at android.app.ActivityThread.main(ActivityThread.java:7656)
	at java.lang.reflect.Method.invoke(Native Method)
	at com.android.internal.os.RuntimeInit$MethodAndArgsCaller.run(RuntimeInit.java:592)
	at com.android.internal.os.ZygoteInit.main(ZygoteInit.java:947)
Caused by: java.lang.IllegalArgumentException: No appId supplied in embrace-config.json. This is required if you want to send data to Embrace, unless you configure an OTel exporter and add embrace.disableMappingFileUpload=true to gradle.properties.
	at io.embrace.android.embracesdk.internal.config.LocalConfigParser.buildConfig(LocalConfigParser.kt:112)
```

The application will still work but the Embrace SDK won't initialize, causing unexpected issues. To resolve this please ensure you have the required minimum versions set in your Android build files ([more details here](/react-native/integration/))

### Removed APIs

| Old API                | Comments                                    |
| ---------------------- | ------------------------------------------- |
| `endAppStartup`        | Deprecated API that is no longer supported. |
| `startMoment`          | Deprecated API that is no longer supported. |
| `endMoment`            | Deprecated API that is no longer supported. |
| `getSessionProperties` | Deprecated API that is no longer supported. |
