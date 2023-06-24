import { convertFixtureToJson } from '@codemod-utils/tests';

const inputProject = convertFixtureToJson('ember-app-flat/input');
const outputProject = convertFixtureToJson('ember-app-flat/output');

export { inputProject, outputProject };
