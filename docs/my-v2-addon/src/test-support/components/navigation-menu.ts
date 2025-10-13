import styles from '../../components/navigation-menu.module.css';

type LocalClassName = keyof typeof styles;

export function getClassForNavigationMenu(
  localClassName: LocalClassName,
): string {
  return styles[localClassName];
}
