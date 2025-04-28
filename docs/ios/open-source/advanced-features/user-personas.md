---
title: User Personas
description: Segment users based on behaviors or characteristics
sidebar_position: 3
---

# User Personas

User Personas allow you to dynamically segment app users according to their behavior, characteristics, or other criteria. These personas help you analyze user segments, understand variations in use patterns, and tailor the application experience to meet the diverse ways that users interact with your app.

## Understanding User Personas

User Personas are tags or attributes that you assign to users to categorize them based on:

- Usage patterns (e.g., "power_user", "occasional_user")
- Subscription levels (e.g., "free_tier", "premium")
- User behaviors (e.g., "completed_purchase", "abandoned_cart")
- Demographics (e.g., "age_group_18_24", "region_europe")
- Feature adoption (e.g., "uses_dark_mode", "feature_beta_tester")

By applying these personas, you can:

- Filter sessions in the Embrace dashboard based on user characteristics
- Prioritize issues that affect specific user segments
- Compare performance and experience across different user groups
- Make data-driven decisions about feature development

## Using User Personas

The `MetadataHandler` provides an [extension](https://github.com/embrace-io/embrace-apple-sdk/blob/main/Sources/EmbraceCore/Public/Metadata/MetadataHandler%2BPersonas.swift) for managing User Personas.

### Retrieving Current User Personas

To retrieve the current set of persona tags, use the `currentPersonas` property. This property fetches persona tags from the storage that apply to the user at the current point in time.

```swift
let personas = Embrace.client?.metadata.currentPersonas
```

### Adding User Personas

There are [pre-defined tags](https://github.com/embrace-io/embrace-apple-sdk/blob/main/Sources/EmbraceCore/Public/Metadata/PersonaTag.swift#L8-L17) that we think are useful, and you can feel free to add your own. Here are some examples on how to add user personas:

```swift
try? Embrace.client?.metadata.add(persona: PersonaTag.mvp, lifespan: .permanent)

try? Embrace.client?.metadata.add(persona: "completed_purchase", lifespan: .session)
```

It's recommended to extend `PersonaTag` when you define your own persona tags. This is a good practice to make sure these values stay consistent wherever they are used.

```swift
extension PersonaTag {
  static let authenticated: PersonaTag = "authenticated"

  static func bucket(name: StaticString) -> PersonaTag {
    return PersonaTag("bucket_\(name)")
  }
}
```

## Understanding Metadata Lifespan

When you add Embrace metadata, you can apply a [lifespan](https://github.com/embrace-io/embrace-apple-sdk/blob/main/Sources/EmbraceCore/Public/Metadata/MetadataHandler.swift#L9-L17) to that value. This lifespan determines how long the persona will remain associated with the user.

There are three metadata lifespans:

1. **Session**: Metadata with a `session` lifespan is tied to a single user session. When the session ends, this metadata is automatically cleared. This option is ideal for temporary states or conditions that are only relevant to a specific interaction period. For instance, if a user completes a purchase, it can be useful to mark the session with a persona to mark the "`completed_purchase`" in order to identify behaviors across users that led to that purchase.

2. **Process**: A `process` lifespan is scoped to the lifetime of the application process. If the application restarts, `process` lifespan metadata will no longer apply. This can be useful for conditions that should persist across sessions but not continue into the next cold start of the application. An example of this could be a "`first_launch`" persona to mark any sessions that occur when the user first installs the app.

3. **Permanent**: Metadata marked as `permanent` remains associated with the user across multiple sessions until explicitly removed. This is useful for long-term attributes, such as user roles or subscription statuses, that affect the user experience over time. You may want to use a "`vip`" persona to mark users that you'd like to make sure have a seamless experience. This could be your company's CEO so that you recognize the issues that somehow only ever seems to occur to them. Maybe you'll have a fix **before** you get that pesky email...

## Common Use Cases

### User Segmentation for Analysis

Adding personas allows you to segment users in the Embrace dashboard:

```swift
// Tag premium users
if user.subscriptionTier == .premium {
    try? Embrace.client?.metadata.add(persona: "premium_subscriber", lifespan: .permanent)
}

// Tag users who have completed onboarding
if user.hasCompletedOnboarding {
    try? Embrace.client?.metadata.add(persona: "completed_onboarding", lifespan: .permanent)
}
```

### Feature Adoption Tracking

Track which users are using specific features:

```swift
// When user enables dark mode
func didEnableDarkMode() {
    try? Embrace.client?.metadata.add(persona: "uses_dark_mode", lifespan: .permanent)
}

// When user starts using a beta feature
func didOptIntoBeta(featureName: String) {
    try? Embrace.client?.metadata.add(persona: "beta_\(featureName)", lifespan: .permanent)
}
```

### User Journey Analysis

Add personas at key points in the user journey:

```swift
// Shopping cart flow
func didAddItemToCart() {
    try? Embrace.client?.metadata.add(persona: "has_items_in_cart", lifespan: .session)
}

func didCheckout() {
    try? Embrace.client?.metadata.add(persona: "completed_checkout", lifespan: .session)
}

func didAbandonCart() {
    try? Embrace.client?.metadata.add(persona: "abandoned_cart", lifespan: .session)
}
```

## Difference from Session Properties

Session Properties are another way to annotate the session. The difference between session properties and user personas is that the former are for items relating to the session or the device, and not necessarily to the user. Although, you are free to use both mechanisms interchangeably.

When deciding between user personas and session properties, consider:

- Use personas for user-specific attributes that define "who" the user is
- Use session properties for contextual information about the current session

TODO: Add more examples of integrating personas with A/B testing frameworks
TODO: Include guidance on designing an effective persona taxonomy for your application
TODO: Show examples of analyzing persona data in the Embrace dashboard 