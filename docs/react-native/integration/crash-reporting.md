---
title: Crash Reporting
description: Upload crash reports for both native and JavaScript exceptions from your React Native application using the Embrace SDK
sidebar_position: 6
---

# Collect your first crash report 

If you've been following along, you should be setup to collect crashes, otherwise take a look at the previous pages
for [Uploading Symbol Files](/react-native/integration/upload-symbol-files) and [Session Reporting
](/react-native/integration/session-reporting).

### Triggering a Crash

Now we're ready to trigger a crash.
Either crash the app organically, or add the following code to make it crash.

```javascript
throw new Error('This is a crash');
```

Since React Native will generally prevent the app from crashing in dev builds for this test you should do a release
build and then run your application.

Remember that Embrace sessions only upload on subsequent launches.
This means that after seeing the application crash, you must now launch the application again for that crashed session
to upload to the Embrace servers.

Once uploaded you should notice that your session is marked with the "crashed" icon.
Your crash is also visible in the crashes section of the dashboard.

### Disabling the crash reporter on iOS

For iOS Embrace's internal crash reporter will be used by default. If you are using another crash reporter that you don't
want to interfere with you can disable this. If you used the automated installation script or followed the manual steps
for setting up the iOS SDK then you can modify the setup in `EmbraceInitializer.swift` to remove the crash reporter:
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

---

In the next guide, you'll learn how to add context to your sessions using Breadcrumb Logs.

