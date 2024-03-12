import type {
  Entities,
  OptionsForUpdateTemplates,
} from '../../../types/index.js';
import { updateTemplate } from './update-template.js';

export function updateTemplates(
  entities: Entities,
  options: OptionsForUpdateTemplates,
): void {
  for (const [entityName, extensions] of entities) {
    const hasTemplate = extensions.has('.hbs');

    if (!hasTemplate) {
      continue;
    }

    updateTemplate(entityName, options);
  }
}
