import { s as styleInject, _ as _defineProperty } from '../../../style-inject.es-15b45093.js';
import { setComponentTemplate } from '@ember/component';
import { precompileTemplate } from '@ember/template-compilation';
import Component from '@glimmer/component';

var TEMPLATE = precompileTemplate("{{#let (unique-id) as |subsectionId|}}\n  <section\n    aria-labelledby={{subsectionId}}\n    class={{this.styles.subsection}}\n  >\n    <h3\n      class={{this.styles.title}}\n      data-test-subsection-title\n      id={{subsectionId}}\n    >\n      {{yield to=\"title\"}}\n    </h3>\n\n    <div data-test-subsection-content>\n      {{yield to=\"content\"}}\n    </div>\n  </section>\n{{/let}}");

var css_248z = ".sample-v2-addon__vqpZY {\n  margin-bottom: 1.5rem;\n}\n\n.sample-v2-addon__vqpZY:last-of-type {\n  margin-bottom: 0;\n}\n\n.sample-v2-addon__gSNmT {\n  font-size: 1.25rem;\n  font-weight: 700;\n  margin-bottom: 0.75rem;\n}\n";
var styles = {"subsection":"sample-v2-addon__vqpZY","title":"sample-v2-addon__gSNmT"};
styleInject(css_248z);

class UiPageSubsectionComponent extends Component {
  constructor(...args) {
    super(...args);
    _defineProperty(this, "styles", styles);
  }
}
setComponentTemplate(TEMPLATE, UiPageSubsectionComponent);

export { UiPageSubsectionComponent as default };
//# sourceMappingURL=subsection.js.map
