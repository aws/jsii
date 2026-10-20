/** Names that npm refuses outright (see `validate-npm-package-name`). */
const EXCLUDED_PACKAGE_NAMES = ['node_modules', 'favicon.ico'];

/** An optional `@scope/` followed by a name, neither containing a `/`. */
const SCOPED_PACKAGE_NAME_REGEX = /^(?:@([^/]+?)\/)?([^/]+?)$/;

/**
 * Whether `name` is a valid npm package name, following the rules
 * `validate-npm-package-name` applies to existing packages
 * (`validForOldPackages`). These are looser than the rules for newly published
 * packages: upper-case letters, the characters `~'!()*`, core module names and
 * names longer than 214 characters are all accepted, because packages with such
 * names can still be installed.
 */
export function isValidPackageName(name: unknown): name is string {
  if (typeof name !== 'string' || name.length === 0) {
    return false;
  }
  if (
    name.startsWith('.') ||
    name.startsWith('-') ||
    name.startsWith('_') ||
    name.trim() !== name ||
    EXCLUDED_PACKAGE_NAMES.includes(name.toLowerCase())
  ) {
    return false;
  }
  if (encodeURIComponent(name) === name) {
    return true;
  }

  // Not URL-safe as a whole; this is only acceptable for a scoped name where
  // both the scope and the name are URL-safe on their own.
  const match = SCOPED_PACKAGE_NAME_REGEX.exec(name);
  if (match == null) {
    return false;
  }
  const [, scope, pkg] = match;
  return (
    scope != null &&
    !pkg.startsWith('.') &&
    encodeURIComponent(scope) === scope &&
    encodeURIComponent(pkg) === pkg
  );
}
