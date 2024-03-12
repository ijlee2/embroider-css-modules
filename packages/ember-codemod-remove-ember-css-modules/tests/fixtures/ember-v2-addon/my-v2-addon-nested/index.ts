import { convertFixtureToJson } from '@codemod-utils/tests';

const inputProject = convertFixtureToJson('ember-v2-addon/my-v2-addon-nested/input');
const outputProject = convertFixtureToJson('ember-v2-addon/my-v2-addon-nested/output');

export { inputProject, outputProject };
