import templateOnlyComponent from '@ember/component/template-only';

interface SomeComponentWithSplattributesSignature {
  Element: HTMLDivElement;
}

const SomeComponentWithSplattributesComponent =
  templateOnlyComponent<SomeComponentWithSplattributesSignature>();

export default SomeComponentWithSplattributesComponent;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    SomeComponentWithSplattributes: typeof SomeComponentWithSplattributesComponent;
    'some-component-with-splattributes': typeof SomeComponentWithSplattributesComponent;
  }
}
