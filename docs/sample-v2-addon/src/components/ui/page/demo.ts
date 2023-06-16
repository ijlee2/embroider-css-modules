import Component from '@glimmer/component';

import styles from './demo.module.css';

interface UiPageDemoSignature {
  Blocks: {
    default: [];
  };
}

export default class UiPageDemoComponent extends Component<UiPageDemoSignature> {
  styles = styles;
}
