---
title: Current Session ID API
description: Retrieve the current session ID
sidebar_position: 9
---

# Current Session ID API

## Overview

---

Embrace SDK’s API enables customers to programmatically obtain the current Embrace Session ID. Depending on your use case, having the ability to obtain the Embrace Session ID will enable you to share that ID with other observability tools in order to build a URL to that specific session in the Embrace dashboard and make that link available on those third-party tools.

---

**When should I call the Current Session ID method?**

If you call the method before the SDK has started, it will return `nil`. So, you need to call it once the SDK has been started.

**Can I call this method in the background?**

You can also call this method when the app is in the background. If Background Activity is enabled for your app, you’ll get the Session ID for that background activity; if it’s disabled, you’ll get `nil`.

:::warning Important
- If you use the Session ID to form a `URL` that points to the session view in our dashboard, please consider that the URL is suitable to be updated at any time.
:::

## Integration Steps

In order to use this feature, you will need to follow these steps:

1. Make sure your app is using at least version `5.23.0` of the Embrace SDK.
2. Implement the API call to obtain the current Session ID.
3. The method will return a String with the SessionId or `nil` if there is no active session.

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
