---
title: Filters Definitions
description: Complete definitions of all available filters for querying your data
slug: /definitions/filters
sidebar_class_name: hidden-filter-reference
---

# Filter Definitions

Filters allow you to query and segment your data in the Embrace dashboard. Use filters to narrow down sessions, crashes, and other telemetry data based on specific criteria.

## Understanding Filter Table Columns

Each filter table in this page uses the same columns:

- **Filter** - Human-readable name of the filter, with the key used in APIs or programmatic queries shown below it in monospace (for example, `app_version`).
- **Description** - Plain-language explanation of what the filter represents and how it is typically used.
- **Type** - Describes the data shape, such as String, Choice (String), int, float, Boolean, Date/DateTime, property (key-value pair), or intrange (integer range).
- **Constraints** - Describes any documented limits on valid values for the filter, such as enumerated choices. If no constraints are listed, the filter accepts any value that matches its type.

---

## ANR Filters

<div class="filters-table">

| Filter | Description | Type | Constraints |
| --- | --- | --- | --- |
| Completion<br /><span class="filters-table__key">completion</span> | — | Choice (String) | Choices: `all`, `completed`, `exit` |
| Duration Bucket (Milliseconds)<br /><span class="filters-table__key">duration</span> | Duration of the ANR, bucketed by milliseconds. | intrange | — |
| Method<br /><span class="filters-table__key">method</span> | — | String | — |
| Sample Type<br /><span class="filters-table__key">sample_type</span> | — | Choice (String) | Choices: `first`, `best`, `ad` |

</div>

## App Filters

<div class="filters-table">

| Filter | Description | Type | Constraints |
| --- | --- | --- | --- |
| App Version<br /><span class="filters-table__key">app_version</span> | Semantic version number of the app. | String | — |
| Build<br /><span class="filters-table__key">build</span> | — | String | — |
| Environment<br /><span class="filters-table__key">environment</span> | Deployment environment of the app. | String | — |
| Environment Detail<br /><span class="filters-table__key">environment_detail</span> | — | String | — |
| Last View<br /><span class="filters-table__key">last_view</span> | — | String | — |
| SDK Version<br /><span class="filters-table__key">sdk_version</span> | Embrace SDK semantic version. | String | — |

</div>

## Browser Filters

<div class="filters-table">

| Filter | Description | Type | Constraints |
| --- | --- | --- | --- |
| Bot<br /><span class="filters-table__key">bot</span> | — | Boolean | — |
| Browser Major Version<br /><span class="filters-table__key">browser_major_version</span> | — | int | — |
| Browser Name<br /><span class="filters-table__key">browser_name</span> | — | String | — |
| Browser Version<br /><span class="filters-table__key">browser_version</span> | — | String | — |

</div>

## Child Span Filters

<div class="filters-table">

| Filter | Description | Type | Constraints |
| --- | --- | --- | --- |
| Child Span Attribute Key<br /><span class="filters-table__key">child_attribute_key</span> | — | String | — |
| Child Span Duration (Milliseconds)<br /><span class="filters-table__key">child_duration</span> | — | int | — |
| Child Span Event Name<br /><span class="filters-table__key">child_event_name</span> | — | String | — |
| Child Span Name<br /><span class="filters-table__key">child_name</span> | — | String | — |
| Child Span Outcome<br /><span class="filters-table__key">child_outcome</span> | — | Choice (String) | Choices: `successful`, `failure`, `user_abandon`, `unknown` |

</div>

## Child Span Attribute Filters

<div class="filters-table">

| Filter | Description | Type | Constraints |
| --- | --- | --- | --- |
| Child Span Attribute Key/Value<br /><span class="filters-table__key">child_attribute</span> | — | property | — |

</div>

## Crash Filters

<div class="filters-table">

| Filter | Description | Type | Constraints |
| --- | --- | --- | --- |
| Crash ID<br /><span class="filters-table__key">crash_group_id</span> | — | String | — |
| File Name<br /><span class="filters-table__key">file</span> | — | String | — |
| Framework<br /><span class="filters-table__key">framework</span> | — | Choice (String) | Choices: `native`, `react_native`, `unity` |
| Message<br /><span class="filters-table__key">msg</span> | Message describing the crash. | String | — |
| Symbol<br /><span class="filters-table__key">symbol</span> | — | String | — |
| Tag Name<br /><span class="filters-table__key">tag_name</span> | — | String | — |
| Tag Name/Value<br /><span class="filters-table__key">tag</span> | — | property | — |

</div>

## Device Filters

<div class="filters-table">

| Filter | Description | Type | Constraints |
| --- | --- | --- | --- |
| Country ISO<br /><span class="filters-table__key">country</span> | Device's country as a two letter ISO country code. | String | — |
| Device Type<br /><span class="filters-table__key">device_type</span> | — | Choice (String) | Choices: `desktop`, `mobile`, `tablet` |
| Device Type<br /><span class="filters-table__key">model_type</span> | — | String | — |
| Jailbroken<br /><span class="filters-table__key">jailbroken</span> | Whether or not the device running an app is jailbroken. | Boolean | — |
| Js Patch<br /><span class="filters-table__key">js_patch</span> | — | String | — |
| Manufacturer<br /><span class="filters-table__key">manufacturer</span> | Name of the device hardware manufacturer. | String | — |
| Model Factory Name<br /><span class="filters-table__key">model</span> | Device hardware model identifier. | String | — |
| Model Name<br /><span class="filters-table__key">model_market_name</span> | — | String | — |
| Region<br /><span class="filters-table__key">region</span> | Geographic region within a country, such as a state or province. | String | — |

</div>

## Exception Filters

<div class="filters-table">

| Filter | Description | Type | Constraints |
| --- | --- | --- | --- |
| Group ID<br /><span class="filters-table__key">group_id</span> | The group ID for the ANR. | String | — |
| Is Handled<br /><span class="filters-table__key">is_handled</span> | — | Boolean | — |
| Severity Score<br /><span class="filters-table__key">severity_score</span> | — | float | — |

</div>

## Log Filters

<div class="filters-table">

| Filter | Description | Type | Constraints |
| --- | --- | --- | --- |
| Aggregated Message<br /><span class="filters-table__key">log_msg</span> | An aggregated form of the log message, with common patterns or high cardinality parts replaced. | String | — |
| File Attachment Error<br /><span class="filters-table__key">attachment_error</span> | — | Choice (String) | Choices: `ATTACHMENT_TOO_LARGE`, `OVER_MAX_ATTACHMENTS`, `UNKNOWN` |
| Group ID<br /><span class="filters-table__key">log_group_id</span> | — | String | — |
| Has File Attachment<br /><span class="filters-table__key">has_attachment</span> | — | Boolean | — |
| Has Logs<br /><span class="filters-table__key">has_log</span> | — | Choice (String) | Choices: `true` |
| Log Property Key<br /><span class="filters-table__key">log_property_key</span> | — | String | — |
| Message<br /><span class="filters-table__key">log_raw_msg</span> | — | String | — |
| Message<br /><span class="filters-table__key">raw_msg</span> | — | String | — |
| Type<br /><span class="filters-table__key">log_type</span> | — | Choice (String) | Choices: `info`, `warning`, `error`, `system` |
| Type<br /><span class="filters-table__key">type</span> | — | Choice (String) | Choices: `info`, `warning`, `error`, `system` |

</div>

## Log Property Filters

<div class="filters-table">

| Filter | Description | Type | Constraints |
| --- | --- | --- | --- |
| Log Property Key/Value<br /><span class="filters-table__key">log_property</span> | — | property | — |

</div>

## Network Filters

<div class="filters-table">

| Filter | Description | Type | Constraints |
| --- | --- | --- | --- |
| Connection Error<br /><span class="filters-table__key">connection_error</span> | — | Boolean | — |
| Domain<br /><span class="filters-table__key">domain</span> | Domain of the HTTP network request. | String | — |
| Duration Bucket (Milliseconds)<br /><span class="filters-table__key">duration_bucket</span> | — | int | — |
| First Party<br /><span class="filters-table__key">is_first_party</span> | — | Boolean | — |
| Has Connection Error<br /><span class="filters-table__key">has_connection_error</span> | — | Boolean | — |
| Path<br /><span class="filters-table__key">path</span> | Path element of the URL for an HTTP network request. | String | — |
| Status Code Range<br /><span class="filters-table__key">status_code</span> | Filter by a range of HTTP response status codes. | intrange | — |
| Status Code Single<br /><span class="filters-table__key">status_code_single</span> | Filter by a specific HTTP response status code. | int | — |

</div>

## OS Filters

<div class="filters-table">

| Filter | Description | Type | Constraints |
| --- | --- | --- | --- |
| OS Major Version<br /><span class="filters-table__key">os_major_version</span> | The major version of the OS. | int | — |
| OS Name<br /><span class="filters-table__key">os_name</span> | Device operating system name. | String | — |
| OS Version<br /><span class="filters-table__key">os_version</span> | Full operation system version. | String | — |

</div>

## Root Span Filters

<div class="filters-table">

| Filter | Description | Type | Constraints |
| --- | --- | --- | --- |
| Root Span Duration (Milliseconds)<br /><span class="filters-table__key">root_span_duration</span> | — | int | — |
| Root Span Duration Bucket (Milliseconds)<br /><span class="filters-table__key">root_span_duration_bucket</span> | — | int | — |
| Root Span Event Name<br /><span class="filters-table__key">root_span_event_name</span> | — | String | — |
| Root Span Name<br /><span class="filters-table__key">root_span_name</span> | Name of the root span in a performance trace. | String | — |
| Root Span Outcome<br /><span class="filters-table__key">root_span_outcome</span> | — | Choice (String) | Choices: `successful`, `failure`, `user_abandon`, `unknown` |
| Slow Root Span<br /><span class="filters-table__key">root_span_type_slow</span> | — | Boolean | — |

</div>

## Root Span Attribute Filters

<div class="filters-table">

| Filter | Description | Type | Constraints |
| --- | --- | --- | --- |
| Root Span Attribute Key/Value<br /><span class="filters-table__key">root_span_attribute</span> | — | property | — |

</div>

## Session Filters

<div class="filters-table">

| Filter | Description | Type | Constraints |
| --- | --- | --- | --- |
| Active Interval Count<br /><span class="filters-table__key">active_interval_count</span> | — | int | — |
| Breadcrumb Message<br /><span class="filters-table__key">breadcrumb_message</span> | — | String | — |
| Has ANR Exit<br /><span class="filters-table__key">has_anr</span> | True if the app exited while an ANR was occurring. | Boolean | — |
| Has ANR Exit<br /><span class="filters-table__key">has_anr_exit</span> | True if the app exited while an ANR was occurring. | Boolean | — |
| Has Cold Start<br /><span class="filters-table__key">is_cold</span> | True if this session is a cold start of the app. | Boolean | — |
| Has Crash<br /><span class="filters-table__key">has_crash</span> | True if the session had a crash. | Boolean | — |
| Has Low Memory Warning<br /><span class="filters-table__key">has_low_memory</span> | — | Boolean | — |
| Has OOM<br /><span class="filters-table__key">has_oom</span> | True if the session had an out-of-memory event. | Boolean | — |
| Inactive Interval Count<br /><span class="filters-table__key">inactive_interval_count</span> | — | int | — |
| Is First<br /><span class="filters-table__key">is_first</span> | True if this is the user's first session. | Boolean | — |
| Network Connectivity<br /><span class="filters-table__key">network_connectivity</span> | Type of network connection the device is using. | Choice (String) | Choices: `mixed`, `none`, `wan`, `wifi` |
| State<br /><span class="filters-table__key">state</span> | Whether the app was in the foreground or background. | Choice (String) | Choices: `foreground`, `background` |
| Was User Terminated<br /><span class="filters-table__key">has_user_terminated</span> | — | Boolean | — |

</div>

## Span Filters

<div class="filters-table">

| Filter | Description | Type | Constraints |
| --- | --- | --- | --- |
| Has Slow Root Span<br /><span class="filters-table__key">span_type_slow</span> | — | Boolean | — |
| Span Attribute Key<br /><span class="filters-table__key">span_attribute_key</span> | — | String | — |
| Span Duration (Milliseconds)<br /><span class="filters-table__key">span_duration</span> | — | int | — |
| Span Duration Bucket (Milliseconds)<br /><span class="filters-table__key">span_duration_bucket</span> | — | int | — |
| Span Event Name<br /><span class="filters-table__key">span_event_name</span> | — | String | — |
| Span Is Child<br /><span class="filters-table__key">is_child_span</span> | — | Boolean | — |
| Span Name<br /><span class="filters-table__key">span_name</span> | — | String | — |
| Span Outcome<br /><span class="filters-table__key">span_outcome</span> | — | Choice (String) | Choices: `successful`, `failure`, `user_abandon`, `unknown` |

</div>

## Span Attribute Filters

<div class="filters-table">

| Filter | Description | Type | Constraints |
| --- | --- | --- | --- |
| Span Attribute Key/Value<br /><span class="filters-table__key">span_attribute</span> | — | property | — |

</div>

## Surface Filters

<div class="filters-table">

| Filter | Description | Type | Constraints |
| --- | --- | --- | --- |
| Surface Name<br /><span class="filters-table__key">surface_name</span> | — | String | — |

</div>

## User Filters

<div class="filters-table">

| Filter | Description | Type | Constraints |
| --- | --- | --- | --- |
| Embrace ID<br /><span class="filters-table__key">device_id</span> | — | String | — |
| Persona<br /><span class="filters-table__key">persona</span> | — | String | — |
| User Email<br /><span class="filters-table__key">user_email</span> | App user's email address. | String | — |
| User ID<br /><span class="filters-table__key">user_id</span> | — | String | — |
| Username<br /><span class="filters-table__key">user_name</span> | App user's username. | String | — |

</div>

## User Flow Filters

<div class="filters-table">

| Filter | Description | Type | Constraints |
| --- | --- | --- | --- |
| User Flow Duration (Milliseconds)<br /><span class="filters-table__key">user_flow_duration</span> | — | int | — |
| User Flow End Event Type<br /><span class="filters-table__key">user_flow_end_event_type</span> | — | Choice (String) | Choices: `breadcrumb`, `crash`, `custom_view`, `log`, `network`, `session`, `span`, `user_tap`, `view`, `web_view` |
| User Flow Has Issue<br /><span class="filters-table__key">user_flow_has_issue</span> | — | Choice (String) | Choices: `anr`, `crash`, `error_log`, `network_error` |
| User Flow Name<br /><span class="filters-table__key">user_flow_name</span> | — | String | — |
| User Flow Name<br /><span class="filters-table__key">crash_user_flow_name</span> | — | String | — |
| User Flow Outcome<br /><span class="filters-table__key">user_flow_outcome</span> | — | Choice (String) | Choices: `abandon`, `complete`, `error` |
| User Flow Outcome Reason<br /><span class="filters-table__key">user_flow_outcome_reason</span> | — | Choice (String) | Choices: `app_exit`, `timeout`, `new_user_flow_started`, `crash` |
| User Flow Start Event Type<br /><span class="filters-table__key">user_flow_start_event_type</span> | — | Choice (String) | Choices: `breadcrumb`, `custom_view`, `log`, `network`, `session`, `span`, `user_tap`, `view`, `web_view` |

</div>

## User Flow Attribute Filters

<div class="filters-table">

| Filter | Description | Type | Constraints |
| --- | --- | --- | --- |
| User Flow Attribute Key/Value<br /><span class="filters-table__key">user_flow_attribute</span> | — | property | — |

</div>

## Web Resource Filters

<div class="filters-table">

| Filter | Description | Type | Constraints |
| --- | --- | --- | --- |
| Render Blocking Status<br /><span class="filters-table__key">render_blocking_status</span> | — | Choice (String) | Choices: `blocking`, `non-blocking` |
| Resource Type<br /><span class="filters-table__key">resource_type</span> | — | Choice (String) | Choices: `script`, `stylesheet`, `image`, `font`, `video`, `audio`, `document`, `other` |

</div>

## Web Vital Filters

<div class="filters-table">

| Filter | Description | Type | Constraints |
| --- | --- | --- | --- |
| Web Vital Name<br /><span class="filters-table__key">name</span> | — | String | — |
| Web Vital Rating<br /><span class="filters-table__key">rating</span> | — | Choice (String) | Choices: `poor`, `needs_improvement`, `good` |

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
