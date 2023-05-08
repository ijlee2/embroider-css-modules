import Component from '@glimmer/component';
import { WithBoundArgs } from '@glint/template';

import styles from './demo-page.css';
import type UiDemoPageDemoComponent from './demo-page/demo';
import type UiDemoPageSectionComponent from './demo-page/section';
import type UiDemoPageSubsectionComponent from './demo-page/subsection';

interface UiDemoPageSignature {
  Args: {
    title: string;
  };
  Blocks: {
    default: [
      {
        Demo: WithBoundArgs<typeof UiDemoPageDemoComponent, never>;
        Section: WithBoundArgs<typeof UiDemoPageSectionComponent, never>;
        Subsection: WithBoundArgs<typeof UiDemoPageSubsectionComponent, never>;
      },
    ];
  };
}

export default class UiDemoPageComponent extends Component<UiDemoPageSignature> {
  styles = styles;
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Ui::DemoPage': typeof UiDemoPageComponent;
  }
}
