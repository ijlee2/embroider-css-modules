import { convertFixtureToJson } from '@codemod-utils/tests';

const inputProject = convertFixtureToJson('ember-v2-addon/my-v2-addon-typescript/input');
const outputProject = convertFixtureToJson('ember-v2-addon/my-v2-addon-typescript/output');

export { inputProject, outputProject };
