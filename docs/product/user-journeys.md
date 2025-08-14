---
title: User Journeys
sidebar_position: 101
---

# User Journeys

With Embrace’s User Journeys feature, you can move beyond simple funnel analysis and gain deeper insights into how users experience your application. User Journeys allow engineering teams to track and analyze all of the events in a journey that a user takes, providing valuable data on performance impacts and behavioral trends.

## User Flows

User Flows are a powerful way to understand the sequence of events that users experience within your app. They’re created by defining the connection between two specific telemetry events, allowing you to track key performance elements between actions. Think about User Flows as the first order logical grouping of all of the base telemetry events you can emit into a contextualized view of a user's experience.

You can find User Flows under the Performance tab in the sidebar on the left of your dashboard.

## Key Events Used in User Flows

User Flows are built using various telemetry events:

- [**Spans:**](/product/traces/technical-details) Represent a specific operation within your application.
- [**Logs:**](/product/logs/) Detailed messages generated during user interactions.
- [**Breadcrumbs:**](/android/features/breadcrumbs) Tracks the user's navigation path.
- [**Network Events:**](/product/network/network-monitoring/) Captures data related to HTTP requests and responses.

**Note:** While Traces provide detailed performance information, User Flows offer a more focused approach by connecting events around user behavior, making them easier to interpret and use for analysis.

While instrumenting Traces can be useful in situations like this, they involve more rigid instrumentation and are more duration-focused than outcome and contributing event focused. User Flows allow you to quickly explore, modify, and view analytics that give you insights into user behaviors based on all of the events between two points.

### Creating a User Flow

To create a user flow, you will click on the Create User Flow button in the top right of the page. This will take you to the User Flow creation page where you can set them up.

As an example, let's assume you have an eCommerce application. A key componenet of your user's experience would be searching for and rendering specific results pages. So, here you may want to set up a User Flow that starts at a Breadcrumb you already have for `Entered search` and finishes at the end of a Span named `inflateResultsView`. 

To create this User Flow, you will:
1. From the User Flows page, select Create User Flow in the upper right corner.
2. In the Create Flow screen, fill in the details of your User Flow. \
    a. Give it a name (required) and a description (optional). Both of these will be visible on the summary page after you create User Flows.\
    b. Set your start event as Breadcrumb = `Entered search` and Span = `inflateResultsView` as your end event.
3. Set a Timeout for your User Flow.\
    a. We recommend keeping these as short as possible, but they must be less than 5 minutes.

**Wildcarding Patterns:**

For high cardinality fields such as Logs, Breadcrumbs, and Network events, you can use wildcarding patterns to filter data. The "Test" button checks if your pattern matches existing data in your session data.

- **Logs:** Checks the last 1 million rows.
- **Breadcrumbs, Spans, Network Events:** Checks the last 24 hours of sessions.

<img src={require('@site/static/images/user-journeys/UJ-Create-Flow-Wildcarding.png').default} style={{ width: '75%', height: '75%' }} alt="Create new widget" />

**Note:** Newly created user flows collect data on a go-forward basis. This means that immediately after you create a new user flow, you may not see any data. As new sessions come in, you'll see data start to populate. Additionally, User Flows cannot be modified after being created. If you need to change them, you'll need to delete the existing User Flow and create a new one. 

## User Flow Summary

On the User Flow summary page, you'll see a list of all of your currently configured User Flows with some useful information. 

- **Completion:** This is the percentage of User Flows that were seen that made it from the Start Event to the End Event inside of the time threshold and without exiting the app (find a less ambiguous term for "exiting"). This is shown in comparison across the time windo you have selected.
- **Abandon:** This is the percentage of User Flows that timed out or were abandoned through normal means (entered another flow, exited the app).
- **Error:** These are the percentage of User Flows that ended in an issue. 
- **Session Volume:** This is the count of sessions that have been seen with this User Flow across the time selected. 

<img src={require('@site/static/images/user-journeys/User-Flows-Summary.png').default} style={{ width: '75%', height: '75%' }} alt="Create new widget" />

## User Flow Details

When you click on any of the User Flows you've created, you'll be taken to that User Flow's details page. Here you'll find some helpful tools to analyze your User Flows. You can see Completion Rates and Session Volume broken down by app version, as well as Issue Rates which are covered in detail below.

### Issue Rate

In the Issue Rate tab, you get a couple sub-tabs. The first is Issue Distribution, and gives you an idea of the makeup of all Issues that are being seen during the selected User Flows in aggregate. 

On the Properties Correlation sub-tab, you can dig into how certain attributes of your User Flows correlate to and make up outcomes. You can filter by specific outcomes, as well as select up to 3 different property keys to visualize in the treemap below. This can help you quickly find specific properties that are having outsized issues and reduce the space that you have to explore to find issues.

Hovering your mouse over the treemap you'll see a tooltip that breaks down the distribution of User Flow outcomes for flows with that specific property value. By clicking on the cell, you'll see the instance list below filter just for that attribute so you can easily find some example sessions to dig into. 

<img src={require('@site/static/images/user-journeys/User-Flows-Details-Treemap.png').default} style={{ width: '75%', height: '75%' }} alt="Create new widget" />

## Instance List

You can find a filterable list of all instances of the User Flow at the bottom of the page. Clicking any of these instances will take you to the [User Timeline](/product/sessions/user-timeline.md) for further investigation as you need it.
