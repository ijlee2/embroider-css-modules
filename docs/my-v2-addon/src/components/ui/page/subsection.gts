import type { TOC } from '@ember/component/template-only';
import { uniqueId } from '@ember/helper';

interface UiPageSubsectionSignature {
  Blocks: {
    content: [];
    title: [];
  };
}

const UiPageSubsection: TOC<UiPageSubsectionSignature> = <template>
  {{#let (uniqueId) as |subsectionId|}}
    <section
      aria-labelledby={{subsectionId}}
      class="components-ui-page-subsection__subsection"
    >
      <h3
        class="components-ui-page-subsection__title"
        data-test-subsection-title
        id={{subsectionId}}
      >
        {{yield to="title"}}
      </h3>

      <div data-test-subsection-content>
        {{yield to="content"}}
      </div>
    </section>
  {{/let}}
</template>;

export default UiPageSubsection;
