---
title: Current Session ID API
description: Retrieve the current session ID
sidebar_position: 9
---

# Current Session ID API

import GetSessionId from '@site/shared/get-session-id.md';

<GetSessionId />

:::warning Important

- If you use the Session ID to form a `URL` that points to the session view in our dashboard, please consider that the URL is suitable to be updated at any time.
:::

## Integration Steps

In order to use this feature, you will need to follow these steps:

1. Make sure your app is using at least version `5.23.0` of the Embrace SDK.
2. Implement the API call to obtain the current Session ID. The method will return either a `String` that is the SessionId, or null if there is no active session.

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

<Tabs groupId="ios-language" queryString="ios-language">
<TabItem value="swift" label="Swift">

```swift
let sessionId = Embrace.sharedInstance().getCurrentSessionId();
```

</TabItem>

<TabItem value="objectivec" label="Objective-C">

```objectivec
NSString* sessionId = [[Embrace sharedInstance] getCurrentSessionId];
```

</TabItem>

</Tabs>
