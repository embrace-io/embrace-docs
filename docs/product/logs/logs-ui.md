---
title: Logs UI
sidebar_position: 1
---

# Logs UI

The logs section gives you access to all logs emitted by your application. Embrace provides two ways to explore your logs

- **Aggregated logs**: View logs grouped by grouping rules. Typically you would use this visualization for monitoring app performance, identifying trends, and understanding overall user behavior.
- **Raw Logs**: View every single log. Similar to other logging tools, this is a raw list of every log in real time.

## Filtering options

- **Advanced filters**: our advanced filtering capabilities let you filter logs by various attributes about the app, user, device, operating system, session, etc. You could, for example, search for logs from a specific device model used by users in the UK, you can rapidly filter to those logs and then view the correlated sessions. You can also save your filter combinations for reuse them later.
- **Free-Text Search**: navigate through your logs quickly with our enhanced text search.
- **Severity level** - Hide/show logs based on the severity level you want to focus on.
  - **Error**: Indicates critical issues that prevent the app from
    functioning correctly.
  - **Warning**: Highlights potential problems that could lead to errors
    in the future.
  - **Info**: Provides informational messages about normal app activity.
  - **System**: Shows internal system logs, helpful for advanced
    debugging. (iOS Only)

## Aggregated Logs

<img src={require('@site/static/images/features/logs-aggegated-image.png').default} alt="logs-aggregated" width="700"/>

For each log group, this page displays:

- **Severity level** : explained above.
- **Events**: Total number of occurrences in the selected time period.
- **Trends**: Compares total events in the selected time period vs the previous time period.
- **Devices**: Total number of affected devices in the given time period.
- **Users**: Percentage of users affected by the log in the given time period.
- **Versions**: Displays all versions where this log was seen (ignoring filters).
- **Message**: Grouped Log message.

### Actions

Hovering over each log will allow you to

- Copy Log Message (copies log message to clipboard).
- See statistics: See distribution stats of logs for the group.
- See raw logs: See each of the log instances grouped.
- See details: See the details page of the selected log group.

> You can customize columns: You can hide/display preferred columns and reorder them

### Log Details

This page expands on the details for the selected Log Group.

See the total number of events, trend vs previous period of time, number of affected devices, and percentage of affected users.

You can also see the distribution of logs in time across different app versions.

### Affected Sessions

Display the latest sessions containing a log from this group. Displays an associated stack trace in case of error and warning logs and the possibility to see more information related to the session, fully exploring them in the session timeline.

### Log Stats

Display distribution statistics of the selected Log Group, pivoting by Device, OS version, Country, and Session Properties.

Each statistics group shows:

- **Count**: Total number of logs for each dimension.
- **Affected**: percentage of sessions affected by this log group for each dimension over the total count of a given log.
- **Overall**: Expected percentage of affected sessions based on the number of sessions for each dimension.
- **Difference**: The difference between the 2 above, is to highlight logs occurring more or less than expected.

## Raw Logs

<img src={require('@site/static/images/features/logs-raw-image.png').default} alt="logs-raw" width="700"/>

For each log, this page displays:

- **Severity**
- **Timestamp**: The time when the SDK collected the log.
- **Device Model**: the model in which the log happened.
- **Message**: raw log message.

> When expanding each log, its properties and its associated stack trace (only for error and warning logs) are displayed
> 
> - You can customize columns:  
> - You can hide/display preferred columns and reorder them
> - You can filter logs with and without associated timeline details
> **Note**: Not all sessions contain timelines that would provide the context for a log. Filtering on only those logs that contain timelines allows you to investigate faster.

### Actions

- Copy Log Message (copies log message to clipboard)
- Open User Timeline: See the log in the context of a complete session timeline.
