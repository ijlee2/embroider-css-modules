import Component from '@glimmer/component';
import config from 'docs-app/config/environment';

interface ProductsProductImageComponentSignature {
  Args: {
    src: string;
  };
}

export default class ProductsProductImageComponent extends Component<ProductsProductImageComponentSignature> {
  get isTestEnvironment() {
    return config.environment === 'test';
  }
}
