import templateOnlyComponent from '@ember/component/template-only';

interface UiPageComponentSignature {
  Args: {
    title: string;
  };
  Blocks: {
    default: [];
  };
}

const UiPageComponent = templateOnlyComponent<UiPageComponentSignature>();

export default UiPageComponent;
