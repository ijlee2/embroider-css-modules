import { isTesting, macroCondition } from '@embroider/macros';
import Component from '@glimmer/component';

interface ProductsProductImageSignature {
  Args: {
    src: string;
  };
}

export default class ProductsProductImage extends Component<ProductsProductImageSignature> {
  isTesting = macroCondition(isTesting()) ? true : false;
}
