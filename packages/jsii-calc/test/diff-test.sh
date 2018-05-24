#!/bin/bash
cd $(dirname $0)
diff ../dist/jsii.json jsii.json || {
  echo
  echo "========================================================================="
  echo "test failed. to update:"
  echo "    cp $PWD/../dist/jsii.json $PWD/../test/jsii.json"
  exit 1
}
