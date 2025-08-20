---
title: Current Session ID API
sidebar_position: 6
description: Track the current Embrace session by getting its ID.
---

# Current Session ID API

import GetSessionId from '@site/shared/get-session-id.md';

<GetSessionId />

## Integration Steps

In order to use this feature, you will need to follow two steps:

1. Make sure your app is using at least version `1.5.0` of the Embrace SDK.
2. Implement the API call to obtain the current Session ID. The method will return either a `String` that is the SessionId, or null if there is no active session.

```dart
final sessionId = await Embrace.instance.getCurrentSessionId();
```

import CallSupport from '@site/shared/call-support.md';

<CallSupport />
