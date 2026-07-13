---
title: User Identification
description: Identifying and segmenting users in the Embrace iOS SDK 7.x
sidebar_position: 4
---

## User Identification

User identification and segmentation are critical for effective app monitoring and troubleshooting. The Embrace SDK provides robust mechanisms to identify users and understand their characteristics.

### Why Identify Users?

As your app grows, you'll need to triage issues based on segments of your user base. Proper user identification allows you to:

- Find problem sessions for specific users
- Understand the severity of issues based on affected user segments
- Provide personalized support to high-value users
- Track user behavior across multiple sessions
- Analyze patterns in how different user types interact with your app

### Methods for User Context

The Embrace SDK offers three main approaches for adding user context:

- **User Personas**: Data about user characteristics and behaviors (tags)
- **User Identifier**: A unique ID for tracking specific users
- **Session Properties**: Data about the device or session context

### User Personas

User Personas allow you to dynamically segment app users according to their behavior, characteristics, or other criteria. These personas help you analyze user segments and understand variations in user behavior.

#### Retrieving Current Personas

```swift
EmbraceIO.shared.getCurrentPersonas { personas in
    print("Current personas: \(personas)")
    // Use personas here
}
```

#### Adding User Personas

Personas are plain strings that you can add with any lifespan:

```swift
EmbraceIO.shared.addPersona("mvp", lifespan: .permanent)

EmbraceIO.shared.addPersona("completed_purchase", lifespan: .session)
```

:::warning
A persona tag can be at most 32 characters long. If it exceeds this limit, the persona is not
added and a warning is logged.
:::

#### Defining Persona Constants

It's best practice to define your persona strings as constants to ensure consistent usage:

```swift
enum Personas {
  static let authenticated = "authenticated"

  static func bucket(name: String) -> String {
    return "bucket_\(name)"
  }
}
```

#### Removing User Personas

You can remove a specific persona tag from a given lifespan, or remove all persona tags at once:

```swift
// Remove a single persona from a specific lifespan
EmbraceIO.shared.removePersona("mvp", lifespan: .permanent)

// Remove all personas for the given lifespans
EmbraceIO.shared.removeAllPersonas(lifespans: [.session, .process, .permanent])
```

:::note
You can only remove personas from the currently active session or process. Metadata that
belongs to a session or process that has already ended cannot be edited.
:::

### User Identifier

For tracking specific users across sessions, you can assign a unique identifier:

```swift
EmbraceIO.shared.userIdentifier = "user-12345"
```

:::note Removed in 7.x
The `userName` and `userEmail` properties are no longer available in the iOS SDK 7.x. Only `userIdentifier` and personas remain for user context.
:::

:::warning Note on Privacy
The value set for `userIdentifier` is not validated by the SDK to follow a specific format. Ensure that this value accurately represents the user without directly storing Personally Identifiable Information (PII). Consider using references, aliases, or hashed values to maintain user privacy and comply with data protection regulations.
:::

### Session Properties

Session Properties provide context about the session or device. They're useful for tracking information that's specific to a particular session:

```swift
EmbraceIO.shared.setProperty(key: "launch_type", value: "normal", lifespan: .session)
```

### Metadata Lifespan

Each piece of metadata can have one of three lifespans:

1. **Session**: Tied to a single user session and automatically cleared when the session ends

```swift
EmbraceIO.shared.addPersona("completed_purchase", lifespan: .session)
```

2. **Process**: Scoped to the lifetime of the application process and cleared if the app restarts

```swift
EmbraceIO.shared.addPersona("first_launch", lifespan: .process)
```

3. **Permanent**: Remains associated with the user across multiple sessions until explicitly removed

```swift
EmbraceIO.shared.addPersona("vip", lifespan: .permanent)
```

### Best Practices for User Identification

- **Set early in the session**: Add user identity information as early as possible
- **Be consistent**: Use the same identifiers across app sessions
- **Protect privacy**: Avoid storing PII directly; use IDs, hashes, or references instead
- **Use appropriate lifespans**: Consider how long each piece of user data should persist
- **Layer your approach**: Combine user ID, personas, and session properties for comprehensive understanding
- **Segment strategically**: Create personas that align with key business and technical metrics
- **Update when needed**: Change user context when user status changes (e.g., after login/logout)

### Implementation Timing

Implement user identification:

- After a user logs in
- When a user completes an important action (e.g., makes a purchase)
- When a user's status changes (e.g., becomes a VIP)
- At the start of important workflows
- After significant state changes

### Common Implementation Patterns

#### Authentication Flow User Identification

Implement user identification throughout the authentication lifecycle:

```swift
class AuthenticationFlow {
    func handleSignUp(email: String, userTier: String) async throws {
        // Track signup attempt
        EmbraceIO.shared.log("User signup initiated", severity: .info)

        do {
            let user = try await performSignUp(email: email)

            // Set user identification immediately after signup (use anonymized ID)
            EmbraceIO.shared.userIdentifier = user.anonymizedId

            // Add personas for new user
            EmbraceIO.shared.addPersona(
                "new_user",
                lifespan: .session
            )
            EmbraceIO.shared.addPersona(
                userTier.lowercased(),
                lifespan: .permanent
            )

            // Track successful signup
            EmbraceIO.shared.log(
                "User signup completed",
                severity: .info,
                attributes: [
                    "auth.signup_method": "email",
                    "user.tier": userTier
                ]
            )

        } catch {
            EmbraceIO.shared.log(
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
            EmbraceIO.shared.userIdentifier = user.anonymizedId

            // Remove new_user persona if present, add authenticated
            EmbraceIO.shared.removePersona(
                "new_user",
                lifespan: .session
            )
            EmbraceIO.shared.addPersona(
                "authenticated",
                lifespan: .session
            )

            // Add user tier information
            EmbraceIO.shared.addPersona(
                user.tier.lowercased(),
                lifespan: .permanent
            )

            // Track login success
            EmbraceIO.shared.log(
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
            EmbraceIO.shared.log(
                "User login failed",
                severity: .warn,
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
        if let userId = EmbraceIO.shared.userIdentifier {
            EmbraceIO.shared.log(
                "User logout initiated",
                severity: .info,
                attributes: [
                    "user.was_authenticated": "true"
                ]
            )
        }

        // Clear user identification but preserve some anonymous analytics
        EmbraceIO.shared.userIdentifier = nil
        EmbraceIO.shared.removeAllProperties(lifespans: [.session, .process, .permanent])

        // Remove authenticated persona, keep anonymous tracking
        EmbraceIO.shared.removePersona(
            "authenticated",
            lifespan: .session
        )
        EmbraceIO.shared.addPersona(
            "anonymous",
            lifespan: .session
        )
    }
}
```

#### Feature Gating and A/B Testing

Use user identification for feature access control and testing:

```swift
class FeatureGateManager {
    func checkFeatureAccess(feature: String) -> Bool {
        let hasAccess = determineFeatureAccess(feature: feature)

        // Track feature access attempts
        EmbraceIO.shared.log(
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
            EmbraceIO.shared.addPersona(
                "\(feature)_user",
                lifespan: .session
            )
        }

        return hasAccess
    }

    func enrollInExperiment(experimentId: String, variant: String) {
        // Track A/B test enrollment
        EmbraceIO.shared.setProperty(
            key: "experiment.\(experimentId)",
            value: variant,
            lifespan: .session
        )

        // Add experiment personas
        EmbraceIO.shared.addPersona(
            "experiment_\(experimentId)",
            lifespan: .session
        )
        EmbraceIO.shared.addPersona(
            "variant_\(variant)",
            lifespan: .session
        )

        EmbraceIO.shared.log(
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
        return EmbraceIO.shared.userIdentifier != nil
    }

    private func getCurrentExperimentCount() -> Int {
        // Implementation would count active experiments for this user
        return 0
    }
}
```

#### Progressive User Journey Tracking

Track user progression through onboarding and feature adoption:

```swift
class UserJourneyTracker {
    func trackOnboardingProgress(step: OnboardingStep, completed: Bool) {
        let stepName = step.rawValue

        // Update onboarding progress
        EmbraceIO.shared.setProperty(
            key: "onboarding.current_step",
            value: stepName,
            lifespan: .session
        )

        if completed {
            EmbraceIO.shared.setProperty(
                key: "onboarding.completed_steps",
                value: getCompletedStepsString(),
                lifespan: .permanent
            )

            // Add milestone personas
            EmbraceIO.shared.addPersona(
                "onboarding_\(stepName)_completed",
                lifespan: .permanent
            )
        }

        // Check if onboarding is complete
        if isOnboardingComplete() {
            EmbraceIO.shared.addPersona(
                "onboarding_complete",
                lifespan: .permanent
            )
            EmbraceIO.shared.removePersona(
                "new_user",
                lifespan: .session
            )
        }

        EmbraceIO.shared.log(
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
            EmbraceIO.shared.setProperty(
                key: "features.adopted",
                value: getAdoptedFeaturesString(),
                lifespan: .permanent
            )

            EmbraceIO.shared.addPersona(
                "\(feature)_adopter",
                lifespan: .permanent
            )

            // Check for power user status
            if getAdoptedFeaturesCount() >= 5 {
                EmbraceIO.shared.addPersona(
                    "power_user",
                    lifespan: .permanent
                )
            }
        }

        EmbraceIO.shared.log(
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
        EmbraceIO.shared.addPersona(
            milestone.rawValue,
            lifespan: .permanent
        )

        // Update user level/tier if applicable
        if let newTier = milestone.associatedTier {
            EmbraceIO.shared.setProperty(
                key: "user.tier",
                value: newTier,
                lifespan: .permanent
            )
        }

        EmbraceIO.shared.log(
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

#### Privacy-Safe User Segmentation

Implement user identification while respecting privacy:

```swift
class PrivacySafeUserIdentification {
    func setUserIdentification(email: String, consentLevel: ConsentLevel) {
        // Use hashed identifiers for privacy
        let hashedEmail = email.sha256
        EmbraceIO.shared.userIdentifier = hashedEmail

        // Set privacy level as metadata
        EmbraceIO.shared.setProperty(
            key: "user.privacy_consent_level",
            value: consentLevel.rawValue,
            lifespan: .permanent
        )

        // Note: Email storage should only be done if user explicitly consented
        // and your privacy policy allows it. Consider using hashed identifiers instead.

        // Add privacy-aware personas
        EmbraceIO.shared.addPersona(
            "consent_\(consentLevel.rawValue)",
            lifespan: .permanent
        )

        EmbraceIO.shared.log(
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
        EmbraceIO.shared.setProperty(
            key: "user.privacy_consent_level",
            value: newLevel.rawValue,
            lifespan: .permanent
        )

        // Clear any stored personal data if consent was withdrawn
        // (implementation depends on what data you're storing)

        // Update personas
        EmbraceIO.shared.removeAllPersonas(lifespans: [.permanent])
        EmbraceIO.shared.addPersona(
            "consent_\(newLevel.rawValue)",
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
