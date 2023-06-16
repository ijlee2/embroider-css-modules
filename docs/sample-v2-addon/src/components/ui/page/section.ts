import Component from '@glimmer/component';

import styles from './section.module.css';

interface UiPageSectionSignature {
  Blocks: {
    content: [];
    title: [];
  };
}

export default class UiPageSectionComponent extends Component<UiPageSectionSignature> {
  styles = styles;
}
