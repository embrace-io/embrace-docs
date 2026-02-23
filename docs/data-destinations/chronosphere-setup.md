---
title: Chronosphere Integration
description: Learn about the Embrace <> Chronosphere integration
sidebar_position: 1
---

# Chronosphere Integration

## Prerequisites

- Have an active Chronosphere account.

## Configuration

### Pulling your Chronosphere Service Account Unrestricted Token's ([Chronosphere documentation](https://docs.chronosphere.io/administer/accounts-teams/service-accounts#create-an-unrestricted-service-account))

1. Log into your Chronosphere account.
2. Navigate to your [service accounts](https://partner-threec.chronosphere.io/service-accounts?column=name&order=asc)
3. Create a new service account called "embrace-integration".
4. Service account type must be "unrestricted".
5. Copy the service account token (**not the service account ID**).

<img src={require('@site/static/images/data-destinations/chronosphere_token.png').default} alt="Image showing Chronosphere field needed" />

### Pulling your Tenant ID

1. Navigate to your Chronosphere account.
2. Share the "tenant ID" that you access on (it is on the URL of the page). For example, in this case it is "embrace-integration".

<img src={require('@site/static/images/data-destinations/chronosphere_tenant_id.png').default} alt="Image showing Chronosphere field needed" />

## Querying your data

### Metrics

To start analyzing your Embrace metrics open the "Dashboard" panel, and in the "metrics" field start typing "embrace". All Metrics will be prefaced with `embrace_`.

<img src={require('@site/static/images/data-destinations/chronosphere.png').default} alt="Screenshot of Chronosphere UI" />
