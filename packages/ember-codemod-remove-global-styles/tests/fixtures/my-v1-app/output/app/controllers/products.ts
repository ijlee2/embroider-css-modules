import styles from './products.module.css';
import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import type { Model } from 'my-v1-app/routes/products';

type SupportedKey = 'name';

export default class ProductsController extends Controller {
  styles = styles;

  declare model: Model;

  @tracked name: string | null = null;

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

  get isPartOfNestProductDetailsExperiment() {
    return true;
  }

  @action noOp({ key, value }: { key: string; value: any }) {
    if (value === undefined || value === '') {
      this[key as SupportedKey] = null;

      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    this[key as SupportedKey] = value;
  }
}
