---
title: Session properties
sidebar_position: 5
description: Annotate sessions with key-value properties using the Embrace SDK
---

## Session properties

Session properties are another way to annotate a session.
The difference between session properties and [user personas](/android/features/identify-users#user-personas) is that the former are for items relating to the session or the device and not necessarily to the user.
However, you are free to use both mechanisms interchangeably.

## Property scopes

The `PropertyScope` parameter controls how long a property is retained:

| Scope | Description |
|---|---|
| `PropertyScope.USER_SESSION` | Property is attached to the current session only and is cleared when that session ends. |
| `PropertyScope.PROCESS` | Property persists for the lifetime of the process, surviving session boundaries, but is cleared when the process exits. |
| `PropertyScope.PERMANENT` | Property persists across all sessions and process restarts until explicitly removed. |

## Setting properties

Here is an example of setting a session property scoped to the current session:

```kotlin
Embrace.addUserSessionProperty("launch type", "normal", PropertyScope.USER_SESSION)
```

To retain a property across all sessions:

```kotlin
Embrace.addUserSessionProperty("launch type", "normal", PropertyScope.PERMANENT)
```

To remove a property that has been previously set:

```kotlin
Embrace.removeUserSessionProperty("launch type")
```

import PropertyLimit from '@site/shared/property-limit.md';

<PropertyLimit />

In the above, the `"launch type"` property is set with a value of `"normal"`.
This is to indicate normal launches by the user.
When the app is launched via a push notification tap, you can set the value `"push"`.
This can help to understand issues that are hurting push notification adoption rates.
For example, you could prioritize fixing the issues that affect customers that use push notifications, since they generally provide higher lifetime value.
