#!/usr/bin/env npx ts-node

import * as fs from 'fs';
import * as path from 'path';

import * as schema from './schema';
import { suite } from './suite';

// eslint-disable-next-line @typescript-eslint/no-require-imports,@typescript-eslint/no-var-requires
const tablemark = require('tablemark');

const SUCCESS = '🟢'; // test succeeded
const FAILURE = '🔴'; // test is failing
const MISSING = '⭕'; // test is not implemented yet
const NOTAPPL = '⚪'; // test is not applicable for this language

/**
 * Determines the status of a specific test case with respect to a specific language.
 *
 * @param testCase the test case.
 * @param language test language.
 * @param reports the reports collected from all language bindings.
 */
function determineTestStatus(testResult: schema.TestResult | undefined) {
  switch (testResult?.status) {
    case 'success':
      return SUCCESS;
    case 'failure':
      return FAILURE;
    case 'n/a':
      return NOTAPPL;
    case undefined:
    default:
      return MISSING;
  }
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
  for (const [testName, _report] of Object.entries(report)) {
    normalized[normalizeTestName(testName)] = _report;
  }
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
 *
 * @returns A list of validation errors.
 */
function validateReport(
  report: schema.Report,
  language: string,
  suite: schema.Suite,
): string[] {
  const testsInReport = Object.keys(report);

  const testsInSuite = suite.testCases.map((t: schema.TestCase) =>
    normalizeTestName(t.name),
  );

  const errors: string[] = [];

  // make sure every test in the language report exist in the suite.
  // this prevents us from adding tests only to a specific language.
  for (const test of testsInReport) {
    if (!testsInSuite.includes(test)) {
      errors.push(
        `Test '${test}' from ${language} report does not exist in the compliance suite. If this test is language specific,
          move it out of the compliance test, otherwise, add the test to the compliance suite definition.`,
      );
    }
  }

  return errors;
}

/**
 * Collect all the individual reports into a single collection. Ignores bindings that are missing their report file.
 *
 * @param suite the compliance suite.
 */
function collectReports(suite: schema.Suite): Record<string, schema.Report> {
  const reports: Record<string, schema.Report> = {};
  for (const [language, binding] of Object.entries(suite.bindings)) {
    const reportFile = path.join(__dirname, '..', '..', binding.report);
    console.log(`Collecting ${language} report from: ${reportFile}`);
    if (fs.existsSync(reportFile)) {
      reports[language] = normalizeReport(
        JSON.parse(fs.readFileSync(reportFile, 'utf-8')),
      );
    }
  }
  return reports;
}

console.log('Collecting individual lanaguage binding reports');
const reports = collectReports(suite);

console.log('Validating reports');
const errors = [];
for (const [language, report] of Object.entries(reports)) {
  errors.push(...validateReport(report, language, suite));
}

if (errors.length > 0) {
  console.error('Found multiple validation errors:');
  for (const error of errors) {
    console.error(error);
  }
  process.exit(1);
}

console.log('Creating aggregated report');

const rows = new Array<Record<string, string>>();
const successes: Record<string, number> = {};

for (const [i, testCase] of suite.testCases.entries()) {
  const row: Record<string, string> = {
    number: `${i + 1}`,
    test: testCase.description
      ? `[${testCase.name}]("${testCase.description}")`
      : testCase.name,
  };

  for (const language of Object.keys(suite.bindings)) {
    const report = reports[language];
    const testResult = report?.[normalizeTestName(testCase.name)];

    const status = determineTestStatus(testResult);
    row[language] = testResult?.url ? `[${status}](${testResult.url})` : status;

    successes[language] = successes[language] ?? 0;

    if (status === SUCCESS) {
      successes[language] = successes[language] + 1;
    }
  }

  rows.push(row);
}

const columns = ['number', 'test'];

for (const language of Object.keys(reports)) {
  const coverage = (
    (successes[language] / suite.testCases.length) *
    100
  ).toFixed(2);
  columns.push(`${language} (${coverage}%)`);
}

const target = path.join(
  __dirname,
  '..',
  '..',
  'gh-pages',
  'content',
  'specification',
  '6-compliance-report.md',
);
const header = `<!-- Auto generated by tools/jsii-compliance/report.ts - do not modify by hand -->

# Compliance Report

This section details the current state of each language binding with respect to our standard compliance suite.

`;

fs.writeFileSync(target, `${header}\n${tablemark(rows, { columns })}`);

console.log(`Report written to ${target}`);
