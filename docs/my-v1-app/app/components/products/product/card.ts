import Component from '@glimmer/component';
import type { Product } from 'my-v1-app/data/products';

function formatPrice(price: number): string {
  return `$${price}`;
}

interface ProductsProductCardSignature {
  Args: {
    product: Product;
    redirectTo?: string;
  };
}

export default class ProductsProductCard extends Component<ProductsProductCardSignature> {
  formatPrice = formatPrice;
}
