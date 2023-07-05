import { s as styleInject, _ as _defineProperty } from '../../../style-inject.es-15b45093.js';
import { setComponentTemplate } from '@ember/component';
import { precompileTemplate } from '@ember/template-compilation';
import Component from '@glimmer/component';

var TEMPLATE = precompileTemplate("<div class={{this.styles.demo}}>\n  {{yield}}\n</div>");

var css_248z = ".sample-v2-addon__elaWL {\n  border: 1px dashed lightsteelblue;\n}\n";
var styles = {"demo":"sample-v2-addon__elaWL"};
styleInject(css_248z);

class UiPageDemoComponent extends Component {
  constructor(...args) {
    super(...args);
    _defineProperty(this, "styles", styles);
  }
}
setComponentTemplate(TEMPLATE, UiPageDemoComponent);

export { UiPageDemoComponent as default };
//# sourceMappingURL=demo.js.map
