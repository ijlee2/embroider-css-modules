import styles from './card.module.css';
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
  styles = styles;

  formatPrice = formatPrice;
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Products::Product::Card': typeof ProductsProductCard;
    'products/product/card': typeof ProductsProductCard;
  }
}
