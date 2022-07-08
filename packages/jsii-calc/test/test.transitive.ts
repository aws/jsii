// this wee little test is intended to ensure that jsii-calc doesn't accidentally
// take a direct dependency on @scope/jsii-calc-base-of-base, which is intended
// to only be used as a transitive dependency through @scope/jsii-calc-base.

import * as assert from 'assert';
import { readFileSync } from 'fs';
import { join } from 'path';

const pkgjsonPath = join(__dirname, '..', 'package.json');
const pkgjson = JSON.parse(readFileSync(pkgjsonPath, 'utf-8'));

// read the name of the transitive dependency module
// (@scope/jsii-calc-base-of-base) from it's package.json file, in order to
// create strong-coupling (if someone decides to change the name this will
// fail).
const transitiveDepName = JSON.parse(
  readFileSync(
    join(
      __dirname,
      '..',
      '..',
      '@scope',
      'jsii-calc-base-of-base',
      'package.json',
    ),
    'utf-8',
  ),
).name;

const message = `Do not directly take a dependency on "${transitiveDepName}". It is meant to only be declared as a transitive dependency through @scope/jsii-calc-base. Sorry!`;
assert.ok(!(transitiveDepName in pkgjson.dependencies), message);
assert.ok(!(transitiveDepName in pkgjson.peerDependencies), message);

console.log('ok', __filename);
