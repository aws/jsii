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

PLATFORM=$(uname -m)
if [[ "${PLATFORM}" == "x86_64" ]]; then
  PLATFORM="amd64"
fi

if command -v docker >/dev/null; then
  DOCKER=docker
elif command -v finch >/dev/null; then
  DOCKER=finch
else
  echo "Could not find 'docker' or 'finch' in PATH, aborting..."
  exit 1
fi

# Now on to building the image
${DOCKER} build                                                                 \
  --target superchain                                                           \
  --build-arg BUILDPLATFORM=linux/${PLATFORM}                                   \
  --build-arg TARGETPLATFORM=linux/${PLATFORM}                                  \
  --build-arg DEBIAN_VERSION=${DEBIAN_VERSION:-bookworm}                        \
  --build-arg BUILD_TIMESTAMP=$(date -u +'%Y-%m-%dT%H:%M:%SZ')                  \
  --build-arg REGISTRY="docker.io/library"                                      \
  --build-arg COMMIT_ID=${COMMIT_ID}                                            \
  -t "public.ecr.aws/jsii/superchain:1-${DEBIAN_VERSION:-bookworm}-local"       \
  -f ${PWD}/Dockerfile                                                          \
  ..
