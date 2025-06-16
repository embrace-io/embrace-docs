---
title: User Opt Out
description: Allow users to opt out of data tracking
sidebar_position: 8
---

## Overview

Sometimes you want users to be able to opt out of data tracking for privacy reasons.

## Disabling the SDK

Here's how you disable the SDK:

```cs
Embrace.Instance.Disable();
```

Call this function after the SDK has started to disable the SDK.

This call will disable the native SDK tracking for this session. Please note that you will need to track user's preferences and if they want to opt out permanently then you will need to call this on start up every time the SDK starts.

<PropertyLimit />

## Enabling the SDK

Due to how sessions work you cannot re-enable a disabled session. The user will need to stop the SDK and restart it without calling `Disable()` to start data tracking again.