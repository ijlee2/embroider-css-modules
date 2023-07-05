import { s as styleInject, _ as _defineProperty } from '../../../style-inject.es-15b45093.js';
import { setComponentTemplate } from '@ember/component';
import { precompileTemplate } from '@ember/template-compilation';
import Component from '@glimmer/component';

var TEMPLATE = precompileTemplate("{{#let (unique-id) as |sectionId|}}\n  <section\n    aria-labelledby={{sectionId}}\n    class={{this.styles.section}}\n  >\n    <h2\n      class={{this.styles.title}}\n      data-test-section-title\n      id={{sectionId}}\n    >\n      {{yield to=\"title\"}}\n    </h2>\n\n    <div data-test-section-content>\n      {{yield to=\"content\"}}\n    </div>\n  </section>\n{{/let}}");

var css_248z = ".sample-v2-addon__k1wXn {\n  margin-bottom: 2.25rem;\n}\n\n.sample-v2-addon__k1wXn:last-of-type {\n  margin-bottom: 0;\n}\n\n.sample-v2-addon__8B5o- {\n  font-size: 1.5rem;\n  font-weight: 700;\n  margin-bottom: 1rem;\n}\n";
var styles = {"section":"sample-v2-addon__k1wXn","title":"sample-v2-addon__8B5o-"};
styleInject(css_248z);

class UiPageSectionComponent extends Component {
  constructor(...args) {
    super(...args);
    _defineProperty(this, "styles", styles);
  }
}
setComponentTemplate(TEMPLATE, UiPageSectionComponent);

export { UiPageSectionComponent as default };
//# sourceMappingURL=section.js.map
