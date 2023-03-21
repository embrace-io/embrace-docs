---
title: Build Options
description: Build Options for the Embrace Android Gradle Plugin
sidebar_position: 4
---

# Build Options

The Embrace SDK injects code into your APK using a process we call “swazzling” to automatically capture activity transitions, taps, and network requests in your application.

## Disabling Swazzling for a Build Type

:::warning Important
Disabling swazzling means we won't capture network calls, activity transitions, and taps. For this reason, avoid disabling swazzling for release builds.
:::

The swazzling operation adds to the build time, and you may want to disable it for debug builds. Use the
`variantFilter` option to turn off swazzling for a given variant. The example below illustrates how to
disable it for the `debug` build type in your `app/build.gradle` or `app/build.gradle.kts` file.

```
swazzler {
    variantFilter {
        if(it.name.toLowerCase().contains("debug")) {
            it.setSwazzlingEnabled(false)
        }
    }
}
```

### Forcing behaviours

:::info
Most applications do not require any custom configuration of the Embrace SDK Gradle Plugin, but some modular applications require one or more of these settings to be present.
Please contact <support@embrace.io> if you have any questions about these settings and if they are needed for your app.
:::

```groovy
swazzler {
  forceIncrementalOverwrite = false
  forceOkHttpWrapperInjection = false
  forceVolleyWrapperInjection = false
  forceFcmWrapperInjection = false
  encodeExtractedFileNames = false
}
```

#### forceIncrementalOverwrite *bool*

Enable this to force copying of unchanged JAR files during the swazzling phase.
Enabling this is discouraged unless Embrace's support team has instructed you to enable it.
Defaults to `false`.

#### forceOkHttpWrapperInjection *bool*

Enable this if okHttp exists as a dependency in any of your dependencies or submodules.
This is only necessary if OkHttp is present in any of your project submodules and not on your main module (app).
The plugin will emit a warning at build time indicating if you need to add this setting.
This property is ignored if `{useNewDependencyInstaller = true}`
Defaults to `false`.

#### forceVolleyWrapperInjection *bool*

Enable this if Volley exists as a dependency in any of your dependencies or submodules.
This is only necessary if Volley is present in any of your project submodules and not on your main module (app).
The plugin will emit a warning at build time indicating if you need to add this setting.
This property is ignored if `{useNewDependencyInstaller = true}`
Defaults to `false`.

#### forceFcmWrapperInjection *bool*

Enable this if Firebase Cloud Messaging (FCM) exists as a dependency in any of your dependencies or submodules.
This is only necessary if FCM is present in any of your project submodules and not on your main module (app).
The plugin will emit a warning at build time indicating if you need to add this setting.
This property is ignored if `{useNewDependencyInstaller = true}`
Defaults to `false`.

#### encodeExtractedFileNames *bool*

Enable this if one of the dependencies in your project has a JAR file with class names that are only distinguished by case (due to obfuscation, for example), and you are building your application in a case-insensitive file system.
Defaults to `false`.

## Disabling Swazzling for Specific JARs and Classes

:::important Important
`jarSkipList` only skips swazzling if you use Embrace <v5.3.0 or have specified `embrace.useAsmTransformApi=false` in your `gradle.properties` file. If you want to skip swazzling in later versions of Embrace, you should use `classSkipList`.
:::

You may need to skip swazzling of certain JARs and/or classes in your application. It is very uncommon for this to be
necessary, but it can be problematic to swazzle certain security-related JARs. Disable swazzling of these JARs using the
`swazzler.jarSkipList` and `swazzler.classSkipList` settings in your `app/build.gradle` file. Both these settings are 
lists of regular expressions that the swazzler will use to skip entire JARs or specific classes. 

```groovy
swazzler {
  jarSkipList = ["MyFirstJar", "MySecondJar"]
  classSkipList = ["MyFirstClass", "MySecondClass"]
}
```

The build logs will emit info indicating what classes and JARs were skipped, for example

```
[io.embrace.android.gradle.swazzler.compile.swazzler.SwazzlerConfiguration] [Embrace.io Swazzler: INFO] Skipping swazzling for {class=MyFirstClass.class} since it matched {regex=MyFirstClass}
```

## Improving Build Speed

:::warning Important
Embrace v5.3.0 shipped large improvements to build speed by using a new Transform API. This information is only relevant if you use Embrace <v5.3.0 , or if you have specified `embrace.useAsmTransformApi=false` in your `gradle.properties` file.

It is strongly recommended that you update to the latest Embrace version as this will decrease your build times more than the following recommendations.
:::

The Embrace SDK injects code into your APK using a process we call “swazzling” to automatically capture activity 
transitions, taps, and network requests in your application. The time taken for the swazzling process varies, 
but can become quite long for larger projects especially when doing a clean build.

To speed up this process, the Embrace SDK now supports a mode that eliminates the need for a swazzling scan of all JARs
and their classes even for a clean build. We have added a Gradle step that can be manually run to produce a list of JARs
and classes in the JARs that do not need to be swazzled, and will be skipped during subsequent swazzling steps.

### Enabling the swazzling cache

Generate the swazzling cache rules file by running the `generateEmbraceSwazzlingRulesFor<Variant>` Gradle task. e.g. 
`generateEmbraceSwazzlingRulesForDebug` or `generateEmbraceSwazzlingRulesForRelease`.

This will:

* Run the clean Gradle task
* Scan all JARs to determine if they have any components that need to be swazzled
* Emit a list of JARs and classes within the JARs that do not need to be swazzled. This will be saved in the 
`app/embrace-swazzling-rules.json` file in your project.

Any future compilation will leverage this file in the root of your project to speed up builds by skipping un-swazzleable 
elements of your project.

### Disabling the swazzling cache

If after enabling the swazzling cache you want to revert to the full swazzling process, you can either delete the file 
manually or run the Gradle task `cleanEmbraceSwazzlingRulesFor<Variant>`, e.g. `cleanEmbraceSwazzlingRulesForDebug` or 
`cleanEmbraceSwazzlingRulesForRelease`.

### How it works

Our Gradle plugin scans JARs in your project, searching for classes that implement the following methods:

* android.view.View.onClick
* android.view.View.onLongClick
* android.webkit.WebViewClient.onPageStarted
* com.android.volley.NetworkDispatcher.parseAndDeliverNetworkError
* okhttp3.OkHttpClient.Builder.build

To reduce the scan time, when you have generated the `embrace-swazzling-rules.json` file the Gradle plugin will use the 
rules in that file to skip the specified JARs and classes. The rules are generated by scanning all the JARs and classes 
contained within them, and storing the following:

* The names of JARs that contained no classes that required swazzling
* The names of classes that don’t require swazzling in a JAR that had at least one class that required swazzling

Thus, you will need to rebuild the swazzling rules when any of the following changes have been made:

* An existing class that previously did not implement one of the methods listed above now implements that method
* A new class that requires swazzling is added to a JAR that previously contained no classes that required swazzling

The rules do not need to be rebuilt for any of the following scenarios:

* A new class has been added to a JAR that contained at least one class that already required swazzling
* A class that already required swazzling is modified

In general, we recommend that you regenerate the rules whenever you update dependencies that you do not have a complete understanding of since changes may have been made to them that have introduced new classes that require swazzling.

Happy (faster) swazzling!

### FAQ

Q: When should I run the `generateEmbraceSwazzlingRulesFor<Variant>` Gradle task?
A: You should run it once to enable the swazzling cache. After that you should only run it whenever you change your dependencies or make significant changes to your code, such as introducing code that makes network requests in classes that previously existed but were deemed unnecessary to swazzle.

Q: Should I commit the `app/embrace-swazzling-rules.json` to source control?
A: Yes. That way other developers on your team will use the same rules and your CI system will also leverage it.

Q: Can I manually edit the `app/embrace-swazzling-rules.json` file?
A: Yes, but any time you re-run the `generateEmbraceSwazzlingRulesFor<Variant>` task, your changes will be overwritten.

## Configuring Swazzling behaviour

Some particular features of the swazzling process can be altered by defining specific arguments in a `swazzler` extension 
in in your `app/build.gradle` file.
