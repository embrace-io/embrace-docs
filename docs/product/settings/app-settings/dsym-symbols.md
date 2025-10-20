---
title: Dsyms, Source Maps, and Symbol Uploads
sidebar_position: 7
---

# Artifact Uploads

The artifacts tabs let you upload and audit debugging artifacts so crash, error, and ANR stacks deobfuscate into human-readable frames.

Available artifacts include:

- **DSYMs:** iOS/macOS dSYM uploads and history.
- **Proguard/R8:** Android mapping.txt uploads and history.
- **NDK:** Android native symbols (SO/Breakpad) uploads and history.
- **Source Maps:** Web source map uploads and history.

## DSYMs (iOS)

Upload iOS/macOS dSYMs and view upload history. Valid dSYMs enable symbolicated crash stacks.

Developers can use DSYMs to:

- Ensure iOS crashes show symbolicated function names and files.
- Audit which dSYMs are present, their UUIDs, and which app versions they cover.
- Retry failed uploads and remediate invalid archives quickly.

## Proguard and NDK (Android, Unity)

Upload Android R8/Proguard mappings and native symbols for C/C++ stacks.

Developers use these to:

- Deobfuscate Java/Kotlin stack traces.
- Resolve native frames with symbol files for NDK crashes.
- Verify coverage across app versions and re-upload when builds change.

## Source Maps (Web)

Upload JavaScript source maps to deminify production stack traces.

Developers use Source Maps to:

- Human-readable JS stacks in error/crash views.
- Confirm which releases have maps and diagnose gaps quickly.
