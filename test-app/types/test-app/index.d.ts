import '@glint/environment-ember-loose';
import 'ember-source/types';
import 'ember-source/types/preview';

import AndHelper from '@gavant/glint-template-types/types/ember-truth-helpers/helpers/and';
import OrHelper from '@gavant/glint-template-types/types/ember-truth-helpers/helpers/or';
import { HelperLike } from '@glint/template';
import type EmbroiderCssModulesRegistry from 'embroider-css-modules/template-registry';

type PageTitleHelper = HelperLike<{
  Args: { Positional: [title: string] };
  Return: void;
}>;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry extends EmbroiderCssModulesRegistry {
    // Add any registry entries from other addons here that your addon itself uses (in non-strict mode templates)
    // See https://typed-ember.gitbook.io/glint/using-glint/ember/using-addons
    and: typeof AndHelper;
    or: typeof OrHelper;
    'page-title': PageTitleHelper;
  }
}
