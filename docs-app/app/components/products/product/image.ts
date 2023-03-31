import Component from '@glimmer/component';
import config from 'docs-app/config/environment';

import styles from './image.css';

interface ProductsProductImageComponentSignature {
  Args: {
    src: string;
  };
}

export default class ProductsProductImageComponent extends Component<ProductsProductImageComponentSignature> {
  styles = styles;

  get isTestEnvironment() {
    return config.environment === 'test';
  }
}
