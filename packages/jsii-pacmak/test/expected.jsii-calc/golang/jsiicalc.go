package jsiicalc

type abstractclass struct {
    propfrominterface string
}

func (a *abstractclass) abstractmethod()  string {
    // jsiiruntime.methodcall(a)
}

func (a *abstractclass) nonabstractmethod()  number {
    // jsiiruntime.methodcall(a)
}

type abstractclassbase struct {
    abstractproperty string
}

type abstractclassreturner struct {
    returnabstractfromproperty abstractclassbase
}

func (a *abstractclassreturner) givemeabstract()  abstractclass {
    // jsiiruntime.methodcall(a)
}

func (a *abstractclassreturner) givemeinterface()  iinterfaceimplementedbyabstractclass {
    // jsiiruntime.methodcall(a)
}

type abstractsuite struct {
    property string
}

func (a *abstractsuite) somemethod()  string {
    // jsiiruntime.methodcall(a)
}

func (a *abstractsuite) workitall()  string {
    // jsiiruntime.methodcall(a)
}

type add struct {
    value number
}

func (a *add) tostring()  string {
    // jsiiruntime.methodcall(a)
}

type alltypes struct {
    enumpropertyvalue number
    anyarrayproperty Array<any>
    anymapproperty Map<string => any>
    anyproperty any
    arrayproperty Array<string>
    booleanproperty boolean
    dateproperty date
    enumproperty alltypesenum
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
    optionalenumvalue stringenum
}

func (a *alltypes) anyin()  {
    // jsiiruntime.methodcall(a)
}

func (a *alltypes) anyout()  any {
    // jsiiruntime.methodcall(a)
}

func (a *alltypes) enummethod()  stringenum {
    // jsiiruntime.methodcall(a)
}

type allowedmethodnames struct {
}

func (a *allowedmethodnames) getbar()  {
    // jsiiruntime.methodcall(a)
}

func (a *allowedmethodnames) getfoo()  string {
    // jsiiruntime.methodcall(a)
}

func (a *allowedmethodnames) setbar()  {
    // jsiiruntime.methodcall(a)
}

func (a *allowedmethodnames) setfoo()  {
    // jsiiruntime.methodcall(a)
}

type ambiguousparameters struct {
    props structparametertype
    scope bell
}

type anonymousimplementationprovider struct {
}

func (a *anonymousimplementationprovider) provideasclass()  implementation {
    // jsiiruntime.methodcall(a)
}

func (a *anonymousimplementationprovider) provideasinterface()  ianonymouslyimplementme {
    // jsiiruntime.methodcall(a)
}

type asyncvirtualmethods struct {
}

func (a *asyncvirtualmethods) callme()  number {
    // jsiiruntime.methodcall(a)
}

func (a *asyncvirtualmethods) callme2()  number {
    // jsiiruntime.methodcall(a)
}

func (a *asyncvirtualmethods) callmedoublepromise()  number {
    // jsiiruntime.methodcall(a)
}

func (a *asyncvirtualmethods) dontoverrideme()  number {
    // jsiiruntime.methodcall(a)
}

func (a *asyncvirtualmethods) overrideme()  number {
    // jsiiruntime.methodcall(a)
}

func (a *asyncvirtualmethods) overridemetoo()  number {
    // jsiiruntime.methodcall(a)
}

type augmentableclass struct {
}

func (a *augmentableclass) methodone()  {
    // jsiiruntime.methodcall(a)
}

func (a *augmentableclass) methodtwo()  {
    // jsiiruntime.methodcall(a)
}

type basejsii976 struct {
}

type bell struct {
    rung boolean
}

func (b *bell) ring()  {
    // jsiiruntime.methodcall(b)
}

type binaryoperation struct {
    lhs value
    rhs value
}

func (b *binaryoperation) hello()  string {
    // jsiiruntime.methodcall(b)
}

type calculator struct {
    expression value
    operationslog Array<@scope/jsii-calc-lib.Value>
    operationsmap Map<string => Array<@scope/jsii-calc-lib.Value>>
    curr value
    maxvalue number
    unionproperty jsii-calc.Add | jsii-calc.Multiply | jsii-calc.Power
}

func (c *calculator) add()  {
    // jsiiruntime.methodcall(c)
}

func (c *calculator) mul()  {
    // jsiiruntime.methodcall(c)
}

func (c *calculator) neg()  {
    // jsiiruntime.methodcall(c)
}

func (c *calculator) pow()  {
    // jsiiruntime.methodcall(c)
}

func (c *calculator) readunionvalue()  number {
    // jsiiruntime.methodcall(c)
}

type calculatorprops interface {
    getinitialvalue() number
    setinitialvalue()
    getmaximumvalue() number
    setmaximumvalue()
}

type childstruct982 interface {
    getbar() number
    setbar()
}

type classthatimplementstheinternalinterface struct {
    a string
    b string
    c string
    d string
}

type classthatimplementstheprivateinterface struct {
    a string
    b string
    c string
    e string
}

type classwithcollections struct {
    staticarray Array<string>
    staticmap Map<string => string>
    array Array<string>
    map Map<string => string>
}

func (c *classwithcollections) createalist()  Array<string> {
    // jsiiruntime.methodcall(c)
}

func (c *classwithcollections) createamap()  Map<string => string> {
    // jsiiruntime.methodcall(c)
}

type classwithdocs struct {
}

type classwithjavareservedwords struct {
    int string
}

func (c *classwithjavareservedwords) import()  string {
    // jsiiruntime.methodcall(c)
}

type classwithmutableobjectliteralproperty struct {
    mutableobject imutableobjectliteral
}

type classwithprivateconstructorandautomaticproperties struct {
    readonlystring string
    readwritestring string
}

func (c *classwithprivateconstructorandautomaticproperties) create()  classwithprivateconstructorandautomaticproperties {
    // jsiiruntime.methodcall(c)
}

type confusingtojackson struct {
    unionproperty @scope/jsii-calc-lib.IFriendly | Array<@scope/jsii-calc-lib.IFriendly | jsii-calc.AbstractClass>
}

func (c *confusingtojackson) makeinstance()  confusingtojackson {
    // jsiiruntime.methodcall(c)
}

func (c *confusingtojackson) makestructinstance()  confusingtojacksonstruct {
    // jsiiruntime.methodcall(c)
}

type confusingtojacksonstruct interface {
    getunionproperty() @scope/jsii-calc-lib.IFriendly | Array<@scope/jsii-calc-lib.IFriendly | jsii-calc.AbstractClass>
    setunionproperty()
}

type constructorpassesthisout struct {
}

type constructors struct {
}

func (c *constructors) hiddeninterface()  ipublicinterface {
    // jsiiruntime.methodcall(c)
}

func (c *constructors) hiddeninterfaces()  Array<jsii-calc.IPublicInterface> {
    // jsiiruntime.methodcall(c)
}

func (c *constructors) hiddensubinterfaces()  Array<jsii-calc.IPublicInterface> {
    // jsiiruntime.methodcall(c)
}

func (c *constructors) makeclass()  publicclass {
    // jsiiruntime.methodcall(c)
}

func (c *constructors) makeinterface()  ipublicinterface {
    // jsiiruntime.methodcall(c)
}

func (c *constructors) makeinterface2()  ipublicinterface2 {
    // jsiiruntime.methodcall(c)
}

func (c *constructors) makeinterfaces()  Array<jsii-calc.IPublicInterface> {
    // jsiiruntime.methodcall(c)
}

type consumepureinterface struct {
}

func (c *consumepureinterface) workitbaby()  structb {
    // jsiiruntime.methodcall(c)
}

type consumercanringbell struct {
}

func (c *consumercanringbell) staticimplementedbyobjectliteral()  boolean {
    // jsiiruntime.methodcall(c)
}

func (c *consumercanringbell) staticimplementedbyprivateclass()  boolean {
    // jsiiruntime.methodcall(c)
}

func (c *consumercanringbell) staticimplementedbypublicclass()  boolean {
    // jsiiruntime.methodcall(c)
}

func (c *consumercanringbell) staticwhentypedasclass()  boolean {
    // jsiiruntime.methodcall(c)
}

func (c *consumercanringbell) implementedbyobjectliteral()  boolean {
    // jsiiruntime.methodcall(c)
}

func (c *consumercanringbell) implementedbyprivateclass()  boolean {
    // jsiiruntime.methodcall(c)
}

func (c *consumercanringbell) implementedbypublicclass()  boolean {
    // jsiiruntime.methodcall(c)
}

func (c *consumercanringbell) whentypedasclass()  boolean {
    // jsiiruntime.methodcall(c)
}

type consumersofthiscrazytypesystem struct {
}

func (c *consumersofthiscrazytypesystem) consumeanotherpublicinterface()  string {
    // jsiiruntime.methodcall(c)
}

func (c *consumersofthiscrazytypesystem) consumenoninternalinterface()  any {
    // jsiiruntime.methodcall(c)
}

type datarenderer struct {
}

func (d *datarenderer) render()  string {
    // jsiiruntime.methodcall(d)
}

func (d *datarenderer) renderarbitrary()  string {
    // jsiiruntime.methodcall(d)
}

func (d *datarenderer) rendermap()  string {
    // jsiiruntime.methodcall(d)
}

type defaultedconstructorargument struct {
    arg1 number
    arg3 date
    arg2 string
}

type demonstrate982 struct {
}

func (d *demonstrate982) takethis()  childstruct982 {
    // jsiiruntime.methodcall(d)
}

func (d *demonstrate982) takethistoo()  parentstruct982 {
    // jsiiruntime.methodcall(d)
}

type deprecatedclass struct {
    readonlyproperty string
    mutableproperty number
}

func (d *deprecatedclass) method()  {
    // jsiiruntime.methodcall(d)
}

type deprecatedstruct interface {
    getreadonlyproperty() string
    setreadonlyproperty()
}

type derivedstruct interface {
    getanotherrequired() date
    setanotherrequired()
    getbool() boolean
    setbool()
    getnonprimitive() doubletrouble
    setnonprimitive()
    getanotheroptional() Map<string => @scope/jsii-calc-lib.Value>
    setanotheroptional()
    getoptionalany() any
    setoptionalany()
    getoptionalarray() Array<string>
    setoptionalarray()
}

type diamondinheritancebaselevelstruct interface {
    getbaselevelproperty() string
    setbaselevelproperty()
}

type diamondinheritancefirstmidlevelstruct interface {
    getfirstmidlevelproperty() string
    setfirstmidlevelproperty()
}

type diamondinheritancesecondmidlevelstruct interface {
    getsecondmidlevelproperty() string
    setsecondmidlevelproperty()
}

type diamondinheritancetoplevelstruct interface {
    gettoplevelproperty() string
    settoplevelproperty()
}

type disappointingcollectionsource struct {
    maybelist Array<string>
    maybemap Map<string => number>
}

type donotoverrideprivates struct {
}

func (d *donotoverrideprivates) changeprivatepropertyvalue()  {
    // jsiiruntime.methodcall(d)
}

func (d *donotoverrideprivates) privatemethodvalue()  string {
    // jsiiruntime.methodcall(d)
}

func (d *donotoverrideprivates) privatepropertyvalue()  string {
    // jsiiruntime.methodcall(d)
}

type donotrecognizeanyasoptional struct {
}

func (d *donotrecognizeanyasoptional) method()  {
    // jsiiruntime.methodcall(d)
}

type documentedclass struct {
}

func (d *documentedclass) greet()  number {
    // jsiiruntime.methodcall(d)
}

func (d *documentedclass) hola()  {
    // jsiiruntime.methodcall(d)
}

type dontcomplainaboutvariadicafteroptional struct {
}

func (d *dontcomplainaboutvariadicafteroptional) optionalandvariadic()  string {
    // jsiiruntime.methodcall(d)
}

type doubletrouble struct {
}

func (d *doubletrouble) hello()  string {
    // jsiiruntime.methodcall(d)
}

func (d *doubletrouble) next()  number {
    // jsiiruntime.methodcall(d)
}

type enumdispenser struct {
}

func (e *enumdispenser) randomintegerlikeenum()  alltypesenum {
    // jsiiruntime.methodcall(e)
}

func (e *enumdispenser) randomstringlikeenum()  stringenum {
    // jsiiruntime.methodcall(e)
}

type eraseundefinedhashvalues struct {
}

func (e *eraseundefinedhashvalues) doeskeyexist()  boolean {
    // jsiiruntime.methodcall(e)
}

func (e *eraseundefinedhashvalues) prop1isnull()  Map<string => any> {
    // jsiiruntime.methodcall(e)
}

func (e *eraseundefinedhashvalues) prop2isundefined()  Map<string => any> {
    // jsiiruntime.methodcall(e)
}

type eraseundefinedhashvaluesoptions interface {
    getoption1() string
    setoption1()
    getoption2() string
    setoption2()
}

type experimentalclass struct {
    readonlyproperty string
    mutableproperty number
}

func (e *experimentalclass) method()  {
    // jsiiruntime.methodcall(e)
}

type experimentalstruct interface {
    getreadonlyproperty() string
    setreadonlyproperty()
}

type exportedbaseclass struct {
    success boolean
}

type extendsinternalinterface interface {
    getboom() boolean
    setboom()
    getprop() string
    setprop()
}

type externalclass struct {
    readonlyproperty string
    mutableproperty number
}

func (e *externalclass) method()  {
    // jsiiruntime.methodcall(e)
}

type externalstruct interface {
    getreadonlyproperty() string
    setreadonlyproperty()
}

type givemestructs struct {
    structliteral structwithonlyoptionals
}

func (g *givemestructs) derivedtofirst()  myfirststruct {
    // jsiiruntime.methodcall(g)
}

func (g *givemestructs) readderivednonprimitive()  doubletrouble {
    // jsiiruntime.methodcall(g)
}

func (g *givemestructs) readfirstnumber()  number {
    // jsiiruntime.methodcall(g)
}

type greetee interface {
    getname() string
    setname()
}

type greetingaugmenter struct {
}

func (g *greetingaugmenter) bettergreeting()  string {
    // jsiiruntime.methodcall(g)
}

type ianonymousimplementationprovider interface {
    provideasclass() implementation
    provideasinterface() ianonymouslyimplementme
}

type ianonymouslyimplementme interface {
    verb() string
    getvalue() number
    setvalue()
}

type ianotherpublicinterface interface {
    geta() string
    seta()
}

type ibell interface {
    ring()
}

type ibellringer interface {
    yourturn()
}

type iconcretebellringer interface {
    yourturn()
}

type ideprecatedinterface interface {
    method()
    getmutableproperty() number
    setmutableproperty()
}

type iexperimentalinterface interface {
    method()
    getmutableproperty() number
    setmutableproperty()
}

type iextendsprivateinterface interface {
    getmorethings() Array<string>
    setmorethings()
    getprivate() string
    setprivate()
}

type iexternalinterface interface {
    method()
    getmutableproperty() number
    setmutableproperty()
}

type ifriendlier interface {
    farewell() string
    goodbye() string
}

type ifriendlyrandomgenerator interface {
}

type iinterfaceimplementedbyabstractclass interface {
    getpropfrominterface() string
    setpropfrominterface()
}

type iinterfacethatshouldnotbeadatatype interface {
    getothervalue() string
    setothervalue()
}

type iinterfacewithinternal interface {
    visible()
}

type iinterfacewithmethods interface {
    dothings()
    getvalue() string
    setvalue()
}

type iinterfacewithoptionalmethodarguments interface {
    hello()
}

type iinterfacewithproperties interface {
    getreadonlystring() string
    setreadonlystring()
    getreadwritestring() string
    setreadwritestring()
}

type iinterfacewithpropertiesextension interface {
    getfoo() number
    setfoo()
}

type ijsii417derived interface {
    bar()
    baz()
    getproperty() string
    setproperty()
}

type ijsii417publicbaseofbase interface {
    foo()
    gethasroot() boolean
    sethasroot()
}

type ijsii487external interface {
}

type ijsii487external2 interface {
}

type ijsii496 interface {
}

type imutableobjectliteral interface {
    getvalue() string
    setvalue()
}

type inoninternalinterface interface {
    getb() string
    setb()
    getc() string
    setc()
}

type iobjectwithproperty interface {
    wasset() boolean
    getproperty() string
    setproperty()
}

type ioptionalmethod interface {
    optional() string
}

type iprivatelyimplemented interface {
    getsuccess() boolean
    setsuccess()
}

type ipublicinterface interface {
    bye() string
}

type ipublicinterface2 interface {
    ciao() string
}

type irandomnumbergenerator interface {
    next() number
}

type ireturnjsii976 interface {
    getfoo() number
    setfoo()
}

type ireturnsnumber interface {
    obtainnumber() idoublable
    getnumberprop() number
    setnumberprop()
}

type istableinterface interface {
    method()
    getmutableproperty() number
    setmutableproperty()
}

type istructreturningdelegate interface {
    returnstruct() structb
}

type implementinternalinterface struct {
    prop string
}

type implementation struct {
    value number
}

type implementsinterfacewithinternal struct {
}

func (i *implementsinterfacewithinternal) visible()  {
    // jsiiruntime.methodcall(i)
}

type implementsinterfacewithinternalsubclass struct {
}

type implementsprivateinterface struct {
    private string
}

type implictbaseofbase interface {
    getgoo() date
    setgoo()
}

type inbetweenclass struct {
}

func (i *inbetweenclass) ciao()  string {
    // jsiiruntime.methodcall(i)
}

type interfacecollections struct {
}

func (i *interfacecollections) listofinterfaces()  Array<jsii-calc.IBell> {
    // jsiiruntime.methodcall(i)
}

func (i *interfacecollections) listofstructs()  Array<jsii-calc.StructA> {
    // jsiiruntime.methodcall(i)
}

func (i *interfacecollections) mapofinterfaces()  Map<string => jsii-calc.IBell> {
    // jsiiruntime.methodcall(i)
}

func (i *interfacecollections) mapofstructs()  Map<string => jsii-calc.StructA> {
    // jsiiruntime.methodcall(i)
}

type interfacesmaker struct {
}

func (i *interfacesmaker) makeinterfaces()  Array<@scope/jsii-calc-lib.IDoublable> {
    // jsiiruntime.methodcall(i)
}

type isomorphism struct {
}

func (i *isomorphism) myself()  isomorphism {
    // jsiiruntime.methodcall(i)
}

type jsii417derived struct {
    property string
}

func (j *jsii417derived) bar()  {
    // jsiiruntime.methodcall(j)
}

func (j *jsii417derived) baz()  {
    // jsiiruntime.methodcall(j)
}

type jsii417publicbaseofbase struct {
    hasroot boolean
}

func (j *jsii417publicbaseofbase) makeinstance()  jsii417publicbaseofbase {
    // jsiiruntime.methodcall(j)
}

func (j *jsii417publicbaseofbase) foo()  {
    // jsiiruntime.methodcall(j)
}

type jsobjectliteralforinterface struct {
}

func (j *jsobjectliteralforinterface) givemefriendly()  ifriendly {
    // jsiiruntime.methodcall(j)
}

func (j *jsobjectliteralforinterface) givemefriendlygenerator()  ifriendlyrandomgenerator {
    // jsiiruntime.methodcall(j)
}

type jsobjectliteraltonative struct {
}

func (j *jsobjectliteraltonative) returnliteral()  jsobjectliteraltonativeclass {
    // jsiiruntime.methodcall(j)
}

type jsobjectliteraltonativeclass struct {
    propa string
    propb number
}

type javareservedwords struct {
    while string
}

func (j *javareservedwords) abstract()  {
    // jsiiruntime.methodcall(j)
}

func (j *javareservedwords) assert()  {
    // jsiiruntime.methodcall(j)
}

func (j *javareservedwords) boolean()  {
    // jsiiruntime.methodcall(j)
}

func (j *javareservedwords) break()  {
    // jsiiruntime.methodcall(j)
}

func (j *javareservedwords) byte()  {
    // jsiiruntime.methodcall(j)
}

func (j *javareservedwords) case()  {
    // jsiiruntime.methodcall(j)
}

func (j *javareservedwords) catch()  {
    // jsiiruntime.methodcall(j)
}

func (j *javareservedwords) char()  {
    // jsiiruntime.methodcall(j)
}

func (j *javareservedwords) class()  {
    // jsiiruntime.methodcall(j)
}

func (j *javareservedwords) const()  {
    // jsiiruntime.methodcall(j)
}

func (j *javareservedwords) continue()  {
    // jsiiruntime.methodcall(j)
}

func (j *javareservedwords) default()  {
    // jsiiruntime.methodcall(j)
}

func (j *javareservedwords) do()  {
    // jsiiruntime.methodcall(j)
}

func (j *javareservedwords) double()  {
    // jsiiruntime.methodcall(j)
}

func (j *javareservedwords) else()  {
    // jsiiruntime.methodcall(j)
}

func (j *javareservedwords) enum()  {
    // jsiiruntime.methodcall(j)
}

func (j *javareservedwords) extends()  {
    // jsiiruntime.methodcall(j)
}

func (j *javareservedwords) false()  {
    // jsiiruntime.methodcall(j)
}

func (j *javareservedwords) final()  {
    // jsiiruntime.methodcall(j)
}

func (j *javareservedwords) finally()  {
    // jsiiruntime.methodcall(j)
}

func (j *javareservedwords) float()  {
    // jsiiruntime.methodcall(j)
}

func (j *javareservedwords) for()  {
    // jsiiruntime.methodcall(j)
}

func (j *javareservedwords) goto()  {
    // jsiiruntime.methodcall(j)
}

func (j *javareservedwords) if()  {
    // jsiiruntime.methodcall(j)
}

func (j *javareservedwords) implements()  {
    // jsiiruntime.methodcall(j)
}

func (j *javareservedwords) import()  {
    // jsiiruntime.methodcall(j)
}

func (j *javareservedwords) instanceof()  {
    // jsiiruntime.methodcall(j)
}

func (j *javareservedwords) int()  {
    // jsiiruntime.methodcall(j)
}

func (j *javareservedwords) interface()  {
    // jsiiruntime.methodcall(j)
}

func (j *javareservedwords) long()  {
    // jsiiruntime.methodcall(j)
}

func (j *javareservedwords) native()  {
    // jsiiruntime.methodcall(j)
}

func (j *javareservedwords) new()  {
    // jsiiruntime.methodcall(j)
}

func (j *javareservedwords) null()  {
    // jsiiruntime.methodcall(j)
}

func (j *javareservedwords) package()  {
    // jsiiruntime.methodcall(j)
}

func (j *javareservedwords) private()  {
    // jsiiruntime.methodcall(j)
}

func (j *javareservedwords) protected()  {
    // jsiiruntime.methodcall(j)
}

func (j *javareservedwords) public()  {
    // jsiiruntime.methodcall(j)
}

func (j *javareservedwords) return()  {
    // jsiiruntime.methodcall(j)
}

func (j *javareservedwords) short()  {
    // jsiiruntime.methodcall(j)
}

func (j *javareservedwords) static()  {
    // jsiiruntime.methodcall(j)
}

func (j *javareservedwords) strictfp()  {
    // jsiiruntime.methodcall(j)
}

func (j *javareservedwords) super()  {
    // jsiiruntime.methodcall(j)
}

func (j *javareservedwords) switch()  {
    // jsiiruntime.methodcall(j)
}

func (j *javareservedwords) synchronized()  {
    // jsiiruntime.methodcall(j)
}

func (j *javareservedwords) this()  {
    // jsiiruntime.methodcall(j)
}

func (j *javareservedwords) throw()  {
    // jsiiruntime.methodcall(j)
}

func (j *javareservedwords) throws()  {
    // jsiiruntime.methodcall(j)
}

func (j *javareservedwords) transient()  {
    // jsiiruntime.methodcall(j)
}

func (j *javareservedwords) true()  {
    // jsiiruntime.methodcall(j)
}

func (j *javareservedwords) try()  {
    // jsiiruntime.methodcall(j)
}

func (j *javareservedwords) void()  {
    // jsiiruntime.methodcall(j)
}

func (j *javareservedwords) volatile()  {
    // jsiiruntime.methodcall(j)
}

type jsii487derived struct {
}

type jsii496derived struct {
}

type jsiiagent struct {
    jsiiagent string
}

type jsonformatter struct {
}

func (j *jsonformatter) anyarray()  any {
    // jsiiruntime.methodcall(j)
}

func (j *jsonformatter) anybooleanfalse()  any {
    // jsiiruntime.methodcall(j)
}

func (j *jsonformatter) anybooleantrue()  any {
    // jsiiruntime.methodcall(j)
}

func (j *jsonformatter) anydate()  any {
    // jsiiruntime.methodcall(j)
}

func (j *jsonformatter) anyemptystring()  any {
    // jsiiruntime.methodcall(j)
}

func (j *jsonformatter) anyfunction()  any {
    // jsiiruntime.methodcall(j)
}

func (j *jsonformatter) anyhash()  any {
    // jsiiruntime.methodcall(j)
}

func (j *jsonformatter) anynull()  any {
    // jsiiruntime.methodcall(j)
}

func (j *jsonformatter) anynumber()  any {
    // jsiiruntime.methodcall(j)
}

func (j *jsonformatter) anyref()  any {
    // jsiiruntime.methodcall(j)
}

func (j *jsonformatter) anystring()  any {
    // jsiiruntime.methodcall(j)
}

func (j *jsonformatter) anyundefined()  any {
    // jsiiruntime.methodcall(j)
}

func (j *jsonformatter) anyzero()  any {
    // jsiiruntime.methodcall(j)
}

func (j *jsonformatter) stringify()  string {
    // jsiiruntime.methodcall(j)
}

type loadbalancedfargateserviceprops interface {
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

type methodnamedproperty struct {
    elite number
}

func (m *methodnamedproperty) property()  string {
    // jsiiruntime.methodcall(m)
}

type multiply struct {
    value number
}

func (m *multiply) farewell()  string {
    // jsiiruntime.methodcall(m)
}

func (m *multiply) goodbye()  string {
    // jsiiruntime.methodcall(m)
}

func (m *multiply) next()  number {
    // jsiiruntime.methodcall(m)
}

func (m *multiply) tostring()  string {
    // jsiiruntime.methodcall(m)
}

type negate struct {
    value number
}

func (n *negate) farewell()  string {
    // jsiiruntime.methodcall(n)
}

func (n *negate) goodbye()  string {
    // jsiiruntime.methodcall(n)
}

func (n *negate) hello()  string {
    // jsiiruntime.methodcall(n)
}

func (n *negate) tostring()  string {
    // jsiiruntime.methodcall(n)
}

type nestedstruct interface {
    getnumberprop() number
    setnumberprop()
}

type nodestandardlibrary struct {
    osplatform string
}

func (n *nodestandardlibrary) cryptosha256()  string {
    // jsiiruntime.methodcall(n)
}

func (n *nodestandardlibrary) fsreadfile()  string {
    // jsiiruntime.methodcall(n)
}

func (n *nodestandardlibrary) fsreadfilesync()  string {
    // jsiiruntime.methodcall(n)
}

type nullshouldbetreatedasundefined struct {
    changemetoundefined string
}

func (n *nullshouldbetreatedasundefined) givemeundefined()  {
    // jsiiruntime.methodcall(n)
}

func (n *nullshouldbetreatedasundefined) givemeundefinedinsideanobject()  {
    // jsiiruntime.methodcall(n)
}

func (n *nullshouldbetreatedasundefined) verifypropertyisundefined()  {
    // jsiiruntime.methodcall(n)
}

type nullshouldbetreatedasundefineddata interface {
    getarraywiththreeelementsandundefinedassecondargument() Array<any>
    setarraywiththreeelementsandundefinedassecondargument()
    getthisshouldbeundefined() any
    setthisshouldbeundefined()
}

type numbergenerator struct {
    generator irandomnumbergenerator
}

func (n *numbergenerator) issamegenerator()  boolean {
    // jsiiruntime.methodcall(n)
}

func (n *numbergenerator) nexttimes100()  number {
    // jsiiruntime.methodcall(n)
}

type objectrefsincollections struct {
}

func (o *objectrefsincollections) sumfromarray()  number {
    // jsiiruntime.methodcall(o)
}

func (o *objectrefsincollections) sumfrommap()  number {
    // jsiiruntime.methodcall(o)
}

type objectwithpropertyprovider struct {
}

func (o *objectwithpropertyprovider) provide()  iobjectwithproperty {
    // jsiiruntime.methodcall(o)
}

type old struct {
}

func (o *old) doathing()  {
    // jsiiruntime.methodcall(o)
}

type optionalargumentinvoker struct {
}

func (o *optionalargumentinvoker) invokewithoptional()  {
    // jsiiruntime.methodcall(o)
}

func (o *optionalargumentinvoker) invokewithoutoptional()  {
    // jsiiruntime.methodcall(o)
}

type optionalconstructorargument struct {
    arg1 number
    arg2 string
    arg3 date
}

type optionalstruct interface {
    getfield() string
    setfield()
}

type optionalstructconsumer struct {
    parameterwasundefined boolean
    fieldvalue string
}

type overridableprotectedmember struct {
    overridereadonly string
    overridereadwrite string
}

func (o *overridableprotectedmember) overrideme()  string {
    // jsiiruntime.methodcall(o)
}

func (o *overridableprotectedmember) switchmodes()  {
    // jsiiruntime.methodcall(o)
}

func (o *overridableprotectedmember) valuefromprotected()  string {
    // jsiiruntime.methodcall(o)
}

type overridereturnsobject struct {
}

func (o *overridereturnsobject) test()  number {
    // jsiiruntime.methodcall(o)
}

type parentstruct982 interface {
    getfoo() string
    setfoo()
}

type partiallyinitializedthisconsumer struct {
}

func (p *partiallyinitializedthisconsumer) consumepartiallyinitializedthis()  string {
    // jsiiruntime.methodcall(p)
}

type polymorphism struct {
}

func (p *polymorphism) sayhello()  string {
    // jsiiruntime.methodcall(p)
}

type power struct {
    base value
    expression value
    pow value
}

type propertynamedproperty struct {
    property string
    yetanoterone boolean
}

type publicclass struct {
}

func (p *publicclass) hello()  {
    // jsiiruntime.methodcall(p)
}

type pythonreservedwords struct {
}

func (p *pythonreservedwords) and()  {
    // jsiiruntime.methodcall(p)
}

func (p *pythonreservedwords) as()  {
    // jsiiruntime.methodcall(p)
}

func (p *pythonreservedwords) assert()  {
    // jsiiruntime.methodcall(p)
}

func (p *pythonreservedwords) async()  {
    // jsiiruntime.methodcall(p)
}

func (p *pythonreservedwords) await()  {
    // jsiiruntime.methodcall(p)
}

func (p *pythonreservedwords) break()  {
    // jsiiruntime.methodcall(p)
}

func (p *pythonreservedwords) class()  {
    // jsiiruntime.methodcall(p)
}

func (p *pythonreservedwords) continue()  {
    // jsiiruntime.methodcall(p)
}

func (p *pythonreservedwords) def()  {
    // jsiiruntime.methodcall(p)
}

func (p *pythonreservedwords) del()  {
    // jsiiruntime.methodcall(p)
}

func (p *pythonreservedwords) elif()  {
    // jsiiruntime.methodcall(p)
}

func (p *pythonreservedwords) else()  {
    // jsiiruntime.methodcall(p)
}

func (p *pythonreservedwords) except()  {
    // jsiiruntime.methodcall(p)
}

func (p *pythonreservedwords) finally()  {
    // jsiiruntime.methodcall(p)
}

func (p *pythonreservedwords) for()  {
    // jsiiruntime.methodcall(p)
}

func (p *pythonreservedwords) from()  {
    // jsiiruntime.methodcall(p)
}

func (p *pythonreservedwords) global()  {
    // jsiiruntime.methodcall(p)
}

func (p *pythonreservedwords) if()  {
    // jsiiruntime.methodcall(p)
}

func (p *pythonreservedwords) import()  {
    // jsiiruntime.methodcall(p)
}

func (p *pythonreservedwords) in()  {
    // jsiiruntime.methodcall(p)
}

func (p *pythonreservedwords) is()  {
    // jsiiruntime.methodcall(p)
}

func (p *pythonreservedwords) lambda()  {
    // jsiiruntime.methodcall(p)
}

func (p *pythonreservedwords) nonlocal()  {
    // jsiiruntime.methodcall(p)
}

func (p *pythonreservedwords) not()  {
    // jsiiruntime.methodcall(p)
}

func (p *pythonreservedwords) or()  {
    // jsiiruntime.methodcall(p)
}

func (p *pythonreservedwords) pass()  {
    // jsiiruntime.methodcall(p)
}

func (p *pythonreservedwords) raise()  {
    // jsiiruntime.methodcall(p)
}

func (p *pythonreservedwords) return()  {
    // jsiiruntime.methodcall(p)
}

func (p *pythonreservedwords) try()  {
    // jsiiruntime.methodcall(p)
}

func (p *pythonreservedwords) while()  {
    // jsiiruntime.methodcall(p)
}

func (p *pythonreservedwords) with()  {
    // jsiiruntime.methodcall(p)
}

func (p *pythonreservedwords) yield()  {
    // jsiiruntime.methodcall(p)
}

type referenceenumfromscopedpackage struct {
    foo enumfromscopedmodule
}

func (r *referenceenumfromscopedpackage) loadfoo()  enumfromscopedmodule {
    // jsiiruntime.methodcall(r)
}

func (r *referenceenumfromscopedpackage) savefoo()  {
    // jsiiruntime.methodcall(r)
}

type returnsprivateimplementationofinterface struct {
    privateimplementation iprivatelyimplemented
}

type rootstruct interface {
    getstringprop() string
    setstringprop()
    getnestedstruct() nestedstruct
    setnestedstruct()
}

type rootstructvalidator struct {
}

func (r *rootstructvalidator) validate()  {
    // jsiiruntime.methodcall(r)
}

type runtimetypechecking struct {
}

func (r *runtimetypechecking) methodwithdefaultedarguments()  {
    // jsiiruntime.methodcall(r)
}

func (r *runtimetypechecking) methodwithoptionalanyargument()  {
    // jsiiruntime.methodcall(r)
}

func (r *runtimetypechecking) methodwithoptionalarguments()  {
    // jsiiruntime.methodcall(r)
}

type secondlevelstruct interface {
    getdeeperrequiredprop() string
    setdeeperrequiredprop()
    getdeeperoptionalprop() string
    setdeeperoptionalprop()
}

type singleinstancetwotypes struct {
}

func (s *singleinstancetwotypes) interface1()  inbetweenclass {
    // jsiiruntime.methodcall(s)
}

func (s *singleinstancetwotypes) interface2()  ipublicinterface {
    // jsiiruntime.methodcall(s)
}

type singletonint struct {
}

func (s *singletonint) issingletonint()  boolean {
    // jsiiruntime.methodcall(s)
}

type singletonstring struct {
}

func (s *singletonstring) issingletonstring()  boolean {
    // jsiiruntime.methodcall(s)
}

type smellystruct interface {
    getproperty() string
    setproperty()
    getyetanoterone() boolean
    setyetanoterone()
}

type sometypejsii976 struct {
}

func (s *sometypejsii976) returnanonymous()  any {
    // jsiiruntime.methodcall(s)
}

func (s *sometypejsii976) returnreturn()  ireturnjsii976 {
    // jsiiruntime.methodcall(s)
}

type stableclass struct {
    readonlyproperty string
    mutableproperty number
}

func (s *stableclass) method()  {
    // jsiiruntime.methodcall(s)
}

type stablestruct interface {
    getreadonlyproperty() string
    setreadonlyproperty()
}

type staticcontext struct {
    staticvariable boolean
}

func (s *staticcontext) canaccessstaticcontext()  boolean {
    // jsiiruntime.methodcall(s)
}

type statics struct {
    bar number
    constobj doubletrouble
    foo string
    zoobar Map<string => string>
    instance statics
    nonconststatic number
    value string
}

func (s *statics) staticmethod()  string {
    // jsiiruntime.methodcall(s)
}

func (s *statics) justmethod()  string {
    // jsiiruntime.methodcall(s)
}

type stripinternal struct {
    youseeme string
}

type structa interface {
    getrequiredstring() string
    setrequiredstring()
    getoptionalnumber() number
    setoptionalnumber()
    getoptionalstring() string
    setoptionalstring()
}

type structb interface {
    getrequiredstring() string
    setrequiredstring()
    getoptionalboolean() boolean
    setoptionalboolean()
    getoptionalstructa() structa
    setoptionalstructa()
}

type structparametertype interface {
    getscope() string
    setscope()
    getprops() boolean
    setprops()
}

type structpassing struct {
}

func (s *structpassing) howmanyvarargsdidipass()  number {
    // jsiiruntime.methodcall(s)
}

func (s *structpassing) roundtrip()  toplevelstruct {
    // jsiiruntime.methodcall(s)
}

type structunionconsumer struct {
}

func (s *structunionconsumer) isstructa()  boolean {
    // jsiiruntime.methodcall(s)
}

func (s *structunionconsumer) isstructb()  boolean {
    // jsiiruntime.methodcall(s)
}

type structwithjavareservedwords interface {
    getdefault() string
    setdefault()
    getassert() string
    setassert()
    getresult() string
    setresult()
    getthat() string
    setthat()
}

type sum struct {
    expression value
    parts Array<@scope/jsii-calc-lib.Value>
}

type supportsnicejavabuilder struct {
    id number
    rest Array<string>
}

type supportsnicejavabuilderprops interface {
    getbar() number
    setbar()
    getid() string
    setid()
}

type supportsnicejavabuilderwithrequiredprops struct {
    bar number
    id number
    propid string
}

type syncvirtualmethods struct {
    readonlyproperty string
    a number
    callerisproperty number
    otherproperty string
    theproperty string
    valueofotherproperty string
}

func (s *syncvirtualmethods) callerisasync()  number {
    // jsiiruntime.methodcall(s)
}

func (s *syncvirtualmethods) callerismethod()  number {
    // jsiiruntime.methodcall(s)
}

func (s *syncvirtualmethods) modifyotherproperty()  {
    // jsiiruntime.methodcall(s)
}

func (s *syncvirtualmethods) modifyvalueoftheproperty()  {
    // jsiiruntime.methodcall(s)
}

func (s *syncvirtualmethods) reada()  number {
    // jsiiruntime.methodcall(s)
}

func (s *syncvirtualmethods) retrieveotherproperty()  string {
    // jsiiruntime.methodcall(s)
}

func (s *syncvirtualmethods) retrievereadonlyproperty()  string {
    // jsiiruntime.methodcall(s)
}

func (s *syncvirtualmethods) retrievevalueoftheproperty()  string {
    // jsiiruntime.methodcall(s)
}

func (s *syncvirtualmethods) virtualmethod()  number {
    // jsiiruntime.methodcall(s)
}

func (s *syncvirtualmethods) writea()  {
    // jsiiruntime.methodcall(s)
}

type thrower struct {
}

func (t *thrower) throwerror()  {
    // jsiiruntime.methodcall(t)
}

type toplevelstruct interface {
    getrequired() string
    setrequired()
    getsecondlevel() number | jsii-calc.SecondLevelStruct
    setsecondlevel()
    getoptional() string
    setoptional()
}

type unaryoperation struct {
    operand value
}

type unionproperties interface {
    getbar() string | number | jsii-calc.AllTypes
    setbar()
    getfoo() string | number
    setfoo()
}

type upcasingreflectable struct {
    reflector reflector
    entries Array<@scope/jsii-calc-lib.submodule.ReflectableEntry>
}

type usebundleddependency struct {
}

func (u *usebundleddependency) value()  any {
    // jsiiruntime.methodcall(u)
}

type usecalcbase struct {
}

func (u *usecalcbase) hello()  base {
    // jsiiruntime.methodcall(u)
}

type usesinterfacewithproperties struct {
    obj iinterfacewithproperties
}

func (u *usesinterfacewithproperties) justread()  string {
    // jsiiruntime.methodcall(u)
}

func (u *usesinterfacewithproperties) readstringandnumber()  string {
    // jsiiruntime.methodcall(u)
}

func (u *usesinterfacewithproperties) writeandread()  string {
    // jsiiruntime.methodcall(u)
}

type variadicinvoker struct {
}

func (v *variadicinvoker) asarray()  Array<number> {
    // jsiiruntime.methodcall(v)
}

type variadicmethod struct {
}

func (v *variadicmethod) asarray()  Array<number> {
    // jsiiruntime.methodcall(v)
}

type virtualmethodplayground struct {
}

func (v *virtualmethodplayground) overridemeasync()  number {
    // jsiiruntime.methodcall(v)
}

func (v *virtualmethodplayground) overridemesync()  number {
    // jsiiruntime.methodcall(v)
}

func (v *virtualmethodplayground) parallelsumasync()  number {
    // jsiiruntime.methodcall(v)
}

func (v *virtualmethodplayground) serialsumasync()  number {
    // jsiiruntime.methodcall(v)
}

func (v *virtualmethodplayground) sumsync()  number {
    // jsiiruntime.methodcall(v)
}

type voidcallback struct {
    methodwascalled boolean
}

func (v *voidcallback) callme()  {
    // jsiiruntime.methodcall(v)
}

func (v *voidcallback) overrideme()  {
    // jsiiruntime.methodcall(v)
}

type withprivatepropertyinconstructor struct {
    success boolean
}

