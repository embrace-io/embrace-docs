---
title: 5.x Integration Guide
description: Get started with integrating Embrace into your iOS application
sidebar_position: 1
---

# iOS/tvOS Integration

## Getting Started

We'll be guiding you through integrating Embrace into your iOS application
with a series of articles. We recommend going through them in order, although
you are free to skip around.  

## The XCFramework transition

With the introduction of Xcode 12 and the M1 build target, it is no longer possible to build a single binary framework that can run on both the simulator and Apple hardware devices. To resolve this, Apple introduced a new type of framework called the XCFramework.

If your company is already using Xcode 12, make sure that your dependency management system is also fully updated. Then follow the integration guide normally and you will use Embrace's XCFramework releases.

If your company has not yet started using Xcode 12, then contact us to learn how to use our non-XCFramework releases.

## Decisions You Need To Make

Before you dive into integrating Embrace there are a few decisions you should
make to help guide your process:

1. Are you integrating a new App or an existing application?
1. Are you replacing an existing automated debugging SDK?
1. Do you plan to use multiple automated debugging SDKs?
1. What integration path makes sense for you?  CocoaPods, Carthage, SPM or Manual?

Thinking about the above questions will help to define the path you will take
through this documentation.

If you are starting a new application, are thinking about Embrace and unsure what package manager to choose,  
CocoaPods is a very popular choice among developers, but we invite you to take a moment to evaluate all options and pick the one that better suits your needs.

If you have an established application then follow the path that most closely
matches the processes you are already using to build your application.
