package jsiicalc

type AbstractClass struct {
    propfrominterface string
}

func (a *AbstractClass) abstractmethod()  string {
    // jsiiruntime.methodcall(a)
}

func (a *AbstractClass) nonabstractmethod()  number {
    // jsiiruntime.methodcall(a)
}

type AbstractClassBase struct {
    abstractproperty string
}

type AbstractClassReturner struct {
    returnabstractfromproperty AbstractClassBase
}

func (a *AbstractClassReturner) givemeabstract()  AbstractClass {
    // jsiiruntime.methodcall(a)
}

func (a *AbstractClassReturner) givemeinterface()  IInterfaceImplementedByAbstractClass {
    // jsiiruntime.methodcall(a)
}

type AbstractSuite struct {
    property string
}

func (a *AbstractSuite) somemethod()  string {
    // jsiiruntime.methodcall(a)
}

func (a *AbstractSuite) workitall()  string {
    // jsiiruntime.methodcall(a)
}

type Add struct {
    value number
}

func (a *Add) tostring()  string {
    // jsiiruntime.methodcall(a)
}

type AllTypes struct {
    enumpropertyvalue number
    anyarrayproperty Array<any>
    anymapproperty Map<string => any>
    anyproperty any
    arrayproperty Array<string>
    booleanproperty boolean
    dateproperty date
    enumproperty AllTypesEnum
    jsonproperty json
    mapproperty Map<string => @scope/jsii-calc-lib.Number>
    numberproperty number
    stringproperty string
    unionarrayproperty Array<number | @scope/jsii-calc-lib.Value>
    unionmapproperty Map<string => string | number | @scope/jsii-calc-lib.Number>
    unionproperty string | number | jsii-calc.Multiply | @scope/jsii-calc-lib.Number
    unknownarrayproperty Array<any>
    unknownmapproperty Map<string => any>
    unknownproperty any
    optionalenumvalue StringEnum
}

func (a *AllTypes) anyin()  {
    // jsiiruntime.methodcall(a)
}

func (a *AllTypes) anyout()  any {
    // jsiiruntime.methodcall(a)
}

func (a *AllTypes) enummethod()  StringEnum {
    // jsiiruntime.methodcall(a)
}

type AllowedMethodNames struct {
}

func (a *AllowedMethodNames) getbar()  {
    // jsiiruntime.methodcall(a)
}

func (a *AllowedMethodNames) getfoo()  string {
    // jsiiruntime.methodcall(a)
}

func (a *AllowedMethodNames) setbar()  {
    // jsiiruntime.methodcall(a)
}

func (a *AllowedMethodNames) setfoo()  {
    // jsiiruntime.methodcall(a)
}

type AmbiguousParameters struct {
    props StructParameterType
    scope Bell
}

type AnonymousImplementationProvider struct {
}

func (a *AnonymousImplementationProvider) provideasclass()  Implementation {
    // jsiiruntime.methodcall(a)
}

func (a *AnonymousImplementationProvider) provideasinterface()  IAnonymouslyImplementMe {
    // jsiiruntime.methodcall(a)
}

type AsyncVirtualMethods struct {
}

func (a *AsyncVirtualMethods) callme()  number {
    // jsiiruntime.methodcall(a)
}

func (a *AsyncVirtualMethods) callme2()  number {
    // jsiiruntime.methodcall(a)
}

func (a *AsyncVirtualMethods) callmedoublepromise()  number {
    // jsiiruntime.methodcall(a)
}

func (a *AsyncVirtualMethods) dontoverrideme()  number {
    // jsiiruntime.methodcall(a)
}

func (a *AsyncVirtualMethods) overrideme()  number {
    // jsiiruntime.methodcall(a)
}

func (a *AsyncVirtualMethods) overridemetoo()  number {
    // jsiiruntime.methodcall(a)
}

type AugmentableClass struct {
}

func (a *AugmentableClass) methodone()  {
    // jsiiruntime.methodcall(a)
}

func (a *AugmentableClass) methodtwo()  {
    // jsiiruntime.methodcall(a)
}

type BaseJsii976 struct {
}

type Bell struct {
    rung boolean
}

func (b *Bell) ring()  {
    // jsiiruntime.methodcall(b)
}

type BinaryOperation struct {
    lhs Value
    rhs Value
}

func (b *BinaryOperation) hello()  string {
    // jsiiruntime.methodcall(b)
}

type Calculator struct {
    expression Value
    operationslog Array<@scope/jsii-calc-lib.Value>
    operationsmap Map<string => Array<@scope/jsii-calc-lib.Value>>
    curr Value
    maxvalue number
    unionproperty jsii-calc.Add | jsii-calc.Multiply | jsii-calc.Power
}

func (c *Calculator) add()  {
    // jsiiruntime.methodcall(c)
}

func (c *Calculator) mul()  {
    // jsiiruntime.methodcall(c)
}

func (c *Calculator) neg()  {
    // jsiiruntime.methodcall(c)
}

func (c *Calculator) pow()  {
    // jsiiruntime.methodcall(c)
}

func (c *Calculator) readunionvalue()  number {
    // jsiiruntime.methodcall(c)
}

type CalculatorProps interface {
    getinitialValue() number
    setinitialValue()
    getmaximumValue() number
    setmaximumValue()
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
    staticarray Array<string>
    staticmap Map<string => string>
    array Array<string>
    map Map<string => string>
}

func (c *ClassWithCollections) createalist()  Array<string> {
    // jsiiruntime.methodcall(c)
}

func (c *ClassWithCollections) createamap()  Map<string => string> {
    // jsiiruntime.methodcall(c)
}

type ClassWithDocs struct {
}

type ClassWithJavaReservedWords struct {
    int string
}

func (c *ClassWithJavaReservedWords) import()  string {
    // jsiiruntime.methodcall(c)
}

type ClassWithMutableObjectLiteralProperty struct {
    mutableobject IMutableObjectLiteral
}

type ClassWithPrivateConstructorAndAutomaticProperties struct {
    readonlystring string
    readwritestring string
}

func (c *ClassWithPrivateConstructorAndAutomaticProperties) create()  ClassWithPrivateConstructorAndAutomaticProperties {
    // jsiiruntime.methodcall(c)
}

type ConfusingToJackson struct {
    unionproperty @scope/jsii-calc-lib.IFriendly | Array<@scope/jsii-calc-lib.IFriendly | jsii-calc.AbstractClass>
}

func (c *ConfusingToJackson) makeinstance()  ConfusingToJackson {
    // jsiiruntime.methodcall(c)
}

func (c *ConfusingToJackson) makestructinstance()  ConfusingToJacksonStruct {
    // jsiiruntime.methodcall(c)
}

type ConfusingToJacksonStruct interface {
    getunionProperty() @scope/jsii-calc-lib.IFriendly | Array<@scope/jsii-calc-lib.IFriendly | jsii-calc.AbstractClass>
    setunionProperty()
}

type ConstructorPassesThisOut struct {
}

type Constructors struct {
}

func (c *Constructors) hiddeninterface()  IPublicInterface {
    // jsiiruntime.methodcall(c)
}

func (c *Constructors) hiddeninterfaces()  Array<jsii-calc.IPublicInterface> {
    // jsiiruntime.methodcall(c)
}

func (c *Constructors) hiddensubinterfaces()  Array<jsii-calc.IPublicInterface> {
    // jsiiruntime.methodcall(c)
}

func (c *Constructors) makeclass()  PublicClass {
    // jsiiruntime.methodcall(c)
}

func (c *Constructors) makeinterface()  IPublicInterface {
    // jsiiruntime.methodcall(c)
}

func (c *Constructors) makeinterface2()  IPublicInterface2 {
    // jsiiruntime.methodcall(c)
}

func (c *Constructors) makeinterfaces()  Array<jsii-calc.IPublicInterface> {
    // jsiiruntime.methodcall(c)
}

type ConsumePureInterface struct {
}

func (c *ConsumePureInterface) workitbaby()  StructB {
    // jsiiruntime.methodcall(c)
}

type ConsumerCanRingBell struct {
}

func (c *ConsumerCanRingBell) staticimplementedbyobjectliteral()  boolean {
    // jsiiruntime.methodcall(c)
}

func (c *ConsumerCanRingBell) staticimplementedbyprivateclass()  boolean {
    // jsiiruntime.methodcall(c)
}

func (c *ConsumerCanRingBell) staticimplementedbypublicclass()  boolean {
    // jsiiruntime.methodcall(c)
}

func (c *ConsumerCanRingBell) staticwhentypedasclass()  boolean {
    // jsiiruntime.methodcall(c)
}

func (c *ConsumerCanRingBell) implementedbyobjectliteral()  boolean {
    // jsiiruntime.methodcall(c)
}

func (c *ConsumerCanRingBell) implementedbyprivateclass()  boolean {
    // jsiiruntime.methodcall(c)
}

func (c *ConsumerCanRingBell) implementedbypublicclass()  boolean {
    // jsiiruntime.methodcall(c)
}

func (c *ConsumerCanRingBell) whentypedasclass()  boolean {
    // jsiiruntime.methodcall(c)
}

type ConsumersOfThisCrazyTypeSystem struct {
}

func (c *ConsumersOfThisCrazyTypeSystem) consumeanotherpublicinterface()  string {
    // jsiiruntime.methodcall(c)
}

func (c *ConsumersOfThisCrazyTypeSystem) consumenoninternalinterface()  any {
    // jsiiruntime.methodcall(c)
}

type DataRenderer struct {
}

func (d *DataRenderer) render()  string {
    // jsiiruntime.methodcall(d)
}

func (d *DataRenderer) renderarbitrary()  string {
    // jsiiruntime.methodcall(d)
}

func (d *DataRenderer) rendermap()  string {
    // jsiiruntime.methodcall(d)
}

type DefaultedConstructorArgument struct {
    arg1 number
    arg3 date
    arg2 string
}

type Demonstrate982 struct {
}

func (d *Demonstrate982) takethis()  ChildStruct982 {
    // jsiiruntime.methodcall(d)
}

func (d *Demonstrate982) takethistoo()  ParentStruct982 {
    // jsiiruntime.methodcall(d)
}

type DeprecatedClass struct {
    readonlyproperty string
    mutableproperty number
}

func (d *DeprecatedClass) method()  {
    // jsiiruntime.methodcall(d)
}

type DeprecatedStruct interface {
    getreadonlyProperty() string
    setreadonlyProperty()
}

type DerivedStruct interface {
    getanotherRequired() date
    setanotherRequired()
    getbool() boolean
    setbool()
    getnonPrimitive() DoubleTrouble
    setnonPrimitive()
    getanotherOptional() Map<string => @scope/jsii-calc-lib.Value>
    setanotherOptional()
    getoptionalAny() any
    setoptionalAny()
    getoptionalArray() Array<string>
    setoptionalArray()
}

type DiamondInheritanceBaseLevelStruct interface {
    getbaseLevelProperty() string
    setbaseLevelProperty()
}

type DiamondInheritanceFirstMidLevelStruct interface {
    getfirstMidLevelProperty() string
    setfirstMidLevelProperty()
}

type DiamondInheritanceSecondMidLevelStruct interface {
    getsecondMidLevelProperty() string
    setsecondMidLevelProperty()
}

type DiamondInheritanceTopLevelStruct interface {
    gettopLevelProperty() string
    settopLevelProperty()
}

type DisappointingCollectionSource struct {
    maybelist Array<string>
    maybemap Map<string => number>
}

type DoNotOverridePrivates struct {
}

func (d *DoNotOverridePrivates) changeprivatepropertyvalue()  {
    // jsiiruntime.methodcall(d)
}

func (d *DoNotOverridePrivates) privatemethodvalue()  string {
    // jsiiruntime.methodcall(d)
}

func (d *DoNotOverridePrivates) privatepropertyvalue()  string {
    // jsiiruntime.methodcall(d)
}

type DoNotRecognizeAnyAsOptional struct {
}

func (d *DoNotRecognizeAnyAsOptional) method()  {
    // jsiiruntime.methodcall(d)
}

type DocumentedClass struct {
}

func (d *DocumentedClass) greet()  number {
    // jsiiruntime.methodcall(d)
}

func (d *DocumentedClass) hola()  {
    // jsiiruntime.methodcall(d)
}

type DontComplainAboutVariadicAfterOptional struct {
}

func (d *DontComplainAboutVariadicAfterOptional) optionalandvariadic()  string {
    // jsiiruntime.methodcall(d)
}

type DoubleTrouble struct {
}

func (d *DoubleTrouble) hello()  string {
    // jsiiruntime.methodcall(d)
}

func (d *DoubleTrouble) next()  number {
    // jsiiruntime.methodcall(d)
}

type EnumDispenser struct {
}

func (e *EnumDispenser) randomintegerlikeenum()  AllTypesEnum {
    // jsiiruntime.methodcall(e)
}

func (e *EnumDispenser) randomstringlikeenum()  StringEnum {
    // jsiiruntime.methodcall(e)
}

type EraseUndefinedHashValues struct {
}

func (e *EraseUndefinedHashValues) doeskeyexist()  boolean {
    // jsiiruntime.methodcall(e)
}

func (e *EraseUndefinedHashValues) prop1isnull()  Map<string => any> {
    // jsiiruntime.methodcall(e)
}

func (e *EraseUndefinedHashValues) prop2isundefined()  Map<string => any> {
    // jsiiruntime.methodcall(e)
}

type EraseUndefinedHashValuesOptions interface {
    getoption1() string
    setoption1()
    getoption2() string
    setoption2()
}

type ExperimentalClass struct {
    readonlyproperty string
    mutableproperty number
}

func (e *ExperimentalClass) method()  {
    // jsiiruntime.methodcall(e)
}

type ExperimentalStruct interface {
    getreadonlyProperty() string
    setreadonlyProperty()
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
    readonlyproperty string
    mutableproperty number
}

func (e *ExternalClass) method()  {
    // jsiiruntime.methodcall(e)
}

type ExternalStruct interface {
    getreadonlyProperty() string
    setreadonlyProperty()
}

type GiveMeStructs struct {
    structliteral StructWithOnlyOptionals
}

func (g *GiveMeStructs) derivedtofirst()  MyFirstStruct {
    // jsiiruntime.methodcall(g)
}

func (g *GiveMeStructs) readderivednonprimitive()  DoubleTrouble {
    // jsiiruntime.methodcall(g)
}

func (g *GiveMeStructs) readfirstnumber()  number {
    // jsiiruntime.methodcall(g)
}

type Greetee interface {
    getname() string
    setname()
}

type GreetingAugmenter struct {
}

func (g *GreetingAugmenter) bettergreeting()  string {
    // jsiiruntime.methodcall(g)
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
    getmutableProperty() number
    setmutableProperty()
}

type IExperimentalInterface interface {
    method()
    getmutableProperty() number
    setmutableProperty()
}

type IExtendsPrivateInterface interface {
    getmoreThings() Array<string>
    setmoreThings()
    getprivate() string
    setprivate()
}

type IExternalInterface interface {
    method()
    getmutableProperty() number
    setmutableProperty()
}

type IFriendlier interface {
    farewell() string
    goodbye() string
}

type IFriendlyRandomGenerator interface {
}

type IInterfaceImplementedByAbstractClass interface {
    getpropFromInterface() string
    setpropFromInterface()
}

type IInterfaceThatShouldNotBeADataType interface {
    getotherValue() string
    setotherValue()
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
    getreadOnlyString() string
    setreadOnlyString()
    getreadWriteString() string
    setreadWriteString()
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
    gethasRoot() boolean
    sethasRoot()
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
    getnumberProp() Number
    setnumberProp()
}

type IStableInterface interface {
    method()
    getmutableProperty() number
    setmutableProperty()
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

func (i *ImplementsInterfaceWithInternal) visible()  {
    // jsiiruntime.methodcall(i)
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

func (i *InbetweenClass) ciao()  string {
    // jsiiruntime.methodcall(i)
}

type InterfaceCollections struct {
}

func (i *InterfaceCollections) listofinterfaces()  Array<jsii-calc.IBell> {
    // jsiiruntime.methodcall(i)
}

func (i *InterfaceCollections) listofstructs()  Array<jsii-calc.StructA> {
    // jsiiruntime.methodcall(i)
}

func (i *InterfaceCollections) mapofinterfaces()  Map<string => jsii-calc.IBell> {
    // jsiiruntime.methodcall(i)
}

func (i *InterfaceCollections) mapofstructs()  Map<string => jsii-calc.StructA> {
    // jsiiruntime.methodcall(i)
}

type InterfacesMaker struct {
}

func (i *InterfacesMaker) makeinterfaces()  Array<@scope/jsii-calc-lib.IDoublable> {
    // jsiiruntime.methodcall(i)
}

type JSII417Derived struct {
    property string
}

func (j *JSII417Derived) bar()  {
    // jsiiruntime.methodcall(j)
}

func (j *JSII417Derived) baz()  {
    // jsiiruntime.methodcall(j)
}

type JSII417PublicBaseOfBase struct {
    hasroot boolean
}

func (j *JSII417PublicBaseOfBase) makeinstance()  JSII417PublicBaseOfBase {
    // jsiiruntime.methodcall(j)
}

func (j *JSII417PublicBaseOfBase) foo()  {
    // jsiiruntime.methodcall(j)
}

type JSObjectLiteralForInterface struct {
}

func (j *JSObjectLiteralForInterface) givemefriendly()  IFriendly {
    // jsiiruntime.methodcall(j)
}

func (j *JSObjectLiteralForInterface) givemefriendlygenerator()  IFriendlyRandomGenerator {
    // jsiiruntime.methodcall(j)
}

type JSObjectLiteralToNative struct {
}

func (j *JSObjectLiteralToNative) returnliteral()  JSObjectLiteralToNativeClass {
    // jsiiruntime.methodcall(j)
}

type JSObjectLiteralToNativeClass struct {
    propa string
    propb number
}

type JavaReservedWords struct {
    while string
}

func (j *JavaReservedWords) abstract()  {
    // jsiiruntime.methodcall(j)
}

func (j *JavaReservedWords) assert()  {
    // jsiiruntime.methodcall(j)
}

func (j *JavaReservedWords) boolean()  {
    // jsiiruntime.methodcall(j)
}

func (j *JavaReservedWords) break()  {
    // jsiiruntime.methodcall(j)
}

func (j *JavaReservedWords) byte()  {
    // jsiiruntime.methodcall(j)
}

func (j *JavaReservedWords) case()  {
    // jsiiruntime.methodcall(j)
}

func (j *JavaReservedWords) catch()  {
    // jsiiruntime.methodcall(j)
}

func (j *JavaReservedWords) char()  {
    // jsiiruntime.methodcall(j)
}

func (j *JavaReservedWords) class()  {
    // jsiiruntime.methodcall(j)
}

func (j *JavaReservedWords) const()  {
    // jsiiruntime.methodcall(j)
}

func (j *JavaReservedWords) continue()  {
    // jsiiruntime.methodcall(j)
}

func (j *JavaReservedWords) default()  {
    // jsiiruntime.methodcall(j)
}

func (j *JavaReservedWords) do()  {
    // jsiiruntime.methodcall(j)
}

func (j *JavaReservedWords) double()  {
    // jsiiruntime.methodcall(j)
}

func (j *JavaReservedWords) else()  {
    // jsiiruntime.methodcall(j)
}

func (j *JavaReservedWords) enum()  {
    // jsiiruntime.methodcall(j)
}

func (j *JavaReservedWords) extends()  {
    // jsiiruntime.methodcall(j)
}

func (j *JavaReservedWords) false()  {
    // jsiiruntime.methodcall(j)
}

func (j *JavaReservedWords) final()  {
    // jsiiruntime.methodcall(j)
}

func (j *JavaReservedWords) finally()  {
    // jsiiruntime.methodcall(j)
}

func (j *JavaReservedWords) float()  {
    // jsiiruntime.methodcall(j)
}

func (j *JavaReservedWords) for()  {
    // jsiiruntime.methodcall(j)
}

func (j *JavaReservedWords) goto()  {
    // jsiiruntime.methodcall(j)
}

func (j *JavaReservedWords) if()  {
    // jsiiruntime.methodcall(j)
}

func (j *JavaReservedWords) implements()  {
    // jsiiruntime.methodcall(j)
}

func (j *JavaReservedWords) import()  {
    // jsiiruntime.methodcall(j)
}

func (j *JavaReservedWords) instanceof()  {
    // jsiiruntime.methodcall(j)
}

func (j *JavaReservedWords) int()  {
    // jsiiruntime.methodcall(j)
}

func (j *JavaReservedWords) interface()  {
    // jsiiruntime.methodcall(j)
}

func (j *JavaReservedWords) long()  {
    // jsiiruntime.methodcall(j)
}

func (j *JavaReservedWords) native()  {
    // jsiiruntime.methodcall(j)
}

func (j *JavaReservedWords) new()  {
    // jsiiruntime.methodcall(j)
}

func (j *JavaReservedWords) null()  {
    // jsiiruntime.methodcall(j)
}

func (j *JavaReservedWords) package()  {
    // jsiiruntime.methodcall(j)
}

func (j *JavaReservedWords) private()  {
    // jsiiruntime.methodcall(j)
}

func (j *JavaReservedWords) protected()  {
    // jsiiruntime.methodcall(j)
}

func (j *JavaReservedWords) public()  {
    // jsiiruntime.methodcall(j)
}

func (j *JavaReservedWords) return()  {
    // jsiiruntime.methodcall(j)
}

func (j *JavaReservedWords) short()  {
    // jsiiruntime.methodcall(j)
}

func (j *JavaReservedWords) static()  {
    // jsiiruntime.methodcall(j)
}

func (j *JavaReservedWords) strictfp()  {
    // jsiiruntime.methodcall(j)
}

func (j *JavaReservedWords) super()  {
    // jsiiruntime.methodcall(j)
}

func (j *JavaReservedWords) switch()  {
    // jsiiruntime.methodcall(j)
}

func (j *JavaReservedWords) synchronized()  {
    // jsiiruntime.methodcall(j)
}

func (j *JavaReservedWords) this()  {
    // jsiiruntime.methodcall(j)
}

func (j *JavaReservedWords) throw()  {
    // jsiiruntime.methodcall(j)
}

func (j *JavaReservedWords) throws()  {
    // jsiiruntime.methodcall(j)
}

func (j *JavaReservedWords) transient()  {
    // jsiiruntime.methodcall(j)
}

func (j *JavaReservedWords) true()  {
    // jsiiruntime.methodcall(j)
}

func (j *JavaReservedWords) try()  {
    // jsiiruntime.methodcall(j)
}

func (j *JavaReservedWords) void()  {
    // jsiiruntime.methodcall(j)
}

func (j *JavaReservedWords) volatile()  {
    // jsiiruntime.methodcall(j)
}

type Jsii487Derived struct {
}

type Jsii496Derived struct {
}

type JsiiAgent struct {
    jsiiagent string
}

type JsonFormatter struct {
}

func (j *JsonFormatter) anyarray()  any {
    // jsiiruntime.methodcall(j)
}

func (j *JsonFormatter) anybooleanfalse()  any {
    // jsiiruntime.methodcall(j)
}

func (j *JsonFormatter) anybooleantrue()  any {
    // jsiiruntime.methodcall(j)
}

func (j *JsonFormatter) anydate()  any {
    // jsiiruntime.methodcall(j)
}

func (j *JsonFormatter) anyemptystring()  any {
    // jsiiruntime.methodcall(j)
}

func (j *JsonFormatter) anyfunction()  any {
    // jsiiruntime.methodcall(j)
}

func (j *JsonFormatter) anyhash()  any {
    // jsiiruntime.methodcall(j)
}

func (j *JsonFormatter) anynull()  any {
    // jsiiruntime.methodcall(j)
}

func (j *JsonFormatter) anynumber()  any {
    // jsiiruntime.methodcall(j)
}

func (j *JsonFormatter) anyref()  any {
    // jsiiruntime.methodcall(j)
}

func (j *JsonFormatter) anystring()  any {
    // jsiiruntime.methodcall(j)
}

func (j *JsonFormatter) anyundefined()  any {
    // jsiiruntime.methodcall(j)
}

func (j *JsonFormatter) anyzero()  any {
    // jsiiruntime.methodcall(j)
}

func (j *JsonFormatter) stringify()  string {
    // jsiiruntime.methodcall(j)
}

type LoadBalancedFargateServiceProps interface {
    getcontainerPort() number
    setcontainerPort()
    getcpu() string
    setcpu()
    getmemoryMiB() string
    setmemoryMiB()
    getpublicLoadBalancer() boolean
    setpublicLoadBalancer()
    getpublicTasks() boolean
    setpublicTasks()
}

type MethodNamedProperty struct {
    elite number
}

func (m *MethodNamedProperty) property()  string {
    // jsiiruntime.methodcall(m)
}

type Multiply struct {
    value number
}

func (m *Multiply) farewell()  string {
    // jsiiruntime.methodcall(m)
}

func (m *Multiply) goodbye()  string {
    // jsiiruntime.methodcall(m)
}

func (m *Multiply) next()  number {
    // jsiiruntime.methodcall(m)
}

func (m *Multiply) tostring()  string {
    // jsiiruntime.methodcall(m)
}

type Negate struct {
    value number
}

func (n *Negate) farewell()  string {
    // jsiiruntime.methodcall(n)
}

func (n *Negate) goodbye()  string {
    // jsiiruntime.methodcall(n)
}

func (n *Negate) hello()  string {
    // jsiiruntime.methodcall(n)
}

func (n *Negate) tostring()  string {
    // jsiiruntime.methodcall(n)
}

type NestedStruct interface {
    getnumberProp() number
    setnumberProp()
}

type NodeStandardLibrary struct {
    osplatform string
}

func (n *NodeStandardLibrary) cryptosha256()  string {
    // jsiiruntime.methodcall(n)
}

func (n *NodeStandardLibrary) fsreadfile()  string {
    // jsiiruntime.methodcall(n)
}

func (n *NodeStandardLibrary) fsreadfilesync()  string {
    // jsiiruntime.methodcall(n)
}

type NullShouldBeTreatedAsUndefined struct {
    changemetoundefined string
}

func (n *NullShouldBeTreatedAsUndefined) givemeundefined()  {
    // jsiiruntime.methodcall(n)
}

func (n *NullShouldBeTreatedAsUndefined) givemeundefinedinsideanobject()  {
    // jsiiruntime.methodcall(n)
}

func (n *NullShouldBeTreatedAsUndefined) verifypropertyisundefined()  {
    // jsiiruntime.methodcall(n)
}

type NullShouldBeTreatedAsUndefinedData interface {
    getarrayWithThreeElementsAndUndefinedAsSecondArgument() Array<any>
    setarrayWithThreeElementsAndUndefinedAsSecondArgument()
    getthisShouldBeUndefined() any
    setthisShouldBeUndefined()
}

type NumberGenerator struct {
    generator IRandomNumberGenerator
}

func (n *NumberGenerator) issamegenerator()  boolean {
    // jsiiruntime.methodcall(n)
}

func (n *NumberGenerator) nexttimes100()  number {
    // jsiiruntime.methodcall(n)
}

type ObjectRefsInCollections struct {
}

func (o *ObjectRefsInCollections) sumfromarray()  number {
    // jsiiruntime.methodcall(o)
}

func (o *ObjectRefsInCollections) sumfrommap()  number {
    // jsiiruntime.methodcall(o)
}

type ObjectWithPropertyProvider struct {
}

func (o *ObjectWithPropertyProvider) provide()  IObjectWithProperty {
    // jsiiruntime.methodcall(o)
}

type Old struct {
}

func (o *Old) doathing()  {
    // jsiiruntime.methodcall(o)
}

type OptionalArgumentInvoker struct {
}

func (o *OptionalArgumentInvoker) invokewithoptional()  {
    // jsiiruntime.methodcall(o)
}

func (o *OptionalArgumentInvoker) invokewithoutoptional()  {
    // jsiiruntime.methodcall(o)
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
    parameterwasundefined boolean
    fieldvalue string
}

type OverridableProtectedMember struct {
    overridereadonly string
    overridereadwrite string
}

func (o *OverridableProtectedMember) overrideme()  string {
    // jsiiruntime.methodcall(o)
}

func (o *OverridableProtectedMember) switchmodes()  {
    // jsiiruntime.methodcall(o)
}

func (o *OverridableProtectedMember) valuefromprotected()  string {
    // jsiiruntime.methodcall(o)
}

type OverrideReturnsObject struct {
}

func (o *OverrideReturnsObject) test()  number {
    // jsiiruntime.methodcall(o)
}

type ParentStruct982 interface {
    getfoo() string
    setfoo()
}

type PartiallyInitializedThisConsumer struct {
}

func (p *PartiallyInitializedThisConsumer) consumepartiallyinitializedthis()  string {
    // jsiiruntime.methodcall(p)
}

type Polymorphism struct {
}

func (p *Polymorphism) sayhello()  string {
    // jsiiruntime.methodcall(p)
}

type Power struct {
    base Value
    expression Value
    pow Value
}

type PropertyNamedProperty struct {
    property string
    yetanoterone boolean
}

type PublicClass struct {
}

func (p *PublicClass) hello()  {
    // jsiiruntime.methodcall(p)
}

type PythonReservedWords struct {
}

func (p *PythonReservedWords) and()  {
    // jsiiruntime.methodcall(p)
}

func (p *PythonReservedWords) as()  {
    // jsiiruntime.methodcall(p)
}

func (p *PythonReservedWords) assert()  {
    // jsiiruntime.methodcall(p)
}

func (p *PythonReservedWords) async()  {
    // jsiiruntime.methodcall(p)
}

func (p *PythonReservedWords) await()  {
    // jsiiruntime.methodcall(p)
}

func (p *PythonReservedWords) break()  {
    // jsiiruntime.methodcall(p)
}

func (p *PythonReservedWords) class()  {
    // jsiiruntime.methodcall(p)
}

func (p *PythonReservedWords) continue()  {
    // jsiiruntime.methodcall(p)
}

func (p *PythonReservedWords) def()  {
    // jsiiruntime.methodcall(p)
}

func (p *PythonReservedWords) del()  {
    // jsiiruntime.methodcall(p)
}

func (p *PythonReservedWords) elif()  {
    // jsiiruntime.methodcall(p)
}

func (p *PythonReservedWords) else()  {
    // jsiiruntime.methodcall(p)
}

func (p *PythonReservedWords) except()  {
    // jsiiruntime.methodcall(p)
}

func (p *PythonReservedWords) finally()  {
    // jsiiruntime.methodcall(p)
}

func (p *PythonReservedWords) for()  {
    // jsiiruntime.methodcall(p)
}

func (p *PythonReservedWords) from()  {
    // jsiiruntime.methodcall(p)
}

func (p *PythonReservedWords) global()  {
    // jsiiruntime.methodcall(p)
}

func (p *PythonReservedWords) if()  {
    // jsiiruntime.methodcall(p)
}

func (p *PythonReservedWords) import()  {
    // jsiiruntime.methodcall(p)
}

func (p *PythonReservedWords) in()  {
    // jsiiruntime.methodcall(p)
}

func (p *PythonReservedWords) is()  {
    // jsiiruntime.methodcall(p)
}

func (p *PythonReservedWords) lambda()  {
    // jsiiruntime.methodcall(p)
}

func (p *PythonReservedWords) nonlocal()  {
    // jsiiruntime.methodcall(p)
}

func (p *PythonReservedWords) not()  {
    // jsiiruntime.methodcall(p)
}

func (p *PythonReservedWords) or()  {
    // jsiiruntime.methodcall(p)
}

func (p *PythonReservedWords) pass()  {
    // jsiiruntime.methodcall(p)
}

func (p *PythonReservedWords) raise()  {
    // jsiiruntime.methodcall(p)
}

func (p *PythonReservedWords) return()  {
    // jsiiruntime.methodcall(p)
}

func (p *PythonReservedWords) try()  {
    // jsiiruntime.methodcall(p)
}

func (p *PythonReservedWords) while()  {
    // jsiiruntime.methodcall(p)
}

func (p *PythonReservedWords) with()  {
    // jsiiruntime.methodcall(p)
}

func (p *PythonReservedWords) yield()  {
    // jsiiruntime.methodcall(p)
}

type ReferenceEnumFromScopedPackage struct {
    foo EnumFromScopedModule
}

func (r *ReferenceEnumFromScopedPackage) loadfoo()  EnumFromScopedModule {
    // jsiiruntime.methodcall(r)
}

func (r *ReferenceEnumFromScopedPackage) savefoo()  {
    // jsiiruntime.methodcall(r)
}

type ReturnsPrivateImplementationOfInterface struct {
    privateimplementation IPrivatelyImplemented
}

type RootStruct interface {
    getstringProp() string
    setstringProp()
    getnestedStruct() NestedStruct
    setnestedStruct()
}

type RootStructValidator struct {
}

func (r *RootStructValidator) validate()  {
    // jsiiruntime.methodcall(r)
}

type RuntimeTypeChecking struct {
}

func (r *RuntimeTypeChecking) methodwithdefaultedarguments()  {
    // jsiiruntime.methodcall(r)
}

func (r *RuntimeTypeChecking) methodwithoptionalanyargument()  {
    // jsiiruntime.methodcall(r)
}

func (r *RuntimeTypeChecking) methodwithoptionalarguments()  {
    // jsiiruntime.methodcall(r)
}

type SecondLevelStruct interface {
    getdeeperRequiredProp() string
    setdeeperRequiredProp()
    getdeeperOptionalProp() string
    setdeeperOptionalProp()
}

type SingleInstanceTwoTypes struct {
}

func (s *SingleInstanceTwoTypes) interface1()  InbetweenClass {
    // jsiiruntime.methodcall(s)
}

func (s *SingleInstanceTwoTypes) interface2()  IPublicInterface {
    // jsiiruntime.methodcall(s)
}

type SingletonInt struct {
}

func (s *SingletonInt) issingletonint()  boolean {
    // jsiiruntime.methodcall(s)
}

type SingletonString struct {
}

func (s *SingletonString) issingletonstring()  boolean {
    // jsiiruntime.methodcall(s)
}

type SmellyStruct interface {
    getproperty() string
    setproperty()
    getyetAnoterOne() boolean
    setyetAnoterOne()
}

type SomeTypeJsii976 struct {
}

func (s *SomeTypeJsii976) returnanonymous()  any {
    // jsiiruntime.methodcall(s)
}

func (s *SomeTypeJsii976) returnreturn()  IReturnJsii976 {
    // jsiiruntime.methodcall(s)
}

type StableClass struct {
    readonlyproperty string
    mutableproperty number
}

func (s *StableClass) method()  {
    // jsiiruntime.methodcall(s)
}

type StableStruct interface {
    getreadonlyProperty() string
    setreadonlyProperty()
}

type StaticContext struct {
    staticvariable boolean
}

func (s *StaticContext) canaccessstaticcontext()  boolean {
    // jsiiruntime.methodcall(s)
}

type Statics struct {
    bar number
    constobj DoubleTrouble
    foo string
    zoobar Map<string => string>
    instance Statics
    nonconststatic number
    value string
}

func (s *Statics) staticmethod()  string {
    // jsiiruntime.methodcall(s)
}

func (s *Statics) justmethod()  string {
    // jsiiruntime.methodcall(s)
}

type StripInternal struct {
    youseeme string
}

type StructA interface {
    getrequiredString() string
    setrequiredString()
    getoptionalNumber() number
    setoptionalNumber()
    getoptionalString() string
    setoptionalString()
}

type StructB interface {
    getrequiredString() string
    setrequiredString()
    getoptionalBoolean() boolean
    setoptionalBoolean()
    getoptionalStructA() StructA
    setoptionalStructA()
}

type StructParameterType interface {
    getscope() string
    setscope()
    getprops() boolean
    setprops()
}

type StructPassing struct {
}

func (s *StructPassing) howmanyvarargsdidipass()  number {
    // jsiiruntime.methodcall(s)
}

func (s *StructPassing) roundtrip()  TopLevelStruct {
    // jsiiruntime.methodcall(s)
}

type StructUnionConsumer struct {
}

func (s *StructUnionConsumer) isstructa()  boolean {
    // jsiiruntime.methodcall(s)
}

func (s *StructUnionConsumer) isstructb()  boolean {
    // jsiiruntime.methodcall(s)
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
    propid string
}

type SyncVirtualMethods struct {
    readonlyproperty string
    a number
    callerisproperty number
    otherproperty string
    theproperty string
    valueofotherproperty string
}

func (s *SyncVirtualMethods) callerisasync()  number {
    // jsiiruntime.methodcall(s)
}

func (s *SyncVirtualMethods) callerismethod()  number {
    // jsiiruntime.methodcall(s)
}

func (s *SyncVirtualMethods) modifyotherproperty()  {
    // jsiiruntime.methodcall(s)
}

func (s *SyncVirtualMethods) modifyvalueoftheproperty()  {
    // jsiiruntime.methodcall(s)
}

func (s *SyncVirtualMethods) reada()  number {
    // jsiiruntime.methodcall(s)
}

func (s *SyncVirtualMethods) retrieveotherproperty()  string {
    // jsiiruntime.methodcall(s)
}

func (s *SyncVirtualMethods) retrievereadonlyproperty()  string {
    // jsiiruntime.methodcall(s)
}

func (s *SyncVirtualMethods) retrievevalueoftheproperty()  string {
    // jsiiruntime.methodcall(s)
}

func (s *SyncVirtualMethods) virtualmethod()  number {
    // jsiiruntime.methodcall(s)
}

func (s *SyncVirtualMethods) writea()  {
    // jsiiruntime.methodcall(s)
}

type Thrower struct {
}

func (t *Thrower) throwerror()  {
    // jsiiruntime.methodcall(t)
}

type TopLevelStruct interface {
    getrequired() string
    setrequired()
    getsecondLevel() number | jsii-calc.SecondLevelStruct
    setsecondLevel()
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

func (u *UseBundledDependency) value()  any {
    // jsiiruntime.methodcall(u)
}

type UseCalcBase struct {
}

func (u *UseCalcBase) hello()  Base {
    // jsiiruntime.methodcall(u)
}

type UsesInterfaceWithProperties struct {
    obj IInterfaceWithProperties
}

func (u *UsesInterfaceWithProperties) justread()  string {
    // jsiiruntime.methodcall(u)
}

func (u *UsesInterfaceWithProperties) readstringandnumber()  string {
    // jsiiruntime.methodcall(u)
}

func (u *UsesInterfaceWithProperties) writeandread()  string {
    // jsiiruntime.methodcall(u)
}

type VariadicInvoker struct {
}

func (v *VariadicInvoker) asarray()  Array<number> {
    // jsiiruntime.methodcall(v)
}

type VariadicMethod struct {
}

func (v *VariadicMethod) asarray()  Array<number> {
    // jsiiruntime.methodcall(v)
}

type VirtualMethodPlayground struct {
}

func (v *VirtualMethodPlayground) overridemeasync()  number {
    // jsiiruntime.methodcall(v)
}

func (v *VirtualMethodPlayground) overridemesync()  number {
    // jsiiruntime.methodcall(v)
}

func (v *VirtualMethodPlayground) parallelsumasync()  number {
    // jsiiruntime.methodcall(v)
}

func (v *VirtualMethodPlayground) serialsumasync()  number {
    // jsiiruntime.methodcall(v)
}

func (v *VirtualMethodPlayground) sumsync()  number {
    // jsiiruntime.methodcall(v)
}

type VoidCallback struct {
    methodwascalled boolean
}

func (v *VoidCallback) callme()  {
    // jsiiruntime.methodcall(v)
}

func (v *VoidCallback) overrideme()  {
    // jsiiruntime.methodcall(v)
}

type WithPrivatePropertyInConstructor struct {
    success boolean
}

