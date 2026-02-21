---
title: JavaScript Exceptions
sidebar_position: 4
---

The JavaScript Exceptions page gives an overview of all handled and unhandled exceptions on web pages captured by Embrace.

# Exceptions Summary and List

The Exceptions page provides a summary of all exceptions encountered, the total unique exceptions encountered, and the number of users that have been affected by these exceptions.

<img src={require('@site/static/images/features/js-exceptions/exceptions-summary.png').default} alt="JavaScript Exceptions Summary" />

The Exceptions page also provides a list of all specific exceptions. This list represents all the exceptions that
occurred within a given time period, grouped into events that correspond to the same type of exception. If you want to
see specific instance details, you can drill down by selecting one of the grouped rows. This list is also filterable by
dimensions like country and version.

<img src={require('@site/static/images/features/js-exceptions/exceptions-list.png').default} alt="JavaScript Exceptions List" />

## Exception Details

Clicking any specific exception from the Exception list lets a developer dive into the details of that issue.  

Details include the number of times the exception occurred, as well as contextual information like the stack traces in which the exception occurred and the [User Timeline](/product/sessions/user-timeline.md) details that include all operations leading up to the exception.

<img src={require('@site/static/images/features/js-exceptions/exceptions-details.png').default} alt="JavaScript Exceptions Details" />

<img src={require('@site/static/images/features/js-exceptions/exceptions-affected-sessions.png').default} alt="JavaScript Exceptions Affected Sessions" />
