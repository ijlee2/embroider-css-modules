import Component from '@glimmer/component';

import styles from './index.css';

interface WidgetsWidget4MemoHeaderComponentSignature {
  Args: {
    cqFeatures?: Record<'small' | 'large' | 'short', boolean>;
  };
}

export default class WidgetsWidget4MemoHeaderComponent extends Component<WidgetsWidget4MemoHeaderComponentSignature> {
  styles = styles;
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Widgets::Widget-4::Memo::Header': typeof WidgetsWidget4MemoHeaderComponent;
  }
}
