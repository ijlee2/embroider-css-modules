import Component from '@glimmer/component';

import styles from './subsection.css';

interface UiDemoPageSubsectionSignature {
  Blocks: {
    content: [];
    title: [];
  };
}

export default class UiDemoPageSubsectionComponent extends Component<UiDemoPageSubsectionSignature> {
  styles = styles;
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Ui::DemoPage::Subsection': typeof UiDemoPageSubsectionComponent;
    'ui/demo-page/subsection': typeof UiDemoPageSubsectionComponent;
  }
}
