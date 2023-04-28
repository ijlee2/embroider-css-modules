import { builders, print, transform } from 'ember-template-recast';

function traverseHandlebars(file, visitMethods = {}) {
  const { ast } = transform({
    plugin() {
      return visitMethods;
    },
    template: file,
  });

  return ast;
}

const tools = {
  builders,
  print,
  traverse: traverseHandlebars,
};

export default tools;
