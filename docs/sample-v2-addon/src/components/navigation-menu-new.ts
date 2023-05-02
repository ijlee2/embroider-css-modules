import Component from '@glimmer/component';

import styles from './navigation-menu-new.css';

type MenuItem = {
  label: string;
  route: string;
};

interface NavigationMenuNewSignature {
  Args: {
    menuItems: MenuItem[];
    name?: string;
  };
}

export default class NavigationMenuNewComponent extends Component<NavigationMenuNewSignature> {
  styles = styles;
}
