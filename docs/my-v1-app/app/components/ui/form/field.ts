import templateOnlyComponent from '@ember/component/template-only';

interface UiFormFieldSignature {
  Args: {
    errorMessage?: string;
    isInline?: boolean;
    isWide?: boolean;
  };
  Blocks: {
    field: [
      {
        inputId: string;
      },
    ];
    label: [
      {
        inputId: string;
      },
    ];
  };
}

const UiFormField = templateOnlyComponent<UiFormFieldSignature>();

export default UiFormField;
