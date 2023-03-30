import { convertFixtureToJson } from '../../helpers/testing.js';

const inputProject = convertFixtureToJson('ember-app-flat/input');
const outputProject = convertFixtureToJson('ember-app-flat/output');

export { inputProject, outputProject };
