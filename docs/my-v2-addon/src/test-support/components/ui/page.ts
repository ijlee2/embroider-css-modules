import styles from '../../../components/ui/page.css';

type LocalClassName = keyof typeof styles;

export function getClassForUiPage(localClassName: LocalClassName): string {
  return styles[localClassName];
}
