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
   * Language bindings the suite applies to.
   */
  readonly bindings: Record<string, Binding>;

  /**
   * Language bindings exclusions.
   */
  readonly exclusions?: Record<string, BindingExclusion>;

  /**
   * A list of test cases the suite enforces.
   */
  readonly testCases: TestCase[];
}

/**
 * Specific test case.
 */
export interface TestCase {
  /**
   * Test case name.
   */
  readonly name: string;

  /**
   * Test case description.
   */
  readonly description: string;

  /**
   * Language specific exclusions for a test case.
   */
  readonly exclusions?: Record<string, TestExclusion>;
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
 * Exclusion of a specific language binding.
 */
export interface BindingExclusion {
  /**
   * Reason for exclusion.
   */
  readonly reason: string;
}

/**
 * Exclusion of a specific test from a specific binding.
 */
export interface TestExclusion {
  /**
   * The language to exclude the test from.
   */
  readonly language: string;

  /**
   * The exclusion reason.
   */
  readonly reason: string;
}

/**
 * Inidividual test result.
 */
export interface TestResult {
  /**
   * Status of execution.
   */
  readonly status: 'success' | 'failure';
}

/**
 * Language specific compliance report.
 */
export type Report = Record<string, TestResult>;
