#!/usr/bin/env node

import * as fs from 'fs';
import * as path from 'path';

import * as schema from './schema';

// eslint-disable-next-line @typescript-eslint/no-require-imports,@typescript-eslint/no-var-requires
const tablemark = require('tablemark');

const SUCCESS = '✅';
const FAILURE = '❌';
const NA = 'N/A';

/**
 * Determine whether or not a test case should be excluded from a specific language.
 * An exclusion happens either when the entire language binding is excluded, or a specific test case.
 *
 * @param test the test.
 * @param suite the suite.
 * @param language the language.
 */
function isExcluded(
  testCase: schema.TestCase,
  suite: schema.Suite,
  language: string,
) {
  const testExcluded =
    testCase.exclusions && testCase.exclusions[language] ? true : false;
  const bindingExcluded =
    suite.exclusions && suite.exclusions[language] ? true : false;
  return testExcluded || bindingExcluded;
}

/**
 * Determines the status of a specific test case with respect to a specific language.
 *
 * @param testCase the test case.
 * @param language test language.
 * @param reports the reports collected from all language bindings.
 */
function determineTestStatus(
  testCase: schema.TestCase,
  language: string,
  reports: Record<string, schema.Report>,
) {
  const report = reports[language];
  const testResult = report
    ? report[normalizeTestName(testCase.name)]
    : undefined;

  if (!testResult) return FAILURE;
  return testResult.status === 'success' ? SUCCESS : FAILURE;
}

/**
 * Given a test name, normalize it so it can be compared across different language bindings.
 *
 * @param testName the test name.
 */
function normalizeTestName(testName: string): string {
  return testName.toUpperCase();
}

/**
 * Given a compliance report, normalize its test names so they are comparable to the
 * tests defined in the suite.
 *
 * @param report report
 */
function normalizeReport(report: schema.Report): schema.Report {
  const normalized: schema.Report = {};
  Object.keys(report).forEach((k) => {
    normalized[normalizeTestName(k)] = report[k];
  });
  return normalized;
}

/**
 * Validates that a language specific compliance report doesn't violate the suite.
 *
 * Possible violations are:
 *
 *   - A test exist in the report that doesn't exist in the suite definition.
 *
 * @param report the report.
 * @param language the language.
 * @param suite the suite.
 */
function validateReport(
  report: schema.Report,
  language: string,
  suite: schema.Suite,
) {
  const testsInReport = Object.keys(report);

  const testsInSuite = suite.testCases.map((t: schema.TestCase) =>
    normalizeTestName(t.name),
  );

  // make sure every test in the language report exist in the suite.
  // this prevents us from adding tests only to a specific language.
  for (const test of testsInReport) {
    if (!testsInSuite.includes(test)) {
      throw new Error(
        `Test '${test}' from ${language} report does not exist in the compliance suite. Please add it to the suite definition.`,
      );
    }
  }
}

/**
 * Collect all the individual reports into a single collection. Ignores bindings that are missing their report file.
 *
 * @param suite the compliance suite.
 */
function collectReports(suite: schema.Suite): Record<string, schema.Report> {
  const reports: Record<string, schema.Report> = {};
  for (const language of Object.keys(suite.bindings)) {
    const binding = suite.bindings[language];
    const reportFile = path.join(`${__dirname}`, '..', '..', binding.report);
    console.log(`Collecting ${language} report from: ${reportFile}`);
    if (fs.existsSync(reportFile)) {
      reports[language] = normalizeReport(
        JSON.parse(fs.readFileSync(reportFile).toString()),
      );
    }
  }
  return reports;
}

console.log('Creating compliance report');

const suiteFile = path.join(`${__dirname}`, 'compliance-suite.json');
const suite: schema.Suite = JSON.parse(fs.readFileSync(suiteFile).toString());

console.log('Collecting individual lanaguage binding reports');
const reports = collectReports(suite);

console.log('Validating reports');
Object.keys(reports).forEach((k) => validateReport(reports[k], k, suite));

console.log('Creating aggregated report');

const rows: Array<Record<string, string>> = [];
const successes: Record<string, number> = {};

for (const [i, testCase] of suite.testCases.entries()) {
  const row: Record<string, string> = {
    number: `${i + 1}`,
    test: testCase.name,
    description: testCase.description,
  };

  for (const language of Object.keys(suite.bindings)) {
    const status = isExcluded(testCase, suite, language)
      ? NA
      : determineTestStatus(testCase, language, reports);
    row[language] = status;

    if (status === SUCCESS) {
      successes[language] =
        successes[language] === undefined ? 0 : successes[language] + 1;
    }
  }

  rows.push(row);
}

const columns = ['number', 'test', 'description'];

for (const language of Object.keys(reports)) {
  const coverage = (
    (successes[language] / suite.testCases.length) *
    100
  ).toFixed(2);
  columns.push(`${language} (${coverage}%)`);
}

const target = path.join(
  `${__dirname}`,
  '..',
  '..',
  'gh-pages',
  'content',
  'specification',
  '6-compliance-report.md',
);
const header = `# Compliance Report

This section detailed the current state of each language binding with respect to our standard compliance suite.`;

fs.writeFileSync(target, `${header}\n\n${tablemark(rows, { columns })}`);

console.log(`Report written to ${target}`);
