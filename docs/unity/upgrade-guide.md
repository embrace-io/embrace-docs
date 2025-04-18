# Upgrade Guide

# Upgrading from 1.x to 2.x

:::info Summary
- On iOS, Embrace Unity SDK requires additional initialization step via code.
- Moments have been replaced by Traces
- Some deprecated features have been removed
- Remove deprecated properties from Gradle file
- Remove scoped registry
- Some features still have yet to be migrated
:::

## iOS SDK Code Initialization

The Embrace Unity SDK internally depends on the Embrace Apple SDK. As a result, from 6.0.0 onwards the SDK no longer uses a .plist file to hold Embrace-specific configuration. 

You should continue to configure the Embrace Unity SDK on iOS the same as before, but now requiring that you pass the `App Id` via `EmbraceStartupArgs` when calling `StartSDK`

```cs
// Old 1.x Method
Embrace.Instance.StartSDK();

// New 2.x Method
EmbraceStartupArgs args = new EmbraceStartupArgs("AppID");
Embrace.Instance.StartSDK(args);
```

The Embrace Apple SDK has additional configuration options available; these are not yet configurable in the Embrace Unity SDK. In the future these will become available via `EmbraceStartupArgs`

## Moments have been replaced by Traces

[Moments](/unity/features/moments.md) are not present in Unity 2.x onwards. We made this decision as part of our migration to build on top of OpenTelemetry APIs and to standardize the telemetry coming from our SDKs.

Luckily, [Traces](/unity/features/traces.md) serve the same purposes as Moments, with greatly enhanced capabilities. Built on [OTel Spans](https://opentelemetry.io/docs/concepts/signals/traces/), Traces capture end-to-end journeys made of multiple spans. Traces can contain many spans as "children", as well as attributes and events that offer flexibility on the client and numerous aggregation options on the backend. This instrumentation allows you trace an entire process by breaking it down into smaller units of work.

A span is simply an operation occurring over a period of time. Using spans, you can track how long operations within the app take, and more. Note that, in building on existing OTel APIs, the Embrace Unity SDK does not have instrumentation for an object called a "trace". Instead, a trace is the root span for a given workflow.

For usage, please refer to our documentation on [Traces](/unity/features/traces.md).

## Some deprecated features have been removed

- Embrace Android Bug Shake API removed
- `logUnhandledUnityException`
    - Use `LogUnhandledUnityException` instead
- `LogMessage` with the `allowScreenshot` argument
    - Remove the `allowScreenshot` bool from all `LogMessage` calls
- `IMoments` API removed
- `LogNetworkRequest` and `RecordNetworkRequest` removed
    - Use `RecordCompleteNetworkRequest` and `RecordIncompleteNetworkRequest` instead
- `SetUserPersona` removed
    - Use `AddUserPersona` instead

## Remove deprecated properties from Gradle file

Please refer to the [list](/android/upgrading/#remove-deprecated-properties-from-your-buildgradle) on the Embrace Android SDK Upgrade Guide for now deprecated `build.gradle` properties.

## AGP Version dependency has been bumped

Unity has updated the internal android build tools, Gradle plugin, and Android Gradle plugin. We target those new values as our minimums on the Embrace Android SDK, and therefore also the Embrace Unity SDK on Android. For further information, please look at Unity's documentation [here](https://docs.unity3d.com/2021.3/Documentation/Manual/android-gradle-overview.html). Specific patch versions of Unity with this support differ by major Unity version; make sure to double check your version of Unity against the correct documentation.

Please note that in upgrading, you may have to update values in the generated template files we require as they may still point to the older values. Please refer to the link to Unity's documentation above regarding supported Android Gradle versions for what these should be.

## Swift Library Workaround

Currently the latest version of Xcode and Unity's iOS build pipeline have an issue where including a Swift library (such as the Embrace Apple SDK) does not result in Xcode invoking its linker toolchain correctly. This can block builds and will generally involve messages mentioning symbols such as `swift_FORCE_LOAD_$_swiftCompatibility`. The issue is rather recent, and listed [here](https://forums.developer.apple.com/forums/thread/762854).

The easiest solution to this is to add a Dummy Swift file in the exported Xcode project out of Unity by right clicking the `Unity-iPhone` xcode project in the Project Navigator and selecting the `New File from Template` option. When doing this make sure to add the Swift file to the UnityFramework in Xcode. Make sure to add the file to BOTH the game target AND the UnityFramework target. Then, make sure to create the bridging heading. There's no need to add any code. The sole purpose of the file is to provide Xcode the necessary hints so that it invokes its toolchain correctly.

## Remove scoped registry

We no longer recommend using the scoped registry as a way to install the Embrace Unity SDK, due to issues with file permissions. If the Embrace scoped registry was previously added to your project during installation of the Embrace Unity SDK, you can remove it by following these steps.

First, remove the Embrace Unity SDK from your project:

1. Open the Package Manager
2. Find the `Embrace SDK` entry in the list
3. Click the `Remove` button on the right

<img src={require('@site/static/images/unity-package-manager.png').default} />

Then, remove the Embrace scoped registry:

1. Open Project Settings
2. Go to the Package Manager tab
3. Select the `io.embrace.sdk` entry in the Scoped Registries list
4. Click the `-` button to remove the entry

<img src={require('@site/static/images/unity-package-manager-settings.png').default} />

After this is complete, you can re-install the [Embrace SDK from the unitypackage](/unity/integration/session-reporting/).

## Some features still have yet to be migrated

- Replacement for `EndAppStartup` planned for both Embrace Android and Embrace Apple SDKs
- Please refer to the Embrace Apple SDK [Upgrade Guide](/ios/open-source/upgrade-guide/) for as of yet unsupported features on iOS

## Potential Gradle Issues
Unity SDK 2.x requires a later version of Gradle for Android Builds. If you try to build but are getting Gradle errors it is recommended you update to the latest LTS version of your current Unity version (for example Unity 2021.3.37f to Unity 2021.3.48f). A later version of Unity should include the latest gradle tools. If you are unable to update Unity versions you will need to download Gradle and setup your Unity editor to point to it using Settings > External Tools.
