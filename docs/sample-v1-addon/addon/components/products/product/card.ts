import templateOnlyComponent from '@ember/component/template-only';

export type Product = {
  description: string;
  id: string;
  imageUrl: string;
  name: string;
  price: number;
  rating: number;
  seller: string;
  shortDescription: string;
};

interface ProductsProductCardSignature {
  Args: {
    product: Product;
    redirectTo?: string;
  };
}

const ProductsProductCardComponent =
  templateOnlyComponent<ProductsProductCardSignature>();

export default ProductsProductCardComponent;
