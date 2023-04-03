import templateOnlyComponent from '@ember/component/template-only';

interface UiFormInformationComponentSignature {
  Args: {
    formId: string;
    instructions?: string;
    title?: string;
  };
}

const UiFormInformationComponent =
  templateOnlyComponent<UiFormInformationComponentSignature>();

export default UiFormInformationComponent;
