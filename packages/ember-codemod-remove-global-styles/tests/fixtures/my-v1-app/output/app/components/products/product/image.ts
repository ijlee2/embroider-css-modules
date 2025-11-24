import styles from './image.module.css';
import { isTesting, macroCondition } from '@embroider/macros';
import Component from '@glimmer/component';

interface ProductsProductImageSignature {
  Args: {
    src: string;
  };
}

export default class ProductsProductImage extends Component<ProductsProductImageSignature> {
  styles = styles;

  isTestEnvironment = macroCondition(isTesting()) ? true : false;
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Products::Product::Image': typeof ProductsProductImage;
    'products/product/image': typeof ProductsProductImage;
  }
}
