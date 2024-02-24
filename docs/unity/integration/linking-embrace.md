---
title: Linking Embrace
sidebar_position: 2
description: Linking Embrace with your application is quick and easy.
---

# Linking Embrace with your Unity project

To install Embrace, download our latest SDK below.

[Download Embrace 1.23.0 for Unity](https://embrace-downloads-prod.s3.amazonaws.com/EmbraceSDK_1.23.0.unitypackage)

Once downloaded, import the Unity Package by selecting Assets -> Import Package -> Custom Package.

<img src={require('@site/static/images/unity-import-embrace.png').default} />

## Scoped Registries

Scoped Registries allow Unity to communicate the location of any custom package registry server to the Package Manager so that the user has access to several collections of packages at the same time. Embrace uses Scoped Registries to allow our users to manage, download and install our SDK using the built-in Unity Package Manager.

<img src={require('@site/static/images/unity-package-manager.png').default} />

We've automated the process of setting up Embrace as a scoped registry. If you would like to manage your scoped registries, you can do so by going to Project Settings -> Package Manager -> Scoped Registries.

---

Now that Embrace is part of your project, learn how to add some required configuration options in the next section.
