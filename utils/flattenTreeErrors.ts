export function flattenTreeErrors(
  tree: any,
  prefix = ""
): Record<string, string> {
  const result: Record<string, string> = {};

  if (tree.errors && tree.errors.length > 0) {
    // This node has direct error messages (attach to prefix if available)
    if (prefix) {
      result[prefix] = tree.errors.join(", ");
    }
  }

  if (tree.properties) {
    for (const key in tree.properties) {
      const child = tree.properties[key];
      const path = prefix ? `${prefix}.${key}` : key;
      Object.assign(result, flattenTreeErrors(child, path));
    }
  }

  return result;
}
