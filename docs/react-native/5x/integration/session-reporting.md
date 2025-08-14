---
title: Session Reporting
description: Upload session reports from your React Native application using the Embrace SDK
sidebar_position: 5
---

# Session Reporting

Now that you’ve added the Embrace SDK to your project and can login to the Embrace dashboard, you’re ready to create your first session.
Here are the steps you’ll be taking to create your first session.

1. [Initialize Embrace](/react-native/5x/integration/session-reporting#initialize-embrace-sdk)
1. [Add a start call to the Embrace SDK (optional)](/react-native/5x/integration/session-reporting#starting-embrace-sdk-from-android--ios)
1. [Build and run the application](/react-native/5x/integration/session-reporting#build-and-run-the-application)
1. [Trigger a session upload](/react-native/5x/integration/session-reporting#trigger-a-session-upload)

## Initialize Embrace SDK

Initialize method applies the necessary listener to your application. This allows Embrace to track javascript errors,
check js bundle changes (if you use OTA), track js patch and react native versions. For iOS this is also where you'll
pass in your app ID.

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

<Tabs groupId="platform" queryString="platform">
<TabItem value="ios" label="Component">

```javascript
import {initialize} from "@embrace-io/react-native";

export default class App extends Component {
  componentDidMount() {
    // Note: Initialize is a promise, so if you want to perform an action and it must be tracked, it is recommended to use await to wait for the method to finish
    initialize({
      sdkConfig: {
        ios: {
          appId: "abcdf",
        },
      },
    }).then(hasStarted => {
      if (hasStarted) {
        //doSomething
      }
    });
  }
}
```

</TabItem>
<TabItem value="hooks" label="Hooks">

```javascript
import React, {useEffect, useState} from 'react'
import {initialize} from '@embrace-io/react-native';

const App = () => {
  useEffect(() => {
    // Note: Initialize is a promise, so if you want to perform an action and it must be tracked, it is recommended to use await to wait for the method to finish
    initialize({
      sdkConfig: {
        ios: {
          appId: "abcdf",
        }
      }
    }).then(hasStarted=>{
      if (hasStarted) {
        // doSomething
      }
    });
  },[]);

 return ...
}

export default App
```

</TabItem>
</Tabs>

:::info Note for initialize method
The initialize method will apply the interceptors that we need to get information from your app. Since its a Promise, so you might want to "await" or "then" it before doing something else.
:::

## Starting Embrace SDK from Android / iOS

Initializing the Embrace SDK from the JavaScript side as shown above will automatically initialize the underlying native
Embrace SDKs (Android / iOS). This means that the network, crash, and metrics interceptors will only be initialized once
JavaScript is loaded and has called the initialize method mentioned in the previous step. This is useful if you want more
control over exactly when the SDK starts. However, if you want to start applying the interceptors as soon as Android / iOS
has started, or if you have custom configuration then you can perform the initialization on the native side as shown in
this section.

:::info
If you made use of the automated setup script from the [Adding the Embrace SDK](/react-native/5x/integration/add-embrace-sdk/#setup-script)
then these steps will already have been completed for you
:::

<Tabs groupId="platform" queryString="platform">

<TabItem value="ios" label="iOS">

Create a new `EmbraceInitializer.swift` file in your project with the following contents:

```swift
import Foundation
import EmbraceIO

@objcMembers class EmbraceInitializer: NSObject {
    static func start() -> Void {
        do {
            try Embrace
                .setup(
                    options: Embrace.Options(
                        appId: "YOUR-APP-ID",
                        platform: .reactNative
                    )
                )
                .start()
        } catch let e {
            print("Error starting Embrace \(e.localizedDescription)")
        }
    }
}
```

:::warning
Once the iOS SDK is being initialized in this way any configuration any parameters passed through the JS side with
`sdkConfig.ios` are ignored. Additional configuration can be applied when setting up the iOS SDK in the [configuration steps](/ios/6x/api-reference/configuration.md).
:::

If your app delegate is in Swift you can then simply add a call `EmbraceInitializer.start()` to the start of the
`application` method in your app delegate like:

```swift
@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {
    ...
    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        EmbraceInitializer.start()
        ...
```

If your app delegate is in Objective-c and this is the first swift file in your project Xcode will prompt you to create
a Bridging header file which you should accept. Then in your `AppDelegate.m|mm` file you will need to add an import to
your project's auto generated Swift header `#import "ProductModuleName-Swift.h"` substituting your product's module name
(see [Apple's docs](https://developer.apple.com/documentation/swift/importing-swift-into-objective-c#Overview) for more
information on how this is generated) and then add a call to `[EmbraceInitializer start];` to the start of the
`application` method in your app delegate like:

```objectivec
#import "AppDelegate.h"
#import "ProductModuleName-Swift.h"

...

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  [EmbraceInitializer start];
  ...
}
```

If you are using Expo you may need an additional `#import <ExpoModulesCore-Swift.h>` import before the line that
imports your product's auto generated header, see [this issue](https://github.com/expo/expo/issues/17705#issuecomment-1196251146)
for more details.

</TabItem>
<TabItem value="android" label="Android">

Open the `MainApplication.java` file (usually located at `<project root>/android/app/src/main/java/com/<MyApp>/MainApplication.java`)
and add the following to start Embrace:

```java
import io.embrace.android.embracesdk.Embrace;

...

public class MainApplication extends Application implements ReactApplication {

    @Override
    public void onCreate() {
        super.onCreate();
        // Add this line right after the super.onCreate();
        Embrace.getInstance().start(this, false, Embrace.AppFramework.REACT_NATIVE);
    }
}
```

</TabItem>
</Tabs>

## Build and Run the Application

Now you're ready to build and run the application.
Launch the application how you usually would during development.

:::info
If you encounter any errors, please get in touch on Slack and we can assist you.
:::

## Trigger a Session Upload

To trigger a session upload, simply stop the application by either force killing
it or using the stop button in either Xcode for iOS or Android Studio for Android.
Now run the application again.
This second launch will upload the previous session immediately.
Refresh the dashboard in your browser and you should now see that you've moved on to the next step.

---

Congratulations! At this point you've completed a basic integration of Embrace.
Embrace is already collecting interesting data from your application. You can
see this data by browsing around the timeline page for the session you just captured.

Up next, you'll be learning about uploading crash reports.
