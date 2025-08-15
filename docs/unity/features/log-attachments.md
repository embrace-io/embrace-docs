---
title: Log Attachments
description: Add attachments to your log messages to monitor production performance within your mobile app.
sidebar_position: 15
---

# Log Attachments

## Overview

A new addition to the Embrace Unity SDK, the Log Attachments API allows binary attachments to be added to log messages. This can be useful if you wish to add arbitrary binary blobs that describe your application's state (such as game state) at a given point in time.

There are two ways to add attachments to the log message:  
- by uploading the attachment to Embrace
- by uploading the attachment to a 3rd party file host and appending the URL for that attachment to your call to the Log Attachments API.

### Uploading attachments to Embrace

To upload a binary attachment, provide a byte array (`sbyte` on Android, `byte` on iOS) to the `attachment` argument when calling `Embrace.LogMessage` as below:

```csharp
Embrace.Instance.LogMessage(
    message = "Message",
    severity = EMBSeverity.Info,
    properties = null,
    attachment = new byte[1024]
)
```

To upload an attachment with 3rd party file hosting, supply an `attachmentId` and `attachmentUrl`:

```csharp
Embrace.Instance.LogMessage(
    message = "Message",
    severity = EMBSeverity.Info,
    properties = null,
    attachmentId = new Guid.NewGuid().ToString(),
    attachmentUrl = "https://urltoyourasset.com"
)
```

## Attachment limits

A maximum of 5 attachments per session can be uploaded. The maximum size per attachment is 1Mib.

If these limits are exceeded no attachment will be uploaded. The associated log message will be delivered as normal.

Binary attachments are not exported to OTel but the log record will contain attributes referencing the attachment.