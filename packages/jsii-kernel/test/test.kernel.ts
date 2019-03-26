import childProcess = require('child_process');
import fs = require('fs-extra');
import { Test } from 'nodeunit';
import { join } from 'path';
import path = require('path');
import vm = require('vm');
import { api, Kernel } from '../lib';
import { Callback, TOKEN_REF } from '../lib/api';
import { closeRecording, recordInteraction } from './recording';

// extract versions of fixtures
// tslint:disable:no-var-requires
const calcBaseVersion = require('@scope/jsii-calc-base/package.json').version.replace(/\+.+$/, '');
const calcLibVersion = require('@scope/jsii-calc-lib/package.json').version.replace(/\+.+$/, '');
const calcVersion = require('jsii-calc/package.json').version.replace(/\+.+$/, '');
// tslint:enable:no-var-requires

// tslint:disable:no-console
// tslint:disable:max-line-length

process.setMaxListeners(9999); // since every kernel instance adds an `on('exit')` handler.

process.on('unhandledRejection', e => {
    console.error(e.stack);
    process.exit(1);
});

const recordingOutput = process.env.JSII_RECORD;
if (recordingOutput) {
    fs.mkdirpSync(recordingOutput);
    console.error('JSII_RECORD=' + recordingOutput);
}

const tests: any = module.exports = { };

function defineTest(name: string, method: (test: Test, sandbox: Kernel) => Promise<void>) {
    const recording = name.replace(/[^A-Za-z]/g, '_');

    tests[name] = async (test: Test) => {
        try {
            const kernel = await createCalculatorSandbox(recording);
            await method(test, kernel);
            await closeRecording(kernel);
        } finally {
            test.done();
        }
    };
}

defineTest('sandbox allows loading arbitrary javascript into it', async (test, sandbox) => {
    const objid = sandbox.create({ fqn: '@scope/jsii-calc-lib.Number', args: [ 12 ] });
    test.deepEqual(sandbox.get({ objref: objid, property: 'doubleValue' }).value, 24);
    test.deepEqual(sandbox.invoke({ objref: objid, method: 'typeName', args: [] }).result, 'Number');

    const lhs = sandbox.create({ fqn: '@scope/jsii-calc-lib.Number', args: [ 10 ] });
    const rhs = sandbox.create({ fqn: '@scope/jsii-calc-lib.Number', args: [ 20 ] });
    const add = sandbox.create({ fqn: 'jsii-calc.Add', args: [ lhs, rhs ]});

    test.deepEqual(sandbox.get({ objref: add, property: 'value' }).value, 30);
});

defineTest('stats() return sandbox statistics', async (test, sandbox) => {
    const stats = sandbox.stats({ });
    test.equal(stats.objectCount, 0);

    for (let i = 0; i < 100; ++i) {
        sandbox.create({ fqn: '@scope/jsii-calc-lib.Number', args: [ i ] });
    }

    test.equal(sandbox.stats({ }).objectCount, 100);
});

defineTest('stats() return sandbox statistics', async (test, sandbox) => {
    const stats = sandbox.stats({ });
    test.equal(stats.objectCount, 0);

    for (let i = 0; i < 100; ++i) {
        sandbox.create({ fqn: '@scope/jsii-calc-lib.Number', args: [ i ] });
    }

    test.equal(sandbox.stats({ }).objectCount, 100);
});

defineTest('deleteObject will remove the reference', async (test, sandbox) => {
    const objects = [];

    for (let i = 0; i < 100; ++i) {
        objects.push(sandbox.create({ fqn: '@scope/jsii-calc-lib.Number', args: [ i ] }));
    }

    test.equal(sandbox.stats({ }).objectCount, 100);

    for (let i = 0; i < 50; ++i) {
        sandbox.del({ objref: objects[i] });
    }

    test.equal(sandbox.stats({ }).objectCount, 50);

    // try to access an object after it has been deleted
    let thrown = false;

    try {
        // tslint:disable:no-unused-expression
        sandbox.get({ objref: objects[10], property: 'value' }).value;
    } catch (e) {
        thrown = true;
    }

    test.ok(thrown);
});

defineTest('in/out primitive types', async (test, sandbox) => {
    const alltypes = sandbox.create({ fqn: 'jsii-calc.AllTypes', args: [ ] });

    sandbox.set({ objref: alltypes, property: 'booleanProperty', value: true });
    test.deepEqual(sandbox.get({ objref: alltypes, property: 'booleanProperty' }).value, true);

    sandbox.set({ objref: alltypes, property: 'booleanProperty', value: false });
    test.deepEqual(sandbox.get({ objref: alltypes, property: 'booleanProperty'}).value, false);

    sandbox.set({ objref: alltypes, property: 'stringProperty', value: 'hello' });
    test.deepEqual(sandbox.get({ objref: alltypes, property: 'stringProperty'}).value, 'hello');

    sandbox.set({ objref: alltypes, property: 'numberProperty', value: 123 });
    test.deepEqual(sandbox.get({ objref: alltypes, property: 'numberProperty' }).value, 123);

    const num = sandbox.create({ fqn: '@scope/jsii-calc-lib.Number', args: [ 444 ] });
    sandbox.set({ objref: alltypes, property: 'anyProperty', value: num });
    test.deepEqual(sandbox.get({ objref: alltypes, property: 'anyProperty' }).value, num);
});

defineTest('in/out objects', async (test, sandbox) => {
    const alltypes = sandbox.create({ fqn: 'jsii-calc.AllTypes' });

    const num = sandbox.create({ fqn: '@scope/jsii-calc-lib.Number', args: [ 444 ] });
    sandbox.set({ objref: alltypes, property: 'anyProperty', value: num });
    test.deepEqual(sandbox.get({ objref: alltypes, property: 'anyProperty' }).value, num);
});

defineTest('in/out collections', async (test, sandbox) => {
    const alltypes = sandbox.create({ fqn: 'jsii-calc.AllTypes', args: [ ] });

    const array = [ 1, 2, 3, 4 ];
    sandbox.set({ objref: alltypes, property: 'arrayProperty', value: array });
    test.deepEqual(sandbox.get({ objref: alltypes, property: 'arrayProperty' }).value, array);

    const map = { a: 12, b: 33, c: 33, d: { e: 123 }};
    sandbox.set({ objref: alltypes, property: 'mapProperty', value: map });
    test.deepEqual(sandbox.get({ objref: alltypes, property: 'mapProperty' }).value, map);
});

defineTest('in/out date values', async (test, sandbox) => {
    const alltypes = sandbox.create({ fqn: 'jsii-calc.AllTypes' });

    const date = new Date("2018-01-18T00:00:32.347Z");
    sandbox.set({ objref: alltypes, property: 'dateProperty', value: { [api.TOKEN_DATE]: date.toISOString() } });
    test.deepEqual(sandbox.get({ objref: alltypes, property: 'dateProperty' }).value, { [api.TOKEN_DATE]: '2018-01-18T00:00:32.347Z' });
});

defineTest('in/out enum values', async (test, sandbox) => {
    const alltypes = sandbox.create({ fqn: 'jsii-calc.AllTypes' });

    sandbox.set({ objref: alltypes, property: 'enumProperty', value: { [api.TOKEN_ENUM]: 'jsii-calc.AllTypesEnum/MyEnumValue' } });
    test.equal(sandbox.get({ objref: alltypes, property: 'enumPropertyValue' }).value, 0);
    sandbox.set({ objref: alltypes, property: 'enumProperty', value: { [api.TOKEN_ENUM]: 'jsii-calc.AllTypesEnum/YourEnumValue' } });
    test.equal(sandbox.get({ objref: alltypes, property: 'enumPropertyValue' }).value, 100);
    sandbox.set({ objref: alltypes, property: 'enumProperty', value: { [api.TOKEN_ENUM]: 'jsii-calc.AllTypesEnum/ThisIsGreat' } });
    test.equal(sandbox.get({ objref: alltypes, property: 'enumPropertyValue' }).value, 101);
    test.deepEqual(sandbox.get({ objref: alltypes, property: 'enumProperty' }).value, { '$jsii.enum': 'jsii-calc.AllTypesEnum/ThisIsGreat' });
});

defineTest('enum values from @scoped packages awslabs/jsii#138', async (test, sandbox) => {
    const objref = sandbox.create({ fqn: 'jsii-calc.ReferenceEnumFromScopedPackage' });

    const value = sandbox.get({ objref, property: 'foo' });
    test.deepEqual(value, { value: { '$jsii.enum': '@scope/jsii-calc-lib.EnumFromScopedModule/Value2' } });

    sandbox.set({ objref, property: 'foo', value: { '$jsii.enum': '@scope/jsii-calc-lib.EnumFromScopedModule/Value1' }});
    const ret = sandbox.invoke({ objref, method: 'loadFoo' });
    test.deepEqual(ret, { result: { '$jsii.enum': '@scope/jsii-calc-lib.EnumFromScopedModule/Value1' } });

    sandbox.invoke({ objref, method: 'saveFoo', args: [ { '$jsii.enum': '@scope/jsii-calc-lib.EnumFromScopedModule/Value2' } ] });
    const value2 = sandbox.get({ objref, property: 'foo' });
    test.deepEqual(value2, { value: { '$jsii.enum': '@scope/jsii-calc-lib.EnumFromScopedModule/Value2' } });
});

defineTest('fails for invalid enum member name', async (test, sandbox) => {
    const objref = sandbox.create({ fqn: 'jsii-calc.ReferenceEnumFromScopedPackage' });

    test.throws(() => {
        sandbox.set({ objref, property: 'foo', value: { '$jsii.enum': '@scope/jsii-calc-lib.EnumFromScopedModule/ValueX' }});
    }, /No enum member named ValueX/);
});

defineTest('set for a non existing property', async (test, sandbox) => {
    const obj = sandbox.create({ fqn: 'jsii-calc.SyncVirtualMethods' });
    test.throws(() => sandbox.set({ objref: obj, property: 'idontexist', value: 'Foo' }));
});

defineTest('set for a readonly property', async (test, sandbox) => {
    const obj = sandbox.create({ fqn: 'jsii-calc.SyncVirtualMethods' });
    test.throws(() => sandbox.set({ objref: obj, property: 'readonlyProperty', value: 'Foo' }));
});

defineTest('create object with ctor overloads', async (_test, sandbox) => {
    sandbox.create({ fqn: 'jsii-calc.Calculator' });
    sandbox.create({ fqn: 'jsii-calc.Calculator', args: [ { initialValue: 100 } ] });
});

defineTest('objects created inside the sandbox are returned with type info and new objid', async (test, sandbox) => {
    const calc = sandbox.create({ fqn: 'jsii-calc.Calculator', args: [ { initialValue: 100} ] });
    sandbox.invoke({ objref: calc, method: 'add', args: [ 50 ] });

    const add = sandbox.get({ objref: calc, property: 'curr' }).value;
    test.deepEqual(sandbox.get({ objref: add, property: 'value' }).value, 150);
});

defineTest('naming allows returns the module name for different languages', async (test, sandbox) => {
    test.deepEqual(sandbox.naming({ assembly: 'jsii-calc' }).naming, {
        java: {
            package: 'software.amazon.jsii.tests.calculator',
            maven: { groupId: 'software.amazon.jsii.tests', artifactId: 'calculator' }
        },
        dotnet: {
            namespace: 'Amazon.JSII.Tests.CalculatorNamespace',
            packageId: 'Amazon.JSII.Tests.CalculatorPackageId',
        },
        js: { npm: 'jsii-calc' },
        python: { distName: 'jsii-calc', module: 'jsii_calc' },
    });
    test.deepEqual(sandbox.naming({ assembly: '@scope/jsii-calc-lib' }).naming, {
        java: {
            package: 'software.amazon.jsii.tests.calculator.lib',
            maven: { groupId: 'software.amazon.jsii.tests', artifactId: 'calculator-lib' }
        },
        dotnet: {
            namespace: 'Amazon.JSII.Tests.CalculatorNamespace.LibNamespace',
            packageId: 'Amazon.JSII.Tests.CalculatorPackageId.LibPackageId'
        },
        js: { npm: '@scope/jsii-calc-lib' },
        python: { distName: 'scope.jsii-calc-lib', module: 'scope.jsii_calc_lib' },
    });
});

defineTest('collection of objects', async (test, sandbox) => {
    const sum = sandbox.create({ fqn: 'jsii-calc.Sum' });

    const n1 = sandbox.create({ fqn: '@scope/jsii-calc-lib.Number', args: [ 10 ] });
    const n2 = sandbox.create({ fqn: '@scope/jsii-calc-lib.Number', args: [ 4 ] });
    const n3 = sandbox.create({ fqn: 'jsii-calc.Power', args: [ n1, n2 ] });

    sandbox.set({ objref: sum, property: 'parts', value: [ n1, n2, n3 ] });

    const parts = sandbox.get({ objref: sum, property: 'parts' }).value;
    test.equal(sandbox.get({ objref: parts[0], property: 'value' }).value, 10);
    test.equal(sandbox.get({ objref: parts[1], property: 'value' }).value, 4);
    test.equal(sandbox.get({ objref: parts[2], property: 'value' }).value, Math.pow(10, 4));

    const expr = sandbox.get({ objref: sum, property: 'expression' }).value;
    test.equal(sandbox.invoke({ objref: expr, method: 'toString' }).result, '(((0 + 10) + 4) + ((((1 * 10) * 10) * 10) * 10))');
    test.equal(sandbox.get({ objref: expr, property: 'value' }).value, 10014);
});

defineTest('class not found', async (test, sandbox) => {
    test.throws(() => sandbox.create({ fqn: 'NotFound', args: [] }));
});

defineTest('type-checking: method and property names are validated against class and base classes', async (test, sandbox) => {
    const obj = sandbox.create({ fqn: 'jsii-calc.Calculator' });

    sandbox.get({ objref: obj, property: 'stringStyle' }); // property from CompositeOperation
    sandbox.get({ objref: obj, property: 'value' }); // property from Value
    sandbox.get({ objref: obj, property: 'curr' }); // property from Calculator

    sandbox.invoke({ objref: obj, method: 'typeName' }); // method from Value
    sandbox.invoke({ objref: obj, method: 'add', args: [ 1 ]}); // method from Calculator

    test.throws(() => sandbox.get({ objref: obj, property: 'notFound' }));
    test.throws(() => sandbox.invoke({ objref: obj, method: 'boo', args: [] }));
});

defineTest('type-checking; module not found', async (test, sandbox) => {
    test.throws(() => sandbox.create({ fqn: 'jsii$boo.Foo' }), /Module 'jsii\$boo' not found/);
});

defineTest('type-checking: type not found', async (test, sandbox) => {
    test.throws(() => sandbox.create({ fqn: 'jsii-calc.Unknown' }), /Type 'jsii-calc.Unknown' not found/);
});

defineTest('type-checking: try to create an object from a non-class type', async (test, sandbox) => {
    test.throws(() => sandbox.create({ fqn: 'jsii-calc.AllTypesEnum' }), /Unexpected FQN kind/);
});

defineTest('type-checking: argument count in methods and initializers', async (test, sandbox) => {
    // ctor has one optional argument
    sandbox.create({ fqn: 'jsii-calc.Calculator' });
    sandbox.create({ fqn: 'jsii-calc.Calculator', args: [ 11 ] });

    // but we expect an error if more arguments are passed
    test.throws(() => sandbox.create({ fqn: 'jsii-calc.Calculator', args: [ 1, 2, 3 ] }), /Too many arguments/);
    test.throws(() => sandbox.create({ fqn: 'jsii-calc.Calculator', args: [ 1, 2, 3, 4 ]}), /Too many arguments/);

    test.throws(() => sandbox.create({ fqn: 'jsii-calc.Add', args: [ ]}), /Not enough arguments/);
    test.throws(() => sandbox.create({ fqn: 'jsii-calc.Add', args: [ 1 ]}), /Not enough arguments/);

    const obj = sandbox.create({ fqn: 'jsii-calc.RuntimeTypeChecking' });
    test.throws(() => sandbox.invoke({ objref: obj, method: 'methodWithOptionalArguments', args: [] }), /Not enough arguments/);
    test.throws(() => sandbox.invoke({ objref: obj, method: 'methodWithOptionalArguments', args: [ 1 ]}), /Not enough arguments/);
    sandbox.invoke({ objref: obj, method: 'methodWithOptionalArguments', args: [ 1, 'hello' ] });
    sandbox.invoke({ objref: obj, method: 'methodWithOptionalArguments', args: [ 1, 'hello', new Date() ] });
    test.throws(() => sandbox.invoke({ objref: obj, method: 'methodWithOptionalArguments', args: [ 1, 'hello', new Date(), 'too much' ] }), /Too many arguments/);
});

defineTest('verify object literals are converted to real classes', async (test, sandbox) => {
    const obj = sandbox.create({ fqn: 'jsii-calc.JSObjectLiteralToNative' });
    const obj2 = sandbox.invoke({ objref: obj, method: 'returnLiteral' }).result;

    test.ok(obj2[api.TOKEN_REF], 'verify that we received a ref as a result');

    const objid: string = obj2[api.TOKEN_REF];
    test.ok(objid.startsWith('jsii-calc.JSObjectLiteralToNativeClass'),
        'verify the type of the returned object');
});

defineTest('get a property from an type that only has base class properties', async (test, sandbox) => {
    const obj = sandbox.create({ fqn: 'jsii-calc.DerivedClassHasNoProperties.Derived' });
    sandbox.set({ objref: obj, property: 'prop', value: 'hi' });
    test.equal(sandbox.get({ objref: obj, property: 'prop' }).value, 'hi');
});

defineTest('async overrides: ignores overrides for unknown methods (to allow derived class to just pass all local method names)', async (_test, sandbox) => {
    sandbox.create({ fqn: 'jsii-calc.AsyncVirtualMethods', overrides: [ { method: 'notFound' } ] });
});

defineTest('async overrides: override a method', async (test, sandbox) => {
    // first call without an override and expect pendingCallbacks to return
    // an empty array.
    const obj1 = sandbox.create({ fqn: 'jsii-calc.AsyncVirtualMethods' });

    async function callWithOverride(overrideCallback: (x: number) => number) {
        const promise1 = sandbox.begin({ objref: obj1, method: 'callMe' });
        test.equal(sandbox.callbacks().callbacks.length, 0, 'no overrides - no callbacks');
        const result1 = (await sandbox.end(promise1)).result;
        test.equals(result1, 128);

        // now add an override and complete it with a some value.
        const obj = sandbox.create({ fqn: 'jsii-calc.AsyncVirtualMethods', overrides: [ { method: 'overrideMe', cookie: 'myCookie' } ] });
        const promise2 = sandbox.begin({ objref: obj, method: 'callMe' });
        const callbacks = sandbox.callbacks().callbacks;
        test.equal(callbacks.length, 1, 'callback to the override');
        const cb = callbacks[0];
        test.ok(cb.invoke);
        test.equal(cb.invoke!.objref, obj, 'callback refers to object');
        test.equal(cb.invoke!.method, 'overrideMe', 'callback refers to the correct method');
        test.equal(cb.cookie, 'myCookie', 'cookie is also passed');
        test.deepEqual(cb.invoke!.args, [ 10 ], 'callback args');

        // calling pendingCallbacks again will return zero results
        // since all callbacks are moved to "waiting" state
        test.equal(sandbox.callbacks().callbacks.length, 0);

        // call the override
        let callbackResult;
        let callbackError;
        try {
            callbackResult = overrideCallback(cb.invoke!.args![0]);
        } catch (e) {
            callbackError = e.message;
        }

        // complete the callback with a successful return value of 600
        sandbox.complete({ cbid: cb.cbid, err: callbackError, result: callbackResult });

        // await for the promise and verify that the completion was successfully
        // conveyed from the callback.
        return (await sandbox.end(promise2)).result;
    }

    test.equals(await callWithOverride(_ => 600), 608);
    test.equals(await callWithOverride(x => 2 * x), 28);

    // override throws
    let throws;
    try {
        await callWithOverride(_ => { throw new Error('Bla'); });
    } catch (e) {
        throws = e;
    }
    test.ok(throws);
    test.ok(throws.message);
    test.ok(throws.message.indexOf('Bla') !== -1);
});

defineTest('async overrides: directly call a method with an override from native code should invoke the "super.method" since it can only be done by the derived class', async (test, sandbox) => {
    const obj = sandbox.create({ fqn: 'jsii-calc.AsyncVirtualMethods', overrides: [ { method: 'overrideMe', cookie: 'myCookie' } ] });
    const promise = sandbox.begin({ objref: obj, method: 'overrideMe', args: [ 12 ]});

    // no callbacks should be pending, since this should invoke "super"
    test.equals(sandbox.callbacks().callbacks.length, 0);
    test.equals((await sandbox.end(promise)).result, 144);
});

defineTest('async overrides: two overrides', async (test, sandbox) => {
    const obj = sandbox.create({ fqn: 'jsii-calc.AsyncVirtualMethods', overrides: [
        { method: 'overrideMeToo', cookie: 'cookie1' },
        { method: 'overrideMe', cookie: 'cookie2' }
    ] });

    const promise = sandbox.begin({ objref: obj, method: 'callMe' });

    const callbacks1 = sandbox.callbacks();
    test.equal(callbacks1.callbacks.length, 1);

    sandbox.complete({ cbid: callbacks1.callbacks[0].cbid, result: 666 });
    await processPendingPromises(sandbox); // processing next promise

    const callbacks2 = sandbox.callbacks();
    test.equal(callbacks2.callbacks.length, 1);

    sandbox.complete({ cbid: callbacks2.callbacks[0].cbid, result: 101 });
    await processPendingPromises(sandbox);

    const result = await sandbox.end({ promiseid: promise.promiseid });
    test.equal(result.result, 775);
});

/**
 * This test simulates a sitation where an async method is called, which invokes
 * an async override in return, but the override's promise is not called synchronously
 * but rather within the "next tick". This can happen (at the discression of the runtime
 * and we should verify that the jsii-runtime (or any runtime for that matter) "processes"
 * promises after a "begin" invocation in order to make sure any callbacks are queued.
 *
 * This is also relevant immediate after a "complete" invocation, which fulfills an async
 * promise and may subsequently queue more callbacks before one can "end" the original
 * async request.
 *
 * Yes, this is hairy.
 *
 * host.ts#93 is where this is implemented in the runtime.
 */
defineTest('async overrides - process promises after "begin"', async (test, sandbox) => {

    const obj = sandbox.create({ fqn: 'jsii-calc.AsyncVirtualMethods', overrides: [
        { method: 'overrideMe', cookie: 'cookie2' },
        { method: 'overrideMeToo' }
    ] });

    const p1 = sandbox.begin({ objref: obj, method: 'callMeDoublePromise' });

    // this is needed in order to cycle through another event loop so
    // that promises that are lazily called will be processed (nothing ensures
    // that the promise callback will be invokes synchronously).
    await processPendingPromises(sandbox);

    const callbacks1 = sandbox.callbacks();

    test.equal(callbacks1.callbacks.length, 1);

    // --------------- start of "override" execution

    // we simulate the situation where the override invokes another async override

    // call a sync method (just for fun)
    const out = sandbox.invoke({ objref: obj, method: 'dontOverrideMe' });
    test.deepEqual(out, { result: 8 });

    // call another overridden async method
    const p2 = sandbox.begin({ objref: obj, method: 'callMe2' });

    // we should get a a callback to overrideMe2
    const callback2 = sandbox.callbacks();
    test.equal(callback2.callbacks.length, 1);
    test.equal(callback2.callbacks[0].invoke!.method, 'overrideMeToo');

    // complete the inner callback
    sandbox.complete({ cbid: callback2.callbacks[0].cbid, result: 9999 });

    // fetch it
    test.deepEqual(await sandbox.end({ promiseid: p2.promiseid }), { result: 9999 });

    // no more callbacks
    test.deepEqual(sandbox.callbacks(), { callbacks: [] });

    // now complete the outer callback
    await sandbox.complete({ cbid: callbacks1.callbacks[0].cbid, result: 8888 });

    // required: process pending promises so that we will get the next one in the callbacks list
    await processPendingPromises(sandbox);

    // ------ end of execution of "overrideMe"

    // now we expect 'overrideMeToo' to be called back
    const cb3 = sandbox.callbacks();
    test.equal(cb3.callbacks.length, 1);
    test.equal(cb3.callbacks[0].invoke!.method, 'overrideMeToo');

    // complete it
    sandbox.complete({ cbid: cb3.callbacks[0].cbid, result: -20 });

    // no more callbacks
    const cb4 = sandbox.callbacks();
    test.equal(cb4.callbacks.length, 0);

    const result = await sandbox.end({ promiseid: p1.promiseid });
    test.equal(result.result, 8876);
});

function processPendingPromises(sandbox: Kernel) {
    return vm.runInContext('new Promise(done => setImmediate(done));', (sandbox as any).sandbox);
}

defineTest('sync overrides', async (test, sandbox) => {
    const pre = sandbox.create({ fqn: 'jsii-calc.SyncVirtualMethods' });

    // without override
    test.equal(sandbox.invoke({ objref: pre, method: 'callerIsMethod' }).result, 20);
    test.equal(sandbox.get({ objref: pre, property: 'callerIsProperty' }).value, 20);
    const p = sandbox.begin({ objref: pre, method: 'callerIsAsync' });
    test.equal((await sandbox.end({ promiseid: p.promiseid })).result, 20);

    sandbox.callbackHandler = makeSyncCallbackHandler(callback => {
        test.equal(callback.cookie, 'myCookie');
        test.ok(callback.invoke!.objref[TOKEN_REF].includes('jsii-calc.SyncVirtualMethods'));
        test.equal(callback.invoke!.method, 'virtualMethod');
        test.equal(callback.invoke!.args![0], 10);

        // to make things a bit more interesting, let's interact with a jsii object
        // from within the callback
        const lhs = sandbox.create({ fqn: '@scope/jsii-calc-lib.Number', args: [ callback.invoke!.args![0] ] });
        const rhs = sandbox.create({ fqn: '@scope/jsii-calc-lib.Number', args: [ 12 ] });
        const add = sandbox.create({ fqn: 'jsii-calc.Add', args: [ lhs, rhs ]});
        return sandbox.get({ objref: add, property: 'value' }).value;
    });

    // now make the same set of calls, and you will notice that the results are affected by the override.
    const obj = sandbox.create({ fqn: 'jsii-calc.SyncVirtualMethods', overrides: [ { method: 'virtualMethod', cookie: 'myCookie' } ] });
    test.equal(sandbox.invoke({ objref: obj, method: 'callerIsMethod' }).result, 22);
    test.equal(sandbox.get({ objref: obj, property: 'callerIsProperty' }).value, 22);

    // verify callbacks can also be called by setters.
    let called = false;
    sandbox.callbackHandler = makeSyncCallbackHandler(callback => {
        test.equal(callback.invoke!.args![0], 999);
        called = true;
    });

    sandbox.set({ objref: obj, property: 'callerIsProperty', value: 999 });
    test.ok(called);
});

defineTest('sync overrides with async caller', async (test, sandbox) => {
    sandbox.callbackHandler = makeSyncCallbackHandler(callback => {
        test.equal(callback.cookie, 'myCookie');
        test.ok(callback.invoke!.objref[TOKEN_REF].includes('jsii-calc.SyncVirtualMethods'));
        test.equal(callback.invoke!.method, 'virtualMethod');
        test.equal(callback.invoke!.args![0], 10);

        // to make things a bit more interesting, let's interact with a jsii object
        // from within the callback
        const lhs = sandbox.create({ fqn: '@scope/jsii-calc-lib.Number', args: [ callback.invoke!.args![0] ] });
        const rhs = sandbox.create({ fqn: '@scope/jsii-calc-lib.Number', args: [ 12 ] });
        const add = sandbox.create({ fqn: 'jsii-calc.Add', args: [ lhs, rhs ]});
        return sandbox.get({ objref: add, property: 'value' }).value;
    });

    const obj = sandbox.create({ fqn: 'jsii-calc.SyncVirtualMethods', overrides: [ { method: 'virtualMethod', cookie: 'myCookie' } ] });
    const p2 = sandbox.begin({ objref: obj, method: 'callerIsAsync' });
    test.equal((await sandbox.end({ promiseid: p2.promiseid })).result, 22);
});

defineTest('sync overrides: properties - readwrite', async (test, sandbox) => {
    const obj = sandbox.create({ fqn: 'jsii-calc.SyncVirtualMethods', overrides: [ { property: 'theProperty', cookie: 'myCookie1234' } ] });

    let setValue;
    sandbox.callbackHandler = makeSyncCallbackHandler(callback => {
        test.equal(callback.cookie, 'myCookie1234');
        if (callback.get) {
            test.equal(callback.get!.property, 'theProperty');
            return 'override applied';
        } else if (callback.set) {
            test.equal(callback.set!.property, 'theProperty');
            setValue = callback.set.value;
            return undefined;
        } else {
            throw new Error('Invalid callback. Expected get/set');
        }
    });

    const value = sandbox.invoke({ objref: obj, method: 'retrieveValueOfTheProperty' });
    test.deepEqual(value, { result: 'override applied' });

    // make sure we can still set the property
    sandbox.invoke({ objref: obj, method: 'modifyValueOfTheProperty', args: [ 1234 ] });
    test.deepEqual(setValue, 1234);
});

defineTest('sync overrides: properties - readwrite (backed by functions)', async (test, sandbox) => {
    const obj = sandbox.create({
        fqn: 'jsii-calc.SyncVirtualMethods',
        overrides: [ { property: 'otherProperty', cookie: 'myCookie1234' } ]
    });

    let setValue;
    sandbox.callbackHandler = makeSyncCallbackHandler(callback => {
        test.equal(callback.cookie, 'myCookie1234');
        if (callback.get) {
            test.equal(callback.get!.property, 'otherProperty');
            return 'override applied for otherProperty';
        } else if (callback.set) {
            test.equal(callback.set!.property, 'otherProperty');
            setValue = callback.set.value;
            return undefined;
        } else {
            throw new Error('Invalid callback. Expected get/set');
        }
    });

    const value = sandbox.invoke({ objref: obj, method: 'retrieveOtherProperty' });
    test.deepEqual(value, { result: 'override applied for otherProperty' });

    // make sure we can still set the property
    sandbox.invoke({ objref: obj, method: 'modifyOtherProperty', args: [ 778877 ]});
    test.deepEqual(setValue, 778877);
});

defineTest('sync overrides: duplicate overrides for the same property', async (test, sandbox) => {
    test.throws(() => sandbox.create({
        fqn: 'jsii-calc.SyncVirtualMethods',
        overrides: [
            { property: 'otherProperty', cookie: 'myCookie1234' },
            { property: 'otherProperty', cookie: 'yourCookie' }
        ]
    }));
});

defineTest('sync overrides: properties - readonly', async (test, sandbox) => {
    const obj = sandbox.create({ fqn: 'jsii-calc.SyncVirtualMethods', overrides: [ { property: 'readonlyProperty', cookie: 'myCookie1234' } ] });

    sandbox.callbackHandler = makeSyncCallbackHandler(callback => {
        test.equal(callback.cookie, 'myCookie1234');
        test.ok(callback.get);
        test.equal(callback.get!.property, 'readonlyProperty');
        return 'override for readonly property applied';
    });

    const value = sandbox.invoke({ objref: obj, method: 'retrieveReadOnlyProperty' });
    test.deepEqual(value, { result: 'override for readonly property applied' });

    // can't set the value of a readonly property, dah!
    test.throws(() => sandbox.set({ objref: obj, property: 'readonlyProperty', value: 1234 }));
});

defineTest('sync overrides: properties - get calls super', async (test, sandbox) => {
    const obj = sandbox.create({ fqn: 'jsii-calc.SyncVirtualMethods', overrides: [ { property: 'theProperty' } ] });

    sandbox.callbackHandler = makeSyncCallbackHandler(callback => {
        test.equal(callback.get!.property, 'theProperty');
        const superValue = sandbox.get({ objref: obj, property: 'theProperty' });
        return 'override, super=' + superValue.value;
    });

    const value = sandbox.invoke({ objref: obj, method: 'retrieveValueOfTheProperty' });
    test.deepEqual(value, { result: 'override, super=initial value' });
});

defineTest('sync overrides: properties - set calls super', async (test, sandbox) => {
    const obj = sandbox.create({ fqn: 'jsii-calc.SyncVirtualMethods', overrides: [ { property: 'theProperty' } ] });

    sandbox.callbackHandler = makeSyncCallbackHandler(callback => {
        if (callback.get) {
            return sandbox.get({ objref: obj, property: 'theProperty' }).value;
        }

        if (callback.set) {
            return sandbox.set({ objref: obj, property: 'theProperty', value: 'set by override: ' + callback.set.value });
        }
    });

    sandbox.invoke({ objref: obj, method: 'modifyValueOfTheProperty', args: [ 'new_value' ] });
    const value = sandbox.invoke({ objref: obj, method: 'retrieveValueOfTheProperty' });
    test.deepEqual(value, { result: 'set by override: new_value' });
});

defineTest('sync overrides: properties - verify keys are enumerable', async (test, sandbox) => {
    const obj = sandbox.create({ fqn: 'Object', overrides: [ { property: 'foo' }, { property: 'readOnlyString' } ] });
    const reader = sandbox.create({ fqn: 'jsii-calc.UsesInterfaceWithProperties', args: [ obj ] });

    sandbox.callbackHandler = makeSyncCallbackHandler(callback => {
        if (callback.get && callback.get.property === 'foo') {
            return 999;
        }

        if (callback.get && callback.get.property === 'readOnlyString') {
            return 'STR';
        }

        throw new Error('Unexpected callback');
    });

    const result = sandbox.invoke({ objref: reader, method: 'readStringAndNumber', args: [ obj ]});
    test.deepEqual(result, { result: 'base=STR child=999 keys=[foo,readOnlyString]' });
});

defineTest('sync overrides: returns an object', async (test, sandbox) => {

    const returnsNumber = sandbox.create({ fqn: 'Object', overrides: [ { method: 'obtainNumber' }, { property: 'numberProp' } ] });

    const obj = sandbox.create({ fqn: 'jsii-calc.OverrideReturnsObject' });
    const number100 = sandbox.create({ fqn: '@scope/jsii-calc-lib.Number', args: [ 100 ] });
    const number500 = sandbox.create({ fqn: '@scope/jsii-calc-lib.Number', args: [ 500 ] });

    sandbox.callbackHandler = makeSyncCallbackHandler(callback => {
        if (callback.invoke && callback.invoke.method === 'obtainNumber') {
            return number100;
        }

        if (callback.get && callback.get.property === 'numberProp') {
            return number500;
        }

        throw new Error('Unexpected callback:' + JSON.stringify(callback));
    });

    const ret = sandbox.invoke({ objref: obj, method: 'test', args: [ returnsNumber ]});
    test.deepEqual(ret, { result: 100 * 2 + 500 * 2 });
});

defineTest('fail to begin async from sync - method', async (test, sandbox) => {
    const obj = sandbox.create({ fqn: 'jsii-calc.SyncVirtualMethods', overrides: [ { method: 'virtualMethod', cookie: 'myCookie' } ] });

    let called = 0;

    sandbox.callbackHandler = makeSyncCallbackHandler(_ => {
        const innerObj = sandbox.create({ fqn: 'jsii-calc.AsyncVirtualMethods' });
        test.throws(() => sandbox.begin({ objref: innerObj, method: 'callMe' }));
        called++;
    });

    sandbox.invoke({ objref: obj, method: 'callerIsMethod' });
    test.equal(called, 1);

    sandbox.get({ objref: obj, property: 'callerIsProperty' });
    test.equal(called, 2);

    sandbox.set({ objref: obj, property: 'callerIsProperty', value: 33 });
    test.equal(called, 3);
});

defineTest('the "Object" FQN can be used to allow creating empty objects with overrides which comply with an interface', async (test, sandbox) => {
    const obj = sandbox.create({ fqn: 'jsii-calc.Polymorphism' });
    const friendly = sandbox.create({ fqn: 'Object', overrides: [ { method: 'hello' } ] });
    sandbox.callbackHandler = makeSyncCallbackHandler(_ => 'oh, hello');
    const ret = sandbox.invoke({ objref: obj, method: 'sayHello', args: [ friendly ] });
    test.deepEqual(ret.result, 'oh, oh, hello');
});

defineTest('literal objects can be returned when an interface is expected, and they will be adorned with jsii metadata so they can be interacted with', async (test, sandbox) => {
    const obj = sandbox.create({ fqn: 'jsii-calc.JSObjectLiteralForInterface' });
    const ret = sandbox.invoke({ objref: obj, method: 'giveMeFriendly' });

    test.deepEqual(sandbox.invoke({ objref: ret.result, method: 'hello' }), { result: 'I am literally friendly!' });

    const ret2 = sandbox.invoke({ objref: obj, method: 'giveMeFriendlyGenerator' });
    test.deepEqual(sandbox.invoke({ objref: ret2.result, method: 'hello' }), { result: 'giveMeFriendlyGenerator' });
    test.deepEqual(sandbox.invoke({ objref: ret2.result, method: 'next' }), { result: 42 });
});

defineTest('exceptions include a stack trace into the original source code', async (test, sandbox) => {
    const obj = sandbox.create({ fqn: 'jsii-calc.Thrower' });
    test.throws(() => {
        try {
            sandbox.invoke({ objref: obj, method: 'throwError' });
        } catch (error) {
            const regexp = /^\s*at Thrower\.doThrowError \(.*jsii[-_]calc.*\/lib\/compliance\.ts:\d+:\d+\)$/m;
            test.ok(regexp.test(error.stack), 'The stack trace includes the path to the original source file');
            throw error;
        }
    });
});

defineTest('variadic methods can be called', async (test, sandbox) => {
    const obj = sandbox.create({ fqn: 'jsii-calc.VariadicMethod' });
    test.deepEqual(sandbox.invoke({ objref: obj, method: 'asArray', args: [1, 2, 3, 4] }).result,
                   [1, 2, 3, 4]);
});

defineTest('variadic methods can be called without any vararg', async (test, sandbox) => {
    const obj = sandbox.create({ fqn: 'jsii-calc.VariadicMethod', args: [1, 2, 3] });
    test.deepEqual(sandbox.invoke({ objref: obj, method: 'asArray', args: [4] }).result,
                   [1, 2, 3, 4]);
});

defineTest('static properties - get', async (test, sandbox) => {
    const value = sandbox.sget({ fqn: 'jsii-calc.Statics', property: 'Foo' });
    test.deepEqual(value, { value: 'hello' });
});

defineTest('fails: static properties - set readonly', async (test, sandbox) => {
    test.throws(() => sandbox.sset({ fqn: 'jsii-calc.Statics', property: 'Foo', value: 123 }));
});

defineTest('static properties - set', async (test, sandbox) => {
    const defaultInstance = sandbox.sget({ fqn: 'jsii-calc.Statics', property: 'instance' });
    test.deepEqual(sandbox.get({ objref: defaultInstance.value, property: 'value' }), { value: 'default' });

    const obj = sandbox.create({ fqn: 'jsii-calc.Statics', args: [ 'MyInstance' ] });
    sandbox.sset({ fqn: 'jsii-calc.Statics', property: 'instance', value: obj });

    const updatedInstance = sandbox.sget({ fqn: 'jsii-calc.Statics', property: 'instance' });
    test.deepEqual(sandbox.get({ objref: updatedInstance.value, property: 'value' }), { value: 'MyInstance' });
});

defineTest('fails: static properties - get/set non-static', async (test, sandbox) => {
    test.throws(() => sandbox.sget({ fqn: 'jsii-calc.Statics', property: 'value' }), /is not static/);
    test.throws(() => sandbox.sset({ fqn: 'jsii-calc.Statics', property: 'value', value: 123 }), /is not static/);
});

defineTest('fails: static properties - get/set not found', async (test, sandbox) => {
    test.throws(() => sandbox.sget({ fqn: 'jsii-calc.Statics', property: 'zoo' }), /doesn't have a property/);
    test.throws(() => sandbox.sset({ fqn: 'jsii-calc.Statics', property: 'bar', value: 123 }), /doesn't have a property/);
});

defineTest('static methods', async (test, sandbox) => {
    const result = sandbox.sinvoke({ fqn: 'jsii-calc.Statics', method: 'staticMethod', args: [ 'Jsii' ] });
    test.deepEqual(result, { result: 'hello ,Jsii!' });
});

defineTest('fails: static methods - not found', async (test, sandbox) => {
    test.throws(() => sandbox.sinvoke({ fqn: 'jsii-calc.Statics', method: 'staticMethodNotFound', args: [ 'Jsii' ] }), /doesn't have a method/);
});

defineTest('fails: static methods - not static', async (test, sandbox) => {
    test.throws(() => sandbox.sinvoke({ fqn: 'jsii-calc.Statics', method: 'justMethod', args: [ 'Jsii' ] }), /is not a static method/);
});

defineTest('loading a module twice idepotently succeeds', async (_test, sandbox) => {
    await sandbox.load({
        tarball: await preparePackage('jsii-calc', false),
        name: 'jsii-calc',
        version: calcVersion
    });
});

defineTest('fails if trying to load two different versions of the same module', async (test, sandbox) => {
    let thrown = false;
    try {
        await sandbox.load({ tarball: await preparePackage('jsii-calc', false), name: 'jsii-calc', version: '99.999.9' });
    } catch (e) {
        test.ok(/Multiple versions .+ and .+ of the package 'jsii-calc' cannot be loaded together/.test(e.message));
        thrown = true;
    }

    test.ok(thrown);
});

defineTest('node.js standard library', async (test, sandbox) => {
    const objref = sandbox.create({ fqn: 'jsii-calc.NodeStandardLibrary' });
    const promise = sandbox.begin({ objref, method: 'fsReadFile' });
    await processPendingPromises(sandbox);

    const output = await sandbox.end({ promiseid: promise.promiseid });
    test.deepEqual(output, { result: 'Hello, resource!' });
    test.deepEqual(sandbox.invoke({ objref, method: 'fsReadFileSync' }),
        { result: 'Hello, resource! SYNC!' });

    const platform = sandbox.get({ objref, property: 'osPlatform' }).value;
    test.ok(platform && platform.length > 0);

    test.deepEqual(sandbox.invoke({ objref, method: 'cryptoSha256' }),
        { result: "6a2da20943931e9834fc12cfe5bb47bbd9ae43489a30726962b576f4e3993e50" });
});

// @see awslabs/jsii#248
defineTest('object literals are returned by reference', async (test, sandbox) => {
    const objref = sandbox.create({ fqn: 'jsii-calc.ClassWithMutableObjectLiteralProperty' });
    const property = sandbox.get({ objref, property: 'mutableObject' }).value;

    const newValue = 'Bazinga!1!';
    sandbox.set({ objref: property, property: 'value', value: newValue });

    test.equal(newValue,
               sandbox.get({
                   objref: sandbox.get({ objref, property: 'mutableObject' }).value,
                   property: 'value'
               }).value);

    sandbox.del({ objref: property });
});

defineTest('overrides: method instead of property with the same name', async (test, sandbox) => {
    test.throws(() => {
        sandbox.create({ fqn: 'jsii-calc.SyncVirtualMethods', overrides: [
            { method: 'theProperty' }
        ]});
    }, /Trying to override property/);
});

defineTest('overrides: property instead of method with the same name', async (test, sandbox) => {
    test.throws(() => {
        sandbox.create({ fqn: 'jsii-calc.SyncVirtualMethods', overrides: [
            { property: 'virtualMethod' }
        ]});
    }, /Trying to override method/);
});

defineTest('overrides: skip overrides of private methods', async (test, sandbox) => {
    const objref = sandbox.create({ fqn: 'jsii-calc.DoNotOverridePrivates', overrides: [
        { method: 'privateMethod' }
    ]});

    sandbox.callbackHandler = makeSyncCallbackHandler(_ => {
        test.ok(false, 'override callback should not be called');
        return 'privateMethodBoom!';
    });

    const result = sandbox.invoke({ objref, method: 'privateMethodValue' });
    test.deepEqual(result.result, 'privateMethod');
});

defineTest('overrides: skip overrides of private properties', async (test, sandbox) => {
    const objref = sandbox.create({ fqn: 'jsii-calc.DoNotOverridePrivates', overrides: [
        { property: 'privateProperty' }
    ]});

    sandbox.callbackHandler = makeSyncCallbackHandler(_ => {
        test.ok(false, 'override callback should not be called');
        return 'privatePropertyBoom!';
    });

    const result = sandbox.invoke({ objref, method: 'privatePropertyValue' });
    test.deepEqual(result.result, 'privateProperty');
});

defineTest('nulls are converted to undefined - ctor', async (_test, sandbox) => {
    sandbox.create({ fqn: 'jsii-calc.NullShouldBeTreatedAsUndefined', args: [ "foo", null ] });
});

defineTest('nulls are converted to undefined - method arguments', async (_test, sandbox) => {
    const objref = sandbox.create({ fqn: 'jsii-calc.NullShouldBeTreatedAsUndefined', args: [ "foo" ] });
    sandbox.invoke({ objref, method: 'giveMeUndefined', args: [ null ] });
});

defineTest('nulls are converted to undefined - inside objects', async (_test, sandbox) => {
    const objref = sandbox.create({ fqn: 'jsii-calc.NullShouldBeTreatedAsUndefined', args: [ "foo" ] });
    sandbox.invoke({ objref, method: 'giveMeUndefinedInsideAnObject', args: [ {
        thisShouldBeUndefined: null,
        arrayWithThreeElementsAndUndefinedAsSecondArgument: [ 'one', null, 'two' ]
    } ]});
});

defineTest('nulls are converted to undefined - properties', async (_test, sandbox) => {
    const objref = sandbox.create({ fqn: 'jsii-calc.NullShouldBeTreatedAsUndefined', args: [ "foo" ] });
    sandbox.set({ objref, property: 'changeMeToUndefined', value: null });
    sandbox.invoke({ objref, method: 'verifyPropertyIsUndefined' });
});

defineTest('JSII_AGENT is undefined in node.js', async (test, sandbox) => {
    test.equal(sandbox.sget({ fqn: 'jsii-calc.JsiiAgent', property: 'jsiiAgent' }).value, undefined);
});

defineTest('ObjRefs are labeled with the "most correct" type', async (test, sandbox) => {
    const classRef = sandbox.sinvoke({ fqn: 'jsii-calc.Constructors', method: 'makeClass' }).result as api.ObjRef;
    const ifaceRef = sandbox.sinvoke({ fqn: 'jsii-calc.Constructors', method: 'makeInterface' }).result as api.ObjRef;

    test.ok(classRef[api.TOKEN_REF].startsWith('jsii-calc.InbetweenClass'),
            `${classRef[api.TOKEN_REF]} starts with jsii-calc.InbetweenClass`);
    test.ok(ifaceRef[api.TOKEN_REF].startsWith('jsii-calc.IPublicInterface'),
            `${ifaceRef[api.TOKEN_REF]} starts with jsii-calc.IPublicInterface`);
});

defineTest('toSandbox: "null" in hash values send to JS should be treated as non-existing key', async (test, sandbox) => {
    const input = { option1: null, option2: 'hello' };
    const option1Exists = sandbox.sinvoke({ fqn: 'jsii-calc.EraseUndefinedHashValues', method: 'doesKeyExist', args: [ input, 'option1' ] });
    test.equal(option1Exists.result, false);

    const option2Exists = sandbox.sinvoke({ fqn: 'jsii-calc.EraseUndefinedHashValues', method: 'doesKeyExist', args: [ input, 'option2' ] });
    test.equal(option2Exists.result, true);
});

defineTest('toSandbox: "undefined" in hash values sent to JS should be treated as non-existing key', async (test, sandbox) => {
    const input = { option1: undefined, option2: 'hello' };
    const option1Exists = sandbox.sinvoke({ fqn: 'jsii-calc.EraseUndefinedHashValues', method: 'doesKeyExist', args: [ input, 'option1' ] });
    test.equal(option1Exists.result, false);
    const option2Exists = sandbox.sinvoke({ fqn: 'jsii-calc.EraseUndefinedHashValues', method: 'doesKeyExist', args: [ input, 'option2' ] });
    test.equal(option2Exists.result, true);
});

defineTest('fromSandbox: "undefined" in hash values returned from JS erases the key', async (test, sandbox) => {
    const output = sandbox.sinvoke({ fqn: 'jsii-calc.EraseUndefinedHashValues', method: 'prop2IsUndefined' });
    test.deepEqual(output, { result: { prop1: 'value1' } });
});

defineTest('fromSandbox: "null" in hash values returned from JS erases the key', async (test, sandbox) => {
    const output = sandbox.sinvoke({ fqn: 'jsii-calc.EraseUndefinedHashValues', method: 'prop1IsNull' });
    test.deepEqual(output, { result: { prop2: 'value2' } });
});

// =================================================================================================

const testNames: { [name: string]: boolean } = { };

async function createCalculatorSandbox(name: string) {
    if (name in testNames) {
        throw new Error(`Duplicate test name: ${name}`);
    }
    testNames[name] = true;

    const initialCallbackHandler = () => {
        throw new Error('Callback invoked without a callback handler');
    };
    const sandbox = new Kernel(initialCallbackHandler);

    if (recordingOutput) {
        const inputOutputLogPath = join(recordingOutput, `${name}.log`);
        recordInteraction(sandbox, inputOutputLogPath);
    }

    sandbox.traceEnabled = `${process.env.JSII_DEBUG}` === '1';

    await sandbox.load({ tarball: await preparePackage('@scope/jsii-calc-base'), name: '@scope/jsii-calc-base', version: calcBaseVersion });
    await sandbox.load({ tarball: await preparePackage('@scope/jsii-calc-lib'), name: '@scope/jsii-calc-lib', version: calcLibVersion });
    await sandbox.load({ tarball: await preparePackage('jsii-calc'), name: 'jsii-calc', version: calcVersion });
    return sandbox;
}

const cache: { [module: string]: string } = { };

async function preparePackage(module: string, useCache = true) {
    if (module in cache && useCache) {
        return cache[module];
    }

    const staging = await fs.mkdtemp('/tmp/jsii-kernel-tests-');

    // clean up only if we are not recording, so playback can refer to these
    if (!recordingOutput) {
        process.on('exit', () => fs.removeSync(staging)); // cleanup
    }

    const packageRoot = findPackageRoot(module);
    await new Promise((ok, ko) => {
        const child = childProcess.spawn('npm', ['pack', packageRoot], { cwd: staging, shell: true, stdio: ['ignore', 'pipe', 'ignore'] });
        const stdout = new Array<Buffer>();
        child.stdout.on('data', chunk => stdout.push(Buffer.from(chunk)));
        child.once('exit', async (code, signal) => {
            if (code === 0) { return ok(); }
            if (code != null) { return ko(`Process exited with code ${code}`); }
            ko(`Process killed by signal ${signal}`);
        });
    });
    const dir = path.join(staging, (await fs.readdir(staging))[0]);
    cache[module] = dir;
    return dir;
}

function findPackageRoot(pkg: string) {
    return path.resolve(path.join(require.resolve(`${pkg}/package.json`), '..'));
}

/**
 * synchronous overrides are implemented as a simple callback function that gets
 * all the information needed to perform the callback and return the result.
 */
function makeSyncCallbackHandler(logic: (callback: Callback) => any) {
    return function(this: Kernel, callback: Callback) {
        const sandbox = this;

        // since sync callbacks must be handled at host level, we will "fake"
        // how jsii-runtime and a client will interact when a callback is requested
        const recording: fs.WriteStream = (sandbox as any).logfile;

        if (recording) {
            // jsii-runtime => client (callback request from the runtime)
            recording.write(`< ${JSON.stringify({ callback })}\n`);
        }

        const result = logic(callback);

        if (recording) {
            // client => jsii-runtime (callback completion by client)
            recording.write(`> ${JSON.stringify({ complete: { cbid: callback.cbid, result } })}\n`);
        }

        return result;
    };
}
