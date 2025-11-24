import type { TOC } from '@ember/component/template-only';
import { uniqueId } from '@ember/helper';

import styles from './section.module.css';

interface UiPageSectionSignature {
  Blocks: {
    content: [];
    title: [];
  };
}

const UiPageSection: TOC<UiPageSectionSignature> = <template>
  {{#let (uniqueId) as |sectionId|}}
    <section aria-labelledby={{sectionId}} class={{styles.section}}>
      <h2 class={{styles.title}} data-test-section-title id={{sectionId}}>
        {{yield to="title"}}
      </h2>

      <div data-test-section-content>
        {{yield to="content"}}
      </div>
    </section>
  {{/let}}
</template>;

export default UiPageSection;
