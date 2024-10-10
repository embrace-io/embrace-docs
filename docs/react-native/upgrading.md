---
title: Upgrade Guide
sidebar_position: 5
description: Upgrade guide for Embrace React Native SDK versions
---

# Upgrade guide

# Upgrading from 4.x to 5.x

:::info Summary
- Moments have been removed, Traces should be used in their place
- Configuration through `Embrace-Info.plist` on iOS has been removed, configuration is now done in code
- Native side initialization of the Embrace SDK has been rewritten in Swift
- Minimum versions for iOS deployment have been bumped ([details here](/react-native/integration/))
:::

Upgrade to the latest 5.x versions of the Embrace React Native SDK packages by either bumping to the latest version
manually in your package.json and running `yarn install` or `npm install` Or remove the existing packages entirely and
re-installing.

Then install the latest Cocoapod with

```shell
cd ios && pod install --repo-update
```

## SDK initialization and configuration is triggered in-code

If you initialize the Embrace SDK in your JavaScript code it will need to be updated to include a `sdkConfig`
parameter to configure the iOS SDK:

```javascript
import React, {useEffect, useState} from 'react'
import {initialize} from '@embrace-io/react-native';

const App = ()=> {

  useEffect(()=>{
    initialize({
      sdkConfig: {
        ios: {
          appId: "YOUR_IOS_APP_ID",
        }
      }
    }).then(hasStarted=>{
      if(hasStarted){
         //doSomething
      }
    });
  },[])

 return ...
}
export default App
```

### Upgrade of native iOS code 

The `Embrace-Info.plist` is no longer used for configuration and can be safely removed from your project.

Any existing initialization of the Embrace SDK that you had in your AppDelegate.m|mm|swift file should be removed. In
Objective-c this would be a line such as:

```objectivec
[[Embrace sharedInstance] startWithLaunchOptions:launchOptions framework:EMBAppFrameworkReactNative];
```

Or in Swift a line such as:

```swift
Embrace.sharedInstance().start(launchOptions: launchOptions, framework:.reactNative)
```

Replace these with the updated initialization code outlined in [Starting Embrace SDK from Android / iOS](/react-native/integration/session-reporting/#starting-embrace-sdk-from-android--ios)

## Moments have been replaced by Traces

APIs related to moments should be removed from your code.

Any place that you were previously instrumenting your app's performance using Moments can now be done using Performance
Tracing, please refer to [this guide](/react-native/features/traces/) for more information.

## Removed APIs

| Old API                  | Comments                                                 |
|--------------------------|----------------------------------------------------------|
| `endAppStartup`          | Deprecated API that is no longer supported.              |
| `startMoment`            | Deprecated API that is no longer supported.              |
| `endMoment`              | Deprecated API that is no longer supported.              |
| `getSessionProperties`   | Deprecated API that is no longer supported.              |