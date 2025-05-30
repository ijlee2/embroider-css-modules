import 'qunit-dom';

import { setApplication } from '@ember/test-helpers';
import Application from 'docs-app/app';
import config from 'docs-app/config/environment';
import { setRunOptions } from 'ember-a11y-testing/test-support';
import { start } from 'ember-qunit';
import QUnit from 'qunit';
import { setup } from 'qunit-dom';

setApplication(Application.create(config.APP));

setup(QUnit.assert);

setRunOptions({
  rules: {
    'scrollable-region-focusable': {
      enabled: false,
    },
  },
});

start();
