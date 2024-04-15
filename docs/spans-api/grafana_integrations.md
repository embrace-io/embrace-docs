---
title: Grafana Integration
description: Learn about the Embrace Spans API to pull spans data 
sidebar_position: 1
---

# Metrics API Grafana Integration

## Prerequisites

- Grafana ≥ 9.1.0
- Embrace Spans API Token. Request a token from your Embrace account manager.

## Setting Up Embrace as a Data Source to retrieve spans

Follow these steps to add Tempo as a data source in the Grafana dashboard:
1. Click the gear icon to go to the Configurations page.
2. Click on "Add data source" and select Tempo.
3. Name your source "embrace-spans-api" and set the following fields:
    - `URL`: `https://api.embrace.io/spans`
    - Under `Custom HTTP Headers`, add a header with a name `Authorization` and use `Bearer <YOUR_API_TOKEN>` as your token string. For example, if your API token is `e2d75f07a40843f0b8a53d1e3201edba`, your token string should be `Bearer e2d75f07a40843f0b8a53d1e3201edba`.
