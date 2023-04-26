if (process.env.JSII_SUPPRESS_UPGRADE_PROMPT == null) {
  console.error(
    [
      '#######################################################################################################',
      '### You are currently using jsii@1.x. We recommend upgrading to jsii@5.0.x or later. This will      ###',
      '### allow you to use modern TypeScript syntax, and improves compatibility with many common          ###',
      '### dependencies. For example, recent versions of @types/node.                                      ###',
      '###                                                                                                 ###',
      '### 5.0.x and subsequent releases of jsii use the same major.minor version as the TypeScript        ###',
      '### compiler they are built on. We recommend declaring a minor-pinned (also known as "tilde")       ###',
      '### dependency on jsii (e.g: `"jsii": "5.0.x"` or `"jsii": "~5.0.7"`).                              ###',
      '###                                                                                                 ###',
      '### For more information, see: https://aws.github.io/jsii/compiler-and-rosetta-maintenance/         ###',
      '###                                                                                                 ###',
      '### This warning can be suppressed by setting the JSII_SUPPRESS_UPGRADE_PROMPT environment variable ###',
      '#######################################################################################################',
    ].join('\n'),
  );
}
