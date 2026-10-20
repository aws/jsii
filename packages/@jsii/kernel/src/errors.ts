export const enum JsiiErrorType {
  JSII_FAULT = '@jsii/kernel.Fault',
  RUNTIME_ERROR = '@jsii/kernel.RuntimeError',
}

export interface JsiiError extends Error {
  readonly name: JsiiErrorType;
}

export class JsiiFault extends Error implements JsiiError {
  public readonly name = JsiiErrorType.JSII_FAULT;
  public constructor(message: string) {
    super(message);
  }
}

export class RuntimeError extends Error implements JsiiError {
  public readonly name = JsiiErrorType.RUNTIME_ERROR;
  public constructor(message: string) {
    super(message);
  }
}
