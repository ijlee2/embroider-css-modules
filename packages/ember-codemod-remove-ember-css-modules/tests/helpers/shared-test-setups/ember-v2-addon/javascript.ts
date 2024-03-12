import type {
  CodemodOptions,
  Context,
  Options,
} from '../../../../src/types/index.js';

const codemodOptions: CodemodOptions = {
  componentStructure: 'flat',
  projectRoot: 'tmp/ember-v2-addon/my-v2-addon-javascript',
  projectType: 'v2-addon',
};

const context: Context = {
  components: new Map([]),
  routes: new Map([]),
};

const options: Options = {
  componentStructure: 'flat',
  project: {
    dependencies: new Map([
      ['@embroider/addon-shim', '^1.8.7'],
      ['decorator-transforms', '^1.1.0'],
      ['embroider-css-modules', '^2.0.4'],
      ['@babel/core', '^7.24.0'],
      ['@babel/eslint-parser', '^7.23.10'],
      ['@babel/runtime', '^7.24.0'],
      ['@embroider/addon-dev', '^4.2.1'],
      ['@glimmer/component', '^1.1.2'],
      ['@glimmer/tracking', '^1.1.2'],
      ['@rollup/plugin-babel', '^6.0.4'],
      ['babel-plugin-ember-template-compilation', '^2.2.1'],
      ['concurrently', '^8.2.2'],
      ['ember-template-lint', '^5.13.0'],
      ['eslint', '^8.57.0'],
      ['postcss', '^8.4.35'],
      ['prettier', '^3.2.5'],
      ['rollup', '^4.12.0'],
      ['rollup-plugin-postcss', '^4.0.2'],
      ['stylelint', '^16.2.1'],
    ]),
    hasEmberCssModules: false,
    hasGlint: false,
    hasTypeScript: false,
  },
  projectRoot: 'tmp/ember-v2-addon/my-v2-addon-javascript',
  projectType: 'v2-addon',
};

export { codemodOptions, context, options };
