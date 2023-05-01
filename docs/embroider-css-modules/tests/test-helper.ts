import { setApplication } from '@ember/test-helpers';
import Application from 'docs-app-for-embroider-css-modules/app';
import config from 'docs-app-for-embroider-css-modules/config/environment';
import { start } from 'ember-qunit';
import * as QUnit from 'qunit';
import { setup } from 'qunit-dom';

setApplication(Application.create(config.APP));

setup(QUnit.assert);

start();
