#!/bin/bash
cd $(dirname $0)

echo | node <<HERE
const fs = require('fs');
const jsii = require('./jsii.json');
const version = require('../package.json').version;
jsii.version = version;
jsii.dependencies['jsii\$jsii_calc_lib\$'].version = version;
fs.writeFileSync('./jsii.json', JSON.stringify(jsii, undefined, 2));
HERE

diff ../dist/jsii.json jsii.json || {
  echo
  echo "========================================================================="
  echo "test failed. to update:"
  echo "    cp $PWD/../dist/jsii.json $PWD/../test/jsii.json"
  exit 1
}
