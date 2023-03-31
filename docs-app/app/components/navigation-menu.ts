import Component from '@glimmer/component';

import styles from './navigation-menu.css';

type MenuItem = {
  label: string;
  route: string;
};

interface NavigationMenuComponentSignature {
  Args: {
    menuItems: Array<MenuItem>;
    name?: string;
  };
}

export default class NavigationMenuComponent extends Component<NavigationMenuComponentSignature> {
  styles = styles;
}
