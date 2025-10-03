import { isTesting, macroCondition } from '@embroider/macros';
import Component from '@glimmer/component';

import styles from './image.css';

interface ProductsProductImageSignature {
  Args: {
    src: string;
  };
}

export default class ProductsProductImageComponent extends Component<ProductsProductImageSignature> {
  isTestEnvironment = macroCondition(isTesting()) ? true : false;

  styles = styles;

  <template>
    {{#if this.isTestEnvironment}}
      <div class={{this.styles.placeholder-image}}></div>

    {{else}}
      <img alt="" class={{this.styles.image}} src={{@src}} />

    {{/if}}
  </template>
}
