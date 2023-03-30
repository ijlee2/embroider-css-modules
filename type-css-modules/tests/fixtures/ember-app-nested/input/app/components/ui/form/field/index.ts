import { guidFor } from '@ember/object/internals';
import Component from '@glimmer/component';

import styles from './index.css';

interface UiFormFieldComponentSignature {
  Args: {
    errorMessage?: string;
    isInline?: boolean;
    isWide?: boolean;
  };
  Blocks: {
    field: [
      {
        inputId: string;
      }
    ];
    label: [
      {
        inputId: string;
      }
    ];
  };
}

export default class UiFormFieldComponent extends Component<UiFormFieldComponentSignature> {
  inputId = guidFor(this);
  styles = styles;
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Ui::Form::Field': typeof UiFormFieldComponent;
  }
}
