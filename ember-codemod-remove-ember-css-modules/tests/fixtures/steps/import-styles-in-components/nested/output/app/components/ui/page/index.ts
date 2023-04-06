import Component from '@glimmer/component';

import styles from './index.css';

interface UiPageSignature {
  Args: {
    title: string;
  };
  Blocks: {
    default: [];
  };
}

export default class UiPageComponent extends Component<UiPageSignature> {
  styles = styles;

}
