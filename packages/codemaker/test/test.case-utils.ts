import nodeunit = require('nodeunit');
import caseUtils = require('../lib/case-utils');

export = nodeunit.testCase({
  'toCamelCase'(test: nodeunit.Test) {
    test.equal(caseUtils.toCamelCase('EXAMPLE_VALUE'), 'exampleValue');
    test.equal(caseUtils.toCamelCase('example', 'value'), 'exampleValue');
    test.done();
  },

  'toPascalCase'(test: nodeunit.Test) {
    test.equal(caseUtils.toPascalCase('EXAMPLE_VALUE'), 'ExampleValue');
    test.equal(caseUtils.toPascalCase('example', 'value'), 'ExampleValue');
    test.done();
  },

  'toSnakeCase'(test: nodeunit.Test) {
    test.equal(caseUtils.toSnakeCase('EXAMPLE_VALUE'), 'example_value');
    test.equal(caseUtils.toSnakeCase('exampleValue'), 'example_value');
    test.equal(caseUtils.toSnakeCase('ExampleValue'), 'example_value');
    test.equal(caseUtils.toSnakeCase('EPSConduit'), 'eps_conduit');
    test.equal(caseUtils.toSnakeCase('SomeEBSVolume'), 'some_ebs_volume');
    test.done();
  },

  'reserved word snake-casing'(test: nodeunit.Test) {
    test.equal(caseUtils.toSnakeCase('SizeMiB'), 'size_mib');
    test.equal(caseUtils.toSnakeCase('SizeMiBiBytes'), 'size_mi_bi_bytes');
    test.equal(caseUtils.toSnakeCase('MiBSize'), 'mib_size');

    test.done();
  }
});
