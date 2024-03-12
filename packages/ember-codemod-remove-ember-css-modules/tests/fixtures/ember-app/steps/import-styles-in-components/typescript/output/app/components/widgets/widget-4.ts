import Component from '@glimmer/component';

import styles from './widget-4.css';

interface WidgetsWidget4Signature {
  // The arguments accepted by the component
  Args: {};
  // Any blocks yielded by the component
  Blocks: {
    default: [];
  };
  // The element to which `...attributes` is applied in the component template
  Element: null;
}

export default class WidgetsWidget4Component extends Component<WidgetsWidget4Signature> {
  styles = styles;
}
