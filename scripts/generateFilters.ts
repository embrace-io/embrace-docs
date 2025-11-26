import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';

// Type definitions based on your metrics.yaml structure
interface Filter {
  category: string;
  description?: string;
  is_visible: boolean;
  label: string;
  max_length?: number;
  min_length?: number;
  ops: string[];
  type: string;
  choices?: string[];
  supported_on?: Array<{ platform: string }>;
  visible_on?: string[];
}

interface MetricsData {
  filters: {
    aei: Record<string, Filter>;
    [key: string]: Record<string, Filter>;
  };
}

// Mapping for operations to human-readable text
const OP_LABELS: Record<string, string> = {
  eq: 'Equals',
  neq: 'Not Equals',
  gt: 'Greater Than',
  lt: 'Less Than',
  gte: 'Greater Than or Equal',
  lte: 'Less Than or Equal',
  in: 'In',
  nin: 'Not In',
  contains: 'Contains',
  startswith: 'Starts With',
  endswith: 'Ends With',
};

// Mapping for types to human-readable text
const TYPE_LABELS: Record<string, string> = {
  string: 'String',
  choice_string: 'Choice (String)',
  number: 'Number',
  integer: 'Integer',
  boolean: 'Boolean',
  date: 'Date',
  datetime: 'DateTime',
};

// Mapping for platform codes
const PLATFORM_LABELS: Record<string, string> = {
  an: 'Android',
  io: 'iOS',
  rn: 'React Native',
  fl: 'Flutter',
  un: 'Unity',
  we: 'Web',
};

const escapePipes = (value: string): string => value.replace(/\|/g, '\\|');

const formatPageName = (pageName: string): string => {
  // Convert snake_case to Title Case
  return pageName
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const sanitizeDescription = (description?: string): string => {
  if (!description) {
    return '—';
  }
  return escapePipes(description.replace(/\s+/g, ' ').trim());
};

const formatOperations = (ops: string[]): string => {
  if (!ops || ops.length === 0) {
    return '—';
  }
  return escapePipes(ops.map((op) => OP_LABELS[op] || op).join(', '));
};

const formatPlatforms = (filter: Filter): string => {
  if (!filter.supported_on || filter.supported_on.length === 0) {
    return 'All';
  }

  const platforms = filter.supported_on
    .map((p) => PLATFORM_LABELS[p.platform] || p.platform)
    .join(', ');

  return escapePipes(platforms);
};

const formatPages = (filter: Filter): string => {
  if (!filter.visible_on || filter.visible_on.length === 0) {
    return 'All Pages';
  }

  const pages = filter.visible_on.map((page) => formatPageName(page)).join(', ');

  return escapePipes(pages);
};

const formatPagesLabel = (pages: string): string => {
  if (pages.trim().toLowerCase() === 'all pages') {
    return 'All';
  }
  return pages;
};

const formatLengthConstraint = (filter: Filter): string | undefined => {
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

const formatChoicesConstraint = (filter: Filter): string | undefined => {
  if (!filter.choices || filter.choices.length === 0) {
    return undefined;
  }

  const choices = filter.choices.map((choice) => `\`${choice}\``).join(', ');
  return `Choices: ${choices}`;
};

const formatConstraints = (filter: Filter): string => {
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

/**
 * Generate markdown table row for a single filter
 */
function generateFilterMarkdown(filterKey: string, filter: Filter): string {
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

  const keyCell = `<span class="filters-table__key">\`${filterKey}\`</span>`;

  return `| ${escapePipes(filter.label)} | ${keyCell} | ${description} | ${behavior} | ${availability} | ${constraints} |\n`;
}

/**
 * Generate the complete filter documentation
 */
function generateFilterDocumentation(metricsData: MetricsData): string {
  let markdown = '';

  // Front matter
  markdown += '---\n';
  markdown += 'title: Filters Definitions\n';
  markdown += 'description: Complete definitions of all available filters for querying your data\n';
  markdown += 'slug: /definitions/filters\n';
  markdown += 'sidebar_class_name: hidden-filter-reference\n';
  markdown += '---\n\n';

  // Page title and introduction
  markdown += '# Filter Reference\n\n';
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
      if (!filter.is_visible) {
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
      '| Filter | Key | Description | Behavior | Availability | Constraints |\n';
    markdown += '| --- | --- | --- | --- | --- | --- |\n';

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

/**
 * Main execution function
 */
function main() {
  try {
    // Read the metrics.yaml file
    const metricsPath = process.argv[2] || './metrics.yaml';
    const outputPath = process.argv[3] || './docs/definitions/filters.md';

    console.log(`Reading metrics from: ${metricsPath}`);

    if (!fs.existsSync(metricsPath)) {
      throw new Error(`Metrics file not found at: ${metricsPath}`);
    }

    const metricsContent = fs.readFileSync(metricsPath, 'utf8');
    const metricsData = yaml.load(metricsContent) as MetricsData;

    console.log('Generating filter documentation...');

    // Generate the markdown
    const markdown = generateFilterDocumentation(metricsData);

    // Ensure output directory exists
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Write to file
    fs.writeFileSync(outputPath, markdown, 'utf8');

    console.log(`✓ Filter documentation generated at: ${outputPath}`);

    // Print statistics - count visible filters across all sections
    const visibleFilters: Filter[] = [];
    for (const sectionFilters of Object.values(metricsData.filters)) {
      visibleFilters.push(...Object.values(sectionFilters).filter((f) => f.is_visible));
    }
    console.log(`✓ Documented ${visibleFilters.length} visible filters`);

    const categories = new Set(visibleFilters.map((f) => f.category));
    console.log(`✓ Organized into ${categories.size} categories`);
  } catch (error) {
    console.error('Error generating filter documentation:', error);
    process.exit(1);
  }
}

// Run if executed directly
if (require.main === module) {
  main();
}

export { generateFilterDocumentation, generateFilterMarkdown };