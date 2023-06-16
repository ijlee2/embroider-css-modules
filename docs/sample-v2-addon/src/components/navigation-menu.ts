import Component from '@glimmer/component';

import styles from './navigation-menu.module.css';

type MenuItem = {
  label: string;
  route: string;
};

interface NavigationMenuSignature {
  Args: {
    menuItems: MenuItem[];
    name?: string;
  };
}

export default class NavigationMenuComponent extends Component<NavigationMenuSignature> {
  styles = styles;
}
