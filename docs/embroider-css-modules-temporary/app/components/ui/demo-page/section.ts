import Component from '@glimmer/component';

import styles from './section.css';

interface UiDemoPageSectionSignature {
  Blocks: {
    content: [];
    title: [];
  };
}

export default class UiDemoPageSectionComponent extends Component<UiDemoPageSectionSignature> {
  styles = styles;
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Ui::DemoPage::Section': typeof UiDemoPageSectionComponent;
    'ui/demo-page/section': typeof UiDemoPageSectionComponent;
  }
}
