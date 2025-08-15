---
title: User Identification
description: Identifying and segmenting users in the Embrace iOS SDK 6.x
sidebar_position: 4
---

# User Identification

User identification is critical for effective app monitoring and troubleshooting. The Embrace SDK provides robust mechanisms to identify users.

## Why Identify Users?

Proper user identification allows you to:

- Find problem sessions for specific users
- Provide personalized support to high-value users
- Track user behavior across multiple sessions

## User Identifier

For tracking specific users across sessions, you can assign a unique identifier:

```typescript
import { user } from '@embrace-io/web-sdk';

user.setUserId("user-12345");
```

:::warning Note on Privacy
The value set in `setUserId` is not validated by the SDK to follow a specific format. Ensure that this value accurately represents the user without directly storing Personally Identifiable Information (PII). Consider using references, aliases, or hashed values to maintain user privacy and comply with data protection regulations.
:::

After setting the user ID, all subsequent sessions will be associated with this user. Every span and log created after this call will also include the user ID as an attribute following the OpenTelemetry semantic conventions.

### Clearing the User Identifier

To remove the user identifier, you can call:

```typescript
import { user } from '@embrace-io/web-sdk';

user.clearUserId();
```

## Best Practices for User Identification

- **Set early in the session**: Add user identity information as early as possible
- **Be consistent**: Use the same identifiers across app sessions
- **Protect privacy**: Avoid storing PII directly; use IDs, hashes, or references instead
- **Update when needed**: Change user context when user status changes (e.g., after login/logout)

:::info Mixing user identifiers
Embrace sets the user identifier property on sessions and spans when they end. If you change the user identifier during a session, the new identifier will be used for all subsequent spans and logs. You may [manually end the current session](./sessions.md#what-is-a-session) to ensure that you don't have mixed user activities in the same session with different user identifiers.
:::
