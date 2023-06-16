import Component from '@glimmer/component';
import { WithBoundArgs } from '@glint/template';

import styles from './page.module.css';
import type UiPageDemoComponent from './page/demo';
import type UiPageSectionComponent from './page/section';
import type UiPageSubsectionComponent from './page/subsection';

interface UiPageSignature {
  Args: {
    title: string;
  };
  Blocks: {
    default: [
      {
        Demo: WithBoundArgs<typeof UiPageDemoComponent, never>;
        Section: WithBoundArgs<typeof UiPageSectionComponent, never>;
        Subsection: WithBoundArgs<typeof UiPageSubsectionComponent, never>;
      },
    ];
  };
}

export default class UiPageComponent extends Component<UiPageSignature> {
  styles = styles;
}
