#!/bin/bash
set -euo pipefail

###
# This script can be used to build a jsii/superchain:local image from a locally
# checked out version of the Dockerfile. It is made to build an image as similar
# as possible to what would be built in the CI/CD infrastructure (in that it'll
# include similar labels).
###

# Obtain the currently checked out commit ID
COMMIT_ID=$(git rev-parse HEAD)

if [[ ! -z $(git status --short) ]]; then
  # IF there are changes or untracked file, note the tree is dirty
  COMMIT_ID=${COMMIT_ID}+dirty
else
  # Otherwise, note that this was built locally
  COMMIT_ID=${COMMIT_ID}+local
fi

# Now on to building the image
docker build                                                                    \
  --pull                                                                        \
  --build-arg BUILD_TIMESTAMP=$(date -u +'%Y-%m-%dT%H:%M:%SZ')                  \
  --build-arg COMMIT_ID=${COMMIT_ID}                                            \
  -t "jsii/superchain:local"                                                    \
  .
