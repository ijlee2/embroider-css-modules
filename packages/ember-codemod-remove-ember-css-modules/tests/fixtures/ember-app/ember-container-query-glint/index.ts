import { convertFixtureToJson } from '@codemod-utils/tests';

const inputProject = convertFixtureToJson('ember-app/ember-container-query-glint/input');
const outputProject = convertFixtureToJson('ember-app/ember-container-query-glint/output');

export { inputProject, outputProject };
