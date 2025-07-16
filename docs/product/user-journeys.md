---
title: User Journeys
sidebar_position: 101
---

<!--
TODO:
- Add a card under Features on the home page
-->

# User Journeys

With Embrace’s User Journeys feature, you can move beyond simple funnel analysis and gain deeper insights into how users experience your application. User Journeys allow engineering teams to track and analyze all of the steps in a journey that a user takes, providing valuable data on performance impacts and behavioral trends.
## User Flows

User Flows are duration events that are created server-side between two events of telemetry that you choose. You can create flows between any combination of the below events:

User Flows are a powerful way to understand the sequence of events that users experience within your app. They’re created by defining the connection between two specific telemetry events, allowing you to track key performance elements between actions.

<!-- TODO: 
**[PLACEHOLDER FOR SOME SPECIFIC EXAMPLE]**
- Cart render flow example
    1. User selects "view cart" from modal
    2. View change -> API call to fetch data -> page fully rendered
    3. Flow ends
- Pre-transaction checkout flow
    1. User selects checkout button
    2. Page change to checkout page -> user fills in page details -> user selects "Purchase"
        3. (ALTERNATIVE FLOW) User selects "Add payment method" -> add payment method details -> user selects return to checkout -> checkout page fully rendered
-->

## Key Events Used in User Flows

User Flows are built using various telemetry events:

<!--TODO: add links to the instrumentation pages for these-->
- **Spans:** Represent a specific operation within your application.
- **Logs:** Detailed messages generated during user interactions.
- **Breadcrumbs:** Tracks the user's navigation path.
- **Network Events:** Captures data related to HTTP requests and responses.

**Note:** While Traces provide detailed performance information, User Flows offer a more focused approach by connecting events around user behavior, making them easier to interpret and use for analysis.

While instrumenting Traces can be useful in situations like this, they involve more rigid instrumentation and are more duration-focused than outcome and contributing event focused. User Flows allow you to quickly explore, modify, and view analytics that give you insights into user behaviors based on all of the events between two points.

### Creating a User Flow

To create a user flow, you will click on the Create User Flow button in the top right of the page. This will take you to the User Flow creation page where you can set them up.

1.  Click the “Create User Flow” button in the top right of the page.
2.  Name your User Flow and add an optional description.
3.  Select your **start event** and **end event** – these are the events that signify the start and end of a user flow.
4.  **Set a Timeout Threshold:**  We recommend keeping these as short as possible, but they must be less than 5 minutes.

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

<!-- TODO: [**IMAGE OF SUMMARY PAGE WITH DATA**]-->

## User Flow Details

When you click on any of the User Flows you've created, you'll be taken to that User Flow's details page. Here you'll find some helpful tools to analyze your User Flows.

<!-- Only need to explain Issue Rate, attribute correlation, etc., not everything -->
### Issue Rate
<!--
- Treemap - how to read, what is it 
    - Filtering by instance outcomes
    - Filtering by attributes 
-->

<!-- TODO: \[**IMAGE OF TREEMAP WITH DATA**]-->

## Instance List

You can find a filterable list of all instances of the User Flow at the bottom of the page. Clicking any of these instances will take you to the [User Timeline](/docs/product/sessions/user-timeline.md) for further investigation as you need it.

<!-- TODO: \[**IMAGE OF INSTANCE LIST (Maybe a gif showing it taking you to UT??)**]-->

## Filtering for User Flows in Other Pages

<!-- TODO: \[**TBD WHAT MAKES IT**]-->
