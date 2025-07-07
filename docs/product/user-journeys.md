---
title: User Journeys
sidebar_position: 101
---

# User Journeys

With Embrace's User Journeys feature, you can do more than just perform funnel analysis. User Journeys is designed to give you deeper insight into how performance affects user's and their behaviors.

**[PLACEHOLDER FOR SOME SPECIFIC EXAMPLE]**

## User Flows

User Flows are the grouping of events between two pieces of telemetry that you emit. You can create flows between any combination of the below events:

- Spans
- Network events
- Logs
- Breadcrumbs

### Creating a User Flow

To create a user flow, you will click on the Create User Flow button in the top right of the page. This will take you to the User Flow creation page where you can set them up.

Give your user flow a name and an optional description. After this, you'll select your start and end events.

For high cardinality fields such as Logs, Breadcrumbs, and Network events, you can use wildcarding patterns. If you want to test whether the wildcarding pattern you've entered matches results you know already exist in your data, you can click the Test button at the end of the value field to see how many matching values from sessions there are. The test button checks:

- **Logs:** The last 1 million rows
- **Breadcrumbs, Spans, and Network Events:** The last 24 hours of Sessions

<img src={require('@site/static/images/user-journeys/UJ-Create-Flow-Wildcarding.png').default} style={{ width: '75%', height: '75%' }} alt="Create new widget" />

** Start events are the start timestamp and end are the end

Once you've created your start and end event, you can optionally set a timeout threshold. It is strongly suggested that you make these as short as is reasonable, but a User Flow can be no longer than 5 minutes. User Flows are intended to be the smallest useful grouping of raw telemetry events, and in future versions you will be able to stitch these flows together serially.

Newly created user flows collect data on a go-forward basis. This means that immediately after you create a new user flow, you may not see any data. As new sessions come in, you'll see data start to populate. Additionally, User Flows cannot be modified after being created. If you need to change them, you'll need to delete the existing User Flow and create a new one. 

## User Flow Summary

On the User Flow summary page, you'll see a list of all of your currently configured User Flows with some useful information. 

(Copy from tooltips)

- **Completion:** This is the percentage of User Flows that were seen that made it from the Start Event to the End Event inside of the time threshold and without exiting the app (find a less ambiguous term for "exiting"). This is shown in comparison across the time windo you have selected.
- **Abandon:** This is the percentage of User Flows that timed out or were abandoned through normal means (entered another flow, exited the app)
- **Error:** These are the percentage of User Flows that ended in an error. 
- **Session Volume:** This is the count of sessions that have been seen with this User Flow across the time selected. 

## User Flow Details

When you click on any of the User Flows you've created, you'll be taken to that User Flow's details page. Here you'll find some helpful tools to analyze your User Flows.

1. Completion rate

- Treemap - how to read, what is it 

- Instance list -> fields and taking you to UT

- Show what is in the User Timeline -> link to the UT page

## Filtering for User Flows in Other Pages




