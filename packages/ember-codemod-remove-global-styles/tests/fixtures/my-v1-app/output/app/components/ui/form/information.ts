import styles from './information.module.css';
import Component from '@glimmer/component';

interface UiFormInformationSignature {
  Args: {
    formId: string;
    instructions?: string;
    title?: string;
  };
}

const UiFormInformation = class extends Component<UiFormInformationSignature> {
  styles = styles;
};

export default UiFormInformation;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Ui::Form::Information': typeof UiFormInformation;
    'ui/form/information': typeof UiFormInformation;
  }
}
