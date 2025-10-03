import { uniqueId } from '@ember/helper';
import Component from '@glimmer/component';

import styles from './section.css';

interface UiPageSectionSignature {
  Blocks: {
    content: [];
    title: [];
  };
}

export default class UiPageSectionComponent extends Component<UiPageSectionSignature> {
  styles = styles;

  <template>
    {{#let (uniqueId) as |sectionId|}}
      <section aria-labelledby={{sectionId}} class={{this.styles.section}}>
        <h2
          class={{this.styles.title}}
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
  </template>
}
