---
title: Report Unhandled Promise Rejections
sidebar_position: 8
---

# Report Unhandled Promise Rejections

The Embrace SDK can be configured to automatically log an error with a stack trace when it detects a promise rejection
that wasn't handled. This does add overhead to the use of Promises in your app so the feature is opt-in and can be
turned on using the `trackUnhandledRejections` flag:

```typescript
const {isStarted} = useEmbrace({
  ios: IOS_CONFIG,
  trackUnhandledRejections: true,
});
```

Note that this sets up a handler which supersedes the one setup by React Native for tracking unhandled promise
rejections, in particular in dev with this enabled you will no longer see this popup:

<img src={require('@site/static/images/rn-unhandled-promise-popup.png').default} />
