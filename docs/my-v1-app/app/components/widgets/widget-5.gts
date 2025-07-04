import type { TOC } from '@ember/component/template-only';
import { hash } from '@ember/helper';
import { ContainerQuery, height, width } from 'ember-container-query';
import { and } from 'ember-truth-helpers';

import styles from './widget-5.css';

interface WidgetsWidget5Signature {}

const WidgetsWidget5Component: TOC<WidgetsWidget5Signature> = <template>
  <ContainerQuery
    @features={{hash large=(width min=224) tall=(height min=120)}}
    @tagName="section"
    class={{styles.container}}
    as |CQ|
  >
    {{#let (and CQ.features.large CQ.features.tall) as |showFullText|}}
      <div class={{styles.call-to-action}} data-test-call-to-action>
        {{#if showFullText}}
          <p>What will <em>you</em> create with</p>
        {{/if}}

        <p class={{styles.highlight}}>
          <a
            href="https://github.com/ijlee2/embroider-css-modules"
            rel="noopener noreferrer"
            target="_blank"
          >
            embroider-css-modules
          </a>
        </p>

        {{#if showFullText}}
          <p>?</p>
        {{/if}}
      </div>
    {{/let}}
  </ContainerQuery>
</template>;

export default WidgetsWidget5Component;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Widgets::Widget-5': typeof WidgetsWidget5Component;
  }
}
