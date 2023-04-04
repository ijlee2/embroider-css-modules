/* https://github.com/emberjs/ember.js/blob/v4.12.0/blueprints/component/index.js#L255-L256 */
import { classify } from '../ember-cli-string-utils/classify.js';

export function classifyEntityName(entityName) {
  return classify(entityName.replace(/\//g, '-'));
}
