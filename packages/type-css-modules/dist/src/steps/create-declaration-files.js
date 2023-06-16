import { createFiles, findFiles, unionize } from '@codemod-utils/files';
import { getClassNames, getCssFilePaths, getDeclarationFile, } from '../utils/css.js';
export function createDeclarationFiles(options) {
    const { projectRoot } = options;
    const files = getCssFilePaths(options);
    const filePaths = findFiles(unionize(files), {
        projectRoot,
    });
    const fileMap = new Map(filePaths.map((filePath) => {
        const tsFilePath = filePath.replace(/\.css$/, '.css.d.ts');
        const classNames = getClassNames(filePath, options);
        const tsFile = getDeclarationFile(classNames);
        return [tsFilePath, tsFile];
    }));
    createFiles(fileMap, options);
}
