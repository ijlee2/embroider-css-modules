import type { CodemodOptions, Options } from '../../../src/types/index.js';

const codemodOptions: CodemodOptions = {
  projectRoot: 'tmp/my-v1-app',
  src: 'app/assets/app.css',
};

const options: Options = {
  projectRoot: 'tmp/my-v1-app',
  src: 'app/assets/app.css',
};

export { codemodOptions, options };
