---
title: Session reporting
description: Upload session reports from your React Native application using the Embrace SDK
sidebar_position: 5
---

# Session reporting

Now that you’ve added the Embrace SDK to your project and can login to the Embrace dashboard, you’re ready to create your first session.
Here are the steps you’ll be taking to create your first session.

1. [Initialize Embrace SDK in the JavaScript side](/react-native/integration/session-reporting#initialize-embrace-sdk-in-the-javascript-side)
2. [Start Embrace SDK in the Native side](/react-native/integration/session-reporting#start-embrace-sdk-in-the-native-side)
3. [Build and run the application](/react-native/integration/session-reporting#build-and-run-the-application)
4. [Trigger a session upload](/react-native/integration/session-reporting#trigger-a-session-upload)

## Initialize Embrace SDK in the JavaScript side

### Without hooks

Calling the `initialize` method sets up the tracking for the SDK on the JS side. This is needed even if you choose
to start the SDK earlier on the native side as explained below, however in that case the configuration passed through
in the `sdkConfig` object is ignored in favor of the native startup configuration.

```javascript
import React, { useEffect, useState } from 'react'
import { initialize } from '@embrace-io/react-native';

const App = () => {
  useEffect(() => {
    const initEmbrace = async () => {
      try {
        const isStarted = await initialize({
          sdkConfig: {
            ios: {
              appId: "abcdf",
            },
          },
        });

        if (isStarted) {
          // do something
        }
      } catch {
        console.log("Error initializing Embrace SDK");
      }
    };

    initEmbrace();
  });

  // regular content of the application
  return (
    ...
  );
}

export default App
```

### With hooks

The SDK also exposes a hook that handles the initialization of Embrace in a more React-friendly way:

```javascript
import React, { useEffect, useState } from 'react'
import { useEmbrace } from '@embrace-io/react-native';

const App = () => {
  // minimum of configuration required
  const {isPending, isStarted} = useEmbrace({
    ios: {
      appId: "__APP_ID__", // 5 digits string
    },
  });


  if (isPending) {
    return (
      <View>
        <Text>Loading Embrace</Text>
      </View>
    );
  } else {
    if (!isStarted) {
      console.log('An error occurred during Embrace initialization');
    }
  }

  // regular content of the application
  return (
    ...
  );
}

export default App
```

In both cases, you should use these methods to initialize the React Native Embrace SDK at the top level of your application just once to prevent side effects in the JavaScript layer.

## Start Embrace SDK in the native side

:::info
If you made use of the automated setup script from the [Adding the Embrace SDK](/react-native/integration/add-embrace-sdk#setup-script)
then these steps will already have been completed for you
:::

Initializing the Embrace SDK from the JavaScript side as shown above will automatically initialize the underlying native
Embrace SDKs (Android / iOS). This means telemetry collection will **only begin once JavaScript is loaded** and the initialize
method from the previous step has been called. This can be useful if you want more control over exactly when the SDK starts.
However, if you want data to be collected as soon as Android / iOS has started, or if you require more custom setup,
then you can perform the initialization on the native side as shown in this section.

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

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
                        appId: "__APP_ID__", // 5 digits string
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
Once the iOS SDK is being initialized in this way any configuration any parameters passed through the JavaScript side with
`sdkConfig.ios` are ignored. Additional configuration can be applied when setting up the iOS SDK.
:::

If your app delegate is in Swift you can then simply add a call `EmbraceInitializer.start()` to the start of the
`application` method in your app delegate like:

```swift
@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {
    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        EmbraceInitializer.start()

        // rest of the logic
    }
}
```

If your app delegate is in Objective-c and this is the first swift file in your project then Xcode will prompt you to create
a Bridging header file which you should accept. Next, in your `AppDelegate.m|mm` file you will need to add an import to
your project's auto generated Swift header `#import "ProductModuleName-Swift.h"` (substituting your product's module name,
see [Apple's docs](https://developer.apple.com/documentation/swift/importing-swift-into-objective-c#Overview)), and then
add a call to `[EmbraceInitializer start];` to the start of the `application` method in your app delegate like the
following:

```objectivec
#import "AppDelegate.h"
#import "ProductModuleName-Swift.h"

...

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  [EmbraceInitializer start];

  // rest of the logic
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
        Embrace.getInstance().start(this);
    }
}
```

</TabItem>
</Tabs>

### Initializing Embrace SDK without an app ID or token

If you prefer to send the data into a custom backend avoiding Embrace you should skip the app_id / token values from both platform configurations. For more information about it you can visit the how to [Use without an Embrace account](/react-native/integration/login-embrace-dashboard#use-without-an-embrace-account) section.

## Build and run the application

Now you're ready to build and run the application.
Launch the application how you usually would during development.

:::info
If you encounter any errors, please get in touch on Slack and we can assist you.
:::

## Trigger a session upload

To trigger a session upload, simply background and then foreground the app, or stop the application by either force
killing it or using the stop button in either Xcode for iOS or Android Studio for Android.
Now run the application again.
This second launch will upload the previous session immediately.
Refresh the dashboard in your browser and you should see the session reported.

---

Congratulations! At this point you've completed a basic integration of Embrace.
Embrace is already collecting interesting data from your application. You can
see this data by browsing around the timeline page for the session you just captured.

Up next, you'll be learning about uploading crash reports.
