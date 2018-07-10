
#!/bin/bash
# Creates our beta bundle for the CDK.
# Assume we have a bootstrapped and packaged repository
set -euo pipefail
root=$PWD

# Create an archive under ./dist
version="$(node -e "console.log(require('./lerna.json').version)")"

# CODEBUILD_RESOLVED_SOURCE_VERSION is not defined (i.e. local build or CodePipeline build),
# use the HEAD commit hash
commit="${CODEBUILD_RESOLVED_SOURCE_VERSION:-"$(git rev-parse --verify HEAD)"}"

cd pack
dist=${root}/dist
output=${dist}/jsii-${version}+${commit}.zip
rm -fr ${dist}
mkdir -p ${dist}
zip -y -r ${output} .
echo ${output}
