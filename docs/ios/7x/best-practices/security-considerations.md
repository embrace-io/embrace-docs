---
title: Security Considerations
description: Security best practices for using the Embrace iOS SDK 7.x
sidebar_position: 2
---

## Security Considerations

When implementing the Embrace iOS SDK, it's essential to consider security and privacy implications. Following these best practices will help you protect sensitive data and comply with privacy regulations.

### Data Privacy

#### Sensitive Data Protection

Be careful not to log sensitive user information:

```swift
// DON'T: Log sensitive personal information
EmbraceIO.shared.log("User password is \(password)", severity: .info)
EmbraceIO.shared.log("Credit card \(cardNumber) verified", severity: .info)

// DO: Log non-identifying information
EmbraceIO.shared.log("Password validation completed", severity: .info)
EmbraceIO.shared.log("Payment method verified", severity: .info)
```

#### Personally Identifiable Information (PII)

When setting user identifiers, avoid using direct PII:

```swift
// DON'T: Use direct PII as identifier
EmbraceIO.shared.userIdentifier = "john.smith@example.com"

// DO: Use hashed or tokenized identifiers
let hashedEmail = hashFunction(userEmail)
EmbraceIO.shared.userIdentifier = hashedEmail
```

### Network Security

#### Sanitizing URLs and Headers

Implement a `URLSessionRequestsDataSource` and assign it to `URLSessionCaptureService.Options.requestsDataSource` to sanitize sensitive information from URLs and headers before it is captured. This only affects the data recorded by Embrace, not the request your app actually sends:

```swift
class SanitizingDataSource: NSObject, URLSessionRequestsDataSource {
    func modifiedRequest(for request: URLRequest) -> URLRequest {
        var newRequest = request

        // Redact sensitive headers
        for key in ["Authorization", "Cookie", "X-API-Key"] {
            if newRequest.value(forHTTPHeaderField: key) != nil {
                newRequest.setValue("[REDACTED]", forHTTPHeaderField: key)
            }
        }

        // Remove auth tokens from query parameters
        if let url = newRequest.url,
           var components = URLComponents(url: url, resolvingAgainstBaseURL: false) {
            components.queryItems = components.queryItems?.filter {
                !["token", "auth", "key", "password"].contains($0.name.lowercased())
            }
            newRequest.url = components.url
        }

        return newRequest
    }
}

let networkOptions = URLSessionCaptureService.Options(
    requestsDataSource: SanitizingDataSource()
)
```

#### Ignoring Sensitive Endpoints

To keep sensitive endpoints out of Embrace entirely, add them to `ignoredURLs` so they are not captured at all:

```swift
let networkOptions = URLSessionCaptureService.Options(
    ignoredURLs: ["/auth/", "/payments/"]
)
```

### User Consent and Compliance

#### GDPR, CCPA, and Other Privacy Regulations

Consider implementing mechanisms to respect user privacy choices:

```swift
func updatePrivacyConsent(userConsented: Bool) {
    if userConsented {
        // Start Embrace with user consent
        try? EmbraceIO.start(options: options)
    } else {
        // If user does not consent, don't start Embrace
        // or limit what you collect
        try? EmbraceIO.start(options: limitedOptions)
    }
}
```

#### Data Retention

Be aware of Embrace's data retention policies and how they align with your privacy obligations. Configure your Embrace dashboard settings appropriately.

### Secure Storage

#### Local Storage

The Embrace SDK stores data locally before uploading it. Ensure your app implements appropriate file-level encryption:

```swift
// When implementing custom storage extensions
func secureData(_ data: Data) -> Data {
    // Implement appropriate encryption
    return encryptedData
}
```

### App Transport Security

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

### Security in Development Environments

#### Debug vs. Release Configurations

Consider using different Embrace configurations for development and production:

```swift
#if DEBUG
let options = EmbraceIO.Options.withAppId(
    "DEV_APP_ID",
    logLevel: .verbose
)
#else
let options = EmbraceIO.Options.withAppId(
    "PROD_APP_ID",
    logLevel: .error
)
#endif
```

### Crash Reports and Stack Traces

Be mindful that crash reports may contain sensitive information. The crash reporter is selected through the `crashReporter:` parameter of `EmbraceIO.Options` — `.embrace` (default), `.crashlytics`, or `.none`. If your compliance requirements prevent collecting crash reports, disable them with `.none`:

```swift
let options = EmbraceIO.Options.withAppId(
    "YOUR_APP_ID",
    crashReporter: .none // Disable crash reporting
)
```

Avoid placing sensitive data in session properties, logs, or span attributes, since that context can surface alongside crash reports.

### Regular Security Reviews

Regularly review the data being collected by Embrace to ensure it aligns with your privacy policy and security requirements. Use the Embrace dashboard to audit what data is being captured.

### Summary

- Avoid logging sensitive user information
- Properly sanitize network data, especially URLs, headers, and bodies
- Respect user privacy choices and regulatory requirements
- Use different configurations for development and production
- Regularly audit collected data for privacy compliance

By implementing these security best practices, you can benefit from Embrace's monitoring capabilities while maintaining strong security and privacy standards for your users.

<!-- TODO: Add information about how Embrace handles data encryption in transit and at rest  -->
