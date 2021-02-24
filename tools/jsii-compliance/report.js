#!/usr/bin/env node

const path = require('path');
const fs = require('fs');
const tablemark = require('tablemark')

const suite = JSON.parse(fs.readFileSync(path.join(`${__dirname}`, 'compliance-suite.json')));
const aggregatedReport = {};

function isExcluded(test, language) {
  const testExcluded = test.exclusions[language] === true;
  const bindingExcluded = suite.bindings[language].excluded === true;
  return testExcluded || bindingExcluded;
}

function getOrCreateTestReport(test) {
  if (!aggregatedReport[test.name]) {
    aggregatedReport[test.name] = {'description': test.description};
  }
  return aggregatedReport[test.name];
}

for (const language of Object.keys(suite.bindings)) {
  const binding = suite.bindings[language];
  const reportFile = path.join(`${__dirname}`, '..', '..', binding.report);
  console.log(`Collecting ${language} report from: ${reportFile}`);

  let report = undefined;

  if (fs.existsSync(reportFile)) {

    report = JSON.parse(fs.readFileSync(reportFile));
    const testsInReport = Object.keys(report);
    const testsInSuite = suite.tests.map(t => t.name);

    // make sure every test in the language report exist in the suite.
    // this prevents us from adding tests only to a specific language.
    for (const test of testsInReport) {
      if (!testsInSuite.includes(test)) {
        throw new Error(`Test '${test}' from ${language} report does not exist in the compliance suite. Please add it to the suite definition.`);
      }
    }
  }

  for (const test of suite.tests) {

    let status = undefined;

    if (isExcluded(test, language)) {
      status = 'N/A';
    } else if (!report || !report[test.name]) {
      status = '❌';
    } else {
      status = report[test.name].status === 'success' ? '✅' : '❌';
    }

    const testReport = getOrCreateTestReport(test);
    testReport[language] = status;
  }

}

// transform to the expected table rows.
const rows = Object.keys(aggregatedReport).map(t => ({'test': t, ...aggregatedReport[t] }));
const target = path.join(`${__dirname}`, '..', '..', 'gh-pages', 'content', 'specification', '6-compliance-report.md');
const header = `# Compliance Report

This section detailed the current state of each language binding with respect to our standard compliance suite.`

fs.writeFileSync(target, `${header}\n\n${tablemark(rows)}`);
