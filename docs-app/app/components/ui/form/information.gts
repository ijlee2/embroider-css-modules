import type { TOC } from '@ember/component/template-only';

import styles from './information.css';

interface UiFormInformationSignature {
  Args: {
    formId: string;
    instructions?: string;
    title?: string;
  };
}

function or(title?: string, instructions?: string) {
  return Boolean(title) || Boolean(instructions);
}

const UiFormInformationComponent: TOC<UiFormInformationSignature> =
<template>
  {{#if (or @title @instructions)}}
    <div class={{styles.container}}>
      {{#if @title}}
        <div
          class={{styles.title}}
          data-test-title
          id="{{@formId}}-title"
        >
          {{@title}}
        </div>
      {{/if}}

      {{#if @instructions}}
        <p
          class={{styles.instructions}}
          data-test-instructions
          id="{{@formId}}-instructions"
        >
          {{@instructions}}
        </p>
      {{/if}}
    </div>
  {{/if}}
</template>

export default UiFormInformationComponent;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Ui::Form::Information': typeof UiFormInformationComponent;
  }
}
