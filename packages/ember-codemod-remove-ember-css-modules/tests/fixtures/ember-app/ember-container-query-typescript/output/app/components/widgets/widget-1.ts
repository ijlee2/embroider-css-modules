import Component from '@glimmer/component';

import styles from './widget-1.css';

interface WidgetsWidget1Signature {
  // The arguments accepted by the component
  Args: {};
  // Any blocks yielded by the component
  Blocks: {
    default: [];
  };
  // The element to which `...attributes` is applied in the component template
  Element: null;
}

export default class WidgetsWidget1Component extends Component<WidgetsWidget1Signature> {
  styles = styles;
}
