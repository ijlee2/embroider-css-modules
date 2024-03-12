import { convertFixtureToJson } from '@codemod-utils/tests';

const inputProject = convertFixtureToJson('ember-app/ember-container-query-typescript/input');
const outputProject = convertFixtureToJson('ember-app/ember-container-query-typescript/output');

export { inputProject, outputProject };
