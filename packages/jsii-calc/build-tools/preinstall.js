/**
 * Remove `bundledDependencies` from the `package.json`, as otherwise npm will attempt to install it from the default
 * registry, which will fail.
 */

const fs = require('fs');

const file = require.resolve('../package.json');
const packageJson = require(file);
delete packageJson.bundledDependencies;
fs.writeFile(file, JSON.stringify(packageJson, null, 2) + '\n', err => {
    if (err) {
        throw err;
    }
});
