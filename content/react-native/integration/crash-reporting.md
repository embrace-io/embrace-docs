---
title: "Crash Reporting"
description: Upload crash reports for both native and JavaScript exceptions from your React Native application using the Embrace SDK
weight: 6
aliases:
  - /react-native/crash-reporting/
---

# Collect your first crash report 

## Setting up the Crash Reporter

If you've been following along, you should be setup to collect native crash reports. 
To upload crash reports from unhandled JavaScript exceptions, add the following in the entrypoint of the React app.

```javascript
import {initialize} from 'react-native-embrace'

initialize();
```

This will setup a hook that gets called and uploads a crash report when the application crashes because of an unhandled JavaScript exception.
You can also pass in a patch number to the `initialize` function to use along side the version of the app to pinpoint which JavaScript bundle the user was running when the app crashed.

```javascript
initialize({patch: 'v1'});
```

{{< hint info >}}
**Note for iOS**

If you'd like to use Embrace's internal crash reporter,
set the `CRASH_REPORT_ENABLED` field to true in the `Embrace-Info.plist` file that you created earlier (as
described in the [Adding the Embrace SDK]({{< relref "/react-native/integration/add-embrace-sdk" >}}) page).
If you're using Crashlytics, set this value to false.
{{< /hint >}}

{{< hint warning >}}

**OTA Updates**

If you distribute updated JavaScript bundles outside of the App Store/Google
Play Store, you will
need to point the Embrace SDK to where the most up to date bundle is installed
on the device. Otherwise, the stack traces will not be translated properly.
If you use CodePush, this is done automatically and there is no need to point
the Embrace SDK to where CodePush downloads the latest JavaScript bundle. 

In JavaScript:
```javascript
import {setJavaScriptBundlePath} from 'react-native-embrace';

setJavaScriptBundlePath('/path/to/bundle');
```

In Objective-C:
```objective-c
[[RNEmbrace sharedIntance] setJavasScriptBundleURL: pathToBundle];
```

In Java:

```java
Embrace.getInstance().setJavaScriptBundleURL(pathToBundle);
```


{{< /hint >}}

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

{{< button relref="/react-native/integration/breadcrumbs" >}}Learn About Breadcrumb Logs{{< /button >}}