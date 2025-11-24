import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import type { WithBoundArgs } from '@glint/template';

import type UiFormCheckbox from './form/checkbox';
import type UiFormInput from './form/input';
import type UiFormNumber from './form/number';
import type UiFormTextarea from './form/textarea';

interface UiFormSignature {
  Args: {
    data?: Record<string, unknown>;
    instructions?: string;
    onSubmit: (data: Record<string, unknown>) => Promise<void>;
    title?: string;
  };
  Blocks: {
    default: [
      {
        Checkbox: WithBoundArgs<
          typeof UiFormCheckbox,
          'data' | 'isInline' | 'isWide' | 'onUpdate'
        >;
        Input: WithBoundArgs<
          typeof UiFormInput,
          'data' | 'isWide' | 'onUpdate'
        >;
        Number: WithBoundArgs<
          typeof UiFormNumber,
          'data' | 'isWide' | 'onUpdate'
        >;
        Textarea: WithBoundArgs<
          typeof UiFormTextarea,
          'data' | 'isWide' | 'onUpdate'
        >;
      },
    ];
  };
}

export default class UiForm extends Component<UiFormSignature> {
  @tracked data = this.args.data ?? ({} as Record<string, unknown>);

  @action submitForm(event: SubmitEvent): void {
    event.preventDefault();

    console.table(this.data);
  }

  @action updateData({ key, value }: { key: string; value: unknown }): void {
    this.data = {
      ...this.data,
      [key]: value,
    };
  }
}
