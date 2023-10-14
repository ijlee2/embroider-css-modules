import styles from '../../components/navigation-menu.css';

type LocalClassName = keyof typeof styles;

export function getClassForNavigationMenu(
  localClassName: LocalClassName,
): string {
  return styles[localClassName];
}
