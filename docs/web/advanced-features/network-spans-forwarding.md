---
title: Network Spans Forwarding
description: Correlate network spans between Embrace and your backend monitoring
sidebar_position: 2
---

# Network Spans Forwarding

For a full explanation of this feature please refer to the [Network Spans Forwarding Product Overview](/data-forwarding/network-spans-forwarding.md).

## Enablement

Once all requirements described in [Enable Network Spans Forwarding](/data-forwarding/network-spans-forwarding.md#enable-network-spans-forwarding)
are met, the feature will be set up on the Embrace backend by an integrations specialist who will reach out to confirm
details. At that point network spans for non-CORS requests will forward without any additional changes in your app
instrumentation, however there are a few SDK-side configurations that prevent the feature to be aware of:

### Enabling for specific CORS requests

By default, the `traceparent` header will not be included on outgoing CORS requests. This is because the server being
hit may not be configured to allow additional headers for CORS requests (see [Access-Control-Allow-Headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Access-Control-Allow-Headers)).
You can specify particular URLs that you wish to forward CORS requests for and for which you know are allowed to accept
the additional header by configuring the fetch or XHR instrumentations with an allow list of strings and regexes:

```typescript
import { initSDK } from '@embrace-io/web-sdk';

initSDK({
  appID: "YOUR_EMBRACE_APP_ID",
  appVersion: "YOUR_APP_VERSION",
  defaultInstrumentationConfig: {
    '@opentelemetry/instrumentation-fetch': {
      propagateTraceHeaderCorsUrls: [
        /example\.com/, // propagates for any CORS requests with URLs that match the regex
        "https://www.example.com/foo", // propagates for CORS requests to URLs that exactly match the string
      ],
    },
    '@opentelemetry/instrumentation-xml-http-request': {
      propagateTraceHeaderCorsUrls: [
        /example\.com/, // propagates for any CORS requests with URLs that match the regex
        "https://www.example.com/foo", // propagates for CORS requests to URLs that exactly match the string
      ],
    },
  },
});
```

### Conflicting configuration

Particular configurations of the SDK are incompatible with Network Span Forwarding and will cause the feature to be
turned off if set:

```typescript
import { initSDK } from '@embrace-io/web-sdk';

initSDK({
  appID: "YOUR_EMBRACE_APP_ID",
  appVersion: "YOUR_APP_VERSION",

  // The following are not supported alongside Network Span Forwarding and will cause that feature to turn off:
  // 1. Setting registerGlobally to false
  registerGlobally: false,
  // 2. Providing a custom propagator
  propagator: myCustomPropagator,
  // 3. Omitting both network instrumentations
  defaultInstrumentationConfig: {
    omit: new Set(['@opentelemetry/instrumentation-fetch', '@opentelemetry/instrumentation-xml-http-request']),
  },
});
```

### Blocking client-side

A `blockNetworkSpanForwarding` configuration flag is available to block the Network Span Forwarding feature regardless
of what has been configured server-side:

```typescript
import { initSDK } from '@embrace-io/web-sdk';

initSDK({
  appID: "YOUR_EMBRACE_APP_ID",
  appVersion: "YOUR_APP_VERSION",

  blockNetworkSpanForwarding: true,
});
```
