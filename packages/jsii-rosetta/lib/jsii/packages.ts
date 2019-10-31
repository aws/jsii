

/**
 * Resolve a package name in an example to a JSII assembly
 *
 * We assume we've changed directory to the directory where we need to resolve from.
 */
export function resolvePackage(packageName: string) {
  try {
    const resolved = require.resolve(`${packageName}/package.json`, { paths: [process.cwd()] });
    return require(resolved);
  } catch(e) {
    return undefined;
  }
}

export function jsiiTargetParam(packageName: string, field: string) {
  const pkgJson = resolvePackage(packageName);

  const path = ['jsii', 'targets', ...field.split('.')];
  let r = pkgJson;
  while (path.length > 0 && typeof r === 'object' && r !== null) {
    r = r[path.splice(0, 1)[0]];
  }
  return r;
}