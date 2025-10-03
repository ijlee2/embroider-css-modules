import { hash } from '@ember/helper';
import { LinkTo } from '@ember/routing';
import { ContainerQuery, width } from 'ember-container-query';
import ProductsProductImage from 'my-v1-app/components/products/product/image';

import Component from '@glimmer/component';

import type { Product } from '../../../data/products';
import styles from './card.css';

interface ProductsProductCardSignature {
  Args: {
    product: Product;
    redirectTo?: string;
  };
}

export default class ProductsProductCardComponent extends Component<ProductsProductCardSignature> {
  styles = styles;

  <template>
    <ContainerQuery
      @features={{hash wide=(width min=320)}}
      @tagName="article"
      class={{this.styles.container}}
      data-test-product-card
    >
      <header class={{this.styles.header}}>
        <h2 class={{this.styles.name}} data-test-field="Name">
          {{@product.name}}
        </h2>
      </header>

      <div class={{this.styles.image-container}}>
        <ProductsProductImage @src={{@product.imageUrl}} />
      </div>

      <div class={{this.styles.body}}>
        <p
          class={{this.styles.description}}
          data-test-field="Short Description"
        >
          {{@product.shortDescription}}
        </p>

        <p class={{this.styles.price}} data-test-field="Price">
          \${{@product.price}}
        </p>
      </div>

      <div class={{this.styles.actions}}>
        <LinkTo
          @model={{@product.id}}
          @route={{@redirectTo}}
          class={{this.styles.link}}
          data-test-link="Learn More"
        >
          Learn more
        </LinkTo>
      </div>
    </ContainerQuery>
  </template>
}
