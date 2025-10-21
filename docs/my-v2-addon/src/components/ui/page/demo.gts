import type { TOC } from '@ember/component/template-only';

import styles from './demo.module.css';

interface UiPageDemoSignature {
  Blocks: {
    default: [];
  };
}

const UiPageDemo: TOC<UiPageDemoSignature> = <template>
  <div class={{styles.demo}}>
    {{yield}}
  </div>
</template>;

export default UiPageDemo;
