#!/bin/bash
set -e
(cd ../jsii-ruby-runtime && npm run build)
npm run build
npm run test
