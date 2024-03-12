import Component from '@glimmer/component';

import styles from './actions.css';

interface WidgetsWidget4MemoActionsSignature {
  Args: {
    cqFeatures?: Record<'small' | 'large' | 'short', boolean>;
  };
}

const WidgetsWidget4MemoActionsComponent =
  class extends Component<WidgetsWidget4MemoActionsSignature> {
    styles = styles;
  };

export default WidgetsWidget4MemoActionsComponent;
