import Component from '@glimmer/component';

import styles from './index.css';

interface UiFormInformationComponentSignature {
  Args: {
    formId: string;
    instructions?: string;
    title?: string;
  };
}

export default class UiFormInformationComponent extends Component<UiFormInformationComponentSignature> {
  styles = styles;
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Ui::Form::Information': typeof UiFormInformationComponent;
  }
}
