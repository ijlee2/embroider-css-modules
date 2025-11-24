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

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Ui::Form::Information': typeof UiFormInformation;
    'ui/form/information': typeof UiFormInformation;
  }
}
