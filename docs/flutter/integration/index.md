---
title: Install the SDK
description: Add the Embrace SDK as a dependency to your Flutter application
sidebar_position: 1
---

# Adding the Flutter Embrace SDK

## Add the Embrace Flutter SDK to the project

Add the Embrace package to your `pubspec.yaml`:

```shell-session
flutter pub add embrace
```

## iOS setup

Next, login to the [Embrace dashboard](https://dash.embrace.io/) and create a project if you haven't already.
The dashboard contains the app ID and API token that are necessary for configuring your integration.

Then alter the AppDelegate to initialize Embrace in the `init` function:

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

```shell-session
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
  "ndk_enabled": true,
  "sdk_config": {
    "app_framework": "flutter"
  }
}
```

## Import Embrace

Start by importing Embrace in the file where your `main()` function exists.

```dart
import 'package:embrace/embrace.dart';
```

## Add the Flutter SDK start call

Wrap the entire contents of your `main()` function in `Embrace.instance.start()`. It is essential do this if you want Embrace to capture Dart errors.

```dart
import 'package:embrace/embrace.dart';

Future<void> main() async {
  await Embrace.instance.start(() => runApp(const MyApp()));
}
```

### Add the Android SDK start call

The call to start the Embrace Android SDK should be placed in the `onCreate` method of an `Application` subclass:

```kotlin
import android.app.Application
import io.embrace.android.embracesdk.Embrace

class MyApplication : Application() {
    override fun onCreate() {
        super.onCreate()
        Embrace.getInstance().start(this)
    }
}
```

## Build and Run the Application

Now you're ready to build and run the application. Assuming the app launches correctly,
pay attention to the system logging and look for Embrace to print its version number.

```text
Embrace Flutter SDK Version: {{ embrace_sdk_version platform="flutter" }}
```

:::info
If you encounter any errors, please get in touch on Slack and we can assist you.
:::

## Trigger a Session Upload

To trigger a session upload, simply send the application to the background. Typically the SDK
will be given sufficient time to upload the session, but sometimes the app is not able to complete
the upload in the background. To ensure the session was uploaded, launch the application again.
Refresh the dashboard in your browser and you should now see that you've moved on to the next step.
