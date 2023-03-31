import Component from '@glimmer/component';

import styles from './information.css';

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
