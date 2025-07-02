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

For high cardinality fields such as Logs, Breadcrumbs, and Network, you can define events using wildcarding patterns. If you want to test whether the wildcarding pattern you've entered matches results you know already exist, you can click the Test button at the end of the value field and see how many matching values from sessions there are. The test button checks:

- The last 1 million Logs
- The last 24 hours of Breadcrumbs or Network Events

<img src={require('@site/static/images/user-journeys/UJ-Create-Flow-Wildcarding.png').default} style={{ width: '75%', height: '75%' }} alt="Create new widget" />

Once you've created your start and end event, you can optionally set a timeout threshold. It is strongly suggested that you make these as short as is reasonable, but a User Flow can be no longer than 5 minutes. User Flows are intended to be the smallest useful grouping of raw telemetry events, and in future versions you will be able to stitch these flows together serailly.

Newly created user flows collect data on a go-forward basis. This means that right after you create a new user flow, you may not see any data. As new sessions come in, you'll see data start to populate.

## User Flow Details

When you click on any of the User Flows you've created, you'll be taken to that User Flow's details page. 

- Treemap - how to read, what is it 

- Instance list -> fields and taking you to UT

- Show what is in the User Timeline -> link to the UT page



