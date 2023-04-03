import templateOnlyComponent from '@ember/component/template-only';

import type { Product } from '../../../data/products';

interface ProductsProductCardComponentSignature {
  Args: {
    product: Product;
    redirectTo?: string;
  };
}

const ProductsProductCardComponent =
  templateOnlyComponent<ProductsProductCardComponentSignature>();

export default ProductsProductCardComponent;
