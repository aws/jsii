/// Hand-written declaration for the semver-intersect module
declare module 'semver-intersect' {
  /**
   * Computes the intersection between multiple semver ranges.
   *
   * @param ranges the ranges for which the intersection is requested.
   *
   * @returns the intersection of `ranges`.
   *
   * @throws Error if the intersection is empty.
   */
  function intersect(...ranges: string[]): string;
}
