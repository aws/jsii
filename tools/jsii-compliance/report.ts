#!/usr/bin/env npx ts-node

import * as fs from 'fs';
import * as path from 'path';

import { testCaseLink, writeSuitePages } from './pages';
import * as schema from './schema';
import { loadSuite, normalizeTestName } from './suite';

// eslint-disable-next-line @typescript-eslint/no-require-imports,@typescript-eslint/no-var-requires
const tablemark = require('tablemark');

const SUCCESS = '🟢'; // test succeeded
const FAILURE = '🔴'; // test is failing
const MISSING = '⭕'; // test is not implemented yet
const NOTAPPL = '⚪'; // test is not applicable for this language

/**
 * Determines the status of a specific test case with respect to a specific language.
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
 * Given a compliance report, normalize its test names so they are comparable to the
 * tests defined in the suite.
 */
function normalizeReport(report: schema.Report): schema.Report {
  const normalized: schema.Report = {};
  for (const [testName, _report] of Object.entries(report)) {
    normalized[normalizeTestName(testName)] = _report;
  }
  return normalized;
}

/**
 * Validates that every test in a language specific compliance report has a test case
 * definition in the suite. This prevents adding compliance tests to a single language.
 *
 * @returns A list of validation errors.
 */
function validateReport(
  report: schema.Report,
  language: string,
  suite: schema.Suite,
): string[] {
  const testsInSuite = new Set(
    suite.categories.flatMap((c) =>
      c.testCases.map((t) => normalizeTestName(t.name)),
    ),
  );

  return Object.keys(report)
    .filter((test) => !testsInSuite.has(test))
    .map(
      (test) =>
        `Test '${test}' from ${language} report has no test case definition in tools/jsii-compliance/suite. If this test is language specific,
          move it out of the compliance test, otherwise, add a test case definition to the suite.`,
    );
}

/**
 * Collect all the individual reports into a single collection. Ignores bindings that are missing their report file.
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

console.log('Loading compliance suite');
const suite = loadSuite();

console.log('Collecting individual language binding reports');
const reports = collectReports(suite);

console.log('Validating reports');
const errors = Object.entries(reports).flatMap(([language, report]) =>
  validateReport(report, language, suite),
);

if (errors.length > 0) {
  console.error('Found multiple validation errors:');
  for (const error of errors) {
    console.error(error);
  }
  process.exit(1);
}

writeSuitePages(suite);

console.log('Creating aggregated report');

const languages = Object.keys(suite.bindings);
const testCount = suite.categories.reduce((n, c) => n + c.testCases.length, 0);
const successes: Record<string, number> = {};
const completeCategories: Record<string, number> = {};
for (const language of languages) {
  successes[language] = 0;
  completeCategories[language] = 0;
}

const sections = new Array<string>();
for (const category of suite.categories) {
  const categorySuccesses: Record<string, number> = {};
  const rows = category.testCases.map((testCase) => {
    const row: Record<string, string> = {
      test: `[${testCase.name}](${testCaseLink(testCase)} "${testCase.title}")`,
    };

    for (const language of languages) {
      const testResult = reports[language]?.[normalizeTestName(testCase.name)];
      const status = determineTestStatus(testResult);
      row[language] = testResult?.url
        ? `[${status}](${testResult.url})`
        : status;
      if (status === SUCCESS) {
        successes[language] += 1;
        categorySuccesses[language] = (categorySuccesses[language] ?? 0) + 1;
      }
    }
    return row;
  });

  for (const language of languages) {
    if (categorySuccesses[language] === category.testCases.length) {
      completeCategories[language] += 1;
    }
  }

  sections.push(
    `## [${category.title}](${testCaseLink(category.testCases[0]).split('#')[0]})\n\n${tablemark(rows, { columns: ['Test', ...languages] })}`,
  );
}

const summary = languages.map((language) => {
  const coverage = ((successes[language] / testCount) * 100).toFixed(2);
  return {
    language,
    tests: reports[language]
      ? `${coverage}% (${successes[language]} / ${testCount})`
      : 'no report',
    categories: reports[language]
      ? `${completeCategories[language]} / ${suite.categories.length}`
      : 'no report',
  };
});

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

This section details the current state of each language binding with respect to our [standard compliance suite](4-standard-compliance-suite.md).

Language bindings must pass every test case. A category is complete when a language binding passes all of its test cases.

${tablemark(summary, { columns: ['Language', 'Tests passing', 'Categories complete'] })}

Status: ${SUCCESS} passing, ${FAILURE} failing, ${NOTAPPL} not applicable, ${MISSING} not implemented.
`;

fs.writeFileSync(target, `${header}\n${sections.join('\n\n')}`);

console.log(`Report written to ${target}`);
