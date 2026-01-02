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

### Install the Package

npm:

```sh
npm install @embrace-io/react-native-navigation
```

yarn:

```sh
yarn add @embrace-io/react-native-navigation
```

## Setup in your code

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

<Tabs groupId="packages" queryString="packages">
<TabItem value="expo-router" label="expo-router">

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

  // make sure a tracer provider is registered BEFORE you attempt to record the first span (otherwise somo initial telemetrt can be missed).
  const {tracerProvider, isLoading: isLoadingTracerProvider} =
    useEmbraceNativeTracerProvider({}, isStarted);

  const expoNavigationRef = useNavigationContainerRef();

  if (isLoadingTracerProvider) {
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
        "custom.key": "custom.value",
      }}>
      {/* rest of the navigation */}
    </EmbraceNavigationTracker>
  );
};

export default App;
```

</TabItem>

<TabItem value="react-navigation/native" label="@react-navigation/native">

```javascript
import React from "react";
import {useEmbraceNativeTracerProvider} from "@embrace-io/react-native-tracer-provider";
import {EmbraceNavigationTracker} from "@embrace-io/react-native-navigation";
import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
import {useEmbrace} from "@embrace-io/react-native";

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

  if (isLoadingTracerProvider) {
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
          "custom.key": "custom.value",
        }}>
        {/* rest of the navigation */}
      </EmbraceNavigationTracker>
    </NavigationContainer>
  );
};

export default App;
```

Do not forget to wrap your entire application with the `NavigationTracker` component as described in their official documentation.
</TabItem>

<TabItem value="react-native-navigation" label="react-native-navigation">

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
            screenAttributes={{ // at the moment attributes can't be modified or included after an span is started
              "test.attr": 98765,
              dev: true,
            }}>
            <HomeScreen {...props} />
          </EmbraceNativeNavigationTracker>
        );
      },
    () => HomeScreen,
  );

  // rest of registration and configuration
};

// entry point of the app
initApp();
```

</TabItem>
</Tabs>

## Disable Auto Tracking for Native Screens

Embrace automatically collects the native screens, if you do not want to see them in the session you can disable it.

<Tabs groupId="disable-auto-native-screen-tracking" queryString="disable-auto-native-screen-tracking">
<TabItem value="android" label="Android">
Go to your `embrace-config.json` inside `android/app/src/main` and edit the `sdk_config`, your file should be like this

```json
{
  "app_id": "__APP_ID__",
  "api_token": "__API_TOKEN__",
  "sdk_config": {
    "app_framework": "react_native",
    // Add these lines
    "view_config": {
      "enable_automatic_activity_capture": false
    }
  }
}
```

</TabItem>

<TabItem value="ios" label="iOS">

If you used the automated installation script or followed the manual steps for setting up the iOS SDK then you can
modify the setup in `EmbraceInitializer.swift` to remove the view capture service, see [Configuring the iOS SDK](/ios/6x/getting-started/configuration-options.md)
for more details:

```swift
import Foundation
import EmbraceIO
import KSCrash

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
                        crashReporter: KSCrashReporter()
                    )
                )
                .start()
        } catch let e {
            print("Error starting Embrace \(e.localizedDescription)")
        }
    }
}
```

</TabItem>
</Tabs>

If instead you only initialized the SDK through JavaScript then the `disableAutomaticViewCapture` property can be set during the
call to initialize the SDK:

```javascript
const App = () => {
  const {isPending, isStarted} = useEmbrace({
    ios: {
      appId: "__APP_ID__",
      disableAutomaticViewCapture: true, // disabling the feature
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
      console.log("An error occurred during Embrace initialization");
    }
  }

  return (
    /* regular content of the application */
  )
};

export default App;
```

## Migrating from older versions

<Tabs groupId="older" queryString="older">
<TabItem value="react-navigation" label="@embrace-io/react-navigation">

The old `@embrace-io/react-navigation` exposed a hook that receives a reference pointing to the `NavigationContainer` component:

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

Now you just need to pass the reference into the new `EmbraceNavigationTracker` component exposed by the newest version of `@embrace-io/react-native-navigation` and configure it in the desired way:

```javascript
import React, {useRef} from "react";
import {EmbraceNativeNavigationTracker} from "@embrace-io/react-native-navigation";
import {useEmbraceNativeTracerProvider} from "@embrace-io/react-native-tracer-provider";
import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";

function App() {
  // Embrace initialization should happen before

  // as of now if you inspect the source code of `useNavigationContainerRef` from `@react-navigation/native` you will see that it returns `navigation.current` instead of the entire shape of a reference
  const navigationRefVal = useNavigationContainerRef();
  // We need here the entire shape, so we re-create it and pass it down into the `ref` prop for the `EmbraceNavigationTracker` component.
  const navigationRef = useRef(navigationRefVal)

  const {tracerProvider} = useEmbraceNativeTracerProvider();

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
        <Screens... />
      </EmbraceNavigationTracker>
    </NavigationContainer>
  );
}
```

</TabItem>

<TabItem value="react-native-navigation" label="@embrace-io/react-native-navigation">

The old `@embrace-io/react-native-navigation` exposed a builder that received the Navigation shape in the way it is exported by `react-native-navigation` to start tracking views:

```javascript
import {Navigation} from "react-native-navigation";

import EmbraceNavigationTracker from "@embrace-io/react-native-navigation";
EmbraceNavigationTracker.build(Navigation);

Navigation.registerComponent("myLaunchScreen", () => App);
Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: "myLaunchScreen",
            },
          },
        ],
      },
    },
  });
});
```

Now you just need to wrap your root view using the `EmbraceNativeNavigationTracker` component exposed by the newest version of `@embrace-io/react-native-navigation` and configure it in the desired way:

```javascript
import {Navigation} from "react-native-navigation";
import {initialize} from "@embrace-io/react-native";
import {EmbraceNativeTracerProvider} from "@embrace-io/react-native-tracer-provider";
import {TracerProvider} from "@opentelemetry/api";

await initialize({
  sdkConfig: {
    ios: {
      appId: "__APP_ID__",
    },
  },
});

let provider;
try {
  provider = new EmbraceNativeTracerProvider();
} catch (e) {
  console.log(
    "Error creating `EmbraceNativeTracerProvider`. Will use global tracer provider instead",
    e,
  );
}

// entry point of app
Navigation.registerComponent(
  "HomeScreen",
  props => () => {
    const ref = useRef(Navigation.events());

    return (
      <EmbraceNativeNavigationTracker
        ref={ref}
        tracerProvider={provider}
        screenAttributes={{
          "test.attr": 98765,
        }}>
        <RootScreen {...props} />
      </EmbraceNativeNavigationTracker>
    );
  },
  () => RootScreen,
);

// rest of navigation + configuration
```

</TabItem>
</Tabs>
