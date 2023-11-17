import '@glint/environment-ember-loose';
import 'ember-source/types';
import 'ember-source/types/preview';

import { HelperLike } from '@glint/template';
import type EmberContainerQueryRegistry from 'ember-container-query/template-registry';
import type EmbroiderCssModulesRegistry from 'embroider-css-modules/template-registry';
import type MyV1AddonRegistry from 'my-v1-addon/template-registry';

type PageTitleHelper = HelperLike<{
  Args: { Positional: [title: string] };
  Return: void;
}>;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry
    extends EmberContainerQueryRegistry,
      EmbroiderCssModulesRegistry,
      MyV1AddonRegistry {
    // Add any registry entries from other addons here that your addon itself uses (in non-strict mode templates)
    // See https://typed-ember.gitbook.io/glint/using-glint/ember/using-addons
    'page-title': PageTitleHelper;
  }
}