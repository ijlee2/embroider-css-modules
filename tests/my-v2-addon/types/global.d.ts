// Types for compiled templates
declare module 'test-app-for-my-v2-addon/templates/*' {
  import type { TemplateFactory } from 'ember-cli-htmlbars';

  const tmpl: TemplateFactory;
  export default tmpl;
}
