import type { TOC } from '@ember/component/template-only';
import { isTesting, macroCondition } from '@embroider/macros';

interface ProductsProductImageSignature {
  Args: {
    src: string;
  };
}

const ProductsProductImage: TOC<ProductsProductImageSignature> = macroCondition(
  isTesting(),
)
  ? <template>
      <div class="components-products-product-image__placeholder-image"></div>
    </template>
  : <template>
      <img
        alt=""
        class="components-products-product-image__image"
        src={{@src}}
      />
    </template>;

export default ProductsProductImage;
