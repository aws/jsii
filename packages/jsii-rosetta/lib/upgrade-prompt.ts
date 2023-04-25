// Note: intentionally using the same environment variable as the compiler here instead of customizing...
if (process.env.JSII_SUPPRESS_UPGRADE_PROMPT == null) {
  console.error(
    [
      '#######################################################################################################',
      '### You are currently using jsii-rosetta@1.x. We recommend upgrading to jsii-rosetta@5.0.x or       ###',
      '### later, which will allow you to use modern TypeScript syntax, and improves compatibility with    ###',
      '### many common dependencies, such as recent versions of @types/node.                               ###',
      '###                                                                                                 ###',
      '### 5.0.x and subsequent releases of jsii-rosetta use the same major.minor version as the           ###',
      '### TypeScript compiler they are built on. We recommend declaring a minor-pinned (also known as     ###',
      '### "tilde") dependency on jsii-rosetta (e.g: `"jsii-rosetta": "5.0.x"` or                          ###',
      '### `"jsii-rosetta": "~5.0.7"`).                                                                    ###',
      '###                                                                                                 ###',
      '### For more information, see: https://aws.github.io/jsii/compiler-and-rosetta-maintenance/         ###',
      '###                                                                                                 ###',
      '### This warning can be suppressed by setting the JSII_SUPPRESS_UPGRADE_PROMPT environment variable ###',
      '#######################################################################################################',
    ].join('\n'),
  );
}
