import { guidFor } from '@ember/object/internals';
import Component from '@glimmer/component';

import styles from './field.css';

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
