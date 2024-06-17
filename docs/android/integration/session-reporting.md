---
title: Session Reporting
sidebar_position: 4
description: Upload session reports from your Android application using the Embrace SDK
---

# Session Reporting

Now that you've added the Embrace SDK to your project and can login to the Embrace dashboard, you're ready to create your first session.

Here are the steps you'll be taking to create your first session.

1. [**Import Embrace**](/android/integration/session-reporting#import-embrace)
1. [**Add a start call to the Embrace SDK**](/android/integration/session-reporting#add-the-start-call)
1. [**End the startup moment**](/android/integration/session-reporting#end-the-startup-moment)
1. [**Build and run the application**](/android/integration/session-reporting#build-and-run-the-application)
1. [**Trigger a session upload**](/android/integration/session-reporting#trigger-a-session-upload)

## Import Embrace

First, import Embrace in your `Application` subclass.

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

<Tabs groupId="android-language" queryString="android-language">
<TabItem value="kotlin" label="Kotlin">
```kotlin
import io.embrace.android.embracesdk.Embrace
```
</TabItem>
<TabItem value="java" label="Java">
```java
import io.embrace.android.embracesdk.Embrace;
```
</TabItem>
</Tabs>

## Add the Start Call

Next, initialize the Embrace SDK in the `onCreate` method of your `Application` subclass.

<Tabs groupId="android-language" queryString="android-language">
<TabItem value="kotlin" label="Kotlin">
```kotlin
class MyApplication : Application {
  override fun onCreate() {
      super.onCreate()
      Embrace.getInstance().start(this)
  }
}
```
</TabItem>
<TabItem value="java" label="Java">
```java
public final class MyApplication extends Application {
  @Override
  public void onCreate() {
      super.onCreate();
      Embrace.getInstance().start(this);
  }
}
```
</TabItem>
</Tabs>


## End the startup moment

The Embrace SDK automatically records a special "startup" moment that's used to track app launch performance.
The end of the startup moment is recorded when the `Activity.onResume()` method returns.
However, if `onResume()` is not a good indication of when the app launch has ended (apps that have a splash screen, for example),
you can use the `@StartupActivity` annotation to indicate that you don't want the startup moment to end when the `onResume` method returns.
Add the `@StartupActivity` annotation to any Activity class where this applies.

<Tabs groupId="android-language" queryString="android-language">
<TabItem value="kotlin" label="Kotlin">
```kotlin
@StartupActivity
class MainActivity : Activity
```
</TabItem>
<TabItem value="java" label="Java">
```java
@StartupActivity
public class MainActivity extends Activity {
}
```
</TabItem>
</Tabs>


Then, end the startup moment manually by making the following method call.

<Tabs groupId="android-language" queryString="android-language">
<TabItem value="kotlin" label="Kotlin">
```kotlin
Embrace.getInstance().endAppStartup()
```
</TabItem>
<TabItem value="java" label="Java">
```java
Embrace.getInstance().endAppStartup();
```
</TabItem>
</Tabs>


You should end the startup moment before the user has a chance to interact with the application.
Add this method call to every location where the startup moment can end. You can call this method as many times as you like.

```json
{
  "app_id": "xxxxx",
  "api_token": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
}
```

## Build and Run the Application

Now you're ready to build and run the application. Assuming the app launches correctly,
pay attention to the system logging and confirm Embrace prints its version number.

```
Embrace SDK started. API key: xxxxx Version: {{ embrace_sdk_version platform="android" }}
```

:::info
If you encounter any errors, please get in touch on Slack and we can assist you.
:::

## Trigger a Session Upload

You can trigger a session upload by sending your app to the background, and restarting it again. Refresh the dashboard in
your browser and you should now see that you've moved on to the next step.

:::warning Important
If you stop your application by either force killing it or using the Android Studio stop button, 
the Embrace SDK will not be able to upload the session that was just completed until you restart 
your application. During the next application launch the previous session will be immediately uploaded. 
:::

---

Congratulations! At this point you've completed a basic integration of Embrace.
Embrace is already collecting interesting data from your application. You can
see this data by browsing around the timeline page for the session you just captured.

Up next, you'll be learning about uploading crash reports.
