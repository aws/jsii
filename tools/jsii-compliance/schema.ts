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
