/**
 * Re-add the `bundledDependencies` that was removed during `preinstall`.
 */

const fs = require('fs');

const file = require.resolve('../package.json');
const packageJson = require(file);

const newPackageJson = {};
for (const key of Object.keys(packageJson)) {
    if (key === 'dependencies') {
        newPackageJson.bundledDependencies = ['jsii-calc-bundled'];
    }
    newPackageJson[key] = packageJson[key];
}

fs.writeFileSync(file, JSON.stringify(newPackageJson, null, 2) + '\n', err => {
    if (err) {
        throw err;
    }
});
