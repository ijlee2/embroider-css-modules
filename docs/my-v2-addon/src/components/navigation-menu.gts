import type { TOC } from '@ember/component/template-only';
import { LinkTo } from '@ember/routing';

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

const NavigationMenu: TOC<NavigationMenuSignature> = <template>
  <nav aria-label={{@name}} data-test-nav={{@name}}>
    <ul class="components-navigation-menu__list">
      {{#each @menuItems as |menuItem|}}
        <li>
          <LinkTo
            @route={{menuItem.route}}
            class="components-navigation-menu__link"
            data-test-link={{menuItem.label}}
          >
            {{menuItem.label}}
          </LinkTo>
        </li>
      {{/each}}
    </ul>
  </nav>
</template>;

export default NavigationMenu;
