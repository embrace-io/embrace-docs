---
title: Build Options
description: Build Options for the Embrace Unity SDK
sidebar_position: 6
---

# Build Options

*If you're upgrading from `v1.5.10` or earlier, please note that configuration data will no longer be embedded in our SDK package directory, and instead relocated to your project's Assets folder under `Assets/Embrace`.  Any previously defined configurations will be automatically converted at installation time to the updated format described in this document.*

## SDK Configuration Options
The behavior of the Embrace Unity SDK can be customized through the same list of configuration options as the Android and iOS SDKs.

Configuration options can be accessed in the **Configurations** tab of the **Settings** window. This window can be opened through the top-level menu **Tools > Embrace > Settings** or by clicking on the **Customize SDK Configuration** button from the **Getting Started** window.

<img src={require('@site/static/images/unity-config-windows.png').default} />

## Configuring Environments

Some applications have complex build pipelines.  For example, it's common practice for a development team to work in a "Dev" environment, then push their changes to a "Staging" when features are complete and ready to be tested, and finally released to a "Production" upon final approval. In such cases it may be beneficial define different configuration options for each environment.  The Embrace SDK supports this this type of workflow through the **Environments** list available in the **Settings** window.

<img src={require('@site/static/images/unity-environments-configuration.png').default} />

Using this list you can easily add, rename, or remove environments as needed.  Each environment will create an Android and iOS configuration file stored in the Embrace data directory.  

You can select and configure each environment by clicking on the **"="** icon to the left of each list item in the **Settings** window, or by selecting an environment from the **Getting Started** window.

<img src={require('@site/static/images/unity-environments-select.png').default} />

*NOTE: Most of the time users will not see the creation of configuration data when the **Environments** list is edited.  However, if you happen to peek in the **Configurations** folder, you'll notice that upon defining an environment configuration objects are created with a GUID-based name.  They will get automatically renamed to match user input once the **Update Environments** is pressed, or if the **Settings** window loses focus.  See the reference images above for an example.*

## Specifying Environments At Build Time

The Embrace SDK also supports specifying a configuration environment at build-time through the use of environment variables defined at the OS level. This feature can enable a CI/CD pipeline to define which environment to build with. We support the follwing definitions:

```EMBRACE_ENVIRONMENTS_INDEX```
* Define this variable with the index number of an existing Embrace configuration environment.

:::warning
Out-of-range indices will result in build failure.
:::

```EMBRACE_ENVIRONMENTS_NAME```
* Define this variable with the name of an existing configuration environment (e.g. "Dev", "Staging", or "Prod");

:::warning
  We only support the use of a single environment variable to specify an Embrace configuration. Please be aware that defining both variables at build-time will result in a failed build.
:::

For example, let's assume the following environment configurations are defined ("Dev", "Staging", and "Prod"), and the CI/CD build-time target environment should be "Staging".

<img src={require('@site/static/images/unity-environments-closeup.png').default} />

If you'd like to specify "Staging" via it's index, you would define the following:

**macOS/Linux:**
```$ export EMBRACE_ENVIRONMENTS_INDEX=1```

**Windows:**
```C:\> SET EMBRACE_ENVIRONMENTS_INDEX=1```

Alternatively, to specify by the name "Staging":

**macOS/Linux:**
```$ export EMBRACE_ENVIRONMENTS_NAME=Staging```

**Windows:**
```C:\> SET EMBRACE_ENVIRONMENTS_NAME=Staging```

## Configuration Output

Users will notice that both default, and environment-defined configurations already have some fields defined upon creation.  These fields correspond to the defaults specified for [Android](/android/features/configuration-file/) and [iOS](/ios/features/configuration-file/). At build time, configuration files are loaded and scanned for **non-default** settings, which are then output to an override configuration file for their specific platforms.

<img src={require('@site/static/images/unity-configuration-defaults.png').default} />

For example, in the `sdk_config.session` sub-element of the Android configuration, if the `async_end` flag is set to `true` and `max_session_seconds` is set to `120` the output `embrace-config.json` file will only feature those fields as overrides since they are overriding default settings. Likewise, in the iOS configuration the `CRASH_REPORT_ENABLED` `ENABLE_AUTOMATIC_VIEW_CAPTURE` and `STARTUP_MOMENT_SCREENSHOT_ENABLED` fields were modified with non-default values, and are therefore the only settings included in the `Embrace-Info.plist` output.

*NOTE: The `app_id` and `api_token` fields are always included.*

<img src={require('@site/static/images/unity-config-overrides.png').default} />

## Data Directory

The Unity Embrace SDK will store configuration data in the `Assets/Embrace` directory of your project.  This directory can be customized in the **Settings** window under the **General** tab.  Specify a new directory in the **Embrace Data Directory** field.  Note that this path will remain relative to your project's `Assets` folder. This is a necessary constraint since we depend on the Unity's `AssetDatabase` utility to manage user-generated configuration files.

<img src={require('@site/static/images/unity-embrace-data-directory.png').default} />
