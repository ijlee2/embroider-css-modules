import Component from '@glimmer/component';

import styles from './index.css';

interface WidgetsWidget5ComponentSignature {}

export default class WidgetsWidget5Component extends Component<WidgetsWidget5ComponentSignature> {
  styles = styles;
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Widgets::Widget-5': typeof WidgetsWidget5Component;
  }
}
