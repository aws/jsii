#!/bin/bash
set -e
npm i
which docker || echo 'no docker'
node_modules/.bin/lerna bootstrap
node_modules/.bin/lerna run test

