import type ProductsProductCardComponent from './components/products/product/card';
import type ProductsProductImageComponent from './components/products/product/image';

export default interface MyV1AddonRegistry {
  'Products::Product::Card': typeof ProductsProductCardComponent;
  'Products::Product::Image': typeof ProductsProductImageComponent;
}
