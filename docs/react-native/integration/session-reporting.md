---
title: Session Reporting
description: Upload session reports from your React Native application using the Embrace SDK
sidebar_position: 5
---

# Session Reporting

Now that you’ve added the Embrace SDK to your project and can login to the Embrace dashboard, you’re ready to create your first session.
Here are the steps you’ll be taking to create your first session.

1. [Import Embrace](/react-native/integration/session-reporting#import-embrace)
1. [Add a start call to the Embrace SDK](/react-native/integration/session-reporting#add-the-start-call)
1. [End the Startup Moment](/react-native/integration/session-reporting#end-the-startup-moment)
1. [Build and run the application](/react-native/integration/session-reporting#build-and-run-the-application)
1. [Trigger a session upload](/react-native/integration/session-reporting#trigger-a-session-upload)

## Import Embrace 

Start by importing the Embrace native SDK in the file that applies for each platform.

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

<Tabs groupId="platform" queryString="platform">
<TabItem value="ios" label="iOS">

Open the `AppDelegate.m` file (usually located at `<project root>/ios/<MyApp>/AppDelegate.m`) and import Embrace.
```objectivec
#import <Embrace/Embrace.h>
```

</TabItem>
<TabItem value="android" label="Android">

Open the `MainApplication.java` file (usually located at `<project root>/android/app/src/main/java/com/<MyApp>/MainApplication.java`) and import Embrace.

```java
import io.embrace.android.embracesdk.Embrace;
```

</TabItem>
</Tabs>

:::info
If you used the setup script mentioned on the [Adding the Embrace SDK](/react-native/integration/add-embrace-sdk) page, this change has already been made for you.
:::

## Add the Start Call

After importing Embrace, update the same files that you edited in the previous step to make a call to the Embrace SDK to start capturing data.

<Tabs groupId="platform" queryString="platform">
<TabItem value="ios" label="iOS">

```objectivec
@implementation AppDelegate
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *) launchOptions
{
    // Replace with your APP_ID, which is a 5-character value, e.g. "aBc45"
    [[Embrace sharedInstance] startWithKey:@"APP_ID" launchOptions: launchOptions framework:EMBAppFrameworkReactNative];
    return YES;
}
```

:::info
If you are using Swift, follow the steps in the [iOS Linking Embrace](/ios/integration/session-reporting) section.
:::

</TabItem>
<TabItem value="android" label="Android">

```java
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

## End the Startup Moment

Embrace automatically starts the **startup** moment when your application launches.
You'll learn more about moments in [Performance Monitoring](/react-native/features/performance-monitoring) guide.
For now, you can think of the startup moment as a timer that measures how long it took your application to launch.
Although in both Android and iOS the moment is started automatically, ending it is platform specific.

For Android, the SDK will end the moment automatically.
To end the startup moment when you React component mounts, see the [Android guide](/android/integration/session-reporting#end-the-startup-moment) to prevent the moment from ending automatically.

The iOS SDK does not end the moment automatically.

In either platform, you can end the startup moment when your application mounts.

<Tabs groupId="platform" queryString="platform">
<TabItem value="ios" label="iOS">

```javascript
import {endAppStartup} from 'react-native-embrace';

export default class App extends Component {
  componentDidMount() {
    // Add this command at the end of componentDidMount
    endAppStartup();
  }
}
```

</TabItem>
<TabItem value="hooks" label="Hooks">

```javascript
import React, {useEffect, useState} from 'react'
import {endAppStartup} from 'react-native-embrace';

const App = ()=> {

  useEffect(()=>{
    endAppStartup();
  },[])

 return ...
}
export default App
```
:::info

As useEffect does not block the render thread, unlike componentDidMount, it might be necessary to add a variable such as isReady to wait until all your background process are finished and the user is able to interact with the application.

:::
</TabItem>
</Tabs>


End the startup moment as soon as your users are able to interact with the application. 

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
