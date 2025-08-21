---
title: Embrace Public Docs Style Guide
sidebar_position: 12
description: Style Guide for Public Documentation
---

# Embrace docs style guide

### Key takeaways

- Write in **second person** and **active voice** to ensure clarity.
  - Be declarative about what a developer can **DO** with Embrace
- Use sentence case for **ALL** headers
- Maintain a **conversational, friendly, and concise** tone.

---

## Audience

- **Primary audience**: Mid-level mobile developers integrating our SDK.
- **Reader's background**: Technical knowledge of mobile development, but not necessarily experts in advanced concepts.
- **Implication**: Write with moderate technical depth while maintaining clarity and approachability.

## Tone & voice

- **Conversational, friendly, and respectful**
  - Use a clear, approachable tone that feels human and helpful.
  - Avoid slang, jargon, clichés, or culturally specific references.
- **Straightforward language**
  - Be concise, direct, and mindful of a global readership with varying levels of English proficiency.
- **Engaging yet polite**
  - Strive for clarity and utility in instructions.
  - When asking users to do something, be polite but avoid repetitive use of "please."
  - Example: "Add this line to your `Podfile`" instead of "Please add this line to your `Podfile`, thank you."

## Person & voice

- **Use second-person pronouns**
  - Address the reader directly (e.g., "You can initialize the SDK," instead of "We can initialize…").
- **Active voice**
  - Clearly identify the actor: "You need to configure your app," rather than "The app must be configured."

## Grammar, mechanics & terminology

- **Conditions before instructions**
  - "If you have not initialized the client, do that first" instead of "Initialize the client if you have not done so."
- **Terminology**
  - Use consistent references to SDK elements. For example, always call it the "Embrace SDK" rather than mixing terms (like "the Embrace library" or "the Embrace kit").
- **Serial (Oxford) comma**
  - Use commas before the final conjunction in a list (e.g., "install, configure, and run").
- **Unambiguous date formatting**
  - Use a clear, global-friendly format (e.g., "January 15, 2025" rather than "1/15/25")
- **Standard American spelling and punctuation**
  - Favor American English (e.g., "color" not "colour").

## Formatting & structure

### Headings

- Use **sentence case** for all headings
  - Only capitalize the first letter and any proper nouns.
  - Example: **"Setting up the SDK"** or **"Overview of the Embrace platform."**

### Lists

- **Numbered lists**: Use for sequences or step-by-step instructions.
- **Bulleted lists**: Use for non-sequential information (e.g., features, best practices).
- **Description lists**: Use when pairing terms with definitions or explanations.

### UI elements

- Place UI elements in **bold** to distinguish them from other text (e.g., "Click **Start** on the toolbar").

### Code-related text

- Place code elements, file names, and commands in `code font` (inline backticks) and code blocks for multi-line examples.

### Example heading structure

```markdown
# Setting up the SDK

## Prerequisites

List your prerequisites here.

## Configure the environment

Step-by-step instructions to set environment variables or system settings.

## Install the dependencies

More step-by-step instructions for installing required dependencies.

## Troubleshoot common errors

Tips for resolving typical errors.
```

## Code snippets

- **Use code blocks** for multi-line code, with syntax highlighting if available.
- **Comment thoroughly** and ensure the snippet compiles or runs successfully.
- **Explain context** around the snippet, explaining what the code does and how it solves a problem.

### Example code snippet

```swift
import EmbraceIO
import SwiftUI

struct NewEmbraceApp: App {
    init() {
        do {
            try Embrace
                .setup(
                    options: Embrace.Options(
                        appId: "YOUR_APP_ID"
                    )
                )
                .start()
        } catch let e {
            print("Error starting Embrace: \(e.localizedDescription)")
        }
    }
}

```

- _Explanation_: This snippet sets up the Embrace SDK, initializes it with your App ID, and handles potential errors.

## Miscellaneous

- Use "OTel" and OpenTelemetry (no spaces)

## Example document flow

1. **Introduction**
   - Brief overview of the topic (e.g., "In this guide, you learn…").
2. **Prerequisites**
   - Outline requirements in a bulleted list (e.g., "Xcode 14, Swift 5.5…").
3. **Steps**
   - Numbered, sequential instructions.
   - Provide code snippets as needed.
4. **Validation**
   - Show how to confirm a successful setup (e.g., checking logs).
5. **Troubleshooting**
   - Summarize common issues and solutions.

