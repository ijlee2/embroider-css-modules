import { dependencySatisfies, macroCondition } from '@embroider/macros';

import EmbroiderCssModulesLocalClassHelper from './_local-class';

const LocalClassNewHelper = (function () {
  if (macroCondition(dependencySatisfies('ember-css-modules', '*'))) {
    return EmbroiderCssModulesLocalClassHelper;
  }

  return () => {
    throw new SyntaxError(
      'Your project does not depend on ember-css-modules. Feel free to use the {{local-class}} helper from embroider-css-modules.',
    );
  };
})();

export default LocalClassNewHelper;
