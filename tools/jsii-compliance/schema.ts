export interface Suite {
  readonly name: string;
  readonly description: string;
  readonly bindings: Record<string, Binding>;
  readonly exclusions?: Record<string, BindingExclusion>;
  readonly testCases: TestCase[];
}

export interface TestCase {
  readonly name: string;
  readonly description: string;
  readonly exclusions?: Record<string, TestExclusion>;
}

export interface Binding {
  readonly report: string;
}

export interface TestExclusion {
  readonly language: string;
  readonly reason: string;
}

export interface BindingExclusion {
  readonly reason: string;
}

export interface TestResult {
  readonly status: 'success' | 'failure';
}

export type Report = Record<string, TestResult>;
