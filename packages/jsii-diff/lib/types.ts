import reflect = require('jsii-reflect');
import spec = require('jsii-spec');

export interface ComparisonContext {
  /**
   * Whether to treat API elements as stable if unmarked.
   *
   * @default false
   */
  defaultStable?: boolean;

  /**
   * Whether to assume the user has written code that will read structs
   *
   * Structs are normally analyzed according to their input/output position
   * in the APIs (whether they appear as argument types or as return types),
   * and we will assume that no user has written code to read a struct that
   * otherwise only appears in input position in the API.
   *
   * Setting this to 'true' treats all input structs as output structs at the
   * same type (meaning, for example, they cannot make previously required
   * arguments optional).
   *
   * @default false
   */
  assumeStructReaders?: boolean;

  /**
   * Where to report errors
   */
  mismatches: Mismatches;
}

export interface ApiMismatch {
  message: string;
  type: reflect.Type;
}

export class Mismatches {
  public mismatches = new Array<ApiMismatch>();

  public report(type: reflect.Type, message: string) {
    this.mismatches.push({ message, type });
  }

  public* messages() {
    for (const mis of this.mismatches) {
      yield `${describeType(mis.type)} ${mis.type.fqn} ${mis.message}`;
    }
  }

  public get count() {
    return this.mismatches.length;
  }
}

export function describeType(type: reflect.Type) {
  if (type.isClassType()) { return 'CLASS'; }
  if (type.isInterfaceType()) { return 'IFACE'; }
  if (type.isEnumType()) { return 'ENUM'; }
  return 'TYPE';
}

export function shouldInspect(context: ComparisonContext): (x: reflect.Documentable) => boolean {
  return x => x.docs.stability === spec.Stability.Stable || (x.docs.stability === undefined && !!context.defaultStable);
}