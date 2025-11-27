import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';
import { MetricsData, Filter } from './filters/types';
import { generateFilterDocumentation, generateFilterMarkdown } from './filters/generator';

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
