import { s as styleInject, _ as _defineProperty } from '../style-inject.es-15b45093.js';
import { setComponentTemplate } from '@ember/component';
import { precompileTemplate } from '@ember/template-compilation';
import Component from '@glimmer/component';

var TEMPLATE = precompileTemplate("<nav aria-label={{@name}} data-test-nav={{@name}}>\n  <ul class={{this.styles.list}}>\n    {{#each @menuItems as |menuItem|}}\n      <li>\n        <LinkTo\n          @route={{menuItem.route}}\n          class={{local-class this.styles \"link\"}}\n          data-test-link={{menuItem.label}}\n        >\n          {{menuItem.label}}\n        </LinkTo>\n      </li>\n    {{/each}}\n  </ul>\n</nav>");

var css_248z = ".sample-v2-addon__coN6v {\n  align-items: center;\n  display: flex;\n}\n\n.sample-v2-addon__ugjOS {\n  display: inline-block;\n  font-size: 0.875rem;\n  padding: 0.875rem 1rem;\n  text-decoration: none;\n  white-space: nowrap;\n}\n\n.sample-v2-addon__ugjOS.active {\n  background-color: #15202d;\n}\n\n.sample-v2-addon__ugjOS:hover {\n  background-color: #26313d;\n  transition: background-color 0.17s;\n}\n";
var styles = {"list":"sample-v2-addon__coN6v","link":"sample-v2-addon__ugjOS"};
styleInject(css_248z);

class NavigationMenuComponent extends Component {
  constructor(...args) {
    super(...args);
    _defineProperty(this, "styles", styles);
  }
}
setComponentTemplate(TEMPLATE, NavigationMenuComponent);

export { NavigationMenuComponent as default };
//# sourceMappingURL=navigation-menu.js.map
