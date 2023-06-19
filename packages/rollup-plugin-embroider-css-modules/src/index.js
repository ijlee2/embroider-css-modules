import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

import { processCssModules } from './utils.js';

function getCssDeclarationFile(declarationFilePath) {
  if (!existsSync(declarationFilePath)) {
    return;
  }

  return readFileSync(declarationFilePath, 'utf8');
}

export default function createPlugin() {
  const cssFileMap = new Map();
  const cssDeclarationFileMap = new Map();

  return {
    name: 'embroider-css-modules',

    /*
      Build hooks
    */
    transform: async (file, filePath) => {
      if (!filePath.endsWith('.css')) {
        return;
      }

      const { code, cssFile, map } = await processCssModules({
        file,
        filePath,
      });

      cssFileMap.set(
        filePath.replace(
          join(process.cwd(), 'src'),
          join(process.cwd(), 'dist'),
        ),
        cssFile,
      );

      const declarationFilePath = `${filePath}.d.ts`;
      const declarationFile = getCssDeclarationFile(declarationFilePath);

      cssDeclarationFileMap.set(
        declarationFilePath.replace(
          join(process.cwd(), 'src'),
          join(process.cwd(), 'dist'),
        ),
        declarationFile,
      );

      return { code, map };
    },

    /*
      Output generation hooks
    */
    generateBundle: async function (options, bundle) {
      // const outputDir = options.dir;

      for (const [filePath, file] of cssFileMap) {
        const directory = dirname(filePath);

        if (!existsSync(directory)) {
          mkdirSync(directory, { recursive: true });
        }

        writeFileSync(filePath, file, 'utf8');
      }

      for (const [filePath, file] of cssDeclarationFileMap) {
        const directory = dirname(filePath);

        if (!existsSync(directory)) {
          mkdirSync(directory, { recursive: true });
        }

        writeFileSync(filePath, file, 'utf8');
      }
    },
  };
}
