---
title: Disable data export
description: Stop Embrace from exporting production performance data from within your mobile app.
sidebar_position: 16
---

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

# Preventing data export when the Embrace SDK is already initialized

If a user opts out of data collection and the Embrace SDK is already initialized you can stop data export with `disable()`:

<Tabs groupId="android-language" queryString="android-language">
<TabItem value="kotlin" label="Kotlin">

```kotlin
Embrace.getInstance().disable()
```

</TabItem>
<TabItem value="java" label="Java">

```java
Embrace.getInstance().disable();
```

</TabItem>
</Tabs>

This prevents the SDK from sending data to Embrace's servers or any configured OTel exporters. It will also delete any persisted data that Embrace has captured.

## Preventing data export when the Embrace SDK is not yet initialized

Once a user opts out of data collection you should save this preference in a solution that makes sense for your app, such as [DataStore](https://developer.android.com/topic/libraries/architecture/datastore). When you initialize the Embrace SDK you should only initialize if this stored preference allows data capture.

<Tabs groupId="android-language" queryString="android-language">
<TabItem value="kotlin" label="Kotlin">

```kotlin
if (embraceEnabled) { // boolean value read from your storage solution
    Embrace.getInstance().start(this)
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
if (embraceEnabled) { // boolean value read from your storage solution
    Embrace.getInstance().start(this);
}
```

</TabItem>
</Tabs>
