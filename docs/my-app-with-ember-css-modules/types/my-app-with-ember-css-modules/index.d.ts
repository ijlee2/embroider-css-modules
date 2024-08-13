import '@glint/environment-ember-loose';
import '@glint/environment-ember-template-imports';
import 'ember-source/types';

import type { HelperLike } from '@glint/template';
import type EmberPageTitleRegistry from 'ember-page-title/template-registry';
import type EmbroiderCssModulesRegistry from 'embroider-css-modules/template-registry';
import type MyV2AddonRegistry from 'my-v2-addon/template-registry';

type LocalClassHelper = HelperLike<{
  Args: {
    Named: {
      from?: string;
    };
    Positional: [localClassNames: string];
  };
  Return: string;
}>;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry
    extends EmberPageTitleRegistry,
      EmbroiderCssModulesRegistry,
      MyV2AddonRegistry {
    // Add any registry entries from other addons here that your addon itself uses (in non-strict mode templates)
    // See https://typed-ember.gitbook.io/glint/using-glint/ember/using-addons
    'local-class': LocalClassHelper;
  }
}
