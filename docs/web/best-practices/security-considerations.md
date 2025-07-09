---
title: Security Considerations
description: Security best practices for using the Embrace Web SDK
sidebar_position: 2
---

# Security Considerations

When implementing the Embrace Web SDK, it's essential to consider security and privacy implications. Following these
best practices will help you protect sensitive data and comply with privacy regulations.

## Data Privacy

### Configure Attribute Scrubbers

The Spans and Logs emitted by the Embrace Web SDK contain attributes to provide additional context. Any sensitive data
contained in these attributes should be scrubbed before being exported. By default, the SDK contains scrubbers which
will check particular attributes related to URL information and redact sensitive tokens following recommendations from
the [OpenTelemetry Semantic Conventions](https://github.com/open-telemetry/semantic-conventions/blob/3b64cb31022feaacb410bfd6e571c1f19b5fbce0/docs/registry/attributes/url.md?plain=1#L34),
in particular they will:
* Redact credentials in URLs passed in the form of `https://username:password@www.example.com/`
* Redact any query string values for keys that are considered sensitive (defined in the SDK as
[`DEFAULT_SENSITIVE_TOKENS`](https://github.com/embrace-io/embrace-web-sdk/blob/5020e9ca919e7088a7ef42cc6ac9caaebfd1f370/src/sdk/defaultAttributeScrubbers.ts#L12))

This process can be customized by specifying additional sensitive query string keys to check for with
`additionalQueryParamsToScrub`:

```typescript
import { sdk } from '@embrace-io/web-sdk';

sdk.initSDK({
  appID: "YOUR_EMBRACE_APP_ID",
  appVersion: "YOUR_APP_VERSION",
  additionalQueryParamsToScrub: ['my-senstive-key', 'foo-token']
});
```

Custom attribute scrubbers can also be supplied to perform redactions on other attributes:

```typescript
import { sdk } from '@embrace-io/web-sdk';

sdk.initSDK({
  appID: "YOUR_EMBRACE_APP_ID",
  appVersion: "YOUR_APP_VERSION",
  attributeScrubbers: [
    { key: 'sensitive-attribute', scrub: value => '[REDACTED]' },
  ],
});
```

The default attribute scrubbing performed by the SDK can also be turned off by setting `enableDefaultAttributeScrubbing`
to false, though this is not recommended unless supplying your own attribute scrubbers to perform the redactions in
their place.

### Configure the Network Monitoring Auto-instrumentation

The [Network Monitoring](/docs/web/automatic-instrumentation/network-monitoring.md) auto-instrumentation records spans
for network requests triggered by your application which include attributes for the URLs being requested. By default,
sensitive tokens in these URLs are attempted to be redacted using the process described above in
[Configure Attribute Scrubbers](#configure-attribute-scrubbers). In addition, you can also configure the network
instrumentation to avoid tracking particular URLs altogether either by regex or exact match using its `ignoreUrls`
option:

```typescript
import { sdk } from '@embrace-io/web-sdk';

sdk.initSDK({
  appID: "YOUR_EMBRACE_APP_ID",
  appVersion: "YOUR_APP_VERSION",
  defaultInstrumentationConfig: {
    network: {
      ignoreUrls: [/sensitive-path/, 'https://auth.example.com/sensitive/'],
    },
  }
});
```

### Configure the User Interaction Auto-instrumentation

The [User Interactions](/docs/web/automatic-instrumentation/user-interactions.md) auto-instrumentation records a span
event whenever a user clicks on an element in your application. This event contains the pixel coordinates of the
click as well as a representation of the clicked element that uses its inner text. If this contains sensitive
information you can configure the click instrumentation to avoid tracking particular elements using its `shouldTrack`
option:

```typescript
import { sdk } from '@embrace-io/web-sdk';

sdk.initSDK({
  appID: "YOUR_EMBRACE_APP_ID",
  appVersion: "YOUR_APP_VERSION",
  defaultInstrumentationConfig: {
    click: {
      shouldTrack: (element) => !element.dataset.sensitive,
    }
  }
});
```

Alternatively you can still track the click but remove any sensitive data that might be in the inner text for a
particular element using its `innerTextForElement` option:

```typescript
import { sdk } from '@embrace-io/web-sdk';

sdk.initSDK({
  appID: "YOUR_EMBRACE_APP_ID",
  appVersion: "YOUR_APP_VERSION",
  defaultInstrumentationConfig: {
    click: {
      innerTextForElement: element => {
        if (element.dataset.sensitive) {
          return 'REDACTED';
        } else {
          return element.innerText;
        }
      },
    }
  }
});
```

### Avoid Sensitive Data in Manual Instrumentation

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

### Personally Identifiable Information (PII) in User IDs

When setting user identifiers, avoid using direct PII:

```typescript
// DON'T: Use direct PII as identifier
user.setUserId("john.smith@example.com");

// DO: Use hashed or tokenized identifiers
const hashedEmail = hashFunction(userEmail);
user.setUserId(hashedEmail);
```

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

- Configure the SDK to avoid collecting sensitive data from your application
- Avoid logging sensitive user information
- Respect user privacy choices and regulatory requirements
- Use different configurations for development and production
- Regularly audit collected data for privacy compliance

By implementing these security best practices, you can benefit from Embrace's monitoring capabilities while maintaining
strong security and privacy standards for your users.
