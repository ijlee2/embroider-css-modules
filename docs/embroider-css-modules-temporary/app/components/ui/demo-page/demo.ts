import Component from '@glimmer/component';

import styles from './demo.css';

interface UiDemoPageDemoSignature {
  Blocks: {
    default: [];
  };
}

export default class UiDemoPageDemoComponent extends Component<UiDemoPageDemoSignature> {
  styles = styles;
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Ui::DemoPage::Demo': typeof UiDemoPageDemoComponent;
    'ui/demo-page/demo': typeof UiDemoPageDemoComponent;
  }
}
