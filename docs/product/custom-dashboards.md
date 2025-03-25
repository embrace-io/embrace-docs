---
title: Custom Dashboards
sidebar_position: 6
---

# Custom Dashboards

In addition to our pre-built dashboards for topics like Crashes, Logs, and Network Requests, each project can create Custom Dashboards.  In these dashboards, you can create new analyses.  Visualize a time series of Crash data segmented by app-version, or get a ranking of Logs filtered by a specific property.

To get started, click on "Add new widget" in the menu by your dashboard name.
<img src={require('@site/static/images/Spans widgets > 01 add menu.png').default} alt="create new widget" />

## Spans (Traces)

Create graphs monitoring Spans performance.  You can filter and group by name, outcome, duration, and any attributes you have set on the Span.

First, select the Spans category when making a new Widget:
<img src={require('@site/static/images/widget_data_types_new.png').default} alt="Spans as a Widget option" />

Then, choose the metric you wish to aggregate.  For Spans, Embrace supports both counts and sums of duration.
<img src={require('@site/static/images/Spans widgets > 03 pick metric.png').default} alt="Span metric options" />


Finally, add any filters and group-bys.  In addition to our core dimensions, for Spans you can use the Span's name, outcome, duration, and any custom Attributes.
<img src={require('@site/static/images/Spans widgets > 04 filters and group-bys.png').default} alt="Spans as a Widget option" />

## Combined Timeseries 

You can also create Combined graphs. With Combined graphs, you can visualize up to 10 timeseries in the same graph and optionally create a custom time series using arithmetic operators.

For example, if you want to create a rate of Crashes in the foreground and Network Connection Errors > 100 ms over your total sessions. To do this, you will:
1. Select the Combined data type from the picker.
2. Line charts are the only available graph type currently, so you'll be directed to the query builder (more visualization options coming soon).
3. Create queries to gather Crash Count, ANR Count, and Session Count with the applicable filters.
4. In the Formula box, add the formula `(A+B)/C`.\
    a. The formula field accepts the operators: `+, -, *, /`.\
    b. Order of operations follows standard PEMDAS.
5. Hide the queries above by clicking on the eye symbols to just show the formula, which is your rate.
<img src={require('@site/static/images/combined_widget_multiquery_formula.png').default} alt="Multiple queries and formula" />
<img src={require('@site/static/images/combined_widget_formula_preview.png').default} alt="Multiple queries and formula" />
Note: Queries in Combined type charts do not support group-bys.

## Table of Issues

Our Issues Widget, lets you specify how to list a table of [Issues](/product/issue-monitoring-and-work-flow) .  You can filter for certain Issue types, add filters to limit app-versions, or select just Issues [tagged to your team.](/product/tagging)

To get started, click on the Issues category when making a new Widget:
<!--<img src={require('@site/static/images/issues in dashboard.png').default} alt="Issues as a Widget option" />-->
<img src={require('@site/static/images/widget_data_types_issues_selection.png').default} alt="Issues as a Widget option" />

Adjust the columns you want to display and how to filter the Issues
<img src={require('@site/static/images/issues widget filter.png').default} alt="customize your Issues list" />

Then once you save, you'll see this table on your dashboard!  Issues are sorted by percentage of users impacted:
<img src={require('@site/static/images/issues widget dashboard.png').default} alt="final table" />

## Emailing Custom Dashboards

You can also email your Custom Dashboards to yourself or your team. 

Click on the "Create Report" button in the top right of your dashboard.  
<img src={require('@site/static/images/email-report-form.png').default} alt="Create Report button" />

You can set a title for your report, add the recipients, and set the frequency of the report. Frequency options include daily and weekly. You can also set the time of day you'd like to receive the report. You can update any of these options after the report is created.

Before sending the report, you can send a test email to the recipients to ensure the report looks as expected. After a few minutes you should receive the test email.
<img src={require('@site/static/images/email-report.png').default} alt="Email Report" />
