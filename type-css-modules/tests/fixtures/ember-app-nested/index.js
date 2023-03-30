import { convertFixtureToJson } from '../../helpers/testing.js';

const inputProject = convertFixtureToJson('ember-app-nested/input');
const outputProject = convertFixtureToJson('ember-app-nested/output');

export { inputProject, outputProject };
