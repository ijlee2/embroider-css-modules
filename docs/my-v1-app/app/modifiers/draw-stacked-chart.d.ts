import type { ModifierLike } from '@glint/template';
import type { Data } from 'my-v1-app/utils/components/widgets/widget-2';

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'draw-stacked-chart': ModifierLike<{
      Args: {
        Named: {
          data?: Data[];
        };
      };
      Element: Element;
    }>;
  }
}
