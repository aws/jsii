#!/bin/bash
#
# This script executes the kernel unit tests in "recording" mode. In this mode, each test
# will record all kernel inputs (">") and outputs ("<") into a log file.
#
# Then, we take each one of these log files and extract only the inputs (lines that begin with ">").
# We then execute jsii-runtime and pipe these inputs via STDIN.
#
# jsii-runtime emits the same logging format (inputs and outputs) to STDERR, so we capture
# these lines and then diff them with the expected file to validate.
#
# If the outputs are the same the test passed.
#
set -e
cd $(dirname $0)

export JSII_RECORD=$(mktemp -d) # recording dir output
export JSII_NOSTACK=1           # stack traces will not match
export JSII_DEBUG=1             # emit debug log from jsii-runtime

jsii_runtime_program="../webpack/jsii-runtime.js"

# run jsii-kernel tests and save recordings
(
    cd ../../jsii-kernel
    jest test/kernel.test.js >& /tmp/test-output || {
        cat /tmp/test-output
        exit 1
    }
)

# play back each test into jsii-runtime and compare results
for file in $(ls -1 ${JSII_RECORD}); do
    recording="${JSII_RECORD}/${file}"
    actual="${recording}.actual"
    name="$(basename ${recording} .log)"

    # announce
    echo " + ${name}"

    # play back recording into jsii-runtime (responses are ignored) and save all stderr lines
    # that start with "> " or "< " to ${actual}, to be diffed with recording.
    cat ${recording} | node ${jsii_runtime_program} 2> /tmp/jsii-runtime.stderr 1> /dev/null
    cat /tmp/jsii-runtime.stderr | grep '^[<>] ' > ${actual} || {
        cat ${recording} | node ${jsii_runtime_program}
        exit 1
    }

    # compare expected and actual
    if ! diff ${actual} ${recording}; then
        echo "========================================================================="
        echo "Expected: ${recording}"
        echo "Actual: ${actual}"
        echo "========================================================================="
        exit 1
    fi
done

echo
echo "Recordings: ${JSII_RECORD}"
