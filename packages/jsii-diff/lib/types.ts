import { Stability } from '@jsii/spec';
import * as reflect from 'jsii-reflect';

export interface ComparisonOptions {
  /**
   * Whether to treat API elements as experimental if unmarked.
   *
   * @default Treat as stable
   */
  defaultExperimental?: boolean;

  /**
   * Mapping old FQNs to new ones
   */
  fqnRemapping?: Record<string, string>;
}

export interface ComparisonContext extends ComparisonOptions {
  /**
   * Where to report errors
   */
  mismatches: Mismatches;
}

export interface ApiMismatch {
  message: string;
  violationKey: string;
  stability: Stability;
}

export type ApiElement = reflect.Type | reflect.TypeMember | reflect.EnumMember;

export interface ReportOptions {
  ruleKey: string;
  violator: ApiElement;
  message: string;
}

export interface IReport {
  report(options: ReportOptions): void;
  withMotivation(reason: string): IReport;
}

export class Mismatches implements IReport {
  public readonly mismatches = new Array<ApiMismatch>();
  private readonly defaultStability: Stability;

  public constructor(opts: { defaultStability: Stability }) {
    this.defaultStability = opts.defaultStability;
  }

  public report(options: ReportOptions) {
    const fqn = apiElementIdentifier(options.violator);
    const key = `${options.ruleKey}:${fqn}`;

    this.mismatches.push({
      violationKey: key,
      message: `${describeApiElement(options.violator)} ${fqn}: ${
        options.message
      }`,
      stability: options.violator.docs.stability ?? this.defaultStability,
    });
  }

  public *messages() {
    for (const mis of this.mismatches) {
      yield mis.message;
    }
  }

  public get count() {
    return this.mismatches.length;
  }

  public filter(pred: (x: ApiMismatch) => boolean): Mismatches {
    const ret = new Mismatches({ defaultStability: this.defaultStability });
    ret.mismatches.push(...this.mismatches.filter(pred));
    return ret;
  }

  public withMotivation(motivation: string): IReport {
    return {
      report: (options) =>
        this.report({
          ...options,
          message: `${options.message}: ${motivation}`,
        }),
      withMotivation: (innerMotivation) =>
        this.withMotivation(`${innerMotivation}: ${motivation}`),
    };
  }
}

export function apiElementIdentifier(apiElement: ApiElement) {
  return dispatch(apiElement, {
    method(x) {
      return `${x.parentType.fqn}.${x.name}`;
    },
    init(x) {
      return `${x.parentType.fqn}.${x.name}`;
    },
    property(x) {
      return `${x.parentType.fqn}.${x.name}`;
    },
    enumMember(x) {
      return `${x.enumType.fqn}.${x.name}`;
    },
    enumType(x) {
      return `${x.fqn}`;
    },
    klass(x) {
      return `${x.fqn}`;
    },
    iface(x) {
      return `${x.fqn}`;
    },
  });
}

function describeApiElement(apiElement: ApiElement) {
  return dispatch(apiElement, {
    method() {
      return 'METHOD';
    },
    init() {
      return 'INITIALIZER';
    },
    property() {
      return 'PROP';
    },
    enumMember() {
      return 'ENUM VALUE';
    },
    enumType() {
      return 'ENUM';
    },
    klass() {
      return 'CLASS';
    },
    iface() {
      return 'IFACE';
    },
  });
}

function dispatch<T>(
  apiElement: ApiElement,
  fns: {
    method(m: reflect.Method): T;
    init(m: reflect.Initializer): T;
    property(m: reflect.Property): T;
    enumMember(m: reflect.EnumMember): T;
    enumType(m: reflect.EnumType): T;
    klass(m: reflect.ClassType): T;
    iface(m: reflect.InterfaceType): T;
  },
) {
  if (apiElement instanceof reflect.Method) {
    return fns.method(apiElement);
  }
  if (apiElement instanceof reflect.Property) {
    return fns.property(apiElement);
  }
  if (apiElement instanceof reflect.EnumMember) {
    return fns.enumMember(apiElement);
  }
  if (apiElement instanceof reflect.ClassType) {
    return fns.klass(apiElement);
  }
  if (apiElement instanceof reflect.InterfaceType) {
    return fns.iface(apiElement);
  }
  if (apiElement instanceof reflect.Initializer) {
    return fns.init(apiElement);
  }
  if (apiElement instanceof reflect.EnumType) {
    return fns.enumType(apiElement);
  }

  // eslint-disable-next-line @typescript-eslint/no-base-to-string
  throw new Error(`Unrecognized violator: ${apiElement.toString()}`);
}

export function describeType(type: reflect.Type) {
  if (type.isClassType()) {
    return 'CLASS';
  }
  if (type.isInterfaceType()) {
    return 'IFACE';
  }
  if (type.isEnumType()) {
    return 'ENUM';
  }
  return 'TYPE';
}

export function describeInterfaceType(dataType: boolean) {
  return dataType ? 'struct' : 'regular interface';
}
