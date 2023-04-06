import templateOnlyComponent from '@ember/component/template-only';

import styles from './item.css';

interface WidgetsWidget1ItemSignature {
  Args: {
    title: string;
  };
}

const WidgetsWidget1ItemComponent =
  templateOnlyComponent<WidgetsWidget1ItemSignature>();

export default WidgetsWidget1ItemComponent;
