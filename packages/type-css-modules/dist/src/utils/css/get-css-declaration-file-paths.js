export function getCssDeclarationFilePaths(options) {
    const { src } = options;
    return src.map((directory) => `${directory}/**/*.css.d.ts`);
}
