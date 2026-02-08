---
title: Upgrade guide
sidebar_position: 6
---

## Upgrade from 3.x to 4.x

The Android SDK has been updated to the latest major version. These changes affect all Flutter users:

1. In your `Application` subclass, replace `Embrace.getInstance().start(this, Embrace.AppFramework.FLUTTER)` with `Embrace.getInstance().start(this)`.
2. In your `embrace-config.json` file, add the following:

```json
    "sdk_config": {
        "app_framework": "flutter"
    }
```

If you've written additional Android code as part of your integration, you may need to perform additional migrations. See the [Android](https://embrace.io/docs/android/upgrading/) upgrade guide for more information.

## Upgrade from 2.0.0 to 3.0.0

Replace the contents of your iOS `AppDelegate` with the [new approach](/flutter/integration/#ios-setup) for initializing the Embrace SDK. If you have custom configuration or have written Swift/Obj-C code that invokes Embrace, also follow the [iOS upgrade guide](/ios/6x/getting-started/migration-guide.md).

`Embrace.instance.startMoment`, `Embrace.instance.endMoment`, and `Embrace.instance.endAppStartup` are all removed. Use the [Traces API instead](/flutter/features/traces), which provides superior insights into your application's performance.

`Embrace.instance.getSessionProperties` is removed.

## Upgrade from 1.5.0 to 2.0.0

The methods marked as deprecated in 1.5.0 have been removed from this release.

Don't hardcode the Android SDK version in the `build.gradle` file of your Android project. The correct way to include the Embrace Android SDK is using `emb_android_sdk` like this:

```text
buildscript {
    dependencies {
        classpath "io.embrace:embrace-swazzler:${findProject(':embrace_android').properties['emb_android_sdk']}"
    }
}
```

See the [Android setup guide](/flutter/integration/#android-setup) for more information.

## Upgrade from 1.4.0 to 1.5.0

Version 1.5.0 of the Embrace Flutter SDK renames some functions to reduce confusion and increase consistency across our SDKs.

Functions marked as deprecated still work as before, but will be removed in the next major version release. Upgrade when convenient, and get in touch if you have a use case that isn't supported by the new API.

| Old API                              | New API                                 | Comments                         |
|--------------------------------------|-----------------------------------------|----------------------------------|
| `Embrace.instance.setUserPersona`    | `Embrace.instance.addUserPersona`       | Renamed function for consistency |
| `Embrace.instance.endStartupMoment`  | `Embrace.instance.endAppStartup`        | Renamed function for consistency |
| `Embrace.instance.logBreadcrumb`     | `Embrace.instance.addBreadcrumb`        | Renamed function for consistency |
| `Embrace.instance.logNetworkRequest` | `Embrace.instance.recordNetworkRequest` | Renamed function for consistency |
