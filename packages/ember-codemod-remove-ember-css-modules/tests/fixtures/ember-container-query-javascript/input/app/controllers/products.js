import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ProductsController extends Controller {
  @tracked name = null;

  get isPartOfNestProductDetailsExperiment() {
    return true;
  }

  get filteredProducts() {
    const { model: products, name } = this;

    if (!name) {
      return products;
    }

    const target = name.toLowerCase();

    return products.filter((product) => {
      const productName = (product.name ?? '').toLowerCase();

      return productName.includes(target);
    });
  }

  @action noOp({ key, value }) {
    if (value === undefined || value === '') {
      this[key] = null;

      return;
    }

    this[key] = value;
  }
}
