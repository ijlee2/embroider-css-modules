import { processTemplate } from '../../../../src/utils/blueprints.js';
import { assert, test } from '../../../helpers/testing.js';

test('utils | blueprints | process-template > evaluate', function () {
  const blueprintFile = [
    `import Component from '@glimmer/component';`,
    ``,
    `<% if (options.packages.app.hasTypeScript) { %>export default class NavigationMenuComponent extends Component<NavigationMenuComponentSignature> {}`,
    `<% } else { %>export default class NavigationMenuComponent extends Component {}`,
    `<% } %>`,
  ].join('\n');

  const file = processTemplate(blueprintFile, {
    options: {
      packages: {
        app: {
          hasTypeScript: true,
        },
      },
    },
  });

  const expectedValue = [
    `import Component from '@glimmer/component';`,
    ``,
    `export default class NavigationMenuComponent extends Component<NavigationMenuComponentSignature> {}`,
    ``,
  ].join('\n');

  assert.strictEqual(file, expectedValue);
});
