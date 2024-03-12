import Component from '@glimmer/component';

interface UiPageSignature {
  Args: {
    title: string;
  };
  Blocks: {
    default: [];
  };
}

export default class UiPageComponent extends Component<UiPageSignature> {}
