---
title: Security Considerations
description: Security best practices for using the Embrace iOS SDK 6.x
sidebar_position: 2
---

# Security Considerations

When implementing the Embrace iOS SDK, it's essential to consider security and privacy implications. Following these best practices will help you protect sensitive data and comply with privacy regulations.

## Data Privacy

### Sensitive Data Protection

Be careful not to log sensitive user information:

```swift
// DON'T: Log sensitive personal information
Embrace.client.logMessage("User password is \(password)")
Embrace.client.logMessage("Credit card \(cardNumber) verified")

// DO: Log non-identifying information
Embrace.client.logMessage("Password validation completed")
Embrace.client.logMessage("Payment method verified")
```

### Personally Identifiable Information (PII)

When setting user identifiers, avoid using direct PII:

```swift
// DON'T: Use direct PII as identifier
Embrace.client.setUserIdentifier("john.smith@example.com")

// DO: Use hashed or tokenized identifiers
let hashedEmail = hashFunction(userEmail)
Embrace.client.setUserIdentifier(hashedEmail)
```

## Network Security

### Sanitizing URLs and Headers

Configure the NetworkCaptureService to sanitize sensitive information from URLs and headers:

```swift
let networkOptions = NetworkCaptureServiceOptions(
    urlSanitizer: { url in
        // Remove auth tokens from query parameters
        guard var components = URLComponents(url: url, resolvingAgainstBaseURL: false) else {
            return url
        }
        
        if let queryItems = components.queryItems {
            components.queryItems = queryItems.filter { 
                !["token", "auth", "key", "password"].contains($0.name.lowercased()) 
            }
        }
        
        return components.url ?? url
    },
    
    headerSanitizer: { key, value in
        // Filter out sensitive headers
        let sensitiveHeaders = ["Authorization", "Cookie", "X-API-Key"]
        if sensitiveHeaders.contains(key) {
            return (key, "[REDACTED]")
        }
        return (key, value)
    }
)
```

### Body Capture Considerations

Be extremely cautious with request and response body capture:

```swift
let networkOptions = NetworkCaptureServiceOptions(
    requestBodyCapturePredicate: { request, data in
        // Be very selective about capturing request bodies
        if let url = request.url, url.path.contains("/public/") {
            return true
        }
        return false // Default to not capturing
    },
    
    responseBodyCapturePredicate: { request, response, data in
        // Only capture specific non-sensitive responses
        if let url = request.url, url.path.contains("/public-data/") {
            return true
        }
        return false // Default to not capturing
    }
)
```

## User Consent and Compliance

### GDPR, CCPA, and Other Privacy Regulations

Consider implementing mechanisms to respect user privacy choices:

```swift
func updatePrivacyConsent(userConsented: Bool) {
    if userConsented {
        // Start Embrace with user consent
        try? Embrace.setup(options: options).start()
    } else {
        // If user does not consent, don't start Embrace
        // or limit what you collect
        try? Embrace.setup(options: limitedOptions).start()
    }
}
```

### Data Retention

Be aware of Embrace's data retention policies and how they align with your privacy obligations. Configure your Embrace dashboard settings appropriately.

## Secure Storage

### Local Storage

The Embrace SDK stores data locally before uploading it. Ensure your app implements appropriate file-level encryption:

```swift
// When implementing custom storage extensions
func secureData(_ data: Data) -> Data {
    // Implement appropriate encryption
    return encryptedData
}
```

## App Transport Security

Ensure your app and the Embrace SDK adhere to App Transport Security (ATS) requirements:

```xml
<!-- In your Info.plist -->
<key>NSAppTransportSecurity</key>
<dict>
    <key>NSAllowsArbitraryLoads</key>
    <false/>
    <!-- Only add exceptions if absolutely necessary -->
</dict>
```

## Security in Development Environments

### Debug vs. Release Configurations

Consider using different Embrace configurations for development and production:

```swift
#if DEBUG
let options = Embrace.Options(
    appId: "DEV_APP_ID",
    logLevel: .verbose
)
#else
let options = Embrace.Options(
    appId: "PROD_APP_ID",
    logLevel: .error
)
#endif
```

## Crash Reports and Stack Traces

Be mindful that crash reports may contain sensitive information:

```swift
// Configure crash reporter to filter sensitive data
let crashReporterOptions = CrashReporterOptions(
    filterCallback: { crashReport in
        // Implement filtering logic to sanitize crash reports
        return sanitizedReport
    }
)
```

## Regular Security Reviews

Regularly review the data being collected by Embrace to ensure it aligns with your privacy policy and security requirements. Use the Embrace dashboard to audit what data is being captured.

## Summary

- Avoid logging sensitive user information
- Properly sanitize network data, especially URLs, headers, and bodies
- Respect user privacy choices and regulatory requirements
- Use different configurations for development and production
- Regularly audit collected data for privacy compliance

By implementing these security best practices, you can benefit from Embrace's monitoring capabilities while maintaining strong security and privacy standards for your users.

TODO: Add information about how Embrace handles data encryption in transit and at rest 