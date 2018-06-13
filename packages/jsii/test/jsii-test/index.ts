import * as mydep from 'my-dep'
import { hi } from 'my-bundled-dep'

export class Token { }

export class TestClass3 {
    hello: string = '';
}

export class TestClass2 {
    a: number = 0;
    b: string = '';
    c: TestClass3 = new TestClass3();

    // last argument is union, but it's optional, so the resulting jsii will just not include it.
    constructor(arg1 = 'hello', arg2: TestClass3, arg3: number | undefined, arg4?: boolean, arg5?: TestClass3 | TestClass2) {
        arg1; arg2; arg3; arg4; arg5;
        hi();
    }
}

export class BaseClass {
    baseProp: string = '';
}

/**
 * This is the comment section
 * @link http://amazon.com
 * @description Description
 * @author benisrae
 */
export class TestClass extends BaseClass {

    // properties

    /**
     * This is documentation for readonlyString
     */
    readonly readonlyString: string = '';
    mutableNumber: number = 0;

    /**
     * Read only boolean.
     */
    get readonlyBoolean() {
        return false;
    }

    /**
     * Sets the mutable complex object.
     */
    set mutableComplex(value: TestClass2) {
        value;
    }

    /**
     * Documentation for getter
     * @example This is an example
     */
    get mutableComplex() {
        return new TestClass2("hello", new TestClass3(), 122);
    }

    _ignored() {
        // this method should not be included
    }

    // optional properties

    optionalMutableBoolean?: boolean
    readonly optionalReadonlyDate?: Date
 
    // list

    listOfStrings: string[]  = [];
    optionalListOfNumbers?: number[];
    listOfComplex: TestClass2[] = [];

    // map

    /**
     * And a comment
     * @description Map of booleans here
     */
    mapOfBooleans: { [ key: string ]: boolean } = {};
    mapOfComplex: { [ key: string]: TestClass3 } = {};

    // refs

    stringOrRef: Token | string = '';

    // methods

    /**
     * Documentation for method
     */
    methodWithNoParameters() { }

    /**
     * Documentation for methodWithParams
     * @param param1 Doc for param1
     * @param param2 Doc for param2
     */
    methodWithParams(param1: string, param2: number, param3?: TestClass3, param4?: TestClass2): boolean {
        param1;
        param2;
        param3;
        param4;
        this.notVisible();
        return true;
    }

    private notVisible() {

    }

    /**
     * Docs on getter prevail.
     */
    get getterBeforeSetter() {
        return 'hello'
    }

    /**
     * Docs on setter are not allowed.
     */
    set getterBeforeSetter(value: string) {
        value;
    }

    get arrayGetter(): TestEnum[] {
        return []
    }

    get mapGetter(): { [key: string]: TestClass2 } {
        return { "hello": { a: 1, b: 'hello', c: { hello: 'hello' } } }
    }

    jsonProperty: object = {};

    optionalBooleanOrRef?: boolean | Token

    optionalAsUnion: string | undefined = '';

    arrayOfOptionals = new Array<TestClass3 | undefined>();
    readonly readonlyMapOfOptionalsOrRefs: { [key: string]: (string | undefined) } = {};
}

/**
 * This is the documentation for this enum.
 */
export enum TestEnum {
    /**
     * This is doc for Value1
     */
    Value1,

    /**
     * Doc for value2
     * @author benisrae@
     */
    Value2,
    Value3 = 'Hello'
}

export namespace TestEnum {
    export class SubTypeOfTestEnum {
        myProp = 12
    }
}

export namespace TestClass2 {
    export class SubTypeOfTestClass2 {
        readonly yourProp?: string = "Hello"
    }
}

export namespace TestClass2.SubTypeOfTestClass2 {
    export class Foo {
        
    }
}

//
// Const literals
// jsii allows constant literals and actually includes the values in the jsii spec
//

export class TestClass4 {

    // primitive consts values are allowed but only if they are simple literal data values
    // no math, no evaluation. literally!!
    static readonly StringConst = 'Hello';
    static readonly StringConstWithDoubleQuotes = "World";
    static readonly NumberConst = 1234;
    static readonly DoubleConst = 1234.44;
    static readonly BooleanConstValue = false;
    static readonly BooleanConstTrue = false;

    // ignored (with a warning) because it's a non-primitive literal
    static readonly NonLiteralConst = 123 + 45;
    static readonly ObjConst = new TestClass();

    // private
    private static NonPrimitive = new TestClass();

    /**
     * p2 cannot be resolved, but it's optional, so we expect the typespec to just include p1
     */
    constructor(p1: string, p2?: () => void, p3?: string) {
        p1; p2; p3; TestClass4.NonPrimitive;
    }
}

//
// This is good since there are no namesapces without a type.
//

export class A { }
export namespace A { export class B { } }
export namespace A.B { export class C { } }

//
// Use a type from an external dependency as a base class
//

export class ExposeExternalDependency extends mydep.MyDepType {
    froth: number = 0;
}

export class PropertyWithAnyValue {
    myprop: any = undefined;
}

// jsii also indicates whether properties have backing logic or just represent raw data

export class HasLogic {

    /**
     * This property will have logic=true
     */
    get propWithLogic() {
        return 12
    }

    set propWithLogic(val: number) {
        val;
    }

    propWithoutLogic: string = '';
}

export class OptionalRef {
    prop1?: Token
    prop2: Token | undefined = new Token();
}

export class UnionProperties {
    withPrimitive1: Token | string = '';
    withPrimitive2: string | Token = '';
    noPrimitive: Token | TestClass2 | TestClass3 = new TestClass3();
}

//
// jsii is expected to automatically copy the initializer from TestClass3
//

export class EnsureInitializerBase {
    constructor(arg1: string, arg2: boolean) {
        arg1; arg2;
    }
}

export class EnsureInitializer extends EnsureInitializerBase {

}

export class EnsureInitializer2 extends EnsureInitializer {

}

export class EnsureInitializer3 extends EnsureInitializer2 {
    constructor(ihavemyowninitializer: boolean) {
        super('boo', false)
        ihavemyowninitializer;
    }
}

// here initializer has only optional values
// in the meantime we still expect it to be cloned as is for lack of a evidence that we should do something else

export class EnsureInitializerBase2 {
    constructor(arg1?: string, arg2?: boolean) {
        arg1; arg2;
    }
}

export class EnsureInitializer4 extends EnsureInitializerBase2 {

}

export class PropertiesInCtor {
    constructor(readonly readonlyProp: string, public readWriteProp: string, private readonly privateProp: string) {
        this.readWriteProp = this.privateProp;
    }
}

export abstract class MyAbstractClass {
    normalMethod() {

    }

    abstract abstractMethod(value: number): string;
}

export abstract class DerivedAbstract extends MyAbstractClass {
}

export class ClassWithProtectedStuff {

    protected constructor(protected paramprop: string) {

    }

    protected readonly foo: number = 0;

    protected get goo() {
        return 123;
    }

    protected set goo(val: number) {
        val;
    }

    protected protectedMethod(val: string): number { 
        val;
        return 123;
    }
}

export class AsyncVirtualMethods {
    async overrideMe(): Promise<number> {
        return 42
    }

    dontOverrideMe() {
        return 42;
    }
}