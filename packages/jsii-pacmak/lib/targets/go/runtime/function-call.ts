import {CodeMaker} from 'codemaker';
import {JSII_IMPL_MAP_TYPE} from './constants';
import {GoTypeMember} from "../types";

export abstract class FunctionCall {
  public constructor(public readonly parent: GoTypeMember) {}

  protected get implMap(): string[] {
    return this.parent.reference?.scopedImplMap(this.parent.parent.pkg) ?? [];
  }

  /**
   * Emits map of interface type to concrete struct type for use in runtime to
   * cast data to expected return type.
   */
  protected emitImplMapVal(code: CodeMaker) {
    if (this.implMap.length) {
      const [interfaceName, structName] = this.implMap;
      code.open(`${JSII_IMPL_MAP_TYPE}{`);

      // `reflect.TypeOf((*SomeType)(nil)).Elem()` is a reliable way to create
      // an instance of reflect.Type for any type. `(*SomeInterface)(nil)`
      // creates a "zero value" with the type `SomeInterface` which otherwise
      // has no way to instantiate.
      code.line(`reflect.TypeOf((*${interfaceName})(nil)).Elem(): reflect.TypeOf((*${structName})(nil)).Elem(),`);
      code.close('},');
    } else {
      code.line(`${JSII_IMPL_MAP_TYPE}{},`);
    }
  }

  protected get returnsVal(): boolean {
    return Boolean(this.parent.reference && !this.parent.reference.void);
  }

  protected get returnType(): string {
    return this.parent.returnType || 'interface{}';
  }
}
