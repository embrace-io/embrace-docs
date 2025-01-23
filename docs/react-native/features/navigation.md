---
title: Track Navigation
description: Add logging to your React Native application to track navigation between screens using the Embrace SDK
sidebar_position: 3
---

# Track Navigation

This package collect telemetry around Navigation based on [expo-router](https://github.com/expo/expo/tree/main/packages/expo-router), [@react-navigation/native](https://github.com/react-navigation/react-navigation) and [react-native-navigation](https://wix.github.io/react-native-navigation/).

## Adding Context to Sessions

Embrace can collect basic session data and crashes as you've already seen in the [Crash Reporting](/react-native/integration/crash-reporting) and [Session Reporting](/react-native/integration/session-reporting) sections.
Embrace can also collect the screens that your app opened and include it as context within your sessions.
Here's how you add the screen tracker to the session.

#### Install the Package

npm:

```sh
npm install @embrace-io/react-native-navigation
```

yarn:

```sh
yarn add @embrace-io/react-native-navigation
```

#### Adding the component to your code

## Setup in your code

Using `expo-router`:

```javascript
import React from "react";
import {useEmbraceNativeTracerProvider} from "@embrace-io/react-native-tracer-provider";
import {EmbraceNavigationTracker} from "@embrace-io/react-native-navigation";
import {useNavigationContainerRef} from "expo-router";
import {useEmbrace} from "@embrace-io/react-native";

const App = () => {
  const {isPending, isStarted} = useEmbrace({
    ios: {
      appId: "__APP_ID__",
    },
  });

  // In both cases you have to make sure a tracer provider is registered BEFORE you attempt to record the first span (otherwise somo initial telemetrt can be missed).
  const {tracerProvider, isLoading: isLoadingTracerProvider} =
    useEmbraceNativeTracerProvider({}, isStarted);

  // If you do not use `expo-router` the same hook is also available in `@react-navigation/native` since `expo-router` is built on top of it.
  // Make sure this ref is passed also to the navigation container at the root of your app (if not, the ref would be empty and you will get a console.warn message instead).
  const expoNavigationRef = useNavigationContainerRef();

  if (isLoadingTracerProvider || tracerProvider === null) {
    return (
      <View>
        <Text>Loading Tracer Provider...</Text>
      </View>
    );
  }

  return (
    <EmbraceNavigationTracker
      ref={expoNavigationRef}
      tracerProvider={tracerProvider}
      // These static attributes will be passed into each created span
      screenAttributes={{
        "static.attribute": 123456,
        "custom.key": "abcd...",
      }}>
      ... navigation
    </EmbraceNavigationTracker>
  );
};

export default App;
```

If you are using purely [@react-navigation/native](https://github.com/react-navigation/react-navigation):

```javascript
import React from "react";
import {useEmbraceNativeTracerProvider} from "@embrace-io/react-native-tracer-provider";
import {EmbraceNavigationTracker} from "@embrace-io/react-native-navigation";
import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
import {useEmbrace} from "@embrace-io/react-native";
import CartPage from "screens/CartPage";
import CheckoutPage from "screens/CheckoutPage";

const App = () => {
  const {isPending, isStarted} = useEmbrace({
    ios: {
      appId: "__APP_ID__",
    },
  });

  const {tracerProvider, isLoading: isLoadingTracerProvider} =
    useEmbraceNativeTracerProvider({}, isStarted);

  // as of now if you inspect the source code of `useNavigationContainerRef` from `@react-navigation/native` you will see that it returns `navigation.current` instead of the entire shape of a reference
  const navigationRefVal = useNavigationContainerRef();
  // We need here the entire shape, so we re-create it and pass it down into the `ref` prop for the `EmbraceNavigationTracker` component.
  const navigationRef = useRef(navigationRefVal);

  if (isLoadingTracerProvider || tracerProvider === null) {
    return (
      <View>
        <Text>Loading Tracer Provider...</Text>
      </View>
    );
  }

  return (
    // `NavigationContainer` is waiting for what `useNavigationContainerRef` is returning (both exported from `@react-navigation/native`)
    <NavigationContainer ref={navigationRefVal}>
      <EmbraceNavigationTracker
        ref={navigationRef}
        tracerProvider={tracerProvider}
        screenAttributes={{
          "static.attribute": 123456,
          "custom.key": "abcd...",
        }}>
        ... navigation
      </EmbraceNavigationTracker>
    </NavigationContainer>
  );
};

export default App;
```

NOTE: If you are using [@react-navigation/native](https://github.com/react-navigation/react-navigation) you need to wrap your entire application with the `NavigationTracker` component as described in their official documentation.

If you are using [react-native-navigation](https://wix.github.io/react-native-navigation/) you are also able to track navigation changes.
You have to make sure you wrap your entry view with the `<EmbraceNativeNavigationTracker />` component and initialize Embrace as soon as possible to avoid missing telemetry data.

```javascript
// index.ts
import React, {useRef} from "react";
import {EmbraceNativeTracerProvider} from "@embrace-io/react-native-tracer-provider";
import {TracerProvider} from "@opentelemetry/api";
import {EmbraceNativeNavigationTracker} from "@embrace-io/react-native-navigation";
import {initialize} from "@embrace-io/react-native";
import {Navigation} from "react-native-navigation";
import {HomeScreen} from "screens/HomeScreen";

const initApp = async () => {
  // this example is showing how we can initialize Embrace not using hooks
  await initialize({
    sdkConfig: {
      ios: {appId: "__YOUR_APP_ID__"},
    },
  });

  let embraceTracerProvider: TracerProvider;
  try {
    embraceTracerProvider = new EmbraceNativeTracerProvider();
  } catch (e) {
    console.log(
      "Error creating `EmbraceNativeTracerProvider`. Will use global tracer provider instead",
      e,
    );
  }

  Navigation.registerComponent(
    "HomeScreen",
    () =>
      (props) => {
        // make sure to wrap the events registry instance in a React ref
        const navRef = useRef(Navigation.events());

        return (
          <EmbraceNativeNavigationTracker
            ref={navRef}
            tracerProvider={embraceTracerProvider}
            screenAttributes={{
              "test.attr": 98765,
              dev: true,
            }}>
            <HomeScreen {...props} />
          </EmbraceNativeNavigationTracker>
        );
      },
    () => HomeScreen,
  );

  // ... rest of registration and configuration
};

// entry point of the app
initApp();
```

### Disable Auto Tracking for Native Screens

Embrace automatically collects the native screens, if you do not want to see them in the session you can disable it.

#### Android:

Go to your embrace-config.json inside android/app/src/main and add the sdk_config, your file should be like this

```json
{
  "app_id": "__APP_ID__",
  "api_token": "__API_TOKEN__",
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
modify the setup in `EmbraceInitializer.swift` to remove the view capture service, see [Configurating the iOS SDK](/ios/open-source/integration/embrace-options/)
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
                        appId: "__APP_ID__",
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
const App = () => {
  const { isPending, isStarted } = useEmbrace({
    ios: {
      appId: '__APP_ID__',
      disableAutomaticViewCapture: true // disabling the feature
    }
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
};

export default App;
```
