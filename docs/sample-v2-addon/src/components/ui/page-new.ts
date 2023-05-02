import Component from '@glimmer/component';

import styles from './page-new.css';

interface UiPageNewSignature {
  Args: {
    title: string;
  };
  Blocks: {
    default: [];
  };
}

export default class UiPageNewComponent extends Component<UiPageNewSignature> {
  styles = styles;
}
