---
title: Track Screen Orientation
description: Add logging to your React Native application to track actions dispatched using the Embrace SDK
sidebar_position: 9
---

# Add React Native Screen tracker

## Adding Context to Sessions

Embrace can collect basic session data and crashes as you've already seen in the [Crash Reporting](/react-native/integration/crash-reporting) and [Session Reporting](/react-native/integration/session-reporting) sections.
Embrace can also collect when your app changes its orientation
Here's how you add the Orientation tracker to the session.

## Adding the component

Embrace has a separate module to track Screen Orientation, to use it you will need to add the Screen Orientation Tracker

### Install the component

```sh
yarn add @embrace-io/react-native-orientation-change-tracker
```

```sh
npm install @embrace-io/react-native-orientation-change-tracker
```

### Adding the method to your code

Add the useEmbraceOrientationLogger to your component

```javascript
// Import the Embrace log method
import { useEmbraceOrientationLogger } from "@embrace-io/react-native-orientation-change-tracker";

const App = () => {
  useEmbraceOrientationLogger()
  return (
   ...
  );
};
```