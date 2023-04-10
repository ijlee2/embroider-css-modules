import templateOnlyComponent from '@ember/component/template-only';

interface SomeComponentWithArgumentsSignature {
  Args: {
    Named: {
      classNames?: string;
    };
  };
  Element: HTMLDivElement;
}

const SomeComponentWithArgumentsComponent =
  templateOnlyComponent<SomeComponentWithArgumentsSignature>();

export default SomeComponentWithArgumentsComponent;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    SomeComponentWithArguments: typeof SomeComponentWithArgumentsComponent;
    'some-component-with-arguments': typeof SomeComponentWithArgumentsComponent;
  }
}
