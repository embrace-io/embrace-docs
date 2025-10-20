---
title: Uncategorized Exit
sidebar_position: 6
---

# Uncategorized Exits (UE)

Uncategorized Exits are session terminations detected by the Embrace SDK that do not match known causes. In Embrace's dash, these are collected for iOS and Swift apps.

## When Uncategorized Exits might occur

When the app: 
- is killed by the OS for reasons other than Out-of-Memory issues. e.g., watchdog timeout, resource contention, or other system-level interruptions.
- is force-quit by the user in a way that is not detected as a standard user termination.
- exits due to an untracked or unclassified error or system event.

