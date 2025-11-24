import { action, get } from '@ember/object';
import Component from '@glimmer/component';
import { generateErrorMessage } from 'my-v1-app/utils/components/ui/form';

interface UiFormCheckboxSignature {
  Args: {
    data: Record<string, unknown>;
    isDisabled?: boolean;
    isInline?: boolean;
    isReadOnly?: boolean;
    isRequired?: boolean;
    isWide?: boolean;
    key: string;
    label: string;
    onUpdate: ({ key, value }: { key: string; value: unknown }) => void;
  };
}

export default class UiFormCheckbox extends Component<UiFormCheckboxSignature> {
  get errorMessage(): string | undefined {
    const { isRequired } = this.args;

    return generateErrorMessage({
      isRequired,
      value: this.isChecked,
      valueType: 'boolean',
    });
  }

  get isChecked(): boolean {
    const { data, key } = this.args;

    return (get(data, key) as boolean) ?? false;
  }

  @action updateValue(): void {
    const { isDisabled, isReadOnly, key, onUpdate } = this.args;

    if (isDisabled || isReadOnly) {
      return;
    }

    const value = !this.isChecked;

    onUpdate({ key, value });
  }

  @action updateValueByPressingSpace(event: KeyboardEvent): void {
    if (event.code === 'Space' || event.key === 'Space') {
      this.updateValue();
    }
  }
}
