#!/bin/bash
set -e
npm install
export PATH=$PWD/node_modules/.bin:$PATH
lerna bootstrap
lerna run test
