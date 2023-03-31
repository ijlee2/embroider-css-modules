import Component from '@glimmer/component';
import config from 'docs-app/config/environment';

import styles from './image.css';

interface ProductsProductImageComponentSignature {
  Args: {
    src: string;
  };
}

export default class ProductsProductImageComponent extends Component<ProductsProductImageComponentSignature> {
  get isTestEnvironment() {
    return config.environment === 'test';
  }

  <template>
    {{#if this.isTestEnvironment}}
      <div class={{styles.placeholder-image}}></div>

    {{else}}
      <img
        alt=""
        class={{styles.image}}
        role="presentation"
        src={{@src}}
      />

    {{/if}}
  </template>
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Products::Product::Image': typeof ProductsProductImageComponent;
  }
}
