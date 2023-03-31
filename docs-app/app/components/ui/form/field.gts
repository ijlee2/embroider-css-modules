import { hash } from '@ember/helper';
import { guidFor } from '@ember/object/internals';
import Component from '@glimmer/component';
import { localClass } from 'embroider-css-modules';

import styles from './field.css';

interface UiFormFieldComponentSignature {
  Args: {
    errorMessage?: string;
    isInline?: boolean;
    isWide?: boolean;
  };
  Blocks: {
    field: [
      {
        inputId: string;
      }
    ];
    label: [
      {
        inputId: string;
      }
    ];
  };
}

export default class UiFormFieldComponent extends Component<UiFormFieldComponentSignature> {
  inputId = guidFor(this);

  <template>
    <div
      class={{localClass
        styles
        "container"
        (if @isInline "is-inline")
        (if @isWide "is-wide")
        (unless @errorMessage "no-feedback")
      }}
      data-test-field-container
    >
      <div class={{styles.label}}>
        {{yield (hash inputId=this.inputId) to="label"}}
      </div>

      <div class={{styles.field}}>
        {{yield (hash inputId=this.inputId) to="field"}}
      </div>

      {{#if @errorMessage}}
        <div
          class={{localClass styles "feedback" "is-error"}}
        >
          {{! @glint-ignore: ember-svg-jar doesn't support template tag }}
          {{svg-jar "alert" aria-hidden="true"}}

          <span
            class={{styles.message}}
            data-test-feedback
            role="alert"
          >
            {{@errorMessage}}
          </span>
        </div>
      {{/if}}
    </div>
  </template>
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Ui::Form::Field': typeof UiFormFieldComponent;
  }
}
