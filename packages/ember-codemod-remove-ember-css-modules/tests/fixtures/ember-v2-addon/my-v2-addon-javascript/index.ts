import { convertFixtureToJson } from '@codemod-utils/tests';

const inputProject = convertFixtureToJson('ember-v2-addon/my-v2-addon-javascript/input');
const outputProject = convertFixtureToJson('ember-v2-addon/my-v2-addon-javascript/output');

export { inputProject, outputProject };
