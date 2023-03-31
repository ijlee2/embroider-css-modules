import { LinkTo } from '@ember/routing';
import Component from '@glimmer/component';
import { localClass } from 'embroider-css-modules';

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
  <template>
    <nav aria-label={{@name}} data-test-nav={{@name}}>
      <ul class={{styles.list}}>
        {{#each @menuItems as |menuItem|}}
          <li>
            <LinkTo
              @route={{menuItem.route}}
              class={{localClass styles "link"}}
              data-test-link={{menuItem.label}}
            >
              {{menuItem.label}}
            </LinkTo>
          </li>
        {{/each}}
      </ul>
    </nav>
  </template>
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    NavigationMenu: typeof NavigationMenuComponent;
  }
}
