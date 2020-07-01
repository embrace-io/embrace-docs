---
title: "Add the Android Embrace SDK"
weight: 3
---

# Adding the Android Embrace SDK

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

Then, apply the Embrace swazzler plugin in your app's `build.gradle` file.

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

The Swazzler works as a support process during build time for the Embrace SDK to work properly during run time.
The Swazzler performs a few key functions:
* Adds the Embrace SDK dependencies to the app's dependency list.
* Injects a build info JSON file for the SDK to parse during run time. This specifies an internal Embrace build UUID, build app ID, and its variant (build type and flavor) along with some optional network configuration rules for the SDK.
* Runs a code transformation / injection over specified bytecode class files to communicate via hooks with the SDK
* Injects ProGuard rules for the SDK to work properly when a build type is set to be minified.

{{< hint info >}}
You'll need to set the following permissions so the Embrace SDK can send events
and monitor connectivity. 

* `android.permission.INTERNET`
* `android.permission.ACCESS_NETWORK_STATE`

{{< /hint >}}

## Add the config file

You'll need to add a config file to configure the Embrace SDK. Add a file named
`embrace-config.json` at `app/src/main`.

```json
{
  "app_id": "xxxxx",
  "api_token": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
}
```

{{< hint info >}}
Your and API ID and token are available on the Embrace dashboard.
{{< /hint >}}

---

Next, you'll be creating your first session.

{{< button relref="/android/session-reporting" >}}Create First Session{{< /button >}}
