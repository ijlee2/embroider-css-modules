import Component from '@glimmer/component';

import styles from './index.css';

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

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    NavigationMenu: typeof NavigationMenuComponent;
  }
}
