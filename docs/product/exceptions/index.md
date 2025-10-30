---
title: Exceptions
sidebar_position: 7
---

# Exceptions

You can use Embrace to capture exceptions and prioritize issues affecting your users' experiences.

## Exceptions vs. Crashes

While crashes and exceptions may seem similar, they represent fundamentally different events:

- **Crashes** are terminal events that end a session. When a crash occurs, the application stops running and the user's
  session terminates.
- **Exceptions** are events that occur during a session but don't necessarily terminate it. A single session can contain
  many exceptions, and the application can continue running after an exception occurs.

Because exceptions don't always indicate severe problems (unlike crashes, which are always critical), Embrace calculates
a [**severity score**](./severity-score.md) to help you prioritize which exceptions require immediate attention and
which are less impactful to the user experience.

## Types of Exceptions

Embrace collects two types of exceptions:

- **Unhandled exceptions**: Automatically captured by the SDK when they occur in your application code
- **Handled exceptions**: Caught programmatically (e.g., in try-catch blocks) and explicitly reported to Embrace for
  tracking and analysis

Both types provide valuable insights into application health, though unhandled exceptions are typically more severe
as they represent unexpected failure cases.

## Platform Support

Embrace currently collects exceptions for the following platforms and frameworks:

- **Web** applications
- **Unity** applications
- **Flutter** applications

Each platform's SDK automatically instruments exception capture while also providing APIs to manually report handled
exceptions when needed.

## Learn more

This walkthrough video will show you how developers dig into Javascript exceptions in Embrace's dashboard.

<div>
    <iframe width="560" height="315" src="https://www.youtube.com/embed/Slhx5ByO-l0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>
