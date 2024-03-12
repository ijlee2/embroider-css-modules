import type {
  CodemodOptions,
  Context,
  Options,
} from '../../../../src/types/index.js';

const codemodOptions: CodemodOptions = {
  componentStructure: 'nested',
  projectRoot: 'tmp/ember-v2-addon/my-v2-addon-nested',
  projectType: 'v2-addon',
};

const context: Context = {
  components: new Map([]),
  routes: new Map([]),
};

const options: Options = {
  componentStructure: 'nested',
  project: {
    dependencies: new Map([
      ['@embroider/addon-shim', '^1.8.7'],
      ['decorator-transforms', '^1.1.0'],
      ['embroider-css-modules', '^2.0.4'],
      ['@babel/core', '^7.24.0'],
      ['@babel/plugin-transform-typescript', '^7.23.6'],
      ['@babel/runtime', '^7.24.0'],
      ['@embroider/addon-dev', '^4.2.1'],
      ['@glimmer/component', '^1.1.2'],
      ['@glimmer/tracking', '^1.1.2'],
      ['@glint/core', '^1.3.0'],
      ['@glint/environment-ember-loose', '^1.3.0'],
      ['@glint/environment-ember-template-imports', '^1.3.0'],
      ['@glint/template', '^1.3.0'],
      ['@rollup/plugin-babel', '^6.0.4'],
      ['babel-plugin-ember-template-compilation', '^2.2.1'],
      ['concurrently', '^8.2.2'],
      ['ember-template-lint', '^5.13.0'],
      ['ember-source', '^5.7.0'],
      ['eslint', '^8.57.0'],
      ['postcss', '^8.4.35'],
      ['prettier', '^3.2.5'],
      ['rollup', '^4.12.0'],
      ['rollup-plugin-postcss', '^4.0.2'],
      ['stylelint', '^16.2.1'],
      ['type-css-modules', '^1.0.6'],
      ['typescript', '^5.4.2'],
    ]),
    hasEmberCssModules: false,
    hasGlint: true,
    hasTypeScript: true,
  },
  projectRoot: 'tmp/ember-v2-addon/my-v2-addon-nested',
  projectType: 'v2-addon',
};

export { codemodOptions, context, options };
