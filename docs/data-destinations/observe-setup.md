---
title: Observe Integration
description: Learn about the Embrace <> Observe integration
sidebar_position: 6
---

# Observe Integration

## Prerequisites

- Have an active Observe account.

## Configuration

### Pulling your Observe Datastream Token ([Observe documentation](https://docs.observeinc.com/docs/datastreams#/))

1. Log into your Observe account.
2. Navigate to your "Data & Integrations -> Datastreams" settings in the left-side navigation menu.
   <img src={require('@site/static/images/data-destinations/observe_left_menu.png').default} alt="Observe Left Menu" />
3. Click on "Create datastream" at top right or click on an existing datastream.
   <img src={require('@site/static/images/data-destinations/observe_create_token0.png').default} alt="Observe Create Datastream" />
4. You must add a "Name" and "Description". Also, you need to decide how you much retention you want to have.
   <img src={require('@site/static/images/data-destinations/observe_create_datastream.png').default} alt="Observe Create Datastream" />
5. Click on "Create -> Token" at the middle or at the top right.
   <img src={require('@site/static/images/data-destinations/observe_create_token.png').default} alt="Observe Create Token" />
6. You must add a "Name" and "Description"  
   <img src={require('@site/static/images/data-destinations/observe_create_token1.png').default} alt="Observe Create Token" />
7. Copy the token value because you will not be able to get it again later. You will have to use it on the Embrace dashboard.
   <img src={require('@site/static/images/data-destinations/observe_create_token2.png').default} alt="Observe Create Token" />

### Pulling your Observe Customer ID ([Observe Documentation](https://docs.observeinc.com/docs/where-do-i-find-my-customer-id))

1. Log into your Observe account.
2. Get the "Customer ID" from your URL. If the URL is: `https://123456789012.observeinc.com`, customer id is: `123456789012`. You will have to use it on the Embrace dashboard.