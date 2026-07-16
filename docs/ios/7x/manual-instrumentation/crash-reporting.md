---
title: Crash Reporting
description: Configure crash reporting in your Apple app with Embrace
sidebar_position: 5
---

## Crash Reporting

Knowing when and how your application crashed is important. Embrace can either use its own internal crash reporting logic or work alongside an existing solution like Crashlytics.

### Setting up the Crash Reporter

The first step in initializing crash reporting is configuring which mode you want Embrace to operate in. Embrace can be your primary crash reporter, or you can add Firebase Crashlytics as the crash reporter to send crashes to both Embrace and Firebase.

#### Default Crash Reporting

By default, Embrace includes its own crash reporter. No additional configuration is needed:

```swift
try EmbraceIO.start(
    options: EmbraceIO.Options.withAppId("YOUR_APP_ID")
        // Embrace's crash reporter is enabled by default
)
```

#### Using Crashlytics with Embrace

If you choose to use Crashlytics, Embrace will mirror reports sent to Crashlytics so you will have that data available in both the Embrace and Crashlytics dashboards.

:::warning Important Considerations
**We strongly recommend using Embrace's built-in crash reporter for complete crash data and session context.** However, if your team still decides to use Crashlytics, here are key limitations:

- Embrace session properties are not included in crash reports
- Embrace resources are not included in crash reports
- Last run state detection is not available
- Crash capture depends on Firebase Crashlytics network requests
- Some crashes may not be captured if Firebase Crashlytics fails

CrashlyticsReporter intercepts Firebase Crashlytics network requests and captures the crash data that Firebase collects. It does not have access to Embrace's session metadata.
:::

Crashlytics support is bundled into `EmbraceIO` — there is no separate module to add. Enable it by selecting the `.crashlytics` crash reporter when you start the SDK:

```swift
import EmbraceIO

try EmbraceIO.start(
    options: EmbraceIO.Options.withAppId("YOUR_APP_ID",
        crashReporter: .crashlytics
    )
)
```

### Choosing the Right Crash Reporter

Embrace offers two crash reporting options with different capabilities and data collection:

#### EmbraceCrashReporter (Recommended)

**Features:**

- Built on KSCrash for comprehensive crash detection
- Includes all Embrace session properties and resources in crash reports
- Supports last run state detection (crash vs. clean exit)
- Complete crash context with full stack traces and system information
- Works offline - crashes are captured locally and uploaded on next launch
- Configurable signal filtering (SIGTERM blocked by default)
- Optional MetricKit integration

**Best for:**

- New implementations
- Applications requiring complete session context in crash reports
- Offline-capable crash reporting

#### CrashlyticsReporter (Migration Tool)

**Features:**

- Intercepts Firebase Crashlytics network requests
- Captures crash data that Firebase Crashlytics collects
- Supports custom crash properties via `appendCrashInfo()`
- Automatically disables MetricKit reports to avoid conflicts

**Limitations:**

- Does not include Embrace session properties or resources
- Last run state always returns "unavailable"
- Depends on Firebase Crashlytics for crash detection
- Limited crash context compared to KSCrash
- Requires network connectivity for crash capture

**Best for:**

- Gradual migration from Firebase Crashlytics
- Teams that must maintain Firebase Crashlytics for other purposes

#### Data Comparison

| Feature                   | EmbraceCrashReporter          | CrashlyticsReporter         |
| ------------------------- | ----------------------------- | --------------------------- |
| **Session Properties**    | ✅ Included                   | ❌ Not included             |
| **Resources**             | ✅ Included                   | ❌ Not included             |
| **Custom Crash Info**     | ✅ Via `appendCrashInfo()`    | ✅ Via `appendCrashInfo()`  |
| **Last Run State**        | ✅ Crash/Clean Exit detection | ❌ Always unavailable       |
| **Full Stack Traces**     | ✅ Complete KSCrash data      | ⚠️ Limited to Firebase data |
| **Offline Support**       | ✅ Local crash capture        | ❌ Requires network         |
| **MetricKit Integration** | ✅ Configurable               | ❌ Disabled                 |

#### Disabling Crash Reporting

If you wish not to use the KSCrash-based crash reporter, you can disable it with `crashReporter: .none`:

:::info MetricKit also disabled
Setting `crashReporter: .none` disables both the KSCrash-based crash reporter and MetricKit crash capture services. The SDK uses the crash reporter reference to determine whether to register MetricKit services, so `.none` prevents all crash capture — including OS-level diagnostics from MetricKit.
:::

```swift
try EmbraceIO.start(
    options: EmbraceIO.Options.withAppId("YOUR_APP_ID",
        crashReporter: .none
    )
)
```

### Testing Crash Reporting

You can trigger a crash in your app organically, or Embrace provides a test crash function you can call from anywhere in your application.

:::danger Important
Obviously, this function will crash your app. Use it for testing purposes and be sure **not to include it in production code.**
:::

```swift
EmbraceCrashHelper.crash()
```

### Testing Best Practices

:::info Note on Debugging
It is important when testing crashes to not be connected to any debugger, which for most users would be Xcode.

When trying to test crashes, it is best to force-quit any existing app instance and then launch the app by tapping the icon directly. This guarantees that Xcode will not intercept the crash and that it will be captured by the Embrace SDK. On the Simulator, run the app once with Xcode, press stop, then tap the app icon in the Simulator directly to launch it without Xcode.
:::

#### Upload Process

Apple OS constraints prevents reliable delivery of crashes in the process that crash so the Embrace SDK will upload crashes and their associated sessions on the next launch after a crash. This means that after seeing the application crash, you must now launch the application again for the crash to upload to the Embrace servers.

Once uploaded you should notice that your session is marked with the "crashed" icon. Additionally your crash is visible in the crashes section of the dashboard.

### Understanding Crash Data

When a crash occurs, Embrace captures:

- **Stack trace** - The call stack at the time of the crash
- **Exception details** - Type and reason for the crash
- **Device information** - OS version, device model, available memory
- **Session context** - User actions leading up to the crash
- **Custom attributes** - Any custom data you've added to the session

### Advanced Configuration

#### Custom Crash Attributes

You can add custom data that will be included with crash reports using two different approaches:

##### Session Properties (EmbraceCrashReporter only)

Session properties are automatically included in crash reports when using EmbraceCrashReporter:

```swift
// Add session properties that will be included in crash reports
EmbraceIO.shared.setProperty(key: "user_tier", value: "premium", lifespan: .session)
EmbraceIO.shared.setProperty(key: "feature_flags", value: "checkout_v2", lifespan: .session)
EmbraceIO.shared.setProperty(key: "experiment_group", value: "control", lifespan: .session)
```

**Note:** Session properties are only included when using `EmbraceCrashReporter`. They are not available with `CrashlyticsReporter`.

##### Custom Crash Info (Both crash reporters)

Both crash reporters support adding custom key-value pairs directly to crash reports:

```swift
// Add custom crash info that will be included in the crash report
EmbraceIO.shared.appendCrashInfo(key: "user_action", value: "checkout_attempt")
EmbraceIO.shared.appendCrashInfo(key: "cart_items", value: "3")
EmbraceIO.shared.appendCrashInfo(key: "screen_name", value: "payment_form")
```

This method works with both `EmbraceCrashReporter` and `CrashlyticsReporter`.

#### Crash Callbacks

You can register callbacks to be notified when crashes occur:

```swift
// This is typically done during SDK setup
// Note: Callbacks should be lightweight as they run during crash handling
```

### Best Practices

- **Always upload dSYMs** - Ensure your crash reports are symbolicated by [uploading dSYM files](/ios/7x/getting-started/dsym-upload.md)
- **Add context** - Use [breadcrumbs](/ios/7x/manual-instrumentation/breadcrumbs.md) and custom attributes to provide context around crashes
- **Test thoroughly** - Test [crash reporting](/product/crashes/crash-reporting.md) in your development and staging environments
- **Monitor regularly** - Set up [alerts](/product/alerting.md) for new crash types or increased crash rates
- **Prioritize fixes** - Focus on crashes that affect the most users or critical user flows

### Troubleshooting

#### Crashes Not Appearing

If crashes aren't appearing in the dashboard:

1. Verify the SDK is properly initialized
2. Ensure the app launches again after crashing (crashes upload on next launch)
3. Check that dSYM files are uploaded for proper symbolication
4. Verify your App ID is correct

For CrashlyticsReporter specifically:

1. Ensure Firebase Crashlytics is properly configured and working
2. Verify Firebase Crashlytics network requests are being made
3. Check that Firebase Crashlytics is capturing the crash in Firebase Console

#### Session Properties Not Appearing

If session properties are missing from crash reports:

1. **Using CrashlyticsReporter**: Session properties are not supported. Use `appendCrashInfo()` instead or switch to `EmbraceCrashReporter`
2. **Using EmbraceCrashReporter**: Verify properties were added with `.session` lifespan before the crash occurred

#### CrashlyticsReporter Specific Issues

If using CrashlyticsReporter and experiencing issues:

1. **Crashes not captured**: Ensure Firebase Crashlytics is functioning properly - test crash reporting in Firebase Console
2. **Missing context**: CrashlyticsReporter only includes data that Firebase Crashlytics captures. Use `appendCrashInfo()` for custom data
3. **Network dependency**: CrashlyticsReporter requires network connectivity to capture crashes from Firebase requests
4. **Firebase SDK issues**: CrashlyticsReporter depends on Firebase Crashlytics SDK functionality, which Embrace cannot control

   :::info Firebase Dependency Considerations
   CrashlyticsReporter relies on Firebase Crashlytics SDK functionality. If Firebase has issues, bugs, or breaking changes, it may affect crash capture. For complete control over crash reporting, we recommend using EmbraceCrashReporter.
   :::

#### Symbolication Issues

If crash reports show unsymbolicated addresses:

1. Ensure dSYM files are uploaded - see [dSYM Upload Guide](/ios/7x/getting-started/dsym-upload.md)
2. Verify the dSYM files match the crashed build
3. Check that the build UUID matches between the crash and dSYM

### Next Steps

- Learn about [Error Handling](/ios/7x/manual-instrumentation/error-handling.md) for non-fatal errors
- Set up [Breadcrumbs](/ios/7x/manual-instrumentation/breadcrumbs.md) to add context to crash reports
- Configure [Custom Logging](/ios/7x/manual-instrumentation/custom-logging.md) for additional debugging information
