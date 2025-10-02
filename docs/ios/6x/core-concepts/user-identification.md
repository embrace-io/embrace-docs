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

- **User Personas**: Data about user characteristics and behaviors (tags)
- **User Identifier**: A unique ID for tracking specific users
- **Session Properties**: Data about the device or session context

## User Personas

User Personas allow you to dynamically segment app users according to their behavior, characteristics, or other criteria. These personas help you analyze user segments and understand variations in user behavior.

### Retrieving Current Personas

```swift
Embrace.client?.metadata.getCurrentPersonas { personas in
    print("Current personas: \(personas)")
    // Use personas here
}
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
try? Embrace.client?.metadata.addProperty(key: "launch_type", value: "normal", lifespan: .session)
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

## Common Implementation Patterns

### Authentication Flow User Identification

Implement user identification throughout the authentication lifecycle:

```swift
class AuthenticationFlow {
    func handleSignUp(email: String, userTier: String) async throws {
        // Track signup attempt
        Embrace.client?.log("User signup initiated", severity: .info)

        do {
            let user = try await performSignUp(email: email)

            // Set user identification immediately after signup (use anonymized ID)
            Embrace.client?.metadata.userIdentifier = user.anonymizedId

            // Add personas for new user
            try? Embrace.client?.metadata.add(
                persona: PersonaTag("new_user"), 
                lifespan: .session
            )
            try? Embrace.client?.metadata.add(
                persona: PersonaTag(userTier.lowercased()), 
                lifespan: .permanent
            )

            // Track successful signup
            Embrace.client?.log(
                "User signup completed",
                severity: .info,
                attributes: [
                    "auth.signup_method": "email",
                    "user.tier": userTier
                ]
            )

        } catch {
            Embrace.client?.log(
                "User signup failed",
                severity: .error,
                attributes: [
                    "auth.error_type": error.localizedDescription
                ]
            )
            throw error
        }
    }

    func handleLogin(credentials: LoginCredentials) async throws {
        do {
            let user = try await performLogin(credentials)

            // Update user identification for returning user (use anonymized ID)
            Embrace.client?.metadata.userIdentifier = user.anonymizedId

            // Remove new_user persona if present, add authenticated
            try? Embrace.client?.metadata.remove(
                persona: PersonaTag("new_user"), 
                lifespan: .session
            )
            try? Embrace.client?.metadata.add(
                persona: PersonaTag("authenticated"), 
                lifespan: .session
            )

            // Add user tier information
            try? Embrace.client?.metadata.add(
                persona: PersonaTag(user.tier.lowercased()), 
                lifespan: .permanent
            )

            // Track login success
            Embrace.client?.log(
                "User login successful",
                severity: .info,
                attributes: [
                    "auth.method": credentials.type,
                    "user.returning": String(user.isReturning),
                    "user.tier": user.tier
                ]
            )

        } catch let authError as AuthenticationError {
            // Track failed login attempts with privacy-safe info
            Embrace.client?.log(
                "User login failed",
                severity: .warning,
                attributes: [
                    "auth.error_code": String(authError.code),
                    "auth.method": credentials.type
                ]
            )
            throw authError
        }
    }

    func handleLogout() {
        // Log logout with session context
        if let userId = Embrace.client?.metadata.userIdentifier {
            Embrace.client?.log(
                "User logout initiated",
                severity: .info,
                attributes: [
                    "user.was_authenticated": "true"
                ]
            )
        }

        // Clear user identification but preserve some anonymous analytics
        Embrace.client?.metadata.clearUserProperties()

        // Remove authenticated persona, keep anonymous tracking
        try? Embrace.client?.metadata.remove(
            persona: PersonaTag("authenticated"), 
            lifespan: .session
        )
        try? Embrace.client?.metadata.add(
            persona: PersonaTag("anonymous"), 
            lifespan: .session
        )
    }
}
```

### Feature Gating and A/B Testing

Use user identification for feature access control and testing:

```swift
class FeatureGateManager {
    func checkFeatureAccess(feature: String) -> Bool {
        let hasAccess = determineFeatureAccess(feature: feature)

        // Track feature access attempts
        Embrace.client?.log(
            "Feature access check",
            severity: .debug,
            attributes: [
                "feature.name": feature,
                "feature.access_granted": String(hasAccess),
                "user.authenticated": String(isUserAuthenticated())
            ]
        )

        if hasAccess {
            // Add persona for feature usage
            try? Embrace.client?.metadata.add(
                persona: PersonaTag("\(feature)_user"), 
                lifespan: .session
            )
        }

        return hasAccess
    }

    func enrollInExperiment(experimentId: String, variant: String) {
        // Track A/B test enrollment
        try? Embrace.client?.metadata.addProperty(
            key: "experiment.\(experimentId)",
            value: variant,
            lifespan: .session
        )

        // Add experiment personas
        try? Embrace.client?.metadata.add(
            persona: PersonaTag("experiment_\(experimentId)"), 
            lifespan: .session
        )
        try? Embrace.client?.metadata.add(
            persona: PersonaTag("variant_\(variant)"), 
            lifespan: .session
        )

        Embrace.client?.log(
            "User enrolled in experiment",
            severity: .info,
            attributes: [
                "experiment.id": experimentId,
                "experiment.variant": variant,
                "user.enrolled_experiments_count": String(getCurrentExperimentCount())
            ]
        )
    }

    private func isUserAuthenticated() -> Bool {
        return Embrace.client?.metadata.userIdentifier != nil
    }

    private func getCurrentExperimentCount() -> Int {
        // Implementation would count active experiments for this user
        return 0
    }
}
```

### Progressive User Journey Tracking

Track user progression through onboarding and feature adoption:

```swift
class UserJourneyTracker {
    func trackOnboardingProgress(step: OnboardingStep, completed: Bool) {
        let stepName = step.rawValue

        // Update onboarding progress
        try? Embrace.client?.metadata.addProperty(
            key: "onboarding.current_step",
            value: stepName,
            lifespan: .session
        )

        if completed {
            try? Embrace.client?.metadata.addProperty(
                key: "onboarding.completed_steps",
                value: getCompletedStepsString(),
                lifespan: .permanent
            )

            // Add milestone personas
            try? Embrace.client?.metadata.add(
                persona: PersonaTag("onboarding_\(stepName)_completed"), 
                lifespan: .permanent
            )
        }

        // Check if onboarding is complete
        if isOnboardingComplete() {
            try? Embrace.client?.metadata.add(
                persona: PersonaTag("onboarding_complete"), 
                lifespan: .permanent
            )
            try? Embrace.client?.metadata.remove(
                persona: PersonaTag("new_user"), 
                lifespan: .session
            )
        }

        Embrace.client?.log(
            "Onboarding step update",
            severity: .info,
            attributes: [
                "onboarding.step": stepName,
                "onboarding.completed": String(completed),
                "onboarding.progress_percentage": String(getOnboardingProgress())
            ]
        )
    }

    func trackFeatureAdoption(feature: String, adopted: Bool) {
        if adopted {
            // Track feature adoption
            try? Embrace.client?.metadata.addProperty(
                key: "features.adopted",
                value: getAdoptedFeaturesString(),
                lifespan: .permanent
            )

            try? Embrace.client?.metadata.add(
                persona: PersonaTag("\(feature)_adopter"), 
                lifespan: .permanent
            )

            // Check for power user status
            if getAdoptedFeaturesCount() >= 5 {
                try? Embrace.client?.metadata.add(
                    persona: PersonaTag("power_user"), 
                    lifespan: .permanent
                )
            }
        }

        Embrace.client?.log(
            "Feature adoption update",
            severity: .info,
            attributes: [
                "feature.name": feature,
                "feature.adopted": String(adopted),
                "user.adopted_features_count": String(getAdoptedFeaturesCount())
            ]
        )
    }

    func trackUserMilestone(milestone: UserMilestone) {
        // Add milestone persona
        try? Embrace.client?.metadata.add(
            persona: PersonaTag(milestone.rawValue), 
            lifespan: .permanent
        )

        // Update user level/tier if applicable
        if let newTier = milestone.associatedTier {
            try? Embrace.client?.metadata.addProperty(
                key: "user.tier",
                value: newTier,
                lifespan: .permanent
            )
        }

        Embrace.client?.log(
            "User milestone achieved",
            severity: .info,
            attributes: [
                "milestone.name": milestone.rawValue,
                "milestone.category": milestone.category,
                "user.total_milestones": String(getTotalMilestonesCount())
            ]
        )
    }

    // Helper methods
    private func isOnboardingComplete() -> Bool { /* Implementation */ return false }
    private func getOnboardingProgress() -> Int { /* Implementation */ return 0 }
    private func getCompletedStepsString() -> String { /* Implementation */ return "" }
    private func getAdoptedFeaturesString() -> String { /* Implementation */ return "" }
    private func getAdoptedFeaturesCount() -> Int { /* Implementation */ return 0 }
    private func getTotalMilestonesCount() -> Int { /* Implementation */ return 0 }
}

enum OnboardingStep: String {
    case welcome = "welcome"
    case permissions = "permissions"
    case tutorial = "tutorial"
    case profile_setup = "profile_setup"
    case first_action = "first_action"
}

enum UserMilestone: String {
    case first_purchase = "first_purchase"
    case tenth_session = "tenth_session"
    case feature_expert = "feature_expert"
    case community_contributor = "community_contributor"

    var category: String {
        switch self {
        case .first_purchase: return "commerce"
        case .tenth_session: return "engagement"
        case .feature_expert, .community_contributor: return "expertise"
        }
    }

    var associatedTier: String? {
        switch self {
        case .first_purchase: return "customer"
        case .feature_expert: return "advanced"
        case .community_contributor: return "vip"
        default: return nil
        }
    }
}
```

### Privacy-Safe User Segmentation

Implement user identification while respecting privacy:

```swift
class PrivacySafeUserIdentification {
    func setUserIdentification(email: String, consentLevel: ConsentLevel) {
        // Use hashed identifiers for privacy
        let hashedEmail = email.sha256
        Embrace.client?.metadata.userIdentifier = hashedEmail

        // Set privacy level as metadata
        try? Embrace.client?.metadata.addProperty(
            key: "user.privacy_consent_level",
            value: consentLevel.rawValue,
            lifespan: .permanent
        )

        // Note: Email storage should only be done if user explicitly consented
        // and your privacy policy allows it. Consider using hashed identifiers instead.

        // Add privacy-aware personas
        try? Embrace.client?.metadata.add(
            persona: PersonaTag("consent_\(consentLevel.rawValue)"), 
            lifespan: .permanent
        )

        Embrace.client?.log(
            "User identification set with privacy controls",
            severity: .info,
            attributes: [
                "privacy.consent_level": consentLevel.rawValue,
                "privacy.email_stored": String(consentLevel.allowsEmailStorage)
            ]
        )
    }

    func updateConsentLevel(newLevel: ConsentLevel) {
        // Update consent level
        try? Embrace.client?.metadata.updateProperty(
            key: "user.privacy_consent_level",
            value: newLevel.rawValue,
            lifespan: .permanent
        )

        // Clear any stored personal data if consent was withdrawn
        // (implementation depends on what data you're storing)

        // Update personas
        try? Embrace.client?.metadata.removeAllPersonas(lifespans: [.permanent])
        try? Embrace.client?.metadata.add(
            persona: PersonaTag("consent_\(newLevel.rawValue)"), 
            lifespan: .permanent
        )
    }
}

enum ConsentLevel: String {
    case minimal = "minimal"
    case analytics = "analytics"  
    case full = "full"

    var allowsEmailStorage: Bool {
        return self == .full
    }
}

extension String {
    var sha256: String {
        // Implementation would use CryptoKit or CommonCrypto
        // This is a placeholder
        return "hashed_\(self.hashValue)"
    }
}
```

These patterns provide comprehensive user identification strategies that balance analytics needs with privacy considerations, enabling effective user segmentation and personalized experiences.
