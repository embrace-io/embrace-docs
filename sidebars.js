// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  mySidebar: [
    {
      type: "category",
      label: "Android",
      items: [{type: "autogenerated", dirName: "android"}],
    },
    {
      type: "category",
      label: "iOS",
      items: [{type: "autogenerated", dirName: "ios"}],
    },
    {
      type: "category",
      label: "Unity",
      items: [{type: "autogenerated", dirName: "unity"}],
    },
    {
      type: "category",
      label: "React Native",
      items: [{type: "autogenerated", dirName: "react-native"}],
    },
    {
      type: "category",
      label: "Flutter",
      items: [{type: "autogenerated", dirName: "flutter"}],
    },
    {
      type: "category",
      label: "Product Information",
      items: [{type: "autogenerated", dirName: "product"}],
    },

    {
      type: "category",
      label: "Best Practices",
      items: [{type: "autogenerated", dirName: "best-practices"}],
    },

    {
      type: "category",
      label: "Embrace Metrics API",
      items: [{type: "autogenerated", dirName: "metrics-api"}],
    },

    {
      type: "category",
      label: "Custom Metrics API",
      items: [{type: "autogenerated", dirName: "custom-metrics-api"}],
    },

    {
      type: "category",
      label: "Data Destinations",
      items: [{type: "autogenerated", dirName: "data-destinations"}],
    },

    {
      type: "category",
      collapsible: true,
      collapsed: true,
      label: "SDK APIs",
      items: [
        {
          type: "link",
          href: "https://embrace-io.github.io/embrace-android-sdk3/",
          label: "Android",
        },
        {
          type: "link",
          href: "https://embrace-io.github.io/embrace-ios-sdk/",
          label: "iOS",
        },
        {
          type: "link",
          href: "https://embrace-io.github.io/embrace-unity-sdk/api",
          label: "Unity",
        },
        {
          type: "link",
          href: "https://embrace-io.github.io/react-native-embrace/",
          label: "React Native",
        },
      ],
    },

    {
      type: "category",
      collapsible: true,
      collapsed: true,
      label: "Legal",
      items: [
        {
          type: "doc",
          id: "privacy-policy",
        },
        {
          type: "doc",
          id: "terms-of-service",
        },
        {
          type: "doc",
          id: "dpa",
        },
      ],
    },
  ],
};

module.exports = sidebars;
