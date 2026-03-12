import React from 'react';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

const PLATFORM_LABELS: Record<string, string> = {
  android: 'Android',
  ios: 'iOS',
  flutter: 'Flutter',
  'react-native': 'React Native',
  unity: 'Unity',
  web: 'Web',
};

interface PlatformTabsProps {
  children: React.ReactNode;
}

export default function PlatformTabs({ children }: PlatformTabsProps) {
  return (
    <Tabs groupId="platform" queryString="platform">
      {children}
    </Tabs>
  );
}

export { TabItem as PlatformTabItem, PLATFORM_LABELS };
