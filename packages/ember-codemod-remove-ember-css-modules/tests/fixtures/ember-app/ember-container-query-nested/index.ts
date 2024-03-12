import { convertFixtureToJson } from '@codemod-utils/tests';

const inputProject = convertFixtureToJson('ember-app/ember-container-query-nested/input');
const outputProject = convertFixtureToJson('ember-app/ember-container-query-nested/output');

export { inputProject, outputProject };
