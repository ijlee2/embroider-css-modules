import postcss from 'postcss';

import type { ClassToStyles } from '../../types/index.js';
import {
  extractClasses,
  extractRootClass,
  extractSelectors,
} from './get-class-to-styles/index.js';

type Node = {
  [key: string]: unknown;
  clone: () => Node;
  selector: string;
  source: {
    end: {
      column: number;
      line: number;
      offset: number;
    };
    start: {
      column: number;
      line: number;
      offset: number;
    };
  };
  toString: () => string;
};

export function getClassToStyles(file: string): ClassToStyles {
  const classToStyles: ClassToStyles = new Map();

  function processRule(node: Node): void {
    const selectors = extractSelectors(node.selector);
    const clone = node.clone();

    selectors.forEach((selector) => {
      const containerClass = extractRootClass(selector);

      if (containerClass === undefined) {
        return;
      }

      clone.selector = selector;

      const data = {
        classes: extractClasses(selector),
        location: {
          end: node.source.end,
          start: node.source.start,
        },
        raw: clone.toString(),
        selector,
      };

      if (classToStyles.has(containerClass)) {
        classToStyles.get(containerClass)!.push(data);
      } else {
        classToStyles.set(containerClass, [data]);
      }
    });
  }

  const plugins = [
    {
      postcssPlugin: 'postcss-get-class-to-styles',
      prepare() {
        return {
          Rule: processRule,
        };
      },
    },
  ];

  // @ts-expect-error: Incorrect type
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  postcss(plugins).process(file).css;

  return classToStyles;
}
