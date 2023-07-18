# The _jsii_ kernel API

This document describes the API for the `@jsii/kernel` module, which is to be used by all _host_ libraries. It provides
the fundamental features necessary for _host_ processes to interact with the original module's code.

!!! note
    Currently, `@jsii/kernel` contains the bulk of the logic, however a separate `@jsii/runtime` package owns the
    dialogue between the _host_ and _kernel_ processes. The `@jsii/runtime` is a very thin glue layer and it will
    eventually be merged into `@jsii/kernel`.

## Errors

Most of the calls described in this document may result in an error being raised. It is the responsibility of the _host_
runtime library to deal with such errors correctly: action retries, propagate the error to the _host_ app's code, and so
on.

Error responses are signaled by the `error` key:

```ts
export interface ErrorResponse {
  /** A simple message describing what happened. */
  message: string;
  /** Whenever possible, the stack trace of the error. */
  stack?: string;
}
```

Where possible, the _host_ runtime libraries should make sure to affix their own stack trace information where relevant
to the _kernel_ process's stack trace when such errors are propagated to _host_ app's code, in order to offer as much
relevant context information as possible.

## Initialization - the `hello` message

The _host_ library is responsible for spawning the `node` process that will run the original module's code. This `node`
process runs the `@jsii/kernel` application, and API messages are exchanged via the `node` processes' standard input and
output pipes.

Upon initialization, the `@jsii/kernel` process introduces itself to the _host_ application by emitting a single JSON
message:

```json
{
  "hello": "@jsii/runtime@0.21.1"
}
```

Any additional key present on the `hello` message will be silently ignored by a _host_ library that does not know how to
process it, ensuring forward compatibility of this message, if and when new attributes are added.

!!! note
    In the future, this message may be augmented with additional keys to enable feature negotiation between the _host_
    application and the `@jsii/kernel`.

## Teardown - the `exit` message

The _host_ library should send the `exit` message when it no longer needs the `@jsii/kernel`. This message enables the
`@jsii/kernel` to trigger clean-up operations, such as getting rid of temporary directories, in order to avoid littering
the temporary directory with leftover files.

The `exit` message has the following schema:

```ts
interface Exit {
  /** The exit code the `@jsii/kernel` process should return. Typically `0`. */
  readonly exit: number;
}
```

!!! danger "Important"
    Once the `exit` message has been sent, no more data should be sent through to the `@jsii/kernel` process. The
    request stream should be closed as soon as the `exit` message was sent. Additional data may however be received from
    the `@jsii/kernel` that is intended to the `STDOUT` or `STDERR` console streams.

## General Kernel API

Once the `hello` handshake is complete, a sequence of request and responses are exchanged with the `@jsii/kernel`.
Requests take the form of JSON-encoded messages that all follow the following pattern:

```ts
interface Request {
  /**
   * This field discriminates the various request types.
   */
  api:
    | 'load' // Loading jsii assemblies into the Kernel
    | 'naming' // Obtaining naming information for loaded assemblies
    | 'stats' // Obtaining statistics about the Kernel usage
    | 'create' // Creating objects
    | 'del' // Destroying objects
    | 'invoke'
    | 'sinvoke' // Invoking methods (and static methods)
    | 'get'
    | 'sget' // Invoking getters (and static getters)
    | 'set'
    | 'sset' // Invoking setters (and static setters)
    | 'begin'
    | 'end'; // Asynchronous method invocation

  // ... request-type specific fields ...
}
```

### Loading _jsii_ assemblies into the Kernel

Before any _jsii_ type can be used, the assembly that provides it must be loaded into the kernel. Similarly, all
dependencies of a given _jsii_ module must have been loaded into the kernel before the module itself can be loaded (the
`@jsii/kernel` does not perform any kind of dependency resolution).

Loading new assemblies into the `@jsii/kernel` is done using the `load` API:

```ts
interface LoadRequest {
  /** The name of the assembly being loaded */
  name: string;
  /** The version of the assembly being loaded */
  version: string;
  /** The local path to the npm package for the assembly */
  tarball: string;

  // The discriminator
  api: 'load';
}
```

The response to the `load` call provides some high-level information pertaining to the loaded assembly, which may be
used by the _host_ app to validate the result of the operation:

```ts
interface LoadResponse {
  /** The name of the assembly that was just loaded */
  assembly: string;
  /** The number of types the assembly declared */
  types: number;
}
```

Once a module is loaded, all the types it declares immediately become available.

### Obtaining naming information for loaded assemblies

In certain cases, _host_ runtime libraries may need to obtain naming information from assemblies in order to determine
the translation table from a _jsii_ fully-qualified name to a _host_-native name. This can be retrieved using the
`naming` call:

```ts
export interface NamingRequest {
  /** The name of the assembly for which naming is requested */
  assembly: string;

  // The discriminator
  api: 'naming';
}
```

In response to the `naming` call, the `@jsii/kernel` returns the configuration block for each language supported by the
named `assembly`:

```ts
export interface NamingResponse {
  /** The naming information for the requested assembly. */
  naming: {
    /**
     * For each language, provides the jsii configuration block. The content of
     * this configuration block is specified by each language implementation.
     */
    [language: string]: { [key: string]: any };
  };
}
```

### Obtaining statistics about the Kernel usage

The `stats` call can be used to obtain information about the current `Kernel` instance, which can be leveraged by unit
tests or in order to produce metrics for tracking the health of a long-running _jsii_ app.

```ts
export interface StatsRequest {
  // The discriminator
  api: 'stats';
}
```

The response to the `stats` call contains synthetic information about the current state of the `Kernel`:

```ts
export interface StatsResponse {
  /** The number of object reference currently tracked by the Kernel */
  objectCount: number;
}
```

### Creating objects

Most _jsii_ workflows start with creating instances of objects. This can mean creating a pure **JavaScript** object,
instantiating a sub-class of some **JavaScript** class, or even creating a pure-_host_ instance that implements a
collection of _behavioral interfaces_.

Creating objects is achieved using the `create` API, which accepts the following parameters:

```ts
interface CreateRequest {
  /** The jsii fully qualified name of the class */
  fqn: string;
  /** Any arguments to provide to the constructor */
  args?: any[];
  /** Additional interfaces implemented in the host app */
  interfaces?: string[];
  /** Any methods or property overridden in the host app */
  overrides?: Override[];

  // The discriminator
  api: 'create';
}
```

The response to the object call is a decorated `ObjectReference` object (which is a common parameter to other calls in
the `@jsii/kernel` API, used to refer to a particular instance):

```ts
interface ObjectReference {
  /** A handle that uniquely idenfies an instance */
  '$jsii.byref': string;
}

interface CreateResponse extends ObjectReference {
  /** The list of interfaces implemented by the instance */
  '$jsii.interfaces'?: string[];
}
```

The value of the `'$jsii.byref'` field of the `ObjectReference` type is formatted in the following way:

```
@aws-cdk/core.Stack@10003
└────────┬────────┘ └─┬─┘
         │            └─ Opaque numeric identifier
         └─ Object instance's base class' jsii fully qualified name
```

The first part of the reference identifier can have the special un-qualified value `Object` to denote the absence of a
_jsii_-known base class (for example when the object _only_ implements a _jsii_ interface).

#### Additional Interfaces

Sometimes, the _host_ app will extend a _jsii_ class and implement new _jsii_ interfaces that were not present on the
original type. Such interfaces must be declared by providing their _jsii_ fully qualified name as an entry in the
`interfaces` list.

Providing interfaces in this list that are implicitly present from another delcaration (either because they are already
implemented by the class denoted by the `fqn` field, or because another entry in the `interfaces` list extends it) is
valid, but not necessary. The `@jsii/kernel` is responsible for correctly handling redundant declarations.

!!! danger
    While declared `interfaces` may contain redundant declarations of members already declared by other `interfaces` or
    by the type denoted by `fqn`, undefined behavior results if any such declaration is not identical to the others
    (e.g: property `foo` declared with type `boolean` on one of the `interfaces`, and with type `string` on another).

#### Overrides

For any method that is implemented or overridden from the _host_ app, the `create` call must specify an `override`
entry. This will inform the Kernel that calls to these methods must be relayed to the _host_ app for execution, instead
of executing the original library's version.

An optional `cookie` string can be provided. This string will be recorded on the **Javascript** proxying implementation,
and will be provided to the **host** app with any _callback_ request. This information can be used, for example, to
improve the performance of implementation lookups in the _host_ app, where the necessary reflection calls would
otherwise be prohibitively expensive.

Override declarations adhere to the following schema:

```ts
interface MethodOverride {
  /** The name of the overridden method */
  method: string;
  /** An arbitrary override cookie string */
  cookie?: string;
}

interface PropertyOverride {
  /** The name of the overridden property */
  property: string;
  /** An arbitrary override cookie string */
  cookie?: string;
}

type Override = MethodOverride | PropertyOverride;
```

#### A note about callbacks

All `@jsii/runtime` calls that interact with object instances (that is, any call except for `load`, `naming` and
`stats`; as well as the `del` call since _jsii_ does not support customized destructors or finalizers) may result in the
need to execute code that is defined in the _host_ app, when the code path traverses a method or property that was
implemented or overridden in the _host_ app.

Such cases will result in a callback request substituting itself to the response of the original call being made;
execution of which will resume once the callback response is provided.

A callback request is sent from the `@jsii/kernel`'s `node` process to the _host_ app and has the following schema:

```ts
interface CallbackRequest {
  /** Callback requests are identified by the presence of the `callback` key */
  callback: Callback;
}

interface CallbackBase {
  /** A unique identifier for this callback request */
  cbid: string;
  /** The object on which the callback must be executed */
  objref: ObjectReference;
  /** The callback cookie, if one was specified */
  cookie?: string;
}

interface InvokeCallback extends CallbackBase {
  /** The name of the host method to be invoked */
  method: string;
}

interface GetCallback extends CallbackBase {
  /** The name of the property to be read */
  property: string;
}

interface SetCallback extends CallbackBase {
  /** The name of the property to be written to */
  property: string;
  /** The value to be set */
  value: any;
}

type Callback = InvokeCallback | GetCallback | SetCallback;
```

In order to fulfill the callback request, the _host_ app may need to perform futher API calls (loading new assemblies,
creating new instances, invoking methods - including delegating to the `super` implementation, ...). Such calls will
behave as they otherwise would (including the possible introduction of further callback requests).

Once the _host_ app has fulfilled the request, it must signal the result of that execution back to the `@jsii/kernel`
process by using the `complete` call:

```ts
interface CompleteBase {
  /** The callback ID from the corresponding request */
  cbid: string;

  // The discriminator
  api: `complete`;
}

interface CallbackSuccess extends CompleteBase {
  /** The result of the execution (`undefined` if void) */
  result: any;
}

interface CallbackFailure extends CompleteBase {
  /** The error that was raised during fulfillment */
  err: string;
}

type CompleteRequest = CallbackSuccess | CallbackFailure;
```

As discussed earlier, the response to the `complete` call is the result of resuming execution of the code path that
triggered the callback request. This may be another callback request, or the final result of that call.

The `callbacks` call may be used to determine the list of all outstanding callback requests:

```ts
interface CallbacksRequest {
  // The discriminator
  api: 'callbacks';
}
```

This call results in a list of outstanding callbacks:

```ts
interface CallbacksResponse {
  /** The list of outstanding callback requests */
  callbacks: Callback[];
}
```

### Destroying Objects

Once the _host_ app no longer needs a particular object, it can be discarded. This can happen for example when the
_host_ reference to an object is garbage collected or freed. In order to allow the **JavaScript** process to also
reclaim the associated memory footprint, the `del` API must be used:

```ts
interface DelRequest {
  /** The object reference that can be released */
  objref: ObjectReference;

  // The discriminator
  api: 'del';
}
```

!!! danger
    Failure to use the `del` API will result in memory leakage as the **JavaScript** process accumulates garbage in its
    Kernel instance. This can eventually result in a _Javascript heap out of memory_ error, and the abnormal termination
    of the `node` process, and consequently of the _host_ app.

!!! bug "Unimplemented"
    The existing _host_ runtime libraries do not implement this behavior!

!!! question
    There is currently no provision for the `node` process to inform the _host_ app about object references it dropped.
    This mechanism is necessary in order to support garbage collection of resources that involve _host_-implemented code
    (in such cases, the _host_ app must hold on to any instance it passed to **JavaScript** until it is no longer
    reachable from there).

Upon successfully deleting an object reference, the `@jsii/kernel` will return an empty response object:

```ts
export interface DelResponse {}
```

### Invoking methods (and static methods)

Invoking methods is done via the `invoke` call:

```ts
interface InvokeRequest {
  /** The object reference on which a method is invoked */
  objref: ObjectReference;
  /** The name of the method being invoked */
  method: string;
  /** Any arguments passed to the method invocation */
  args?: any[];

  // The discriminator
  api: 'invoke';
}
```

Static method invocations do not have a receiving instance, and instead are implemented by way of the `sinvoke` call:

```ts
interface StaticInvokeRequest {
  /** The jsii fully qualified name of the declaring type */
  fqn: string;
  /** The name of the static method being invoked */
  method: string;
  /** Any arguments passed to the method invocation */
  args?: any[];

  // The discriminator
  api: 'sinvoke';
}
```

Note that, unlike in certain programming languages such as **Java**, it is illegal to attempt invoking a static method
on the static type of some instance using the `invoke` call. All static invocations _must_ be done using `sinvoke`.

Both the `invoke` and `sinvoke` calls result in the same response:

```ts
interface InvokeResponse {
  /** The result of the method invocation. */
  result: any;
}
```

When the method's return type is `void`, the `result` value should typically be `undefined`, however it may not be ??
(**TypeScript** may in certain circumstances allow returning a value from a `void` method): the _host_ app should ignore
such values.

#### Asynchronous method invocation

!!! bug "Largely un-tested"
    Asynchronous operations are only partially supported in the various target languages, and is currently not widely
    used. As such, support is not as "battle-tested" as the rest of the jsii interoperability features, and customers
    may run into usability issues, unexpected bugs, or surprising behaviors when using async.

    In particular, outstanding `Promise`s may not be able to make progress as expected due to specific implementation
    details of the `@jsii/runtime` event loop, which can result in deadlock situations.

The `invoke` call can only be used to invoke _synchronous_ methods. In order to invoke _asynchronous_ methods, the
`begin` and `end` calls must be used instead. Once the _host_ app has entered a synchronous workflow (after it makes
an `invoke` call), and until it has completed that synchronous operation (after all callbacks have been handled and the
`InvokeResponse` has been received), no _asynchronous_ operation may be initiated by the host app.

```ts
interface BeginRequest {
  /** The object reference on which an asynchronous method is invoked */
  objref: ObjectReference;
  /** The name of the method being invoked */
  method: string;
  /** Any arguments passed to the method invocation */
  args?: any[];

  // The discriminator
  api: 'begin';
}
```

!!! question
    There is no static form of this call. Should there be one?

The `begin` call results in a promise being made:

```ts
interface BeginResponse {
  /**
   * An opaque string that uniquely idenfies the promised result of this
   * invocation.
   */
  promiseid: string;
}
```

Whenever the _host_ app needs to obtain the promised value (possibly in a blocking way), it makes the corresponding
`end` call:

```ts
interface EndRequest {
  /** The promiseid that was returned from the corresponding `begin` call. */
  promiseid: string;

  // The discriminator
  api: 'end';
}
```

This will result in the promise being awaited and then resolved:

```ts
interface EndResponse {
  /** The resolved value of the promise */
  result: any;
}
```

!!! danger
    All `begin` calls must be matched with an `end` call. Failure to do so may result in unhandled promise rejections
    that might cause the application to terminate in certain environments.

### Invoking getters (and static getters)

In order to obtain the value of properties, the `get` call is used:

```ts
interface GetRequest {
  /** The object reference on which a poperty is read */
  objref: ObjectReference;
  /** The name of the property being read */
  property: string;

  // The discriminator
  api: 'get';
}
```

When operating on static properties, or in order to obtain the value of `enum` constants, the `sget` API must be used
instead:

```ts
interface StaticGetRequest {
  /** The jsii fully qualified name of the declaring type */
  fqn: ObjectReference;
  /** The name of the property being read */
  property: string;

  // The discriminator
  api: 'sget';
}
```

Both the `get` and `sget` calls result in the same response:

```ts
interface GetResponse {
  /** The value of the property. */
  result: any;
}
```

### Invoking setters (and static setters)

In order to change the value of a property, the `set` call is used:

```ts
interface SetRequest {
  /** The object reference on which a poperty is written to */
  objref: ObjectReference;
  /** The name of the property being written to */
  property: string;
  /** The value that is written to the property */
  value: any;

  // The discriminator
  api: 'set';
}
```

When operating on static properties, the `sset` API must be used instead:

```ts
interface StaticSetRequest {
  /** The jsii fully qualified name of the declaring type */
  fqn: ObjectReference;
  /** The name of the property being written to */
  property: string;
  /** The value that is written to the property */
  value: any;

  // The discriminator
  api: 'sset';
}
```

Both the `set` and `sset` calls result in the same response, which is an empty object:

```ts
interface SetResponse {}
```
