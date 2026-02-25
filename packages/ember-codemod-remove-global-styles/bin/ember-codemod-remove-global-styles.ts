#!/usr/bin/env node
'use strict';

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { runCodemod } from '../src/index.js';
import type { CodemodOptions } from '../src/types/index.js';

// Provide a title to the process in `ps`
process.title = 'ember-codemod-remove-global-styles';

// Set codemod options
const argv = yargs(hideBin(process.argv))
  .option('convert', {
    choices: ['components', 'routes'] as const,
    describe: 'Which type of files to consider',
    type: 'array',
  })
  .option('entity', {
    describe: 'Which entity to consider',
    type: 'string',
  })
  .option('root', {
    describe: 'Where to run the codemod',
    type: 'string',
  })
  .option('src', {
    demandOption: true,
    describe: 'Location of the global stylesheet (e.g. app/assets/app.css)',
    type: 'string',
  })
  .parseSync();

const DEFAULT_FOR_CONVERT = ['components', 'routes'] as const;

const codemodOptions: CodemodOptions = {
  convert: new Set(argv['convert'] ?? DEFAULT_FOR_CONVERT),
  entity: argv['entity'],
  projectRoot: argv['root'] ?? process.cwd(),
  src: argv['src'],
};

runCodemod(codemodOptions);
