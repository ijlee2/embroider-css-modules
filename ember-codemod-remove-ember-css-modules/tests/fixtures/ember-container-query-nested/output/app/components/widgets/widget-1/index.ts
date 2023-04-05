import Component from '@glimmer/component';

import styles from './index.css';

interface WidgetsWidget1Signature {
  // The arguments accepted by the component
  Args: {};
  // Any blocks yielded by the component
  Blocks: {
    default: [];
  };
  // The element to which `...attributes` is applied in the component template
  Element: null;
}

export default class WidgetsWidget1Component extends Component<WidgetsWidget1Signature> {
  styles = styles;
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Widgets::Widget1': typeof WidgetsWidget1Component;
    'widgets/widget-1': typeof WidgetsWidget1Component;
  }
}
