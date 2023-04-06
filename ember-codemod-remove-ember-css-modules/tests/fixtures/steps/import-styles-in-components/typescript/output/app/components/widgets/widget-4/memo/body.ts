import templateOnlyComponent from '@ember/component/template-only';

import styles from './body.css';

interface WidgetsWidget4MemoBodySignature {
  Args: {
    cqFeatures?: Record<'small' | 'large' | 'short', boolean>;
  };
}

const WidgetsWidget4MemoBodyComponent =
  templateOnlyComponent<WidgetsWidget4MemoBodySignature>();

export default WidgetsWidget4MemoBodyComponent;
