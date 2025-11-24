import styles from './input.module.css';
import { assert } from '@ember/debug';
import { action, get } from '@ember/object';
import Component from '@glimmer/component';
import { generateErrorMessage } from 'my-v1-app/utils/components/ui/form';

interface UiFormInputSignature {
  Args: {
    data: Record<string, unknown>;
    isDisabled?: boolean;
    isReadOnly?: boolean;
    isRequired?: boolean;
    isWide?: boolean;
    key: string;
    label: string;
    onUpdate: ({ key, value }: { key: string; value: unknown }) => void;
    placeholder?: string;
    type?: string;
  };
}

export default class UiFormInput extends Component<UiFormInputSignature> {
  styles = styles;

  get errorMessage(): string | undefined {
    const { isRequired } = this.args;

    return generateErrorMessage({
      isRequired,
      value: this.value,
      valueType: 'string',
    });
  }

  get type(): string {
    const { type } = this.args;

    assert(
      'To render a number input, please use <Ui::Form::Number> instead.',
      type !== 'number',
    );

    return type ?? 'text';
  }

  get value(): string {
    const { data, key } = this.args;

    return ((get(data, key) as string) ?? '').toString();
  }

  @action updateValue(event: Event): void {
    const { key, onUpdate } = this.args;
    const { value } = event.target as HTMLInputElement;

    onUpdate({ key, value });
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Ui::Form::Input': typeof UiFormInput;
    'ui/form/input': typeof UiFormInput;
  }
}
