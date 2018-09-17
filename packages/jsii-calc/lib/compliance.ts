// tslint:disable
import { Value, Number, IFriendly, MyFirstStruct, StructWithOnlyOptionals, EnumFromScopedModule } from '@scope/jsii-calc-lib';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import * as crypto from 'crypto';
import { promisify } from 'util';
const bundled = require('jsii-calc-bundled');
import base = require('@scope/jsii-calc-base');
const readFile = promisify(fs.readFile);
import { composition, IFriendlyRandomGenerator, IRandomNumberGenerator, Multiply } from './calculator';

export enum AllTypesEnum {
    MyEnumValue,
    YourEnumValue = 100,
    ThisIsGreat
}

export enum StringEnum {
    A = 'A',
    B = 'B',
    C = 'C'
}

/**
 * This class includes property for all types supported by jsii. The setters will validate
 * that the value set is of the expected type and throw otherwise.
 */
export class AllTypes {

    // boolean

    private boolValue = false;

    get booleanProperty() {
        return this.boolValue;
    }

    set booleanProperty(value: boolean) {
        if (typeof(value) !== 'boolean') {
            throw new Error('not a boolean')
        }
        this.boolValue = value;
    }

    // string

    private stringValue = 'first value';

    get stringProperty() {
        return this.stringValue;
    }

    set stringProperty(value: string) {
        if (typeof(value) !== 'string') {
            throw new Error('not a string');
        }

        this.stringValue = value;
    }

    // number

    private numberValue = 0;

    get numberProperty() {
        return this.numberValue;
    }

    set numberProperty(value: number) {
        if (typeof(value) !== 'number') {
            throw new Error('not a number');
        }
        this.numberValue = value;
    }

    // date

    private dateValue = new Date();

    get dateProperty(): Date {
        return this.dateValue;
    }

    set dateProperty(value: Date) {
        // https://stackoverflow.com/a/643827/737957
        if (Object.prototype.toString.call(value) !== '[object Date]') {
            throw new Error('not a date: ' + value + ' type=' + typeof(value));
        }

        this.dateValue = value;
    }

    // json

    private jsonValue: object = {};

    get jsonProperty(): object {
        return this.jsonValue;
    }

    set jsonProperty(value: object) {
        if (typeof(value) !== 'object') {
            throw new Error('not an object');
        }

        this.jsonValue = value;
    }

    // map

    private mapValue: { [key: string]: Number } = {};

    get mapProperty(): { [key: string]: Number } {
        return this.mapValue;
    }

    set mapProperty(value: { [key: string]: Number }) {
        if (typeof(value) !== 'object') {
            throw new Error('not a map');
        }
        this.mapValue = value;
    }

    // array

    private arrayValue: string[] = [];

    get arrayProperty(): string[] {
        return this.arrayValue;
    }

    set arrayProperty(value: string[]) {
        if (!Array.isArray(value)) {
            throw new Error('not an array');
        }

        this.arrayValue = value;
    }

    // non-typed (any)

    anyProperty: any
    anyArrayProperty: any[] = [];
    anyMapProperty: { [key: string]: any } = {};

    // non-typed (unknown)

    unknownProperty: unknown;
    unknownArrayProperty: unknown[] = [];
    unknownMapProperty: { [key: string]: unknown } = {};

    // unions

    unionProperty: string | number | Number | Multiply = 'foo';
    unionArrayProperty: (composition.CompositeOperation | number)[] = [];
    unionMapProperty: { [key: string]: (Number | number | string) } = {};

    // enum

    public optionalEnumValue?: StringEnum;
    private enumValue: AllTypesEnum = AllTypesEnum.ThisIsGreat;

    get enumProperty() {
        return this.enumValue;
    }

    set enumProperty(value: AllTypesEnum) {
        this.enumValue = value;
        switch (value) {
            case AllTypesEnum.MyEnumValue:
            case AllTypesEnum.YourEnumValue:
            case AllTypesEnum.ThisIsGreat:
                return;
            default:
                throw new Error('Invalid enum: ' + value);
        }
    }

    get enumPropertyValue(): number {
        return this.enumValue.valueOf();
    }

    enumMethod(value: StringEnum) {
        return value;
    }
}

//
// Return an object literal from JavaScript which conforms to a class (effectively treating
// the class as an interface). We want the native code to be able to wrap the resulting object
// in a native class.
//

export class JSObjectLiteralToNative {
    returnLiteral(): JSObjectLiteralToNativeClass {
        return {
            propA: 'Hello',
            propB: 102
        }
    }
}

export class JSObjectLiteralToNativeClass {
    propA: string = 'A';
    propB: number = 0;
}

/**
 * Verify that object references can be passed inside collections.
 */
export class ObjectRefsInCollections {
    /**
     * Returns the sum of all values
     */
    sumFromArray(values: Value[]) {
        let sum = 0;
        for (let val of values) {
            sum += val.value;
        }
        return sum;
    }

    /**
     * Returns the sum of all values in a map
     */
    sumFromMap(values: { [key: string]: Value }) {
        let sum = 0;
        for (let key of Object.keys(values)) {
            sum += values[key].value;
        }
        return sum;
    }
}

export class RuntimeTypeChecking {
    /**
     * Used to verify verification of number of method arguments.
     */
    public methodWithOptionalArguments(arg1: number, arg2: string, arg3?: Date) {
        arg1; arg2; arg3;
    }

    public methodWithDefaultedArguments(arg1: number = 2, arg2: string, arg3: Date = new Date()) {
        arg1; arg2; arg3;
    }
}

export namespace DerivedClassHasNoProperties {

    export class Base {
        prop: string = '';
    }

    export class Derived extends Base {

    }

}

export class AsyncVirtualMethods {
    async callMe() {
        return await this.overrideMe(10) + this.dontOverrideMe() + await this.overrideMeToo();
    }

    async overrideMe(mult: number) {
        return 12 * mult;
    }

    async overrideMeToo() {
        return 0;
    }

    /**
     * Just calls "overrideMeToo"
     */
    async callMe2() {
        return await this.overrideMeToo();
    }

    /**
     * This method calls the "callMe" async method indirectly, which will then
     * invoke a virtual method. This is a "double promise" situation, which
     * means that callbacks are not going to be available immediate, but only
     * after an "immediates" cycle.
     */
    async callMeDoublePromise() {
        return new Promise<number>(ok => {
            setImmediate(() => {
                this.callMe().then(ok);
            });
        });
    }

    dontOverrideMe() {
        return 8;
    }
}

export class SyncVirtualMethods {
    callerIsMethod() {
        return this.virtualMethod(10);
    }

    get callerIsProperty() {
        return this.virtualMethod(10);
    }

    set callerIsProperty(x: number) {
        this.virtualMethod(x);
    }

    async callerIsAsync() {
        return this.virtualMethod(10);
    }

    virtualMethod(n: number): number {
        return n * 2;
    }

    // read-write property

    theProperty: string = 'initial value';

    modifyValueOfTheProperty(value: string) {
        this.theProperty = value;
    }

    retrieveValueOfTheProperty() {
        return this.theProperty;
    }

    // read-only property

    readonly readonlyProperty: string = 'readonly-property-initial-value';

    retrieveReadOnlyProperty() {
        return this.readonlyProperty;
    }

    // property backed by functions

    get otherProperty() {
        return 'other property';
    }

    set otherProperty(value: string) {
        this.valueOfOtherProperty = value;
    }

    valueOfOtherProperty: string = '';

    public modifyOtherProperty(value: string) {
        this.otherProperty = value;
    }

    public retrieveOtherProperty() {
        return this.otherProperty;
    }

    // property with a short name (makes sure for example that java's
    // convertion of getA to "a" is not assuming that the length is > 1).

    a: number = 0;

    readA() {
        return this.a;
    }

    writeA(value: number) {
        this.a = value;
    }

}

export class VirtualMethodPlayground {
    async serialSumAsync(count: number) {
        let sum = 0;
        for (let i = 0; i < count; ++i) {
            const result = await this.overrideMeAsync(i);
            sum += result;
        }
        return sum;
    }

    async parallelSumAsync(count: number) {
        let all = new Array<Promise<number>>();
        for (let i = 0; i < count; ++i) {
            all.push(this.overrideMeAsync(i));
        }

        const result = await Promise.all(all);
        return result.reduce((x, i) => x + i, 0);
    }

    sumSync(count: number) {
        let sum = 0;
        for (let i = 0; i < count; ++i) {
            sum += this.overrideMeSync(i);
        }
        return sum;
    }

    async overrideMeAsync(index: number) {
        return 10 * index;
    }

    overrideMeSync(index: number) {
        return 10 * index;
    }
}

export class DoubleTrouble implements IFriendlyRandomGenerator {
    next() { return 12; }
    hello() { return 'world'; }
}

export class Polymorphism {
    sayHello(friendly: IFriendly) {
        return `oh, ${friendly.hello()}`;
    }
}

/**
 * This allows us to test that a reference can be stored for objects that
 * implement interfaces.
 */
export class NumberGenerator {
    constructor(public generator: IRandomNumberGenerator) {

    }

    nextTimes100() {
        return this.generator.next() * 100;
    }

    isSameGenerator(gen: IRandomNumberGenerator) {
        return this.generator === gen;
    }
}

export class JSObjectLiteralForInterface {

    giveMeFriendly(): IFriendly {
        return {
            hello: () => 'I am literally friendly!'
        };
    }

    giveMeFriendlyGenerator(): IFriendlyRandomGenerator {
        return {
            hello: () => 'giveMeFriendlyGenerator',
            next: () => 42
        };
    }

}

/**
 * A struct which derives from another struct.
 */
export interface DerivedStruct extends MyFirstStruct {
    /**
     * An example of a non primitive property.
     */
    nonPrimitive: DoubleTrouble
    bool: boolean
    anotherRequired: Date
    optionalArray?: string[]
    /**
     * This is optional.
     */
    anotherOptional?: { [key: string]: Value }
}

export class GiveMeStructs {
    /**
     * Returns the "anumber" from a MyFirstStruct struct;
     */
    readFirstNumber(first: MyFirstStruct) {
        return first.anumber;
    }

    /**
     * Returns the boolean from a DerivedStruct struct.
     */
    readDerivedNonPrimitive(derived: DerivedStruct) {
        return derived.nonPrimitive;
    }

    /**
     * Accepts a struct of type DerivedStruct and returns a struct of type FirstStruct.
     */
    derivedToFirst(derived: DerivedStruct) {
        return derived as MyFirstStruct;
    }

    get structLiteral(): StructWithOnlyOptionals {
        return {
            optional1: 'optional1FromStructLiteral',
            optional3: false
        }
    }
}

export interface IInterfaceWithProperties {
    readonly readOnlyString: string;
    readWriteString: string;
}

export interface IInterfaceWithPropertiesExtension extends IInterfaceWithProperties {
    foo: number;
}

export class UsesInterfaceWithProperties {
    constructor(public readonly obj: IInterfaceWithProperties) {

    }

    public justRead() {
        return this.obj.readOnlyString;
    }

    public writeAndRead(value: string) {
        this.obj.readWriteString = value;
        return this.obj.readWriteString;
    }

    public readStringAndNumber(ext: IInterfaceWithPropertiesExtension) {
        return `base=${ext.readOnlyString} child=${ext.foo} keys=[${Object.keys(ext).join(',')}]`;
    }
}

export class AllowedMethodNames {

    /**
     * getXxx() is not allowed (see negatives), but getXxx(a, ...) is okay.
     */
    public getFoo(withParam: string) {
        return withParam;
    }

    public getBar(_p1: string, _p2: number) {
        return;
    }

    /**
     * setFoo(x) is not allowed (see negatives), but setXxx(a, b, ...) is okay.
     */
    public setFoo(_x: string, _y: number) {
        return;
    }

    public setBar(_x: string, _y: number, _z: boolean) {
        return;
    }
}

export interface ReturnsNumber {
    obtainNumber(): Number;
    readonly numberProp: Number;
}

export class OverrideReturnsObject {
    public test(obj: ReturnsNumber) {
        return obj.obtainNumber().doubleValue + obj.numberProp.doubleValue;
    }
}

export class Thrower {
    public throwError() {
        this.doThrowError();
    }

    private doThrowError() {
        throw new Error();
    }
}

export class VariadicMethod {
    private readonly prefix: number[];

    /**
     * @param prefix a prefix that will be use for all values returned by ``#asArray``.
     */
    constructor(...prefix: number[]) {
        this.prefix = prefix;
    }

    /**
     * @param first  the first element of the array to be returned (after the ``prefix`` provided at construction time).
     * @param others other elements to be included in the array.
     */
    public asArray(first: number, ...others: number[]): number[] {
        return [...this.prefix, first, ...others];
    }
}

export class Statics {
    constructor(public readonly value: string) { }

    /**
     * Jsdocs for static method
     * @param name The name of the person to say hello to
     */
    public static staticMethod(name: string) {
        return `hello ,${name}!`;
    }

    public justMethod() {
        return this.value;
    }

    /**
     * Jsdocs for static property.
     */
    public static readonly Foo = 'hello';

    /**
     * Constants may also use all-caps.
     */
    public static readonly BAR = 1234;

    /**
     * Constants can also use camelCase.
     */
    public static readonly zooBar: { [name: string]: string } = { hello: 'world' };

    private static _instance?: Statics

    /**
     * Jsdocs for static getter.
     */
    public static get instance(): Statics {
        if (!this._instance) {
            this._instance = new Statics('default');
        }
        return this._instance;
    }

    /**
     *Jsdocs for static setter.
     */
    public static set instance(val: Statics) {
        this._instance = val;
    }

    public static nonConstStatic = 100; // this should not be represented as a constant in target languages
    public static readonly ConstObj = new DoubleTrouble(); // should be initialized statically
}

// https://en.wikipedia.org/wiki/List_of_Java_keywords
export class JavaReservedWords {
    public abstract() { }
    public assert() { }
    public boolean() { }
    public break() { }
    public byte() { }
    public case() { }
    public catch() { }
    public char() { }
    public class() { }
    public const() { }
    public continue() { }
    public default() { }
    public double() { }
    public do() { }
    public else() { }
    public enum() { }
    public extends() { }
    public false() { }
    public final() { }
    public finally() { }
    public float() { }
    public for() { }
    public goto() { }
    public if() { }
    public implements() { }
    public import() { }
    public instanceof() { }
    public int() { }
    public interface() { }
    public long() { }
    public native() { }
    public new() { }
    public null() { }
    public package() { }
    public private() { }
    public protected() { }
    public public() { }
    public return() { }
    public short() { }
    public static() { }
    public strictfp() { }
    public super() { }
    public switch() { }
    public synchronized() { }
    public this() { }
    public throw() { }
    public throws() { }
    public transient() { }
    public true() { }
    public try() { }
    public void() { }
    public volatile() { }
    public while = 'hello';
}

export interface UnionProperties {
    foo?: string | number;
    readonly bar: AllTypes | string | number;
}

export class UseBundledDependency {
    value() {
        return bundled;
    }
}

/**
 * Test fixture to verify that jsii modules can use the node standard library.
 */
export class NodeStandardLibrary {
    /**
     * Reads a local resource file (resource.txt) asynchronously.
     * @returns "Hello, resource!"
     */
    public async fsReadFile() {
        const value = await readFile(path.join(__dirname, 'resource.txt'));
        return value.toString();
    }

    /**
     * Sync version of fsReadFile.
     * @returns "Hello, resource! SYNC!"
     */
    public fsReadFileSync() {
        return fs.readFileSync(path.join(__dirname, 'resource.txt')).toString() + ' SYNC!';
    }

    /**
     * Returns the current os.platform() from the "os" node module.
     */
    public get osPlatform() {
        return os.platform();
    }

    /**
     * Uses node.js "crypto" module to calculate sha256 of a string.
     * @returns "6a2da20943931e9834fc12cfe5bb47bbd9ae43489a30726962b576f4e3993e50"
     */
    public cryptoSha256() {
        const hash = crypto.createHash('sha256');

        hash.update('some data to hash');
        return hash.digest('hex');
    }
}

/**
 * Depend on a type from jsii-calc-base as a test for awslabs/jsii#128
 */
export class UseCalcBase {
    public hello(): base.Base {
        return {
            typeName: () => "hello"
        }
    }
}

export interface ImplictBaseOfBase extends base.BaseProps {
    goo: Date;
}

/**
 * See awslabs/jsii#138
 */
export class ReferenceEnumFromScopedPackage {
    public foo?: EnumFromScopedModule = EnumFromScopedModule.Value2;

    public loadFoo(): EnumFromScopedModule | undefined {
        return this.foo;
    }

    public saveFoo(value: EnumFromScopedModule) {
        this.foo = value;
    }
}

/**
 * awslabs/jsii#208
 * Interface within a namespace
 */
export namespace InterfaceInNamespaceOnlyInterface {

    // it's a special case when only an interface is exported from a namespace
    export interface Hello {
        foo: number
    }

}

export namespace InterfaceInNamespaceIncludesClasses {

    export class Foo {
        public bar?: string;
    }

    export interface Hello {
        foo: number
    }
}

/**
 * awslabs/jsii#175
 * Interface proxies (and builders) do not respect optional arguments in methods
 */
export interface InterfaceWithOptionalMethodArguments {
    hello(arg1: string, arg2?: number): void
}

/**
 * awslabs/jsii#220
 * Abstract return type
 */

export interface InterfaceImplementedByAbstractClass {
    readonly propFromInterface: string;
}

export abstract class AbstractClassBase {
    public abstract readonly abstractProperty: string;
}

export abstract class AbstractClass extends AbstractClassBase implements InterfaceImplementedByAbstractClass {
    public nonAbstractMethod() {
        return 42;
    }

    public abstract abstractMethod(name: string): string;

    public get propFromInterface() {
        return 'propFromInterfaceValue';
    }
}

class ConcreteClass extends AbstractClass {
    public abstractMethod(name: string) {
        return `Hello, ${name}!!`;
    }

    public get abstractProperty() {
        return 'Hello, dude!';
    }
}


export class AbstractClassReturner {
    public giveMeAbstract(): AbstractClass {
        return new ConcreteClass();
    }

    public giveMeInterface(): InterfaceImplementedByAbstractClass {
        return new ConcreteClass();
    }

    public get returnAbstractFromProperty(): AbstractClassBase {
        return {
            abstractProperty: 'hello-abstract-property'
        }
    }
}
