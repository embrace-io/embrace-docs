# Upgrade guide

# Upgrading from 2.0.0 to 3.0.0

Replace the contents of your iOS `AppDelegate` with the [new approach](/flutter/integration/add-embrace-sdk/#ios-setup) of initializing the Embrace SDK. If you have custom configuration or have written Swift/Obj-C code that invokes Embrace, please also follow the [iOS upgrade guide](/ios/open-source/upgrade-guide/).

`Embrace.instance.startMoment`, `Embrace.instance.endMoment`, and `Embrace.instance.endAppStartup` are all removed. Please use the [Tracing API instead](/flutter/features/tracing) which provides superior insights into your application's performance.

`Embrace.instance.getSessionProperties` is removed.

# Upgrading from 1.5.0 to 2.0.0

The methods marked as deprecated in 1.5.0 have been removed from this release.

Please make sure not to have a hardcoded version of the Android SDK in the build.gradle file of your Android project. The correct way to include the Embrace Android SDK is using the `emb_android_sdk` like this:

```
buildscript {

    dependencies {
        classpath "io.embrace:embrace-swazzler:${findProject(':embrace_android').properties['emb_android_sdk']}"
    }
}
```

Please refer to the [Android setup guide](/flutter/integration/add-embrace-sdk/#android-setup) for further information.

# Upgrading from 1.4.0 to 1.5.0

Version 1.5.0 of the Embrace Flutter SDK renames some functions. This has been done to reduce
confusion & increase consistency across our SDKs.

Functions that have been marked as deprecated will still work as before, but will be removed in
the next major version release. Please upgrade when convenient, and get in touch if you have a
use-case that isn’t supported by the new API.

| Old API                              | New API                                 | Comments                         |
|--------------------------------------|-----------------------------------------|----------------------------------|
| `Embrace.instance.setUserPersona  `  | `Embrace.instance.addUserPersona`       | Renamed function for consistency |
| `Embrace.instance.endStartupMoment`  | `Embrace.instance.endAppStartup`        | Renamed function for consistency |
| `Embrace.instance.logBreadcrumb`     | `Embrace.instance.addBreadcrumb`        | Renamed function for consistency |
| `Embrace.instance.logNetworkRequest` | `Embrace.instance.recordNetworkRequest` | Renamed function for consistency |
