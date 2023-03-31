import Component from '@glimmer/component';

import type { Product } from '../../../data/products';
import styles from './card.css';

interface ProductsProductCardComponentSignature {
  Args: {
    product: Product;
    redirectTo?: string;
  };
}

export default class ProductsProductCardComponent extends Component<ProductsProductCardComponentSignature> {
  styles = styles;
}
