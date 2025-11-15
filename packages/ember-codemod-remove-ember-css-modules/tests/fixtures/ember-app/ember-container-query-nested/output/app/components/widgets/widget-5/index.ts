import Component from '@glimmer/component';

import styles from './index.css';

interface WidgetsWidget5Signature {
  // The arguments accepted by the component
  Args: {};
  // Any blocks yielded by the component
  Blocks: {
    default: [];
  };
  // The element to which `...attributes` is applied in the component template
  Element: null;
}

export default class WidgetsWidget5Component extends Component<WidgetsWidget5Signature> {
  styles = styles;
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Widgets::Widget-5': typeof WidgetsWidget5Component;
    'widgets/widget-5': typeof WidgetsWidget5Component;
  }
}
