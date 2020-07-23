---
title: "Session Reporting"
description: Upload session reports from your React Native application using the Embrace SDK
weight: 5
---

# Session Reporting

Now that you’ve added the Embrace SDK to your project and can login to the Embrace dashboard, you’re ready to create your first session.
Here are the steps you’ll be taking to create your first session.

1. [Import Embrace]({{< relref "/react-native/session-reporting#import-embrace" >}})
1. [Add a start call to the Embrace SDK]({{< relref "/react-native/session-reporting#add-the-start-call" >}})
1. [End the Startup Moment]({{< relref "/react-native/session-reporting#end-the-startup-moment" >}})
1. [Build and run the application]({{< relref "/react-native/session-reporting#build-and-run-the-application" >}})
1. [Trigger a session upload]({{< relref "/react-native/session-reporting#trigger-a-session-upload" >}})

## Import Embrace 

Start by importing the Embrace native SDK in the file that applies for each platform.

{{< tabs "reactNativeImportEmbrace" >}}

{{< tab "iOS" >}}

Open the `AppDelegate.m` file (usually located at `<project root>/ios/<MyApp>/AppDelegate.m`) and import Embrace.
```objective-c
#import <Embrace/Embrace.h>
```

{{< /tab >}}

{{< tab "Android" >}}

Open the `MainApplication.java` file (usually located at `<project root>/android/app/src/main/java/com/<MyApp>/MainApplication.java`) and import Embrace.

```java
import io.embrace.android.embracesdk.Embrace;
```

{{< /tab >}}


{{< /tabs >}}

{{< hint info >}}

If you used the setup script mentioned on the [Adding the Embrace SDK]({{< relref "/react-native/add-embrace-sdk" >}}) page, this change has already been made for you.

{{< /hint >}}

## Add the Start Call

After importing Embrace, you'll update the same files that you edited in the previous step make a call to the Embrace SDK to start capturing data.

{{< tabs "reactNativeStartEmbrace" >}}

{{< tab "iOS" >}}

```objective-c
@implementation AppDelegate
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *) launchOptions
{
    // Replace with your APP_ID, which is a 5-character value, e.g. "aBc45"
    [[Embrace sharedInstance] startWithKey:@"APP_ID" launchOptions: launchOptions framework:EMBAppFrameworkReactNative];
    return YES;
}
```

{{< /tab >}}

{{< tab "Android" >}}

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

{{< /tab >}}

{{< /tabs >}}

## End the Startup Moment

Embrace automatically starts the **startup** moment when your application launches.
You'll learn more about moments in [Performance Monitoring]({{< relref "/react-native/performance-monitoring" >}}) guide.
For now, you can think of the startup moment as a timer that measures how long it took your application to launch.
Although in both Android and iOS the moment is started automatically, ending it is platform specific.

For Android, the SDK will end the moment automatically.
To end the startup moment when you React component mounts, see the [Android guide]({{< relref "/android/integration/session-reporting#end-the-startup-moment" >}}) to prevent the moment from ending automatically.

The iOS SDK does not end the moment automatically.

In either platform, you can end the startup moment when your application mounts.

```javascript
import {endAppStartup} from 'react-native-embrace';

export default class App extends Component {
  componentDidMount() {
    endAppStartup();
  }
}
```

End the startup moment as soon as your users are able to interact with the application. 

## Build and Run the Application

Now you're ready to build and run the application.
Launch the application how you usually would during development.

{{< hint info >}}

If you encounter any errors, please get in touch on Slack and we can assist you.

{{< /hint >}}

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

{{< button relref="/react-native/crash-reporting" >}}Upload Crash Report{{< /button >}}
