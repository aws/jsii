import nodeunit = require('nodeunit');
import caseUtils = require('../lib/case-utils');

export = nodeunit.testCase({
  toCamelCase(test: nodeunit.Test) {
    test.equal(caseUtils.toCamelCase('EXAMPLE_VALUE'), 'exampleValue');
    test.equal(caseUtils.toCamelCase('example', 'value'), 'exampleValue');
    test.done();
  },

  toPascalCase(test: nodeunit.Test) {
    test.equal(caseUtils.toPascalCase('EXAMPLE_VALUE'), 'ExampleValue');
    test.equal(caseUtils.toPascalCase('example', 'value'), 'ExampleValue');
    test.done();
  }
});
