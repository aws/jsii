import { CodeMaker } from 'codemaker';
import {
  GoStruct,
  GoClassConstructor,
  GoProperty,
  ClassMethod,
  StaticMethod,
  Struct,
} from './types';
import { EmitContext } from './emit-context';
import { RootPackage } from './package';

// Embedded JS Module Naming Constants
export const JSII_EMBEDDED_LOAD_MODULE_NAME = 'jsii';
export const JSII_EMBEDDED_LOAD_FN = `Initialize`;

// JSII go runtime module name
export const JSII_MODULE_NAME = 'github.com/aws-cdk/jsii/jsii-experimental';
export const JSII_RT_ALIAS = '__JSII__';

// JSII runtime library constants and functions
export const GO_ANY = `${JSII_RT_ALIAS}.Any`;
export const JSII_OVERRIDE = `${JSII_RT_ALIAS}.Override`;
export const JSII_OBJ_REF_STRUCT = `${JSII_RT_ALIAS}.ObjRef`;

// JSII obj instance ID utils
export const JSII_OBJ_IFACE = `${JSII_RT_ALIAS}.JsiiObj`;
export const JSII_OBJ_IFACE_METHOD = `GetInstanceId`;
export const JSII_OBJ_IFACE_PROPERTY = `jsiiObjInstanceId`;

// JSII runtime load calls
export const JSII_LOAD_FN = `${JSII_RT_ALIAS}.Load`;
export const JSII_LOAD_REQUEST = `${JSII_RT_ALIAS}.LoadRequest`;

// JSII runtime object creation
export const JSII_CREATE_FN = `${JSII_RT_ALIAS}.Create`;
export const JSII_CREATE_REQUEST = `${JSII_RT_ALIAS}.CreateRequest`;
export const JSII_CREATE_RESPONSE = `${JSII_RT_ALIAS}.CreateResponse`;

// JSII runtime object property access
export const JSII_GET_FN = `${JSII_RT_ALIAS}.Get`;
export const JSII_GET_REQUEST = `${JSII_RT_ALIAS}.GetRequest`;
export const JSII_GET_RESPONSE = `${JSII_RT_ALIAS}.GetResponse`;

// JSII method invocation
export const JSII_INVOKE_FN = `${JSII_RT_ALIAS}.Invoke`;
export const JSII_INVOKE_REQUEST = `${JSII_RT_ALIAS}.InvokeRequest`;
export const JSII_INVOKE_RESPONSE = `${JSII_RT_ALIAS}.InvokeResponse`;

export const JSII_STATIC_INVOKE_FN = `${JSII_RT_ALIAS}.StaticInvoke`;
export const JSII_STATIC_INVOKE_REQUEST = `${JSII_RT_ALIAS}.StaticInvokeRequest`;

// NOOP type returns
const NOOP_RETURN_MAP: { [type: string]: string } = {
  float64: '0.0',
  string: '"NOOP_RETURN_STRING"',
  bool: 'true',
};

function emitPanicErr(code: CodeMaker, errName = 'err') {
  code.open(`if ${errName} != nil {`);
  code.line(`panic(err)`);
  code.close(`}`);
}

export class ModuleLoad {
  public constructor(
    public readonly name: string,
    public readonly version: string,
    public readonly pkg: RootPackage,
  ) {}

  public emit({ code }: EmitContext) {
    const file = `${JSII_EMBEDDED_LOAD_MODULE_NAME}/${JSII_EMBEDDED_LOAD_MODULE_NAME}.go`;
    code.openFile(file);

    code.line(`package ${JSII_EMBEDDED_LOAD_MODULE_NAME}`);
    code.line();

    code.open('import (');
    code.line(`${JSII_RT_ALIAS} ${JSON.stringify(JSII_MODULE_NAME)}`);
    for (const dep of this.pkg.packageDependencies) {
      code.line(
        `${dep.packageName} "${dep.moduleName}/${dep.packageName}/${JSII_EMBEDDED_LOAD_MODULE_NAME}"`,
      );
    }
    code.line('"io/ioutil"');
    code.line('"sync"');
    code.close(')');
    code.line();

    code.line(`var once sync.Once`);
    code.open(`func ${JSII_EMBEDDED_LOAD_FN}() {`);

    code.open(`once.Do(func() {`);

    // Load dependencies
    for (const dep of this.pkg.packageDependencies) {
      code.line(`${dep.packageName}.${JSII_EMBEDDED_LOAD_FN}()`);
    }
    code.line();

    code.line(`tmpfile, err := ioutil.TempFile("", "*.tgz")`);
    emitPanicErr(code);
    // code.line(`defer os.Remove(tmpfile.Name())`);

    code.open('if _, err := tmpfile.Write(tarball); err != nil {');
    emitPanicErr(code);
    code.close(`}`);

    code.open(`if err := tmpfile.Close(); err != nil {`);
    emitPanicErr(code);
    code.close(`}`);

    code.open(`_, err = ${JSII_LOAD_FN}(${JSII_LOAD_REQUEST} {`);

    code.line(`Api: "load",`);
    code.line(`Name: "${this.name}",`);
    code.line(`Version: "${this.version}",`);
    code.line(`Tarball: tmpfile.Name(),`);

    code.close(`})`);

    emitPanicErr(code);

    code.close(`})`);

    code.close(`}`);
    code.line();

    code.closeFile(file);
  }
}

export class MethodCall {
  public constructor(public readonly parent: ClassMethod) {}

  public get pkg() {
    return this.parent.pkg;
  }

  public emit(code: CodeMaker) {
    this.pkg.emitLibLoad(code);
    code.open(`_, err := ${JSII_INVOKE_FN}(${JSII_INVOKE_REQUEST} {`);

    code.line(`Api: "invoke",`);
    code.line(`Method: "${this.parent.method.name}",`);
    code.line(`Args: ${this.argsString},`);

    code.open(`ObjRef: ${JSII_OBJ_REF_STRUCT} {`);
    code.line(
      `JsiiInstanceId: ${this.parent.instanceArg}.${JSII_OBJ_IFACE_METHOD}(),`,
    );
    code.close(`},`);

    code.close(`})`);
    emitPanicErr(code);

    this.emitReturnStatement(code);
  }

  private getDummyReturn(type: string): string {
    return NOOP_RETURN_MAP[type] || 'nil';
  }

  protected emitReturnStatement(code: CodeMaker) {
    const ret = this.parent.reference;
    if (ret?.void) {
      // don't emit a return statement if function doesn't return a value
      return;
    } else if (ret?.type?.type.isClassType() || ret?.type instanceof Struct) {
      code.line(`return ${this.parent.returnType}{}`);
    } else if (ret?.type?.type.isEnumType()) {
      code.line(`return "ENUM_DUMMY"`);
    } else {
      code.line(`return ${this.getDummyReturn(this.parent.returnType)}`);
    }
  }

  public get argsString(): string {
    const argsList = this.parent.parameters
      .map((param) => param.name)
      .join(', ');
    return `[]interface{}{${argsList}}`;
  }
}

export class StaticMethodCall extends MethodCall {
  public constructor(public readonly parent: StaticMethod) {
    super(parent);
  }

  public emit(code: CodeMaker) {
    this.pkg.emitLibLoad(code);
    code.open(
      `_, err := ${JSII_STATIC_INVOKE_FN}(${JSII_STATIC_INVOKE_REQUEST} {`,
    );

    code.line(`Api: "sinvoke",`);
    code.line(`Fqn: "${this.parent.parent.fqn}",`);
    code.line(`Method: "${this.parent.method.name}",`);
    code.line(`Args: ${this.argsString},`);

    code.close(`})`);
    emitPanicErr(code);

    this.emitReturnStatement(code);
  }
}

export abstract class RuntimeFnCall {}

export class ClassConstructor extends RuntimeFnCall {
  public constructor(public readonly parent: GoClassConstructor) {
    super();
  }

  public emit(code: CodeMaker) {
    this.pkg.emitLibLoad(code);
    code.open(`res, err := ${JSII_CREATE_FN}(${JSII_CREATE_REQUEST} {`);

    code.line(`Api: "create",`);
    code.line(`Fqn: "${this.parent.parent.fqn}",`);
    code.line(`Interfaces: ${this.interfacesString},`);
    code.line(`Args: ${this.argsString},`);
    code.line(`Overrides: []${JSII_OVERRIDE}{},`);

    code.close(`})`);

    emitPanicErr(code);
    code.line(`ret := ${this.parent.parent.name}{}`);
    code.line(`ret.jsiiObjInstanceId = res.JsiiInstanceId`);

    code.line(`return &ret`);
  }

  public get pkg() {
    return this.parent.pkg;
  }

  public get interfacesString(): string {
    const iFaceList = this.parent.parent.interfaces
      .map((iFace) => `"${iFace}"`)
      .join(', ');
    return `[]string{${iFaceList}}`;
  }

  public get argsString(): string {
    const argsList = this.parent.parameters
      .map((param) => param.name)
      .join(', ');
    return `[]interface{}{${argsList}}`;
  }
}

export class JsiiObjImpl {
  public constructor(public readonly parent: GoStruct) {}

  public emit({ code }: EmitContext) {
    code.open(
      `func (obj *${this.parent.name}) ${JSII_OBJ_IFACE_METHOD}() string {`,
    );
    code.line(`return obj.${JSII_OBJ_IFACE_PROPERTY}`);
    code.close(`}`);
    code.line();
  }
}

export class GetProperty {
  public constructor(public readonly parent: GoProperty) {}

  public get pkg() {
    return this.parent.pkg;
  }

  public emit({ code }: EmitContext) {
    this.pkg.emitLibLoad(code);
    code.open(`_, err := ${JSII_GET_FN}(${JSII_GET_REQUEST} {`);
    code.line(`Api: "get",`);
    code.line(`Property: "${this.parent.property.name}",`);

    code.open(`ObjRef: ${JSII_OBJ_REF_STRUCT} {`);
    code.line(
      `JsiiInstanceId: ${this.parent.instanceArg}.${JSII_OBJ_IFACE_METHOD}(),`,
    );
    code.close(`},`);

    code.close(`})`);
    emitPanicErr(code);
  }
}
