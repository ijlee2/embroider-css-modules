import type { TOC } from '@ember/component/template-only';

interface SomeComponentWithSplattributesSignature {
  Element: HTMLDivElement;
}

const SomeComponentWithSplattributesComponent = <template>
<div data-test-element ...attributes>
</div>
</template> satisfies TOC<SomeComponentWithSplattributesSignature>;

export default SomeComponentWithSplattributesComponent;
