---
title: User Identification
description: Identifying and segmenting users in the Embrace iOS SDK 6.x
sidebar_position: 4
---

# User Identification

User identification and segmentation are critical for effective app monitoring and troubleshooting. The Embrace SDK provides robust mechanisms to identify users and understand their characteristics.

## Why Identify Users?

As your app grows, you'll need to triage issues based on segments of your user base. Proper user identification allows you to:

- Find problem sessions for specific users
- Understand the severity of issues based on affected user segments
- Provide personalized support to high-value users
- Track user behavior across multiple sessions
- Analyze patterns in how different user types interact with your app

## Methods for User Context

The Embrace SDK offers three main approaches for adding user context:

1. **User Personas**: Data about user characteristics and behaviors (tags)
2. **User Identifier**: A unique ID for tracking specific users
3. **Session Properties**: Data about the device or session context

## User Personas

User Personas allow you to dynamically segment app users according to their behavior, characteristics, or other criteria. These personas help you analyze user segments and understand variations in user behavior.

### Retrieving Current Personas

```swift
let personas = Embrace.client?.metadata.currentPersonas
```

### Adding User Personas

The SDK provides both pre-defined tags and the ability to create custom tags:

```swift
// Using pre-defined tag
try? Embrace.client?.metadata.add(persona: PersonaTag.mvp, lifespan: .permanent)

// Using custom tag
try? Embrace.client?.metadata.add(persona: "completed_purchase", lifespan: .session)
```

### Creating Custom Persona Tags

It's best practice to extend the `PersonaTag` type to ensure consistent usage:

```swift
extension PersonaTag {
  static let authenticated: PersonaTag = "authenticated"

  static func bucket(name: StaticString) -> PersonaTag {
    return PersonaTag("bucket_\(name)")
  }
}
```

## User Identifier

For tracking specific users across sessions, you can assign a unique identifier:

```swift
Embrace.client?.metadata.userIdentifier = "user-12345"
```

:::warning Note on Privacy
The value set for `userIdentifier` is not validated by the SDK to follow a specific format. Ensure that this value accurately represents the user without directly storing Personally Identifiable Information (PII). Consider using references, aliases, or hashed values to maintain user privacy and comply with data protection regulations.
:::

## Session Properties

Session Properties provide context about the session or device. They're useful for tracking information that's specific to a particular session:

```swift
Embrace.client?.metadata.addProperty(key: "launch type", value: "normal", lifespan: .session)
```

## Metadata Lifespan

Each piece of metadata can have one of three lifespans:

1. **Session**: Tied to a single user session and automatically cleared when the session ends
   ```swift
   try? Embrace.client?.metadata.add(persona: "completed_purchase", lifespan: .session)
   ```

2. **Process**: Scoped to the lifetime of the application process and cleared if the app restarts
   ```swift
   try? Embrace.client?.metadata.add(persona: "first_launch", lifespan: .process)
   ```

3. **Permanent**: Remains associated with the user across multiple sessions until explicitly removed
   ```swift
   try? Embrace.client?.metadata.add(persona: "vip", lifespan: .permanent)
   ```

## Best Practices for User Identification

- **Set early in the session**: Add user identity information as early as possible
- **Be consistent**: Use the same identifiers across app sessions
- **Protect privacy**: Avoid storing PII directly; use IDs, hashes, or references instead
- **Use appropriate lifespans**: Consider how long each piece of user data should persist
- **Layer your approach**: Combine user ID, personas, and session properties for comprehensive understanding
- **Segment strategically**: Create personas that align with key business and technical metrics
- **Update when needed**: Change user context when user status changes (e.g., after login/logout)

## Implementation Timing

Implement user identification:
- After a user logs in
- When a user completes an important action (e.g., makes a purchase)
- When a user's status changes (e.g., becomes a VIP)
- At the start of important workflows
- After significant state changes

 <!-- TODO: Add more examples of effective user identification strategies for common app scenarios like authentication flows and feature gating  -->
