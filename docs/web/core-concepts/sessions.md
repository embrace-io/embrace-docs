---
title: Sessions
description: Understanding sessions in the Embrace Web SDK
sidebar_position: 1
---

# Sessions

Sessions are a fundamental concept in the Embrace Web SDK that help you understand how users interact with your
application over time.

## What is a Session?

A session is a comprehensive record of user interaction that occurs within your app. Embrace manages session lifecycle
automatically when your app is started and the SDK is initialized.

A new session starts when your web app is loaded in a user's browser tab and is ended when any of the following occurs:
- The tab or browser is closed or refreshed
- The user switches to another tab or the browser's window loses focuses. If background sessions are enabled this also
starts a new background session
- There is no user activity detected on the tab for a certain period of time (30 minutes by default)

A session ending will trigger an upload of that session's data to Embrace where it will be shown within the Embrace
Dashboard. You can also manually trigger the start or stop of sessions if needed:

```typescript
import { session } from '@embrace-io/web-sdk';

// Force start a new session
session.startSessionSpan();

// Force end the current session
session.endSessionSpan();
```

:::info
Embrace "stitches" individual sessions together where it makes sense to treat them as the same overall
user interaction. So, for example, a user switching away from your web app to another tab before returning and performing
more actions would be recorded as two sessions but presented as one stitched session in the Embrace Dashboard.
:::

## Session Properties

Session properties let you attach custom information to a user’s session, such as feature flags, experiment groups, or temporary user states. By default, properties are included only in the session where they are set, helping you analyze user behavior in context.

### Property Lifespans

Session properties in the Embrace SDK can have two different lifespans: **current session** or **permanent**.

- **Current Session Properties:**

  Session properties only last for the duration of the current session. When the session ends (for example, when the user leaves the tab, closes the tab, or after a period of inactivity), these properties are uploaded and then cleared from memory. They are not included in future sessions, even if the user returns to a tab that was previously focused.

- **Permanent Properties:**

  These are included in all sessions, both current and future, even after page refreshes or when the browser is closed and reopened. Permanent properties are stored in the browser’s localStorage and are automatically shared with all other open tabs and windows. They continue to be included in every session until you explicitly remove them or the user clears their browser data.

:::note
If localStorage is unavailable (such as in private or incognito mode), permanent properties will be added to the current session but will not persist after it ends. For more details, see [localStorage availability](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API#testing_for_availability).
:::

### Adding and Removing Properties

To add a property to the current session:
```typescript
import { session } from '@embrace-io/web-sdk';

session.addProperty("my-custom-property", "some value");
```

To add a permanent property to current and future sessions in all tabs and windows:
```typescript
session.addProperty("my-custom-property", "some value", {
  lifespan: 'permanent'
});
```

To remove a property:
```typescript
session.removeProperty("my-custom-property");
```

### Limits on Properties

- Property keys have a limit of 128 characters.
- Property values have a limit of 256 characters.
- There can be a maximum of 100 properties per session.

## Sessions vs Other Concepts

It's important to understand how sessions relate to other core concepts in the SDK:

- **Sessions and Traces**: A session can contain multiple traces. Traces represent specific operations within a session.
- **Sessions and Logs**: Logs provide additional context within a session, helping you understand what happened during user interaction.

## Implementation Details

In the Embrace SDK, sessions are implemented as OpenTelemetry spans. When a session starts, a span begins that will
continue until the session ends:

```typescript
// This happens internally in the SDK
this._sessionSpan = tracer.startSpan('emb-session', {
  attributes: {
    [KEY_EMB_TYPE]: EMB_TYPES.Session,
    [KEY_EMB_STATE]:
      this._visibilityDoc.visibilityState === 'hidden'
        ? EMB_STATES.Background
        : EMB_STATES.Foreground,
    [ATTR_SESSION_ID]: this._activeSessionId,
  },
});
```
