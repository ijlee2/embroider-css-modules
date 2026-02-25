import type { CodemodOptions, Options } from '../../../src/types/index.js';

const codemodOptions: CodemodOptions = {
  convert: new Set(['components', 'routes']),
  entity: undefined,
  projectRoot: 'tmp/my-v2-app',
  src: 'app/assets/app.css',
};

const options: Options = {
  convert: {
    components: true,
    routes: true,
  },
  entity: undefined,
  projectRoot: 'tmp/my-v2-app',
  src: 'app/assets/app.css',
};

export { codemodOptions, options };
