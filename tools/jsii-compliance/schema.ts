/**
 * Compliance suite definition.
 */
export interface Suite {
  /**
   * Suite name.
   */
  readonly name: string;

  /**
   * Suite description.
   */
  readonly description: string;

  /**
   * Language bindings the suite applies to. The key is the language.
   */
  readonly bindings: Record<string, Binding>;

  /**
   * The categories of the suite, in order. Each test case belongs to exactly one category.
   */
  readonly categories: Category[];
}

/**
 * A group of related test cases, defined by a directory in `suite/`.
 */
export interface Category {
  /**
   * The category directory name, e.g. `03-statics`. Used for ordering and in links.
   */
  readonly id: string;

  /**
   * The category title.
   */
  readonly title: string;

  /**
   * The category description (markdown).
   */
  readonly description: string;

  /**
   * The test cases in this category, ordered by name.
   */
  readonly testCases: TestCase[];
}

/**
 * Specific test case, defined by a markdown file in `suite/<category>/<name>.md`.
 */
export interface TestCase {
  /**
   * Test case name (the file name). Language bindings report results using this name.
   */
  readonly name: string;

  /**
   * Human readable title (the H1 heading of the file).
   */
  readonly title: string;

  /**
   * The id of the category the test case belongs to.
   */
  readonly category: string;

  /**
   * The markdown content of the test case file, without its frontmatter and title.
   */
  readonly body: string;
}

/**
 * Language binding.
 */
export interface Binding {
  /**
   * Location of the language specific report.
   */
  readonly report: string;
}

/**
 * Inidividual test result.
 */
export interface TestResult {
  /**
   * Status of execution.
   */
  readonly status: 'success' | 'failure' | 'n/a';

  /**
   * Status reason (displayed as a tooltip if defined)
   */
  readonly reason?: string;

  /**
   * Optional URL of this status
   */
  readonly url?: string;
}

/**
 * Language specific compliance report.
 */
export type Report = Record<string, TestResult>;
