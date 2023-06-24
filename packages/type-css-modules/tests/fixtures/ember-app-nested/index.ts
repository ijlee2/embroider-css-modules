import { convertFixtureToJson } from '@codemod-utils/tests';

const inputProject = convertFixtureToJson('ember-app-nested/input');
const outputProject = convertFixtureToJson('ember-app-nested/output');

export { inputProject, outputProject };
