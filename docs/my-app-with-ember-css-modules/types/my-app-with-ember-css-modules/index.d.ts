import '@glint/environment-ember-loose';
import '@glint/environment-ember-template-imports';
import 'ember-source/types';
import 'ember-source/types/preview';

import { HelperLike } from '@glint/template';
import type EmbroiderCssModulesTemporaryRegistry from 'embroider-css-modules-temporary/template-registry';
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

type PageTitleHelper = HelperLike<{
  Args: { Positional: [title: string] };
  Return: void;
}>;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry
    extends EmbroiderCssModulesTemporaryRegistry,
      MyV2AddonRegistry {
    // Add any registry entries from other addons here that your addon itself uses (in non-strict mode templates)
    // See https://typed-ember.gitbook.io/glint/using-glint/ember/using-addons
    'local-class': LocalClassHelper;
    'page-title': PageTitleHelper;
  }
}
