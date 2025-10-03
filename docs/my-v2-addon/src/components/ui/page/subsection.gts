import { uniqueId } from '@ember/helper';
import Component from '@glimmer/component';

import styles from './subsection.css';

interface UiPageSubsectionSignature {
  Blocks: {
    content: [];
    title: [];
  };
}

export default class UiPageSubsectionComponent extends Component<UiPageSubsectionSignature> {
  styles = styles;

  <template>
    {{#let (uniqueId) as |subsectionId|}}
      <section
        aria-labelledby={{subsectionId}}
        class={{this.styles.subsection}}
      >
        <h3
          class={{this.styles.title}}
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
  </template>
}
