---
title: Crash Reporting
description: Configure crash reporting in your iOS 6.x app with Embrace
sidebar_position: 5
---

# Crash Reporting

Embrace is so much more than just a crash reporting service. Still, knowing when and how your application crashed is important. Embrace can either use its own internal crash reporting logic or work alongside an existing solution like Crashlytics.

## Setting up the Crash Reporter

The first step in initializing crash reporting is configuring which mode you want Embrace to operate in. Embrace can be your primary crash reporter, or you can add Firebase Crashlytics as the crash reporter to send crashes to both Embrace and Firebase.

### Default Crash Reporting

By default, Embrace includes its own crash reporter. No additional configuration is needed:

```swift
try Embrace
    .setup(
        options: Embrace.Options(
            appId: "YOUR_APP_ID"
            // Embrace's crash reporter is enabled by default
        )
    )
    .start()
```

### Using Crashlytics with Embrace

If you choose to use Crashlytics, Embrace will mirror reports sent to Crashlytics so you will still have that data available in the Embrace dashboard.

First, add the Crashlytics support module:

#### Swift Package Manager

Import `EmbraceCrashlyticsSupport` when using Swift Package Manager

#### CocoaPods

Add `pod 'EmbraceIO/EmbraceCrashlyticsSupport'` to your Podfile

Then, configure the SDK to use Crashlytics:

```swift
import EmbraceCrashlyticsSupport
import EmbraceIO

try Embrace
    .setup(
        options: Embrace.Options(
            appId: "YOUR_APP_ID",
            crashReporter: CrashlyticsReporter()
        )
    )
    .start()
```

### Disabling Crash Reporting

If you wish not to use any crash reporting (including Embrace's crash reporting), you can disable it:

```swift
try Embrace
    .setup(
        options: Embrace.Options(
            appId: "YOUR_APP_ID",
            crashReporter: nil
        )
    )
    .start()
```

## Testing Crash Reporting

You can trigger a crash in your app organically, or Embrace provides a test crash function you can call from anywhere in your application.

:::danger Important
Obviously, this function will crash your app. Use it for testing purposes and be sure **not to include it in production code.**
:::

### Swift
```swift
Embrace.client?.crash()
```

### Objective-C
```objc
[[Embrace client] crash];
```

## Testing Best Practices

:::info Note on Debugging
It is important when testing crashes to not be connected to any debugger. Xcode is itself a debugger, as it can attach itself to a program and stop/start/pause/modify that program. This includes stepping through and around exceptions and signals.

When trying to test crashes, this functionality is always in the way. If you can, test on a device that is no longer plugged into your Mac, and launch the app by tapping the icon directly. On the Simulator, run the app once with Xcode, press stop, then tap the app icon in the Simulator directly to launch it without Xcode.
:::

### Upload Process

Embrace sessions only upload on subsequent launches after crashes have occurred. This means that after seeing the application crash, you must now launch the application again for that crashed session to upload to the Embrace servers.

Once uploaded you should notice that your session is marked with the "crashed" icon. Additionally your crash is visible in the crashes section of the dashboard.

## Understanding Crash Data

When a crash occurs, Embrace captures:

- **Stack trace** - The call stack at the time of the crash
- **Exception details** - Type and reason for the crash
- **Device information** - OS version, device model, available memory
- **Session context** - User actions leading up to the crash
- **Custom attributes** - Any custom data you've added to the session

## Advanced Configuration

### Custom Crash Attributes

You can add custom attributes that will be included with crash reports:

```swift
// Add custom attributes before a potential crash
Embrace.client?.metadata.customProperties["user_action"] = "checkout_attempt"
Embrace.client?.metadata.customProperties["cart_items"] = "3"
```

### Crash Callbacks

You can register callbacks to be notified when crashes occur:

```swift
// This is typically done during SDK setup
// Note: Callbacks should be lightweight as they run during crash handling
```

## Best Practices

- **Always upload dSYMs** - Ensure your crash reports are symbolicated by [uploading dSYM files](/ios/6x/getting-started/dsym-upload.md)
- **Add context** - Use [breadcrumbs](/ios/6x/manual-instrumentation/breadcrumbs.md) and custom attributes to provide context around crashes
- **Test thoroughly** - Test [crash reporting](/product/crashes/crash-reporting.md) in your development and staging environments
- **Monitor regularly** - Set up [alerts](/product/alerting.md) for new crash types or increased crash rates
- **Prioritize fixes** - Focus on crashes that affect the most users or critical user flows

## Troubleshooting

### Crashes Not Appearing

If crashes aren't appearing in the dashboard:

1. Verify the SDK is properly initialized
2. Ensure the app launches again after crashing (crashes upload on next launch)
3. Check that dSYM files are uploaded for proper symbolication
4. Verify your App ID is correct

### Symbolication Issues

If crash reports show unsymbolicated addresses:

1. Ensure dSYM files are uploaded - see [dSYM Upload Guide](/ios/6x/getting-started/dsym-upload.md)
2. Verify the dSYM files match the crashed build
3. Check that the build UUID matches between the crash and dSYM

## Next Steps

- Learn about [Error Handling](/ios/6x/manual-instrumentation/error-handling.md) for non-fatal errors
- Set up [Breadcrumbs](/ios/6x/manual-instrumentation/breadcrumbs.md) to add context to crash reports
- Configure [Custom Logging](/ios/6x/manual-instrumentation/custom-logging.md) for additional debugging information