---
title: Custom Dashboards
sidebar_position: 6
---

# Custom Dashboards

In addition to our pre-built dashboards for topics like Crashes, Logs, and Network Requests, each project can create Custom Dashboards. In these dashboards, you can create new analyses. Visualize a time series of Crash data segmented by app-version, or get a ranking of Logs filtered by a specific property.

To get started, click on "Add new widget" in the menu by your dashboard name.
<img src={require('@site/static/images/custom_dashboards/Add_Widget_Menu.png').default} style={{ width: '75%', height: '75%' }} alt="Create new widget" />

## Creating a Chart
You can create multiple types of visualizations. A table of which visualizations are supported is shown below:

| Chart Type | Crashes | Network | Logs | Issues | Moments | Sessions | Spans | Historical | Multi-query |
| ---------- | ------- | ------- | ---- | ------ | ------- | -------- | ----- | ---------- | ----------- |
| Line | :white_check_mark: | :white_check_mark: | :white_check_mark: | :x: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| Table | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :x: | :x:
| Bar | :white_check_mark: | :white_check_mark: | :white_check_mark: | :x: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :x: | :x: |
| Pie | :white_check_mark: | :white_check_mark: | :white_check_mark: | :x: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :x: | :x: |

## Spans (Traces)

Create graphs monitoring Spans performance. You can filter and group by name, outcome, duration, and any attributes you have set on the Span.

- First, select the visualization type you want to see and a source for the first query (more on multi-query combined time series below).
- Then, choose the metric you wish to aggregate. For Spans, Embrace supports both counts and sums of duration.
- Finally, add any filters and group-bys. In addition to our core dimensions, for Spans you can use the Span's name, outcome, duration, and any custom Attributes.

<img src={require('@site/static/images/custom_dashboards/Spans_Chart_Builder.png').default} style={{ width: '75%', height: '75%' }} alt="Spans as a Widget option" />

## Combined Time Series (Line Charts)

You can also create Combined graphs in Line vizualizations. With Combined graphs, you can visualize up to 10 time series together and optionally create a custom time series using arithmetic operators.

**NOTE:** as of 2025-04-29, the chart builder has been improved. Any legacy charts using fills have been moved to multi-query line charts. 

### Adding Formulas to Graphs
For example, if you want to create a rate of successful network requests but not include redirects. To do this, you will:

1. Create 2 queries for Network Request, the first filtered for Status Codes in the range 200-299, and the second in the range 400-599.\
    a. You can also add a group by here. For this example, we group by App Version. See more on grouping functionality below. 
    b. Formulas and multiple queries are only supported on line charts currently. 
2. In the Formula box, add the formula `A / (A+B) * 100` to get a successful network request percentage by App Version.\
    a. The formula field accepts the operators: `+, -, *, /`.\
    b. Order of operations follows standard PEMDAS.
3. Hide the queries by clicking on the eye symbols to just show the formula, which is your successful network request percentage.

<img src={require('@site/static/images/custom_dashboards/Formula_Timeseries_Example.png').default} style={{ width: '75%', height: '75%' }} alt="Multiple queries and formula" />

### Multiple Combined Time Series without a Formula

Since the Formula field is optional, you can visualize up to 10 time series on the same chart with the steps above. Use the eye symbols to show or hide each and leave the Formula field blank.

### Grouping with Combined Time Series

When you combine time series that have groupings defined with a formula, it’s important to understand the rules for how time series are joined given their groupings. The examples below use two time series, but the same rules apply with any greater number of time series.

As a rule, if you have **two timeseries both have groupings**, the grouping of one time series **must be a subset of the other**. The common subset is the join key. Otherwise the combination is invalid.

#### **Valid Groupings:**

- No groupings

    - `A`: *grouped by* `[]` 
    - `B`: *grouped by* `[]` 
    - `A` and `B` have no groupings. Their common join key is the empty set.
   
- Grouping only on one time series

    - `A`: *grouped by* `[”App Version”]` 
        - Returns 100 for `{"App Version": "1.0"}` and 50 for `{"App Version": "2.0"}`
    - `B`: *grouped by* `[]`
        - Returns 10
    - `A` has a grouping and `B` does not. Their common join key is the empty set. 

| Dimension | A | B | A + B | 
| :--------------: | :---------------: | :---------------: |:---------------: |
| `{"App Version": "1.0"}` | 100 | 10 | 110 |
| `{"App Version": "2.0"}` | 50 | 10 | 60 |
 
- Grouping on both time series

    - `A`: *grouped by* `[”App Version”, “Country”]`
    - `B`: *grouped by* `[”App Version”]`
    - Both `A` and `B` have groupings, and `B` is a subset of `A`. Their common subset is `[”App Version”]`.

| Dimension | A | B | A + B | 
| :--------------: | :---------------: | :---------------: |:---------------: |
| `{"App Version": "1.0", "Country": "US"}` | 100 | 10 | 110 | 
| `{"App Version": "1.0", "Country": "MEX"}` | 30 | 10 | 40 |
| `{"App Version": "2.0", "Country": "US"}` | 50 | 20 | 70 |
| `{"App Version": "2.0", "Country": "MEX"}` | 60 | 20 | 80 |

#### **Invalid Groupings:**

- Grouping with no overlapping set

    - `A`: *grouped by* `[”App Version”]` 
    - `B`: *grouped by* `[”OS Version”]` 
    - Both have groupings but neither is a subset of the other.

- Grouping 

    - `A`: *grouped by* `[”App Version”, “Country”, “OS Version”]`
    - `B`: *grouped by* `[”App Version”, “Country”, “Model”]`
    - If A and B have no similar `App Version` and `Country`, the grouping is valid, but neither is a subset of the other and no results are returned.

#### Order of Operations

Additionally, order of operations matters. Consider a situation where you create three queries:

- `A` grouped by `["App Version", "OS Version"]` 
- `B` grouped by `["App Version"]` 
- `C` grouped by `["OS Version"]` 

Then you were to combine them in the formula field:

- **Valid:** `(A + B) + C`: `A` and `B` share a grouping dimension and can combine, then combine with `C`.
- **Invalid:** `A + (B + C)`: `B` and `C` share now group-by dimension and therefore fail. 

<img src={require('@site/static/images/custom_dashboards/Grouping_Error.png').default} style={{ width: '75%', height: '75%' }} alt="Example of Grouping Error" />

## Table of Issues

Our Issues Widget, lets you specify how to list a table of [Issues](/product/issue-monitoring-and-work-flow) . You can filter for certain Issue types, add filters to limit app-versions, or select just Issues [tagged to your team.](/product/tagging)

1. To get started, select the Table visualization option and Issues as the source when making a new Widget.
2. Adjust the columns you want to display and how to filter the Issues.
3. Then once you save, you'll see this table on your dashboard! Issues are sorted by percentage of users impacted in descending order.

<img src={require('@site/static/images/custom_dashboards/Issues_Table.png').default} style={{ width: '75%', height: '75%' }} alt="Issues table widget" />

## Emailing Custom Dashboards

You can also email your Custom Dashboards to yourself or your team. 

Click on the "Create Report" button in the top right of your dashboard. 
<img src={require('@site/static/images/custom_dashboards/Create_Email_Report.png').default} style={{ width: '75%', height: '75%' }} alt="Create Report button" />

You can set a title for your report, add the recipients, and set the frequency of the report. Frequency options include daily and weekly. You can also set the time of day you'd like to receive the report. You can update any of these options after the report is created.

Before sending the report, you can send a test email to the recipients to ensure the report looks as expected. After a few minutes you should receive the test email.

<img src={require('@site/static/images/email-report.png').default} style={{ width: '75%', height: '75%' }} alt="Email Report" />

## Grouping by Exploded Properties

You can group your widgets by exploded properties—these are properties that can contain multiple values which we automatically "explode" so each value can be analyzed individually.

This is especially useful if you’re tagging Sessions, Logs, Spans or other events with multiple values and want to break them out into individual groups. 
For example, if a Session has a property like BRANCH=["master", "develop", "main", "staging"], you can group by `BRANCH`, and each of those values will be treated as its own group.

To group by an exploded property:

1. When adding or editing a Widget, go to the Group By section.
2. Start typing the name of the property you want to use—exploded properties will appear just like any other attribute.
<img src={require('@site/static/images/exploded-properties/group_by.png').default} style={{ width: '75%', height: '75%' }} alt="group by exploded property" />
3. Select the property. If it's a multi-value field, we'll automatically explode it for you.
<img src={require('@site/static/images/exploded-properties/table.png').default} style={{ width: '75%', height: '75%' }} alt="group by exploded property" />


In your results, each unique value will show as its own row or series—allowing you to analyze each individual value separately.
