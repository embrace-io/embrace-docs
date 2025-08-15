---
title: Core Web Vitals
sidebar_position: 5
---

Embrace collects and captures [Core Web Vital](https://developers.google.com/search/docs/appearance/core-web-vitals) scores for each page of your web application. These scores provide insight into key aspects of your site performance.

Core Web Vitals are defined by Google to measure user experience in production and can impact how a site is ranked in
search results. The metrics collected are:

- Largest Contentful Paint (**LCP**), which measures loading performance for the page.
- Interaction to Next Paint (**INP**), which measures page responsiveness.
- Cumulative Layout Shift (**CLS**), which measures the visual stability of elements in the page.

## Implementation and use

Core Web Vitals are automatically collected by the [Embrace Web SDK](/web/getting-started/index.md).  

Core Web Vitals are available in context with the other technical operations of a user's session in the [User Timeline](/product/sessions/user-timeline.md). For a given Core Web Vital, Embrace displays the element that is most responsible for creating the Core Web Vital calculation.

Core Web Vitals for pages can also be aggregated and analyzed across all users with [Custom Dashboards](/product/boards/custom-dashboards.md).