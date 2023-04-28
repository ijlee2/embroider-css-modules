import Component from '@glimmer/component';
import config from 'docs-app/config/environment';

export default class ProductsProductImageComponent extends Component {
  get isTestEnvironment() {
    return config.environment === 'test';
  }
}
