---
title: Track Screens
description: Add logging to your React Native application to track screens using the Embrace SDK
sidebar_position: 8
---

# Track React Native Screens

## Adding Context to Sessions

Embrace can collect basic session data and crashes as you've already seen in the [Crash Reporting](/react-native/4x/integration/crash-reporting) and [Session Reporting](/react-native/4x/integration/session-reporting) sections.
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

#### Android

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

#### iOS

Go to your Embrace-info.plist inside ios/YOURAPPNAME and add ENABLE_AUTOMATIC_VIEW_CAPTURE as false, your file should be like this

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>API_KEY</key>
	<string>{API_KEY}</string>
	<key>CRASH_REPORT_ENABLED</key>
	<true/>
   <!-- Add this key and the value as false-->
	<key>ENABLE_AUTOMATIC_VIEW_CAPTURE</key>
	<false/>
</dict>
</plist>
```
