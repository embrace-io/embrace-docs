---
title: Upgrade Guide
sidebar_position: 5
description: Upgrade guide for Embrace React Native SDK versions
---

# Upgrade guide

# Upgrading from 4.x to 5.x

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

## SDK initialization and configuration is triggered in-code

If you initialize the Embrace SDK in your JavaScript code it will need to be updated to include a `sdkConfig`
parameter to configure the iOS SDK:

```javascript
import React, {useEffect, useState} from 'react'
import {initialize} from '@embrace-io/react-native';

const App = ()=> {

  useEffect(()=>{
    initialize({
      sdkConfig: {
        ios: {
          appId: "YOUR_IOS_APP_ID",
        }
      }
    }).then(hasStarted=>{
      if(hasStarted){
         //doSomething
      }
    });
  },[])

 return ...
}
export default App
```

### Upgrade of native iOS code 

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

Replace these with the updated initialization code outlined in [Starting Embrace SDK from Android / iOS](/react-native/integration/session-reporting/#starting-embrace-sdk-from-android--ios)

## Moments have been replaced by Traces

APIs related to moments should be removed from your code.

Any place that you were previously instrumenting your app's performance using Moments can now be done using Performance
Tracing, please refer to [this guide](/react-native/features/traces/) for more information.

## Troubleshooting

### Android

The minimum version of AGP required for the Embrace Swazzler to work as expected is `7.4.2`. If an older version is used for building the React Native Android application it will still build successfully but the SDK won't be able to initialize properly, getting the following error in runtime even when everything is configured as expected:

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

## Removed APIs

| Old API                  | Comments                                                 |
|--------------------------|----------------------------------------------------------|
| `endAppStartup`          | Deprecated API that is no longer supported.              |
| `startMoment`            | Deprecated API that is no longer supported.              |
| `endMoment`              | Deprecated API that is no longer supported.              |
| `getSessionProperties`   | Deprecated API that is no longer supported.              |