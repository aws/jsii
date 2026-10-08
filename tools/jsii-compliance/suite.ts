import * as fs from 'fs';
import * as path from 'path';

import * as schema from './schema';

/**
 * The directory containing the test case definitions: `suite/<category>/<test-name>.md`
 */
export const SUITE_DIR = path.join(__dirname, 'suite');

/**
 * Loads the compliance suite from the markdown files in `suite/`.
 *
 * @throws if any category or test case file is invalid.
 */
export function loadSuite(): schema.Suite {
  const errors: string[] = [];
  const categories: schema.Category[] = [];

  for (const id of listDirectories(SUITE_DIR)) {
    const categoryDir = path.join(SUITE_DIR, id);
    const readme = path.join(categoryDir, 'README.md');
    if (!fs.existsSync(readme)) {
      errors.push(
        `${relative(categoryDir)}: missing README.md with the category title and description`,
      );
      continue;
    }
    const { title, body: description } = parseMarkdown(
      fs.readFileSync(readme, 'utf-8'),
    );
    if (!title) {
      errors.push(`${relative(readme)}: missing H1 title`);
    }

    const testCases: schema.TestCase[] = [];
    for (const file of fs.readdirSync(categoryDir).sort()) {
      if (file === 'README.md' || !file.endsWith('.md')) {
        continue;
      }
      const testCase = loadTestCase(id, path.join(categoryDir, file), errors);
      if (testCase) {
        testCases.push(testCase);
      }
    }

    categories.push({ id, title: title ?? id, description, testCases });
  }

  // Test names must be unique across categories, since language reports only use the name
  const seen = new Map<string, string>();
  for (const testCase of categories.flatMap((c) => c.testCases)) {
    const key = normalizeTestName(testCase.name);
    const other = seen.get(key);
    if (other) {
      errors.push(
        `Test '${testCase.name}' is defined in both ${other} and ${testCase.category}`,
      );
    }
    seen.set(key, testCase.category);
  }

  if (errors.length > 0) {
    throw new Error(`Invalid compliance suite:\n  ${errors.join('\n  ')}`);
  }

  return {
    name: 'standard',
    description:
      'JSII standard compliance test suite. These tests must be implemented in each language binding.',
    bindings: {
      java: {
        report:
          'packages/@jsii/java-runtime-test/project/compliance-report.json',
      },
      golang: {
        report: 'packages/@jsii/go-runtime-test/project/compliance-report.json',
      },
      dotnet: {
        report: 'packages/@jsii/dotnet-runtime-test/compliance-report.json',
      },
      python: {
        report: 'packages/@jsii/python-runtime/compliance-report.json',
      },
    },
    categories,
  };
}

/**
 * Given a test name, normalize it so it can be compared across different language bindings.
 *
 * Ignores case, underscores and leading "test"s, so each language can follow its own
 * naming conventions: `test_null_is_a_valid_optional_list` matches `testNullIsAValidOptionalList`
 */
export function normalizeTestName(testName: string): string {
  return testName
    .toUpperCase()
    .replace(/_/g, '')
    .replace(/^(TEST)+/, '');
}

function loadTestCase(
  category: string,
  file: string,
  errors: string[],
): schema.TestCase | undefined {
  const name = path.basename(file, '.md');
  const { frontmatter, title, body } = parseMarkdown(
    fs.readFileSync(file, 'utf-8'),
  );
  const location = relative(file);

  if (Object.keys(frontmatter).length > 0) {
    errors.push(`${location}: test cases have no frontmatter`);
  }
  if (!title) {
    errors.push(`${location}: missing H1 title`);
  }
  if (!/\b(MUST|SHOULD|MAY)( NOT)?\b/.test(body.split(/^## /m)[0])) {
    errors.push(
      `${location}: the description must state the requirement using RFC 2119 keywords`,
    );
  }
  if (!/^## Reference Implementation$/m.test(body)) {
    errors.push(`${location}: missing '## Reference Implementation' section`);
  }

  if (!title) {
    return undefined;
  }
  return { name, title, category, body };
}

/**
 * Splits a markdown file into its YAML frontmatter (simple `key: value` pairs only),
 * its H1 title, and the remaining body.
 */
function parseMarkdown(content: string): {
  frontmatter: Record<string, string>;
  title?: string;
  body: string;
} {
  const frontmatter: Record<string, string> = {};
  let rest = content;

  const match = /^---\n([\s\S]*?)\n---\n/.exec(content);
  if (match) {
    for (const line of match[1].split('\n')) {
      const [key, ...value] = line.split(':');
      if (key.trim()) {
        frontmatter[key.trim()] = value.join(':').trim();
      }
    }
    rest = content.slice(match[0].length);
  }

  const titleMatch = /^\s*# (.+)\n/.exec(rest);
  if (titleMatch) {
    rest = rest.slice(titleMatch[0].length);
  }

  return { frontmatter, title: titleMatch?.[1].trim(), body: rest.trim() };
}

function listDirectories(dir: string): string[] {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
}

function relative(file: string): string {
  return path.relative(path.join(__dirname, '..', '..'), file);
}
