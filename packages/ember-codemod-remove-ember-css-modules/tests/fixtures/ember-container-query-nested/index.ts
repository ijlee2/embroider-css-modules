import { convertFixtureToJson } from '@codemod-utils/tests';

const inputProject = convertFixtureToJson('ember-container-query-nested/input');
const outputProject = convertFixtureToJson('ember-container-query-nested/output');

export { inputProject, outputProject };
