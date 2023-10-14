import Component from '@glimmer/component';

import styles from './section.css';

interface UiPageSectionSignature {
  Blocks: {
    content: [];
    title: [];
  };
}

export default class UiPageSectionComponent extends Component<UiPageSectionSignature> {
  styles = styles;
}
