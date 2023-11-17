import { isTesting, macroCondition } from '@embroider/macros';
import Component from '@glimmer/component';

/* TODO: Import styles from the stylesheet */
const styles = {
  image: 'my-v1-addon-image',
  'placeholder-image': 'my-v1-addon-placeholder-image',
};

interface ProductsProductImageSignature {
  Args: {
    src: string;
  };
}

export default class ProductsProductImageComponent extends Component<ProductsProductImageSignature> {
  isTestEnvironment = macroCondition(isTesting()) ? true : false;

  styles = styles;
}
