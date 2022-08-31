---
title: Build Options
description: Build Options for the Embrace Unity SDK
weight: 4
aliases:
  - /Unity/build-options/
---

# Build Options

*If you upgrading from `v1.5.10` or earlier, please note that configuration data will no longer be embedded in our SDK package directory, and instead relocated to your project's Assets folder under `Assets/Embrace`.  Any previously defined configurations will be automatically converted at installation time to the updated format described in this document.*

## SDK Configuration Options
The Embrace Unity SDK enables users to customize the behavior of the SDK through a complete list of configuration options.  These options are the same ones available to consumers of the native Android and iOS SDKs. 

Configuration options can be accessed in the **Configurations** tab of the **Settings** window. This window can be displayed through the top-level menu **Tools > Embrace > Settings** or by clicking on the **Customize SDK Configuration** button from the **Getting Started** window.
{{< image src="/docs/images/unity-config-windows.png" alt="Image showing Embrace windows" width="1208" height="702" >}}

For details about what each option does, please consult the documenation for [Android]({{<relref "/android/features/configuration-file.md">}} "Android") or [iOS]({{<relref "/ios/features/configuration-file.md">}}).

## Configuring Environments
Some applications have complex build pipelines.  For example, it's common practice for a development team to work in a "Dev" environment, then push their changes to a "Staing" when features are complete and ready to be tested, and finally released to a "Production" upon final approval. In such cases it may be beneficial define different configuration options for each environment.  The Embrace SDK supports this this type of orkflow through the **Environments** list available in the **Settings** window.
{{< image src="/docs/images/unity-environments-configuration.png" alt="Image showing Embrace environmnets configuration" width="1089" height="619" >}}

Using this list you can easily add, rename, or remove environments as needed.  Each environment will create an Android and iOS configuration file stored in the Embrace data directory.  

You can select and configre each environment by clicking on the **"="** icon to the left of each list item in the **Settings** window, or by selecting an environment from the **Getting Started** window.
{{< image src="/docs/images/unity-environments-select.png" alt="Image showing Embrace environmnets configuration" width="1330" height="492" >}}

*NOTE: Most of the time users will not see the creation of configuration data when the **Environments** list is edited.  However, if you happen to peek in the **Configurations** folder, you'll notice that upon defining an environment configuration objects are created with a GUID-based name.  They will get automatically renamed to match user input once the **Update Environments** is pressed, or if the **Settings** window loses focus.  See the reference images above for an example.*

## Configuration Output
Users will notice that both default, and environment-defined configurations already have some fields defined upon creation.  These fields correspond to the defaults specified for [Android]({{<relref "/android/features/configuration-file.md">}} "Android") and [iOS]({{<relref "/ios/features/configuration-file.md">}}).  At build time, configuration files are loaded and scanned for **non-default** settings, which are then output to an override configuration file for their specific platforms.
{{< image src="/docs/images/unity-configuration-defaults.png" alt="Image showing configuration defaults" width="1330" height="681" >}}

For example, in the `sdk_config.session` sub-element of the Android configuration, if the `async_end` flag is set to `true` and `max_session_seconds` is set to `120` the output `embrace-config.json` file will only feature those fields as overrides since they are overriding default settings. Likewise, in the iOS configuration the `CRASH_REPORT_ENABLED` `ENABLE_AUTOMATIC_VIEW_CAPTURE` and `STARTUP_MOMENT_SCREENSHOT_ENABLED` fields were modified with non-default values, and are therefore the only settings included in the `Embrace-Info.plist` output.

*NOTE: The `app_id` and `api_token` fields are always included.*
{{< image src="/docs/images/unity-config-overrides.png" alt="Image showing configuration defaults" width="1116" height="206" >}}

## Data Directory
The Unity Embrace SDK will store configuration data in the `Assets/Embrace` directory of your project.  This directory can be customized in the **Settings** window under the **General** tab.  Specify a new directory in the **Embrace Data Directory** field.  Note that this path will remain relative to your project's `Assets` folder. This is a necessary constraint since we depend on the Unity's `AssetDatabase` utility to manage user-generated configuration files.
{{< image src="/docs/images/unity-embrace-data-directory.png" alt="Image showing configuration defaults" width="701" height="243" >}}
