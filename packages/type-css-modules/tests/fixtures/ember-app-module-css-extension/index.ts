import { convertFixtureToJson } from '@codemod-utils/tests';

const inputProject = convertFixtureToJson('ember-app-module-css-extension/input');
const outputProject = convertFixtureToJson('ember-app-module-css-extension/output');

export { inputProject, outputProject };
