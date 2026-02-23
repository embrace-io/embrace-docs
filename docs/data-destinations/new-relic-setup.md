---
title: New Relic Integration
description: Learn about the Embrace <> New Relic integration
sidebar_position: 5
---

# New Relic Integration

## Prerequisites

- Have an active New Relic account.

## Configuration

### Pulling your New Relic API Key ([New Relic documentation](https://docs.newrelic.com/docs/apis/intro-apis/new-relic-api-keys/#license-key))

1. Log into your New Relic account
2. Navigate to your [API Keys](https://one.newrelic.com/admin-portal/api-keys/home).
3. Search the "INGEST-LICENSE" type key (if you don't have one, you need to create a new one)
4. Click on the "..." button
   <img src={require('@site/static/images/data-destinations/new_relic_api_keys.png').default} alt="Image showing New Relic field needed" />
5. Click on the "Copy key" button

### Pulling your New Relic Region ([New Relic documentation](https://docs.newrelic.com/docs/accounts/accounts-billing/account-setup/choose-your-data-center/))

1. Your account can be in the US or EU region. To find out which region your account is in, you can check the URL of your New Relic account. If your URL starts with https://one.newrelic.com/ it is in US. If it starts with https://one.eu.newrelic.com/ it is in EU.
