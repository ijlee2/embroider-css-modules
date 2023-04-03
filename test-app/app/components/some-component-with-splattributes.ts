import templateOnlyComponent from '@ember/component/template-only';

interface SomeComponentWithSplattributesComponentSignature {
  Element: HTMLDivElement;
}

const SomeComponentWithSplattributesComponent =
  templateOnlyComponent<SomeComponentWithSplattributesComponentSignature>();

export default SomeComponentWithSplattributesComponent;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    SomeComponentWithSplattributes: typeof SomeComponentWithSplattributesComponent;
    'some-component-with-splattributes': typeof SomeComponentWithSplattributesComponent;
  }
}
