import Component from '@glimmer/component';

import styles from './item.css';

interface WidgetsWidget1ItemComponentSignature {
  Args: {
    title: string;
  };
}

export default class WidgetsWidget1ItemComponent extends Component<WidgetsWidget1ItemComponentSignature> {
  styles = styles;
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Widgets::Widget-1::Item': typeof WidgetsWidget1ItemComponent;
  }
}
