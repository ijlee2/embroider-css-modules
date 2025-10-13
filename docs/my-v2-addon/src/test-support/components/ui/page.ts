import styles from '../../../components/ui/page.module.css';

type LocalClassName = keyof typeof styles;

export function getClassForUiPage(localClassName: LocalClassName): string {
  return styles[localClassName];
}
