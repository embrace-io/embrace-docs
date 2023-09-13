---
title: Adding the Embrace SDK
description: Add the Embrace SDK as a dependency to your Flutter application
sidebar_position: 3
---

# Adding the Flutter Embrace SDK

## Add the Embrace Flutter SDK to the project

Add the Embrace package to `pubspec.yaml` with the following command:

```shell-session
flutter pub add embrace
```

## Automated integration

You can use the `embrace-cli` Dart package to configure your Android and iOS projects to use the Embrace SDK. Alternatively, you can perform the configuration manually.

To install the Embrace CLI, run the following command from any directory:

```shell-session
dart pub global activate embrace_cli
```

## Using the Embrace CLI

Run the following command to configure your project:
<Tabs groupId="platform" queryString="platform">
<TabItem value="ios" label="iOS">

```shell-session
embrace_cli installIos YOUR_APP_ID YOUR_APP_TOKEN
```

</TabItem>
<TabItem value="android" label="Android">

```shell-session
embrace_cli installAndroid YOUR_APP_ID YOUR_APP_TOKEN
```

</TabItem>
</Tabs>

You can use git to see the changes that the script made.

```shell-session
git diff
```

## Manual integration

<Tabs groupId="platform" queryString="platform">
<TabItem value="ios" label="iOS">

### Add the Embrace App ID

From XCode, create a new file in the root of your iOS project called `Embrace-Info.plist` and ensure that it is included in your target (to verify that it is, you can right-click on the file and choose "Show File Inspector"; at the bottom of the File Inspector window "Target Membership" for the Runner project must be checked). 

The contents of the file will look like this (you can find your 5-character app ID and API token in the Embrace dashboard):

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
</TabItem>
<TabItem value="android" label="Android">
In the root-level `build.gradle` file, add the `embrace-swazzler` dependency:

```gradle
  buildscript {
    repositories {
        mavenCentral()
        google()
    }
    dependencies {
       classpath "io.embrace:embrace-swazzler:${findProject(':embrace_android').properties['emb_android_sdk']}"
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
</TabItem>
</Tabs>
---

Next, you'll be creating your first session.
