import styles from './field.module.css';
import Component from '@glimmer/component';

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

const UiFormField = class extends Component<UiFormFieldSignature> {
  styles = styles;
};

export default UiFormField;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Ui::Form::Field': typeof UiFormField;
    'ui/form/field': typeof UiFormField;
  }
}
