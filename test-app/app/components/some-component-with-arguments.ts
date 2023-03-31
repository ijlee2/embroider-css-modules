import templateOnlyComponent from '@ember/component/template-only';

interface SomeComponentWithArgumentsComponentSignature {
  Args: {
    Named: {
      classNames?: string;
    };
  };
  Element: HTMLDivElement;
}

const SomeComponentWithArgumentsComponent =
  templateOnlyComponent<SomeComponentWithArgumentsComponentSignature>();

export default SomeComponentWithArgumentsComponent;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    SomeComponentWithArguments: typeof SomeComponentWithArgumentsComponent;
    'some-component-with-arguments': typeof SomeComponentWithArgumentsComponent;
  }
}
