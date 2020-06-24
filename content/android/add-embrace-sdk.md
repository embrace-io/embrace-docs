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
Your app ID and API token are available on the Embrace dashboard.
{{< /hint >}}

---

Next, you'll be creating your first session.

{{< button >}}Create First Session{{< /button >}}
