// @ts-check

/** @type {import('@yarnpkg/types')} */
const { defineConfig } = require(`@yarnpkg/types`);

module.exports = defineConfig({
  async constraints({ Yarn }) {
    const root = Yarn.workspace({ cwd: '.' });

    // Enforce consistent versions for shared root devDependencies
    for (const ident of ['typescript', 'jest', 'eslint']) {
      const expected = root.manifest.devDependencies?.[ident];
      if (!expected) continue;

      for (const workspace of Yarn.workspaces()) {
        if (workspace.manifest.devDependencies?.[ident]) {
          workspace.set(['devDependencies', ident], expected);
        }
      }
    }
  },
});
