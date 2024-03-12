import { convertFixtureToJson } from '@codemod-utils/tests';

const inputProject = convertFixtureToJson('ember-app/ember-container-query-javascript/input');
const outputProject = convertFixtureToJson('ember-app/ember-container-query-javascript/output');

export { inputProject, outputProject };
