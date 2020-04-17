#!/bin/bash
set -euo pipefail

npm run gen

dotnet build --force -c Release ./src/Amazon.JSII.JsonModel.sln
