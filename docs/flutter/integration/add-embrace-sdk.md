---
title: Adding the Embrace SDK
description: Add the Embrace SDK as a dependency to your Flutter application
sidebar_position: 3
---

# Adding the Flutter Embrace SDK

## Add the Embrace Flutter SDK to the project

Add the Embrace package to your `pubspec.yaml`:

```shell-session
flutter pub add embrace
```

## iOS setup

Firstly alter the AppDelegate to initialize Embrace in the `init` function:

```swift
import EmbraceIO
import EmbraceCore
import EmbraceCrash

@UIApplicationMain
@objc class AppDelegate: FlutterAppDelegate {
    override init() {
        super.init()
        do {
            try Embrace
                .setup(
                    options: Embrace.Options(
                        appId: "", // Your App ID from Embrace Dash
                        platform: .flutter
                    )
                )
                .start()
        } catch let e {
            print("Error starting Embrace \(e.localizedDescription)")
        }
    }
}
```

### Uploading Symbol Files

:::info
Embrace uploads the dSYM symbol files of your application using a script bundled with the Embrace iOS SDK. This makes stacktraces from crashes human-readable.
:::

On the Xcode Build Phase tab, add a new run script. You can find your 5-character app ID and API token in the Embrace dashboard:

```
EMBRACE_ID={YOUR_APP_ID} EMBRACE_TOKEN={YOUR_API_TOKEN} "${PODS_ROOT}/EmbraceIO/run.sh"
```

## Android setup

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

---

Next, you'll be creating your first session.
