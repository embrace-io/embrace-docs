---
title: Filtering Sessions
sidebar_position: 3
description: Filter User Sessions to dig into many dimensions of app activity
---

# Filtering Sessions

Embrace provides an easy UI for filtering and querying your Sessions. You can add filters to your sessions to find and group the Sessions that you are looking to find out more about: Sessions that resulted in crashes, Sessions with specific user flows, Sessions on certain app versions.

Sessions are displayed from most recent, with summary statistics, issue indicators, and background/foreground context.

## Filter dimensions

To find Sessions matching specific conditions, Embrace provides a variety of fields for filtering.  

Major dimensions include properties for:

- App
- Device
- User
- Session
- Spans
- Logs
- Crashes
- ANRs

## Advanced Filters

To combine various logical conditions, you can use Advanced Filters. Advanced filters allow you to chain logical statements, using `AND` or `OR`. These statements are composable: you can also nest components, chain nested components, and nest chained components.  

<img src={require('@site/static/images/advanced-filters.png').default} alt="Screenshot of Advanced Filter on Sessions page" />

## Saved Filters

Embrace supports a Save function for filters you repeatedly use. Use the "Saved Filters" button next to the filter bar to save a current filter or apply saved filters:

<img src={require('@site/static/images/saved-filters.png').default} alt="Screenshot of Saved Filter Menu on Sessions page" />

A filter can be made default for immediate use every time you visit.

## Session properties are ubiquitous

Anything stored as a property on the Session is automatically associated with events in the same session. So when filtering for Crashes, Logs, Spans, etc look for the dimensions `Session Property Key` and `Session Property Key/Value`. This will allow you to find Crashes on Sessions tagged to (eg) "premium" users.
