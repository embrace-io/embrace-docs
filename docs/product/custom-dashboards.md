---
title: Custom Dashboards
sidebar_position: 6
---

# Custom Dashboards

In addition to our pre-built dashboards for topics like Crashes, Logs, and Network Requests, each project can create Custom Dashboards.  In these dashboards, you can create new analyses.  Visualize a time series of Crash data segmented by app-version, or get a ranking of Logs filtered by a specific property.

To get started, click on "Add new widget" in the menu by your dashboard name.
<img src={require('@site/static/images/Spans widgets > 01 add menu.png').default} style={{ width: '75%', height: '75%' }} alt="create new widget" />

## Creating a Chart
You can create multiple types of visualizations. A table of which visualizations are supported is shown below:

| Chart Type | Crashes | Network | Logs | Issues | Moments | Sessions | Spans | Historical | Multi-query |
| ---------- | ------- | ------- | ---- | ------ | ------- | -------- | ----- | ---------- | ----------- |
| Line | :white_check_mark: | :white_check_mark: | :white_check_mark: | :x: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| Table | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :x: | :x:
| Bar | :white_check_mark: | :white_check_mark: | :white_check_mark: | :x: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :x: | :x: |
| Pie | :white_check_mark: | :white_check_mark: | :white_check_mark: | :x: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :x: | :x: |

## Spans (Traces)

Create graphs monitoring Spans performance.  You can filter and group by name, outcome, duration, and any attributes you have set on the Span.

**UPDATE ME**\
First, select the Spans category when making a new Widget:
<img src={require('@site/static/images/widget_data_types_new.png').default} style={{ width: '75%', height: '75%' }} alt="Spans as a Widget option" />

**UPDATE ME**\
Then, choose the metric you wish to aggregate.  For Spans, Embrace supports both counts and sums of duration.
<img src={require('@site/static/images/Spans widgets > 03 pick metric.png').default} style={{ width: '75%', height: '75%' }} alt="Span metric options" />

**UPDATE ME**\
Finally, add any filters and group-bys.  In addition to our core dimensions, for Spans you can use the Span's name, outcome, duration, and any custom Attributes.
<img src={require('@site/static/images/Spans widgets > 04 filters and group-bys.png').default} style={{ width: '75%', height: '75%' }} alt="Spans as a Widget option" />

## Combined Time Series (Line Charts)

You can also create Combined graphs in Line vizualizations. With Combined graphs, you can visualize up to 10 time series together and optionally create a custom time series using arithmetic operators.

**NOTE:** as of 2025-04-29, the chart builder has been improved. Any legacy charts using fills have been moved to multi-query line charts. 

### Adding Formulas to Graphs
For example, if you want to create a rate of successful network requests but not include redirects. To do this, you will:

1. Create 2 queries for Network Request, the first filtered for Status Codes in the range 200-299, and the second in the range 400-599.\
    a. Formulas and multiple queries are only supported on line charts currently. 
2. In the Formula box, add the formula `A/(A+B) * 100` to get a percentage.\
    a. The formula field accepts the operators: `+, -, *, /`.\
    b. Order of operations follows standard PEMDAS.
3. Hide the queries above by clicking on the eye symbols to just show the formula, which is your rate.

**UPDATE ME**\
<img src={require('@site/static/images/combined_widget_multiquery_formula.png').default} style={{ width: '75%', height: '75%' }} alt="Multiple queries and formula" />

### Multiple Combined Time Series without a Formula

Since the Formula field is optional, you can visualize up to 10 time series on the same chart with the steps above. Use the eye symbols to show or hide each and leave the Formula field blank.

### Grouping with Combined Time Series

In the broadest sense, the group-by's for each query must have some overlapping set. For example, if you were to set one query to "Crash Count" grouped by "App Version", and the second query to "Session Count", grouped by "Build", then perform some operation on them, this would be an illegal formula.

**INSERT EXAMPLE ERROR MESSAGE**

Additionally, order of operations matters. Consider a situation where you create three queries:
- `A` grouped by `[app_version, os_version]` 
- `B` grouped by `[app_version]` 
- `C` grouped by `[os_version]` 

Then you were to combine them in the formula field:

:white_check_mark: `(A + B) + C`: `A` and `B` share a grouping dimension and can combine, then combine with `C`.\
:x: `A + (B + C)`: `B` and `C` share now group-by dimension and therefore fail. 

## Table of Issues

Our Issues Widget, lets you specify how to list a table of [Issues](/product/issue-monitoring-and-work-flow) .  You can filter for certain Issue types, add filters to limit app-versions, or select just Issues [tagged to your team.](/product/tagging)

To get started, click on the Issues category when making a new Widget:

**UPDATE ME**\
<img src={require('@site/static/images/widget_data_types_issues_selection.png').default} style={{ width: '75%', height: '75%' }} alt="Issues as a Widget option" />

Adjust the columns you want to display and how to filter the Issues

**UPDATE ME**\
<img src={require('@site/static/images/issues widget filter.png').default} style={{ width: '75%', height: '75%' }} alt="customize your Issues list" />

Then once you save, you'll see this table on your dashboard!  Issues are sorted by percentage of users impacted:
<img src={require('@site/static/images/issues widget dashboard.png').default} style={{ width: '75%', height: '75%' }} alt="final table" />

## Emailing Custom Dashboards

You can also email your Custom Dashboards to yourself or your team. 

Click on the "Create Report" button in the top right of your dashboard.  
<img src={require('@site/static/images/email-report-form.png').default} style={{ width: '75%', height: '75%' }} alt="Create Report button" />

You can set a title for your report, add the recipients, and set the frequency of the report. Frequency options include daily and weekly. You can also set the time of day you'd like to receive the report. You can update any of these options after the report is created.

Before sending the report, you can send a test email to the recipients to ensure the report looks as expected. After a few minutes you should receive the test email.
<img src={require('@site/static/images/email-report.png').default} style={{ width: '75%', height: '75%' }} alt="Email Report" />
