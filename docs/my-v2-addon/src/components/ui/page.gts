import { hash } from '@ember/helper';
import UiPageDemo from 'my-v2-addon/components/ui/page/demo';
import UiPageSection from 'my-v2-addon/components/ui/page/section';
import UiPageSubsection from 'my-v2-addon/components/ui/page/subsection';

import Component from '@glimmer/component';
import type { WithBoundArgs } from '@glint/template';

import styles from './page.css';
import type UiPageDemoComponent from './page/demo.ts';
import type UiPageSectionComponent from './page/section.ts';
import type UiPageSubsectionComponent from './page/subsection.ts';

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
