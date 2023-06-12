/* https://github.com/ember-cli/ember-cli-string-utils/blob/v1.1.0/index.js */
import { camelize } from './camelize.js';

export function classify(value: string): string {
  const tokens = value.split('.');

  const tokensTransformed = tokens.map((token) => {
    const camelized = camelize(token);

    return camelized.charAt(0).toUpperCase() + camelized.substring(1);
  });

  return tokensTransformed.join('.');
}
