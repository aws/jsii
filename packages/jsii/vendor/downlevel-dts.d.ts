/// Hand-written declaration for the downlevel-dts module
declare module 'downlevel-dts' {
  import { SemVer } from 'semver';

  /**
   * Rewrite .d.ts files created by any version of TypeScript so that they work
   * with TypeScript 3.4 or later. It does this by converting code with new
   * features into code that uses equivalent old features.
   *
   * @param src           the directory containing the original .d.ts files
   * @param target        the directory in which to place re-written files
   * @param targetVersion the target TypeScript version compatibility
   */
  export function main(
    src: string,
    target: string,
    targetVersion: string | SemVer,
  ): void;
}
