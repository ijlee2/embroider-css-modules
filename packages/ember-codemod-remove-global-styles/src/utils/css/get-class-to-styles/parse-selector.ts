import { createParser, render, traverse } from 'css-selector-parser';

const parse = createParser({
  // Allow unknown pseudo-classes
  syntax: 'progressive',
});

export function parseSelector(maybeSelector: string): {
  classes: string[];
  selector: string;
}[] {
  try {
    const { rules } = parse(maybeSelector);

    return rules.map((rule) => {
      const classes: string[] = [];

      traverse(rule, (node) => {
        if (node.type === 'ClassName') {
          classes.push(node.name);
        }
      });

      return {
        classes,
        selector: render(rule),
      };
    });
  } catch {
    return [];
  }
}
