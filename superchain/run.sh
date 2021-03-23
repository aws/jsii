#!/bin/sh

source "$NVM_DIR/nvm.sh"
[[ -z "$NVM_USE_VERSION" ]] || nvm use "$NVM_USE_VERSION"

exec "$@"
