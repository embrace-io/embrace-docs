---
title: Grafana Integration
description: Learn about the Embrace Spans API to pull spans data 
sidebar_position: 1
---

# Spans API Grafana Integration

## Prerequisites

- Grafana ≥ 9.1.0
- Embrace Spans API Token. Request a token from your Embrace account manager.

## Setting Up Embrace as a Data Source to retrieve spans

Follow these steps to add Tempo as a data source in the Grafana dashboard:
1. Click the "Open Menu" icon to go to the "Connections -> Data sources" page.
1. Click the "Add new data source" button on the top right page and select "Tempo".
1. Configure it with the following fields:
   - Name: `embrace-spans-api`.
   - Under "Connection" section, set "URL": `https://api.embrace.io/spans`.
   - Under "Authentication" section, click the button "Add header":
      - Header: `Authorization`, Value: `Bearer <YOUR_API_TOKEN>` as your token string. For example, if your API token is `e2d75f07a40843f0b8a53d1e3201edba`, your token string should be `Bearer e2d75f07a40843f0b8a53d1e3201edba`.

## Exploring Spans Data

If you click on the "Explore" tab on Grafana's sidebar, and you select the "embrace-spans-api" data source, you can start querying your spans data.
There are two modes you can do queries, the "Search" mode and the "TraceQL" mode.

### Search Mode
Here you can use the status dropdown to search for successful or error spans.
You can also search using the tags, for example, using the `statusMessage` tag. 
On the `Tags` dropdown you will be able to select any attribute that is present in your spans data
(see the [Embrace attributes section](/spans-api/index.md#embrace-attributes)).

<img src={require('@site/static/images/spans-api/search.png').default} alt="Grafana search mode" />

One thing to note is that if you select an existing tag, you will be able to see the tag values that are present in your data:

<img src={require('@site/static/images/spans-api/tag_values.png').default} alt="Grafana search mode, searching at tag values" />

Another filter you can use is the `Span name`:

<img src={require('@site/static/images/spans-api/span_name.png').default} alt="Grafana search mode, searching with span name" />

### TraceQL Mode
You can also search for spans using [TraceQL language](https://grafana.com/docs/tempo/latest/traceql/#query-with-traceql).
<img src={require('@site/static/images/spans-api/traceql.png').default} alt="Grafana traceql mode" />
