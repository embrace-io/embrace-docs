---
title: Configuration file
description: Configuration file for the Android Embrace SDK
sidebar_position: 11
---

## Android configuration file

Certain SDK configs are only settable in a custom `embrace-config.json` file.
This file should be located in `app/src/main`.
The following is an example `embrace-config.json` file.
Explanations for each of the fields follow below.

```json
{
  "app_id": "NNNNN",
  "api_token": "0123456789abcdef0123456789abcdef",
  "ndk_enabled": true,
  "sdk_config": {
    "app": {
      "report_disk_usage": true
    },
    "crash_handler": {
      "enabled": true
    },
    "automatic_data_capture": {
      "power_save_mode_info": true,
      "network_connectivity_info": true,
      "anr_info": true,
      "ui_load_tracing_disabled": false,
      "ui_load_tracing_selected_only": false
    },
    "taps": {
      "capture_coordinates": false
    },
    "view_config": {
      "enable_automatic_activity_capture": false
    },
    "webview": {
      "capture_query_params": false,
      "enable": true
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
      "enable_huc_lite_instrumentation": true,
      "enable_native_monitoring": false,
      "enable_network_span_forwarding": false,
      "enable_traceparent_injection": false,
      "traceparent_only_allow_domains": ["example.com"]
    },
    "capture_public_key": "ABCDEFGH",
    "sensitive_keys_denylist": ["secret", "password"],
    "anr": {
      "capture_unity_thread": false
    },
    "background_activity": {
      "capture_enabled": true
    },
    "base_urls": {
      "config": "ABCDEFGH",
      "data": "ABCDEFGH"
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

### `app_id` _string, required_

Your 5 character app ID.

#### `api_token` _string, required_

Your API 32-hexdigit token.

##### `ndk_enabled` _bool_

Enables NDK crash capture. Defaults to `true`.

##### `automatic_data_capture` - `power_save_mode_info` _bool_

Enables power save mode capture. Defaults to `true`.

##### `automatic_data_capture` - `network_connectivity_info` _bool_

Enables network connectivity capture. Defaults to `true`.

##### `automatic_data_capture` - `anr_info` _bool_

Enables ANR capture. Defaults to `true`.

##### `automatic_data_capture` - `ui_load_tracing_disabled` _bool_

Disables all Activity load instrumentation. Defaults to `false`.

##### `automatic_data_capture` - `ui_load_tracing_selected_only` _bool_

Disables Activity load instrumentation for Activities that are not explicitly annotated with @`LoadTracedActivity` or `@CustomLoadTracedActivity`. Defaults to `false`.

##### `taps` - `capture_coordinates` _bool_

Set to true to enable capturing tap coordinates. Defaults to `false`.

##### `view_config` - `enable_automatic_activity_capture` _bool_

Enables capturing activity lifecycle changes in breadcrumbs. Defaults to `true`.

##### `webview` - `capture_query_params` _bool_

Set to false to disable capturing of web view query parameters. Defaults to `true`.

##### `webview` - `enable` _bool_

Set to false to disable capturing of web views. Defaults to `true`.

##### `crash_handler` - `enabled` _bool_

Set to false to prevent the SDK from connecting to the uncaught exception handler. Defaults to `true`.

##### `compose` - `capture_compose_onclick` _bool_

Enables capture of Jetpack Compose click events. Defaults to `false`.

##### `capture_fcm_pii_data` _bool_

Enables PII data within FCM capture. Defaults to `false`.

##### `networking` - `default_capture_limit` _integer_

Default capture limit for specified domains. Defaults to `1000`.

##### `networking` - `domains` _object array_

List of domain names and their respective limits.

##### `networking` - `domain_name` _string_

Domain URL.

##### `networking` - `domain_limit` _integer_

Limit for the number of requests to be tracked.

##### `networking` - `disabled_url_patterns` _string array_

Specify one or more regular expressions to exclude network request with URLs matching one of the regular expressions from being captured.

Example:

```text
"disabled_url_patterns": [".*"], // Will disable network calls for all URLs
```

##### `networking` - `enable_huc_lite_instrumentation` _bool_

Enable basic instrumentation of HTTPS network requests made using the `HttpsURLConnection` API. Defaults to `true`.

##### `networking` - `enable_native_monitoring` _bool_

Enable detailed instrumentation of HTTP and HTTPS network requests made using the `HttpURLConnection` and `HttpsURLConnection` APIs. The module `embrace-android-instrumentation-huc` must be included in your app for this to work. Defaults to `false`.

##### `networking` - `capture_request_content_length` _bool_

Enable capture of network request body size for the instrumentation enabled by `enable_native_monitoring`, which may interfere with certain streaming network requests. Defaults to `false`.

##### `networking` - `enable_network_span_forwarding` _bool_

Enables network span forwarding. Defaults to `false`.

##### `networking` - `enable_traceparent_injection` _bool_

Enables injection of the `traceparent` header in a network request (if not already present) whose value is the W3C Traceparent representation of the span recorded to represent that network request. Defaults to `false`.

##### `networking` - `traceparent_only_allow_domains` _string array_

Specify an allowlist of exact domain hostnames (e.g. "api.example.com") or subdomain suffixes (e.g ".example.com") for which Network Span Forwarding and Traceparent Injection is applied. An empty list implies that these features are disabled for all hosts.

##### `capture_public_key` _string_

Declares the key that should be used to capture network request bodies, if any.

##### `sensitive_keys_denylist` _string array_

List of keys that will be redacted from any key-value pair sent by the SDK, such as event attributes, span attributes, log attributes, and session properties. Values for keys present in this list will be replaced by a `<redacted>` string

```text
Example:
"sensitive_keys_denylist": ["secret"] // Will change to <redacted> any value tied to a "secret" key
```

##### `anr` - `capture_unity_thread` _bool_

Enables Unity ANR capture. Defaults to `false`.

##### `app` - `report_disk_usage` _bool_

The SDK collects the disk usage for the app. Defaults to `true`.

##### `capture_enabled` _bool_

This value is a failsafe to enable or disable background activity capture. If the remote configuration is not set by Embrace's backend, this value will determine whether or not to enable background capture. Defaults to `false`.

##### `base_urls` - `config` _string_

Base config URL for the SDK.

##### `base_urls` - `data` _string_

Base data URL for the SDK.

##### `sig_handler_detection` _bool_

Enables 3rd party signal handler detection. When enabled, the SDK checks if its NDK signal handlers have been overwritten by other libraries and reinstalls them if needed. Defaults to `false`.

##### `app_exit_info` - `aei_enabled` _bool_

Enables Application Exit Info capture. Defaults to `true`.

##### `app_framework` _string_

Project's app framework, one of react_native, unity, flutter or native.

##### `unity` - `symbols_archive_name` _string_

Custom file name for unity symbols.

### Custom settings for build types, flavors, and variants

It is possible to specify build type-, flavor-, and [variant](https://developer.android.com/build/build-variants) specific configurations that take precedence over the default configuration located at `app/src/main/embrace-config.json`. No merging of configuration is done between, say, a build-type configuration and the default configuration. The entire configuration must be specified in each configuration file.

The order of evaluation is as follows. The first option that is found will be used

- Variant -- `app/src/<variant>/embrace-config.json`
- Flavor -- `app/src/<flavor>/embrace-config.json`
- Build type -- `app/src/<build type>/embrace-config.json`
- Default -- `app/src/main/embrace-config.json`

Note that if you have a project without any flavors configured, then your variant and build type names will be the same.

Let's consider a project with the following structure:

- Two flavors -- `paid` and `free`
- Two build types -- `debug` and `release`

and the following configuration files

- Variant file located at `app/src/paidRelease/embrace-config.json`
- Flavor file location at `app/src/paid/embrace-config.json`
- Build type file at `app/src/release/embrace-config.json`
- Default at `app/src/main/embrace-config.json`

| Variant     | Config Used                               | Reason                                                                                          |
| ----------- | ----------------------------------------- | ----------------------------------------------------------------------------------------------- |
| paidRelease | `app/src/paidRelease/embrace-config.json` | Variant config exists                                                                           |
| paidDebug   | `app/src/paid/embrace-config.json`        | No variant config exists, but there is a matching flavor config                                 |
| freeRelease | `app/src/release/embrace-config.json`     | No matching variant or flavor config exists, but there is a matching build type config          |
| freeDebug   | `app/src/main/embrace-config.json`        | No matching variant, flavor, or build type config exists, so we fall back on the default config |

_Note that this is an artificially-complicated example to illustrate what is possible. Most likely your configuration will be much simpler._
