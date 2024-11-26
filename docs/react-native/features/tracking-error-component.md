---
title: Tracking Render Errors
description: Ensure meaningful screen names in render errors by configuring Metro bundler.
sidebar_position: 7
---

# Tracking Render Errors

To accurately track React Native rendering errors and include meaningful screen names in the `componentStack`, you need to configure your `metro.config.js` file. By default, in release builds, screen names may appear as `Unknown`. The following configuration ensures that class and function names are preserved during minification.

## Implementation

Add the following configuration to your `metro.config.js` file:

```javascript
const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

const config = {
  transformer: {
    minifierConfig: {
      keep_classnames: true,
      keep_fnames: true,
      mangle: {
        keep_classnames: true,
        keep_fnames: true,
      },
    },
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
```

## Explanation

- **`keep_classnames: true` and `keep_fnames: true`**: These options ensure that class names and function names are preserved during the minification process.  
- **`mangle`**: Prevents the renaming of class and function names.  

This configuration helps retain screen names in the `componentStack`, making it easier to debug rendering errors in release builds.

## Checking the Bundle Size

We strongly recommend testing your project to confirm that any added bundle size due to this configuration is acceptable. To analyze the bundle size, run the following command:

```bash
npx react-native bundle \
  --platform <platform> \
  --dev false \
  --entry-file index.js \
  --bundle-output ./output/main.bundle.js \
  --assets-dest ./output
```

Replace `<platform>` with either `android` or `ios`. This command generates the bundle and assets, allowing you to compare the size with and without the Metro configuration.

## Example of `componentStack`

Below is an example of how the `componentStack` appears with and without the Metro configuration:

### With Metro Configuration:
```text
 * in Screen2
 * in RCTView
 * in Screen1
 * in AppContainer
 ```

 ### Without Metro Configuration (Screen names appear as `Unknown`):
```text
 * in Unknown
 * in RCTView
 * in Unknown
 * in AppContainer
 ```