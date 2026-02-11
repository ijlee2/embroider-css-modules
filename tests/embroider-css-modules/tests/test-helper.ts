import { setApplication } from '@ember/test-helpers';
import { setupEmberOnerrorValidation, start as qunitStart } from 'ember-qunit';
import QUnit from 'qunit';
import { setup } from 'qunit-dom';
import Application from 'test-app-for-embroider-css-modules/app';
import config from 'test-app-for-embroider-css-modules/config/environment';

export function start(): void {
  setApplication(Application.create(config.APP));

  setup(QUnit.assert);
  setupEmberOnerrorValidation();
  qunitStart();
}
