import { Filter } from './types';
import { OP_LABELS, PLATFORM_LABELS } from './constants';

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

export const formatPlatforms = (filter: Filter): string => {
  if (!filter.supported_on || filter.supported_on.length === 0) {
    return 'All';
  }

  const platforms = filter.supported_on
    .map((p) => PLATFORM_LABELS[p.platform] || p.platform)
    .join(', ');

  return escapePipes(platforms);
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

