import styles from './actions.module.css';
import Component from '@glimmer/component';
import type { QueryResults } from 'ember-container-query';

interface WidgetsWidget4MemoActionsSignature {
  Args: {
    cqFeatures?: QueryResults<'small' | 'large' | 'short'>;
  };
}

const WidgetsWidget4MemoActions =
  class extends Component<WidgetsWidget4MemoActionsSignature> {
    styles = styles;
  };

export default WidgetsWidget4MemoActions;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Widgets::Widget-4::Memo::Actions': typeof WidgetsWidget4MemoActions;
    'widgets/widget-4/memo/actions': typeof WidgetsWidget4MemoActions;
  }
}
