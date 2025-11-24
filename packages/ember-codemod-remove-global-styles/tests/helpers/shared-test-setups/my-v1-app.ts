import type { CodemodOptions, Options } from '../../../src/types/index.js';

const codemodOptions: CodemodOptions = {
  convert: new Set(['components', 'routes']),
  folder: '',
  projectRoot: 'tmp/my-v1-app',
  src: 'app/assets/app.css',
};

const options: Options = {
  convert: {
    components: true,
    routes: true,
  },
  folder: '',
  projectRoot: 'tmp/my-v1-app',
  src: 'app/assets/app.css',
};

export { codemodOptions, options };
