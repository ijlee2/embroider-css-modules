import Component from '@glimmer/component';
import config from 'docs-app/config/environment';

interface ProductsProductImageSignature {
  Args: {
    src: string;
  };
}

export default class ProductsProductImageComponent extends Component<ProductsProductImageSignature> {
  get isTestEnvironment() {
    return config.environment === 'test';
  }
}
