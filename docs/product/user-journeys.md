---
title: User Journeys
sidebar_position: 6
---

## :tada: What's New

We've heard your feedback! Beginning in October 2025, we are adding a series of features to allow User Flows to be more flexibly built and used contextually throughout the dash.

- User Flows data in [Custom Dashboards](/product/boards/custom-dashboards.md), [Alerts](/product/alerting.md), and [Custom Metrics](/metrics-forwarding/custom-metrics/#get-started).
- More options for start and end events in User Flows.
- Better User Flow visualization markers in the [User Timeline](/product/sessions/user-timeline.md).
- User Flow filters on all Issues pages and on the Sessions page.

---

# User Journeys

With Embrace’s User Journeys feature, you can move beyond simple funnel analysis and gain deeper insights into how users experience your application. User Journeys allow engineering teams to track and analyze all the events in a journey that a user takes, providing valuable data on performance impacts and behavioral trends.

## User Flows

User Flows are a powerful way to understand the sequence of events that users experience within your app. They’re created by defining the connection between two specific telemetry events, allowing you to track key performance elements between actions. Think about User Flows as the first order logical grouping of all the base telemetry events you can emit into a contextualized view of a user's experience.

What User Flows **ARE**:

- A task that has some defined entry point and a defined end point.
  - **Example**: Login page rendered to home page rendered (e.g. the user logs in).
  - **Example**: Clicks "Add Credit Card" button to "Save Credit Card" process successful.
- The path to get from event A to event B may vary, but the intention of the task should nearly always to be to arrive at some end event.
- The building blocks in a larger end-to-end journey.

What User Flows **ARE NOT**:

- A total experience through the application (e.g. a journey mapping).
  - In upcoming versions, you will be able to "stitch" flows together end to end to understand how a user moves from task to task through your application.

You can find User Flows under the Performance tab in the sidebar on the left of your dashboard. Here is a brief walkthrough video of User Flows in Embrace. Continue reading below for more details on creating and refining User Flows.

<div>
    <iframe width="560" height="315" src="https://www.youtube.com/embed/_2yXGHfpW70" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

### Important Considerations

1. **No concurrent User Flows on the same device**: On a single device, only one User Flow can be active at any given time.
   If a new User Flow starts while another is still in progress, the previous one is automatically terminated.

   **Example**: Two User Flows are defined for the same app

   - **User Flow A**: Start Event is "Span A" and End Event is "Breadcrumb A".
   - **User Flow B**: Start Event is "Span B" and End Event is "Breadcrumb B".

   Event timeline:

- 10:00 — "Span A" occurs.
- 10:01 — "Span B" occurs.
- 10:02 — "Breadcrumb A" occurs.
- 10:03 — "Breadcrumb B" occurs.

  **Result**

- "User Flow A" ends with the outcome **Abandoned / New User Flow Started**.
- "User Flow B" ends with the outcome **Complete**.

2. **User Flows may span multiple sessions**: A User Flow is not constrained to a single session. It may start in one session and complete in a later session (e.g., start in Session 1 and finish in Session 3).

### Outcomes

There are different possibles outcomes related to a "User Flow" that it's important to understand.

- **Completed:** User Flow made from the Start Event to the End Event inside the time threshold and without exiting the app.
- **Error:** User Flow made the Start Event but ended in an error.
  - **Android/iOS**: It happened a "Crash" before the end event.
  - **Web**: Coming soon, it happened an "Exception" before the end event.
- **Abandoned:** User Flow made the Start Event but didn't reach the End Event.
  - **New User Flow Started**: it happened a new Start Event before the end event.
  - **App Exit**:
    - **Android/iOS**: the customer exited the application.
    - **Web**: it's not possible.
  - **Timeout**: it exceeded the timeout configured.

### Start and End Events

User Flows are built using various telemetry events:

- [**Breadcrumbs:**](/android/features/breadcrumbs) Track the user's navigation path.
- [**Logs:**](/product/logs/) Detailed messages generated during user interactions.
- [**Network events:**](/product/network/network-monitoring/) Capture data related to HTTP requests and responses.
- [**Spans:**](/product/traces/technical-details) Represent a specific operation within your application.
- User Taps: See your framework-relevant Tap Capture, where supported.
- Views, Custom Views, and Web Views: See your framework-relevant documentation on Views, Custom Views, and Web Views.

**Note:** While Traces provide detailed performance information, User Flows offer a more focused approach by connecting events around user behavior, making them easier to interpret and use for analysis.

While instrumenting Traces can be useful in situations like this, they involve more rigid instrumentation and are more duration-focused than outcome and contributing event-focused. User Flows allow you to quickly explore, modify, and view analytics that give you insights into user behaviors based on all of the events between two points.

## Creating a User Flow

To create a User Flow, you will click on the "Create User Flow" button in the top right of the page. This will take you to the User Flow creation page where you can set them up.

As an example, let's assume you have an e-commerce application. A key component of your user's experience would be searching for and rendering specific results pages. So, here you may want to set up a User Flow that starts at a Breadcrumb you already have for `Entered search` and finishes at the end of a Span named `inflateResultsView`.

To create this User Flow, you will:

1. From the User Flows page, select "Create User Flow" in the upper right corner.
2. In the Create Flow screen, fill in the details of your User Flow. \
   a. Give it a name (required) and a description (optional). Both of these will be visible on the summary page after you create User Flows.\
   b. Set your start event as Breadcrumb = `Entered search` and Span = `inflateResultsView` as your end event.
3. Set a Timeout for your User Flow.\
   a. We recommend keeping these as short as possible, but they must be less than 5 minutes. Time limit for completion
   before termination as "Abandon / Timeout".

**Wildcarding patterns:**

For high cardinality fields such as Breadcrumbs, Logs, Networks, and Web Views events, you can use wildcarding patterns to filter data. The "Test" button checks if your pattern matches existing data.

- **Breadcrumbs, logs, network, and web views:** Checks the last 1 million rows and the last 24 hours of sessions.

<img src={require('@site/static/images/user-journeys/UJ-Create-Flow-Wildcarding.png').default} style={{ width: '75%', height: '75%' }} alt="Create new widget" />

**Note:** Newly-created User Flows collect data on a going-forward basis. This means that immediately after you create a new User Flow, you may not see any data. As new sessions come in, you'll see data start to populate. Additionally, User Flows cannot be modified after being created. If you need to change them, you'll need to delete the existing User Flow and create a new one.

## User Flows Summary page

On the User Flows Summary page, you'll see a list of all of your currently-configured User Flows with some useful information.

- **Completion:** This is the percentage of User Flows that ended in a "Complete" outcome. This is shown in comparison across the time window you have selected.
- **Error:** This is the percentage of User Flows that ended in an "Error" outcome.
- **Abandon:** This is the percentage of User Flows that ended in an "Abandoned" outcome.
- **Session Volume:** This is the count of sessions that contained this User Flow. This is shown in comparison across the time window you have selected.

<img src={require('@site/static/images/user-journeys/User-Flows-Summary.png').default} style={{ width: '75%', height: '75%' }} alt="Create new widget" />

## User Flow Details page

When you click on any of the User Flows you've created, you'll be taken to that User Flow's details page. Here, you'll find some helpful tools to analyze your User Flows. You can see Completion Percentage and Session Volume broken down by app version, as well as Issue Rates and Abandon Percentage which are covered in detail below.

### Issue Rate

The "Issue Rate" tab contains two sub-tabs. The first is "Issue Distribution", which gives you an idea of the makeup of all Issues that are being seen during the selected User Flows in aggregate.

Issue Definitions:

- [**ANRs** (Android)](/product/troubleshooting/anr-reporting/)
- [**Crashes** (Android / iOS)](/product/crashes/)
- [**Error Logs** (Android / iOS / Web)](/product/troubleshooting/error-logs/)
- **Network Errors (Android / iOS / Web)**: Any 4xx or 5xx status code or connection error

On the "Properties Correlation" sub-tab, you can dig into how certain attributes of your User Flows correlate to, and make up, outcomes. You can filter by specific outcomes, as well as select up to 3 different property keys to visualize in the treemap below. This can help you quickly find specific properties that are having outsized issues and reduce the space that you have to explore to find issues.

Hovering your mouse over the treemap, you'll see a tooltip that breaks down the distribution of User Flow outcomes for flows with that specific property value. By clicking on the cell, you'll see the instance list below filter just for that attribute so you can easily find some example sessions to dig into.

<img src={require('@site/static/images/user-journeys/User-Flows-Details-Treemap.png').default} style={{ width: '75%', height: '75%' }} alt="Create new widget" />

### Instance List

You can find a filterable list of all instances of the User Flow at the bottom of the page. Clicking any of these instances will take you to the [User Timeline](/product/sessions/user-timeline.md) for further investigation as you need it.

## User Flows in Boards, Alerts, and Custom Metrics

### Alerts and Custom Metrics

**NOTE**: User Flows are processed using data that comes in multiple payloads from the client. As such, there can be a time delay of up to 10 minutes. Due to this potential delay, we don't allow 5 minute aggregations.
