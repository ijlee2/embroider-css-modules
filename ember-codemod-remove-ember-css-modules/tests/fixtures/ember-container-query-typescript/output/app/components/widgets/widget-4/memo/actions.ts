import templateOnlyComponent from '@ember/component/template-only';

import styles from './actions.css';

interface WidgetsWidget4MemoActionsSignature {
  Args: {
    cqFeatures?: Record<'small' | 'large' | 'short', boolean>;
  };
}

const WidgetsWidget4MemoActionsComponent =
  templateOnlyComponent<WidgetsWidget4MemoActionsSignature>();

export default WidgetsWidget4MemoActionsComponent;
