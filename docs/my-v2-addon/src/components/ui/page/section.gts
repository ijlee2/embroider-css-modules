import type { TOC } from '@ember/component/template-only';
import { uniqueId } from '@ember/helper';

interface UiPageSectionSignature {
  Blocks: {
    content: [];
    title: [];
  };
}

const UiPageSection: TOC<UiPageSectionSignature> = <template>
  {{#let (uniqueId) as |sectionId|}}
    <section
      aria-labelledby={{sectionId}}
      class="components-ui-page-section__section"
    >
      <h2
        class="components-ui-page-section__title"
        data-test-section-title
        id={{sectionId}}
      >
        {{yield to="title"}}
      </h2>

      <div data-test-section-content>
        {{yield to="content"}}
      </div>
    </section>
  {{/let}}
</template>;

export default UiPageSection;
