---
title: Filters Definitions
description: Complete definitions of all available filters for querying your data
slug: /definitions/filters
sidebar_class_name: hidden-filter-reference
---

# Filter Definitions

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

| Filter | Description | Details | Platform | Constraints |
| --- | --- | --- | --- | --- |
| Completion<br /><span class="filters-table__key">completion</span> | Whether the ANR completed or resulted in app exit. | Type: Choice (String)<br />Ops: Equals | All | Choices: `all`, `completed`, `exit` |
| Duration Bucket (Milliseconds)<br /><span class="filters-table__key">duration</span> | Duration of the ANR, bucketed by milliseconds. | Type: intrange<br />Ops: Equals | All | — |
| Method<br /><span class="filters-table__key">method</span> | The method name where the ANR occurred. | Type: String<br />Ops: Equals, like | All | Length: 1-256 characters |
| Sample Type<br /><span class="filters-table__key">sample_type</span> | Type of ANR sample - first occurrence, most representative, or anomaly detection. | Type: Choice (String)<br />Ops: Equals, Not Equals | All | Choices: `first`, `best`, `ad` |

</div>

## App Filters

<div class="filters-table">

| Filter | Description | Details | Platform | Constraints |
| --- | --- | --- | --- | --- |
| App Version<br /><span class="filters-table__key">app_version</span> | Semantic version number of the app. | Type: String<br />Ops: Equals, Not Equals | All | Length: 1-256 characters |
| Build<br /><span class="filters-table__key">build</span> | Build number or identifier of the app. | Type: String<br />Ops: Equals, Not Equals | Android, iOS | Length: 1-64 characters |
| Environment<br /><span class="filters-table__key">environment</span> | Deployment environment of the app. | Type: String<br />Ops: Equals, Not Equals | Android | Length: 1-64 characters |
| Environment Detail<br /><span class="filters-table__key">environment_detail</span> | Additional details about the deployment environment. | Type: String<br />Ops: Equals, Not Equals | iOS | Length: 1-64 characters |
| Last View<br /><span class="filters-table__key">last_view</span> | The last screen or view the user visited before an event. | Type: String<br />Ops: Equals, Not Equals, like, nlike | All | Length: 0-4096 characters |
| SDK Version<br /><span class="filters-table__key">sdk_version</span> | Embrace SDK semantic version. | Type: String<br />Ops: Equals, Not Equals | All | Length: 1-256 characters |

</div>

## Browser Filters

<div class="filters-table">

| Filter | Description | Details | Platform | Constraints |
| --- | --- | --- | --- | --- |
| Bot<br /><span class="filters-table__key">bot</span> | Whether the session was identified as bot traffic. | Type: Boolean<br />Ops: Equals, Not Equals | Web | — |
| Browser Major Version<br /><span class="filters-table__key">browser_major_version</span> | Major version number of the web browser. | Type: int<br />Ops: Equals, Not Equals, Greater Than, Greater Than or Equal, Less Than, Less Than or Equal | Web | — |
| Browser Name<br /><span class="filters-table__key">browser_name</span> | Name of the web browser. | Type: String<br />Ops: Equals, Not Equals, like, nlike | Web | Length: 1-256 characters |
| Browser Version<br /><span class="filters-table__key">browser_version</span> | Full version string of the web browser. | Type: String<br />Ops: Equals, Not Equals, like, nlike | Web | Length: 1-256 characters |

</div>

## Child Span Filters

<div class="filters-table">

| Filter | Description | Details | Platform | Constraints |
| --- | --- | --- | --- | --- |
| Child Span Attribute Key<br /><span class="filters-table__key">child_attribute_key</span> | Key name of a custom attribute on a child span. | Type: String<br />Ops: Equals | All | Length: 1-256 characters |
| Child Span Duration (Milliseconds)<br /><span class="filters-table__key">child_duration</span> | Duration of the child span in milliseconds. | Type: int<br />Ops: Equals, Not Equals, Greater Than, Greater Than or Equal, Less Than, Less Than or Equal | All | — |
| Child Span Event Name<br /><span class="filters-table__key">child_event_name</span> | Name of an event within the child span. | Type: String<br />Ops: Equals, Not Equals, like, nlike | All | Length: 1-256 characters |
| Child Span Name<br /><span class="filters-table__key">child_name</span> | Name of the child span. | Type: String<br />Ops: Equals, Not Equals, like, nlike | All | Length: 1-256 characters |
| Child Span Outcome<br /><span class="filters-table__key">child_outcome</span> | Outcome status of the child span (successful, failure, etc.). | Type: Choice (String)<br />Ops: Equals | All | Length: 1-256 characters<br />Choices: `successful`, `failure`, `user_abandon`, `unknown` |

</div>

## Child Span Attribute Filters

<div class="filters-table">

| Filter | Description | Details | Platform | Constraints |
| --- | --- | --- | --- | --- |
| Child Span Attribute Key/Value<br /><span class="filters-table__key">child_attribute</span> | Key-value pair of custom attributes on a child span. | Type: property<br />Ops: Equals, Not Equals | All | — |

</div>

## Crash Filters

<div class="filters-table">

| Filter | Description | Details | Platform | Constraints |
| --- | --- | --- | --- | --- |
| Crash ID<br /><span class="filters-table__key">crash_group_id</span> | Unique identifier for a specific crash instance. | Type: String<br />Ops: Equals | Android, iOS | Length: exactly 32 characters |
| File Name<br /><span class="filters-table__key">file</span> | Source code file name where the crash occurred. | Type: String<br />Ops: Equals, Not Equals, like, nlike | Android, iOS | Length: 1-256 characters |
| Framework<br /><span class="filters-table__key">framework</span> | The app framework used (native, React Native, Unity, Flutter). | Type: Choice (String)<br />Ops: Equals | Android, iOS | Choices: `native`, `react_native`, `unity` |
| Message<br /><span class="filters-table__key">msg</span> | Message describing the crash. | Type: String<br />Ops: like | Android, iOS | Length: 1-1024 characters |
| Symbol<br /><span class="filters-table__key">symbol</span> | The function symbol name from the crash stack trace. | Type: String<br />Ops: Equals, Not Equals, like, nlike | iOS | Length: 1-256 characters |
| Tag Name<br /><span class="filters-table__key">tag_name</span> | Custom tag name attached to the crash. | Type: String<br />Ops: Equals, Not Equals | Android, iOS | Length: 1-256 characters |
| Tag Name/Value<br /><span class="filters-table__key">tag</span> | Key-value pair of custom tags attached to the crash. | Type: property<br />Ops: Equals, Not Equals | Android, iOS | — |

</div>

## Device Filters

<div class="filters-table">

| Filter | Description | Details | Platform | Constraints |
| --- | --- | --- | --- | --- |
| Country ISO<br /><span class="filters-table__key">country</span> | Device's country as a two letter ISO country code. | Type: String<br />Ops: Equals, Not Equals | All | Length: exactly 2 characters |
| Device Type<br /><span class="filters-table__key">device_type</span> | Type of device (desktop, mobile, tablet). | Type: Choice (String)<br />Ops: Equals | Web | Choices: `desktop`, `mobile`, `tablet` |
| Device Type<br /><span class="filters-table__key">model_type</span> | Type classification of the device model. | Type: String<br />Ops: Equals, Not Equals | iOS, React Native, Flutter, Unity | Length: 1-256 characters |
| Jailbroken<br /><span class="filters-table__key">jailbroken</span> | Whether or not the device running an app is jailbroken. | Type: Boolean<br />Ops: Equals, Not Equals | Android, iOS | — |
| Js Patch<br /><span class="filters-table__key">js_patch</span> | JavaScript patch version for React Native apps. | Type: String<br />Ops: Equals, Not Equals, like, nlike | Android, iOS, React Native, Web | Length: 1-256 characters |
| Manufacturer<br /><span class="filters-table__key">manufacturer</span> | Name of the device hardware manufacturer. | Type: String<br />Ops: Equals, Not Equals, like, nlike | Android, React Native, Flutter, Unity | Length: 0-256 characters |
| Model Factory Name<br /><span class="filters-table__key">model</span> | Device hardware model identifier. | Type: String<br />Ops: Equals, Not Equals, like, nlike | Android, iOS | Length: 1-256 characters |
| Model Name<br /><span class="filters-table__key">model_market_name</span> | Consumer-facing marketing name of the device model. | Type: String<br />Ops: Equals, Not Equals, like, nlike | Android, iOS | Length: 0-256 characters |
| Region<br /><span class="filters-table__key">region</span> | Geographic region within a country, such as a state or province. | Type: String<br />Ops: Equals, Not Equals | All | Length: 1-256 characters |

</div>

## Exception Filters

<div class="filters-table">

| Filter | Description | Details | Platform | Constraints |
| --- | --- | --- | --- | --- |
| Group ID<br /><span class="filters-table__key">group_id</span> | The group ID for the ANR. | Type: String<br />Ops: Equals | React Native, Flutter, Unity, Web | Length: exactly 32 characters |
| Is Handled<br /><span class="filters-table__key">is_handled</span> | Whether the exception was caught and handled by the app. | Type: Boolean<br />Ops: Equals, Not Equals | All | — |
| Severity Score<br /><span class="filters-table__key">severity_score</span> | Numerical severity score assigned to the exception. | Type: float<br />Ops: Equals, Not Equals, Greater Than, Greater Than or Equal, Less Than, Less Than or Equal | Web | — |

</div>

## Log Filters

<div class="filters-table">

| Filter | Description | Details | Platform | Constraints |
| --- | --- | --- | --- | --- |
| Aggregated Message<br /><span class="filters-table__key">log_msg</span> | An aggregated form of the log message, with common patterns or high cardinality parts replaced. | Type: String<br />Ops: like | All | Length: 1-256 characters |
| File Attachment Error<br /><span class="filters-table__key">attachment_error</span> | Type of error encountered when attaching files to logs. | Type: Choice (String)<br />Ops: Equals | All | Choices: `ATTACHMENT_TOO_LARGE`, `OVER_MAX_ATTACHMENTS`, `UNKNOWN` |
| Group ID<br /><span class="filters-table__key">log_group_id</span> | Unique identifier grouping similar log messages together. | Type: String<br />Ops: Equals | All | Length: exactly 32 characters |
| Has File Attachment<br /><span class="filters-table__key">has_attachment</span> | Whether the log has a file attachment. | Type: Boolean<br />Ops: Equals | All | — |
| Has Logs<br /><span class="filters-table__key">has_log</span> | Whether the session contains any log messages. | Type: Choice (String)<br />Ops: Equals | All | Choices: `true` |
| Log Property Key<br /><span class="filters-table__key">log_property_key</span> | Key name of a custom property attached to the log. | Type: String<br />Ops: Equals | All | Length: 1-256 characters |
| Message<br /><span class="filters-table__key">log_raw_msg</span> | The log message text. | Type: String<br />Ops: like | All | Length: 1-256 characters |
| Message<br /><span class="filters-table__key">raw_msg</span> | The log message text. | Type: String<br />Ops: like | All | Length: 1-256 characters |
| Type<br /><span class="filters-table__key">log_type</span> | Severity level of the log (info, warning, error, system). | Type: Choice (String)<br />Ops: Equals | All | Choices: `info`, `warning`, `error`, `system` |
| Type<br /><span class="filters-table__key">type</span> | Severity level of the log (info, warning, error, system). | Type: Choice (String)<br />Ops: Equals | All | Choices: `info`, `warning`, `error`, `system` |

</div>

## Log Property Filters

<div class="filters-table">

| Filter | Description | Details | Platform | Constraints |
| --- | --- | --- | --- | --- |
| Log Property Key/Value<br /><span class="filters-table__key">log_property</span> | Key-value pair of custom properties attached to the log. | Type: property<br />Ops: Equals, Not Equals | All | — |

</div>

## Network Filters

<div class="filters-table">

| Filter | Description | Details | Platform | Constraints |
| --- | --- | --- | --- | --- |
| Connection Error<br /><span class="filters-table__key">connection_error</span> | Whether the network request had a connection error. | Type: Boolean<br />Ops: Equals | All | — |
| Domain<br /><span class="filters-table__key">domain</span> | Domain of the HTTP network request. | Type: String<br />Ops: Equals, Not Equals, like, nlike | All | Length: 1-128 characters |
| Duration Bucket (Milliseconds)<br /><span class="filters-table__key">duration_bucket</span> | Duration of the network request grouped into time buckets. | Type: int<br />Ops: Equals, Not Equals, Greater Than, Greater Than or Equal, Less Than, Less Than or Equal | All | — |
| First Party<br /><span class="filters-table__key">is_first_party</span> | Whether the network request is to a first-party domain. | Type: Boolean<br />Ops: Equals | All | — |
| Has Connection Error<br /><span class="filters-table__key">has_connection_error</span> | Whether any connection error occurred during the network request. | Type: Boolean<br />Ops: Equals, Not Equals | All | — |
| Path<br /><span class="filters-table__key">path</span> | Path element of the URL for an HTTP network request. | Type: String<br />Ops: Equals, like | All | Length: 1-1024 characters |
| Status Code Range<br /><span class="filters-table__key">status_code</span> | Filter by a range of HTTP response status codes. | Type: intrange<br />Ops: Equals | All | — |
| Status Code Single<br /><span class="filters-table__key">status_code_single</span> | Filter by a specific HTTP response status code. | Type: int<br />Ops: Equals, Not Equals, Greater Than, Greater Than or Equal, Less Than, Less Than or Equal | All | — |

</div>

## OS Filters

<div class="filters-table">

| Filter | Description | Details | Platform | Constraints |
| --- | --- | --- | --- | --- |
| OS Major Version<br /><span class="filters-table__key">os_major_version</span> | The major version of the OS. | Type: int<br />Ops: Equals, Not Equals, Greater Than, Greater Than or Equal, Less Than, Less Than or Equal | All | — |
| OS Name<br /><span class="filters-table__key">os_name</span> | Device operating system name. | Type: String<br />Ops: Equals, Not Equals, like, nlike | Web | Length: 1-256 characters |
| OS Version<br /><span class="filters-table__key">os_version</span> | Full operation system version. | Type: String<br />Ops: Equals, Not Equals | All | Length: 1-256 characters |

</div>

## Root Span Filters

<div class="filters-table">

| Filter | Description | Details | Platform | Constraints |
| --- | --- | --- | --- | --- |
| Root Span Duration (Milliseconds)<br /><span class="filters-table__key">root_span_duration</span> | Duration of the root span in milliseconds. | Type: int<br />Ops: Equals, Not Equals, Greater Than, Greater Than or Equal, Less Than, Less Than or Equal | All | — |
| Root Span Duration Bucket (Milliseconds)<br /><span class="filters-table__key">root_span_duration_bucket</span> | Duration of the root span grouped into time buckets. | Type: int<br />Ops: Equals, Not Equals, Greater Than, Greater Than or Equal, Less Than, Less Than or Equal | All | — |
| Root Span Event Name<br /><span class="filters-table__key">root_span_event_name</span> | Name of an event within the root span. | Type: String<br />Ops: Equals, Not Equals, like, nlike | All | Length: 1-256 characters |
| Root Span Name<br /><span class="filters-table__key">root_span_name</span> | Name of the root span in a performance trace. | Type: String<br />Ops: Equals, Not Equals, like, nlike | All | Length: 1-256 characters |
| Root Span Outcome<br /><span class="filters-table__key">root_span_outcome</span> | Outcome status of the root span (successful, failure, etc.). | Type: Choice (String)<br />Ops: Equals | All | Length: 1-256 characters<br />Choices: `successful`, `failure`, `user_abandon`, `unknown` |
| Slow Root Span<br /><span class="filters-table__key">root_span_type_slow</span> | Whether the root span exceeds the slow threshold. | Type: Boolean<br />Ops: Equals, Not Equals | All | — |

</div>

## Root Span Attribute Filters

<div class="filters-table">

| Filter | Description | Details | Platform | Constraints |
| --- | --- | --- | --- | --- |
| Root Span Attribute Key/Value<br /><span class="filters-table__key">root_span_attribute</span> | Key-value pair of custom attributes on the root span. | Type: property<br />Ops: Equals, Not Equals | All | — |

</div>

## Session Filters

<div class="filters-table">

| Filter | Description | Details | Platform | Constraints |
| --- | --- | --- | --- | --- |
| Active Interval Count<br /><span class="filters-table__key">active_interval_count</span> | Number of active time intervals during a session. | Type: int<br />Ops: Equals, Not Equals, Greater Than, Greater Than or Equal, Less Than, Less Than or Equal | Android, iOS | — |
| Breadcrumb Message<br /><span class="filters-table__key">breadcrumb_message</span> | Text content of a breadcrumb event recorded during the session. | Type: String<br />Ops: Equals, like | All | Length: 1-256 characters |
| Has ANR Exit<br /><span class="filters-table__key">has_anr</span> | True if the app exited while an ANR was occurring. | Type: Boolean<br />Ops: Equals | Android, React Native, Flutter, Unity | — |
| Has ANR Exit<br /><span class="filters-table__key">has_anr_exit</span> | True if the app exited while an ANR was occurring. | Type: Boolean<br />Ops: Equals | All | — |
| Has Cold Start<br /><span class="filters-table__key">is_cold</span> | True if this session is a cold start of the app. | Type: Boolean<br />Ops: Equals, Not Equals | All | — |
| Has Crash<br /><span class="filters-table__key">has_crash</span> | True if the session had a crash. | Type: Boolean<br />Ops: Equals, Not Equals | Android, iOS | — |
| Has Low Memory Warning<br /><span class="filters-table__key">has_low_memory</span> | Whether the session experienced a low memory warning. | Type: Boolean<br />Ops: Equals, Not Equals | Android, iOS | — |
| Has OOM<br /><span class="filters-table__key">has_oom</span> | True if the session had an out-of-memory event. | Type: Boolean<br />Ops: Equals, Not Equals | Android, iOS | — |
| Inactive Interval Count<br /><span class="filters-table__key">inactive_interval_count</span> | Number of inactive time intervals during a session. | Type: int<br />Ops: Equals, Not Equals, Greater Than, Greater Than or Equal, Less Than, Less Than or Equal | Android, iOS | — |
| Is First<br /><span class="filters-table__key">is_first</span> | True if this is the user's first session. | Type: Boolean<br />Ops: Equals, Not Equals | All | — |
| Network Connectivity<br /><span class="filters-table__key">network_connectivity</span> | Type of network connection the device is using. | Type: Choice (String)<br />Ops: Equals | Android, iOS | Choices: `mixed`, `none`, `wan`, `wifi` |
| State<br /><span class="filters-table__key">state</span> | Whether the app was in the foreground or background. | Type: Choice (String)<br />Ops: Equals, Not Equals | Android, iOS | Length: 1-64 characters<br />Choices: `foreground`, `background` |
| Was User Terminated<br /><span class="filters-table__key">has_user_terminated</span> | Whether the session ended because the user force-quit the app. | Type: Boolean<br />Ops: Equals, Not Equals | Android, iOS | — |

</div>

## Span Filters

<div class="filters-table">

| Filter | Description | Details | Platform | Constraints |
| --- | --- | --- | --- | --- |
| Has Slow Root Span<br /><span class="filters-table__key">span_type_slow</span> | Whether the root span is classified as slow. | Type: Boolean<br />Ops: Equals, Not Equals | All | — |
| Span Attribute Key<br /><span class="filters-table__key">span_attribute_key</span> | Key name of a custom attribute on a span. | Type: String<br />Ops: Equals | All | Length: 1-256 characters |
| Span Duration (Milliseconds)<br /><span class="filters-table__key">span_duration</span> | Duration of the span in milliseconds. | Type: int<br />Ops: Equals, Not Equals, Greater Than, Greater Than or Equal, Less Than, Less Than or Equal | All | — |
| Span Duration Bucket (Milliseconds)<br /><span class="filters-table__key">span_duration_bucket</span> | Duration of the span grouped into time buckets. | Type: int<br />Ops: Equals, Not Equals, Greater Than, Greater Than or Equal, Less Than, Less Than or Equal | All | — |
| Span Event Name<br /><span class="filters-table__key">span_event_name</span> | Name of an event within the span. | Type: String<br />Ops: Equals, Not Equals, like, nlike | All | Length: 1-256 characters |
| Span Is Child<br /><span class="filters-table__key">is_child_span</span> | Whether the span is a child of another span. | Type: Boolean<br />Ops: Equals, Not Equals | All | — |
| Span Name<br /><span class="filters-table__key">span_name</span> | Name identifying the span. | Type: String<br />Ops: Equals, Not Equals, like, nlike | All | Length: 1-256 characters |
| Span Outcome<br /><span class="filters-table__key">span_outcome</span> | Outcome status of the span (successful, failure, etc.). | Type: Choice (String)<br />Ops: Equals | All | Length: 1-256 characters<br />Choices: `successful`, `failure`, `user_abandon`, `unknown` |

</div>

## Span Attribute Filters

<div class="filters-table">

| Filter | Description | Details | Platform | Constraints |
| --- | --- | --- | --- | --- |
| Span Attribute Key/Value<br /><span class="filters-table__key">span_attribute</span> | Key-value pair of custom attributes on a span. | Type: property<br />Ops: Equals, Not Equals | All | — |

</div>

## Surface Filters

<div class="filters-table">

| Filter | Description | Details | Platform | Constraints |
| --- | --- | --- | --- | --- |
| Surface Name<br /><span class="filters-table__key">surface_name</span> | Name of the UI surface or screen. | Type: String<br />Ops: Equals, Not Equals, like, nlike | Web | Length: 1-256 characters |

</div>

## User Filters

<div class="filters-table">

| Filter | Description | Details | Platform | Constraints |
| --- | --- | --- | --- | --- |
| Embrace ID<br /><span class="filters-table__key">device_id</span> | Unique identifier assigned by Embrace to the device. | Type: String<br />Ops: Equals, Not Equals | All | Length: exactly 32 characters |
| Persona<br /><span class="filters-table__key">persona</span> | Custom user segment or persona identifier. | Type: String<br />Ops: Equals, Not Equals, like, nlike | Android, iOS | Length: 1-256 characters |
| User Email<br /><span class="filters-table__key">user_email</span> | App user's email address. | Type: String<br />Ops: Equals, Not Equals | Android, iOS | Length: 1-256 characters |
| User ID<br /><span class="filters-table__key">user_id</span> | — | Type: String<br />Ops: Equals, Not Equals | All | Length: 0-256 characters |
| Username<br /><span class="filters-table__key">user_name</span> | App user's username. | Type: String<br />Ops: Equals, Not Equals | Android, iOS | Length: 1-256 characters |

</div>

## User Flow Filters

<div class="filters-table">

| Filter | Description | Details | Platform | Constraints |
| --- | --- | --- | --- | --- |
| User Flow Duration (Milliseconds)<br /><span class="filters-table__key">user_flow_duration</span> | Duration of the user flow in milliseconds. | Type: int<br />Ops: Equals, Not Equals, Greater Than, Greater Than or Equal, Less Than, Less Than or Equal | All | — |
| User Flow End Event Type<br /><span class="filters-table__key">user_flow_end_event_type</span> | Type of event that ended the user flow. | Type: Choice (String)<br />Ops: Equals, Not Equals | All | Length: 1-256 characters<br />Choices: `breadcrumb`, `crash`, `custom_view`, `log`, `network`, `session`, `span`, `user_tap`, `view`, `web_view` |
| User Flow Name<br /><span class="filters-table__key">user_flow_name</span> | Name of the user flow. | Type: String<br />Ops: Equals, Not Equals | All | Length: 1-256 characters |
| User Flow Outcome<br /><span class="filters-table__key">user_flow_outcome</span> | Final outcome of the user flow (complete, abandon, error). | Type: Choice (String)<br />Ops: Equals, Not Equals | All | Length: 1-256 characters<br />Choices: `abandon`, `complete`, `error` |
| User Flow Outcome Reason<br /><span class="filters-table__key">user_flow_outcome_reason</span> | Reason for the user flow outcome (timeout, crash, etc.). | Type: Choice (String)<br />Ops: Equals, Not Equals | All | Length: 1-256 characters<br />Choices: `app_exit`, `timeout`, `new_user_flow_started`, `crash` |
| User Flow Start Event Type<br /><span class="filters-table__key">user_flow_start_event_type</span> | Type of event that started the user flow. | Type: Choice (String)<br />Ops: Equals, Not Equals | All | Length: 1-256 characters<br />Choices: `breadcrumb`, `custom_view`, `log`, `network`, `session`, `span`, `user_tap`, `view`, `web_view` |

</div>

## User Flow Attribute Filters

<div class="filters-table">

| Filter | Description | Details | Platform | Constraints |
| --- | --- | --- | --- | --- |
| User Flow Attribute Key/Value<br /><span class="filters-table__key">user_flow_attribute</span> | Key-value pair of custom attributes on the user flow. | Type: property<br />Ops: Equals, Not Equals | All | — |

</div>

## Web Resource Filters

<div class="filters-table">

| Filter | Description | Details | Platform | Constraints |
| --- | --- | --- | --- | --- |
| Render Blocking Status<br /><span class="filters-table__key">render_blocking_status</span> | Whether the resource blocks initial page rendering. | Type: Choice (String)<br />Ops: Equals | All | Length: 1-256 characters<br />Choices: `blocking`, `non-blocking` |
| Resource Type<br /><span class="filters-table__key">resource_type</span> | Type of web resource loaded (script, stylesheet, image, etc.). | Type: Choice (String)<br />Ops: Equals | All | Length: 1-256 characters<br />Choices: `script`, `stylesheet`, `image`, `font`, `video`, `audio`, `document`, `other` |

</div>

## Web Vital Filters

<div class="filters-table">

| Filter | Description | Details | Platform | Constraints |
| --- | --- | --- | --- | --- |
| Web Vital Name<br /><span class="filters-table__key">name</span> | Name of the web vital metric (LCP, FID, CLS, etc.). | Type: String<br />Ops: Equals, Not Equals, like, nlike | All | Length: 1-256 characters |
| Web Vital Rating<br /><span class="filters-table__key">rating</span> | Performance rating of the web vital (good, needs improvement, poor). | Type: Choice (String)<br />Ops: Equals | All | Length: 1-256 characters<br />Choices: `poor`, `needs_improvement`, `good` |

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

