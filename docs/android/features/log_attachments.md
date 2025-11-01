---
title: Log Attachments
description: Add attachments to your log messages to monitor production performance within your mobile app.
sidebar_position: 18
---

# Log Attachments

## Overview

Embrace’s [Log Message API](/android/integration/log-message-api/) allows binary attachments to be added to log messages. This can be useful if you wish your log messages to contain a snapshot of your application state at a given point in time.

There are two ways that attachments can be added to log message: by uploading the attachment to Embrace, or by uploading the attachment to a 3rd party file host.

### Uploading attachments to Embrace

To upload an attachment to Embrace simply supply a `ByteArray` to the `attachment` parameter of `logMessage`:

```kotlin
Embrace.logMessage(
    message = "My log message",
    severity = Severity.INFO,
    properties = mapOf("my_key" to "my_value"),
    attachment = "{}".toByteArray(),
)
```

The attachment will be available for download from the Embrace dashboard.

### Uploading attachments to 3rd party file hosts

To upload an attachment to a 3rd party file host, simply supply a random ID for `attachmentId` and the attachment download link to `attachmentUrl` of `logMessage`:

```kotlin
Embrace.logMessage(
    message = "My log message",
    severity = Severity.INFO,
    properties = mapOf("my_key" to "my_value"),
    attachmentId = UUID.randomUUID().toString(),
    attachmentUrl = "https://example.com/my-attachment",
)
```

The attachment will be available for download from the Embrace dashboard.

## Attachment limits

A maximum of 5 attachments per session can be uploaded. The maximum size per attachment is 1Mib.

If these limits are exceeded no attachment will be uploaded. The associated log message will be delivered as normal.

Binary attachments are not exported to OTel but the log record will contain attributes referencing the attachment.
