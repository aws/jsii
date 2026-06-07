#!/usr/bin/env bash
# Generate the Ruby bindings for the jsii-calc fixture assemblies into ./lib,
# where spec/spec_helper.rb expects to find them.  Invoked by `yarn build`.
set -euo pipefail

genRoot="./lib"

# Clean up any previously-generated bindings so stale types don't linger when
# an assembly is removed or renamed upstream.
rm -rf "${genRoot}"

# `--code-only` skips `gem build`, which would require Ruby + RubyGems to be
# present in every environment that runs `yarn build`.  The runtime tests do
# not consume a built .gem — they load the generated sources under lib/
# directly via $LOAD_PATH (see spec/spec_helper.rb).
#
# `--recurse` pacmaks jsii-calc *and* the whole dependency closure
# (@scope/jsii-calc-{lib,base,base-of-base}), so we only need to pass the
# top-level assembly here.
yarn jsii-pacmak -t ruby --code-only --recurse -o "${genRoot}" ../../jsii-calc
