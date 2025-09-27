---
title: Exceptions
description: Automatically capture unhandled exceptions in your web app with Embrace
sidebar_position: 2
---

# Exceptions  

The Embrace SDK automatically captures unhandled exceptions that occur in your application providing visibility into
where and how often these are being triggered by your users.

## How Exception Tracking Works

The instrumentation will listen for any 'error' events that reach the global `window` object and record them as
unhandled exceptions. In addition, 'unhandledrejection' events are also listened for. In the case of promise rejections
the reason for the rejection is checked, if it is an Error object it is reported as is along with its stack trace.

If your code encounters an error but handles it itself this can still be reported to Embrace as a handled exception
following the steps described in [Logging Handled Exceptions](/web/manual-instrumentation/custom-logging.md#logging-handled-exceptions).

## Data Captured

For each unhandled exception the SDK captures its stack trace. In order for the stack traces to be symbolicated when
viewing them in the Embrace Dashboard ensure that you have properly uploaded sourcemaps following the steps outlined in
[Sourcemap Upload](/web/getting-started/sourcemap-uploads.md).

## Integration with Other Features

Exception tracking integrates with other Embrace features:

- Exceptions are associated with the current session
- Individual exception instances are grouped together in the Embrace Dashboard if they are triggered by the same
underlying code
- Alerts can be set on exception rates or to be notified if a previously resolved exception has resurfaced
