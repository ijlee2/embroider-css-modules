import Component from '@glimmer/component';

import styles from './index.css';

interface WidgetsWidget4MemoActionsComponentSignature {
  Args: {
    cqFeatures?: Record<'small' | 'large' | 'short', boolean>;
  };
}

export default class WidgetsWidget4MemoActionsComponent extends Component<WidgetsWidget4MemoActionsComponentSignature> {
  styles = styles;
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Widgets::Widget-4::Memo::Actions': typeof WidgetsWidget4MemoActionsComponent;
  }
}
