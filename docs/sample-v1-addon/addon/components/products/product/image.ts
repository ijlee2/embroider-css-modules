import { isTesting } from '@embroider/macros';
import Component from '@glimmer/component';

// import styles from './image.css';

interface ProductsProductImageSignature {
  Args: {
    src: string;
  };
}

export default class ProductsProductImageComponent extends Component<ProductsProductImageSignature> {
  // styles = styles;

  get isTestEnvironment(): boolean {
    return isTesting();
  }
}
