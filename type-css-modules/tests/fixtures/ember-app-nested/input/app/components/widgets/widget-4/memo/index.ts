import Component from '@glimmer/component';

import styles from './index.css';

interface WidgetsWidget4MemoComponentSignature {}

export default class WidgetsWidget4MemoComponent extends Component<WidgetsWidget4MemoComponentSignature> {
  styles = styles;
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Widgets::Widget-4::Memo': typeof WidgetsWidget4MemoComponent;
  }
}
