# Disabling Data Capture on iOS

When working with the Embrace SDK, developers may need to disable data capture functionalities. While Android provides a `disable()` function to achieve this, iOS does not have a direct equivalent. However, you can manage data capture on iOS using the `isEnabled` property.

## Disabling Data Capture on iOS

To disable data capture on iOS, you can set the `isEnabled` property to `false`. This property controls whether the SDK is active and capturing data. Here is a step-by-step guide and code example to help you achieve this:

### Step-by-Step Guide

1. **Check the Current State**: Before disabling, you may want to check if the SDK is currently enabled.
2. **Disable the SDK**: Set the `isEnabled` property to `false` to stop data capture.
3. **Persist User Preference**: If you want to remember this setting across app launches, store the user's preference in persistent storage.
4. **Apply on App Launch**: On subsequent app launches, read the stored preference and set the `isEnabled` property accordingly.

### Code Example

```swift
// Check if the SDK is currently enabled
if Embrace.sharedInstance().isEnabled {
    print("SDK is currently enabled.")
}

// Disable the SDK
Embrace.sharedInstance().isEnabled = false
print("SDK has been disabled.")

// Example of persisting user preference
UserDefaults.standard.set(false, forKey: "EmbraceSDKEnabled")

// Apply the setting on app launch
let sdkEnabled = UserDefaults.standard.bool(forKey: "EmbraceSDKEnabled")
Embrace.sharedInstance().isEnabled = sdkEnabled
```

### Important Considerations

- **Data Persistence**: Disabling the SDK will stop data capture, but any data already captured may still be present until the next app launch.
- **User Preferences**: Ensure that user preferences regarding data capture are respected and stored securely.

By following these steps, you can effectively manage data capture settings on iOS, providing a consistent experience across both Android and iOS platforms.