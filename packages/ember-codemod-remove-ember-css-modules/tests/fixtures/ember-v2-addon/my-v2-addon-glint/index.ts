import { convertFixtureToJson } from '@codemod-utils/tests';

const inputProject = convertFixtureToJson('ember-v2-addon/my-v2-addon-glint/input');
const outputProject = convertFixtureToJson('ember-v2-addon/my-v2-addon-glint/output');

export { inputProject, outputProject };
