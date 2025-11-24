import { action, get } from '@ember/object';
import Component from '@glimmer/component';
import { generateErrorMessage } from 'my-v1-app/utils/components/ui/form';

interface UiFormTextareaSignature {
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
  };
}

export default class UiFormTextarea extends Component<UiFormTextareaSignature> {
  get errorMessage(): string | undefined {
    const { isRequired } = this.args;

    return generateErrorMessage({
      isRequired,
      value: this.value,
      valueType: 'string',
    });
  }

  get value(): string {
    const { data, key } = this.args;

    return ((get(data, key) as string) ?? '').toString();
  }

  @action updateValue(event: Event): void {
    const { key, onUpdate } = this.args;
    const { value } = event.target as HTMLTextAreaElement;

    onUpdate({ key, value });
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Ui::Form::Textarea': typeof UiFormTextarea;
    'ui/form/textarea': typeof UiFormTextarea;
  }
}
