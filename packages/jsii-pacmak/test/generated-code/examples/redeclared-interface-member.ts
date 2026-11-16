// See: https://github.com/projen/projen/issues/1172
//
// A child interface re-declares a member of its parent with the SAME type,
// only to change its documentation (e.g. a different `@default`). This is
// currently rejected by the compiler (JSII5015); this fixture is compiled with
// that diagnostic downgraded to a warning to observe what each target emits.

/** Options for the base thing. */
export interface BaseOptions {
  /**
   * The name.
   * @default "base"
   */
  readonly name?: string;

  /**
   * A required value.
   */
  readonly id: string;

  /**
   * Some count.
   * @default 1
   */
  readonly count?: number;
}

/** Options for the child thing. */
export interface ChildOptions extends BaseOptions {
  /**
   * The name.
   * @default "child"
   */
  readonly name?: string;

  /**
   * A new value only on the child.
   * @default false
   */
  readonly extra?: boolean;
}

/** Re-declares again, two levels down. */
export interface GrandChildOptions extends ChildOptions {
  /**
   * The name.
   * @default "grandchild"
   */
  readonly name?: string;

  /**
   * Some count.
   * @default 3
   */
  readonly count?: number;
}

/** A behavioral interface. */
export interface IGreeter {
  /** The greeting. */
  readonly greeting: string;

  /** Say hello. */
  hello(who: string): string;
}

/** A behavioral interface that re-declares members of its parent. */
export interface IPoliteGreeter extends IGreeter {
  /** The greeting, but polite. */
  readonly greeting: string;

  /** Say hello, politely. */
  hello(who: string): string;
}

export class PoliteGreeter implements IPoliteGreeter {
  public readonly greeting = 'Good day';

  public hello(who: string): string {
    return `${this.greeting}, ${who}`;
  }
}

export class Consumer {
  public static base(opts: BaseOptions): string {
    return `${opts.id}:${opts.name ?? 'base'}:${opts.count ?? 1}`;
  }

  public static child(opts: ChildOptions): string {
    return `${opts.id}:${opts.name ?? 'child'}:${opts.count ?? 1}:${opts.extra ?? false}`;
  }

  public static grandChild(opts: GrandChildOptions): string {
    return `${opts.id}:${opts.name ?? 'grandchild'}:${opts.count ?? 3}:${opts.extra ?? false}`;
  }

  public static greet(greeter: IPoliteGreeter, who: string): string {
    return greeter.hello(who);
  }

  private constructor() {}
}
