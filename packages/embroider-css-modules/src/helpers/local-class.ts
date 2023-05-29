import { dependencySatisfies, macroCondition } from '@embroider/macros';

import EmbroiderCssModulesLocalClassHelper from './_local-class';

const LocalClassHelper = (function () {
  if (macroCondition(dependencySatisfies('ember-css-modules', '*'))) {
    return undefined;
  }

  return EmbroiderCssModulesLocalClassHelper;
})();

export default LocalClassHelper;
