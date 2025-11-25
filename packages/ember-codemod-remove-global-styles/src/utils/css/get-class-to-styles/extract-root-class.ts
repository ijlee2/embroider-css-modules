export function extractRootClass(selector: string): string | undefined {
  const matches = selector.match(/^\.([\w-]+)/);

  if (matches === null) {
    return undefined;
  }

  return matches[1];
}
