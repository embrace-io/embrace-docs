---
title: "Log Message API"
description: Best practices for implementing logs with the Embrace SDK
sidebar_position: 2
---

# Best Practices for Log Messages

## Formatting the Message

Try to make the log message short, yet informative.
Don't pack details about the error into message, as those belong in [Properties]({{< relref "/best-practices/log-message-api#properties">}}).

The alerting capability of log messages is why breaking details into properties is so important. If your log message is a string that says `"Main page took 2.45ms to render"`, you cannot configure any thresholds on this. If the log was instead `"Main page took too long to render"` with a property of `"rendertime"` set to `"> 2ms"`, now you can customize an email alert based on this event. You could configure the alerts so that any render times greater than 5 seconds are emailed directly to you. 

## Properties

Add details of the message as key-value pairs.
Properties are most effective when thought of as filters you can apply to your logs, since this is precisely the feature the dashboard offers.
Making the property values categorical rather than using scalar values will help you achieve this.

For example, if you log an error message with a key of `"cardtype"`, where the value could be one of `"visa"`, `"mastercard"`, or `"amex"`,
you will be able to see if an issue is disproportionately related to a `"cardtype"` on the dashboard.

An example of a less useful property would be `"cart_total"`, where the property value could be any dollar amount. This won't lead to a cohesive set of property values since the cart total amount could vary widely. An alternative that would be more useful is to bucket the amounts (`"< $5"`, `"$5 - $10"`, etc.).

{{< hint warning>}}
{{< readFile file="shared/property-limit.md" >}}
{{< /hint >}}

## Screenshots

Take care not to send your users' private information to Embrace.
When in doubt skip the screenshot.

## Using Breadcrumbs Instead

If you're looking to add context around sessions and don't need the immediacy that Log Events provide, we recommend using [Breadcrumbs]({{< relref "/best-practices/breadcrumbs">}}) instead as they have a lower overhead cost.


