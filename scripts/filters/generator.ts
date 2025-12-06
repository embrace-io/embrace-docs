import { FilterWithSection, MetricsData } from './types';
import { TYPE_LABELS } from './constants';
import { escapePipes, formatConstraints, sanitizeDescription } from './formatters';

/**
 * Generate markdown table row for a single filter
 */
const generateFilterMarkdown = (
  filterKey: string,
  filter: FilterWithSection,
): string => {
  const description = sanitizeDescription(filter.description);
  const type = escapePipes(TYPE_LABELS[filter.type] || filter.type);
  const constraints = formatConstraints(filter);

  const identity = [
    escapePipes(filter.label),
    `<span class="filters-table__key">${filterKey}</span>`,
  ].join('<br />');

  return `| ${identity} | ${description} | ${type} | ${constraints} |\n`;
};

/**
 * Generate the complete filter documentation
 */
const generateFilterDocumentation = (metricsData: MetricsData): string => {
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

  // Column definitions section
  markdown += '## Understanding Filter Table Columns\n\n';
  markdown += 'Each filter table in this page uses the same columns:\n\n';

  markdown += '- **Filter** - Human-readable name of the filter, with the key used in APIs or programmatic queries shown below it in monospace (for example, `app_version`).\n';
  markdown +=
    '- **Description** - Plain-language explanation of what the filter represents and how it is typically used.\n';
  markdown += '- **Type** - Describes the data shape, such as String, Choice (String), int, float, Boolean, Date/DateTime, property (key-value pair), or intrange (integer range).\n';
  markdown +=
    '- **Constraints** - Describes any documented limits on valid values for the filter, such as enumerated choices. If no constraints are listed, the filter accepts any value that matches its type.\n\n';

  markdown += '---\n\n';

  // Deduplicate filters across all sections (same filter can appear in multiple sections)
  // Track section info for blocklist matching
  const uniqueFilters: Record<string, FilterWithSection> = {};

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
      // Attach section info for blocklist checking
      if (!uniqueFilters[key]) {
        uniqueFilters[key] = { ...filter, section: sectionName };
      }
    }
  }

  // Group unique filters by category
  const filtersByCategory: Record<string, Array<{ key: string; filter: FilterWithSection }>> = {};

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
    markdown += '| Filter | Description | Type | Constraints |\n';
    markdown += '| --- | --- | --- | --- |\n';

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

  markdown += '### Debug a Specific Version\n\n';
  markdown += '- **App Version** equals `2.1.0`\n';
  markdown += '- Combine with other filters to narrow down issues\n\n';

  markdown += '### Find Users in a Specific Country\n\n';
  markdown += '- **Country ISO** equals `US` (or any two-letter country code)\n';
  markdown += '- Use with **App Version** to see regional adoption\n\n';

  markdown += '### Analyze Latest Version Performance\n\n';
  markdown += '- **App Version Set** equals `latest`\n';
  markdown += '- Compare metrics against previous versions\n\n';

  // Ensure we don't end with multiple blank lines (Markdown lint)
  return markdown.replace(/\n+$/u, '\n');
};

export { generateFilterMarkdown, generateFilterDocumentation };

