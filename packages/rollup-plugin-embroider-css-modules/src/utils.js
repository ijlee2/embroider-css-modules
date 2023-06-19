import { createRequire } from 'node:module';

import postcss from 'postcss';
import postcssModules from 'postcss-modules';
import { identifier } from 'safe-identifier';

const require = createRequire(import.meta.url);

const styleInjectPath = require
  .resolve('style-inject/dist/style-inject.es')
  .replace(/[\\/]+/g, '/');

export async function processCssModules({ file, filePath }) {
  const modulesExported = {};

  const plugins = [
    postcssModules({
      generateScopedName: 'sample-v2-addon__[sha512:hash:base64:5]',
      getJSON: (filepath, json) => {
        modulesExported[filepath] = json;
      },
    }),
  ];

  const processResult = await postcss(plugins).process(file, {
    from: filePath,
    to: filePath,
  });

  const cssVariableName = identifier('css', true);

  const code = [
    `import styleInject from '${styleInjectPath}';`,
    `var ${cssVariableName} = ${JSON.stringify(processResult.css)};`,
    `export default ${JSON.stringify(modulesExported[filePath])};`,
    `styleInject(${cssVariableName});`,
  ].join('\n');

  const outputMap =
    processResult.map && JSON.parse(processResult.map.toString());

  // TODO: Remove?
  if (outputMap?.sources) {
    outputMap.sources = outputMap.sources.map((path) => {
      return path && path.replace(/\\+/g, '/');
    });
  }

  return {
    code,
    cssFile: processResult.css,
    map: outputMap ?? null,
  };
}
