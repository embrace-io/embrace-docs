---
title: Track Screens
description: Add logging to your React Native application to track screens using the Embrace SDK
sidebar_position: 8
---

# Track React Native Screens

## Adding Context to Sessions

Embrace can collect basic session data and crashes as you've already seen in the [Crash Reporting](/react-native/5x/integration/crash-reporting) and [Session Reporting](/react-native/5x/integration/session-reporting) sections.
Embrace can also collect the screens that your app opened and include it as context within your sessions.
Here's how you add the screen tracker to the session.

## Add React Navigation screen tracker

### Adding the component

Embrace has a separate module for tracking Screens, to use it you will need to add the React Navigation Tracker

#### Install the component

```shell-session
yarn add @embrace-io/react-navigation
```

```shell-session
npm install @embrace-io/react-navigation
```

#### Adding the component to your code

Add an useRef for the NavigationContainer and pass it to Embrace's hook

```javascript
import {useRef} from 'react'
import {useEmbraceNavigationTracker} from '@embrace-io/react-navigation';

function App() {
  // Create the reference
  const navigationRef = useRef();
  // Pass the reference to Embrace's Hook
  useEmbraceNavigationTracker(navigationRef);

  return (
      // Assign the NavigationContainer reference value to the useRef created
      <NavigationContainer ref={navigationRef}>
        <Screens... />
      </NavigationContainer>
  );
}
```

## Add React Native Navigation screen tracker

### Adding the component

Embrace has a separate module for tracking Screens, to use it you will need to add the React Native Navigation Tracker

#### Install the component

```shell-session
yarn add @embrace-io/react-native-navigation
```

```shell-session
npm install @embrace-io/react-native-navigation
```

#### Adding the component to your code

Apply the EmbraceNavigationTracker to your Navigation instance. You should do this in your entry point, usually index.js

:::info
If you have more than one navigation instance, you can pass a second parameter to the build method with an identifier
:::

```javascript
import {Navigation} from 'react-native-navigation';

// Start - Add those lines
import EmbraceNavigationTracker from '@embrace-io/react-native-navigation'; 
EmbraceNavigationTracker.build(Navigation);
// End - Add those lines

Navigation.registerComponent('myLaunchScreen', () => App);
Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'myLaunchScreen',
            },
          },
        ],
      },
    },
  });
});
```

:::info
Currently we are only supporting 'React Native Navigation SDK' and 'React Navigation SDK', if you are using another library please contact us at [support@embrace.com](mailto:support@embrace.com) or on Slack if you would like to request support.
:::

### Disable Auto Tracking for Native Screens

Embrace automatically collects the native screens, if you do not want to see them in the session you can disable it.

#### Android:

Go to your embrace-config.json inside android/app/src/main and add the sdk_config, your file should be like this

```javascript
{
  "app_id": "APP_ID",
  "api_token": "API_TOKEN",
  ...
  // Add this lines
  "sdk_config": {
    "view_config": {
      "enable_automatic_activity_capture": false
    }
  }
}
```

#### iOS:

If you used the automated installation script or followed the manual steps for setting up the iOS SDK then you can
modify the setup in `EmbraceInitializer.swift` to remove the view capture service, see [Configuring the iOS SDK](/ios/6x/getting-started/configuration-options.md)
for more details:

```swift
import Foundation
import EmbraceIO
import EmbraceCrash

@objcMembers class EmbraceInitializer: NSObject {
    static func start() -> Void {
        do {

            try Embrace
                .setup(
                    options: Embrace.Options(
                        appId: "YOUR-APP-ID",
                        platform: .reactNative,
                        captureServices: CaptureServiceBuilder()
                            .addDefaults()
                            .remove(ofType: ViewCaptureService.self)
                            .build(),
                        crashReporter: EmbraceCrashReporter()
                    )
                )
                .start()
        } catch let e {
            print("Error starting Embrace \(e.localizedDescription)")
        }
    }
}
```

If instead you only initialized the SDK through JS then the `disableAutomaticViewCapture` property can be set during the
call to initialize the SDK:
```javascript
initialize({
  sdkConfig: {
    ios: {
      appId: "YOUR-APP-ID",
      disableAutomaticViewCapture: true,
    }
  }
})
```