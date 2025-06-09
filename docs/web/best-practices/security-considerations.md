---
title: Security Considerations
description: Security best practices for using the Embrace Web SDK
sidebar_position: 2
---

# Security Considerations

When implementing the Embrace Web SDK, it's essential to consider security and privacy implications. Following these
best practices will help you protect sensitive data and comply with privacy regulations.

## Data Privacy

### Sensitive Data Protection

Be careful not to log sensitive user information:

```typescript
// DON'T: Log sensitive personal information
log.message(`User password is ${password}`, 'info');
log.message(`Credit card ${cardNumber} verified`, 'info');

// DO: Log non-identifying information
session.addBreadcrumb('Password validation completed');
session.addBreadcrumb('Payment method verified');
```

Be mindful that exceptions and stack traces may contain sensitive information as well.

## User Consent and Compliance

### GDPR, CCPA, and Other Privacy Regulations

Consider implementing mechanisms to respect user privacy choices:

```typescript
function updatePrivacyConsent(userConsented: boolean) {
    if (userConsented) {
      // Start Embrace with user consent
      sdk.initSDK({
        appID: "YOUR_EMBRACE_APP_ID",
        appVersion: "YOUR_APP_VERSION",
      });
    } else {
      // If user does not consent, don't start Embrace
      // or limit what you collect
    }
}
```

### Data Retention

Be aware of Embrace's data retention policies and how they align with your privacy obligations. Configure your Embrace
Dashboard settings appropriately.

## Regular Security Reviews

Regularly review the data being collected by Embrace to ensure it aligns with your privacy policy and security
requirements. Use the Embrace dashboard to audit what data is being captured.

## Summary

- Avoid logging sensitive user information
- Respect user privacy choices and regulatory requirements
- Use different configurations for development and production
- Regularly audit collected data for privacy compliance

By implementing these security best practices, you can benefit from Embrace's monitoring capabilities while maintaining
strong security and privacy standards for your users.
