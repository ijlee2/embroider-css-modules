import styles from './information.module.css';
import type { TOC } from '@ember/component/template-only';
import { concat } from '@ember/helper';
import { or } from 'ember-truth-helpers';

interface UiFormInformationSignature {
  Args: {
    formId: string;
    instructions?: string;
    title?: string;
  };
}

const UiFormInformation: TOC<UiFormInformationSignature> = <template>{{#if (or @title @instructions)}}
  <div class={{styles.components-ui-form-information__container}}>
    {{#if @title}}
      <div
        class={{styles.components-ui-form-information__title}}
        data-test-title
        id={{concat @formId "-title"}}
      >
        {{@title}}
      </div>
    {{/if}}

    {{#if @instructions}}
      <p
        class={{styles.components-ui-form-information__instructions}}
        data-test-instructions
        id={{concat @formId "-instructions"}}
      >
        {{@instructions}}
      </p>
    {{/if}}
  </div>
{{/if}}</template>;

export default UiFormInformation;
