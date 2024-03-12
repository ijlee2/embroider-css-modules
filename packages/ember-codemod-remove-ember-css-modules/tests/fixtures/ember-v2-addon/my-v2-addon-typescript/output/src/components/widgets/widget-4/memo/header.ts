import Component from '@glimmer/component';

import styles from './header.css';

interface WidgetsWidget4MemoHeaderSignature {
  Args: {
    cqFeatures?: Record<'small' | 'large' | 'short', boolean>;
  };
}

const WidgetsWidget4MemoHeaderComponent =
  class extends Component<WidgetsWidget4MemoHeaderSignature> {
    styles = styles;
  };

export default WidgetsWidget4MemoHeaderComponent;
