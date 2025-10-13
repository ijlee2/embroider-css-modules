import { hash } from '@ember/helper';
import Component from '@glimmer/component';
import type { WithBoundArgs } from '@glint/template';

import styles from './page.module.css';
import UiPageDemo from './page/demo.gts';
import UiPageSection from './page/section.gts';
import UiPageSubsection from './page/subsection.gts';

interface UiPageSignature {
  Args: {
    title: string;
  };
  Blocks: {
    default: [
      {
        Demo: WithBoundArgs<typeof UiPageDemo, never>;
        Section: WithBoundArgs<typeof UiPageSection, never>;
        Subsection: WithBoundArgs<typeof UiPageSubsection, never>;
      },
    ];
  };
}

export default class UiPageComponent extends Component<UiPageSignature> {
  styles = styles;

  <template>
    <div class={{this.styles.container}}>
      <h1 class={{this.styles.title}} data-test-page-title>
        {{@title}}
      </h1>

      <div
        class={{this.styles.content}}
        data-test-page-content
        id="main-content"
        tabindex="-1"
      >
        {{yield
          (hash
            Demo=(component UiPageDemo)
            Section=(component UiPageSection)
            Subsection=(component UiPageSubsection)
          )
        }}
      </div>
    </div>
  </template>
}
