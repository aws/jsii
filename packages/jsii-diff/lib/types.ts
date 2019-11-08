import reflect = require('jsii-reflect');
import { Stability } from 'jsii-spec';

export interface ComparisonOptions {
  /**
   * Whether to treat API elements as experimental if unmarked.
   *
   * @default Treat as stable
   */
  defaultExperimental?: boolean;
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

export class Mismatches {
  public readonly mismatches = new Array<ApiMismatch>();
  private readonly defaultStability: Stability;

  public constructor(opts: { defaultStability: Stability }) {
    this.defaultStability = opts.defaultStability;
  }

  public report(options: ReportOptions) {
    const fqn = identifier(options.violator);
    const key = `${options.ruleKey}:${fqn}`;

    this.mismatches.push({
      violationKey: key,
      message: `${describeApiElement(options.violator)} ${fqn}: ${options.message}`,
      stability: options.violator.docs.stability || this.defaultStability
    });
  }

  public* messages() {
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
}

function identifier(apiElement: ApiElement) {
  return dispatch(apiElement, {
    method(x) { return `${x.parentType.fqn}.${x.name}`; },
    init(x) { return `${x.parentType.fqn}.${x.name}`; },
    property(x) { return `${x.parentType.fqn}.${x.name}`; },
    enumMember(x) { return `${x.enumType.fqn}.${x.name}`; },
    enumType(x) { return `${x.fqn}`; },
    klass(x) { return `${x.fqn}`; },
    iface(x) { return `${x.fqn}`; },
  });
}

function describeApiElement(apiElement: ApiElement) {
  return dispatch(apiElement, {
    method() { return 'METHOD'; },
    init() { return 'INITIALIZER'; },
    property() { return 'PROP'; },
    enumMember() { return 'ENUM VALUE'; },
    enumType() { return 'ENUM'; },
    klass() { return 'CLASS'; },
    iface() { return 'IFACE'; },
  });
}

function dispatch<T>(apiElement: ApiElement, fns: {
  method(m: reflect.Method): T;
  init(m: reflect.Initializer): T;
  property(m: reflect.Property): T;
  enumMember(m: reflect.EnumMember): T;
  enumType(m: reflect.EnumType): T;
  klass(m: reflect.ClassType): T;
  iface(m: reflect.InterfaceType): T;
}) {

  if (apiElement instanceof reflect.Method) { return fns.method(apiElement); }
  if (apiElement instanceof reflect.Property) { return fns.property(apiElement); }
  if (apiElement instanceof reflect.EnumMember) { return fns.enumMember(apiElement); }
  if (apiElement instanceof reflect.ClassType) { return fns.klass(apiElement); }
  if (apiElement instanceof reflect.InterfaceType) { return fns.iface(apiElement); }
  if (apiElement instanceof reflect.Initializer) { return fns.init(apiElement); }
  if (apiElement instanceof reflect.EnumType) { return fns.enumType(apiElement); }

  throw new Error(`Unrecognized violator: ${apiElement}`);
}

export function describeType(type: reflect.Type) {
  if (type.isClassType()) { return 'CLASS'; }
  if (type.isInterfaceType()) { return 'IFACE'; }
  if (type.isEnumType()) { return 'ENUM'; }
  return 'TYPE';
}
