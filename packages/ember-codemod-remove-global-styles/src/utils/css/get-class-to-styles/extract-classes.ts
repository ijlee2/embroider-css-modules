export function extractClasses(selector: string): string[] {
  const matches = Array.from(selector.matchAll(/\.([\w-]+)/g));

  return matches
    .map((results) => results[1]!)
    .map((selector) => selector.trim());
}
