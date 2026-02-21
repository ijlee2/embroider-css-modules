import { findTemplateTags } from '@codemod-utils/ast-template-tag';

import type { ClassToStyles, EntityData, Style } from '../../types/index.js';
import { getClasses } from '../../utils/css/index.js';

type Data = {
  classToStyles: ClassToStyles;
  isHbs: boolean;
};

function getLocalStyles(classes: string[], data: Data): Style[] {
  const classesSet = new Set(classes);

  const localStyles = classes.reduce((accumulator, className) => {
    const styles = data.classToStyles.get(className) ?? [];

    const filteredStyles = styles.filter(({ classes }) => {
      return classes.every((className) => classesSet.has(className));
    });

    accumulator.push(...filteredStyles);

    return accumulator;
  }, [] as Style[]);

  return localStyles;
}

export function getEntityData(file: string, data: Data): EntityData {
  const classes: string[] = [];
  const errors: string[] = [];

  if (data.isHbs) {
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

  return {
    errors,
    localStyles: getLocalStyles(classes, data),
  };
}
