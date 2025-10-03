import type { TOC } from '@ember/component/template-only';

interface SomeComponentWithArgumentsSignature {
  Args: {
    Named: {
      classNames?: string;
    };
  };
  Element: HTMLDivElement;
}

const SomeComponentWithArgumentsComponent = <template>
<div class={{@classNames}} data-test-element>
</div>
</template> satisfies TOC<SomeComponentWithArgumentsSignature>;

export default SomeComponentWithArgumentsComponent;
