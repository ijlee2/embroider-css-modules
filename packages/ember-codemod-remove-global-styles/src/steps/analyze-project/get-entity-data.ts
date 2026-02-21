import { findTemplateTags } from '@codemod-utils/ast-template-tag';

import type { ClassToStyles, EntityData, Style } from '../../types/index.js';
import { getClassNames } from '../../utils/css/index.js';

type Data = {
  classToStyles: ClassToStyles;
  isHbs: boolean;
};

function getLocalStyles(classNames: string[], data: Data): Style[] {
  const uniqueClassNames = new Set(classNames);
  const localStyles: Style[] = [];

  classNames.forEach((className) => {
    const styles = data.classToStyles.get(className);

    if (styles === undefined) {
      return;
    }

    const filteredStyles = styles.filter(({ classNames }) => {
      return classNames.every((className) => uniqueClassNames.has(className));
    });

    localStyles.push(...filteredStyles);
  });

  return localStyles;
}

export function getEntityData(file: string, data: Data): EntityData {
  const allClassNames: string[] = [];
  const allErrors: string[] = [];

  function processFile(file: string): void {
    const { classNames, errors } = getClassNames(file);

    allClassNames.push(...classNames);
    allErrors.push(...errors);
  }

  if (data.isHbs) {
    processFile(file);
  } else {
    const templateTags = findTemplateTags(file);

    templateTags.forEach(({ contents }) => {
      processFile(contents);
    });
  }

  return {
    errors: allErrors,
    localStyles: getLocalStyles(allClassNames, data),
  };
}
