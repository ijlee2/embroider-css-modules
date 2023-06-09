import Component from '@glimmer/component';

import styles from './subsection.css';

interface UiPageSubsectionSignature {
  Blocks: {
    content: [];
    title: [];
  };
}

export default class UiPageSubsectionComponent extends Component<UiPageSubsectionSignature> {
  styles = styles;
}
