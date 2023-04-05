const codemodOptions = {
  componentStructure: 'flat',
  projectRoot: 'tmp/ember-container-query-glint',
};

const context = {
  components: new Map([
    ['navigation-menu', new Set(['.css', '.hbs'])],
    ['products/product/card', new Set(['.css', '.hbs', '.ts'])],
    ['products/product/image', new Set(['.css', '.hbs', '.ts'])],
    ['tracks', new Set(['.hbs', '.ts'])],
    ['tracks/list', new Set(['.css', '.hbs', '.ts'])],
    ['tracks/table', new Set(['.css', '.hbs', '.ts'])],
    ['ui/form', new Set(['.css', '.hbs', '.ts'])],
    ['ui/form/checkbox', new Set(['.css', '.hbs', '.ts'])],
    ['ui/form/field', new Set(['.css', '.hbs', '.ts'])],
    ['ui/form/information', new Set(['.css', '.hbs'])],
    ['ui/form/input', new Set(['.css', '.hbs', '.ts'])],
    ['ui/form/textarea', new Set(['.css', '.hbs', '.ts'])],
    ['ui/page', new Set(['.css', '.hbs', '.ts'])],
    ['widgets/widget-1', new Set(['.css', '.hbs'])],
    ['widgets/widget-1/item', new Set(['.css', '.hbs', '.ts'])],
    ['widgets/widget-2', new Set(['.css', '.hbs', '.ts'])],
    ['widgets/widget-2/captions', new Set(['.css', '.hbs', '.ts'])],
    ['widgets/widget-2/stacked-chart', new Set(['.css', '.hbs', '.ts'])],
    ['widgets/widget-3', new Set(['.css', '.hbs', '.ts'])],
    ['widgets/widget-3/tour-schedule', new Set(['.css', '.hbs', '.ts'])],
    [
      'widgets/widget-3/tour-schedule/responsive-image',
      new Set(['.css', '.hbs', '.ts']),
    ],
    ['widgets/widget-4', new Set(['.css', '.hbs'])],
    ['widgets/widget-4/memo', new Set(['.css', '.hbs'])],
    ['widgets/widget-4/memo/actions', new Set(['.css', '.hbs', '.ts'])],
    ['widgets/widget-4/memo/body', new Set(['.css', '.hbs', '.ts'])],
    ['widgets/widget-4/memo/header', new Set(['.css', '.hbs', '.ts'])],
    ['widgets/widget-5', new Set(['.css', '.hbs'])],
  ]),
  routes: new Map([
    ['album', new Set(['.css', '.hbs', '.ts'])],
    ['application', new Set(['.css', '.hbs'])],
    ['dashboard', new Set(['.css', '.hbs'])],
    ['form', new Set(['.css', '.hbs'])],
    ['index', new Set(['.css', '.hbs'])],
    ['not-found', new Set(['.css', '.hbs'])],
    ['products', new Set(['.css', '.hbs', '.ts'])],
  ]),
};

const options = {
  __styles__: 'styles',
  componentStructure: 'flat',
  project: {
    dependencies: new Map([
      ['@ember/optional-features', '^2.0.0'],
      ['@ember/string', '^3.0.1'],
      ['@ember/test-helpers', '^2.9.3'],
      ['@embroider/compat', '^2.1.1'],
      ['@embroider/core', '^2.1.1'],
      ['@embroider/router', '^2.0.0'],
      ['@embroider/webpack', '^2.1.1'],
      ['@gavant/glint-template-types', '^0.3.3'],
      ['@glimmer/component', '^1.1.2'],
      ['@glimmer/tracking', '^1.1.2'],
      ['@glint/core', '^v1.0.0-beta.4'],
      ['@glint/environment-ember-loose', '^v1.0.0-beta.4'],
      ['@glint/template', '^v1.0.0-beta.4'],
      ['@percy/cli', '^1.21.0'],
      ['@percy/ember', '^4.2.0'],
      ['@tsconfig/ember', '^2.0.0'],
      ['@types/qunit', '^2.19.4'],
      ['@typescript-eslint/eslint-plugin', '^5.57.1'],
      ['@typescript-eslint/parser', '^5.57.1'],
      ['broccoli-asset-rev', '^3.0.0'],
      ['concurrently', '^8.0.1'],
      ['d3-array', '^3.2.3'],
      ['d3-axis', '^3.0.0'],
      ['d3-scale', '^4.0.2'],
      ['d3-selection', '^3.0.0'],
      ['d3-shape', '^3.2.0'],
      ['ember-a11y-refocus', '^3.0.2'],
      ['ember-a11y-testing', '^5.2.0'],
      ['ember-auto-import', '^2.6.1'],
      ['ember-cli', '~4.11.0'],
      ['ember-cli-babel', '^7.26.11'],
      ['ember-cli-dependency-checker', '^3.3.1'],
      ['ember-cli-dependency-lint', '^2.0.1'],
      ['ember-cli-htmlbars', '^6.2.0'],
      ['ember-cli-inject-live-reload', '^2.1.0'],
      ['ember-cli-netlify', '^0.4.1'],
      ['ember-container-query', '4.0.0-alpha.5'],
      ['ember-css-modules', '^2.0.1'],
      ['ember-load-initializers', '^2.1.2'],
      ['ember-modifier', '^4.1.0'],
      ['ember-page-title', '^7.0.0'],
      ['ember-qunit', '^6.2.0'],
      ['ember-resolver', '^10.0.0'],
      ['ember-source', '~4.11.0'],
      ['ember-source-channel-url', '^3.0.0'],
      ['ember-svg-jar', '^2.4.2'],
      ['ember-template-lint', '^5.7.2'],
      ['ember-template-lint-plugin-prettier', '^4.1.0'],
      ['ember-test-selectors', '^6.0.0'],
      ['ember-truth-helpers', '^3.1.1'],
      ['eslint', '^8.37.0'],
      ['eslint-config-prettier', '^8.8.0'],
      ['eslint-plugin-ember', '^11.4.9'],
      ['eslint-plugin-n', '^15.7.0'],
      ['eslint-plugin-prettier', '^4.2.1'],
      ['eslint-plugin-qunit', '^7.3.4'],
      ['eslint-plugin-simple-import-sort', '^10.0.0'],
      ['eslint-plugin-typescript-sort-keys', '^2.3.0'],
      ['loader.js', '^4.7.0'],
      ['prettier', '^2.8.7'],
      ['qunit', '^2.19.4'],
      ['qunit-dom', '^2.0.0'],
      ['stylelint', '^15.4.0'],
      ['stylelint-config-standard', '^32.0.0'],
      ['stylelint-no-unsupported-browser-features', '^6.1.0'],
      ['stylelint-order', '^6.0.3'],
      ['typescript', '^5.0.3'],
      ['webpack', '^5.77.0'],
    ]),
    hasEmberCssModules: true,
    hasGlint: true,
    hasTypeScript: true,
    name: 'docs-app',
    version: '4.0.0-alpha.5',
  },
  projectRoot: 'tmp/ember-container-query-glint',
};

export { codemodOptions, context, options };
