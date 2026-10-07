/* eslint-disable import/no-extraneous-dependencies */
/**
 * Converts the TRX test results written by `dotnet test` into the compliance report
 * consumed by tools/jsii-compliance.
 *
 * Usage: node compliance-report.js <test-results.trx> <compliance-report.json>
 */
import { DOMParser, Element } from '@xmldom/xmldom';
import * as fs from 'fs';

// The DisplayName of the compliance tests, see ComplianceTests.cs
const COMPLIANCE_PREFIX = 'IntegrationTests.Compliance.';

const [trxFile, reportFile] = process.argv.slice(2);
if (!trxFile || !reportFile) {
  console.error(
    'Usage: compliance-report.js <test-results.trx> <compliance-report.json>',
  );
  process.exit(1);
}

const trx = new DOMParser().parseFromString(
  // dotnet writes the TRX file with a byte order mark, which the parser rejects
  fs.readFileSync(trxFile, 'utf-8').replace(/^\uFEFF/, ''),
  'text/xml',
);
const report: Record<string, { status: string; reason?: string }> = {};

for (const result of Array.from(trx.getElementsByTagName('UnitTestResult'))) {
  const testName = result.getAttribute('testName');
  if (!testName?.startsWith(COMPLIANCE_PREFIX)) {
    continue;
  }
  const name = testName.slice(COMPLIANCE_PREFIX.length);

  const outcome = result.getAttribute('outcome');
  if (outcome === 'Passed') {
    report[name] = { status: 'success' };
  } else if (outcome === 'NotExecuted') {
    // A skipped compliance test is not passing for this language
    report[name] = { status: 'failure', reason: skipReason(result) };
  } else {
    report[name] = { status: 'failure' };
  }
}

if (Object.keys(report).length === 0) {
  console.error(`No compliance test results found in ${trxFile}`);
  process.exit(1);
}

fs.writeFileSync(reportFile, `${JSON.stringify(report, undefined, 2)}\n`);
console.log(
  `Compliance report with ${Object.keys(report).length} tests written to ${reportFile}`,
);

/**
 * The skip reason is in <Output><ErrorInfo><Message> of the test result
 */
function skipReason(result: Element): string | undefined {
  const message = result.getElementsByTagName('Message')[0];
  return message?.textContent ?? undefined;
}
