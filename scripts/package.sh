#!/bin/bash
# The purpose of this script is to prepare a "dist" directory
# according to the conventions of the Buildable pipeline, so
# that artifacts can be published to the various package managers
set -e
export PATH=$PWD/node_modules/.bin:$PATH

distdir="$PWD/dist"
rm -fr ${distdir}
mkdir -p ${distdir}

# run "npm run package" in all modules (which support it)
# this should emit a publishable to the "dist" directory of each module
lerna run package --stream

# collect all "dist" directories into "pack"
for dist in $(lerna exec --ignore=jsii-calc --ignore=@scope/\* "[ -d ./dist ] && echo \${PWD}/dist || true"); do
  echo "collecting ${dist}..."
  rsync -av ${dist}/ ${distdir}/
done

# create a build.json file with build metadata
# commit is obtained from CODEBUILD_RESOLVED_SOURCE_VERSION.
# if not defined (i.e. local build or CodePipeline build), use the HEAD commit hash
version="$(node -e "console.log(require('./lerna.json').version)")"
commit="${CODEBUILD_RESOLVED_SOURCE_VERSION:-"$(git rev-parse --verify HEAD)"}"

cat > ${distdir}/build.json <<HERE
{
  "name": "jsii",
  "version": "${version}",
  "commit": "${commit}"
}
HERE

# copy CHANGELOG.md to dist/ for github releases
cp CHANGELOG.md ${distdir}/

# for posterity, print all files in dist
find dist/
