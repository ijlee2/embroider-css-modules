import { dependencySatisfies, macroCondition } from '@embroider/macros';

import EmbroiderCssModulesLocalClassHelper from './_local-class';

const LocalClassNewHelper = (function () {
  if (macroCondition(dependencySatisfies('ember-css-modules', '*'))) {
    console.log('The project depends on ember-css-modules.');
    return EmbroiderCssModulesLocalClassHelper;
  }

  // TODO: Throw an error instead
  console.log('The project does not depend on ember-css-modules.');
  return EmbroiderCssModulesLocalClassHelper;
})();

export default LocalClassNewHelper;
