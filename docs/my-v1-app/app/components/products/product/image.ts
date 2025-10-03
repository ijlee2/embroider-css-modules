import { isTesting, macroCondition } from '@embroider/macros';
import Component from '@glimmer/component';

import styles from './image.css';

interface ProductsProductImageSignature {
  Args: {
    src: string;
  };
}

export default class ProductsProductImageComponent extends Component<ProductsProductImageSignature> {
  isTestEnvironment = macroCondition(isTesting()) ? true : false;

  styles = styles;
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Products::Product::Image': typeof ProductsProductImageComponent;
  }
}
