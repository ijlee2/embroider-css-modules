import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import type { Product } from 'my-v1-app/data/products';
import type { Model } from 'my-v1-app/routes/products';

type SupportedKey = 'name';

export default class ProductsController extends Controller {
  declare model: Model;

  @tracked name: string | null = null;

  get filteredProducts(): Product[] {
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

  get isPartOfNestProductDetailsExperiment(): boolean {
    return true;
  }

  @action noOp({ key, value }: { key: string; value: any }): void {
    if (value === undefined || value === '') {
      this[key as SupportedKey] = null;

      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    this[key as SupportedKey] = value;
  }
}
