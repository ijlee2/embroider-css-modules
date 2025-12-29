import styles from './widget-5.module.css';
import { hash } from '@ember/helper';
import { ContainerQuery, height, width } from 'ember-container-query';
import { and } from 'ember-truth-helpers';

const WidgetsWidget5 = <template><ContainerQuery
  @features={{hash large=(width min=224) tall=(height min=120)}}
  @tagName="section"
  class={{styles.components-widgets-widget-5__container}}
  as |CQ|
>
  {{#let (and CQ.features.large CQ.features.tall) as |showFullText|}}
    <div
      class={{styles.components-widgets-widget-5__call-to-action}}
      data-test-call-to-action
    >
      {{#if showFullText}}
        <p>What will <em>you</em> create with</p>
      {{/if}}

      <p class="components-widgets-widget-5__highlight">
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
</ContainerQuery></template>;

export default WidgetsWidget5;
