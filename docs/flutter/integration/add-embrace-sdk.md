---
title: "Adding the Embrace SDK"
description: Add the Embrace SDK as a dependency to your Flutter application
sidebar_position: 3
aliases:
  - /flutter/add-embrace-sdk/
---

# Adding the flutter Embrace SDK

## Add the Dart library

Add the Embrace package to `pubspec.yaml` with the following command:

```shell-session
flutter pub add embrace
```

## iOS Setup

### Add the Embrace app id
Create the `Embrace-Info.plist` configuration file. You can find your 5-character app ID and API token in the Embrace dashboard:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>API_KEY</key>
    <string>{YOUR_APP_ID}</string>
    <key>API_TOKEN</key>
  	<string>{YOUR_API_TOKEN}</string>
    <key>CRASH_REPORT_ENABLED</key>
    <true/>
</dict>
</plist>
```

### Uploading Symbol Files

To make stack traces of native crashes readable, Embrace needs the dSym symbol files of your application. These can be uploaded with a script included in the Embrace iOS SDK.

On the Xcode Build Phase tab, add a new run script. You can find your 5-character app ID and API token in the Embrace dashboard:

```
EMBRACE_ID={YOUR_APP_ID} EMBRACE_TOKEN={YOUR_API_TOKEN} "${PODS_ROOT}/EmbraceIO/run.sh"
```

## Android Setup

In the root-level `build.gradle` file, add the `embrace-swazzler` dependency:

```gradle
  buildscript {
    repositories {
        mavenCentral()
        google()
    }
    dependencies {
       classpath 'io.embrace:embrace-swazzler:{{< sdk platform="android" >}}'
    }
  }
```

In the `app/build.gradle` file, add:

```gradle
apply plugin: 'com.android.application'
apply plugin: 'embrace-swazzler'
```

In `app/src/main`, add a config file named `embrace-config.json`. You can find your 5-character app ID and API token in the Embrace dashboard:

```json
{
  "app_id": "{YOUR_APP_ID}",
  "api_token": "{YOUR_APP_TOKEN}",
  "ndk_enabled": true
}
```

---

Next, you'll be creating your first session.
