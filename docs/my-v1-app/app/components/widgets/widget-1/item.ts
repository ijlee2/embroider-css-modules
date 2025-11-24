import templateOnlyComponent from '@ember/component/template-only';

interface WidgetsWidget1ItemSignature {
  Args: {
    title: string;
  };
}

const WidgetsWidget1Item = templateOnlyComponent<WidgetsWidget1ItemSignature>();

export default WidgetsWidget1Item;
