export const TOKEN_REF = '$jsii.byref';
export const TOKEN_INTERFACES = '$jsii.interfaces';
export const TOKEN_DATE = '$jsii.date';
export const TOKEN_ENUM = '$jsii.enum';
export const TOKEN_MAP = '$jsii.map';
export const TOKEN_STRUCT = '$jsii.struct';

export interface ObjRef {
  readonly [TOKEN_REF]: string;
  [TOKEN_INTERFACES]?: readonly string[];
}

export function isObjRef(value: any): value is ObjRef {
  return typeof value === 'object' && value !== null && TOKEN_REF in value;
}

export interface WireDate {
  readonly [TOKEN_DATE]: string;
}

export function isWireDate(value: any): value is WireDate {
  return typeof value === 'object' && value !== null && TOKEN_DATE in value;
}

export interface WireEnum {
  readonly [TOKEN_ENUM]: string;
}

export function isWireEnum(value: any): value is WireEnum {
  return typeof value === 'object' && value !== null && TOKEN_ENUM in value;
}

export interface WireMap {
  readonly [TOKEN_MAP]: { readonly [key: string]: any };
}

export function isWireMap(value: any): value is WireMap {
  return typeof value === 'object' && value !== null && TOKEN_MAP in value;
}

export interface WireStruct {
  readonly [TOKEN_STRUCT]: {
    readonly fqn: string;
    readonly data: { [key: string]: any };
  };
}

export function isWireStruct(value: any): value is WireStruct {
  return typeof value === 'object' && value !== null && TOKEN_STRUCT in value;
}

export type Override = MethodOverride | PropertyOverride;

export interface MethodOverride {
  readonly method: string;
  readonly cookie?: string;
}

export function isMethodOverride(value: Override): value is MethodOverride {
  return (value as any).method != null; // Python passes "null"
}

export interface PropertyOverride {
  readonly property: string;
  readonly cookie?: string;
}

export function isPropertyOverride(value: Override): value is PropertyOverride {
  return (value as any).property != null; // Python passes "null"
}

export interface Callback {
  readonly cbid: string;
  readonly cookie: string | undefined;
  readonly invoke?: InvokeRequest;
  readonly get?: GetRequest;
  readonly set?: SetRequest;
}

export interface HelloResponse {
  readonly hello: string;
}

export interface LoadRequest {
  /** The name of the assembly */
  readonly name: string;

  /** Assembly version */
  readonly version: string;

  /** The tarball of the package */
  readonly tarball: string;
}

export interface LoadResponse {
  readonly assembly: string;
  readonly types: number;
}

export interface InvokeScriptRequest {
  readonly assembly: string;
  readonly script: string;
  readonly args?: string[];
}

export interface InvokeScriptResponse {
  readonly status: number | null;
  readonly stdout: string;
  readonly stderr: string;
  readonly signal: string | null;
}

export interface CreateRequest {
  /**
   * The FQN of the class of which an instance is requested (or "Object")
   */
  readonly fqn: string;

  /**
   * The FQNs of interfaces the instance implements, if any. Declaring
   * interfaces that the class denoted by `fqn` implements is not necessary.
   * This means that memebers of interfaces found in this property should
   * declare members that are found in the `overrides` property.
   */
  readonly interfaces?: string[];

  /**
   * Arguments to pass to the constructor of `fqn`. ("Object" accepts none)
   */
  readonly args?: any[];

  /**
   * Declarations of method overrides that should trigger callbacks
   */
  readonly overrides?: Override[];
}

export type CreateResponse = ObjRef;

export interface DelRequest {
  readonly objref: ObjRef;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface DelResponse {}

export interface GetRequest {
  readonly objref: ObjRef;
  readonly property: string;
}

export interface StaticGetRequest {
  readonly fqn: string;
  readonly property: string;
}

export interface GetResponse {
  readonly value: any;
}

export interface StaticSetRequest {
  readonly fqn: string;
  readonly property: string;
  readonly value: any;
}

export interface SetRequest {
  readonly objref: ObjRef;
  readonly property: string;
  readonly value: any;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SetResponse {}

export interface StaticInvokeRequest {
  readonly fqn: string;
  readonly method: string;
  readonly args?: any[];
}

export interface InvokeRequest {
  readonly objref: ObjRef;
  readonly method: string;
  readonly args?: any[];
}

export interface InvokeResponse {
  readonly result: any;
}

export interface BeginRequest {
  readonly objref: ObjRef;
  readonly method: string;
  readonly args?: any[];
}

export interface BeginResponse {
  readonly promiseid: string;
}

export interface EndRequest {
  readonly promiseid: string;
}

export interface EndResponse {
  readonly result: any;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CallbacksRequest {}

export interface CallbacksResponse {
  readonly callbacks: Callback[];
}

export interface CompleteRequest {
  readonly cbid: string;
  readonly err?: string;
  readonly result?: any;
}

export interface CompleteResponse {
  readonly cbid: string;
}

export interface NamingRequest {
  readonly assembly: string;
}

export interface NamingResponse {
  readonly naming: {
    readonly [language: string]: { readonly [key: string]: any } | undefined;
  };
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface StatsRequest {}

export interface StatsResponse {
  readonly objectCount: number;
}

export type KernelRequest =
  | LoadRequest
  | CreateRequest
  | DelRequest
  | GetRequest
  | SetRequest
  | InvokeRequest
  | BeginRequest
  | EndRequest
  | CallbacksRequest
  | CompleteRequest
  | NamingRequest
  | StatsRequest;

export type KernelResponse =
  | HelloResponse
  | LoadResponse
  | CreateResponse
  | DelResponse
  | GetResponse
  | SetResponse
  | InvokeResponse
  | BeginResponse
  | EndResponse
  | CallbacksResponse
  | CompleteResponse
  | NamingResponse
  | StatsResponse;

export interface OkayResponse {
  readonly ok: any;
}

export interface ErrorResponse {
  readonly error: string;
  readonly stack?: string;
}
