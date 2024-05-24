/* eslint-disable react/jsx-props-no-spreading */
import Layout from "@theme/Layout";
import {
  IconAlarmPlus,
  IconBrackets,
  IconBrandYoutube,
  IconChartArrows,
  IconChartBar,
  IconChartLine,
  IconCheck,
  IconDeviceMobileBolt,
  IconDeviceMobileX,
  IconFlame,
  IconLayoutGridAdd,
  IconPuzzle,
  IconSdk,
  IconTimelineEventExclamation,
  IconUsersGroup,
  IconWifi,
} from "@tabler/icons-react";
import LogoUnity from "@site/static/images/unity.svg";
import LogoReactNative from "@site/static/images/react-native.svg";
import PerformanceTraces from "@site/static/images/performance_traces.svg";
import Logo from "@site/static/images/logo.svg";
import LogoSplunk from "@site/static/images/logo-splunk.svg";
import LogoNewRelic from "@site/static/images/logo-new-relic.svg";
import LogoHoneycomb from "@site/static/images/logo-honeycomb.svg";
import LogoGrafana from "@site/static/images/logo-grafana.svg";
import LogoDataDog from "@site/static/images/logo-datadog.svg";
import LogoChronosphere from "@site/static/images/logo-chronosphere.svg";
import LogoIOS from "@site/static/images/ios.svg";
import LogoFlutter from "@site/static/images/flutter.svg";
import LogoAndroid from "@site/static/images/android.svg";
import { type HomeCardProps } from "@site/src/pages/_Home/components/HomeCard/HomeCard";
import Header from "@site/src/pages/_Home/components/Header";
import Category from "@site/src/pages/_Home/components/Category/Category";

import styles from "./Home.module.css";

type Categories =
  | "Essentials"
  | "Open Telemetry"
  | "Data Forwarding"
  | "Features"
  | "Partner Solutions"
  | "Platforms";

const DEFAULT_TABLER_ICON_PROPS = {
  size: 24,
  stroke: 1.5,
  color: "var(--brand-primary)",
};

const categories: Record<Categories, HomeCardProps[]> = {
  Essentials: [
    {
      title: "Product Overview",
      description: "Mobile monitoring to elevate your user experience.",
      icon: <Logo />,
      linkTo: "/product",
    },
    {
      title: "Best Practices",
      description:
        "Discover best practices to get the most out of our product.",
      icon: <IconCheck {...DEFAULT_TABLER_ICON_PROPS} />,
      linkTo: "/best-practices",
    },
    {
      title: "Tutorials",
      description: "Check out our tutorials to easily learn about our product.",
      icon: <IconBrandYoutube {...DEFAULT_TABLER_ICON_PROPS} />,
      linkTo: "/react-native",
    },
  ],
  "Open Telemetry": [
    {
      title: "Performance Tracing",
      description:
        "Complete visibility into any customized operation you’d like to track.",
      icon: <PerformanceTraces />,
      linkTo: "/product/performance-tracing",
    },
    {
      title: "Error Logs Tracking",
      description: "Identify issues faster with Error Tracking.",
      icon: <IconTimelineEventExclamation {...DEFAULT_TABLER_ICON_PROPS} />,
      linkTo: "/open-telemetry/error-logs-tracking",
    },
    {
      title: "SDK Repositories",
      description:
        "All the Embrace Android, iOS, React Native, Unity and Flutter SDKs.",
      icon: <IconSdk {...DEFAULT_TABLER_ICON_PROPS} />,
      linkTo: "/open-telemetry/sdk-repositories",
    },
  ],
  "Data Forwarding": [
    {
      title: "Data Destinations",
      description:
        "Deliver your metrics to your cross-platform observability tool of choice.",
      icon: <IconPuzzle {...DEFAULT_TABLER_ICON_PROPS} />,
      linkTo: "/data-destinations",
    },
    {
      title: "Custom Metrics API",
      description:
        "Manage (create, get and delete) all the custom metrics of your organization.",
      icon: <IconChartLine {...DEFAULT_TABLER_ICON_PROPS} />,
      linkTo: "/data-destinations",
    },
    {
      title: "Metrics API",
      description: "Query your metrics from Embrace using PromQL.",
      icon: <IconChartBar {...DEFAULT_TABLER_ICON_PROPS} />,
      linkTo: "/custom-metrics-api",
    },
    {
      title: "Spans API",
      description: "Query your spans using TraceQL. ",
      icon: <IconBrackets {...DEFAULT_TABLER_ICON_PROPS} />,
      linkTo: "/spans-api",
    },
    {
      title: "Spans Forwarding",
      description:
        "Automatically add a unique identifier to every network request your app makes.",
      icon: <IconChartArrows {...DEFAULT_TABLER_ICON_PROPS} />,
      linkTo: "/product/network-spans-forwarding",
    },
    // TODO: review
    {
      title: "Custom Dashboards",
      description:
        "Stay on top of key mobile KPIs and unusual activity that matter for your team.",
      icon: <IconLayoutGridAdd {...DEFAULT_TABLER_ICON_PROPS} />,
      linkTo: "/product/custom-dashboards",
    },
  ],
  Features: [
    {
      title: "User Session Insights",
      description:
        "Recreate every single user journey for every issue with exceptional detail.",
      icon: <IconUsersGroup {...DEFAULT_TABLER_ICON_PROPS} />,
      linkTo: "/features/user-session-insights",
    },
    {
      title: "Crash Reporting",
      description:
        "Highly accurate crash groupings with built-in intelligence.",
      icon: <IconFlame {...DEFAULT_TABLER_ICON_PROPS} />,
      linkTo: "/features/crash-reporting",
    },
    {
      title: "Network Monitoring",
      description:
        "Identify and resolve the networking issues behind your app’s crashes.",
      icon: <IconWifi {...DEFAULT_TABLER_ICON_PROPS} />,
      linkTo: "/features/network-monitoring",
    },
    {
      title: "Alerting",
      description: "Customizable alerts let you cut through the noise.",
      icon: <IconAlarmPlus {...DEFAULT_TABLER_ICON_PROPS} />,
      linkTo: "/features/alerting",
    },
    {
      title: "ANR Reporting",
      description: "Resolve freezes faster with intelligent ANR Reporting.",
      icon: <IconDeviceMobileBolt {...DEFAULT_TABLER_ICON_PROPS} />,
      linkTo: "/features/anr-reporting",
    },
    {
      title: "App Exits",
      description:
        "User Terminations, Out-of-Memory (OOM) Exits and Uncategorized Exits (UE).",
      icon: <IconDeviceMobileX {...DEFAULT_TABLER_ICON_PROPS} />,
      linkTo: "/features/app-exits",
    },
  ],
  "Partner Solutions": [
    {
      title: "Datadog",
      icon: <LogoDataDog />,
      linkTo: "/data-destinations/data-dog-setup",
    },
    {
      title: "New Relic",
      icon: <LogoNewRelic />,
      linkTo: "/data-destinations/new-relic-setup",
    },
    {
      title: "Grafana",
      icon: <LogoGrafana />,
      linkTo: "/data-destinations/grafana-setup",
    },
    {
      title: "Honeycomb",
      icon: <LogoHoneycomb />,
      linkTo: "/data-destinations/honeycomb",
    },
    {
      title: "Splunk",
      icon: <LogoSplunk />,
      linkTo: "/data-destinations/splunk",
    },
    {
      title: "Chronosphere",
      icon: <LogoChronosphere />,
      linkTo: "/data-destinations/chronosphere-setup",
    },
  ],
  Platforms: [
    {
      title: "Android",
      description: "Add Embrace to your Android project.",
      icon: <LogoAndroid className={styles.platformLogo} />,
      linkTo: "/android",
    },
    {
      title: "iOS",
      description: "Add Embrace to your iOS project.",
      icon: <LogoIOS className={styles.platformLogo} />,
      linkTo: "/ios",
    },
    {
      title: "React Native",
      description: "Add Embrace to your React Native project.",
      icon: <LogoReactNative className={styles.platformLogo} />,
      linkTo: "/react-native",
    },
    {
      title: "Unity",
      description: "Add Embrace to your Unity project.",
      icon: <LogoUnity className={styles.platformLogo} />,
      linkTo: "/unity",
    },
    {
      title: "Flutter",
      description: "Add Embrace to your Flutter project.",
      icon: <LogoFlutter className={styles.platformLogo} />,
      linkTo: "/flutter",
    },
  ],
};

const Home = () => {
  return (
    <Layout>
      <Header />
      <main className={styles.wrapper}>
        <div className={styles.container}>
          {Object.entries(categories).map(([category, items]) => (
            <Category key={category} title={category} items={items} />
          ))}
        </div>
      </main>
    </Layout>
  );
};

export default Home;
