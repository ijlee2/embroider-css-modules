import type {
  Entities,
  OptionsForImportStyles,
} from '../../../../types/index.js';
import { createClass } from './create-class.js';
import { updateClass } from './update-class.js';

export function importStyles(
  entities: Entities,
  options: OptionsForImportStyles,
): void {
  for (const [entityName, extensions] of entities) {
    const hasClass = extensions.has('.js') || extensions.has('.ts');
    const hasStylesheet = extensions.has('.css');

    if (!hasStylesheet) {
      continue;
    }

    if (!hasClass) {
      createClass(entityName, options);

      continue;
    }

    updateClass(entityName, options);
  }
}
