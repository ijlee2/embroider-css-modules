import { processTemplate } from '../../../../src/utils/blueprints.js';
import { assert, test } from '../../../helpers/testing.js';

test('utils | blueprints | process-template > interpolate', function () {
  const blueprintFile = [
    `export default class <%= componentName %>Component extends Component<<%= componentName %>Signature> {}`,
  ].join('\n');

  const file = processTemplate(blueprintFile, {
    componentName: 'NavigationMenu',
  });

  const expectedValue = [
    `export default class NavigationMenuComponent extends Component<NavigationMenuSignature> {}`,
  ].join('\n');

  assert.strictEqual(file, expectedValue);
});
