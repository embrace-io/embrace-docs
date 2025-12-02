import { Filter, FilterWithSection } from './types';
import { OP_LABELS, PLATFORM_LABELS, platformBlockLists, OsTypes, Framework } from './constants';

export const escapePipes = (value: string): string => value.replace(/\|/g, '\\|');

export const formatPageName = (pageName: string): string => {
  // Convert snake_case to Title Case
  return pageName
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const sanitizeDescription = (description?: string): string => {
  if (!description) {
    return '—';
  }
  return escapePipes(description.replace(/\s+/g, ' ').trim());
};

export const formatOperations = (ops: string[]): string => {
  if (!ops || ops.length === 0) {
    return '—';
  }
  return escapePipes(ops.map((op) => OP_LABELS[op] || op).join(', '));
};

const PLATFORM_DISPLAY_NAMES: Record<string, string> = {
  [OsTypes.IOS]: 'iOS',
  [OsTypes.ANDROID]: 'Android',
  [OsTypes.WEB]: 'Web',
  [Framework.NATIVE]: 'Native',
  [Framework.UNITY]: 'Unity',
  [Framework.FLUTTER]: 'Flutter',
  [Framework.REACT_NATIVE]: 'React Native',
};

/**
 * Check if a filter is blocked for specific platforms/frameworks based on blocklists
 */
export const getBlockedPlatforms = (filterKey: string, section?: string): string[] => {
  // Create the lookup key - use section.filterKey if section exists (e.g., 'crash.method')
  const lookupKey = section ? `${section}.${filterKey}` : filterKey;

  return Object.entries(platformBlockLists)
    .filter(([_, blocklist]) => blocklist[filterKey] || blocklist[lookupKey])
    .map(([type]) => PLATFORM_DISPLAY_NAMES[type])
    .filter(Boolean);
};

export const formatPlatforms = (filter: FilterWithSection, filterKey: string): string => {
  // Get blocked platforms from blocklists
  const blockedPlatforms = getBlockedPlatforms(filterKey, filter.section);

  // Get explicitly supported platforms
  const supportedPlatforms = filter.supported_on || [];

  // If no explicit supported_on, it means "all platforms"
  if (supportedPlatforms.length === 0) {
    if (blockedPlatforms.length === 0) {
      return 'All';
    }

    // Calculate which platforms are actually available (all platforms minus blocked)
    const allPlatformLabels = Object.values(PLATFORM_LABELS);
    const availablePlatforms = allPlatformLabels.filter(p => !blockedPlatforms.includes(p));

    if (availablePlatforms.length === 0) {
      return 'None';
    }

    return escapePipes(availablePlatforms.join(', '));
  }

  // Convert supported platforms to labels
  const platforms = supportedPlatforms
    .map((p) => PLATFORM_LABELS[p.platform] || p.platform);

  // Remove blocked platforms from the supported list
  const availablePlatforms = platforms.filter(p => !blockedPlatforms.includes(p));

  if (availablePlatforms.length === 0) {
    return 'None';
  }

  return escapePipes(availablePlatforms.join(', '));
};

export const formatPages = (filter: Filter): string => {
  if (!filter.visible_on || filter.visible_on.length === 0) {
    return 'All Pages';
  }

  const pages = filter.visible_on.map((page) => formatPageName(page)).join(', ');

  return escapePipes(pages);
};

export const formatPagesLabel = (pages: string): string => {
  if (pages.trim().toLowerCase() === 'all pages') {
    return 'All';
  }
  return pages;
};

export const formatLengthConstraint = (filter: Filter): string | undefined => {
  const { min_length, max_length } = filter;

  if (
    min_length !== undefined &&
    max_length !== undefined &&
    min_length === max_length
  ) {
    return `Length: exactly ${min_length} characters`;
  }

  if (min_length !== undefined && max_length !== undefined) {
    return `Length: ${min_length}-${max_length} characters`;
  }

  if (max_length !== undefined) {
    return `Max length: ${max_length} characters`;
  }

  if (min_length !== undefined) {
    return `Min length: ${min_length} characters`;
  }

  return undefined;
};

export const formatChoicesConstraint = (filter: Filter): string | undefined => {
  if (!filter.choices || filter.choices.length === 0) {
    return undefined;
  }

  const choices = filter.choices.map((choice) => `\`${choice}\``).join(', ');
  return `Choices: ${choices}`;
};

export const formatConstraints = (filter: Filter): string => {
  const parts: string[] = [];
  const lengthConstraint = formatLengthConstraint(filter);
  const choiceConstraint = formatChoicesConstraint(filter);

  if (lengthConstraint) {
    parts.push(lengthConstraint);
  }

  if (choiceConstraint) {
    parts.push(choiceConstraint);
  }

  if (parts.length === 0) {
    return '—';
  }

  return escapePipes(parts.join('<br />'));
};

