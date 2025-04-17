---
title: User Identification
description: Associate telemetry data with specific users in your iOS app
sidebar_position: 4
---

# User Identification

User identification in Embrace allows you to associate telemetry data with specific users, making it easier to troubleshoot issues, analyze user behavior, and provide personalized support.

## Why Identify Users?

Identifying users provides several benefits:
- Troubleshoot user-reported issues by finding their specific sessions
- Track a user's experience across multiple sessions
- Analyze behavior patterns for specific user segments
- Provide personalized customer support with session visibility
- Monitor the impact of changes on specific user cohorts

## Setting User Identity

You can set a user identifier at any point in your app. Typically, this is done after user authentication:

```swift
// After successful login
func didLogin(user: User) {
    // Set the user identifier
    Embrace.client?.setUserIdentifier(user.id)
    
    // Optionally add user information as attributes
    Embrace.client?.addSessionProperties([
        "user_tier": user.subscriptionTier,
        "account_age_days": String(user.accountAgeDays),
        "region": user.region
    ])
}
```

You can also update the user identifier if it changes during a session:

```swift
// If user switches accounts
func didSwitchAccount(to newUser: User) {
    Embrace.client?.setUserIdentifier(newUser.id)
}
```

## Clearing User Identity

When a user logs out, you should clear their identity:

```swift
func didLogout() {
    Embrace.client?.clearUserIdentifier()
    
    // Also consider clearing any user-specific session properties
    Embrace.client?.removeSessionProperty(key: "user_tier")
    Embrace.client?.removeSessionProperty(key: "account_age_days")
    Embrace.client?.removeSessionProperty(key: "region")
}
```

This ensures that future telemetry data isn't incorrectly associated with the previous user.

## User Personas

For apps that support multiple user roles or personas, you can track this information as a separate attribute:

```swift
// Set user persona or role
Embrace.client?.addSessionProperty(key: "user_role", value: "admin")

// Update if the role changes
func didChangeRole(to newRole: String) {
    Embrace.client?.addSessionProperty(key: "user_role", value: newRole)
}
```

## Anonymous Users

For users who haven't authenticated, you can still track them with a device or installation identifier:

```swift
// For anonymous users, you might use an installation ID
func setupAnonymousUser() {
    let installationId = getOrCreateInstallationId()
    Embrace.client?.setUserIdentifier(installationId)
    Embrace.client?.addSessionProperty(key: "is_anonymous", value: "true")
}

// When they authenticate, update the identifier
func didAuthenticate(userId: String) {
    Embrace.client?.setUserIdentifier(userId)
    Embrace.client?.addSessionProperty(key: "is_anonymous", value: "false")
}
```

## Privacy Considerations

When implementing user identification, consider these privacy best practices:

### Use Appropriate Identifiers

Choose identifiers that don't contain personally identifiable information (PII):
- Use database IDs or hashed values rather than email addresses or names
- Consider using randomly generated IDs that are mapped to users in your system

```swift
// Instead of this:
Embrace.client?.setUserIdentifier(user.email) // DON'T DO THIS

// Do this:
Embrace.client?.setUserIdentifier(user.id) // BETTER
```

### User Consent

Ensure you have appropriate user consent before tracking identifiable information:
- Update your privacy policy to reflect user tracking
- Consider providing opt-out mechanisms
- Comply with relevant privacy regulations (GDPR, CCPA, etc.)

```swift
// Example of respecting user preferences
if userSettings.hasOptedIntoAnalytics {
    Embrace.client?.setUserIdentifier(user.id)
} else {
    // Use anonymous tracking or no tracking
    Embrace.client?.clearUserIdentifier()
}
```

### Data Minimization

Only collect the user information you need:
- Avoid adding unnecessary user attributes
- Don't store sensitive user information as properties
- Regularly review what user data you're collecting

## Integration with Authentication Flows

Here's how to integrate user identification with common authentication patterns:

### Login Flow

```swift
class AuthenticationService {
    func login(username: String, password: String, completion: @escaping (Result<User, Error>) -> Void) {
        // Your authentication logic
        apiClient.authenticate(username: username, password: password) { result in
            switch result {
            case .success(let user):
                // Set user identifier on successful login
                Embrace.client?.setUserIdentifier(user.id)
                
                // Track user properties that are useful for troubleshooting
                Embrace.client?.addSessionProperties([
                    "user_tier": user.subscriptionTier,
                    "has_completed_onboarding": user.hasCompletedOnboarding ? "true" : "false"
                ])
                
                completion(.success(user))
                
            case .failure(let error):
                // Track failed login attempts
                Embrace.client?.logBreadcrumb(
                    name: "login_failed",
                    properties: ["reason": error.localizedDescription]
                )
                
                completion(.failure(error))
            }
        }
    }
}
```

### Logout Flow

```swift
func logout() {
    // Clear user data
    userManager.clearCurrentUser()
    
    // Clear Embrace user identifier
    Embrace.client?.clearUserIdentifier()
    
    // Clear user-related session properties
    let userPropertyKeys = ["user_tier", "has_completed_onboarding", "last_active"]
    for key in userPropertyKeys {
        Embrace.client?.removeSessionProperty(key: key)
    }
    
    // Navigate to login screen
    navigationController.popToRootViewController(animated: true)
}
```

### App Startup

```swift
func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    // Setup Embrace
    setupEmbrace()
    
    // Check if user is already logged in
    if let currentUser = userManager.currentUser {
        // User is logged in, set identifier
        Embrace.client?.setUserIdentifier(currentUser.id)
        
        // Set user properties
        updateUserProperties(for: currentUser)
    } else {
        // No logged in user, could use installation ID
        let installationId = getOrCreateInstallationId()
        Embrace.client?.setUserIdentifier(installationId)
        Embrace.client?.addSessionProperty(key: "is_anonymous", value: "true")
    }
    
    return true
}
```

## Best Practices

- Set the user identifier as early as possible in the session
- Use consistent identifiers across sessions
- Avoid using directly identifiable information (emails, names)
- Clear the identifier when users log out
- Use session properties to add useful, non-sensitive user context
- Add user segments or cohorts as session properties for better filtering

TODO: Add examples of how user identification appears in the Embrace dashboard
TODO: Add code samples for handling multiple users on shared devices
TODO: Add examples of integrating with identity management systems 