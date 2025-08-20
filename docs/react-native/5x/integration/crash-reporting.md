---
title: Crash Reporting
description: Upload crash reports for both native and JavaScript exceptions from your React Native application using the Embrace SDK
sidebar_position: 6
---

# Collect your first crash report  

## Setting up the Crash Reporter

If you've been following along, you should be setup to collect native crash reports.  
To upload crash reports from unhandled JavaScript exceptions, add the following in the entrypoint of the React app.

```javascript
import {initialize} from '@embrace-io/react-native'
// Note: Initialize is a promise, so if you want to perform an action and it must be tracked, it is recommended to use await to wait for the method to finish

initialize().then(hasStarted=>{
    if(hasStarted){
        //doSomething
    }
});
```

:::info Note for initialize method
The initialize method will apply the interceptors needed to get information from your app. Since its a Promise, so you might want to "await" or "then" it before doing something else.  
:::

This will setup a hook that gets called and uploads a crash report when the application crashes because of an unhandled JavaScript exception.
You can also pass in a patch number to the `initialize` function to use along side the version of the app to pinpoint which JavaScript bundle the user was running when the app crashed.

```javascript
// Note: Initialize is a promise, so if you want to perform an action and it must be tracked, it is recommended to use await to wait for the method to finish

initialize({patch: 'v1'});
```

:::info Note for iOS
Embrace's internal crash reporter will be used by default. If you are using another crash reporter that you don't want
to interfere with you can disable this. If you used the automated installation script or followed the manual steps for
setting up the iOS SDK then you can modify the setup in `EmbraceInitializer.swift` to remove the crash reporter:

```swift
try Embrace
    .setup(
        options: Embrace.Options(
            appId: "YOUR-APP-ID",
            platform: .reactNative,
            captureServices: .automatic,
            crashReporter: nil
        )
    )
    .start()
```

If instead you only initialized the SDK through JS then the `disableCrashReporter` property can be set during the
call to initialize the SDK:

```javascript
initialize({
  sdkConfig: {
    ios: {
      appId: "YOUR-APP_ID",
      disableCrashReporter: true,
    }
  }
})
```

:::

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

:::warning OTA Updates
If you distribute updated JavaScript bundles outside of the App Store/Google
Play Store, you will
need to point the Embrace SDK to where the most up to date bundle is installed
on the device. Otherwise, the stack traces will not be translated properly.
If you use CodePush, this is done automatically and there is no need to point
the Embrace SDK to where CodePush downloads the latest JavaScript bundle.  

<Tabs groupId="rn-language" queryString="rn-language">
<TabItem value="javascript" label="JavaScript">

```javascript
import {setJavaScriptBundlePath} from '@embrace-io/react-native';

setJavaScriptBundlePath('/path/to/bundle');
```

</TabItem>
<TabItem value="objectivec" label="Objective-C">

```objectivec
[[RNEmbrace sharedIntance] setJavasScriptBundleURL: pathToBundle];
```

</TabItem>
<TabItem value="java" label="Java">

```java
Embrace.getInstance().getReactNativeInternalInterface().setJavaScriptBundleUrl(pathToBundle);
```

</TabItem>
</Tabs>

:::

## Triggering a Crash

Now we're ready to trigger a crash.
Either crash the app organically, or add the following code to make it crash.

```javascript
throw new Error('This is a crash');
```

Embrace only uploads crash reports for applications that are running in release mode.
Build and run your application in release mode.

Remember that Embrace sessions only upload on subsequent launches.
This means that after seeing the application crash, you must now launch the application again for that crashed session to upload to the Embrace servers.

Once uploaded you should notice that your session is marked with the "crashed" icon.
Additionally your crash is visible in the crashes section of the dashboard.

---

In the next guide, you'll learn how to add context to your sessions using Breadcrumb Logs.
