import { createParser, render, traverse } from 'css-selector-parser';

const parse = createParser({
  // Allow unknown pseudo-classes
  syntax: 'progressive',
});

export function parseSelector(maybeSelector: string): {
  classNames: string[];
  selector: string;
}[] {
  try {
    const { rules } = parse(maybeSelector);

    return rules.map((rule) => {
      const classNames: string[] = [];

      traverse(rule, (node) => {
        if (node.type === 'ClassName') {
          classNames.push(node.name);
        }
      });

      return {
        classNames,
        selector: render(rule),
      };
    });
  } catch {
    return [];
  }
}
