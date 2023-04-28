import templateOnlyComponent from '@ember/component/template-only';

interface WidgetsWidget1ItemSignature {
  Args: {
    title: string;
  };
}

const WidgetsWidget1ItemComponent =
  templateOnlyComponent<WidgetsWidget1ItemSignature>();

export default WidgetsWidget1ItemComponent;
