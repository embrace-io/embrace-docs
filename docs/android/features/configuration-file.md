---
title: Configuration File
description: Configuration file for the Android Embrace SDK
sidebar_position: 11
---

# Android Configuration File

## SDK Config File

Certain SDK configs are only settable in a custom `embrace-config.json` file.
This file should be located in app/src/main.
The following is an example `embrace-config.json` file.
Explanations for each of the fields are provided below.

```json
{
  "app_id": "NNNNN",
  "api_token": "0123456789abcdef0123456789abcdef",
  "ndk_enabled": false,
  "sdk_config": {
    "capture_fcm_pii_data": false,
    "app": {
      "report_disk_usage": true,
    },
    "crash_handler": {
      "enabled": true
    },
    "networking": {
      "capture_request_content_length": true,
      "disabled_url_patterns": [],
      "enable_native_monitoring": true,
      "trace_id_header": "x-emb-trace-id"
    },
    "startup_moment": {
      "automatically_end": true
    },
    "taps": {
      "capture_coordinates": true
    },
    "webview": {
      "capture_query_params": true,
      "enable": true
    },
    "compose": {
      "capture_compose_onclick": true
    }
  }  
}
```

#### app_id *string, required*

Your 5 character app ID.

#### app_token *string, required*

Your API 32-hexdigit token.

#### ndk_enabled *bool*

Enables NDK crash capture. Defaults to `false`.

#### capture_fcm_pii_data *bool*

Capture data from inside the notifications

### app

#### report_disk_usage *bool*

The SDK collects the disk usage for the app. You can disable this if your app has a large number of local files to prevent excessive resource usage, especially on lower-end devices.
Defaults to `true`.

### crash_handler

#### enabled *bool*
Set to `false` to prevent the SDK from connecting to the uncaught exception handler. Defaults to `true`.

### networking

#### capture_request_content_length *bool*

Disable capture of network length which can interfere with certain streaming network requests. Defaults to `false`. For network body capture feature this should be set to `true`. 

#### disabled_url_patterns *string array*

Specify one or more regular expressions to exclude network request with URLs matching one of the regular expressions from being captured.
```
Example: 
"disabled_url_patterns": [".*"], // Will disable network calls for all URLs
```

#### enable_native_monitoring *bool*

Enable capture of network requests made using the native Java network API. Defaults to `true`.

#### trace_id_header *string*

Set the name of the header used for the trace ID. Defaults to `"x-emb-trace-id"`.

### startup_moment

#### automatically_end *bool*

Control whether the startup moment is automatically ended. Defaults to `true`.

### taps

#### capture_coordinates *bool*

Set to `false` to disable capturing tap coordinates. Defaults to `true`.

### webview

#### capture_query_params *bool*

Set to `false` to disable capturing of web view query parameters. Defaults to `true`. If `webview:enable` is set to 
`false`, this setting has no effect since all capture of web view information is disabled. 

#### enable *bool*
Set to `false` to disable capturing of web views. Defaults to `true`.

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
