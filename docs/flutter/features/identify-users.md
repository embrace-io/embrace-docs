---
title: Identify users
description: Get to know the users of your Flutter application with the Embrace SDK
sidebar_position: 2
---

# Know your users

Embrace offers two methods of annotating sessions with information that helps developers and customer service agents find sessions for an unhappy user.

- [**User personas**](/flutter/features/identify-users/#user-personas). This is data you can set and update about the user of a session.
- [**Session properties**](/flutter/features/identify-users/#session-properties). This is data you use to track information about the device or the session itself.

## User personas

Embrace offers a set of methods to pass information about your users:

```dart
Embrace.instance.setUserIdentifier('internal_random_id_1234');
```

This call annotates the session with a user identifier that you can use later to search for this user. For more methods on setting user values, see the [API docs](/api/flutter/).

:::warning Important
This data will be uploaded to Embrace, so think about the privacy of your users and only include data you're willing to share. We recommend using an anonymized or hashed user ID that only your agents can search for.
:::

You can also set customized values for specific use cases or segments of users.

```dart
Embrace.instance.setUserPersona('high_value_cart');
```

In the above example, the session is annotated with `"high_value_cart"`.
This will help you identify users who have a certain dollar value in their shopping cart so you can prioritize fixing bugs that affect such users.

## Session properties

Session properties are another way to annotate the session. The difference between session properties and [user personas](/flutter/features/identify-users#user-personas) is that session properties are for items relating to the session or the device and not necessarily to the user. However, you can use both mechanisms interchangeably.

Here's an example of setting a session property:

```dart
Embrace.instance.addSessionProperty('launch type', 'normal');
```

import PropertyLimit from '@site/shared/property-limit.md';

<PropertyLimit />

In the above, the `'launch type'` property is set with a value of `'normal'`.
This is to indicate normal launches by the user.
When the app is launched via a push notification tap, you can set the value `'push'`.
This can help to understand issues that are hurting push notification adoption rates.
For example, you could prioritize fixing the issues that affect customers that use push notifications, since they generally provide higher lifetime value.
