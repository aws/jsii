#!/bin/bash
set -e
npm install
npm run env -- lerna --loglevel=debug bootstrap
npm run env -- lerna run test
