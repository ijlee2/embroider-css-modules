import Component from '@glimmer/component';

import styles from './widget-5.css';

interface WidgetsWidget5Signature {
  // The arguments accepted by the component
  Args: {};
  // Any blocks yielded by the component
  Blocks: {
    default: [];
  };
  // The element to which `...attributes` is applied in the component template
  Element: null;
}

export default class WidgetsWidget5Component extends Component<WidgetsWidget5Signature> {
  styles = styles;
}
