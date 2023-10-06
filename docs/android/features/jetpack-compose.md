---
title: Jetpack Compose
description: Enable our Jetpack Compose capture feature
sidebar_position: 13
---

# Jetpack Compose

The Embrace SDK injects code into your APK using a process we call “swazzling” to automatically capture taps on composables.

## Enabling Jetpack Compose capture

Out Jetpack Compose feature is in beta now. You will need to modify your `embrace-config.json` [file](/android/features/configuration-file.md)
```json
{
    "sdk_config": {
        "compose": {
            "capture_compose_onclick": true
        }
  }
}
```
:::warning Important
If you are facing issues at runtime, we can turn off Jetpack Compose instrumentation remotely. Please, contact us: 
:::
