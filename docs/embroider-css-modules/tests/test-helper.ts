import { setApplication } from '@ember/test-helpers';
import Application from 'docs-app-for-embroider-css-modules/app';
import config from 'docs-app-for-embroider-css-modules/config/environment';
import { setupEmberOnerrorValidation, start as qunitStart } from 'ember-qunit';
import QUnit from 'qunit';
import { setup } from 'qunit-dom';

export function start(): void {
  setApplication(Application.create(config.APP));
  setup(QUnit.assert);
  setupEmberOnerrorValidation();
  qunitStart();
}
