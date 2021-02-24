#!/usr/bin/env node

const path = require('path');
const fs = require('fs');

const javaReportFile = path.join('packages', '@jsii', 'java-runtime-test', 'project', 'compliance-report.json');
const golangReportFile = path.join('packages', '@jsii', 'golang-runtime-test', 'compliance-report.json');
const pythonReportFile = path.join('packages', '@jsii', 'python-runtime-test', 'compliance-report.json');
const dotnetReportFile = path.join('packages', '@jsii', 'dotnet-runtime-test', 'compliance-report.json');

const tests = [];
const suite = {
  name: 'standard',
  description: 'JSII standard compliance test suite. These tests must be implemented in each language binding.',
  bindings: {
    java: { report: javaReportFile },
    golang: { report: golangReportFile },
    dotnet: { report: dotnetReportFile, excluded: true },
    python: { report: pythonReportFile, excluded: true },
  },
  tests: tests,
};

const target = path.join(`${__dirname}`, 'compliance-suite.json');
const javaReport = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', javaReportFile)));

for (const test of Object.keys(javaReport)) {
  tests.push({ name: test, description: '', exclusions: {}})
}

fs.writeFileSync(target, JSON.stringify(suite, null, 2));
