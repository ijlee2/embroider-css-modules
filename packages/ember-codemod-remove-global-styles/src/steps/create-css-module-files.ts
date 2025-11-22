import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { findTemplateTags } from '@codemod-utils/ast-template-tag';
import { createFiles, findFiles } from '@codemod-utils/files';

import type { Options, Project, Style } from '../types/index.js';
import {
  getClasses,
  getModuleFilePath,
  printStyles,
} from '../utils/css/index.js';
import { getFile, logErrors } from './create-css-module-files/index.js';

export function createCssModuleFiles(project: Project, options: Options): void {
  const { projectRoot } = options;

  const filePaths = findFiles('app/{components,templates}/**/*.{gjs,gts,hbs}', {
    projectRoot,
  });

  const fileMap = new Map<string, string>();

  filePaths.forEach((filePath) => {
    const file = readFileSync(join(projectRoot, filePath), 'utf8');

    const classes: string[] = [];
    const errors: string[] = [];

    if (filePath.endsWith('.hbs')) {
      const output = getClasses(file);

      classes.push(...output.classes);
      errors.push(...output.errors);
    } else {
      const templateTags = findTemplateTags(file);

      templateTags.forEach(({ contents }) => {
        const output = getClasses(contents);

        classes.push(...output.classes);
        errors.push(...output.errors);
      });
    }

    const classesSet = new Set(classes);

    const localStyles = classes.reduce((accumulator, className) => {
      const styles = project.classToStyles.get(className) ?? [];

      const filteredStyles = styles.filter(({ classes }) => {
        return classes.every((className) => classesSet.has(className));
      });

      accumulator.push(...filteredStyles);

      return accumulator;
    }, [] as Style[]);

    if (localStyles.length === 0) {
      return;
    }

    const cssModuleFilePath = getModuleFilePath(filePath);

    let cssModuleFile = getFile(cssModuleFilePath, options);

    cssModuleFile += `${printStyles(localStyles)}\n`;

    fileMap.set(cssModuleFilePath, cssModuleFile);

    logErrors(errors, { cssModuleFilePath });
  });

  createFiles(fileMap, { projectRoot });
}
