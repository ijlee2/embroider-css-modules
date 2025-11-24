import type { TOC } from '@ember/component/template-only';

interface UiPageDemoSignature {
  Blocks: {
    default: [];
  };
}

const UiPageDemo: TOC<UiPageDemoSignature> = <template>
  <div class="components-ui-page-demo__demo">
    {{yield}}
  </div>
</template>;

export default UiPageDemo;
