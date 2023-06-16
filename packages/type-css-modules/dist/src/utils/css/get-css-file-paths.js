export function getCssFilePaths(options) {
    const { src } = options;
    return src.map((directory) => `${directory}/**/*.css`);
}
