import * as assert from 'assert';

export enum TargetLanguage {
  /** @internal an alias of PYTHON to make intent clear when language is irrelevant */
  VISUALIZE = 'python',
  PYTHON = 'python',
  CSHARP = 'csharp',
  JAVA = 'java',
  GO = 'go',
}

const VALID_TARGET_LANGUAGES = new Set(Object.values(TargetLanguage));

export function targetName(language: TargetLanguage.PYTHON | TargetLanguage.VISUALIZE): 'python';
export function targetName(language: TargetLanguage.CSHARP): 'dotnet';
export function targetName(language: TargetLanguage.JAVA): 'java';
export function targetName(language: TargetLanguage.GO): 'go';
export function targetName(language: TargetLanguage): 'python' | 'dotnet' | 'java' | 'go';
/**
 * @param language a possible value for `TargetLanguage`.
 *
 * @returns the name of the target configuration block for the given language.
 */
export function targetName(language: TargetLanguage): 'python' | 'dotnet' | 'java' | 'go' {
  // The TypeScript compiler should guarantee the below `switch` statement covers all possible
  // values of the TargetLanguage enum, but we add an assert here for clarity of intent.
  assert(VALID_TARGET_LANGUAGES.has(language), `Invalid/unexpected target language identifier: ${language}`);

  switch (language) {
    case TargetLanguage.VISUALIZE:
    case TargetLanguage.PYTHON:
      return 'python';
    case TargetLanguage.CSHARP:
      return 'dotnet';
    case TargetLanguage.JAVA:
      return 'java';
    case TargetLanguage.GO:
      return 'go';
  }
}

/**
 * Determines whether the supplied language supports transitive submodule
 * access (similar to how TypeScript/Javascript allows to use a partially
 * qualified name to access a namespace-nested value).
 *
 * If `true`, imports will mirror those found in the original TypeScript
 * code, namespace-traversing property accesses will be rendered as such. This
 * means the following snippet would be transformed "as-is":
 * ```ts
 * import * as cdk from 'aws-cdk-lib';
 * new cdk.aws_s3.Bucket(this, 'Bucket');
 * ```
 *
 * If `false` on the other hand, each used submodule will be imported
 * separately and namespace-traversing property accesses will be replaced with
 * references to the separately-imported submodule. This means the above
 * snippet would be transformed as if it had been modifired to:
 * ```ts
 * import * as aws_s3 from 'aws-cdk-lib/aws-s3';
 * new aws_s3.Bucket(this, 'Bucket');
 * ```
 */
export function supportsTransitiveSubmoduleAccess(language: TargetLanguage): boolean {
  switch (language) {
    case TargetLanguage.PYTHON:
      return true;
    case TargetLanguage.CSHARP:
      return true;
    case TargetLanguage.JAVA:
      return false;
    case TargetLanguage.GO:
      return false;
  }
}
