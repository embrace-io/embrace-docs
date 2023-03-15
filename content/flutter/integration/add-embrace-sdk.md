---
title: "Adding the Embrace SDK"
description: Add the Embrace SDK as a dependency to your Flutter application
weight: 3
aliases:
  - /flutter/add-embrace-sdk/
---

# Adding the flutter Embrace SDK

## Add the Dart library

Add the Embrace package to your pubspec.yaml.

```sh
flutter pub add embrace
```

## iOS Setup

Add the following to AppDelegate.m:

{{< tabs >}}

{{< tab "Swift" >}}
Add the following to AppDelegate.swift:

```swift
import UIKit
import Flutter
import Embrace

@UIApplicationMain
@objc class AppDelegate: FlutterAppDelegate {
override func application(
  _ application: UIApplication,
  didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?
) -> Bool {
  Embrace.sharedInstance().start(launchOptions: launchOptions, framework: EMBAppFramework.flutter)
  /*
      Initialize additional crash reporters and
      any other libraries to track *after* Embrace, including
      network libraries, 3rd party SDKs
  */
  return super.application(application, didFinishLaunchingWithOptions: launchOptions)
}
```
{{</tab >}}

{{< tab "Objective-C" >}}
Add the following to AppDelegate.m:

```objective-c
#import AppDelegate.h
#import <Embrace/Embrace.h>
@implementation AppDelegate
- (BOOL)application:(UIApplication *) application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
[[Embrace sharedInstance] startWithLaunchOptions:launchOptions framework:EMBAppFrameworkFlutter];
    /*
    Initialize additional crash reporters and
    any other libraries to track *after* Embrace, including
    network libraries, 3rd party SDKs
    */
  return YES;
}
@end
```
{{</tab >}}

{{< /tabs >}}

### Set the end of the startup moment
End the startup moment as close to the point that your UI is ready for use by adding the following to AppDelegate.m:

{{< tabs >}}

{{< tab "Swift" >}}
Embrace.sharedInstance().endAppStartup()
{{</tab >}}

{{< tab "Objective-C" >}}
[[Embrace sharedInstance] endAppStartup];
{{</tab >}}

{{< /tabs >}}

### Add the Embrace app id
Create the Embrace-Info.plist configuration file. You can find your 5-character app ID and API token in the Embrace dashboard:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>API_KEY</key>
    <string>{YOUR_APP_ID}</string>
    <key>CRASH_REPORT_ENABLED</key>
    <true/>
</dict>
</plist>
```

### Uploading Symbol Files

The Embrace SDK allows you to view both native and JavaScript stack traces for crashes and error logs.
These stack traces, however, usually require symbol files to be able to make sense of them.
For JavaScript, you'll need to upload source maps. For iOS, dSYM files, and the mapping file for Android. 

### Add the "Upload symbols" phase to the build
On the Xcode Build Phase tab, add a new run script. You can find your 5-character app ID and API token in the Embrace dashboard:

```sh
EMBRACE_ID=YOUR_APP_ID EMBRACE_TOKEN=YOUR_API_TOKEN "${PODS_ROOT}/EmbraceIO/run.sh"
```

## Android Setup

In the root-level build.gradle Gradle file, add:

```gradle
  buildscript {
    repositories {
        mavenCentral()
        google()
    }
    dependencies {
       classpath 'io.embrace:embrace-swazzler:5.13.0'
    }
```

In the app/build.gradle Gradle file, add:

```gradle
apply plugin 'com.android.application'
apply plugin 'embrace-swazzler'
```

{{< tabs >}}
In app/src/main, add a config file named embrace-config.json. You can find your 5-character app ID and API token in the Embrace dashboard:

```json
{
  "app_id": "<your Embrace app ID>",
  "api_token": "<your Embrace API token>",
  "ndk_enabled": true
}
```

In your custom Activity class like in MyApplication.java, add:

```java
import io.embrace.android.embracesdk.Embrace;
import android.app.Application;

public final class MyApplication extends Application {
    @Override
    public void onCreate() {
        super.onCreate();
        Embrace.getInstance().start(this, false, Embrace.AppFramework.FLUTTER);
    }
}
```

Kotlin version

{{< /tabs >}}

If you do not already have a custom Application class, create a new source file matching the previous step then edit your AndroidManifest.xml to use your new custom Application class. Make sure you edit AndroidManifest.xml under the main sourceSet as well as any under debug/other sourceSets:

<application android:name=".MyApplication">