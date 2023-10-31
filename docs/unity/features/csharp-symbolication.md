---
title: C# Symbolication
description: Translate Native Il2cpp Stackframes to C#
sidebar_position: 7
---

# C# Symbolication

Embrace supports translating Unity il2cpp C++ stack frames from native crash stack traces back to their C# source, including method and assembly name, file name, and line number. To enable this feature, the Embrace SDK uploads symbol mapping metadata at build time.  

This process is completely automatic and requires no additional configuration. However, Embrace does add additional il2cpp compiler arguments to emit the required metadata. If your build process also sets additional arguments, please ensure that `--emit-source-mapping` and `--emit-method-map` arguments added by Embrace are not removed.

This feature can be disabled entirely by defining the `EMBRACE_DISABLE_IL2CPP_SYMBOL_MAPPING` symbol in your project's Player Settings. 