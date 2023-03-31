import Component from '@glimmer/component';

import styles from './page.css';

interface UiPageComponentSignature {
  Args: {
    title: string;
  };
  Blocks: {
    default: [];
  };
}

export default class UiPageComponent extends Component<UiPageComponentSignature> {
  styles = styles;
}
