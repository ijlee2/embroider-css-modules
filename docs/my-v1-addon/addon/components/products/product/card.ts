import Component from '@glimmer/component';

import type { Product } from '../../../types/product';

/* TODO: Import styles from the stylesheet */
export const styles = {
  actions: 'my-v1-addon-actions',
  body: 'my-v1-addon-body',
  container: 'my-v1-addon-container',
  description: 'my-v1-addon-description',
  header: 'my-v1-addon-header',
  'image-container': 'my-v1-addon-image-container',
  link: 'my-v1-addon-link',
  name: 'my-v1-addon-name',
  price: 'my-v1-addon-price',
};

interface ProductsProductCardSignature {
  Args: {
    product: Product;
    redirectTo?: string;
  };
}

export default class ProductsProductCardComponent extends Component<ProductsProductCardSignature> {
  styles = styles;
}
