# Enrich your sessions with Breadcrumb

## Adding Relevant Information to Sessions

Embrace can collect your logging data as 'breadcrumbs' and include it as relevant information and details to enrich your sessions.

Here's how you add a Breadcrumb to the session:
```kotlin
Embrace.addBreadcrumb("onDragEvent called, starting drag")
```

In the above example, a Breadcrumb is being logged when a drag event listener is called.
This event is not otherwise shown in the session and can be important depending on what the user does next.

:::warning Important
Breadcrumb messages must be 256 characters or less.
:::

:::info
For how to best use Breadcrumbs, check out the [Best Practices](/best-practices/breadcrumbs/) page.
:::

---

We generally use the Breadcrumb method for our logging and not the Log Message API to add relevant information to sessions.
Breadcrumbs are a lightweight way to add logging to your session. They add no CPU or memory overhead, and trigger no networking calls.
The Log Message API is a much heavier mechanism. We will learn about it in the [Alerting](/android/integration/log-message-api/) section of the documentation.
For now, just know that using Breadcrumbs is the right thing to do most of the time.