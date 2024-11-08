---
title: Configuration File
description: Configuration file for the Android Embrace SDK
sidebar_position: 11
---

# Android Configuration File

Certain SDK configs are only settable in a custom `embrace-config.json` file.
This file should be located in app/src/main.
The following is an example `embrace-config.json` file.
Explanations for each of the fields are provided below.

```json
{
  "app_id": "NNNNN",
  "api_token": "0123456789abcdef0123456789abcdef",
  "ndk_enabled": true,
  "sdk_config": {
    "automatic_data_capture": {
      "memory_info": true,
      "power_save_mode_info": true,
      "network_connectivity_info": true,
      "anr_info": true
    },
    "taps": {
      "capture_coordinates": true
    },
    "view_config": {
      "enable_automatic_activity_capture": false
    },
    "webview": {
      "capture_query_params": false,
      "enable": true
    },
    "crash_handler": {
      "enabled": true
    },
    "compose": {
      "capture_compose_onclick": true
    },
    "capture_fcm_pii_data": true,
    "networking": {
      "default_capture_limit": 0,
      "domains": [
        {
          "domain_name": "example.com",
          "domain_limit": 0
        }
      ],
      "capture_request_content_length": false,
      "disabled_url_patterns": ["example.com"],
      "enable_native_monitoring": false,
      "enable_network_span_forwarding": false
    },
    "capture_public_key": "ABCDEFGH",
    "sensitive_keys_denylist": ["secret", "password"],
    "anr": {
      "capture_unity_thread": false
    },
    "app": {
      "report_disk_usage": false
    },
    "background_activity": {
      "capture_enabled": true
    },
    "base_urls": {
      "config": "ABCDEFGH",
      "data": "ABCDEFGH"
    },
    "session": {
      "components": ["ABCDEFGHIJKLMNOPQRSTUV"],
      "send_full_for": ["ABCDEFGHIJKLMNOPQRST"]
    },
    "sig_handler_detection": false,
    "app_exit_info": {
      "aei_enabled": true
    },
    "app_framework": "native"
  },
  "unity": {
    "symbols_archive_name": "ABCDEFG"
  }
}
```

#### app_id *string, required*

Your 5 character app ID.

#### api_token *string, required*

Your API 32-hexdigit token.

#### ndk_enabled *bool*

Enables NDK crash capture. Defaults to `false`.

#### automatic_data_capture - memory_info *bool*

Enables memory warning capture. Defaults to `true`.

#### automatic_data_capture - power_save_mode_info *bool*

Enables power save mode capture. Defaults to `true`.

#### automatic_data_capture - network_connectivity_info *bool*

Enables network connectivity capture. Defaults to `true`.

#### automatic_data_capture - anr_info *bool*

Enables ANR capture. Defaults to `true`.

#### taps - capture_coordinates *bool*

Set to false to disable capturing tap coordinates. Defaults to `true`.

#### view_config - enable_automatic_activity_capture *bool*

Enables capturing activity lifecycle changes in breadcrumbs. Defaults to `true`.

#### webview - capture_query_params *bool*

Set to false to disable capturing of web view query parameters. Defaults to `true`.

#### webview - enable *bool*

Set to false to disable capturing of web views. Defaults to `true`.

#### crash_handler - enabled *bool*

Set to false to prevent the SDK from connecting to the uncaught exception handler. Defaults to `true`.

#### compose - capture_compose_onclick *bool*

Enables capture of Jetpack Compose click events. Defaults to `false`.

#### capture_fcm_pii_data *bool*

Enables PII data within FCM capture. Defaults to `false`.

#### networking - default_capture_limit *integer*

Default capture limit for specified domains. Defaults to `1000`.

#### networking - domains *object array*

List of domain names and their respective limits.

#### networking - domain_name *string*

Domain URL.

#### networking - domain_limit *integer*

Limit for the number of requests to be tracked.

#### networking - capture_request_content_length *bool*

Disable capture of network length which can interfere with certain streaming network requests. Defaults to `true`.

#### networking - disabled_url_patterns *string array*

Specify one or more regular expressions to exclude network request with URLs matching one of the regular expressions from being captured.
```
Example: 
"disabled_url_patterns": [".*"], // Will disable network calls for all URLs
```

#### networking - enable_native_monitoring *bool*

Enable capture of network requests made using the native Java network API. Defaults to `true`.

#### networking - enable_network_span_forwarding *bool*

Enables network span forwarding. Defaults to `false`.

#### capture_public_key *string*

Declares the key that should be used to capture network request bodies, if any.

#### sensitive_keys_denylist *string array*

List of keys that will be redacted from any key-value pair sent by the SDK, such as event attributes, span attributes, log attributes, and session properties. Values for keys present in this list will be replaced by a `<redacted>` string
```
Example: 
"sensitive_keys_denylist": ["secret"] // Will change to <redacted> any value tied to a "secret" key
```

#### anr - capture_unity_thread *bool*

Enables Unity ANR capture. Defaults to `false`.

#### app - report_disk_usage *bool*

The SDK collects the disk usage for the app. Defaults to `true`.

#### capture_enabled *bool*

Enables background activity capture. Defaults to `false`.

#### base_urls - config *string*

Base config URL for the SDK.

#### base_urls - data *string*

Base data URL for the SDK.

#### session - components *string array*

Allowlist of session components that should be included in the session payload. The presence of this property denotes that the gating feature is enabled.

#### session - send_full_for *string array*

List of events allowed to send a full session payload if the gating feature is enabled.

#### sig_handler_detection *bool*

Enables 3rd party signal handler detection. Defaults to `true`.

#### app_exit_info - aei_enabled *bool*

Enables Application Exit Info capture. Defaults to `true`.

#### app_framework *string*

Project's app framework, one of react\_native, unity, flutter or native.

#### unity - symbols_archive_name *string*

Custom file name for unity symbols.

## Custom Settings for Build Types, Flavors, and Variants

It is possible to specify build type-, flavor-, and [variant](https://developer.android.com/studio/build/build-variants) specific configurations that take precedence of the default configuration located at `app/src/main/embrace-config.json`. No merging of configuration is done between, say, a build-type configuration and the default configuration. The entire configuration must be specified in each configuration file.

The order of evaluation is as follows. The first option that is found will be used

* Variant -- `app/src/<variant>/embrace-config.json`
* Flavor -- `app/src/<flavor>/embrace-config.json`
* Build type -- `app/src/<build type>/embrace-config.json`
* Default -- `app/src/main/embrace-config.json`

Note that if you have a project without any flavors configured, then your variant and build type names will be the same.

Let's consider a project with the following structure:

* Two flavors -- `paid` and `free`
* Two build types -- `debug` and `release`

and the following configuration files

* Variant file located at `app/src/paidRelease/embrace-config.json`
* Flavor file location at `app/src/paid/embrace-config.json`
* Build type file at `app/src/release/embrace-config.json`
* Default at `app/src/main/embrace-config.json`

| Variant     | Config Used                               | Reason                                                                                          |
|-------------|-------------------------------------------|-------------------------------------------------------------------------------------------------|
| paidRelease | `app/src/paidRelease/embrace-config.json` | Variant config exists                                                                           |
| paidDebug   | `app/src/paid/embrace-config.json`        | No variant config exists, but there is a matching flavor config                                 |
| freeRelease | `app/src/release/embrace-config.json`     | No matching variant or flavor config exists, but there is a matching build type config          |
| freeDebug   | `app/src/main/embrace-config.json`        | No matching variant, flavor, or build type config exists, so we fall back on the default config |

*Note that this is an artificially-complicated example to illustrate what is possible. Most likely your configuration will be much simpler.*
