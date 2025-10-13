import Route from '@ember/routing/route';
import products from 'my-v1-app/data/products';
import type { ModelFrom } from 'my-v1-app/utils/routes';

export default class ProductsRoute extends Route {
  model() {
    return products;
  }
}

export type Model = ModelFrom<ProductsRoute>;
