import type { TOC } from '@ember/component/template-only';
import { hash } from '@ember/helper';
import { LinkTo } from '@ember/routing';
import { ContainerQuery, width } from 'ember-container-query';
import type { Product } from 'my-v1-app/data/products';

import ProductsProductImage from './image';

function formatPrice(price: number): string {
  return `$${price}`;
}

interface ProductsProductCardSignature {
  Args: {
    product: Product;
    redirectTo?: string;
  };
}

const ProductsProductCard: TOC<ProductsProductCardSignature> = <template>
  <ContainerQuery
    @features={{hash wide=(width min=320)}}
    @tagName="article"
    class="components-products-product-card__container"
    data-test-product-card
  >
    <header class="components-products-product-card__header">
      <h2 class="components-products-product-card__name" data-test-field="Name">
        {{@product.name}}
      </h2>
    </header>

    <div class="components-products-product-card__image-container">
      <ProductsProductImage @src={{@product.imageUrl}} />
    </div>

    <div class="components-products-product-card__body">
      <p
        class="components-products-product-card__description"
        data-test-field="Short Description"
      >
        {{@product.shortDescription}}
      </p>

      <p
        class="components-products-product-card__price"
        data-test-field="Price"
      >
        {{formatPrice @product.price}}
      </p>
    </div>

    <div class="components-products-product-card__actions">
      <LinkTo
        @model={{@product.id}}
        @route={{@redirectTo}}
        class="components-products-product-card__link"
        data-test-link="Learn More"
      >
        Learn more
      </LinkTo>
    </div>
  </ContainerQuery>
</template>;

export default ProductsProductCard;
