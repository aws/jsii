export const TOKEN_REF = '$jsii.byref';
export const TOKEN_DATE = '$jsii.date';
export const TOKEN_ENUM = '$jsii.enum';

export interface ObjRef {
  [TOKEN_REF]: string;
}

export function isObjRef(value: any): value is ObjRef {
  return typeof value === 'object' && value !== null && TOKEN_REF in value;
}

export interface WireDate {
  [TOKEN_DATE]: string;
}

export function isWireDate(value: any): value is WireDate {
  return typeof value === 'object' && value !== null && TOKEN_DATE in value;
}

export interface WireEnum {
  [TOKEN_ENUM]: string;
}

export function isWireEnum(value: any): value is WireEnum {
  return typeof value === 'object' && value !== null && TOKEN_ENUM in value;
}

export type Override = MethodOverride | PropertyOverride;

export interface MethodOverride {
  method: string;
  cookie?: string;
}

export function isMethodOverride(value: Override): value is MethodOverride {
  return (value as any).method != null;  // Python passes "null"
}

export interface PropertyOverride {
  property: string;
  cookie?: string;
}

export function isPropertyOverride(value: Override): value is PropertyOverride {
  return (value as any).property != null;  // Python passes "null"
}

export interface Callback {
  cbid: string;
  cookie: string | undefined;
  invoke?: InvokeRequest;
  get?: GetRequest;
  set?: SetRequest;
}

export interface HelloResponse {
  hello: string;
}

export interface LoadRequest {
  /** The name of the assembly */
  name: string;

  /** Assembly version */
  version: string;

  /** The tarball of the package */
  tarball: string;
}

export interface LoadResponse {
  assembly: string;
  types: number;
}

export interface CreateRequest {
  fqn: string;
  args?: any[];
  overrides?: Override[];
}

/* eslint-disable @typescript-eslint/no-empty-interface */
export interface CreateResponse extends ObjRef {}
/* eslint-enable @typescript-eslint/no-empty-interface */

export interface DelRequest {
  objref: ObjRef;
}

/* eslint-disable @typescript-eslint/no-empty-interface */
export interface DelResponse {}
/* eslint-enable @typescript-eslint/no-empty-interface */

export interface GetRequest {
  objref: ObjRef;
  property: string;
}

export interface StaticGetRequest {
  fqn: string;
  property: string;
}

export interface GetResponse {
  value: any;
}

export interface StaticSetRequest {
  fqn: string;
  property: string;
  value: any;
}

export interface SetRequest {
  objref: ObjRef;
  property: string;
  value: any;
}

/* eslint-disable @typescript-eslint/no-empty-interface */
export interface SetResponse { }
/* eslint-enable @typescript-eslint/no-empty-interface */

export interface StaticInvokeRequest {
  fqn: string;
  method: string;
  args?: any[];
}

export interface InvokeRequest {
  objref: ObjRef;
  method: string;
  args?: any[];
}

export interface InvokeResponse {
  result: any;
}

export interface BeginRequest {
  objref: ObjRef;
  method: string;
  args?: any[];
}

export interface BeginResponse {
  promiseid: string;
}

export interface EndRequest {
  promiseid: string;
}

export interface EndResponse {
  result: any;
}

/* eslint-disable @typescript-eslint/no-empty-interface */
export interface CallbacksRequest { }
/* eslint-enable @typescript-eslint/no-empty-interface */

export interface CallbacksResponse {
  callbacks: Callback[];
}

export interface CompleteRequest {
  cbid: string;
  err?: string;
  result?: any;
}

export interface CompleteResponse {
  cbid: string;
}

export interface NamingRequest {
  assembly: string;
}

export interface NamingResponse {
  naming: { [language: string]: { [key: string]: any } | undefined };
}

/* eslint-disable @typescript-eslint/no-empty-interface */
export interface StatsRequest { }
/* eslint-enable @typescript-eslint/no-empty-interface */

export interface StatsResponse {
  objectCount: number;
}

export type KernelRequest =
    LoadRequest |
    CreateRequest |
    DelRequest |
    GetRequest |
    SetRequest |
    InvokeRequest |
    BeginRequest |
    EndRequest |
    CallbacksRequest |
    CompleteRequest |
    NamingRequest |
    StatsRequest;

export type KernelResponse =
    HelloResponse |
    LoadResponse |
    CreateResponse |
    DelResponse |
    GetResponse |
    SetResponse |
    InvokeResponse |
    BeginResponse |
    EndResponse |
    CallbacksResponse |
    CompleteResponse |
    NamingResponse |
    StatsResponse;

export interface OkayResponse {
  ok: any;
}

export interface ErrorResponse {
  error: string;
  stack?: string;
}
