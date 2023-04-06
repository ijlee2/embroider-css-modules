import templateOnlyComponent from '@ember/component/template-only';

import styles from './header.css';

interface WidgetsWidget4MemoHeaderSignature {
  Args: {
    cqFeatures?: Record<'small' | 'large' | 'short', boolean>;
  };
}

const WidgetsWidget4MemoHeaderComponent =
  templateOnlyComponent<WidgetsWidget4MemoHeaderSignature>();

export default WidgetsWidget4MemoHeaderComponent;
