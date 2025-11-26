---
title: Filter Reference
description: Complete reference of all available filters for querying your data
slug: /product/filters-reference
sidebar_class_name: hidden-filter-reference
---

# Filter Reference

Filters allow you to query and segment your data in the Embrace dashboard. Use filters to narrow down sessions, crashes, and other telemetry data based on specific criteria.

## How to Use Filters

Each filter supports different operations and data types. When building queries:

- **Equals** - Exact match
- **Not Equals** - Exclude matches
- **Greater Than** - Numeric comparison (value must be greater)
- **Less Than** - Numeric comparison (value must be less)
- **Contains** - Text contains the specified substring
- **In** - Value is in a list of options

---

## ANR Filters

| Filter | Key | Description | Type | Operations | Platforms | Pages | Constraints |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Completion | `completion` | — | Choice (String) | Equals | All | All Pages | Choices: `all`, `completed`, `exit` |
| Duration Bucket (Milliseconds) | `duration` | Duration of the ANR, bucketed by milliseconds. | intrange | Equals | All | All Pages | — |
| Method | `method` | — | String | Equals, like | All | All Pages | Length: 1-256 characters |
| Sample Type | `sample_type` | — | Choice (String) | Equals, Not Equals | All | All Pages | Choices: `first`, `best`, `ad` |

## App Filters

| Filter | Key | Description | Type | Operations | Platforms | Pages | Constraints |
| --- | --- | --- | --- | --- | --- | --- | --- |
| App Version | `app_version` | Semantic version number of the app. | String | Equals, Not Equals | All | All Pages | Length: 1-256 characters |
| Build | `build` | — | String | Equals, Not Equals | Android, iOS | All Pages | Length: 1-64 characters |
| Environment | `environment` | Deployment environment of the app. | String | Equals, Not Equals | Android, iOS | All Pages | Length: 1-64 characters |
| Environment Detail | `environment_detail` | — | String | Equals, Not Equals | Android, iOS | All Pages | Length: 1-64 characters |
| Last View | `last_view` | — | String | Equals, Not Equals, like, nlike | All | All Pages | Length: 0-4096 characters |
| SDK Version | `sdk_version` | Embrace SDK semantic version. | String | Equals, Not Equals | All | All Pages | Length: 1-256 characters |

## Browser Filters

| Filter | Key | Description | Type | Operations | Platforms | Pages | Constraints |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Bot | `bot` | — | Boolean | Equals, Not Equals | we | All Pages | — |
| Browser Major Version | `browser_major_version` | — | int | Equals, Not Equals, Greater Than, Greater Than or Equal, Less Than, Less Than or Equal | we | All Pages | — |
| Browser Name | `browser_name` | — | String | Equals, Not Equals, like, nlike | we | All Pages | Length: 1-256 characters |
| Browser Version | `browser_version` | — | String | Equals, Not Equals, like, nlike | we | All Pages | Length: 1-256 characters |

## Child Span Filters

| Filter | Key | Description | Type | Operations | Platforms | Pages | Constraints |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Child Span Duration (Milliseconds) | `child_duration` | — | int | Equals, Not Equals, Greater Than, Greater Than or Equal, Less Than, Less Than or Equal | All | Spans Instances | — |
| Child Span Event Name | `child_event_name` | — | String | Equals, Not Equals, like, nlike | All | Spans Instances | Length: 1-256 characters |
| Child Span Name | `child_name` | — | String | Equals, Not Equals, like, nlike | All | Spans Instances | Length: 1-256 characters |
| Child Span Outcome | `child_outcome` | — | Choice (String) | Equals | All | Spans Instances | Length: 1-256 characters<br />Choices: `successful`, `failure`, `user_abandon`, `unknown` |

## Crash Filters

| Filter | Key | Description | Type | Operations | Platforms | Pages | Constraints |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Crash ID | `crash_group_id` | — | String | Equals | Android, iOS | Sessions | Length: exactly 32 characters |
| File Name | `file` | — | String | Equals, Not Equals, like, nlike | Android, iOS | All Pages | Length: 1-256 characters |
| Framework | `framework` | — | Choice (String) | Equals | Android, iOS | All Pages | Choices: `native`, `react_native`, `unity` |
| Message | `msg` | Message describing the crash. | String | like | Android, iOS | All Pages | Length: 1-1024 characters |
| Symbol | `symbol` | — | String | Equals, Not Equals, like, nlike | Android, iOS | All Pages | Length: 1-256 characters |
| Tag Name | `tag_name` | — | String | Equals, Not Equals | Android, iOS | All Pages | Length: 1-256 characters |
| Tag Name/Value | `tag` | — | property | Equals, Not Equals | Android, iOS | All Pages | — |

## Device Filters

| Filter | Key | Description | Type | Operations | Platforms | Pages | Constraints |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Country ISO | `country` | Device's country as a two letter ISO country code. | String | Equals, Not Equals | All | All Pages | Length: exactly 2 characters |
| Device Type | `device_type` | — | Choice (String) | Equals | we | All Pages | Choices: `desktop`, `mobile`, `tablet` |
| Device Type | `model_type` | — | String | Equals, Not Equals | All | All Pages | Length: 1-256 characters |
| Jailbroken | `jailbroken` | Whether or not the device running an app is jailbroken. | Boolean | Equals, Not Equals | Android, iOS | All Pages | — |
| Js Patch | `js_patch` | — | String | Equals, Not Equals, like, nlike | All | All Pages | Length: 1-256 characters |
| Manufacturer | `manufacturer` | Name of the device hardware manufacturer. | String | Equals, Not Equals, like, nlike | All | All Pages | Length: 0-256 characters |
| Model Factory Name | `model` | Device hardware model identifier. | String | Equals, Not Equals, like, nlike | Android, iOS | All Pages | Length: 1-256 characters |
| Model Name | `model_market_name` | — | String | Equals, Not Equals, like, nlike | Android, iOS | All Pages | Length: 0-256 characters |
| Region | `region` | Geographic region within a country, such as a state or province. | String | Equals, Not Equals | All | All Pages | Length: 1-256 characters |

## Exception Filters

| Filter | Key | Description | Type | Operations | Platforms | Pages | Constraints |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Is Handled | `is_handled` | — | Boolean | Equals, Not Equals | All | All Pages | — |
| Severity Score | `severity_score` | — | float | Equals, Not Equals, Greater Than, Greater Than or Equal, Less Than, Less Than or Equal | we | All Pages | — |
| The group ID for the ANR. | `group_id` | — | String | Equals | All | All Pages | Length: exactly 32 characters |

## Log Filters

| Filter | Key | Description | Type | Operations | Platforms | Pages | Constraints |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Aggregated Message | `log_msg` | An aggregated form of the log message, with common patterns or high cardinality parts replaced. | String | like | All | Sessions | Length: 1-256 characters |
| File Attachment Error | `attachment_error` | — | Choice (String) | Equals | All | All Pages | Choices: `ATTACHMENT_TOO_LARGE`, `OVER_MAX_ATTACHMENTS`, `UNKNOWN` |
| Has File Attachment | `has_attachment` | — | Boolean | Equals | All | All Pages | — |
| Has Logs | `has_log` | — | Choice (String) | Equals | All | Sessions | Choices: `true` |
| Type | `log_type` | — | Choice (String) | Equals | All | Sessions | Choices: `info`, `warning`, `error`, `system` |
| Type | `type` | — | Choice (String) | Equals | All | Widget, Custom Metric, Logs, Alert | Choices: `info`, `warning`, `error`, `system` |

## Moment Filters

| Filter | Key | Description | Type | Operations | Platforms | Pages | Constraints |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Moment Name | `name` | — | String | Equals, Not Equals, like, nlike | All | All Pages | Length: 1-256 characters |
| Moment Property Key | `moment_property_key` | — | String | Equals | All | All Pages | Length: 1-256 characters |
| Moment Property Value | `moment_property_value` | — | String | Equals | All | All Pages | Length: 1-256 characters |
| Outcome | `outcome` | — | Choice (String) | Equals | All | All Pages | Choices: `abandon`, `complete`, `crash`, `slow`, `stall`, `normal` |

## Network Filters

| Filter | Key | Description | Type | Operations | Platforms | Pages | Constraints |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Connection Error | `connection_error` | — | Boolean | Equals | All | All Pages | — |
| Domain | `domain` | Domain of the HTTP network request. | String | Equals, Not Equals, like, nlike | All | All Pages | Length: 1-128 characters |
| Duration Bucket (Milliseconds) | `duration_bucket` | — | int | Equals, Not Equals, Greater Than, Greater Than or Equal, Less Than, Less Than or Equal | All | All Pages | — |
| First Party | `is_first_party` | — | Boolean | Equals | All | All Pages | — |
| Has Connection Error | `has_connection_error` | — | Boolean | Equals, Not Equals | All | All Pages | — |
| Path | `path` | Path element of the URL for an HTTP network request. | String | Equals, like | All | All Pages | Length: 1-1024 characters |
| Status Code Range | `status_code` | Filter by a range of HTTP response status codes. | intrange | Equals | All | All Pages | — |
| Status Code Single | `status_code_single` | Filter by a specific HTTP response status code. | int | Equals, Not Equals, Greater Than, Greater Than or Equal, Less Than, Less Than or Equal | All | All Pages | — |

## OS Filters

| Filter | Key | Description | Type | Operations | Platforms | Pages | Constraints |
| --- | --- | --- | --- | --- | --- | --- | --- |
| OS Major Version | `os_major_version` | The major version of the OS. | int | Equals, Not Equals, Greater Than, Greater Than or Equal, Less Than, Less Than or Equal | All | All Pages | — |
| OS Name | `os_name` | Device operating system name. | String | Equals, Not Equals, like, nlike | we | All Pages | Length: 1-256 characters |
| OS Version | `os_version` | Full operation system version. | String | Equals, Not Equals | All | All Pages | Length: 1-256 characters |

## Root Span Filters

| Filter | Key | Description | Type | Operations | Platforms | Pages | Constraints |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Root Span Duration (Milliseconds) | `root_span_duration` | — | int | Equals, Not Equals, Greater Than, Greater Than or Equal, Less Than, Less Than or Equal | All | Spans Instances, Custom Metric, Alert, Widget | — |
| Root Span Duration Bucket (Milliseconds) | `root_span_duration_bucket` | — | int | Equals, Not Equals, Greater Than, Greater Than or Equal, Less Than, Less Than or Equal | All | Custom Metric, Alert | — |
| Root Span Event Name | `root_span_event_name` | — | String | Equals, Not Equals, like, nlike | All | Spans Instances, Alert | Length: 1-256 characters |
| Root Span Name | `root_span_name` | Name of the root span in a performance trace. | String | Equals, Not Equals, like, nlike | All | All Pages | Length: 1-256 characters |
| Root Span Outcome | `root_span_outcome` | — | Choice (String) | Equals | All | Widget, Custom Metric, Spans Aggregated, Alert | Length: 1-256 characters<br />Choices: `successful`, `failure`, `user_abandon`, `unknown` |
| Slow Root Span | `root_span_type_slow` | — | Boolean | Equals, Not Equals | All | Spans Instances, Custom Metric, Alert, Widget | — |

## Session Filters

| Filter | Key | Description | Type | Operations | Platforms | Pages | Constraints |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Active Interval Count | `active_interval_count` | — | int | Equals, Not Equals, Greater Than, Greater Than or Equal, Less Than, Less Than or Equal | Android, iOS | All Pages | — |
| Breadcrumb Message | `breadcrumb_message` | — | String | Equals, like | All | All Pages | Length: 1-256 characters |
| Has ANR Exit | `has_anr` | True if the app exited while an ANR was occurring. | Boolean | Equals | All | All Pages | — |
| Has ANR Exit | `has_anr_exit` | True if the app exited while an ANR was occurring. | Boolean | Equals | All | All Pages | — |
| Has Cold Start | `is_cold` | True if this session is a cold start of the app. | Boolean | Equals, Not Equals | All | All Pages | — |
| Has Crash | `has_crash` | True if the session had a crash. | Boolean | Equals, Not Equals | Android, iOS | All Pages | — |
| Has Low Memory Warning | `has_low_memory` | — | Boolean | Equals, Not Equals | Android, iOS | All Pages | — |
| Has OOM | `has_oom` | True if the session had an out-of-memory event. | Boolean | Equals, Not Equals | Android, iOS | All Pages | — |
| Inactive Interval Count | `inactive_interval_count` | — | int | Equals, Not Equals, Greater Than, Greater Than or Equal, Less Than, Less Than or Equal | Android, iOS | All Pages | — |
| Is First | `is_first` | True if this is the user's first session. | Boolean | Equals, Not Equals | All | All Pages | — |
| Network Connectivity | `network_connectivity` | Type of network connection the device is using. | Choice (String) | Equals | Android, iOS | All Pages | Choices: `mixed`, `none`, `wan`, `wifi` |
| State | `state` | Whether the app was in the foreground or background. | Choice (String) | Equals, Not Equals | Android, iOS | All Pages | Length: 1-64 characters<br />Choices: `foreground`, `background` |
| Was User Terminated | `has_user_terminated` | — | Boolean | Equals, Not Equals | Android, iOS | All Pages | — |

## Span Filters

| Filter | Key | Description | Type | Operations | Platforms | Pages | Constraints |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Has Slow Root Span | `span_type_slow` | — | Boolean | Equals, Not Equals | All | Sessions | — |
| Span Duration (Milliseconds) | `span_duration` | — | int | Equals, Not Equals, Greater Than, Greater Than or Equal, Less Than, Less Than or Equal | All | Alert, Custom Metric, Sessions, Widget | — |
| Span Duration Bucket (Milliseconds) | `span_duration_bucket` | — | int | Equals, Not Equals, Greater Than, Greater Than or Equal, Less Than, Less Than or Equal | All | Alert, Custom Metric, Sessions, Widget | — |
| Span Event Name | `span_event_name` | — | String | Equals, Not Equals, like, nlike | All | Alert, Custom Metric, Widget, Sessions | Length: 1-256 characters |
| Span Is Child | `is_child_span` | — | Boolean | Equals, Not Equals | All | Alert, Custom Metric, Widget | — |
| Span Name | `span_name` | — | String | Equals, Not Equals, like, nlike | All | Alert, Custom Metric, Widget, Sessions | Length: 1-256 characters |
| Span Outcome | `span_outcome` | — | Choice (String) | Equals | All | Alert, Custom Metric, Widget, Sessions | Length: 1-256 characters<br />Choices: `successful`, `failure`, `user_abandon`, `unknown` |

## Surface Filters

| Filter | Key | Description | Type | Operations | Platforms | Pages | Constraints |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Surface Name | `surface_name` | — | String | Equals, Not Equals, like, nlike | we | All Pages | Length: 1-256 characters |

## User Filters

| Filter | Key | Description | Type | Operations | Platforms | Pages | Constraints |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Embrace ID | `device_id` | — | String | Equals, Not Equals | All | All Pages | Length: exactly 32 characters |
| Persona | `persona` | — | String | Equals, Not Equals, like, nlike | Android, iOS | All Pages | Length: 1-256 characters |
| User Email | `user_email` | App user's email address. | String | Equals, Not Equals | Android, iOS | All Pages | Length: 1-256 characters |
| User ID | `user_id` | — | String | Equals, Not Equals | All | All Pages | Length: 0-256 characters |
| Username | `user_name` | App user's username. | String | Equals, Not Equals | Android, iOS | All Pages | Length: 1-256 characters |

## User Flow Filters

| Filter | Key | Description | Type | Operations | Platforms | Pages | Constraints |
| --- | --- | --- | --- | --- | --- | --- | --- |
| User Flow Duration (Milliseconds) | `user_flow_duration` | — | int | Equals, Not Equals, Greater Than, Greater Than or Equal, Less Than, Less Than or Equal | All | User Flows Summary, User Flows Instances, Alert | — |
| User Flow End Event Type | `user_flow_end_event_type` | — | Choice (String) | Equals, Not Equals | All | User Flows Summary, User Flows Instances, Alert, Widget, Custom Metric | Length: 1-256 characters<br />Choices: `breadcrumb`, `crash`, `custom_view`, `log`, `network`, `session`, `span`, `user_tap`, `view`, `web_view` |
| User Flow Name | `user_flow_name` | — | String | Equals, Not Equals | All | Crashes, Anrs, User Flows Summary, Alert, Widget, Custom Metric, Logs, Network | Length: 1-256 characters |
| User Flow Outcome | `user_flow_outcome` | — | Choice (String) | Equals, Not Equals | All | User Flows Summary, Alert, Widget, Custom Metric | Length: 1-256 characters<br />Choices: `abandon`, `complete`, `error` |
| User Flow Outcome Reason | `user_flow_outcome_reason` | — | Choice (String) | Equals, Not Equals | All | User Flows Summary, User Flows Instances, Alert, Widget, Custom Metric | Length: 1-256 characters<br />Choices: `app_exit`, `timeout`, `new_user_flow_started`, `crash` |
| User Flow Start Event Type | `user_flow_start_event_type` | — | Choice (String) | Equals, Not Equals | All | User Flows Summary, User Flows Instances, Alert, Widget, Custom Metric | Length: 1-256 characters<br />Choices: `breadcrumb`, `custom_view`, `log`, `network`, `session`, `span`, `user_tap`, `view`, `web_view` |

## Web Resource Filters

| Filter | Key | Description | Type | Operations | Platforms | Pages | Constraints |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Render Blocking Status | `render_blocking_status` | — | Choice (String) | Equals | All | All Pages | Length: 1-256 characters<br />Choices: `blocking`, `non-blocking` |
| Resource Type | `resource_type` | — | Choice (String) | Equals | All | All Pages | Length: 1-256 characters<br />Choices: `script`, `stylesheet`, `image`, `font`, `video`, `audio`, `document`, `other` |

## Web Vital Filters

| Filter | Key | Description | Type | Operations | Platforms | Pages | Constraints |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Web Vital Rating | `rating` | — | Choice (String) | Equals | All | Alert, Widget, Web Vitals | Length: 1-256 characters<br />Choices: `poor`, `needs_improvement`, `good` |

## Common Filter Combinations

Here are some examples of commonly used filter combinations:

### Debug a Specific Version
- **App Version** equals `2.1.0`
- Combine with other filters to narrow down issues

### Find Users in a Specific Country
- **Country ISO** equals `US` (or any two-letter country code)
- Use with **App Version** to see regional adoption

### Analyze Latest Version Performance
- **App Version Set** equals `latest`
- Compare metrics against previous versions

