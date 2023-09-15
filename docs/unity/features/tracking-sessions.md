---
title: Tracking Sessions
description: Track the current Embrace session by getting its ID.
sidebar_position: 3
---

# Tracking Sessions

import GetSessionId from '@site/shared/get-session-id.md';

<GetSessionId />

## Integration Steps

In order to use this feature, you will need to follow two steps:

1. Make sure your app is using the latest version of the Embrace SDK
2. Implement the API call to obtain the current Session ID.

```cs
Embrace.Instance.GetCurrentSessionId();
```

:::warning Important
This feature is included in Embrace Unity version 1.18.0 and above. Please check the changelog to verify which version of the iOS SDK and the Android SDK are supported.
:::

import CallSupport from '@site/shared/call-support.md';

<CallSupport />