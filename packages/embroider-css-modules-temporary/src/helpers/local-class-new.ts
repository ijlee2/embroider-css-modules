import { deprecate } from '@ember/debug';

import LocalHelper from './local.ts';

deprecate(
  'The {{local-class-new}} helper has been renamed to {{local}}. Please update the helper name in your template.',
  false,
  {
    for: 'embroider-css-modules-temporary',
    id: 'embroider-css-modules-temporary.rename-local-class-helper',
    since: {
      available: '1.1.0',
      enabled: '2.0.0',
    },
    until: '2.0.0',
    url: 'https://github.com/ijlee2/embroider-css-modules/tree/1.0.0/packages/embroider-css-modules-temporary#api',
  },
);

export default LocalHelper;
