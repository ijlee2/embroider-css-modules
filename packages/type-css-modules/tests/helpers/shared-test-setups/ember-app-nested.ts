import type { CodemodOptions, Options } from '../../../src/types/index.js';

const codemodOptions: CodemodOptions = {
  projectRoot: 'tmp/ember-app-nested',
  src: ['app/components', 'app/controllers'],
};

const options: Options = {
  projectRoot: 'tmp/ember-app-nested',
  src: ['app/components', 'app/controllers'],
};

export { codemodOptions, options };
