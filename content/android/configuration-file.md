---
title: Configuration File
weight: 11
---

# Android Configuration File

This is an example `embrace-config.json` file. Explanations for each of the fields are provided below.

```json
{
  "app_id": "NNNNN",
  "api_token": "0123456789abcdef0123456789abcdef",
  "sdk_config": {
    "networking": {
      "track_id_header": "my-header"
    },
    "taps": {
      "capture_coordinates": true
    },
  }  
}
```

### **app_id** *Required*

Your 5 character app ID.

### **app_token** *Required*

Your API token.

### **networking[track_id_header]**

Set the name of the header used for the trace ID.

### **taps[capture_coordinates]**

Set to false to disable capturing tap coordinates. Defaults to `true`.

