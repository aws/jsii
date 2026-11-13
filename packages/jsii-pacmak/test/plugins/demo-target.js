/**
 * A minimal target plugin used by test/plugins.test.ts.
 *
 * Deliberately dependency-free and duck-typed: in the `--code-only` flow the
 * only method the builder invokes on a Target is `generateCode(outDir,
 * tarball)`, so a plugin needs nothing from pacmak's internals unless it
 * wants pacmak's helpers.
 *
 * NOTE: force-tracked (`git add -f`) — the repo gitignores `*.js` under
 * `test/` as compiled output, but this file is a hand-written fixture.
 */
const fs = require('node:fs/promises');
const path = require('node:path');

class DemoTarget {
  constructor(options) {
    this.assembly = options.assembly;
    this.targetName = options.targetName;
  }

  async generateCode(outDir) {
    await fs.mkdir(outDir, { recursive: true });
    const spec = this.assembly.spec ?? this.assembly;
    await fs.writeFile(
      path.join(outDir, 'demo-manifest.json'),
      JSON.stringify(
        {
          generatedBy: this.targetName,
          assembly: spec.name,
          version: spec.version,
          typeCount: Object.keys(spec.types ?? {}).length,
        },
        null,
        2,
      ),
    );
  }
}

module.exports = {
  targetName: 'demo',
  pluginApiVersion: '0.1.0',
  targetConstructor: DemoTarget,
};
