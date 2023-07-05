import { s as styleInject, _ as _defineProperty } from '../../style-inject.es-b06dca24.js';
import { setComponentTemplate } from '@ember/component';
import { precompileTemplate } from '@ember/template-compilation';
import Component from '@glimmer/component';

var TEMPLATE = precompileTemplate("<div class={{this.styles.container}}>\n  <h1 class={{this.styles.title}} data-test-page-title>\n    {{@title}}\n  </h1>\n\n  <div\n    class={{this.styles.content}}\n    data-test-page-content\n    id=\"main-content\"\n    tabindex=\"-1\"\n  >\n    {{yield\n      (hash\n        Demo=(component \"ui/page/demo\")\n        Section=(component \"ui/page/section\")\n        Subsection=(component \"ui/page/subsection\")\n      )\n    }}\n  </div>\n</div>");

var css_248z = ".sample-v2-addon__Ygz9n {\n  display: grid;\n  grid-template-areas:\n    \"title\"\n    \"content\";\n  grid-template-columns: 1fr;\n  grid-template-rows: auto 1fr;\n  height: calc(100% - 3rem);\n  overflow-y: auto;\n  padding: 1.5rem 1rem;\n  scrollbar-gutter: stable;\n}\n\n.sample-v2-addon__R6j2S {\n  font-size: 2.25rem;\n  font-weight: 700;\n  grid-area: title;\n  margin-bottom: 1.5rem;\n}\n\n.sample-v2-addon__qovF3 {\n  grid-area: content;\n}\n\n.sample-v2-addon__qovF3 code {\n  font-weight: 300;\n}\n";
var styles = setComponentTemplate(TEMPLATE, {
  "container": "sample-v2-addon__Ygz9n",
  "title": "sample-v2-addon__R6j2S",
  "content": "sample-v2-addon__qovF3"
});
styleInject(css_248z);

class UiPageComponent extends Component {
  constructor(...args) {
    super(...args);
    _defineProperty(this, "styles", styles);
  }
}
setComponentTemplate(TEMPLATE, UiPageComponent);

export { UiPageComponent as default };
//# sourceMappingURL=page.js.map
