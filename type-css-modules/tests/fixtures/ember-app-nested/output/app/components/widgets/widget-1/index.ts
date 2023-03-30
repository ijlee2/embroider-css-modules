import Component from '@glimmer/component';

import styles from './index.css';

interface WidgetsWidget1ComponentSignature {}

export default class WidgetsWidget1Component extends Component<WidgetsWidget1ComponentSignature> {
  styles = styles;
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Widgets::Widget-1': typeof WidgetsWidget1Component;
  }
}
