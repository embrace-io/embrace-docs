---
title: Custom Attributes
description: Add contextual data to your app's sessions and spans
sidebar_position: 3
---

# Custom Attributes

Custom attributes allow you to add contextual information to your app's telemetry data. Attributes can be added to sessions, spans, and events, providing additional context that helps with analysis and troubleshooting.

## Understanding Custom Attributes

Attributes are key-value pairs that provide context about:
- User properties (subscription status, preferences)
- App configuration (feature flags, environment)
- Device state (battery level, available storage)
- Business context (checkout flow, content type)

These attributes help segment and filter data, making it easier to understand user behavior and troubleshoot issues.

## Session Attributes

Session attributes apply to an entire user session. They're useful for information that remains constant throughout a session or represents the session's overall context.

### Adding Session Attributes

```swift
// Add a single attribute
Embrace.client?.addSessionProperty(key: "subscription_tier", value: "premium")

// Add multiple attributes
Embrace.client?.addSessionProperties([
    "app_theme": themeManager.currentTheme,
    "accessibility_enabled": UIAccessibility.isVoiceOverRunning ? "true" : "false",
    "notification_status": notificationStatus.rawValue
])
```

Session attributes persist for the duration of the session and are attached to all telemetry data from that session.

### Updating Session Attributes

You can update a session attribute if its value changes:

```swift
// Update when user changes theme
func didChangeTheme(to newTheme: String) {
    Embrace.client?.addSessionProperty(key: "app_theme", value: newTheme)
}
```

### Removing Session Attributes

If an attribute is no longer relevant, you can remove it:

```swift
Embrace.client?.removeSessionProperty(key: "temporary_feature_flag")
```

## Permanent Attributes

Permanent attributes persist across sessions. They're useful for properties that are unlikely to change frequently, such as user preferences or app configuration.

```swift
// Add a permanent attribute
Embrace.client?.addPermanentProperty(key: "user_language", value: Locale.current.languageCode ?? "en")

// Add multiple permanent attributes
Embrace.client?.addPermanentProperties([
    "device_category": UIDevice.current.userInterfaceIdiom == .pad ? "tablet" : "phone",
    "app_install_date": installDateFormatter.string(from: appInstallDate)
])
```

Permanent attributes can be removed when they're no longer needed:

```swift
Embrace.client?.removePermanentProperty(key: "legacy_setting")
```

## Span Attributes

You can add attributes to spans to provide context specific to that operation:

```swift
let span = Embrace.client?.startSpan(name: "load_user_content")

// Add attributes to the span
span?.setAttribute(key: "content_type", value: "article")
span?.setAttribute(key: "content_id", value: articleId)
span?.setAttribute(key: "cached", value: isLoadingFromCache ? "true" : "false")

// Your code here

span?.end()
```

Span attributes are only attached to that specific span and won't affect other spans or the session as a whole.

## Event Attributes

When logging custom events (breadcrumbs), you can include attributes as properties:

```swift
Embrace.client?.logBreadcrumb(
    name: "user_action",
    properties: [
        "action_type": "button_tap",
        "target_screen": "settings",
        "feature": "dark_mode"
    ]
)
```

## Common Use Cases

### User Segments

```swift
// In your user service
func updateUserSegments() {
    let userSegments = [
        "is_premium": userService.isPremiumUser ? "true" : "false",
        "account_age_days": String(userService.accountAgeDays),
        "has_completed_onboarding": userService.hasCompletedOnboarding ? "true" : "false"
    ]
    
    Embrace.client?.addSessionProperties(userSegments)
}
```

### Feature Flags

```swift
// Track enabled features
func updateFeatureFlags() {
    let enabledFeatures = featureFlagService.enabledFeatures.reduce(into: [String: String]()) { result, feature in
        result[feature.flagName] = feature.isEnabled ? "true" : "false"
    }
    
    Embrace.client?.addSessionProperties(enabledFeatures)
}
```

### A/B Test Variants

```swift
// Track which A/B test variants the user is in
func trackExperimentVariants() {
    let experimentVariants = experimentService.activeExperiments.reduce(into: [String: String]()) { result, experiment in
        let variantName = experiment.assignedVariant?.name ?? "control"
        result["exp_\(experiment.name)"] = variantName
    }
    
    Embrace.client?.addSessionProperties(experimentVariants)
}
```

### Environment Information

```swift
func setupEnvironmentInfo() {
    Embrace.client?.addPermanentProperties([
        "environment": AppConfig.environment.rawValue,
        "app_version": Bundle.main.infoDictionary?["CFBundleShortVersionString"] as? String ?? "unknown",
        "build_number": Bundle.main.infoDictionary?["CFBundleVersion"] as? String ?? "unknown"
    ])
}
```

## Best Practices

### Naming Conventions

Use clear, descriptive names for attribute keys:
- Use snake_case for consistency
- Use prefixes to group related attributes (e.g., `user_`, `app_`, `feature_`)
- Keep names concise but meaningful

### Value Types

All attribute values must be strings. Convert other types to strings:

```swift
"count": String(itemCount),
"price": String(format: "%.2f", price),
"enabled": isEnabled ? "true" : "false",
"timestamp": String(Int(date.timeIntervalSince1970))
```

### Attribute Limits

Be mindful of the number of attributes you add:
- Focus on attributes that provide valuable context
- Consolidate related attributes when possible
- Remove attributes that are no longer needed
- Consider the balance between detail and data volume

### Sensitive Data

Never include sensitive information in attributes:
- No personally identifiable information (PII)
- No authentication tokens or credentials
- No financial details
- No health information

### Session vs. Permanent

Choose the appropriate attribute type:
- Use session attributes for values that might change between sessions
- Use permanent attributes for values that rarely change
- Use span attributes for operation-specific context

## Using Attributes for Analysis

Custom attributes enable powerful analysis scenarios:
- Filter sessions by user segments or feature flags
- Compare performance across different app configurations
- Identify patterns in errors related to specific attributes
- Measure the impact of A/B test variants

TODO: Add examples of how attributes appear in the Embrace dashboard
TODO: Add code samples for commonly tracked attributes in specific app categories
TODO: Add examples of using attributes with other Embrace features like logging 