import { Test, testCase } from 'nodeunit';
import { validateAssembly } from '../lib/validate-assembly';

// tslint:disable:no-string-literal makes the code easier to grep.

export = testCase({
    validateAssembly: {
        'rejects invalid assembly'(test: Test) {
            test.throws(() => validateAssembly({}));
            test.done();
        }
    }
});
