import { Filter } from './types';
import { OP_LABELS } from './constants';

const escapePipes = (value: string): string => value.replace(/\|/g, '\\|');

const sanitizeDescription = (description?: string): string => {
  if (!description) {
    return '—';
  }
  return escapePipes(description.replace(/\s+/g, ' ').trim());
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
  const choiceConstraint = formatChoicesConstraint(filter);

  if (choiceConstraint) {
    parts.push(choiceConstraint);
  }

  if (parts.length === 0) {
    return '—';
  }

  return escapePipes(parts.join('<br />'));
};

export {
  escapePipes,
  sanitizeDescription,
  formatChoicesConstraint,
  formatConstraints,
};

