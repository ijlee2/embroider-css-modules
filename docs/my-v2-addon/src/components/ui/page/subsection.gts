import type { TOC } from '@ember/component/template-only';
import { uniqueId } from '@ember/helper';

import styles from './subsection.module.css';

interface UiPageSubsectionSignature {
  Blocks: {
    content: [];
    title: [];
  };
}

const UiPageSubsection: TOC<UiPageSubsectionSignature> = <template>
  {{#let (uniqueId) as |subsectionId|}}
    <section aria-labelledby={{subsectionId}} class={{styles.subsection}}>
      <h3 class={{styles.title}} data-test-subsection-title id={{subsectionId}}>
        {{yield to="title"}}
      </h3>

      <div data-test-subsection-content>
        {{yield to="content"}}
      </div>
    </section>
  {{/let}}
</template>;

export default UiPageSubsection;
