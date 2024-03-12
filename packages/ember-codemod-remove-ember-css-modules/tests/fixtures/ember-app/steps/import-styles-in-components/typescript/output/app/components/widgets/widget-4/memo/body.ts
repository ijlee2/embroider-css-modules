import Component from '@glimmer/component';

import styles from './body.css';

interface WidgetsWidget4MemoBodySignature {
  Args: {
    cqFeatures?: Record<'small' | 'large' | 'short', boolean>;
  };
}

const WidgetsWidget4MemoBodyComponent =
  class extends Component<WidgetsWidget4MemoBodySignature> {
    styles = styles;
  };

export default WidgetsWidget4MemoBodyComponent;
