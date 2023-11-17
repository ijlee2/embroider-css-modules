/* TODO: Import styles from the stylesheet */
import { styles } from 'my-v1-addon/components/products/product/card';

type LocalClassName = keyof typeof styles;

export function getClassForProductsProductCard(
  localClassName: LocalClassName,
): string {
  return styles[localClassName];
}
