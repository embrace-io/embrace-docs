---
title: Network Spans Forwarding
description: Correlate network spans between Embrace and your backend monitoring
sidebar_position: 2
---

# Network Spans Forwarding

For a full explanation of this feature please refer to the [Network Spans Forwarding Product Overview](/docs/product/network-spans-forwarding.md).  

## Enablement

Once all requirements described in [Enable Network Spans Forwarding](/docs/product/network-spans-forwarding.md#enable-network-spans-forwarding)
are met, the feature will be set up on the Embrace backend by an integrations specialist who will reach out to confirm
details. At that point everything should begin to work without any additional changes in your app instrumentation,
however there are a few SDK-side configurations that could affect the feature to be aware of:

```typescript
import { sdk } from '@embrace-io/web-sdk';

sdk.initSDK({
  appID: "YOUR_EMBRACE_APP_ID",
  appVersion: "YOUR_APP_VERSION",

  // Setting this to true blocks the Network Span Forwarding feature regardless
  // of what has been configured server-side
  blockNetworkSpanForwarding: true,

  // Setting registerGlobally to false, providing a custom propagator, or omitting
  // every network instrumentations are all not supported alongside Network Span Forwarding
  // and will cause that feature to turn off
  registerGlobally: false,
  propagator: myCustomPropagator,
  omit: new Set(['@opentelemetry/instrumentation-fetch', '@opentelemetry/instrumentation-xml-http-request']),
});
```

Also note that by default trace headers will not be included on outgoing CORS requests, this can be overridden for
particular URLs by configuring the fetch or XHR instrumentations with an allow list of strings and regexes:

```typescript
import { sdk } from '@embrace-io/web-sdk';

sdk.initSDK({
  appID: "YOUR_EMBRACE_APP_ID",
  appVersion: "YOUR_APP_VERSION",
  defaultInstrumentationConfig: {
    '@opentelemetry/instrumentation-fetch': {
      propagateTraceHeaderCorsUrls: [
        // URL strings or regexes to propagate trace headers for on fetch requests
      ],
    },
    '@opentelemetry/instrumentation-xml-http-request': {
      propagateTraceHeaderCorsUrls: [
        // URL strings or regexes to propagate trace headers for on XHR requests
      ],
    },
  },
});
```
