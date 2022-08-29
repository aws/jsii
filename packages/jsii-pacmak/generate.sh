#!/bin/bash
set -euo pipefail

commit=${CODEBUILD_RESOLVED_SOURCE_VERSION:-}
# CODEBUILD_RESOLVED_SOURCE_VERSION is not defined (i.e. local build or CodePipeline build),
# use the HEAD commit hash
if [ -z "${commit}" ]; then
  commit="$(git rev-parse --verify HEAD)"
  suffix="@dev"
fi

VERSION=$(node -p "require('./package.json').version.replace(/\\+[0-9a-f]+\$/, '')")

cat > lib/version.ts <<HERE
// Generated at $(date -u +"%Y-%m-%dT%H:%M:%SZ") by generate.sh

/** The short version number for this JSII compiler (e.g: \`X.Y.Z\`) */
// eslint-disable-next-line @typescript-eslint/no-inferrable-types
export const VERSION: string = '${VERSION}';

/** The qualified version number for this JSII compiler (e.g: \`X.Y.Z (build #######)\`) */
export const VERSION_DESC = '${VERSION} (build ${commit:0:7}${suffix:-})';
HERE
