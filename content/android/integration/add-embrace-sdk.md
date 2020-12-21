---
title: Add the Android Embrace SDK
weight: 3
description: Add the Embrace SDK as a dependency to your Android application
aliases:
  - /android/add-embrace-sdk/

---
# Adding the Android Embrace SDK

{{< hint info >}}

For a sample integration, check out the Kotlin and Java apps in the <a href="https://github.com/embrace-io/embrace-demo-apps/tree/master/android" target="_blank">Embrace demo apps repo</a>.

{{< /hint >}}

## Add Embrace as a dependency

The Embrace SDK is available on JCenter. Make the following changes in your
project's `build.gradle` file to add the Embrace SDK to your app.

```groovy
buildscript {
  repositories {
    jcenter()
    google()
  }
  dependencies {
    classpath 'embrace-io:embrace-swazzler:{{< sdk platform="android" >}}'
  }
}
```

Then, apply the Embrace swazzler plugin in your app's `build.gradle` file. Also, specify that the Embrace SDK uses Java 8 features with the `compileOptions` settings.

```groovy
apply plugin: 'com.android.application'
apply plugin 'embrace-swazzler'

repositories {
  jcenter()
  google()
}

android {
  ...
  compileOptions {
    sourceCompatibility JavaVersion.VERSION_1_8
    targetCompatibility JavaVersion.VERSION_1_8
  }
  ...
}
```

The Swazzler works as a support process during build time for the Embrace SDK to work properly during run time. It performs a few key functions:
* Adds the Embrace SDK dependencies to the app's dependency list.
* Injects a build info JSON file for the SDK to parse during run time. This specifies an internal Embrace build UUID, build app ID, and the build variant.
* Runs a code transformation / injection over specified bytecode class files to add hooks that the SDK uses to capture certain data.
* Injects ProGuard rules for the SDK to work properly when a build type is set to be minified.

{{< hint info >}}
You'll need to set the following permissions so the Embrace SDK can send events and monitor connectivity. 

* `android.permission.INTERNET`
* `android.permission.ACCESS_NETWORK_STATE`

{{< /hint >}}

## Add a dependency to modules or libraries you want to call Embrace from (optional)

If you have an app that uses internal modules or libraries, you must specify the Embrace SDK dependency directly in your module's Gradle file

```
implementation `'embrace-io:embrace-android-sdk:{{< sdk platform="android" >}}'`.
```

You still need to apply the Swazzler plugin in the app's Gradle file `(apply plugin: 'embrace-swazzler')` and verify that the Swazzler version set in your project Gradle file is the same as the version set for the SDK in the module’s Gradle file.

## Add the config file

Add a config file to configure the Embrace SDK. This file must be named `embrace-config.json` and should be placed in `app/src/main`. The config file supports many more options than those shown in the example below, but for the initial integration, only the two settings listed below are needed.

```json
{
  "app_id": "xxxxx",
  "api_token": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
}
```

{{< hint info >}}
Your app ID and API token are available on the Embrace dashboard.
{{< /hint >}}


---

## NDK crash capture

{{< hint info >}}
If your app is written entirely in Java and Kotlin, you do not need to enable NDK crash capture to capture crashes in your code. However, we recommend enabling it since it will capture crashes that happen in Android system libraries.   

{{< /hint >}}

If your app has native components, you can enable NDK crash capture. Simply add the `ndk_enabled` setting to your config file.

```json
{
  "app_id": "xxxxx",
  "api_token": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "ndk_enabled": true
}
```
 
{{< hint warning >}}
Unlike JVM-based crash reporters, you can only attach one set of signal handlers to capture NDK crashes. If you have another NDK crash reporter in your system, enabling NDK crash capture in the Embrace SDK will disable that NDK crash reporter if the Embrace SDK is initialized after it.     
{{< /hint >}}

---

Next, you'll be creating your first session.

{{< button relref="/android/integration/session-reporting" >}}Create First Session{{< /button >}}
