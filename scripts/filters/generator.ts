import { Filter, MetricsData } from './types';
import { TYPE_LABELS } from './constants';
import {
  escapePipes,
  formatOperations,
  formatPlatforms,
  formatPages,
  formatPagesLabel,
  formatConstraints,
  sanitizeDescription,
} from './formatters';

/**
 * Generate markdown table row for a single filter
 */
export function generateFilterMarkdown(filterKey: string, filter: Filter): string {
  const description = sanitizeDescription(filter.description);
  const type = escapePipes(TYPE_LABELS[filter.type] || filter.type);
  const operations = formatOperations(filter.ops);
  const platforms = formatPlatforms(filter);
  const pages = formatPages(filter);
  const constraints = formatConstraints(filter);

  const behavior = [`Type: ${type}`, `Ops: ${operations}`].join('<br />');
  const pagesLabel = formatPagesLabel(pages);
  const availability = [
    `<em>Platforms:</em> ${platforms}`,
    `<em>Pages:</em> ${pagesLabel}`,
  ].join('<br />');

  const identity = [
    escapePipes(filter.label),
    `<span class="filters-table__key">${filterKey}</span>`,
  ].join('<br />');

  return `| ${identity} | ${description} | ${behavior} | ${availability} | ${constraints} |\n`;
}

/**
 * Generate the complete filter documentation
 */
export function generateFilterDocumentation(metricsData: MetricsData): string {
  let markdown = '';

  // Front matter
  markdown += '---\n';
  markdown += 'title: Filters Definitions\n';
  markdown += 'description: Complete definitions of all available filters for querying your data\n';
  markdown += 'slug: /definitions/filters\n';
  markdown += 'sidebar_class_name: hidden-filter-reference\n';
  markdown += '---\n\n';

  // Page title and introduction
  markdown += '# Filter Definitions\n\n';
  markdown +=
    'Filters allow you to query and segment your data in the Embrace dashboard. Use filters to narrow down sessions, crashes, and other telemetry data based on specific criteria.\n\n';

  // How to use section
  markdown += '## How to Use Filters\n\n';
  markdown +=
    'Each filter supports different operations and data types. When building queries:\n\n';
  markdown += '- **Equals** - Exact match\n';
  markdown += '- **Not Equals** - Exclude matches\n';
  markdown += '- **Greater Than** - Numeric comparison (value must be greater)\n';
  markdown += '- **Less Than** - Numeric comparison (value must be less)\n';
  markdown += '- **Contains** - Text contains the specified substring\n';
  markdown += '- **In** - Value is in a list of options\n\n';

  markdown += '---\n\n';

  // Deduplicate filters across all sections (same filter can appear in multiple sections)
  const uniqueFilters: Record<string, Filter> = {};

  // Iterate through all filter sections (aei, anr, crash, session, etc.)
  for (const [sectionName, sectionFilters] of Object.entries(metricsData.filters)) {
    for (const [key, filter] of Object.entries(sectionFilters)) {
      // Skip filters that are not visible
      // A filter is considered visible if:
      // 1. is_visible is true, OR
      // 2. visible_on array exists and is non-empty (visible on specific pages)
      const isVisible = filter.is_visible || (filter.visible_on && filter.visible_on.length > 0);
      if (!isVisible) {
        continue;
      }

      // Skip moment filters
      if (filter.category && filter.category.toLowerCase() === 'moment') {
        continue;
      }

      // Only add if we haven't seen this filter key before
      if (!uniqueFilters[key]) {
        uniqueFilters[key] = filter;
      }
    }
  }

  // Group unique filters by category
  const filtersByCategory: Record<string, Array<{ key: string; filter: Filter }>> = {};

  for (const [key, filter] of Object.entries(uniqueFilters)) {
    const category = filter.category || 'Other';
    if (!filtersByCategory[category]) {
      filtersByCategory[category] = [];
    }
    filtersByCategory[category].push({ key, filter });
  }

  // Sort categories alphabetically
  const sortedCategories = Object.keys(filtersByCategory).sort();

  // Generate markdown for each category
  for (const category of sortedCategories) {
    markdown += `## ${category} Filters\n\n`;

    markdown += '<div class="filters-table">\n\n';
    markdown +=
      '| Filter | Description | Details | Availability | Constraints |\n';
    markdown += '| --- | --- | --- | --- | --- |\n';

    // Sort filters within category by label
    const sortedFilters = filtersByCategory[category].sort((a, b) =>
      a.filter.label.localeCompare(b.filter.label)
    );

    for (const { key, filter } of sortedFilters) {
      markdown += generateFilterMarkdown(key, filter);
    }

    markdown += '\n</div>\n\n';
  }

  // Add common filter combinations section
  markdown += '## Common Filter Combinations\n\n';
  markdown +=
    'Here are some examples of commonly used filter combinations:\n\n';

  markdown += '### Debug a Specific Version\n';
  markdown += '- **App Version** equals `2.1.0`\n';
  markdown += '- Combine with other filters to narrow down issues\n\n';

  markdown += '### Find Users in a Specific Country\n';
  markdown += '- **Country ISO** equals `US` (or any two-letter country code)\n';
  markdown += '- Use with **App Version** to see regional adoption\n\n';

  markdown += '### Analyze Latest Version Performance\n';
  markdown += '- **App Version Set** equals `latest`\n';
  markdown += '- Compare metrics against previous versions\n\n';

  return markdown;
}

