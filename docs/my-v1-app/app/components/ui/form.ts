import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import type { WithBoundArgs } from '@glint/template';

import styles from './form.css';
import type UiFormCheckboxComponent from './form/checkbox';
import type UiFormInputComponent from './form/input';
import type UiFormNumberComponent from './form/number';
import type UiFormTextareaComponent from './form/textarea';

interface UiFormSignature {
  Args: {
    data?: Record<string, any>;
    instructions?: string;
    title?: string;
  };
  Blocks: {
    default: [
      {
        Checkbox: WithBoundArgs<
          typeof UiFormCheckboxComponent,
          'changeset' | 'isInline' | 'isWide' | 'onUpdate'
        >;
        Input: WithBoundArgs<
          typeof UiFormInputComponent,
          'changeset' | 'isWide' | 'onUpdate'
        >;
        Number: WithBoundArgs<
          typeof UiFormNumberComponent,
          'changeset' | 'isWide' | 'onUpdate'
        >;
        Textarea: WithBoundArgs<
          typeof UiFormTextareaComponent,
          'changeset' | 'isWide' | 'onUpdate'
        >;
      },
    ];
  };
}

export default class UiFormComponent extends Component<UiFormSignature> {
  @tracked changeset = this.args.data ?? ({} as Record<string, any>);

  formId = guidFor(this);
  styles = styles;

  @action submitForm(event: SubmitEvent): void {
    event.preventDefault();

    console.table(this.changeset);
  }

  @action updateChangeset({ key, value }: { key: string; value: any }): void {
    this.changeset = {
      ...this.changeset,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      [key]: value,
    };
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Ui::Form': typeof UiFormComponent;
  }
}
