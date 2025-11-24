import type { TOC } from '@ember/component/template-only';
import { hash, uniqueId } from '@ember/helper';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: Could not find a declaration file for module 'ember-svg-jar/helpers/svg-jar'.
import svgJar from 'ember-svg-jar/helpers/svg-jar';

interface UiFormFieldSignature {
  Args: {
    errorMessage?: string;
    isInline?: boolean;
    isWide?: boolean;
  };
  Blocks: {
    field: [
      {
        inputId: string;
      },
    ];
    label: [
      {
        inputId: string;
      },
    ];
  };
}

const UiFormField: TOC<UiFormFieldSignature> = <template>
  {{#let (uniqueId) as |inputId|}}
    <div
      class="{{styles.components-ui-form-field__container}} {{if @isInline 'components-ui-form-field__is-inline'}}  {{if @isWide 'components-ui-form-field__is-wide'}}  {{unless @errorMessage 'components-ui-form-field__no-feedback'}}  "
      data-test-field-container
    >
      <div class={{styles.components-ui-form-field__label}}>
        {{yield (hash inputId=inputId) to="label"}}
      </div>

      <div class={{styles.components-ui-form-field__field}}>
        {{yield (hash inputId=inputId) to="field"}}
      </div>

      {{#if @errorMessage}}
        <div
          class={{concat styles.components-ui-form-field__feedback " " "components-ui-form-field__is-error"}}
        >
          {{svgJar
            "alert"
            desc="A warning to indicate that the input field has an error"
            role="img"
          }}

          <span
            class={{styles.components-ui-form-field__message}}
            data-test-error-message
            role="alert"
          >
            {{@errorMessage}}
          </span>
        </div>
      {{/if}}
    </div>
  {{/let}}
</template>;

export default UiFormField;
