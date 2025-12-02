export interface Filter {
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

export interface FilterWithSection extends Filter {
  section?: string; // Track which section this filter came from (e.g., 'crash', 'session')
}

export interface MetricsData {
  filters: {
    [key: string]: Record<string, Filter>;
  };
}

