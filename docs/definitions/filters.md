---
title: Filters Definitions
description: Complete definitions of all available filters for querying your data
slug: /definitions/filters
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

<div class="filters-table">

| Filter | Key | Description | Behavior | Platforms | Pages | Constraints |
| --- | --- | --- | --- | --- | --- | --- |
| Completion | <span class="filters-table__key">completion</span> | — | Type: Choice (String)<br />Ops: Equals | All | All | Choices: `all`, `completed`, `exit` |
| Duration Bucket (Milliseconds) | <span class="filters-table__key">duration</span> | Duration of the ANR, bucketed by milliseconds. | Type: intrange<br />Ops: Equals | All | All | — |
| Method | <span class="filters-table__key">method</span> | — | Type: String<br />Ops: Equals, like | All | All | Length: 1-256 characters |
| Sample Type | <span class="filters-table__key">sample_type</span> | — | Type: Choice (String)<br />Ops: Equals, Not Equals | All | All | Choices: `first`, `best`, `ad` |

</div>

## App Filters

<div class="filters-table">

| Filter | Key | Description | Behavior | Platforms | Pages | Constraints |
| --- | --- | --- | --- | --- | --- | --- |
| App Version | <span class="filters-table__key">app_version</span> | Semantic version number of the app. | Type: String<br />Ops: Equals, Not Equals | All | All | Length: 1-256 characters |
| Build | <span class="filters-table__key">build</span> | — | Type: String<br />Ops: Equals, Not Equals | Android, iOS | All | Length: 1-64 characters |
| Environment | <span class="filters-table__key">environment</span> | Deployment environment of the app. | Type: String<br />Ops: Equals, Not Equals | Android, iOS | All | Length: 1-64 characters |
| Environment Detail | <span class="filters-table__key">environment_detail</span> | — | Type: String<br />Ops: Equals, Not Equals | Android, iOS | All | Length: 1-64 characters |
| Last View | <span class="filters-table__key">last_view</span> | — | Type: String<br />Ops: Equals, Not Equals, like, nlike | All | All | Length: 0-4096 characters |
| SDK Version | <span class="filters-table__key">sdk_version</span> | Embrace SDK semantic version. | Type: String<br />Ops: Equals, Not Equals | All | All | Length: 1-256 characters |

</div>

## Browser Filters

<div class="filters-table">

| Filter | Key | Description | Behavior | Platforms | Pages | Constraints |
| --- | --- | --- | --- | --- | --- | --- |
| Bot | <span class="filters-table__key">bot</span> | — | Type: Boolean<br />Ops: Equals, Not Equals | Web | All | — |
| Browser Major Version | <span class="filters-table__key">browser_major_version</span> | — | Type: int<br />Ops: Equals, Not Equals, Greater Than, Greater Than or Equal, Less Than, Less Than or Equal | Web | All | — |
| Browser Name | <span class="filters-table__key">browser_name</span> | — | Type: String<br />Ops: Equals, Not Equals, like, nlike | Web | All | Length: 1-256 characters |
| Browser Version | <span class="filters-table__key">browser_version</span> | — | Type: String<br />Ops: Equals, Not Equals, like, nlike | Web | All | Length: 1-256 characters |

</div>

## Child Span Filters

<div class="filters-table">

| Filter | Key | Description | Behavior | Platforms | Pages | Constraints |
| --- | --- | --- | --- | --- | --- | --- |
| Child Span Duration (Milliseconds) | <span class="filters-table__key">child_duration</span> | — | Type: int<br />Ops: Equals, Not Equals, Greater Than, Greater Than or Equal, Less Than, Less Than or Equal | All | Spans Instances | — |
| Child Span Event Name | <span class="filters-table__key">child_event_name</span> | — | Type: String<br />Ops: Equals, Not Equals, like, nlike | All | Spans Instances | Length: 1-256 characters |
| Child Span Name | <span class="filters-table__key">child_name</span> | — | Type: String<br />Ops: Equals, Not Equals, like, nlike | All | Spans Instances | Length: 1-256 characters |
| Child Span Outcome | <span class="filters-table__key">child_outcome</span> | — | Type: Choice (String)<br />Ops: Equals | All | Spans Instances | Length: 1-256 characters<br />Choices: `successful`, `failure`, `user_abandon`, `unknown` |

</div>

## Crash Filters

<div class="filters-table">

| Filter | Key | Description | Behavior | Platforms | Pages | Constraints |
| --- | --- | --- | --- | --- | --- | --- |
| Crash ID | <span class="filters-table__key">crash_group_id</span> | — | Type: String<br />Ops: Equals | Android, iOS | Sessions | Length: exactly 32 characters |
| File Name | <span class="filters-table__key">file</span> | — | Type: String<br />Ops: Equals, Not Equals, like, nlike | Android, iOS | All | Length: 1-256 characters |
| Framework | <span class="filters-table__key">framework</span> | — | Type: Choice (String)<br />Ops: Equals | Android, iOS | All | Choices: `native`, `react_native`, `unity` |
| Message | <span class="filters-table__key">msg</span> | Message describing the crash. | Type: String<br />Ops: like | Android, iOS | All | Length: 1-1024 characters |
| Symbol | <span class="filters-table__key">symbol</span> | — | Type: String<br />Ops: Equals, Not Equals, like, nlike | Android, iOS | All | Length: 1-256 characters |
| Tag Name | <span class="filters-table__key">tag_name</span> | — | Type: String<br />Ops: Equals, Not Equals | Android, iOS | All | Length: 1-256 characters |
| Tag Name/Value | <span class="filters-table__key">tag</span> | — | Type: property<br />Ops: Equals, Not Equals | Android, iOS | All | — |

</div>

## Device Filters

<div class="filters-table">

| Filter | Key | Description | Behavior | Platforms | Pages | Constraints |
| --- | --- | --- | --- | --- | --- | --- |
| Country ISO | <span class="filters-table__key">country</span> | Device's country as a two letter ISO country code. | Type: String<br />Ops: Equals, Not Equals | All | All | Length: exactly 2 characters |
| Device Type | <span class="filters-table__key">device_type</span> | — | Type: Choice (String)<br />Ops: Equals | Web | All | Choices: `desktop`, `mobile`, `tablet` |
| Device Type | <span class="filters-table__key">model_type</span> | — | Type: String<br />Ops: Equals, Not Equals | All | All | Length: 1-256 characters |
| Jailbroken | <span class="filters-table__key">jailbroken</span> | Whether or not the device running an app is jailbroken. | Type: Boolean<br />Ops: Equals, Not Equals | Android, iOS | All | — |
| Js Patch | <span class="filters-table__key">js_patch</span> | — | Type: String<br />Ops: Equals, Not Equals, like, nlike | All | All | Length: 1-256 characters |
| Manufacturer | <span class="filters-table__key">manufacturer</span> | Name of the device hardware manufacturer. | Type: String<br />Ops: Equals, Not Equals, like, nlike | All | All | Length: 0-256 characters |
| Model Factory Name | <span class="filters-table__key">model</span> | Device hardware model identifier. | Type: String<br />Ops: Equals, Not Equals, like, nlike | Android, iOS | All | Length: 1-256 characters |
| Model Name | <span class="filters-table__key">model_market_name</span> | — | Type: String<br />Ops: Equals, Not Equals, like, nlike | Android, iOS | All | Length: 0-256 characters |
| Region | <span class="filters-table__key">region</span> | Geographic region within a country, such as a state or province. | Type: String<br />Ops: Equals, Not Equals | All | All | Length: 1-256 characters |

</div>

## Exception Filters

<div class="filters-table">

| Filter | Key | Description | Behavior | Platforms | Pages | Constraints |
| --- | --- | --- | --- | --- | --- | --- |
| Is Handled | <span class="filters-table__key">is_handled</span> | — | Type: Boolean<br />Ops: Equals, Not Equals | All | All | — |
| Severity Score | <span class="filters-table__key">severity_score</span> | — | Type: float<br />Ops: Equals, Not Equals, Greater Than, Greater Than or Equal, Less Than, Less Than or Equal | Web | All | — |
| The group ID for the ANR. | <span class="filters-table__key">group_id</span> | — | Type: String<br />Ops: Equals | All | All | Length: exactly 32 characters |

</div>

## Log Filters

<div class="filters-table">

| Filter | Key | Description | Behavior | Platforms | Pages | Constraints |
| --- | --- | --- | --- | --- | --- | --- |
| Aggregated Message | <span class="filters-table__key">log_msg</span> | An aggregated form of the log message, with common patterns or high cardinality parts replaced. | Type: String<br />Ops: like | All | Sessions | Length: 1-256 characters |
| File Attachment Error | <span class="filters-table__key">attachment_error</span> | — | Type: Choice (String)<br />Ops: Equals | All | All | Choices: `ATTACHMENT_TOO_LARGE`, `OVER_MAX_ATTACHMENTS`, `UNKNOWN` |
| Has File Attachment | <span class="filters-table__key">has_attachment</span> | — | Type: Boolean<br />Ops: Equals | All | All | — |
| Has Logs | <span class="filters-table__key">has_log</span> | — | Type: Choice (String)<br />Ops: Equals | All | Sessions | Choices: `true` |
| Type | <span class="filters-table__key">log_type</span> | — | Type: Choice (String)<br />Ops: Equals | All | Sessions | Choices: `info`, `warning`, `error`, `system` |
| Type | <span class="filters-table__key">type</span> | — | Type: Choice (String)<br />Ops: Equals | All | Widget, Custom Metric, Logs, Alert | Choices: `info`, `warning`, `error`, `system` |

</div>

## Moment Filters

<div class="filters-table">

| Filter | Key | Description | Behavior | Platforms | Pages | Constraints |
| --- | --- | --- | --- | --- | --- | --- |
| Moment Name | <span class="filters-table__key">name</span> | — | Type: String<br />Ops: Equals, Not Equals, like, nlike | All | All | Length: 1-256 characters |
| Moment Property Key | <span class="filters-table__key">moment_property_key</span> | — | Type: String<br />Ops: Equals | All | All | Length: 1-256 characters |
| Moment Property Value | <span class="filters-table__key">moment_property_value</span> | — | Type: String<br />Ops: Equals | All | All | Length: 1-256 characters |
| Outcome | <span class="filters-table__key">outcome</span> | — | Type: Choice (String)<br />Ops: Equals | All | All | Choices: `abandon`, `complete`, `crash`, `slow`, `stall`, `normal` |

</div>

## Network Filters

<div class="filters-table">

| Filter | Key | Description | Behavior | Platforms | Pages | Constraints |
| --- | --- | --- | --- | --- | --- | --- |
| Connection Error | <span class="filters-table__key">connection_error</span> | — | Type: Boolean<br />Ops: Equals | All | All | — |
| Domain | <span class="filters-table__key">domain</span> | Domain of the HTTP network request. | Type: String<br />Ops: Equals, Not Equals, like, nlike | All | All | Length: 1-128 characters |
| Duration Bucket (Milliseconds) | <span class="filters-table__key">duration_bucket</span> | — | Type: int<br />Ops: Equals, Not Equals, Greater Than, Greater Than or Equal, Less Than, Less Than or Equal | All | All | — |
| First Party | <span class="filters-table__key">is_first_party</span> | — | Type: Boolean<br />Ops: Equals | All | All | — |
| Has Connection Error | <span class="filters-table__key">has_connection_error</span> | — | Type: Boolean<br />Ops: Equals, Not Equals | All | All | — |
| Path | <span class="filters-table__key">path</span> | Path element of the URL for an HTTP network request. | Type: String<br />Ops: Equals, like | All | All | Length: 1-1024 characters |
| Status Code Range | <span class="filters-table__key">status_code</span> | Filter by a range of HTTP response status codes. | Type: intrange<br />Ops: Equals | All | All | — |
| Status Code Single | <span class="filters-table__key">status_code_single</span> | Filter by a specific HTTP response status code. | Type: int<br />Ops: Equals, Not Equals, Greater Than, Greater Than or Equal, Less Than, Less Than or Equal | All | All | — |

</div>

## OS Filters

<div class="filters-table">

| Filter | Key | Description | Behavior | Platforms | Pages | Constraints |
| --- | --- | --- | --- | --- | --- | --- |
| OS Major Version | <span class="filters-table__key">os_major_version</span> | The major version of the OS. | Type: int<br />Ops: Equals, Not Equals, Greater Than, Greater Than or Equal, Less Than, Less Than or Equal | All | All | — |
| OS Name | <span class="filters-table__key">os_name</span> | Device operating system name. | Type: String<br />Ops: Equals, Not Equals, like, nlike | Web | All | Length: 1-256 characters |
| OS Version | <span class="filters-table__key">os_version</span> | Full operation system version. | Type: String<br />Ops: Equals, Not Equals | All | All | Length: 1-256 characters |

</div>

## Root Span Filters

<div class="filters-table">

| Filter | Key | Description | Behavior | Platforms | Pages | Constraints |
| --- | --- | --- | --- | --- | --- | --- |
| Root Span Duration (Milliseconds) | <span class="filters-table__key">root_span_duration</span> | — | Type: int<br />Ops: Equals, Not Equals, Greater Than, Greater Than or Equal, Less Than, Less Than or Equal | All | Spans Instances, Custom Metric, Alert, Widget | — |
| Root Span Duration Bucket (Milliseconds) | <span class="filters-table__key">root_span_duration_bucket</span> | — | Type: int<br />Ops: Equals, Not Equals, Greater Than, Greater Than or Equal, Less Than, Less Than or Equal | All | Custom Metric, Alert | — |
| Root Span Event Name | <span class="filters-table__key">root_span_event_name</span> | — | Type: String<br />Ops: Equals, Not Equals, like, nlike | All | Spans Instances, Alert | Length: 1-256 characters |
| Root Span Name | <span class="filters-table__key">root_span_name</span> | Name of the root span in a performance trace. | Type: String<br />Ops: Equals, Not Equals, like, nlike | All | All | Length: 1-256 characters |
| Root Span Outcome | <span class="filters-table__key">root_span_outcome</span> | — | Type: Choice (String)<br />Ops: Equals | All | Widget, Custom Metric, Spans Aggregated, Alert | Length: 1-256 characters<br />Choices: `successful`, `failure`, `user_abandon`, `unknown` |
| Slow Root Span | <span class="filters-table__key">root_span_type_slow</span> | — | Type: Boolean<br />Ops: Equals, Not Equals | All | Spans Instances, Custom Metric, Alert, Widget | — |

</div>

## Session Filters

<div class="filters-table">

| Filter | Key | Description | Behavior | Platforms | Pages | Constraints |
| --- | --- | --- | --- | --- | --- | --- |
| Active Interval Count | <span class="filters-table__key">active_interval_count</span> | — | Type: int<br />Ops: Equals, Not Equals, Greater Than, Greater Than or Equal, Less Than, Less Than or Equal | Android, iOS | All | — |
| Breadcrumb Message | <span class="filters-table__key">breadcrumb_message</span> | — | Type: String<br />Ops: Equals, like | All | All | Length: 1-256 characters |
| Has ANR Exit | <span class="filters-table__key">has_anr</span> | True if the app exited while an ANR was occurring. | Type: Boolean<br />Ops: Equals | All | All | — |
| Has ANR Exit | <span class="filters-table__key">has_anr_exit</span> | True if the app exited while an ANR was occurring. | Type: Boolean<br />Ops: Equals | All | All | — |
| Has Cold Start | <span class="filters-table__key">is_cold</span> | True if this session is a cold start of the app. | Type: Boolean<br />Ops: Equals, Not Equals | All | All | — |
| Has Crash | <span class="filters-table__key">has_crash</span> | True if the session had a crash. | Type: Boolean<br />Ops: Equals, Not Equals | Android, iOS | All | — |
| Has Low Memory Warning | <span class="filters-table__key">has_low_memory</span> | — | Type: Boolean<br />Ops: Equals, Not Equals | Android, iOS | All | — |
| Has OOM | <span class="filters-table__key">has_oom</span> | True if the session had an out-of-memory event. | Type: Boolean<br />Ops: Equals, Not Equals | Android, iOS | All | — |
| Inactive Interval Count | <span class="filters-table__key">inactive_interval_count</span> | — | Type: int<br />Ops: Equals, Not Equals, Greater Than, Greater Than or Equal, Less Than, Less Than or Equal | Android, iOS | All | — |
| Is First | <span class="filters-table__key">is_first</span> | True if this is the user's first session. | Type: Boolean<br />Ops: Equals, Not Equals | All | All | — |
| Network Connectivity | <span class="filters-table__key">network_connectivity</span> | Type of network connection the device is using. | Type: Choice (String)<br />Ops: Equals | Android, iOS | All | Choices: `mixed`, `none`, `wan`, `wifi` |
| State | <span class="filters-table__key">state</span> | Whether the app was in the foreground or background. | Type: Choice (String)<br />Ops: Equals, Not Equals | Android, iOS | All | Length: 1-64 characters<br />Choices: `foreground`, `background` |
| Was User Terminated | <span class="filters-table__key">has_user_terminated</span> | — | Type: Boolean<br />Ops: Equals, Not Equals | Android, iOS | All | — |

</div>

## Span Filters

<div class="filters-table">

| Filter | Key | Description | Behavior | Platforms | Pages | Constraints |
| --- | --- | --- | --- | --- | --- | --- |
| Has Slow Root Span | <span class="filters-table__key">span_type_slow</span> | — | Type: Boolean<br />Ops: Equals, Not Equals | All | Sessions | — |
| Span Duration (Milliseconds) | <span class="filters-table__key">span_duration</span> | — | Type: int<br />Ops: Equals, Not Equals, Greater Than, Greater Than or Equal, Less Than, Less Than or Equal | All | Alert, Custom Metric, Sessions, Widget | — |
| Span Duration Bucket (Milliseconds) | <span class="filters-table__key">span_duration_bucket</span> | — | Type: int<br />Ops: Equals, Not Equals, Greater Than, Greater Than or Equal, Less Than, Less Than or Equal | All | Alert, Custom Metric, Sessions, Widget | — |
| Span Event Name | <span class="filters-table__key">span_event_name</span> | — | Type: String<br />Ops: Equals, Not Equals, like, nlike | All | Alert, Custom Metric, Widget, Sessions | Length: 1-256 characters |
| Span Is Child | <span class="filters-table__key">is_child_span</span> | — | Type: Boolean<br />Ops: Equals, Not Equals | All | Alert, Custom Metric, Widget | — |
| Span Name | <span class="filters-table__key">span_name</span> | — | Type: String<br />Ops: Equals, Not Equals, like, nlike | All | Alert, Custom Metric, Widget, Sessions | Length: 1-256 characters |
| Span Outcome | <span class="filters-table__key">span_outcome</span> | — | Type: Choice (String)<br />Ops: Equals | All | Alert, Custom Metric, Widget, Sessions | Length: 1-256 characters<br />Choices: `successful`, `failure`, `user_abandon`, `unknown` |

</div>

## Surface Filters

<div class="filters-table">

| Filter | Key | Description | Behavior | Platforms | Pages | Constraints |
| --- | --- | --- | --- | --- | --- | --- |
| Surface Name | <span class="filters-table__key">surface_name</span> | — | Type: String<br />Ops: Equals, Not Equals, like, nlike | Web | All | Length: 1-256 characters |

</div>

## User Filters

<div class="filters-table">

| Filter | Key | Description | Behavior | Platforms | Pages | Constraints |
| --- | --- | --- | --- | --- | --- | --- |
| Embrace ID | <span class="filters-table__key">device_id</span> | — | Type: String<br />Ops: Equals, Not Equals | All | All | Length: exactly 32 characters |
| Persona | <span class="filters-table__key">persona</span> | — | Type: String<br />Ops: Equals, Not Equals, like, nlike | Android, iOS | All | Length: 1-256 characters |
| User Email | <span class="filters-table__key">user_email</span> | App user's email address. | Type: String<br />Ops: Equals, Not Equals | Android, iOS | All | Length: 1-256 characters |
| User ID | <span class="filters-table__key">user_id</span> | — | Type: String<br />Ops: Equals, Not Equals | All | All | Length: 0-256 characters |
| Username | <span class="filters-table__key">user_name</span> | App user's username. | Type: String<br />Ops: Equals, Not Equals | Android, iOS | All | Length: 1-256 characters |

</div>

## User Flow Filters

<div class="filters-table">

| Filter | Key | Description | Behavior | Platforms | Pages | Constraints |
| --- | --- | --- | --- | --- | --- | --- |
| User Flow Duration (Milliseconds) | <span class="filters-table__key">user_flow_duration</span> | — | Type: int<br />Ops: Equals, Not Equals, Greater Than, Greater Than or Equal, Less Than, Less Than or Equal | All | User Flows Summary, User Flows Instances, Alert | — |
| User Flow End Event Type | <span class="filters-table__key">user_flow_end_event_type</span> | — | Type: Choice (String)<br />Ops: Equals, Not Equals | All | User Flows Summary, User Flows Instances, Alert, Widget, Custom Metric | Length: 1-256 characters<br />Choices: `breadcrumb`, `crash`, `custom_view`, `log`, `network`, `session`, `span`, `user_tap`, `view`, `web_view` |
| User Flow Name | <span class="filters-table__key">user_flow_name</span> | — | Type: String<br />Ops: Equals, Not Equals | All | Crashes, Anrs, User Flows Summary, Alert, Widget, Custom Metric, Logs, Network | Length: 1-256 characters |
| User Flow Outcome | <span class="filters-table__key">user_flow_outcome</span> | — | Type: Choice (String)<br />Ops: Equals, Not Equals | All | User Flows Summary, Alert, Widget, Custom Metric | Length: 1-256 characters<br />Choices: `abandon`, `complete`, `error` |
| User Flow Outcome Reason | <span class="filters-table__key">user_flow_outcome_reason</span> | — | Type: Choice (String)<br />Ops: Equals, Not Equals | All | User Flows Summary, User Flows Instances, Alert, Widget, Custom Metric | Length: 1-256 characters<br />Choices: `app_exit`, `timeout`, `new_user_flow_started`, `crash` |
| User Flow Start Event Type | <span class="filters-table__key">user_flow_start_event_type</span> | — | Type: Choice (String)<br />Ops: Equals, Not Equals | All | User Flows Summary, User Flows Instances, Alert, Widget, Custom Metric | Length: 1-256 characters<br />Choices: `breadcrumb`, `custom_view`, `log`, `network`, `session`, `span`, `user_tap`, `view`, `web_view` |

</div>

## Web Resource Filters

<div class="filters-table">

| Filter | Key | Description | Behavior | Platforms | Pages | Constraints |
| --- | --- | --- | --- | --- | --- | --- |
| Render Blocking Status | <span class="filters-table__key">render_blocking_status</span> | — | Type: Choice (String)<br />Ops: Equals | All | All | Length: 1-256 characters<br />Choices: `blocking`, `non-blocking` |
| Resource Type | <span class="filters-table__key">resource_type</span> | — | Type: Choice (String)<br />Ops: Equals | All | All | Length: 1-256 characters<br />Choices: `script`, `stylesheet`, `image`, `font`, `video`, `audio`, `document`, `other` |

</div>

## Web Vital Filters

<div class="filters-table">

| Filter | Key | Description | Behavior | Platforms | Pages | Constraints |
| --- | --- | --- | --- | --- | --- | --- |
| Web Vital Rating | <span class="filters-table__key">rating</span> | — | Type: Choice (String)<br />Ops: Equals | All | Alert, Widget, Web Vitals | Length: 1-256 characters<br />Choices: `poor`, `needs_improvement`, `good` |

</div>

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

