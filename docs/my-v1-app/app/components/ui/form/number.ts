import { action, get } from '@ember/object';
import Component from '@glimmer/component';
import { generateErrorMessage } from 'my-v1-app/utils/components/ui/form';

interface UiFormNumberSignature {
  Args: {
    data: Record<string, unknown>;
    isDisabled?: boolean;
    isReadOnly?: boolean;
    isRequired?: boolean;
    isWide?: boolean;
    key: string;
    label: string;
    maxValue?: number;
    minValue?: number;
    onUpdate: ({ key, value }: { key: string; value: unknown }) => void;
    placeholder?: string;
    step?: number | 'any';
    type?: string;
  };
}

export default class UiFormNumber extends Component<UiFormNumberSignature> {
  get errorMessage(): string | undefined {
    const { isRequired } = this.args;

    return generateErrorMessage({
      isRequired,
      value: this.value,
      valueType: 'number',
    });
  }

  get value(): string {
    const { data, key } = this.args;

    return ((get(data, key) as string) ?? '').toString();
  }

  @action updateValue(event: Event): void {
    const { key, onUpdate } = this.args;
    const isValid = (event.target as HTMLInputElement).checkValidity();

    if (!isValid) {
      onUpdate({ key, value: undefined });
      return;
    }

    const { value } = event.target as HTMLInputElement;
    const valueAsNumber = Number.parseFloat(value);

    onUpdate({ key, value: valueAsNumber });
  }
}
