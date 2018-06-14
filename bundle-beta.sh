
#!/bin/bash
# Creates our beta bundle for the CDK.
# Assume we have a bootstrapped and packaged repository
set -euo pipefail
root=$PWD

# Create an archive under ./dist
version="$(node -e "console.log(require('./lerna.json').version)")"

cd pack

dist=${root}/dist
output=${dist}/jsii-${version}.zip
rm -fr ${dist}
mkdir -p ${dist}
zip -y -r ${output} .
echo ${output}
