package jsiicalc

type AbstractClass struct {
    propFromInterface string
}

func (A *AbstractClass) abstractMethod() string {
    // jsiiruntime.methodcall(A)
}

func (A *AbstractClass) nonAbstractMethod() number {
    // jsiiruntime.methodcall(A)
}

type AbstractClassBase struct {
    abstractProperty string
}

type AbstractClassReturner struct {
    returnAbstractFromProperty AbstractClassBase
}

func (A *AbstractClassReturner) giveMeAbstract() AbstractClass {
    // jsiiruntime.methodcall(A)
}

func (A *AbstractClassReturner) giveMeInterface() IInterfaceImplementedByAbstractClass {
    // jsiiruntime.methodcall(A)
}

type AbstractSuite struct {
    property string
}

func (A *AbstractSuite) someMethod() string {
    // jsiiruntime.methodcall(A)
}

func (A *AbstractSuite) workItAll() string {
    // jsiiruntime.methodcall(A)
}

type Add struct {
    value number
}

func (A *Add) toString() string {
    // jsiiruntime.methodcall(A)
}

type AllTypes struct {
    enumPropertyValue number
    anyArrayProperty Array<any>
    anyMapProperty Map<string => any>
    anyProperty any
    arrayProperty Array<string>
    booleanProperty boolean
    dateProperty date
    enumProperty AllTypesEnum
    jsonProperty json
    mapProperty Map<string => @scope/jsii-calc-lib.Number>
    numberProperty number
    stringProperty string
    unionArrayProperty Array<number | @scope/jsii-calc-lib.Value>
    unionMapProperty Map<string => string | number | @scope/jsii-calc-lib.Number>
    unionProperty string | number | jsii-calc.Multiply | @scope/jsii-calc-lib.Number
    unknownArrayProperty Array<any>
    unknownMapProperty Map<string => any>
    unknownProperty any
    optionalEnumValue StringEnum
}

func (A *AllTypes) anyIn() {
    // jsiiruntime.methodcall(A)
}

func (A *AllTypes) anyOut() any {
    // jsiiruntime.methodcall(A)
}

func (A *AllTypes) enumMethod() StringEnum {
    // jsiiruntime.methodcall(A)
}

type AllowedMethodNames struct {
}

func (A *AllowedMethodNames) getBar() {
    // jsiiruntime.methodcall(A)
}

func (A *AllowedMethodNames) getFoo() string {
    // jsiiruntime.methodcall(A)
}

func (A *AllowedMethodNames) setBar() {
    // jsiiruntime.methodcall(A)
}

func (A *AllowedMethodNames) setFoo() {
    // jsiiruntime.methodcall(A)
}

type AmbiguousParameters struct {
    props StructParameterType
    scope Bell
}

type AnonymousImplementationProvider struct {
}

func (A *AnonymousImplementationProvider) provideAsClass() Implementation {
    // jsiiruntime.methodcall(A)
}

func (A *AnonymousImplementationProvider) provideAsInterface() IAnonymouslyImplementMe {
    // jsiiruntime.methodcall(A)
}

type AsyncVirtualMethods struct {
}

func (A *AsyncVirtualMethods) callMe() number {
    // jsiiruntime.methodcall(A)
}

func (A *AsyncVirtualMethods) callMe2() number {
    // jsiiruntime.methodcall(A)
}

func (A *AsyncVirtualMethods) callMeDoublePromise() number {
    // jsiiruntime.methodcall(A)
}

func (A *AsyncVirtualMethods) dontOverrideMe() number {
    // jsiiruntime.methodcall(A)
}

func (A *AsyncVirtualMethods) overrideMe() number {
    // jsiiruntime.methodcall(A)
}

func (A *AsyncVirtualMethods) overrideMeToo() number {
    // jsiiruntime.methodcall(A)
}

type AugmentableClass struct {
}

func (A *AugmentableClass) methodOne() {
    // jsiiruntime.methodcall(A)
}

func (A *AugmentableClass) methodTwo() {
    // jsiiruntime.methodcall(A)
}

type BaseJsii976 struct {
}

type Bell struct {
    rung boolean
}

func (B *Bell) ring() {
    // jsiiruntime.methodcall(B)
}

type BinaryOperation struct {
    lhs Value
    rhs Value
}

func (B *BinaryOperation) hello() string {
    // jsiiruntime.methodcall(B)
}

type Calculator struct {
    expression Value
    operationsLog Array<@scope/jsii-calc-lib.Value>
    operationsMap Map<string => Array<@scope/jsii-calc-lib.Value>>
    curr Value
    maxValue number
    unionProperty jsii-calc.Add | jsii-calc.Multiply | jsii-calc.Power
}

func (C *Calculator) add() {
    // jsiiruntime.methodcall(C)
}

func (C *Calculator) mul() {
    // jsiiruntime.methodcall(C)
}

func (C *Calculator) neg() {
    // jsiiruntime.methodcall(C)
}

func (C *Calculator) pow() {
    // jsiiruntime.methodcall(C)
}

func (C *Calculator) readUnionValue() number {
    // jsiiruntime.methodcall(C)
}

type CalculatorProps interface {
    getinitialvalue() number
    setinitialvalue()
    getmaximumvalue() number
    setmaximumvalue()
}

type ChildStruct982 interface {
    getbar() number
    setbar()
}

type ClassThatImplementsTheInternalInterface struct {
    a string
    b string
    c string
    d string
}

type ClassThatImplementsThePrivateInterface struct {
    a string
    b string
    c string
    e string
}

type ClassWithCollections struct {
    staticArray Array<string>
    staticMap Map<string => string>
    array Array<string>
    map Map<string => string>
}

func (C *ClassWithCollections) createAList() Array<string> {
    // jsiiruntime.methodcall(C)
}

func (C *ClassWithCollections) createAMap() Map<string => string> {
    // jsiiruntime.methodcall(C)
}

type ClassWithDocs struct {
}

type ClassWithJavaReservedWords struct {
    int string
}

func (C *ClassWithJavaReservedWords) import() string {
    // jsiiruntime.methodcall(C)
}

type ClassWithMutableObjectLiteralProperty struct {
    mutableObject IMutableObjectLiteral
}

type ClassWithPrivateConstructorAndAutomaticProperties struct {
    readOnlyString string
    readWriteString string
}

func (C *ClassWithPrivateConstructorAndAutomaticProperties) create() ClassWithPrivateConstructorAndAutomaticProperties {
    // jsiiruntime.methodcall(C)
}

type ConfusingToJackson struct {
    unionProperty @scope/jsii-calc-lib.IFriendly | Array<@scope/jsii-calc-lib.IFriendly | jsii-calc.AbstractClass>
}

func (C *ConfusingToJackson) makeInstance() ConfusingToJackson {
    // jsiiruntime.methodcall(C)
}

func (C *ConfusingToJackson) makeStructInstance() ConfusingToJacksonStruct {
    // jsiiruntime.methodcall(C)
}

type ConfusingToJacksonStruct interface {
    getunionproperty() @scope/jsii-calc-lib.IFriendly | Array<@scope/jsii-calc-lib.IFriendly | jsii-calc.AbstractClass>
    setunionproperty()
}

type ConstructorPassesThisOut struct {
}

type Constructors struct {
}

func (C *Constructors) hiddenInterface() IPublicInterface {
    // jsiiruntime.methodcall(C)
}

func (C *Constructors) hiddenInterfaces() Array<jsii-calc.IPublicInterface> {
    // jsiiruntime.methodcall(C)
}

func (C *Constructors) hiddenSubInterfaces() Array<jsii-calc.IPublicInterface> {
    // jsiiruntime.methodcall(C)
}

func (C *Constructors) makeClass() PublicClass {
    // jsiiruntime.methodcall(C)
}

func (C *Constructors) makeInterface() IPublicInterface {
    // jsiiruntime.methodcall(C)
}

func (C *Constructors) makeInterface2() IPublicInterface2 {
    // jsiiruntime.methodcall(C)
}

func (C *Constructors) makeInterfaces() Array<jsii-calc.IPublicInterface> {
    // jsiiruntime.methodcall(C)
}

type ConsumePureInterface struct {
}

func (C *ConsumePureInterface) workItBaby() StructB {
    // jsiiruntime.methodcall(C)
}

type ConsumerCanRingBell struct {
}

func (C *ConsumerCanRingBell) staticImplementedByObjectLiteral() boolean {
    // jsiiruntime.methodcall(C)
}

func (C *ConsumerCanRingBell) staticImplementedByPrivateClass() boolean {
    // jsiiruntime.methodcall(C)
}

func (C *ConsumerCanRingBell) staticImplementedByPublicClass() boolean {
    // jsiiruntime.methodcall(C)
}

func (C *ConsumerCanRingBell) staticWhenTypedAsClass() boolean {
    // jsiiruntime.methodcall(C)
}

func (C *ConsumerCanRingBell) implementedByObjectLiteral() boolean {
    // jsiiruntime.methodcall(C)
}

func (C *ConsumerCanRingBell) implementedByPrivateClass() boolean {
    // jsiiruntime.methodcall(C)
}

func (C *ConsumerCanRingBell) implementedByPublicClass() boolean {
    // jsiiruntime.methodcall(C)
}

func (C *ConsumerCanRingBell) whenTypedAsClass() boolean {
    // jsiiruntime.methodcall(C)
}

type ConsumersOfThisCrazyTypeSystem struct {
}

func (C *ConsumersOfThisCrazyTypeSystem) consumeAnotherPublicInterface() string {
    // jsiiruntime.methodcall(C)
}

func (C *ConsumersOfThisCrazyTypeSystem) consumeNonInternalInterface() any {
    // jsiiruntime.methodcall(C)
}

type DataRenderer struct {
}

func (D *DataRenderer) render() string {
    // jsiiruntime.methodcall(D)
}

func (D *DataRenderer) renderArbitrary() string {
    // jsiiruntime.methodcall(D)
}

func (D *DataRenderer) renderMap() string {
    // jsiiruntime.methodcall(D)
}

type DefaultedConstructorArgument struct {
    arg1 number
    arg3 date
    arg2 string
}

type Demonstrate982 struct {
}

func (D *Demonstrate982) takeThis() ChildStruct982 {
    // jsiiruntime.methodcall(D)
}

func (D *Demonstrate982) takeThisToo() ParentStruct982 {
    // jsiiruntime.methodcall(D)
}

type DeprecatedClass struct {
    readonlyProperty string
    mutableProperty number
}

func (D *DeprecatedClass) method() {
    // jsiiruntime.methodcall(D)
}

type DeprecatedStruct interface {
    getreadonlyproperty() string
    setreadonlyproperty()
}

type DerivedStruct interface {
    getanotherrequired() date
    setanotherrequired()
    getbool() boolean
    setbool()
    getnonprimitive() DoubleTrouble
    setnonprimitive()
    getanotheroptional() Map<string => @scope/jsii-calc-lib.Value>
    setanotheroptional()
    getoptionalany() any
    setoptionalany()
    getoptionalarray() Array<string>
    setoptionalarray()
}

type DiamondInheritanceBaseLevelStruct interface {
    getbaselevelproperty() string
    setbaselevelproperty()
}

type DiamondInheritanceFirstMidLevelStruct interface {
    getfirstmidlevelproperty() string
    setfirstmidlevelproperty()
}

type DiamondInheritanceSecondMidLevelStruct interface {
    getsecondmidlevelproperty() string
    setsecondmidlevelproperty()
}

type DiamondInheritanceTopLevelStruct interface {
    gettoplevelproperty() string
    settoplevelproperty()
}

type DisappointingCollectionSource struct {
    maybeList Array<string>
    maybeMap Map<string => number>
}

type DoNotOverridePrivates struct {
}

func (D *DoNotOverridePrivates) changePrivatePropertyValue() {
    // jsiiruntime.methodcall(D)
}

func (D *DoNotOverridePrivates) privateMethodValue() string {
    // jsiiruntime.methodcall(D)
}

func (D *DoNotOverridePrivates) privatePropertyValue() string {
    // jsiiruntime.methodcall(D)
}

type DoNotRecognizeAnyAsOptional struct {
}

func (D *DoNotRecognizeAnyAsOptional) method() {
    // jsiiruntime.methodcall(D)
}

type DocumentedClass struct {
}

func (D *DocumentedClass) greet() number {
    // jsiiruntime.methodcall(D)
}

func (D *DocumentedClass) hola() {
    // jsiiruntime.methodcall(D)
}

type DontComplainAboutVariadicAfterOptional struct {
}

func (D *DontComplainAboutVariadicAfterOptional) optionalAndVariadic() string {
    // jsiiruntime.methodcall(D)
}

type DoubleTrouble struct {
}

func (D *DoubleTrouble) hello() string {
    // jsiiruntime.methodcall(D)
}

func (D *DoubleTrouble) next() number {
    // jsiiruntime.methodcall(D)
}

type EnumDispenser struct {
}

func (E *EnumDispenser) randomIntegerLikeEnum() AllTypesEnum {
    // jsiiruntime.methodcall(E)
}

func (E *EnumDispenser) randomStringLikeEnum() StringEnum {
    // jsiiruntime.methodcall(E)
}

type EraseUndefinedHashValues struct {
}

func (E *EraseUndefinedHashValues) doesKeyExist() boolean {
    // jsiiruntime.methodcall(E)
}

func (E *EraseUndefinedHashValues) prop1IsNull() Map<string => any> {
    // jsiiruntime.methodcall(E)
}

func (E *EraseUndefinedHashValues) prop2IsUndefined() Map<string => any> {
    // jsiiruntime.methodcall(E)
}

type EraseUndefinedHashValuesOptions interface {
    getoption1() string
    setoption1()
    getoption2() string
    setoption2()
}

type ExperimentalClass struct {
    readonlyProperty string
    mutableProperty number
}

func (E *ExperimentalClass) method() {
    // jsiiruntime.methodcall(E)
}

type ExperimentalStruct interface {
    getreadonlyproperty() string
    setreadonlyproperty()
}

type ExportedBaseClass struct {
    success boolean
}

type ExtendsInternalInterface interface {
    getboom() boolean
    setboom()
    getprop() string
    setprop()
}

type ExternalClass struct {
    readonlyProperty string
    mutableProperty number
}

func (E *ExternalClass) method() {
    // jsiiruntime.methodcall(E)
}

type ExternalStruct interface {
    getreadonlyproperty() string
    setreadonlyproperty()
}

type GiveMeStructs struct {
    structLiteral StructWithOnlyOptionals
}

func (G *GiveMeStructs) derivedToFirst() MyFirstStruct {
    // jsiiruntime.methodcall(G)
}

func (G *GiveMeStructs) readDerivedNonPrimitive() DoubleTrouble {
    // jsiiruntime.methodcall(G)
}

func (G *GiveMeStructs) readFirstNumber() number {
    // jsiiruntime.methodcall(G)
}

type Greetee interface {
    getname() string
    setname()
}

type GreetingAugmenter struct {
}

func (G *GreetingAugmenter) betterGreeting() string {
    // jsiiruntime.methodcall(G)
}

type IAnonymousImplementationProvider interface {
    provideasclass() Implementation
    provideasinterface() IAnonymouslyImplementMe
}

type IAnonymouslyImplementMe interface {
    verb() string
    getvalue() number
    setvalue()
}

type IAnotherPublicInterface interface {
    geta() string
    seta()
}

type IBell interface {
    ring()
}

type IBellRinger interface {
    yourturn()
}

type IConcreteBellRinger interface {
    yourturn()
}

type IDeprecatedInterface interface {
    method()
    getmutableproperty() number
    setmutableproperty()
}

type IExperimentalInterface interface {
    method()
    getmutableproperty() number
    setmutableproperty()
}

type IExtendsPrivateInterface interface {
    getmorethings() Array<string>
    setmorethings()
    getprivate() string
    setprivate()
}

type IExternalInterface interface {
    method()
    getmutableproperty() number
    setmutableproperty()
}

type IFriendlier interface {
    farewell() string
    goodbye() string
}

type IFriendlyRandomGenerator interface {
}

type IInterfaceImplementedByAbstractClass interface {
    getpropfrominterface() string
    setpropfrominterface()
}

type IInterfaceThatShouldNotBeADataType interface {
    getothervalue() string
    setothervalue()
}

type IInterfaceWithInternal interface {
    visible()
}

type IInterfaceWithMethods interface {
    dothings()
    getvalue() string
    setvalue()
}

type IInterfaceWithOptionalMethodArguments interface {
    hello()
}

type IInterfaceWithProperties interface {
    getreadonlystring() string
    setreadonlystring()
    getreadwritestring() string
    setreadwritestring()
}

type IInterfaceWithPropertiesExtension interface {
    getfoo() number
    setfoo()
}

type IJSII417Derived interface {
    bar()
    baz()
    getproperty() string
    setproperty()
}

type IJSII417PublicBaseOfBase interface {
    foo()
    gethasroot() boolean
    sethasroot()
}

type IJsii487External interface {
}

type IJsii487External2 interface {
}

type IJsii496 interface {
}

type IMutableObjectLiteral interface {
    getvalue() string
    setvalue()
}

type INonInternalInterface interface {
    getb() string
    setb()
    getc() string
    setc()
}

type IObjectWithProperty interface {
    wasset() boolean
    getproperty() string
    setproperty()
}

type IOptionalMethod interface {
    optional() string
}

type IPrivatelyImplemented interface {
    getsuccess() boolean
    setsuccess()
}

type IPublicInterface interface {
    bye() string
}

type IPublicInterface2 interface {
    ciao() string
}

type IRandomNumberGenerator interface {
    next() number
}

type IReturnJsii976 interface {
    getfoo() number
    setfoo()
}

type IReturnsNumber interface {
    obtainnumber() IDoublable
    getnumberprop() Number
    setnumberprop()
}

type IStableInterface interface {
    method()
    getmutableproperty() number
    setmutableproperty()
}

type IStructReturningDelegate interface {
    returnstruct() StructB
}

type ImplementInternalInterface struct {
    prop string
}

type Implementation struct {
    value number
}

type ImplementsInterfaceWithInternal struct {
}

func (I *ImplementsInterfaceWithInternal) visible() {
    // jsiiruntime.methodcall(I)
}

type ImplementsInterfaceWithInternalSubclass struct {
}

type ImplementsPrivateInterface struct {
    private string
}

type ImplictBaseOfBase interface {
    getgoo() date
    setgoo()
}

type InbetweenClass struct {
}

func (I *InbetweenClass) ciao() string {
    // jsiiruntime.methodcall(I)
}

type InterfaceCollections struct {
}

func (I *InterfaceCollections) listOfInterfaces() Array<jsii-calc.IBell> {
    // jsiiruntime.methodcall(I)
}

func (I *InterfaceCollections) listOfStructs() Array<jsii-calc.StructA> {
    // jsiiruntime.methodcall(I)
}

func (I *InterfaceCollections) mapOfInterfaces() Map<string => jsii-calc.IBell> {
    // jsiiruntime.methodcall(I)
}

func (I *InterfaceCollections) mapOfStructs() Map<string => jsii-calc.StructA> {
    // jsiiruntime.methodcall(I)
}

type InterfacesMaker struct {
}

func (I *InterfacesMaker) makeInterfaces() Array<@scope/jsii-calc-lib.IDoublable> {
    // jsiiruntime.methodcall(I)
}

type Isomorphism struct {
}

func (I *Isomorphism) myself() Isomorphism {
    // jsiiruntime.methodcall(I)
}

type JSII417Derived struct {
    property string
}

func (J *JSII417Derived) bar() {
    // jsiiruntime.methodcall(J)
}

func (J *JSII417Derived) baz() {
    // jsiiruntime.methodcall(J)
}

type JSII417PublicBaseOfBase struct {
    hasRoot boolean
}

func (J *JSII417PublicBaseOfBase) makeInstance() JSII417PublicBaseOfBase {
    // jsiiruntime.methodcall(J)
}

func (J *JSII417PublicBaseOfBase) foo() {
    // jsiiruntime.methodcall(J)
}

type JSObjectLiteralForInterface struct {
}

func (J *JSObjectLiteralForInterface) giveMeFriendly() IFriendly {
    // jsiiruntime.methodcall(J)
}

func (J *JSObjectLiteralForInterface) giveMeFriendlyGenerator() IFriendlyRandomGenerator {
    // jsiiruntime.methodcall(J)
}

type JSObjectLiteralToNative struct {
}

func (J *JSObjectLiteralToNative) returnLiteral() JSObjectLiteralToNativeClass {
    // jsiiruntime.methodcall(J)
}

type JSObjectLiteralToNativeClass struct {
    propA string
    propB number
}

type JavaReservedWords struct {
    while string
}

func (J *JavaReservedWords) abstract() {
    // jsiiruntime.methodcall(J)
}

func (J *JavaReservedWords) assert() {
    // jsiiruntime.methodcall(J)
}

func (J *JavaReservedWords) boolean() {
    // jsiiruntime.methodcall(J)
}

func (J *JavaReservedWords) break() {
    // jsiiruntime.methodcall(J)
}

func (J *JavaReservedWords) byte() {
    // jsiiruntime.methodcall(J)
}

func (J *JavaReservedWords) case() {
    // jsiiruntime.methodcall(J)
}

func (J *JavaReservedWords) catch() {
    // jsiiruntime.methodcall(J)
}

func (J *JavaReservedWords) char() {
    // jsiiruntime.methodcall(J)
}

func (J *JavaReservedWords) class() {
    // jsiiruntime.methodcall(J)
}

func (J *JavaReservedWords) const() {
    // jsiiruntime.methodcall(J)
}

func (J *JavaReservedWords) continue() {
    // jsiiruntime.methodcall(J)
}

func (J *JavaReservedWords) default() {
    // jsiiruntime.methodcall(J)
}

func (J *JavaReservedWords) do() {
    // jsiiruntime.methodcall(J)
}

func (J *JavaReservedWords) double() {
    // jsiiruntime.methodcall(J)
}

func (J *JavaReservedWords) else() {
    // jsiiruntime.methodcall(J)
}

func (J *JavaReservedWords) enum() {
    // jsiiruntime.methodcall(J)
}

func (J *JavaReservedWords) extends() {
    // jsiiruntime.methodcall(J)
}

func (J *JavaReservedWords) false() {
    // jsiiruntime.methodcall(J)
}

func (J *JavaReservedWords) final() {
    // jsiiruntime.methodcall(J)
}

func (J *JavaReservedWords) finally() {
    // jsiiruntime.methodcall(J)
}

func (J *JavaReservedWords) float() {
    // jsiiruntime.methodcall(J)
}

func (J *JavaReservedWords) for() {
    // jsiiruntime.methodcall(J)
}

func (J *JavaReservedWords) goto() {
    // jsiiruntime.methodcall(J)
}

func (J *JavaReservedWords) if() {
    // jsiiruntime.methodcall(J)
}

func (J *JavaReservedWords) implements() {
    // jsiiruntime.methodcall(J)
}

func (J *JavaReservedWords) import() {
    // jsiiruntime.methodcall(J)
}

func (J *JavaReservedWords) instanceof() {
    // jsiiruntime.methodcall(J)
}

func (J *JavaReservedWords) int() {
    // jsiiruntime.methodcall(J)
}

func (J *JavaReservedWords) interface() {
    // jsiiruntime.methodcall(J)
}

func (J *JavaReservedWords) long() {
    // jsiiruntime.methodcall(J)
}

func (J *JavaReservedWords) native() {
    // jsiiruntime.methodcall(J)
}

func (J *JavaReservedWords) new() {
    // jsiiruntime.methodcall(J)
}

func (J *JavaReservedWords) null() {
    // jsiiruntime.methodcall(J)
}

func (J *JavaReservedWords) package() {
    // jsiiruntime.methodcall(J)
}

func (J *JavaReservedWords) private() {
    // jsiiruntime.methodcall(J)
}

func (J *JavaReservedWords) protected() {
    // jsiiruntime.methodcall(J)
}

func (J *JavaReservedWords) public() {
    // jsiiruntime.methodcall(J)
}

func (J *JavaReservedWords) return() {
    // jsiiruntime.methodcall(J)
}

func (J *JavaReservedWords) short() {
    // jsiiruntime.methodcall(J)
}

func (J *JavaReservedWords) static() {
    // jsiiruntime.methodcall(J)
}

func (J *JavaReservedWords) strictfp() {
    // jsiiruntime.methodcall(J)
}

func (J *JavaReservedWords) super() {
    // jsiiruntime.methodcall(J)
}

func (J *JavaReservedWords) switch() {
    // jsiiruntime.methodcall(J)
}

func (J *JavaReservedWords) synchronized() {
    // jsiiruntime.methodcall(J)
}

func (J *JavaReservedWords) this() {
    // jsiiruntime.methodcall(J)
}

func (J *JavaReservedWords) throw() {
    // jsiiruntime.methodcall(J)
}

func (J *JavaReservedWords) throws() {
    // jsiiruntime.methodcall(J)
}

func (J *JavaReservedWords) transient() {
    // jsiiruntime.methodcall(J)
}

func (J *JavaReservedWords) true() {
    // jsiiruntime.methodcall(J)
}

func (J *JavaReservedWords) try() {
    // jsiiruntime.methodcall(J)
}

func (J *JavaReservedWords) void() {
    // jsiiruntime.methodcall(J)
}

func (J *JavaReservedWords) volatile() {
    // jsiiruntime.methodcall(J)
}

type Jsii487Derived struct {
}

type Jsii496Derived struct {
}

type JsiiAgent struct {
    jsiiAgent string
}

type JsonFormatter struct {
}

func (J *JsonFormatter) anyArray() any {
    // jsiiruntime.methodcall(J)
}

func (J *JsonFormatter) anyBooleanFalse() any {
    // jsiiruntime.methodcall(J)
}

func (J *JsonFormatter) anyBooleanTrue() any {
    // jsiiruntime.methodcall(J)
}

func (J *JsonFormatter) anyDate() any {
    // jsiiruntime.methodcall(J)
}

func (J *JsonFormatter) anyEmptyString() any {
    // jsiiruntime.methodcall(J)
}

func (J *JsonFormatter) anyFunction() any {
    // jsiiruntime.methodcall(J)
}

func (J *JsonFormatter) anyHash() any {
    // jsiiruntime.methodcall(J)
}

func (J *JsonFormatter) anyNull() any {
    // jsiiruntime.methodcall(J)
}

func (J *JsonFormatter) anyNumber() any {
    // jsiiruntime.methodcall(J)
}

func (J *JsonFormatter) anyRef() any {
    // jsiiruntime.methodcall(J)
}

func (J *JsonFormatter) anyString() any {
    // jsiiruntime.methodcall(J)
}

func (J *JsonFormatter) anyUndefined() any {
    // jsiiruntime.methodcall(J)
}

func (J *JsonFormatter) anyZero() any {
    // jsiiruntime.methodcall(J)
}

func (J *JsonFormatter) stringify() string {
    // jsiiruntime.methodcall(J)
}

type LoadBalancedFargateServiceProps interface {
    getcontainerport() number
    setcontainerport()
    getcpu() string
    setcpu()
    getmemorymib() string
    setmemorymib()
    getpublicloadbalancer() boolean
    setpublicloadbalancer()
    getpublictasks() boolean
    setpublictasks()
}

type MethodNamedProperty struct {
    elite number
}

func (M *MethodNamedProperty) property() string {
    // jsiiruntime.methodcall(M)
}

type Multiply struct {
    value number
}

func (M *Multiply) farewell() string {
    // jsiiruntime.methodcall(M)
}

func (M *Multiply) goodbye() string {
    // jsiiruntime.methodcall(M)
}

func (M *Multiply) next() number {
    // jsiiruntime.methodcall(M)
}

func (M *Multiply) toString() string {
    // jsiiruntime.methodcall(M)
}

type Negate struct {
    value number
}

func (N *Negate) farewell() string {
    // jsiiruntime.methodcall(N)
}

func (N *Negate) goodbye() string {
    // jsiiruntime.methodcall(N)
}

func (N *Negate) hello() string {
    // jsiiruntime.methodcall(N)
}

func (N *Negate) toString() string {
    // jsiiruntime.methodcall(N)
}

type NestedStruct interface {
    getnumberprop() number
    setnumberprop()
}

type NodeStandardLibrary struct {
    osPlatform string
}

func (N *NodeStandardLibrary) cryptoSha256() string {
    // jsiiruntime.methodcall(N)
}

func (N *NodeStandardLibrary) fsReadFile() string {
    // jsiiruntime.methodcall(N)
}

func (N *NodeStandardLibrary) fsReadFileSync() string {
    // jsiiruntime.methodcall(N)
}

type NullShouldBeTreatedAsUndefined struct {
    changeMeToUndefined string
}

func (N *NullShouldBeTreatedAsUndefined) giveMeUndefined() {
    // jsiiruntime.methodcall(N)
}

func (N *NullShouldBeTreatedAsUndefined) giveMeUndefinedInsideAnObject() {
    // jsiiruntime.methodcall(N)
}

func (N *NullShouldBeTreatedAsUndefined) verifyPropertyIsUndefined() {
    // jsiiruntime.methodcall(N)
}

type NullShouldBeTreatedAsUndefinedData interface {
    getarraywiththreeelementsandundefinedassecondargument() Array<any>
    setarraywiththreeelementsandundefinedassecondargument()
    getthisshouldbeundefined() any
    setthisshouldbeundefined()
}

type NumberGenerator struct {
    generator IRandomNumberGenerator
}

func (N *NumberGenerator) isSameGenerator() boolean {
    // jsiiruntime.methodcall(N)
}

func (N *NumberGenerator) nextTimes100() number {
    // jsiiruntime.methodcall(N)
}

type ObjectRefsInCollections struct {
}

func (O *ObjectRefsInCollections) sumFromArray() number {
    // jsiiruntime.methodcall(O)
}

func (O *ObjectRefsInCollections) sumFromMap() number {
    // jsiiruntime.methodcall(O)
}

type ObjectWithPropertyProvider struct {
}

func (O *ObjectWithPropertyProvider) provide() IObjectWithProperty {
    // jsiiruntime.methodcall(O)
}

type Old struct {
}

func (O *Old) doAThing() {
    // jsiiruntime.methodcall(O)
}

type OptionalArgumentInvoker struct {
}

func (O *OptionalArgumentInvoker) invokeWithOptional() {
    // jsiiruntime.methodcall(O)
}

func (O *OptionalArgumentInvoker) invokeWithoutOptional() {
    // jsiiruntime.methodcall(O)
}

type OptionalConstructorArgument struct {
    arg1 number
    arg2 string
    arg3 date
}

type OptionalStruct interface {
    getfield() string
    setfield()
}

type OptionalStructConsumer struct {
    parameterWasUndefined boolean
    fieldValue string
}

type OverridableProtectedMember struct {
    overrideReadOnly string
    overrideReadWrite string
}

func (O *OverridableProtectedMember) overrideMe() string {
    // jsiiruntime.methodcall(O)
}

func (O *OverridableProtectedMember) switchModes() {
    // jsiiruntime.methodcall(O)
}

func (O *OverridableProtectedMember) valueFromProtected() string {
    // jsiiruntime.methodcall(O)
}

type OverrideReturnsObject struct {
}

func (O *OverrideReturnsObject) test() number {
    // jsiiruntime.methodcall(O)
}

type ParentStruct982 interface {
    getfoo() string
    setfoo()
}

type PartiallyInitializedThisConsumer struct {
}

func (P *PartiallyInitializedThisConsumer) consumePartiallyInitializedThis() string {
    // jsiiruntime.methodcall(P)
}

type Polymorphism struct {
}

func (P *Polymorphism) sayHello() string {
    // jsiiruntime.methodcall(P)
}

type Power struct {
    base Value
    expression Value
    pow Value
}

type PropertyNamedProperty struct {
    property string
    yetAnoterOne boolean
}

type PublicClass struct {
}

func (P *PublicClass) hello() {
    // jsiiruntime.methodcall(P)
}

type PythonReservedWords struct {
}

func (P *PythonReservedWords) and() {
    // jsiiruntime.methodcall(P)
}

func (P *PythonReservedWords) as() {
    // jsiiruntime.methodcall(P)
}

func (P *PythonReservedWords) assert() {
    // jsiiruntime.methodcall(P)
}

func (P *PythonReservedWords) async() {
    // jsiiruntime.methodcall(P)
}

func (P *PythonReservedWords) await() {
    // jsiiruntime.methodcall(P)
}

func (P *PythonReservedWords) break() {
    // jsiiruntime.methodcall(P)
}

func (P *PythonReservedWords) class() {
    // jsiiruntime.methodcall(P)
}

func (P *PythonReservedWords) continue() {
    // jsiiruntime.methodcall(P)
}

func (P *PythonReservedWords) def() {
    // jsiiruntime.methodcall(P)
}

func (P *PythonReservedWords) del() {
    // jsiiruntime.methodcall(P)
}

func (P *PythonReservedWords) elif() {
    // jsiiruntime.methodcall(P)
}

func (P *PythonReservedWords) else() {
    // jsiiruntime.methodcall(P)
}

func (P *PythonReservedWords) except() {
    // jsiiruntime.methodcall(P)
}

func (P *PythonReservedWords) finally() {
    // jsiiruntime.methodcall(P)
}

func (P *PythonReservedWords) for() {
    // jsiiruntime.methodcall(P)
}

func (P *PythonReservedWords) from() {
    // jsiiruntime.methodcall(P)
}

func (P *PythonReservedWords) global() {
    // jsiiruntime.methodcall(P)
}

func (P *PythonReservedWords) if() {
    // jsiiruntime.methodcall(P)
}

func (P *PythonReservedWords) import() {
    // jsiiruntime.methodcall(P)
}

func (P *PythonReservedWords) in() {
    // jsiiruntime.methodcall(P)
}

func (P *PythonReservedWords) is() {
    // jsiiruntime.methodcall(P)
}

func (P *PythonReservedWords) lambda() {
    // jsiiruntime.methodcall(P)
}

func (P *PythonReservedWords) nonlocal() {
    // jsiiruntime.methodcall(P)
}

func (P *PythonReservedWords) not() {
    // jsiiruntime.methodcall(P)
}

func (P *PythonReservedWords) or() {
    // jsiiruntime.methodcall(P)
}

func (P *PythonReservedWords) pass() {
    // jsiiruntime.methodcall(P)
}

func (P *PythonReservedWords) raise() {
    // jsiiruntime.methodcall(P)
}

func (P *PythonReservedWords) return() {
    // jsiiruntime.methodcall(P)
}

func (P *PythonReservedWords) try() {
    // jsiiruntime.methodcall(P)
}

func (P *PythonReservedWords) while() {
    // jsiiruntime.methodcall(P)
}

func (P *PythonReservedWords) with() {
    // jsiiruntime.methodcall(P)
}

func (P *PythonReservedWords) yield() {
    // jsiiruntime.methodcall(P)
}

type ReferenceEnumFromScopedPackage struct {
    foo EnumFromScopedModule
}

func (R *ReferenceEnumFromScopedPackage) loadFoo() EnumFromScopedModule {
    // jsiiruntime.methodcall(R)
}

func (R *ReferenceEnumFromScopedPackage) saveFoo() {
    // jsiiruntime.methodcall(R)
}

type ReturnsPrivateImplementationOfInterface struct {
    privateImplementation IPrivatelyImplemented
}

type RootStruct interface {
    getstringprop() string
    setstringprop()
    getnestedstruct() NestedStruct
    setnestedstruct()
}

type RootStructValidator struct {
}

func (R *RootStructValidator) validate() {
    // jsiiruntime.methodcall(R)
}

type RuntimeTypeChecking struct {
}

func (R *RuntimeTypeChecking) methodWithDefaultedArguments() {
    // jsiiruntime.methodcall(R)
}

func (R *RuntimeTypeChecking) methodWithOptionalAnyArgument() {
    // jsiiruntime.methodcall(R)
}

func (R *RuntimeTypeChecking) methodWithOptionalArguments() {
    // jsiiruntime.methodcall(R)
}

type SecondLevelStruct interface {
    getdeeperrequiredprop() string
    setdeeperrequiredprop()
    getdeeperoptionalprop() string
    setdeeperoptionalprop()
}

type SingleInstanceTwoTypes struct {
}

func (S *SingleInstanceTwoTypes) interface1() InbetweenClass {
    // jsiiruntime.methodcall(S)
}

func (S *SingleInstanceTwoTypes) interface2() IPublicInterface {
    // jsiiruntime.methodcall(S)
}

type SingletonInt struct {
}

func (S *SingletonInt) isSingletonInt() boolean {
    // jsiiruntime.methodcall(S)
}

type SingletonString struct {
}

func (S *SingletonString) isSingletonString() boolean {
    // jsiiruntime.methodcall(S)
}

type SmellyStruct interface {
    getproperty() string
    setproperty()
    getyetanoterone() boolean
    setyetanoterone()
}

type SomeTypeJsii976 struct {
}

func (S *SomeTypeJsii976) returnAnonymous() any {
    // jsiiruntime.methodcall(S)
}

func (S *SomeTypeJsii976) returnReturn() IReturnJsii976 {
    // jsiiruntime.methodcall(S)
}

type StableClass struct {
    readonlyProperty string
    mutableProperty number
}

func (S *StableClass) method() {
    // jsiiruntime.methodcall(S)
}

type StableStruct interface {
    getreadonlyproperty() string
    setreadonlyproperty()
}

type StaticContext struct {
    staticVariable boolean
}

func (S *StaticContext) canAccessStaticContext() boolean {
    // jsiiruntime.methodcall(S)
}

type Statics struct {
    BAR number
    ConstObj DoubleTrouble
    Foo string
    zooBar Map<string => string>
    instance Statics
    nonConstStatic number
    value string
}

func (S *Statics) staticMethod() string {
    // jsiiruntime.methodcall(S)
}

func (S *Statics) justMethod() string {
    // jsiiruntime.methodcall(S)
}

type StripInternal struct {
    youSeeMe string
}

type StructA interface {
    getrequiredstring() string
    setrequiredstring()
    getoptionalnumber() number
    setoptionalnumber()
    getoptionalstring() string
    setoptionalstring()
}

type StructB interface {
    getrequiredstring() string
    setrequiredstring()
    getoptionalboolean() boolean
    setoptionalboolean()
    getoptionalstructa() StructA
    setoptionalstructa()
}

type StructParameterType interface {
    getscope() string
    setscope()
    getprops() boolean
    setprops()
}

type StructPassing struct {
}

func (S *StructPassing) howManyVarArgsDidIPass() number {
    // jsiiruntime.methodcall(S)
}

func (S *StructPassing) roundTrip() TopLevelStruct {
    // jsiiruntime.methodcall(S)
}

type StructUnionConsumer struct {
}

func (S *StructUnionConsumer) isStructA() boolean {
    // jsiiruntime.methodcall(S)
}

func (S *StructUnionConsumer) isStructB() boolean {
    // jsiiruntime.methodcall(S)
}

type StructWithJavaReservedWords interface {
    getdefault() string
    setdefault()
    getassert() string
    setassert()
    getresult() string
    setresult()
    getthat() string
    setthat()
}

type Sum struct {
    expression Value
    parts Array<@scope/jsii-calc-lib.Value>
}

type SupportsNiceJavaBuilder struct {
    id number
    rest Array<string>
}

type SupportsNiceJavaBuilderProps interface {
    getbar() number
    setbar()
    getid() string
    setid()
}

type SupportsNiceJavaBuilderWithRequiredProps struct {
    bar number
    id number
    propId string
}

type SyncVirtualMethods struct {
    readonlyProperty string
    a number
    callerIsProperty number
    otherProperty string
    theProperty string
    valueOfOtherProperty string
}

func (S *SyncVirtualMethods) callerIsAsync() number {
    // jsiiruntime.methodcall(S)
}

func (S *SyncVirtualMethods) callerIsMethod() number {
    // jsiiruntime.methodcall(S)
}

func (S *SyncVirtualMethods) modifyOtherProperty() {
    // jsiiruntime.methodcall(S)
}

func (S *SyncVirtualMethods) modifyValueOfTheProperty() {
    // jsiiruntime.methodcall(S)
}

func (S *SyncVirtualMethods) readA() number {
    // jsiiruntime.methodcall(S)
}

func (S *SyncVirtualMethods) retrieveOtherProperty() string {
    // jsiiruntime.methodcall(S)
}

func (S *SyncVirtualMethods) retrieveReadOnlyProperty() string {
    // jsiiruntime.methodcall(S)
}

func (S *SyncVirtualMethods) retrieveValueOfTheProperty() string {
    // jsiiruntime.methodcall(S)
}

func (S *SyncVirtualMethods) virtualMethod() number {
    // jsiiruntime.methodcall(S)
}

func (S *SyncVirtualMethods) writeA() {
    // jsiiruntime.methodcall(S)
}

type Thrower struct {
}

func (T *Thrower) throwError() {
    // jsiiruntime.methodcall(T)
}

type TopLevelStruct interface {
    getrequired() string
    setrequired()
    getsecondlevel() number | jsii-calc.SecondLevelStruct
    setsecondlevel()
    getoptional() string
    setoptional()
}

type UnaryOperation struct {
    operand Value
}

type UnionProperties interface {
    getbar() string | number | jsii-calc.AllTypes
    setbar()
    getfoo() string | number
    setfoo()
}

type UpcasingReflectable struct {
    reflector Reflector
    entries Array<@scope/jsii-calc-lib.submodule.ReflectableEntry>
}

type UseBundledDependency struct {
}

func (U *UseBundledDependency) value() any {
    // jsiiruntime.methodcall(U)
}

type UseCalcBase struct {
}

func (U *UseCalcBase) hello() Base {
    // jsiiruntime.methodcall(U)
}

type UsesInterfaceWithProperties struct {
    obj IInterfaceWithProperties
}

func (U *UsesInterfaceWithProperties) justRead() string {
    // jsiiruntime.methodcall(U)
}

func (U *UsesInterfaceWithProperties) readStringAndNumber() string {
    // jsiiruntime.methodcall(U)
}

func (U *UsesInterfaceWithProperties) writeAndRead() string {
    // jsiiruntime.methodcall(U)
}

type VariadicInvoker struct {
}

func (V *VariadicInvoker) asArray() Array<number> {
    // jsiiruntime.methodcall(V)
}

type VariadicMethod struct {
}

func (V *VariadicMethod) asArray() Array<number> {
    // jsiiruntime.methodcall(V)
}

type VirtualMethodPlayground struct {
}

func (V *VirtualMethodPlayground) overrideMeAsync() number {
    // jsiiruntime.methodcall(V)
}

func (V *VirtualMethodPlayground) overrideMeSync() number {
    // jsiiruntime.methodcall(V)
}

func (V *VirtualMethodPlayground) parallelSumAsync() number {
    // jsiiruntime.methodcall(V)
}

func (V *VirtualMethodPlayground) serialSumAsync() number {
    // jsiiruntime.methodcall(V)
}

func (V *VirtualMethodPlayground) sumSync() number {
    // jsiiruntime.methodcall(V)
}

type VoidCallback struct {
    methodWasCalled boolean
}

func (V *VoidCallback) callMe() {
    // jsiiruntime.methodcall(V)
}

func (V *VoidCallback) overrideMe() {
    // jsiiruntime.methodcall(V)
}

type WithPrivatePropertyInConstructor struct {
    success boolean
}

