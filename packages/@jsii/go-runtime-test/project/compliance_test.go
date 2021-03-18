package tests

import (
	"fmt"
	"github.com/aws/jsii-runtime-go"
	"math"
	"runtime"
	"testing"
	"time"

	"github.com/aws/jsii/jsii-calc/go/jcb"
	calc "github.com/aws/jsii/jsii-calc/go/jsiicalc/v3"
	"github.com/aws/jsii/jsii-calc/go/jsiicalc/v3/composition"
	"github.com/aws/jsii/jsii-calc/go/jsiicalc/v3/submodule/child"
	calclib "github.com/aws/jsii/jsii-calc/go/scopejsiicalclib"
	"github.com/aws/jsii/jsii-calc/go/scopejsiicalclib/customsubmodulename"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/suite"
)

func (suite *ComplianceSuite) TestStatics() {
	assert := suite.Assert()

	assert.Equal("hello ,Yoyo!", *calc.Statics_StaticMethod(jsii.String("Yoyo")))
	assert.Equal("default", *calc.Statics_Instance().Value())

	newStatics := calc.NewStatics(jsii.String("new value"))
	calc.Statics_SetInstance(newStatics)
	assert.Same(newStatics, calc.Statics_Instance())
	assert.Equal("new value", *calc.Statics_Instance().Value())

	// the float64 conversion is a bit annoying - can we do something about it?
	assert.Equal(float64(100), *calc.Statics_NonConstStatic())

}

func (suite *ComplianceSuite) TestPrimitiveTypes() {
	assert := suite.Assert()

	types := calc.NewAllTypes()

	// boolean
	types.SetBooleanProperty(jsii.Bool(true))
	assert.Equal(true, *types.BooleanProperty())

	// string
	types.SetStringProperty(jsii.String("foo"))
	assert.Equal("foo", *types.StringProperty())

	// number
	types.SetNumberProperty(jsii.Number(1234))
	assert.Equal(float64(1234), *types.NumberProperty())

	// // json
	mapProp := map[string]interface{}{"Foo": map[string]interface{}{"Bar": 123}}
	types.SetJsonProperty(&mapProp)
	assert.Equal(float64(123), (*types.JsonProperty())["Foo"].(map[string]interface{})["Bar"])

	suite.FailTest("Dates are currently treated as strings and fail going through the wire", "https://github.com/aws/jsii/issues/2659")

	// whoops - should accept time.Time, not string.
	// date
	types.SetDateProperty(jsii.String("12345"))
	assert.Equal("12345", types.DateProperty())
}

func (suite *ComplianceSuite) TestUseNestedStruct() {
	suite.FailTest("Nested types are not namespaced", "https://github.com/aws/jsii/pull/2650")
	jcb.StaticConsumer_Consume(customsubmodulename.NestingClass_NestedStruct{
		Name: jsii.String("Bond, James Bond"),
	})
}

func (suite *ComplianceSuite) TestStaticMapInClassCanBeReadCorrectly() {
	assert := suite.Assert()

	result := *calc.ClassWithCollections_StaticMap()
	assert.Equal("value1", *result["key1"])
	assert.Equal("value2", *result["key2"])
	assert.Equal(2, len(result))
}

func (suite *ComplianceSuite) TestTestNativeObjectsWithInterfaces() {
	assert := suite.Assert()

	// create a pure and native object, not part of the jsii hierarchy, only implements a jsii interface
	pureNative := newPureNativeFriendlyRandom()
	generatorBoundToPureNative := calc.NewNumberGenerator(pureNative)
	assert.Equal(pureNative, generatorBoundToPureNative.Generator())
	assert.Equal(float64(100000), *generatorBoundToPureNative.NextTimes100())
	assert.Equal(float64(200000), *generatorBoundToPureNative.NextTimes100())

	subclassNative := NewSubclassNativeFriendlyRandom()
	generatorBoundToPSubclassedObject := calc.NewNumberGenerator(subclassNative)
	assert.Equal(subclassNative, generatorBoundToPSubclassedObject.Generator())

	generatorBoundToPSubclassedObject.IsSameGenerator(subclassNative)
	assert.Equal(float64(10000), *generatorBoundToPSubclassedObject.NextTimes100())
	assert.Equal(float64(20000), *generatorBoundToPSubclassedObject.NextTimes100())
}

func (suite *ComplianceSuite) TestMaps() {
	assert := suite.Assert()

	// TODO: props should be optional
	calc2 := calc.NewCalculator(&calc.CalculatorProps{})
	calc2.Add(jsii.Number(10))
	calc2.Add(jsii.Number(20))
	calc2.Mul(jsii.Number(2))

	result := *calc2.OperationsMap()
	assert.Equal(2, len(*result["add"]))
	assert.Equal(1, len(*result["mul"]))
	resultAdd := *result["add"]
	assert.Equal(float64(30), *resultAdd[1].Value())
}

func (suite *ComplianceSuite) TestDates() {
	assert := suite.Assert()
	suite.FailTest("Dates are represented as strings instead of date objects", "https://github.com/aws/jsii/issues/2659")

	types := calc.NewAllTypes()
	//types.SetDateProperty(time.Unix(128, 0))
	assert.Equal(time.Unix(128, 0), types.DateProperty())

	// weak type
	types.SetAnyProperty(time.Unix(999, 0))
	assert.Equal(time.Unix(999, 0), types.AnyProperty())
}

func (suite *ComplianceSuite) TestCallMethods() {
	assert := suite.Assert()

	calc := calc.NewCalculator(&calc.CalculatorProps{})
	calc.Add(jsii.Number(10))
	assert.Equal(float64(10), *calc.Value())

	calc.Mul(jsii.Number(2))
	assert.Equal(float64(20), *calc.Value())

	calc.Pow(jsii.Number(5))
	assert.Equal(float64(20*20*20*20*20), *calc.Value())

	calc.Neg()
	assert.Equal(float64(-3200000), *calc.Value())
}

func (suite *ComplianceSuite) TestNodeStandardLibrary() {
	assert := suite.Assert()

	obj := calc.NewNodeStandardLibrary()
	assert.Equal("Hello, resource! SYNC!", *obj.FsReadFileSync())
	assert.NotEmpty(obj.OsPlatform())
	assert.Equal("6a2da20943931e9834fc12cfe5bb47bbd9ae43489a30726962b576f4e3993e50", *obj.CryptoSha256())

	suite.FailTest("Async methods are not implemented", "https://github.com/aws/jsii/issues/2670")
	assert.Equal("Hello, resource!", obj.FsReadFile())
}

func (suite *ComplianceSuite) TestDynamicTypes() {
	assert := suite.Assert()
	types := calc.NewAllTypes()

	types.SetAnyProperty(false)
	assert.Equal(false, types.AnyProperty())

	// string
	types.SetAnyProperty("String")
	assert.Equal("String", types.AnyProperty())

	// number
	types.SetAnyProperty(12.5)
	assert.Equal(12.5, types.AnyProperty())

	// json (notice that when deserialized, it is deserialized as a map).
	types.SetAnyProperty(map[string]interface{}{
		"Goo": []interface{}{
			"Hello", map[string]int{
				"World": 123,
			},
		},
	})

	v1 := types.AnyProperty()
	v2 := v1.(map[string]interface{})
	v3 := (v2["Goo"]).([]interface{})
	v4 := v3[1]
	v5 := v4.(map[string]interface{})
	v6 := v5["World"].(float64)
	assert.Equal(float64(123), v6)

	// array
	types.SetAnyProperty([]string{"Hello", "World"})
	a := types.AnyProperty().([]interface{})
	assert.Equal("Hello", a[0].(string))
	assert.Equal("World", a[1].(string))

	// array of any
	types.SetAnyProperty([]interface{}{"Hybrid", calclib.NewNumber(jsii.Number(12)), 123, false})
	assert.Equal(float64(123), (types.AnyProperty()).([]interface{})[2])

	// map
	types.SetAnyProperty(map[string]string{"MapKey": "MapValue"})
	assert.Equal("MapValue", ((types.AnyProperty()).(map[string]interface{}))["MapKey"])

	// map of any
	types.SetAnyProperty(map[string]interface{}{"Goo": 19289812})
	assert.Equal(float64(19289812), ((types.AnyProperty()).(map[string]interface{}))["Goo"])

	// classes
	mult := calc.NewMultiply(calclib.NewNumber(jsii.Number(10)), calclib.NewNumber(jsii.Number(20)))
	types.SetAnyProperty(mult)
	assert.Equal(mult, types.AnyProperty())
	assert.Equal(float64(200), *((types.AnyProperty()).(calc.Multiply)).Value())

	// date
	types.SetAnyProperty(time.Unix(1234, 0))
	if types.AnyProperty() != time.Unix(1234, 0) {
		suite.FailTest("Dates not supported", "https://github.com/aws/jsii/issues/2659")
	}
}

func (suite *ComplianceSuite) TestArrayReturnedByMethodCanBeRead() {
	assert := suite.Assert()

	arr := *calc.ClassWithCollections_CreateAList()

	assert.Contains(arr, jsii.String("one"))
	assert.Contains(arr, jsii.String("two"))
}

func (suite *ComplianceSuite) TestUnionProperties() {
	assert := suite.Assert()

	calc3 := calc.NewCalculator(&calc.CalculatorProps{
		InitialValue: jsii.Number(0),
		MaximumValue: jsii.Number(math.MaxFloat64),
	})
	calc3.SetUnionProperty(calc.NewMultiply(calclib.NewNumber(jsii.Number(9)), calclib.NewNumber(jsii.Number(3))))

	_, ok := calc3.UnionProperty().(calc.Multiply)
	assert.True(ok)

	assert.Equal(float64(9*3), *calc3.ReadUnionValue())
	calc3.SetUnionProperty(calc.NewPower(calclib.NewNumber(jsii.Number(10)), calclib.NewNumber(jsii.Number(3))))

	_, ok = calc3.UnionProperty().(calc.Power)
	assert.True(ok)
}

func (suite *ComplianceSuite) TestUseEnumFromScopedModule() {
	assert := suite.Assert()

	obj := calc.NewReferenceEnumFromScopedPackage()
	assert.Equal(calclib.EnumFromScopedModule_VALUE2, obj.Foo())
	obj.SetFoo(calclib.EnumFromScopedModule_VALUE1)
	assert.Equal(calclib.EnumFromScopedModule_VALUE1, obj.LoadFoo())
	obj.SaveFoo(calclib.EnumFromScopedModule_VALUE2)
	assert.Equal(calclib.EnumFromScopedModule_VALUE2, obj.Foo())
}

func (suite *ComplianceSuite) TestCreateObjectAndCtorOverloads() {
	suite.NotApplicableTest("Golang does not have overloaded functions so the genearated class only has a single New function")
}

func (suite *ComplianceSuite) TestGetAndSetEnumValues() {
	assert := suite.Assert()

	calc := calc.NewCalculator(&calc.CalculatorProps{})
	calc.Add(jsii.Number(9))
	calc.Pow(jsii.Number(3))
	assert.Equal(composition.CompositeOperation_CompositionStringStyle_NORMAL, calc.StringStyle())

	calc.SetStringStyle(composition.CompositeOperation_CompositionStringStyle_DECORATED)
	assert.Equal(composition.CompositeOperation_CompositionStringStyle_DECORATED, calc.StringStyle())
	assert.Equal("<<[[{{(((1 * (0 + 9)) * (0 + 9)) * (0 + 9))}}]]>>", *calc.ToString())
}

func (suite *ComplianceSuite) TestListInClassCanBeReadCorrectly() {
	assert := suite.Assert()

	classWithCollections := calc.NewClassWithCollections(&map[string]*string{}, &[]*string{jsii.String("one"), jsii.String("two")})
	val := *classWithCollections.Array()
	assert.Equal("one", *val[0])
	assert.Equal("two", *val[1])
}

type derivedFromAllTypes struct {
	calc.AllTypes
}

func newDerivedFromAllTypes() derivedFromAllTypes {
	return derivedFromAllTypes{
		calc.NewAllTypes(),
	}
}

func (suite *ComplianceSuite) TestTestFluentApiWithDerivedClasses() {
	assert := suite.Assert()

	obj := newDerivedFromAllTypes()
	obj.SetStringProperty(jsii.String("Hello"))
	obj.SetNumberProperty(jsii.Number(12))
	assert.Equal("Hello", *obj.StringProperty())
	assert.Equal(float64(12), *obj.NumberProperty())
}

func (suite *ComplianceSuite) TestCanLoadEnumValues() {
	assert := suite.Assert()
	assert.NotEmpty(calc.EnumDispenser_RandomStringLikeEnum())
	assert.NotEmpty(calc.EnumDispenser_RandomIntegerLikeEnum())
}

func (suite *ComplianceSuite) TestCollectionOfInterfaces_ListOfStructs() {
	assert := suite.Assert()

	list := *calc.InterfaceCollections_ListOfStructs()
	assert.Equal("Hello, I'm String!", *list[0].RequiredString)
}

type doNotOverridePrivates struct {
	calc.DoNotOverridePrivates
}

func newDoNotOverridePrivates() doNotOverridePrivates {
	return doNotOverridePrivates{
		calc.NewDoNotOverridePrivates(),
	}
}

func (x *doNotOverridePrivates) PrivateProperty() string {
	return "privateProperty-Override"
}

func (x *doNotOverridePrivates) SetPrivateProperty(value string) {
	panic("Boom")
}

func (suite *ComplianceSuite) TestDoNotOverridePrivates_property_getter_public() {
	assert := suite.Assert()

	obj := newDoNotOverridePrivates()
	assert.Equal("privateProperty", *obj.PrivatePropertyValue())

	// verify the setter override is not invoked.
	obj.ChangePrivatePropertyValue(jsii.String("MyNewValue"))
	assert.Equal("MyNewValue", *obj.PrivatePropertyValue())
}

func (suite *ComplianceSuite) TestEqualsIsResistantToPropertyShadowingResultVariable() {
	assert := suite.Assert()
	first := calc.StructWithJavaReservedWords{Default: jsii.String("one")}
	second := calc.StructWithJavaReservedWords{Default: jsii.String("one")}
	third := calc.StructWithJavaReservedWords{Default: jsii.String("two")}
	assert.Equal(first, second)
	assert.NotEqual(first, third)
}

type overridableProtectedMemberDerived struct {
	calc.OverridableProtectedMember `overrides:"OverrideReadOnly,OverrideReadeWrite"`
}

func newOverridableProtectedMemberDerived() *overridableProtectedMemberDerived {
	o := overridableProtectedMemberDerived{}
	calc.NewOverridableProtectedMember_Override(&o)
	return &o
}

func (x *overridableProtectedMemberDerived) OverrideReadOnly() *string {
	return jsii.String("Cthulhu ")
}

func (x *overridableProtectedMemberDerived) OverrideReadeWrite() *string {
	return jsii.String("Fhtagn!")
}

func (suite *ComplianceSuite) TestCanOverrideProtectedGetter() {
	suite.FailTest("unable to access protected members", "https://github.com/aws/jsii/issues/2673")

	assert := suite.Assert()
	overridden := newOverridableProtectedMemberDerived()
	assert.Equal("Cthulhu Fhtagn!", *overridden.ValueFromProtected())
}

type implementsAdditionalInterface struct {
	calc.AllTypes
	_struct calc.StructB
}

func newImplementsAdditionalInterface(s calc.StructB) *implementsAdditionalInterface {
	n := implementsAdditionalInterface{_struct: s}
	calc.NewAllTypes_Override(&n)
	return &n
}

func (x implementsAdditionalInterface) ReturnStruct() *calc.StructB {
	return &x._struct
}

func (suite *ComplianceSuite) TestInterfacesCanBeUsedTransparently_WhenAddedToJsiiType() {
	assert := suite.Assert()

	expected := calc.StructB{RequiredString: jsii.String("It's Britney b**ch!")}
	delegate := newImplementsAdditionalInterface(expected)
	consumer := calc.NewConsumePureInterface(delegate)
	assert.Equal(expected, *consumer.WorkItBaby())
}

func (suite *ComplianceSuite) TestStructs_nonOptionalequals() {
	assert := suite.Assert()

	structA := calc.StableStruct{ReadonlyProperty: jsii.String("one")}
	structB := calc.StableStruct{ReadonlyProperty: jsii.String("one")}
	structC := calc.StableStruct{ReadonlyProperty: jsii.String("two")}
	assert.Equal(structB, structA)
	assert.NotEqual(structC, structA)
}

func (suite *ComplianceSuite) TestTestInterfaceParameter() {
	assert := suite.Assert()

	obj := calc.NewJSObjectLiteralForInterface()
	friendly := obj.GiveMeFriendly()
	assert.Equal("I am literally friendly!", *friendly.Hello())

	greetingAugmenter := calc.NewGreetingAugmenter()
	betterGreeting := greetingAugmenter.BetterGreeting(friendly)
	assert.Equal("I am literally friendly! Let me buy you a drink!", *betterGreeting)
}

func (suite *ComplianceSuite) TestLiftedKwargWithSameNameAsPositionalArg() {
	assert := suite.Assert()

	// This is a replication of a test that mostly affects languages with keyword arguments (e.g: Python, Ruby, ...)
	bell := calc.NewBell()
	amb := calc.NewAmbiguousParameters(bell, &calc.StructParameterType{Scope: jsii.String("Driiiing!")})
	assert.Equal(bell, amb.Scope())

	expected := calc.StructParameterType{Scope: jsii.String("Driiiing!")}
	assert.Equal(expected, *amb.Props())
}

type addTen struct {
	calc.Add
}

func newAddTen(value *float64) addTen {
	return addTen{
		calc.NewAdd(calclib.NewNumber(value), calclib.NewNumber(jsii.Number(10))),
	}
}

type mulTen struct {
	calc.Multiply
}

func newMulTen(value *float64) mulTen {
	return mulTen{
		calc.NewMultiply(calclib.NewNumber(value), calclib.NewNumber(jsii.Number(10))),
	}
}

func (suite *ComplianceSuite) TestCreationOfNativeObjectsFromJavaScriptObjects() {
	assert := suite.Assert()

	types := calc.NewAllTypes()

	jsObj := calclib.NewNumber(jsii.Number(44))
	types.SetAnyProperty(jsObj)
	_, ok := (types.AnyProperty()).(calclib.Number)
	assert.True(ok)

	suite.FailTest("??", "??")

	nativeObj := newAddTen(jsii.Number(10))
	types.SetAnyProperty(nativeObj)
	result1 := types.AnyProperty()
	assert.Equal(nativeObj, result1)

	nativeObj2 := newMulTen(jsii.Number(20))
	types.SetAnyProperty(nativeObj2)
	unmarshalledNativeObj, ok := (types.AnyProperty()).(mulTen)
	assert.True(ok)
	assert.Equal(nativeObj2, unmarshalledNativeObj)
}

func (suite *ComplianceSuite) TestStructs_ReturnedLiteralEqualsNativeBuilt() {
	assert := suite.Assert()

	gms := calc.NewGiveMeStructs()
	returnedLiteral := gms.StructLiteral()
	nativeBuilt := calclib.StructWithOnlyOptionals{
		Optional1: jsii.String("optional1FromStructLiteral"),
		Optional3: jsii.Bool(false),
	}

	assert.Equal(*nativeBuilt.Optional1, *returnedLiteral.Optional1)
	assert.Equal(nativeBuilt.Optional2, returnedLiteral.Optional2)
	assert.Equal(*nativeBuilt.Optional3, *returnedLiteral.Optional3)
	assert.EqualValues(nativeBuilt, *returnedLiteral)
	assert.EqualValues(*returnedLiteral, nativeBuilt)
}

func (suite *ComplianceSuite) TestClassesCanSelfReferenceDuringClassInitialization() {
	assert := suite.Assert()

	outerClass := child.NewOuterClass()
	assert.NotNil(outerClass.InnerClass())
}

func (suite *ComplianceSuite) TestCanObtainStructReferenceWithOverloadedSetter() {
	assert := suite.Assert()
	assert.NotNil(calc.ConfusingToJackson_MakeStructInstance())
}

func (suite *ComplianceSuite) TestCallbacksCorrectlyDeserializeArguments() {
	assert := suite.Assert()
	renderer := NewTestCallbacksCorrectlyDeserializeArgumentsDataRenderer()

	assert.Equal("{\n  \"anumber\": 50,\n  \"astring\": \"50\",\n  \"custom\": \"value\"\n}",
		*renderer.Render(&calclib.MyFirstStruct{Anumber: jsii.Number(50), Astring: jsii.String("50")}))
}

type testCallbacksCorrectlyDeserializeArgumentsDataRenderer struct {
	calc.DataRenderer `overrides:"RenderMap"`
}

func NewTestCallbacksCorrectlyDeserializeArgumentsDataRenderer() *testCallbacksCorrectlyDeserializeArgumentsDataRenderer {
	t := testCallbacksCorrectlyDeserializeArgumentsDataRenderer{}
	calc.NewDataRenderer_Override(&t)
	return &t
}

func (r *testCallbacksCorrectlyDeserializeArgumentsDataRenderer) RenderMap(m *map[string]interface{}) *string {
	mapInput := *m
	mapInput["custom"] = jsii.String("value") // this is here to make sure this override actually gets invoked.
	return r.DataRenderer.RenderMap(m)
}

func (suite *ComplianceSuite) TestCanUseInterfaceSetters() {
	assert := suite.Assert()
	obj := calc.ObjectWithPropertyProvider_Provide()

	suite.FailTest("Setter are not generated for read-write properties", "https://github.com/aws/jsii/issues/2665")

	// obj.SetProperty("New Value")
	assert.True(*obj.WasSet())
}

func (suite *ComplianceSuite) TestPropertyOverrides_Interfaces() {
	assert := suite.Assert()

	interfaceWithProps := TestPropertyOverridesInterfacesIInterfaceWithProperties{}
	interact := calc.NewUsesInterfaceWithProperties(&interfaceWithProps)
	assert.Equal("READ_ONLY_STRING", *interact.JustRead())

	suite.FailTest("Not sure. Most likely related to the missing setters on interfaces", "https://github.com/aws/jsii/issues/2665")
	assert.Equal("Hello!?", interact.WriteAndRead(jsii.String("Hello")))
}

type TestPropertyOverridesInterfacesIInterfaceWithProperties struct {
	x *string
}

func (i *TestPropertyOverridesInterfacesIInterfaceWithProperties) ReadOnlyString() *string {
	return jsii.String("READ_ONLY_STRING")
}

func (i *TestPropertyOverridesInterfacesIInterfaceWithProperties) ReadWriteString() *string {
	strct := *i
	str := *strct.x
	result := str + "?"
	return jsii.String(result)
}

// Note this method is not currently part of the generated interface for some reason (https://github.com/aws/jsii/issues/2665).
func (i *TestPropertyOverridesInterfacesIInterfaceWithProperties) SetReadWriteString(value string) {
	newVal := value + "!"
	i.x = &newVal
}

func (suite *ComplianceSuite) TestTestJsiiAgent() {
	assert := suite.Assert()
	assert.Equal(fmt.Sprintf("%s/%s/%s", runtime.Version(), runtime.GOOS, runtime.GOARCH), *calc.JsiiAgent_Value())
}

func (suite *ComplianceSuite) TestDoNotOverridePrivates_Method_Private() {
	assert := suite.Assert()
	obj := &TestDoNotOverridePrivatesMethodPrivateDoNotOverridePrivates{
		DoNotOverridePrivates: calc.NewDoNotOverridePrivates(),
	}

	assert.Equal("privateMethod", *obj.PrivateMethodValue())
}

type TestDoNotOverridePrivatesMethodPrivateDoNotOverridePrivates struct {
	calc.DoNotOverridePrivates
}

func (d *TestDoNotOverridePrivatesMethodPrivateDoNotOverridePrivates) privateMethod() string {
	return "privateMethod-Override"
}

func (suite *ComplianceSuite) TestPureInterfacesCanBeUsedTransparently() {
	assert := suite.Assert()
	expected := &calc.StructB{
		RequiredString: jsii.String("It's Britney b**ch!"),
	}

	delegate := &TestPureInterfacesCanBeUsedTransparentlyIStructReturningDelegate{
		expected: expected,
	}
	consumer := calc.NewConsumePureInterface(delegate)
	assert.EqualValues(expected, consumer.WorkItBaby())
}

type TestPureInterfacesCanBeUsedTransparentlyIStructReturningDelegate struct {
	expected *calc.StructB
}

func (t *TestPureInterfacesCanBeUsedTransparentlyIStructReturningDelegate) ReturnStruct() *calc.StructB {
	return t.expected
}

func (suite *ComplianceSuite) TestNullShouldBeTreatedAsUndefined() {
	obj := calc.NewNullShouldBeTreatedAsUndefined(jsii.String("hello"), nil)
	obj.GiveMeUndefined(nil)
	obj.GiveMeUndefinedInsideAnObject(&calc.NullShouldBeTreatedAsUndefinedData{
		ThisShouldBeUndefined:                              nil,
		ArrayWithThreeElementsAndUndefinedAsSecondArgument: &[]interface{}{jsii.String("hello"), nil, jsii.String("boom")},
	})

	var nilstr *string
	obj.SetChangeMeToUndefined(nilstr)
	obj.VerifyPropertyIsUndefined()
}

type myOverridableProtectedMember struct {
	calc.OverridableProtectedMember `overrides:"OverrideMe"`
}

func newMyOverridableProtectedMember() *myOverridableProtectedMember {
	m := myOverridableProtectedMember{}
	calc.NewOverridableProtectedMember_Override(&m)
	return &m
}

func (x myOverridableProtectedMember) OverrideMe() *string {
	return jsii.String("Cthulhu Fhtagn!")
}

func (suite *ComplianceSuite) TestCanOverrideProtectedMethod() {
	assert := suite.Assert()
	challenge := "Cthulhu Fhtagn!"

	overridden := newMyOverridableProtectedMember()

	assert.Equal(challenge, *overridden.ValueFromProtected())
}

func (suite *ComplianceSuite) TestEraseUnsetDataValues() {
	assert := suite.Assert()
	opts := calc.EraseUndefinedHashValuesOptions{Option1: jsii.String("option1")}
	assert.True(*calc.EraseUndefinedHashValues_DoesKeyExist(&opts, jsii.String("option1")))

	assert.Equal(map[string]interface{}{"prop2": "value2"}, *calc.EraseUndefinedHashValues_Prop1IsNull())
	assert.Equal(map[string]interface{}{"prop1": "value1"}, *calc.EraseUndefinedHashValues_Prop2IsUndefined())

	assert.False(*calc.EraseUndefinedHashValues_DoesKeyExist(&opts, jsii.String("option2")))
}

func (suite *ComplianceSuite) TestStructs_containsNullChecks() {
	assert := suite.Assert()
	s := calclib.MyFirstStruct{} // <-- this struct has required fields
	obj := calc.NewGiveMeStructs()

	suite.FailTest("No validation of required fields in structs", "https://github.com/aws/jsii/issues/2672")

	// we expect a failure here when we pass the struct to js
	assert.PanicsWithError("", func() { obj.ReadFirstNumber(&s) })
}

func (suite *ComplianceSuite) TestUnionPropertiesWithBuilder() {
	assert := suite.Assert()

	obj1 := calc.UnionProperties{Bar: 12, Foo: "Hello"}
	assert.Equal(12, obj1.Bar)
	assert.Equal("Hello", obj1.Foo)

	obj2 := calc.UnionProperties{Bar: "BarIsString"}
	assert.Equal("BarIsString", obj2.Bar)
	assert.Empty(obj2.Foo)

	allTypes := calc.NewAllTypes()
	obj3 := calc.UnionProperties{Bar: allTypes, Foo: 999}
	assert.Same(allTypes, obj3.Bar)
	assert.Equal(999, obj3.Foo)
}

func (suite *ComplianceSuite) TestTestNullIsAValidOptionalMap() {
	assert := suite.Assert()
	assert.Nil(calc.DisappointingCollectionSource_MaybeMap())
}

func (suite *ComplianceSuite) TestMapReturnedByMethodCanBeRead() {
	assert := suite.Assert()
	result := *calc.ClassWithCollections_CreateAMap()
	assert.Equal("value1", *result["key1"])
	assert.Equal("value2", *result["key2"])
	assert.Equal(2, len(result))
}

type myAbstractSuite struct {
	calc.AbstractSuite `overrides:"SomeMethod,Property"`

	_property *string
}

func NewMyAbstractSuite(prop *string) *myAbstractSuite {
	m := myAbstractSuite{_property: prop}
	calc.NewAbstractSuite_Override(&m)
	return &m
}

func (s *myAbstractSuite) SomeMethod(str *string) *string {
	return jsii.String(fmt.Sprintf("Wrapped<%s>", *str))
}

func (s *myAbstractSuite) Property() *string {
	return s._property
}

func (s *myAbstractSuite) SetProperty(value *string) {
	v := fmt.Sprintf("String<%s>", *value)
	s._property = &v
}

func (suite *ComplianceSuite) TestAbstractMembersAreCorrectlyHandled() {
	assert := suite.Assert()
	abstractSuite := NewMyAbstractSuite(nil)
	assert.Equal("Wrapped<String<Oomf!>>", *abstractSuite.WorkItAll(jsii.String("Oomf!")))
}

func (suite *ComplianceSuite) TestCanOverrideProtectedSetter() {
	suite.FailTest("unable to access protected members", "https://github.com/aws/jsii/issues/2673")
	assert := suite.Assert()
	challenge := "Bazzzzzzzzzzzaar..."
	overridden := myOverridableProtectedMember{calc.NewOverridableProtectedMember()}
	overridden.SwitchModes()
	assert.Equal(challenge, overridden.ValueFromProtected())
}

func (suite *ComplianceSuite) TestObjRefsAreLabelledUsingWithTheMostCorrectType() {
	assert := suite.Assert()

	ifaceRef := calc.Constructors_MakeInterface()
	v := ifaceRef
	assert.NotNil(v)

	// TODO: I am not sure this is possible in Go (probably N/A)
	suite.FailTest("N/A?", "")

	classRef, ok := calc.Constructors_MakeClass().(calc.InbetweenClass)
	assert.True(ok)
	assert.NotNil(classRef)
}

func (suite *ComplianceSuite) TestStaticListInClassCannotBeModified() {
	suite.NotApplicableTest("Go arrays are immutable by design")
}

func (suite *ComplianceSuite) TestReturnAbstract() {
	assert := suite.Assert()

	obj := calc.NewAbstractClassReturner()
	obj2 := obj.GiveMeAbstract()

	assert.Equal("Hello, John!!", *obj2.AbstractMethod(jsii.String("John")))
	assert.Equal("propFromInterfaceValue", *obj2.PropFromInterface())
	assert.Equal(float64(42), *obj2.NonAbstractMethod())

	iface := obj.GiveMeInterface()
	assert.Equal("propFromInterfaceValue", *iface.PropFromInterface())
	assert.Equal("hello-abstract-property", *obj.ReturnAbstractFromProperty().AbstractProperty())
}

func (suite *ComplianceSuite) TestCollectionOfInterfaces_MapOfInterfaces() {
	mymap := *calc.InterfaceCollections_MapOfInterfaces()
	for _, value := range mymap {
		value.Ring()
	}
}

func (suite *ComplianceSuite) TestStructs_multiplePropertiesEquals() {
	assert := suite.Assert()
	structA := calc.DiamondInheritanceTopLevelStruct{
		BaseLevelProperty:      jsii.String("one"),
		FirstMidLevelProperty:  jsii.String("two"),
		SecondMidLevelProperty: jsii.String("three"),
		TopLevelProperty:       jsii.String("four"),
	}
	structB := calc.DiamondInheritanceTopLevelStruct{
		BaseLevelProperty:      jsii.String("one"),
		FirstMidLevelProperty:  jsii.String("two"),
		SecondMidLevelProperty: jsii.String("three"),
		TopLevelProperty:       jsii.String("four"),
	}
	structC := calc.DiamondInheritanceTopLevelStruct{
		BaseLevelProperty:      jsii.String("one"),
		FirstMidLevelProperty:  jsii.String("two"),
		SecondMidLevelProperty: jsii.String("different"),
		TopLevelProperty:       jsii.String("four"),
	}

	assert.Equal(structA, structB)
	assert.NotEqual(structA, structC)
}

func (suite *ComplianceSuite) TestAsyncOverrides_callAsyncMethod() {
	suite.FailTest("Async methods are not implemented", "https://github.com/aws/jsii/issues/2670")
	assert := suite.Assert()
	obj := calc.NewAsyncVirtualMethods()
	assert.Equal(float64(128), *obj.CallMe())
	assert.Equal(float64(528), *obj.OverrideMe(jsii.Number(44)))
}

type myDoNotOverridePrivates struct {
	calc.DoNotOverridePrivates
}

func (s *myDoNotOverridePrivates) PrivateProperty() string {
	return "privateProperty-Override"
}

func (s *myDoNotOverridePrivates) SetPrivateProperty(value string) {
	panic("Boom")
}

func (suite *ComplianceSuite) TestDoNotOverridePrivates_property_getter_private() {
	assert := suite.Assert()

	obj := myDoNotOverridePrivates{calc.NewDoNotOverridePrivates()}
	assert.Equal("privateProperty", *obj.PrivatePropertyValue())

	// verify the setter override is not invoked.
	obj.ChangePrivatePropertyValue(jsii.String("MyNewValue"))
	assert.Equal("MyNewValue", *obj.PrivatePropertyValue())
}

func (suite *ComplianceSuite) TestStructs_withDiamondInheritance_correctlyDedupeProperties() {
	assert := suite.Assert()
	s := calc.DiamondInheritanceTopLevelStruct{
		BaseLevelProperty:      jsii.String("base"),
		FirstMidLevelProperty:  jsii.String("mid1"),
		SecondMidLevelProperty: jsii.String("mid2"),
		TopLevelProperty:       jsii.String("top"),
	}

	assert.Equal("base", *s.BaseLevelProperty)
	assert.Equal("mid1", *s.FirstMidLevelProperty)
	assert.Equal("mid2", *s.SecondMidLevelProperty)
	assert.Equal("top", *s.TopLevelProperty)
}

type myDoNotOverridePrivates2 struct {
	calc.DoNotOverridePrivates
}

func (s *myDoNotOverridePrivates2) PrivateProperty() string {
	return "privateProperty-Override"
}

func (suite *ComplianceSuite) TestDoNotOverridePrivates_property_by_name_private() {
	assert := suite.Assert()
	obj := myDoNotOverridePrivates2{calc.NewDoNotOverridePrivates()}
	assert.Equal("privateProperty", *obj.PrivatePropertyValue())
}

func (suite *ComplianceSuite) TestMapInClassCanBeReadCorrectly() {
	assert := suite.Assert()

	modifiableMap := map[string]*string{
		"key": jsii.String("value"),
	}

	classWithCollections := calc.NewClassWithCollections(&modifiableMap, &[]*string{})
	result := *classWithCollections.Map()
	assert.Equal("value", *result["key"])
	assert.Equal(1, len(result))
}

type myAsyncVirtualMethods struct {
	calc.AsyncVirtualMethods
}

func (s *myAsyncVirtualMethods) OverrideMe(mult float64) {
	panic("Thrown by native code")
}

func (suite *ComplianceSuite) TestAsyncOverrides_overrideThrows() {
	suite.FailTest("Async methods are not implemented", "https://github.com/aws/jsii/issues/2670")
	assert := suite.Assert()

	obj := myAsyncVirtualMethods{calc.NewAsyncVirtualMethods()}
	obj.CallMe()
	assert.Panics(func() { obj.CallMe() })
}

func (suite *ComplianceSuite) TestReservedKeywordsAreSlugifiedInClassProperties() {
	suite.NotApplicableTest("Golang doesnt have any reserved words that can be used in public API")
}

func (suite *ComplianceSuite) TestObjectIdDoesNotGetReallocatedWhenTheConstructorPassesThisOut() {
	reflector := NewPartiallyInitializedThisConsumerImpl(suite.Assert())
	calc.NewConstructorPassesThisOut(reflector)
}

type partiallyInitializedThisConsumerImpl struct {
	calc.PartiallyInitializedThisConsumer `overrides:"ConsumePartiallyInitializedThis"`
	assert                                *assert.Assertions
}

func NewPartiallyInitializedThisConsumerImpl(assert *assert.Assertions) *partiallyInitializedThisConsumerImpl {
	p := partiallyInitializedThisConsumerImpl{assert: assert}
	calc.NewPartiallyInitializedThisConsumer_Override(&p)
	return &p
}

func (p *partiallyInitializedThisConsumerImpl) ConsumePartiallyInitializedThis(obj calc.ConstructorPassesThisOut, dt *string, ev calc.AllTypesEnum) *string {
	epoch := time.Date(1970, time.January, 1, 0, 0, 0, 0, time.UTC).Format("2006-01-02T15:04:05.000Z07:00")

	p.assert.NotNil(obj)
	p.assert.Equal(epoch, *dt)
	p.assert.Equal(calc.AllTypesEnum_THIS_IS_GREAT, ev)

	return jsii.String("OK")
}

func (suite *ComplianceSuite) TestInterfaceBuilder() {

	assert := suite.Assert()

	interact := calc.NewUsesInterfaceWithProperties(&TestInterfaceBuilderIInterfaceWithProperties{value: jsii.String("READ_WRITE")})
	assert.Equal("READ_ONLY", *interact.JustRead())

	suite.FailTest("Not sure. Most likely related to the missing setters on interfaces", "https://github.com/aws/jsii/issues/2665")
	assert.Equal("Hello", *interact.WriteAndRead(jsii.String("Hello")))
}

type TestInterfaceBuilderIInterfaceWithProperties struct {
	value *string
}

func (i *TestInterfaceBuilderIInterfaceWithProperties) ReadOnlyString() *string {
	return jsii.String("READ_ONLY")
}

func (i *TestInterfaceBuilderIInterfaceWithProperties) ReadWriteString() *string {
	return i.value
}

func (i *TestInterfaceBuilderIInterfaceWithProperties) SetReadWriteString(val *string) {
	i.value = val
}

func (suite *ComplianceSuite) TestUnionTypes() {

	assert := suite.Assert()

	types := calc.NewAllTypes()

	// single valued property
	types.SetUnionProperty(1234)
	assert.Equal(float64(1234), types.UnionProperty())

	types.SetUnionProperty("Hello")
	assert.Equal("Hello", types.UnionProperty())

	types.SetUnionProperty(calc.NewMultiply(calclib.NewNumber(jsii.Number(2)), calclib.NewNumber(jsii.Number(12))))
	multiply, ok := types.UnionProperty().(calc.Multiply)

	assert.True(ok)
	assert.Equal(float64(24), *multiply.Value())

	// map
	m := map[string]interface{}{"Foo": calclib.NewNumber(jsii.Number(99))}
	types.SetUnionMapProperty(&m)

	unionMapProp := *types.UnionMapProperty()
	number, ok := unionMapProp["Foo"].(calclib.Number)
	assert.True(ok)
	assert.Equal(float64(99), *number.Value())

	// array
	suite.FailTest("Unable to set an array of interfaces", "https://github.com/aws/jsii/issues/2686")
	a := []interface{}{123, calclib.NewNumber(jsii.Number(33))}
	types.SetUnionArrayProperty(&a)

	unionArrayProp := *types.UnionArrayProperty()
	number, ok = unionArrayProp[1].(calclib.Number)
	assert.True(ok)
	assert.Equal(33, *number.Value())
}

func (suite *ComplianceSuite) TestArrays() {
	assert := suite.Assert()
	sum := calc.NewSum()

	suite.FailTest("Unable to set an array of interfaces", "https://github.com/aws/jsii/issues/2686")
	sum.SetParts(&[]calclib.NumericValue{calclib.NewNumber(jsii.Number(5)), calclib.NewNumber(jsii.Number(10)), calc.NewMultiply(calclib.NewNumber(jsii.Number(2)), calclib.NewNumber(jsii.Number(3)))})
	assert.Equal(10+5+(2*3), sum.Value())
	assert.Equal(5, *(*sum.Parts())[0].Value())
	assert.Equal(6, *(*sum.Parts())[2].Value())
	assert.Equal("(((0 + 5) + 10) + (2 * 3))", *sum.ToString())
}

func (suite *ComplianceSuite) TestStaticMapInClassCannotBeModified() {
	suite.NotApplicableTest("Golang does not have unmodifiable maps")
}

func (suite *ComplianceSuite) TestConsts() {

	assert := suite.Assert()

	assert.Equal("hello", *calc.Statics_Foo())
	obj := calc.Statics_ConstObj()
	assert.Equal("world", *obj.Hello())

	assert.Equal(float64(1234), *calc.Statics_BAR())
	assert.Equal("world", *(*calc.Statics_ZooBar())["hello"])
}

func (suite *ComplianceSuite) TestReceiveInstanceOfPrivateClass() {
	assert := suite.Assert()
	assert.True(*calc.NewReturnsPrivateImplementationOfInterface().PrivateImplementation().Success())
}

func (suite *ComplianceSuite) TestMapReturnedByMethodCannotBeModified() {
	suite.NotApplicableTest("Golang does not have unmodifiable maps")
}

func (suite *ComplianceSuite) TestStaticListInClassCanBeReadCorrectly() {
	assert := suite.Assert()

	arr := *calc.ClassWithCollections_StaticArray()
	assert.Contains(arr, jsii.String("one"))
	assert.Contains(arr, jsii.String("two"))
}

func (suite *ComplianceSuite) TestFluentApi() {
	suite.NotApplicableTest("Golang props are intentionally not designed to be fluent")
}

func (suite *ComplianceSuite) TestCanLeverageIndirectInterfacePolymorphism() {
	provider := calc.NewAnonymousImplementationProvider()
	assert := suite.Assert()
	assert.Equal(float64(1337), *provider.ProvideAsClass().Value())

	suite.FailTest("Unable to reuse instances between parent/child interfaces", "https://github.com/aws/jsii/issues/2688")
	assert.Equal(float64(1337), *provider.ProvideAsInterface().Value())
	assert.Equal("to implement", *provider.ProvideAsInterface().Verb())
}

func (suite *ComplianceSuite) TestPropertyOverrides_Set_Throws() {

	assert := suite.Assert()
	so := NewTestPropertyOverrides_Set_ThrowsSyncVirtualMethods()

	assert.Panics(func() { so.ModifyValueOfTheProperty(jsii.String("Hii")) })
}

type testPropertyOverrides_Set_ThrowsSyncVirtualMethods struct {
	calc.SyncVirtualMethods `overrides:"TheProperty"`
}

func NewTestPropertyOverrides_Set_ThrowsSyncVirtualMethods() *testPropertyOverrides_Set_ThrowsSyncVirtualMethods {
	t := testPropertyOverrides_Set_ThrowsSyncVirtualMethods{}
	calc.NewSyncVirtualMethods_Override(&t)
	return &t
}

func (s *testPropertyOverrides_Set_ThrowsSyncVirtualMethods) SetTheProperty(*string) {
	panic("Exception from overloaded setter")
}

func (suite *ComplianceSuite) TestStructs_NonOptionalhashCode() {
	suite.NotApplicableTest("Golang does not have hashCode")
}

func (suite *ComplianceSuite) TestTestLiteralInterface() {

	assert := suite.Assert()
	obj := calc.NewJSObjectLiteralForInterface()
	friendly := obj.GiveMeFriendly()
	assert.Equal("I am literally friendly!", *friendly.Hello())

	gen := obj.GiveMeFriendlyGenerator()
	assert.Equal("giveMeFriendlyGenerator", *gen.Hello())
	assert.Equal(float64(42), *gen.Next())
}

func (suite *ComplianceSuite) TestReservedKeywordsAreSlugifiedInMethodNames() {
	suite.NotApplicableTest("Golang doesnt have any reserved words that can be used in public API")
}

func (suite *ComplianceSuite) TestPureInterfacesCanBeUsedTransparently_WhenTransitivelyImplementing() {
	assert := suite.Assert()
	expected := calc.StructB{
		RequiredString: jsii.String("It's Britney b**ch!"),
	}
	delegate := NewIndirectlyImplementsStructReturningDelegate(&expected)
	consumer := calc.NewConsumePureInterface(delegate)
	assert.EqualValues(expected, *consumer.WorkItBaby())
}

func NewIndirectlyImplementsStructReturningDelegate(expected *calc.StructB) calc.IStructReturningDelegate {
	return &IndirectlyImplementsStructReturningDelegate{ImplementsStructReturningDelegate: ImplementsStructReturningDelegate{expected: expected}}
}

type IndirectlyImplementsStructReturningDelegate struct {
	ImplementsStructReturningDelegate
}

type ImplementsStructReturningDelegate struct {
	expected *calc.StructB
}

func (i ImplementsStructReturningDelegate) ReturnStruct() *calc.StructB {
	return i.expected
}

func (suite *ComplianceSuite) TestExceptions() {

	assert := suite.Assert()

	calc3 := calc.NewCalculator(&calc.CalculatorProps{InitialValue: jsii.Number(20), MaximumValue: jsii.Number(30)})
	calc3.Add(jsii.Number(3))
	assert.Equal(float64(23), *calc3.Value())

	// TODO: should assert the actual error here - not working for some reasons
	assert.Panics(func() {
		calc3.Add(jsii.Number(10))
	})

	calc3.SetMaxValue(jsii.Number(40))
	calc3.Add(jsii.Number(10))
	assert.Equal(float64(33), *calc3.Value())

}

func (suite *ComplianceSuite) TestSyncOverrides_CallsSuper() {

	assert := suite.Assert()

	obj := NewSyncOverrides()
	obj.returnSuper = jsii.Bool(false)
	obj.multiplier = jsii.Number(1)

	assert.Equal(float64(10*5), *obj.CallerIsProperty())

	obj.returnSuper = jsii.Bool(true) // js code returns n * 2
	assert.Equal(float64(10*2), *obj.CallerIsProperty())
}

type syncOverrides struct {
	calc.SyncVirtualMethods `overrides:"VirtualMethod"`
	returnSuper             *bool
	multiplier              *float64
	callAsync               *bool
}

func NewSyncOverrides() *syncOverrides {
	s := syncOverrides{returnSuper: jsii.Bool(false), multiplier: jsii.Number(1), callAsync: jsii.Bool(false)}
	calc.NewSyncVirtualMethods_Override(&s)
	return &s
}

func (s *syncOverrides) VirtualMethod(n *float64) *float64 {
	if *s.returnSuper {
		return s.SyncVirtualMethods.VirtualMethod(n)
	}
	if *s.callAsync {
		obj := OverrideAsyncMethods{AsyncVirtualMethods: calc.NewAsyncVirtualMethods()}
		return obj.CallMe()
	}
	return jsii.Number(5 * (*n) * (*s.multiplier))
}

func (suite *ComplianceSuite) TestAsyncOverrides_OverrideCallsSuper() {

	assert := suite.Assert()

	obj := OverrideCallsSuper{AsyncVirtualMethods: calc.NewAsyncVirtualMethods()}

	suite.FailTest("Async methods are not implemented", "https://github.com/aws/jsii/issues/2670")
	assert.Equal(1441, *obj.OverrideMe(jsii.Number(12)))
	assert.Equal(1209, *obj.CallMe())
}

type OverrideCallsSuper struct {
	calc.AsyncVirtualMethods
}

func (o *OverrideCallsSuper) OverrideMe(mult *float64) *float64 {
	superRet := *o.AsyncVirtualMethods.OverrideMe(mult)
	return jsii.Number(superRet*10 + 1)
}

func (suite *ComplianceSuite) TestSyncOverrides() {

	assert := suite.Assert()

	obj := NewSyncOverrides()
	obj.returnSuper = jsii.Bool(false)
	obj.multiplier = jsii.Number(1)

	assert.Equal(float64(10*5), *obj.CallerIsMethod())

	// affect the result
	obj.multiplier = jsii.Number(5)
	assert.Equal(float64(10*5*5), *obj.CallerIsMethod())

	// verify callbacks are invoked from a property
	assert.Equal(float64(10*5*5), *obj.CallerIsProperty())

	suite.FailTest("Async methods are not implemented", "https://github.com/aws/jsii/issues/2670")
	// and from an async method
	obj.multiplier = jsii.Number(3)
	assert.Equal(float64(10*5*3), *obj.CallerIsAsync())
}

func (suite *ComplianceSuite) TestAsyncOverrides_OverrideAsyncMethod() {

	assert := suite.Assert()

	obj := OverrideAsyncMethods{AsyncVirtualMethods: calc.NewAsyncVirtualMethods()}

	suite.FailTest("Async methods are not implemented", "https://github.com/aws/jsii/issues/2670")
	assert.Equal(float64(4452), obj.CallMe())
}

type OverrideAsyncMethods struct {
	calc.AsyncVirtualMethods
}

func (o *OverrideAsyncMethods) OverrideMe(mult float64) float64 {
	return o.foo() * 2
}

// Implement another method, which doesn't override anything in the base class.
// This should obviously be possible.
func (o *OverrideAsyncMethods) foo() float64 {
	return 2222
}

func (suite *ComplianceSuite) TestFail_SyncOverrides_CallsDoubleAsync_Method() {
	suite.Assert().Panics(func() {
		obj := NewSyncOverrides()
		obj.callAsync = jsii.Bool(true)
		obj.CallerIsMethod()
	})
}

func (suite *ComplianceSuite) TestCollectionOfInterfaces_MapOfStructs() {
	assert := suite.Assert()
	m := *calc.InterfaceCollections_MapOfStructs()
	assert.Equal("Hello, I'm String!", *(*m["A"]).RequiredString)
}

// required to make `go test` recognize the suite.
func TestComplianceSuite(t *testing.T) {
	suite.Run(t, new(ComplianceSuite))
}
