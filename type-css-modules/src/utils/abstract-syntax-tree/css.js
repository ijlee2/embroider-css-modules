import postcss from 'postcss';

function print(lazyResult) {
  return lazyResult.css;
}

function traverse(file, visitMethods = {}) {
  const plugins = [
    {
      postcssPlugin: 'Plugin',
      ...visitMethods,
    },
  ];

  const processor = postcss(plugins);
  const lazyResult = processor.process(file);

  return lazyResult;
}

const tools = {
  builders: undefined,
  print,
  traverse,
};

export default tools;
