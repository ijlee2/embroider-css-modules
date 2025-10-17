import type { TOC } from '@ember/component/template-only';
import { hash } from '@ember/helper';
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

const UiPage: TOC<UiPageSignature> = <template>
  <div class={{styles.container}}>
    <h1 class={{styles.title}} data-test-page-title>
      {{@title}}
    </h1>

    <div
      class={{styles.content}}
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
</template>;

export default UiPage;
