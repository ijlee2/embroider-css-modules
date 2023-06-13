/* https://github.com/emberjs/ember.js/blob/v4.12.0/blueprints/component-test/index.js#L13-L16 */
import { classify } from '../ember-cli-string-utils/classify.js';

export function doubleColonizeEntityName(entityName: string): string {
  const tokens = entityName.split('/');

  const tokensTransformed = tokens.map(classify);

  return tokensTransformed.join('::');
}
