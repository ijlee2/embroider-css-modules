import Component from '@glimmer/component';

import styles from './index.css';

interface WidgetsWidget4ComponentSignature {}

export default class WidgetsWidget4Component extends Component<WidgetsWidget4ComponentSignature> {
  styles = styles;
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Widgets::Widget-4': typeof WidgetsWidget4Component;
  }
}
