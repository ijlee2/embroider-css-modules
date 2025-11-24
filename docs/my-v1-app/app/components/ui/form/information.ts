import templateOnlyComponent from '@ember/component/template-only';

interface UiFormInformationSignature {
  Args: {
    formId: string;
    instructions?: string;
    title?: string;
  };
}

const UiFormInformation = templateOnlyComponent<UiFormInformationSignature>();

export default UiFormInformation;
