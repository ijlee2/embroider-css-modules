// Add any types here that you need for local development only.
// These will *not* be published as part of your addon, so be careful that your published code does not rely on them!

import '@glint/environment-ember-loose';
import '@glint/environment-ember-template-imports';

import type PercyEmberRegistry from '../src/template-registry.ts';
import type {} from './percy.d.ts';

declare global {
  interface Window {
    PercyDOM?: {
      serialize: (options: Record<string, unknown>) => unknown;
    };
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry extends PercyEmberRegistry {
    // Add any registry entries from other addons here that your addon itself uses (in non-strict mode templates)
    // See https://typed-ember.gitbook.io/glint/using-glint/ember/using-addons
  }
}
