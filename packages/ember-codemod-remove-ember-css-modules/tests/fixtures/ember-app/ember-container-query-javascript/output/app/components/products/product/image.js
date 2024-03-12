import Component from '@glimmer/component';
import config from 'docs-app/config/environment';

import styles from './image.css';

export default class ProductsProductImageComponent extends Component {
  styles = styles;

  get isTestEnvironment() {
    return config.environment === 'test';
  }
}
