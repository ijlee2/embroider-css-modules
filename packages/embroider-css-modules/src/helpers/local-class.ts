import {
  dependencySatisfies,
  importSync,
  macroCondition,
  moduleExists,
} from '@embroider/macros';
import { HelperLike } from '@glint/template';

import EmbroiderCssModulesLocalClassHelper from './_local-class';

type EmberCssModulesLocalClassHelper = HelperLike<{
  Args: {
    Named: {
      from?: string;
    };
    Positional: [localClassNames: string];
  };
  Return: string;
}>;

const LocalClassHelper = (function () {
  if (macroCondition(dependencySatisfies('ember-css-modules', '*'))) {
    if (moduleExists('ember-css-modules/helpers/local-class')) {
      return importSync(
        'ember-css-modules/helpers/local-class',
      ) as EmberCssModulesLocalClassHelper;
    }

    throw new Error(
      'Could not find the {{local-class}} helper from ember-css-modules.',
    );
  }

  return EmbroiderCssModulesLocalClassHelper;
})();

export default LocalClassHelper;
