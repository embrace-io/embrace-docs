# Android Integration Documentation Style Guide Review

## Overview
This document provides a comprehensive review of all pages in the `docs/android/integration` directory against the Embrace docs style guide defined in `docs/embrace-docs-style-guide.md`.

---

## 1. add-embrace-sdk.md

### Issues Found

#### Heading Case Violations
- **Line 7**: "SDK Setup" → Should be "SDK setup" (sentence case)
- **Line 9**: "Add the Embrace Gradle Plugin" → Should be "Add the Embrace Gradle plugin" (sentence case)
- **Line 121**: "Add the Embrace Android SDK" → Should be "Add the Embrace Android SDK" (correct - "Android" is a proper noun)
- **Line 161**: "Create Embrace configuration file" → Should be "Create Embrace configuration file" (correct)
- **Line 169**: "Set your app ID and API token" → Should be "Set your app ID and API token" (correct)
- **Line 193**: "Start the Embrace SDK" → Should be "Start the Embrace SDK" (correct)
- **Line 262**: "Build and Run the Application" → Should be "Build and run the application" (sentence case)
- **Line 270**: "Confirm data is sent to Embrace" → Should be "Confirm data is sent to Embrace" (correct)
- **Line 280**: "Alter default behavior" → Should be "Alter default behavior" (correct)

#### Voice and Tone Issues
- **Line 11-12**: "The Embrace Gradle Plugin uploads mapping files that gets human-readable stacktraces" → Should use second person: "The Embrace Gradle Plugin uploads mapping files to get human-readable stacktraces" (grammar issue: "that gets" should be "to get")
- **Line 201**: "This requires your app to use a custom `Application` subclass, which the Embrace Gradle Plugin will modify" → Passive voice. Consider: "Your app must use a custom `Application` subclass, which the Embrace Gradle Plugin modifies"

#### Grammar Issues
- **Line 275**: "ocassionally" → Should be "occasionally" (spelling)
- **Line 18**: "Depending on network conditions this may ocassionally take" → Should be "Depending on network conditions, this may occasionally take" (missing comma, spelling)

#### Consistency Issues
- Uses "Gradle Plugin" capitalized throughout - verify this is the intended naming convention

---

## 2. breadcrumbs.md

### Issues Found

#### Content Review
This file only imports shared content from `@site/shared/android-breadcrumb.md`. The actual content cannot be fully reviewed without access to the shared file. The frontmatter appears correct.

**Note**: Unable to fully review due to external dependency on shared content.

---

## 3. crash-reporting.md

### Issues Found

#### Heading Case Violations
- **Line 7**: "Collect Your First Crash Report" → Should be "Collect your first crash report" (sentence case)
- **Line 9**: "Setting up the Crash Reporter" → Should be "Setting up the crash reporter" (sentence case)
- **Line 20**: "NDK crash capture" → Should be "NDK crash capture" (correct)
- **Line 31**: "Symbolicating Stack Traces" → Should be "Symbolicating stack traces" (sentence case)

#### Voice Issues
- **Line 33**: "If you have obfuscated your application with ProGuard/DexGuard/R8 the captured crashes will contain obfuscated method names" → Missing comma after conditional clause. Should be: "If you have obfuscated your application with ProGuard/DexGuard/R8, the captured crashes will contain obfuscated method names"

#### Grammar Issues
- **Line 18**: "ocassionally" → Should be "occasionally" (spelling)

#### Consistency Issues
- Uses "Crash Reporter" and "crash reports" inconsistently - should standardize

---

## 4. index.md

### Issues Found

#### Heading Case Violations
- **Line 7**: "Android Integration" → Should be "Android integration" (sentence case)
- **Line 9**: "Getting Started" → Should be "Getting started" (sentence case)

#### Voice Issues
- **Line 11**: "This section provides instructions" → Passive voice. Could be more direct: "This section walks you through integrating Embrace's Android SDK"
- **Line 14**: "After completing an SDK integration we recommend you read" → Missing comma before independent clause. Should be: "After completing an SDK integration, we recommend you read"

#### Person Issues
- **Line 14**: Uses "we recommend" instead of second person. Should be: "After you complete an SDK integration, read the [SDK configuration]..." or "After completing an SDK integration, you should read..."

---

## 5. log-message-api.md

### Issues Found

#### Heading Case Violations
- **Line 2**: "Adding Logs" → Should be "Adding logs" (sentence case)
- **Line 7**: "Adding Logs" → Should be "Adding logs" (sentence case)
- **Line 15**: "Using the Log Message API" → Should be "Using the log message API" (sentence case)
- **Line 43**: "Log Handled Exception" → Should be "Log handled exception" (sentence case)
- **Line 77**: "Being Alerted on Logs" → Should be "Being alerted on logs" (sentence case)
- **Line 130**: "Best Practices" → Should be "Best practices" (sentence case)
- **Line 135**: "Log Batching" → Should be "Log batching" (sentence case)

#### Voice and Tone Issues
- **Line 9**: "Typically the Embrace SDK uploads data" → Add comma: "Typically, the Embrace SDK uploads data"
- **Line 86**: "A [LogRecordExporter]... can be easily injected" → Passive voice. Consider: "You can easily inject a [LogRecordExporter]"

#### Terminology Issues
- **Line 60**: "LogType could be ERROR, WARNING or INFO" → Should use Oxford comma: "LogType could be ERROR, WARNING, or INFO"

#### Consistency Issues
- Inconsistent capitalization of "Log Message API" vs "log message API" - should standardize
- **Line 62**: "Adjusting Severity" in info box → Should be "Adjusting severity" (sentence case)

---

## 6. next-steps.md

### Issues Found

#### Heading Case Violations
- **Line 7**: "Next Steps" → Should be "Next steps" (sentence case)
- **Line 9**: "Wrapping Up" → Should be "Wrapping up" (sentence case)
- **Line 16**: "Feature Reference" → Should be "Feature reference" (sentence case)
- **Line 22**: "Sample Integration Apps" → Should be "Sample integration apps" (sentence case)
- **Line 26**: "API Docs" → Should be "API docs" (sentence case)
- **Line 30**: "Configuration" → Should be "Configuration" (correct)
- **Line 36**: "Check Out the FAQ" → Should be "Check out the FAQ" (sentence case)
- **Line 40**: "Best Practices" → Should be "Best practices" (sentence case)

#### Tone Issues
- **Line 11**: "Congratulations on completing the Android integration guide!" → Exclamation mark is acceptable for congratulations
- **Line 13**: "please don't hesitate to reach out" → The style guide suggests avoiding "please" repetitively, but this usage seems appropriate for contact information

#### Consistency
- Generally well-written with good second person usage and active voice

---

## 7. trace-api.md

### Issues Found

#### Heading Case Violations
- **Line 2**: "Recording Traces" → Should be "Recording traces" (sentence case)
- **Line 7**: "Recording Traces" → Should be "Recording traces" (sentence case)

#### Content Quality
- Overall well-structured and concise
- Good use of code examples
- Properly uses second person and active voice

---

## Summary of Key Issues Across All Files

### Most Common Violations

1. **Heading Case (Most Critical)**
   - Multiple files use title case instead of sentence case for headings
   - Affects: add-embrace-sdk.md (2 violations), crash-reporting.md (2 violations), index.md (2 violations), log-message-api.md (7 violations), next-steps.md (7 violations), trace-api.md (2 violations)

2. **Grammar and Spelling**
   - "ocassionally" → "occasionally" appears in multiple files
   - Missing commas after conditional clauses
   - Affects: add-embrace-sdk.md, crash-reporting.md, log-message-api.md

3. **Voice and Person**
   - Some passive voice usage instead of active voice
   - Occasional use of "we" instead of second person "you"
   - Affects: add-embrace-sdk.md, index.md, log-message-api.md

4. **Oxford Comma**
   - Missing Oxford comma in at least one instance
   - Affects: log-message-api.md

### Files with No Content to Review
- **breadcrumbs.md**: Uses shared content that cannot be reviewed without access to the shared file

### Recommendations

1. **Priority 1**: Fix all heading case violations to use sentence case
2. **Priority 2**: Fix spelling errors ("ocassionally" → "occasionally")
3. **Priority 3**: Add missing commas after conditional clauses
4. **Priority 4**: Convert passive voice to active voice where appropriate
5. **Priority 5**: Ensure consistent use of second person throughout

### Positive Observations

- Code examples are generally well-formatted
- Overall structure follows the recommended document flow
- Most files use appropriate technical depth for the audience
- Good use of inline code formatting for technical terms
