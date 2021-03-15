package tests

import (
	"fmt"
	"github.com/aws/jsii/go-runtime-test/internal/addTen"
	"github.com/aws/jsii/go-runtime-test/internal/doNotOverridePrivates"
	"math"
	"runtime"
	"testing"
	"time"

	"github.com/aws/jsii/go-runtime-test/internal/friendlyRandom"
	"github.com/aws/jsii/go-runtime-test/internal/overrideAsyncMethods"
	"github.com/aws/jsii/go-runtime-test/internal/syncOverrides"
	"github.com/aws/jsii/go-runtime-test/internal/twoOverrides"
	"github.com/aws/jsii/go-runtime-test/internal/wallClock"
	"github.com/stretchr/testify/assert"

	"github.com/aws/jsii-runtime-go"

	"github.com/aws/jsii/jsii-calc/go/jcb"
	calc "github.com/aws/jsii/jsii-calc/go/jsiicalc/v3"
	"github.com/aws/jsii/jsii-calc/go/jsiicalc/v3/composition"
	"github.com/aws/jsii/jsii-calc/go/jsiicalc/v3/submodule/child"
	calclib "github.com/aws/jsii/jsii-calc/go/scopejsiicalclib"
	"github.com/aws/jsii/jsii-calc/go/scopejsiicalclib/customsubmodulename"
	"github.com/stretchr/testify/suite"
)

func (suite *ComplianceSuite) TestStatics() {
	assert := suite.Assert()

	assert.Equal("hello ,Yoyo!", calc.Statics_StaticMethod("Yoyo"))
	assert.Equal("default", calc.Statics_Instance().Value())

	newStatics := calc.NewStatics("new value")
	calc.Statics_SetInstance(newStatics)
	assert.Same(newStatics, calc.Statics_Instance())
	assert.Equal("new value", calc.Statics_Instance().Value())

	// the float64 conversion is a bit annoying - can we do something about it?
	assert.Equal(float64(100), calc.Statics_NonConstStatic())

}

func (suite *ComplianceSuite) TestPrimitiveTypes() {
	assert := suite.Assert()

	types := calc.NewAllTypes()

	// boolean
	types.SetBooleanProperty(true)
	assert.Equal(true, types.BooleanProperty())

	// string
	types.SetStringProperty("foo")
	assert.Equal("foo", types.StringProperty())

	// number
	types.SetNumberProperty(1234)
	assert.Equal(float64(1234), types.NumberProperty())

	// // json
	types.SetJsonProperty(map[string]interface{}{"Foo": map[string]interface{}{"Bar": 123}})
	assert.Equal(float64(123), types.JsonProperty()["Foo"].(map[string]interface{})["Bar"])

	suite.FailTest("Dates are currently treated as strings and fail going through the wire", "https://github.com/aws/jsii/issues/2659")

	// whoops - should accept time.Time, not string.
	// date
	types.SetDateProperty("12345")
	assert.Equal("12345", types.DateProperty())
}

func (suite *ComplianceSuite) TestUseNestedStruct() {
	suite.FailTest("Nested types are not namespaced", "https://github.com/aws/jsii/pull/2650")
	jcb.StaticConsumer_Consume(customsubmodulename.NestingClass_NestedStruct{
		Name: "Bond, James Bond",
	})
}

func (suite *ComplianceSuite) TestStaticMapInClassCanBeReadCorrectly() {
	assert := suite.Assert()

	result := calc.ClassWithCollections_StaticMap()
	assert.Equal("value1", result["key1"])
	assert.Equal("value2", result["key2"])
	assert.Equal(2, len(result))
}

func (suite *ComplianceSuite) TestTestNativeObjectsWithInterfaces() {
	suite.FailTest("Overrides not supported", "https://github.com/aws/jsii/issues/2048")

	assert := suite.Assert()

	// create a pure and native object, not part of the jsii hierarchy, only implements a jsii interface
	pureNative := newPureNativeFriendlyRandom()
	generatorBoundToPureNative := calc.NewNumberGenerator(pureNative)
	assert.Equal(pureNative, generatorBoundToPureNative.Generator())
	assert.Equal(generatorBoundToPureNative.NextTimes100(), 100000)
	assert.Equal(generatorBoundToPureNative.NextTimes100(), 200000)

	//subclassNative := subclassNativeFriendlyRandom{}
	//generatorBoundToPSubclassedObject := calc.NewNumberGenerator(subclassNative)
	//if subclassNative != generatorBoundToPSubclassedObject.Generator() {
	//	t.Fail()
	//}
	//
	//generatorBoundToPSubclassedObject.IsSameGenerator(subclassNative)
	//if generatorBoundToPSubclassedObject.NextTimes100() != 10000 {
	//	t.Fail()
	//}
	//
	//if generatorBoundToPSubclassedObject.NextTimes100() != 20000 {
	//	t.Fail()
	//}

}

func (suite *ComplianceSuite) TestMaps() {
	assert := suite.Assert()

	// TODO: props should be optional
	calc2 := calc.NewCalculator(calc.CalculatorProps{})
	calc2.Add(10)
	calc2.Add(20)
	calc2.Mul(2)

	assert.Equal(2, len(calc2.OperationsMap()["add"]))
	assert.Equal(1, len(calc2.OperationsMap()["mul"]))
	assert.Equal(float64(30), calc2.OperationsMap()["add"][1].Value())
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

	calc := calc.NewCalculator(calc.CalculatorProps{})
	calc.Add(10)
	assert.Equal(float64(10), calc.Value())

	calc.Mul(2)
	assert.Equal(float64(20), calc.Value())

	calc.Pow(5)
	assert.Equal(float64(20*20*20*20*20), calc.Value())

	calc.Neg()
	assert.Equal(float64(-3200000), calc.Value())
}

func (suite *ComplianceSuite) TestNodeStandardLibrary() {
	assert := suite.Assert()

	obj := calc.NewNodeStandardLibrary()
	assert.Equal("Hello, resource! SYNC!", obj.FsReadFileSync())
	assert.NotEmpty(obj.OsPlatform())
	assert.Equal("6a2da20943931e9834fc12cfe5bb47bbd9ae43489a30726962b576f4e3993e50", obj.CryptoSha256())

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
	types.SetAnyProperty([]interface{}{"Hybrid", calclib.NewNumber(12), 123, false})
	assert.Equal(float64(123), (types.AnyProperty()).([]interface{})[2])

	// map
	types.SetAnyProperty(map[string]string{"MapKey": "MapValue"})
	assert.Equal("MapValue", ((types.AnyProperty()).(map[string]interface{}))["MapKey"])

	// map of any
	types.SetAnyProperty(map[string]interface{}{"Goo": 19289812})
	assert.Equal(float64(19289812), ((types.AnyProperty()).(map[string]interface{}))["Goo"])

	// classes
	mult := calc.NewMultiply(calclib.NewNumber(10), calclib.NewNumber(20))
	types.SetAnyProperty(mult)
	assert.Equal(mult, types.AnyProperty())
	assert.Equal(float64(200), ((types.AnyProperty()).(calc.Multiply)).Value())

	// date
	types.SetAnyProperty(time.Unix(1234, 0))
	if types.AnyProperty() != time.Unix(1234, 0) {
		suite.FailTest("Dates not supported", "https://github.com/aws/jsii/issues/2659")
	}
}

func (suite *ComplianceSuite) TestArrayReturnedByMethodCanBeRead() {
	assert := suite.Assert()

	arr := calc.ClassWithCollections_CreateAList()

	assert.Contains(arr, "one")
	assert.Contains(arr, "two")
}

func (suite *ComplianceSuite) TestUnionProperties() {
	assert := suite.Assert()

	calc3 := calc.NewCalculator(calc.CalculatorProps{
		InitialValue: 0,
		MaximumValue: math.MaxFloat64,
	})
	calc3.SetUnionProperty(calc.NewMultiply(calclib.NewNumber(9), calclib.NewNumber(3)))

	_, ok := calc3.UnionProperty().(calc.Multiply)
	assert.True(ok)

	assert.Equal(float64(9*3), calc3.ReadUnionValue())
	calc3.SetUnionProperty(calc.NewPower(calclib.NewNumber(10), calclib.NewNumber(3)))

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

	calc := calc.NewCalculator(calc.CalculatorProps{})
	calc.Add(9)
	calc.Pow(3)
	assert.Equal(composition.CompositeOperation_CompositionStringStyle_NORMAL, calc.StringStyle())

	calc.SetStringStyle(composition.CompositeOperation_CompositionStringStyle_DECORATED)
	assert.Equal(composition.CompositeOperation_CompositionStringStyle_DECORATED, calc.StringStyle())
	assert.Equal("<<[[{{(((1 * (0 + 9)) * (0 + 9)) * (0 + 9))}}]]>>", calc.ToString())
}

func (suite *ComplianceSuite) TestListInClassCanBeReadCorrectly() {
	assert := suite.Assert()

	classWithCollections := calc.NewClassWithCollections(map[string]string{}, []string{"one", "two"})
	val := classWithCollections.Array()
	assert.Equal("one", val[0])
	assert.Equal("two", val[1])
}

type derivedFromAllTypes struct {
	calc.AllTypes
}

func newDerivedFromAllTypes() derivedFromAllTypes {
	return derivedFromAllTypes{
		calc.NewAllTypes(),
	}
}

func (suite *ComplianceSuite) AfterTest(suiteName, testName string) {
	// Close jsii runtime, clean up the child process, etc...
	jsii.Close()
}

func (suite *ComplianceSuite) TestTestFluentApiWithDerivedClasses() {
	assert := suite.Assert()

	obj := newDerivedFromAllTypes()
	obj.SetStringProperty("Hello")
	obj.SetNumberProperty(12)
	assert.Equal("Hello", obj.StringProperty())
	assert.Equal(float64(12), obj.NumberProperty())
}

func (suite *ComplianceSuite) TestCanLoadEnumValues() {
	assert := suite.Assert()
	assert.NotEmpty(calc.EnumDispenser_RandomStringLikeEnum())
	assert.NotEmpty(calc.EnumDispenser_RandomIntegerLikeEnum())
}

func (suite *ComplianceSuite) TestCollectionOfInterfaces_ListOfStructs() {
	assert := suite.Assert()

	list := calc.InterfaceCollections_ListOfStructs()
	assert.Equal("Hello, I'm String!", list[0].RequiredString)
}

func (suite *ComplianceSuite) TestDoNotOverridePrivates_property_getter_public() {
	assert := suite.Assert()

	suite.FailTest("Overrides are not supported yet", "https://github.com/aws/jsii/issues/2048")

	obj := doNotOverridePrivates.New()
	assert.Equal("privateProperty", obj.PrivatePropertyValue())

	// verify the setter override is not invoked.
	obj.ChangePrivatePropertyValue("MyNewValue")
	assert.Equal("MyNewValue", obj.PrivatePropertyValue())
}

func (suite *ComplianceSuite) TestEqualsIsResistantToPropertyShadowingResultVariable() {
	assert := suite.Assert()
	first := calc.StructWithJavaReservedWords{Default: "one"}
	second := calc.StructWithJavaReservedWords{Default: "one"}
	third := calc.StructWithJavaReservedWords{Default: "two"}
	assert.Equal(first, second)
	assert.NotEqual(first, third)
}

type overridableProtectedMemberDerived struct {
	calc.OverridableProtectedMember
}

func newOverridableProtectedMemberDerived() overridableProtectedMemberDerived {
	return overridableProtectedMemberDerived{
		calc.NewOverridableProtectedMember(),
	}
}

func (x *overridableProtectedMemberDerived) OverrideReadOnly() string {
	return "Cthulhu "
}

func (x *overridableProtectedMemberDerived) OverrideReadeWrite() string {
	return "Fhtagn!"
}

func (suite *ComplianceSuite) TestCanOverrideProtectedGetter() {
	suite.FailTest("Overrides are not supported yet", "https://github.com/aws/jsii/issues/2048")

	assert := suite.Assert()
	overridden := newOverridableProtectedMemberDerived()
	assert.Equal("Cthulhu Fhtagn!", overridden.ValueFromProtected())
}

type implementsAdditionalInterface struct {
	calc.AllTypes
	_struct calc.StructB
}

func (x implementsAdditionalInterface) ReturnStruct() calc.StructB {
	return x._struct
}

func newImplementsAdditionalInterface(s calc.StructB) implementsAdditionalInterface {
	return implementsAdditionalInterface{
		calc.NewAllTypes(),
		s,
	}
}

func (suite *ComplianceSuite) TestInterfacesCanBeUsedTransparently_WhenAddedToJsiiType() {
	suite.FailTest("Overrides not supported", "https://github.com/aws/jsii/issues/2048")
	assert := suite.Assert()

	expected := calc.StructB{RequiredString: "It's Britney b**ch!"}
	delegate := newImplementsAdditionalInterface(expected)
	consumer := calc.NewConsumePureInterface(delegate)
	assert.Equal(expected, consumer.WorkItBaby())
}

func (suite *ComplianceSuite) TestStructs_nonOptionalequals() {
	assert := suite.Assert()

	structA := calc.StableStruct{ReadonlyProperty: "one"}
	structB := calc.StableStruct{ReadonlyProperty: "one"}
	structC := calc.StableStruct{ReadonlyProperty: "two"}
	assert.Equal(structB, structA)
	assert.NotEqual(structC, structA)
}

func (suite *ComplianceSuite) TestTestInterfaceParameter() {
	assert := suite.Assert()

	obj := calc.NewJsObjectLiteralForInterface()
	friendly := obj.GiveMeFriendly()
	assert.Equal("I am literally friendly!", friendly.Hello())

	greetingAugmenter := calc.NewGreetingAugmenter()
	betterGreeting := greetingAugmenter.BetterGreeting(friendly)
	assert.Equal("I am literally friendly! Let me buy you a drink!", betterGreeting)
}

func (suite *ComplianceSuite) TestLiftedKwargWithSameNameAsPositionalArg() {
	assert := suite.Assert()

	// This is a replication of a test that mostly affects languages with keyword arguments (e.g: Python, Ruby, ...)
	bell := calc.NewBell()
	amb := calc.NewAmbiguousParameters(bell, calc.StructParameterType{Scope: "Driiiing!"})
	assert.Equal(bell, amb.Scope())

	expected := calc.StructParameterType{Scope: "Driiiing!"}
	assert.Equal(expected, amb.Props())
}

type mulTen struct {
	calc.Multiply
}

func newMulTen(value float64) mulTen {
	return mulTen{
		calc.NewMultiply(calclib.NewNumber(value), calclib.NewNumber(10)),
	}
}

func (suite *ComplianceSuite) TestCreationOfNativeObjectsFromJavaScriptObjects() {
	assert := suite.Assert()

	types := calc.NewAllTypes()

	jsObj := calclib.NewNumber(44)
	types.SetAnyProperty(jsObj)
	_, ok := (types.AnyProperty()).(calclib.Number)
	assert.True(ok)

	suite.FailTest("??", "??")

	nativeObj := addTen.New(10)
	types.SetAnyProperty(nativeObj)
	result1 := types.AnyProperty()
	assert.Equal(nativeObj, result1)

	nativeObj2 := newMulTen(20)
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
		Optional1: "optional1FromStructLiteral",
		Optional3: false,
	}
	assert.Equal(nativeBuilt.Optional1, returnedLiteral.Optional1)
	assert.Equal(nativeBuilt.Optional2, returnedLiteral.Optional2)
	assert.Equal(nativeBuilt.Optional3, returnedLiteral.Optional3)
	assert.Equal(nativeBuilt, returnedLiteral)
	assert.Equal(returnedLiteral, nativeBuilt)
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
	renderer := TestCallbacksCorrectlyDeserializeArgumentsDataRenderer{
		DataRenderer: calc.NewDataRenderer(),
	}

	suite.FailTest("Callbacks are currently not supported", "https://github.com/aws/jsii/issues/2048")
	assert.Equal("{\n  \"anumber\": 50,\n  \"astring\": \"50\",\n  \"firstOptional\": [],\n  \"custom\": \"value\"\n}",
		renderer.Render(calclib.MyFirstStruct{Anumber: 50, Astring: "50"}))
}

type TestCallbacksCorrectlyDeserializeArgumentsDataRenderer struct {
	calc.DataRenderer
}

func (r *TestCallbacksCorrectlyDeserializeArgumentsDataRenderer) RenderMap(m map[string]interface{}) string {
	m["custom"] = "value" // this is here to make sure this override actually gets invoked.
	return r.DataRenderer.RenderMap(m)
}

func (suite *ComplianceSuite) TestCanUseInterfaceSetters() {
	assert := suite.Assert()
	obj := calc.ObjectWithPropertyProvider_Provide()

	suite.FailTest("Setter are not generated for read-write properties", "https://github.com/aws/jsii/issues/2665")

	// obj.SetProperty("New Value")
	assert.True(obj.WasSet())
}

func (suite *ComplianceSuite) TestPropertyOverrides_Interfaces() {
	assert := suite.Assert()

	interact := calc.NewUsesInterfaceWithProperties(&TestPropertyOverridesInterfacesIInterfaceWithProperties{})
	assert.Equal("READ_ONLY_STRING", interact.JustRead())

	suite.FailTest("Not sure. Most likely related to the missing setters on interfaces", "https://github.com/aws/jsii/issues/2665")
	assert.Equal("Hello!?", interact.WriteAndRead("Hello"))
}

type TestPropertyOverridesInterfacesIInterfaceWithProperties struct {
	x string
}

func (i *TestPropertyOverridesInterfacesIInterfaceWithProperties) ReadOnlyString() string {
	return "READ_ONLY_STRING"
}

func (i *TestPropertyOverridesInterfacesIInterfaceWithProperties) ReadWriteString() string {
	return i.x + "?"
}

// Note this method is not currently part of the generated interface for some reason (??).
func (i *TestPropertyOverridesInterfacesIInterfaceWithProperties) SetReadWriteString(value string) {
	i.x = value + "!"
}

func (suite *ComplianceSuite) TestTestJsiiAgent() {
	assert := suite.Assert()
	assert.Equal(fmt.Sprintf("%s/%s/%s", runtime.Version(), runtime.GOOS, runtime.GOARCH), calc.JsiiAgent_Value())
}

func (suite *ComplianceSuite) TestDoNotOverridePrivates_Method_Private() {
	assert := suite.Assert()
	obj := &TestDoNotOverridePrivatesMethodPrivateDoNotOverridePrivates{
		DoNotOverridePrivates: calc.NewDoNotOverridePrivates(),
	}

	assert.Equal("privateMethod", obj.PrivateMethodValue())
}

type TestDoNotOverridePrivatesMethodPrivateDoNotOverridePrivates struct {
	calc.DoNotOverridePrivates
}

func (d *TestDoNotOverridePrivatesMethodPrivateDoNotOverridePrivates) privateMethod() string {
	return "privateMethod-Override"
}

func (suite *ComplianceSuite) TestPureInterfacesCanBeUsedTransparently() {
	assert := suite.Assert()
	expected := calc.StructB{
		RequiredString: "It's Britney b**ch!",
	}

	delegate := &TestPureInterfacesCanBeUsedTransparentlyIStructReturningDelegate{
		expected: expected,
	}
	consumer := calc.NewConsumePureInterface(delegate)
	assert.Equal(expected, consumer.WorkItBaby())
}

type TestPureInterfacesCanBeUsedTransparentlyIStructReturningDelegate struct {
	expected calc.StructB
}

func (t *TestPureInterfacesCanBeUsedTransparentlyIStructReturningDelegate) ReturnStruct() calc.StructB {
	return t.expected
}

func (suite *ComplianceSuite) TestNullShouldBeTreatedAsUndefined() {
	suite.FailTest("Optionals are not supported yet so nil isn't being recognized as undefined", "https://github.com/aws/jsii/issues/2442")

	obj := calc.NewNullShouldBeTreatedAsUndefined("hello", nil)
	obj.GiveMeUndefined(nil)
	obj.GiveMeUndefinedInsideAnObject(calc.NullShouldBeTreatedAsUndefinedData{
		ThisShouldBeUndefined:                              nil,
		ArrayWithThreeElementsAndUndefinedAsSecondArgument: []interface{}{"hello", nil, "boom"},
	})

	// whoops - optionals is still not supported
	obj.SetChangeMeToUndefined("this should be nil")
	obj.VerifyPropertyIsUndefined()
}

type myOverridableProtectedMember struct {
	calc.OverridableProtectedMember
}

func (x myOverridableProtectedMember) OverrideMe() string {
	return "Cthulhu Fhtagn!"
}

func (suite *ComplianceSuite) TestCanOverrideProtectedMethod() {
	suite.FailTest("Overrides not supported", "https://github.com/aws/jsii/issues/2048")

	assert := suite.Assert()
	challenge := "Cthulhu Fhtagn!"

	overridden := myOverridableProtectedMember{
		calc.NewOverridableProtectedMember(),
	}

	assert.Equal(challenge, overridden.ValueFromProtected())
}

func (suite *ComplianceSuite) TestEraseUnsetDataValues() {
	assert := suite.Assert()
	opts := calc.EraseUndefinedHashValuesOptions{Option1: "option1"}
	assert.True(calc.EraseUndefinedHashValues_DoesKeyExist(opts, "option1"))

	assert.Equal(map[string]interface{}{"prop2": "value2"}, calc.EraseUndefinedHashValues_Prop1IsNull())
	assert.Equal(map[string]interface{}{"prop1": "value1"}, calc.EraseUndefinedHashValues_Prop2IsUndefined())

	suite.FailTest("Optionals are not supported", "https://github.com/aws/jsii/issues/2671")
	assert.False(calc.EraseUndefinedHashValues_DoesKeyExist(opts, "option2"))
}

func (suite *ComplianceSuite) TestStructs_containsNullChecks() {
	assert := suite.Assert()
	s := calclib.MyFirstStruct{} // <-- this struct has required fields
	obj := calc.NewGiveMeStructs()

	suite.FailTest("No validation of required fields in structs", "https://github.com/aws/jsii/issues/2672")

	// we expect a failure here when we pass the struct to js
	assert.PanicsWithError("", func() { obj.ReadFirstNumber(s) })
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
	result := calc.ClassWithCollections_CreateAMap()
	assert.Equal("value1", result["key1"])
	assert.Equal("value2", result["key2"])
	assert.Equal(2, len(result))
}

type myAbstractSuite struct {
	calc.AbstractSuite

	_property *string
}

func (s *myAbstractSuite) SomeMethod(str string) string {
	return fmt.Sprintf("Wrapped<%s>", str)
}

func (s *myAbstractSuite) Property() string {
	return *s._property
}

func (s *myAbstractSuite) SetProperty(value string) {
	v := fmt.Sprintf("String<%s>", value)
	s._property = &v
}

func (suite *ComplianceSuite) TestAbstractMembersAreCorrectlyHandled() {
	suite.FailTest("Overrides not supported", "https://github.com/aws/jsii/issues/2048")

	assert := suite.Assert()
	abstractSuite := myAbstractSuite{calc.NewAbstractSuite(), nil}
	assert.Equal("Wrapped<String<Oomf!>>", abstractSuite.WorkItAll("Oomf!"))
}

//type myOverridableProtectedMember struct {
//	calc.OverridableProtectedMember
//}
//
//func (s myOverridableProtectedMember) SetOverrideReadWrite(value string) {
//	s.OverridableProtectedMember.SetOverrideReadWrite("zzzzzzzzz" + value)
//}

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
	var v calc.IPublicInterface = ifaceRef
	assert.NotNil(v)

	// TODO: I am not sure this is possible in Go (probably N/A)
	suite.FailTest("N/A?", "")
	//var classRef calc.InbetweenClass = calc.Constructors_MakeClass()
}

func (suite *ComplianceSuite) TestStaticListInClassCannotBeModified() {
	suite.NotApplicableTest("Go arrays are immutable by design")
}

func (suite *ComplianceSuite) TestReturnAbstract() {
	assert := suite.Assert()

	obj := calc.NewAbstractClassReturner()
	obj2 := obj.GiveMeAbstract()

	assert.Equal("Hello, John!!", obj2.AbstractMethod("John"))
	assert.Equal("propFromInterfaceValue", obj2.PropFromInterface())
	assert.Equal(float64(42), obj2.NonAbstractMethod())

	iface := obj.GiveMeInterface()
	assert.Equal("propFromInterfaceValue", iface.PropFromInterface())
	assert.Equal("hello-abstract-property", obj.ReturnAbstractFromProperty().AbstractProperty())
}

func (suite *ComplianceSuite) TestCollectionOfInterfaces_MapOfInterfaces() {
	mymap := calc.InterfaceCollections_MapOfInterfaces()
	for _, value := range mymap {
		value.Ring()
	}
}

func (suite *ComplianceSuite) TestStructs_multiplePropertiesEquals() {
	assert := suite.Assert()
	structA := calc.DiamondInheritanceTopLevelStruct{
		BaseLevelProperty:      "one",
		FirstMidLevelProperty:  "two",
		SecondMidLevelProperty: "three",
		TopLevelProperty:       "four",
	}
	structB := calc.DiamondInheritanceTopLevelStruct{
		BaseLevelProperty:      "one",
		FirstMidLevelProperty:  "two",
		SecondMidLevelProperty: "three",
		TopLevelProperty:       "four",
	}
	structC := calc.DiamondInheritanceTopLevelStruct{
		BaseLevelProperty:      "one",
		FirstMidLevelProperty:  "two",
		SecondMidLevelProperty: "different",
		TopLevelProperty:       "four",
	}

	assert.Equal(structA, structB)
	assert.NotEqual(structA, structC)
}

func (suite *ComplianceSuite) TestAsyncOverrides_callAsyncMethod() {
	suite.FailTest("Async methods are not implemented", "https://github.com/aws/jsii/issues/2670")
	assert := suite.Assert()
	obj := calc.NewAsyncVirtualMethods()
	assert.Equal(float64(128), obj.CallMe())
	assert.Equal(float64(528), obj.OverrideMe(44))
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
	assert.Equal("privateProperty", obj.PrivatePropertyValue())

	// verify the setter override is not invoked.
	obj.ChangePrivatePropertyValue("MyNewValue")
	assert.Equal("MyNewValue", obj.PrivatePropertyValue())
}

func (suite *ComplianceSuite) TestStructs_withDiamondInheritance_correctlyDedupeProperties() {
	assert := suite.Assert()
	s := calc.DiamondInheritanceTopLevelStruct{
		BaseLevelProperty:      "base",
		FirstMidLevelProperty:  "mid1",
		SecondMidLevelProperty: "mid2",
		TopLevelProperty:       "top",
	}

	assert.Equal("base", s.BaseLevelProperty)
	assert.Equal("mid1", s.FirstMidLevelProperty)
	assert.Equal("mid2", s.SecondMidLevelProperty)
	assert.Equal("top", s.TopLevelProperty)
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
	assert.Equal("privateProperty", obj.PrivatePropertyValue())
}

func (suite *ComplianceSuite) TestMapInClassCanBeReadCorrectly() {
	assert := suite.Assert()

	modifiableMap := map[string]string{
		"key": "value",
	}

	classWithCollections := calc.NewClassWithCollections(modifiableMap, []string{})
	result := classWithCollections.Map()
	assert.Equal("value", result["key"])
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

func (suite *ComplianceSuite) TestHashCodeIsResistantToPropertyShadowingResultVariable() {
	t := suite.T()
	t.Skip("Go does not have HashCode()")
}

func (suite *ComplianceSuite) TestStructsMultiplePropertiesHashCode() {
	t := suite.T()
	t.Skip("Go does not have HashCode()")
}

func (suite *ComplianceSuite) TestStructsOptionalHashCode() {
	t := suite.T()
	t.Skip("Go does not have HashCode()")
}

func (suite *ComplianceSuite) TestReturnSubclassThatImplementsInterface976() {
	t := suite.T()

	obj := calc.SomeTypeJsii976_ReturnReturn()
	assert.Equal(t, 333.0, obj.Foo())
}

func (suite *ComplianceSuite) TestStructsOptionalEquals() {
	t := suite.T()
	t.Skip("Go does not have Equals(other)")
}

func (suite *ComplianceSuite) TestPropertyOverridesGetCallsSuper() {
	t := suite.T()
	t.Skip("Class extension is not fully supported yet")

	so := &testPropertyOverridesGetCallsSuper{}
	so.SyncVirtualMethods = so

	assert.Equal(t, "super:initial value", so.RetrieveValueOfTheProperty())
	assert.Equal(t, "super:initial value", so.TheProperty())
}

type testPropertyOverridesGetCallsSuper struct {
	calc.SyncVirtualMethods `overrides:"TheProperty"`
}

func (t *testPropertyOverridesGetCallsSuper) TheProperty() string {
	s := t.SyncVirtualMethods.TheProperty()
	return fmt.Sprintf("super:%s", s)
}

func (suite *ComplianceSuite) TestUnmarshallIntoAbstractType() {
	t := suite.T()

	c := calc.NewCalculator(calc.CalculatorProps{})
	c.Add(120)
	v := c.Curr()

	assert.Equal(t, 120.0, v.Value())
}

func (suite *ComplianceSuite) TestFailSyncOverridesCallsDoubleAsyncPropertyGetter() {
	t := suite.T()
	t.Skip("Class extension is not fully supported yet")

	obj := syncOverrides.New()
	obj.CallAsync = true

	defer func() {
		err := recover()
		assert.NotNil(t, err, "expected a failure to occur")
	}()

	obj.CallerIsProperty()
}

func (suite *ComplianceSuite) TestFailSyncOverridesCallsDoubleAsyncPropertySetter() {
	t := suite.T()
	t.Skip("Class extension is not fully supported yet")

	obj := syncOverrides.New()
	obj.CallAsync = true

	defer func() {
		err := recover()
		assert.NotNil(t, err, "expected a failure to occur")
	}()

	obj.SetCallerIsProperty(12)
}

func (suite *ComplianceSuite) TestPropertyOverridesGetSet() {
	t := suite.T()
	t.Skip("Class extension is not fully supported yet")

	so := syncOverrides.New()
	assert.Equal(t, "I am an override!", so.RetrieveValueOfTheProperty())
	so.ModifyValueOfTheProperty("New Value")
	assert.Equal(t, "New Value", so.AnotherTheProperty)
}

func (suite *ComplianceSuite) TestVariadicMethodCanBeInvoked() {
	t := suite.T()

	vm := calc.NewVariadicMethod(1)
	result := vm.AsArray(3, 4, 5, 6)
	assert.Equal(t, []float64{1, 3, 4, 5, 6}, result)
}

func (suite *ComplianceSuite) TestCollectionTypes() {
	t := suite.T()

	at := calc.NewAllTypes()

	// array
	at.SetArrayProperty([]string{"Hello", "World"})
	assert.Equal(t, "World", at.ArrayProperty()[1])

	// map
	at.SetMapProperty(map[string]calclib.Number{"Foo": calclib.NewNumber(123)})
	assert.Equal(t, 123.0, at.MapProperty()["Foo"].Value())
}

func (suite *ComplianceSuite) TestAsyncOverridesOverrideAsyncMethodByParentClass() {
	t := suite.T()
	t.Skip("Class extension is not fully supported yet")

	obj := overrideAsyncMethods.NewOverrideAsyncMethodsByBaseClass()
	assert.Equal(t, 4452.0, obj.CallMe())
}

func (suite *ComplianceSuite) TestTestStructsCanBeDowncastedToParentType() {
	t := suite.T()

	assert.NotZero(t, calc.Demonstrate982_TakeThis())
	assert.NotZero(t, calc.Demonstrate982_TakeThisToo())
}

func (suite *ComplianceSuite) TestPropertyOverridesGetThrows() {
	t := suite.T()
	t.Skip("Class extension is not fully supported yet")

	so := &testPropertyOverridesGetThrows{}
	so.SyncVirtualMethods = so

	defer func() {
		err := recover()
		assert.NotNil(t, err, "expected an error!")
		assert.Equal(t, "Oh no, this is bad", err)
	}()

	so.RetrieveValueOfTheProperty()
}

type testPropertyOverridesGetThrows struct {
	calc.SyncVirtualMethods
}

func (t *testPropertyOverridesGetThrows) TheProperty() string {
	panic("Oh no, this is bad")
}

func (suite *ComplianceSuite) TestGetSetPrimitiveProperties() {
	t := suite.T()

	number := calclib.NewNumber(20)
	assert.Equal(t, 20.0, number.Value())
	assert.Equal(t, 40.0, number.DoubleValue())
	assert.Equal(t, -30.0, calc.NewNegate(calc.NewAdd(calclib.NewNumber(20), calclib.NewNumber(10))).Value())
	assert.Equal(t, 20.0, calc.NewMultiply(calc.NewAdd(calclib.NewNumber(5), calclib.NewNumber(5)), calclib.NewNumber(2)).Value())
	assert.Equal(t, 3.0*3*3*3, calc.NewPower(calclib.NewNumber(3), calclib.NewNumber(4)).Value())
	assert.Equal(t, 999.0, calc.NewPower(calclib.NewNumber(999), calclib.NewNumber(1)).Value())
	assert.Equal(t, 1.0, calc.NewPower(calclib.NewNumber(999), calclib.NewNumber(0)).Value())
}

func (suite *ComplianceSuite) TestGetAndSetNonPrimitiveProperties() {
	t := suite.T()

	c := calc.NewCalculator(calc.CalculatorProps{})
	c.Add(3200000)
	c.Neg()
	c.SetCurr(calc.NewMultiply(calclib.NewNumber(2), c.Curr()))
	assert.Equal(t, -6400000.0, c.Value())
}

func (suite *ComplianceSuite) TestReservedKeywordsAreSlugifiedInStructProperties() {
	t := suite.T()
	t.Skip("Go reserved words do not collide with identifiers used in API surface")
}

func (suite *ComplianceSuite) TestDoNotOverridePrivatesMethodPublic() {
	t := suite.T()
	t.Skip("Class extension is not fully supported yet")

	obj := doNotOverridePrivates.New()

	assert.Equal(t, "privateMethod", obj.PrivateMethodValue())
}

func (suite *ComplianceSuite) TestDoNotOverridePrivatesPropertyByNamePublic() {
	t := suite.T()
	t.Skip("Class extension is not fully supported yet")

	obj := doNotOverridePrivates.New()

	assert.Equal(t, "privateProperty", obj.PrivatePropertyValue())
}

func (suite *ComplianceSuite) TestTestNullIsAValidOptionalList() {
	t := suite.T()
	t.Skip("Optionals are not implemented yet")

	assert.Nil(t, calc.DisappointingCollectionSource_MaybeList())
}

func (suite *ComplianceSuite) TestMapInClassCannotBeModified() {
	t := suite.T()
	t.Skip("Go does not have immutable maps, and copies are returned")
}

func (suite *ComplianceSuite) TestAsyncOverridesTwoOverrides() {
	t := suite.T()
	t.Skip("Class extension is not fully supported yet")

	obj := twoOverrides.New()
	assert.Equal(t, 684.0, obj.CallMe())
}

func (suite *ComplianceSuite) TestPropertyOverridesSetCallsSuper() {
	t := suite.T()
	t.Skip("Class extension is not fully supported yet")

	so := &testPropertyOverridesSetCallsSuper{}
	so.SyncVirtualMethods = so

	so.ModifyValueOfTheProperty("New Value")
	assert.Equal(t, "New Value:by override", so.TheProperty())
}

type testPropertyOverridesSetCallsSuper struct {
	calc.SyncVirtualMethods `override:"TheProperty"`
}

func (t *testPropertyOverridesSetCallsSuper) SetTheProperty(value string) {
	t.SyncVirtualMethods.SetTheProperty(fmt.Sprintf("%s:by override", value))
}

func (suite *ComplianceSuite) TestIso8601DoesNotDeserializeToDate() {
	t := suite.T()
	t.Skip("Class extension is not fully supported yet")

	nowAsISO := time.Now().Format(time.RFC3339)

	w := wallClock.NewWallClock(nowAsISO)
	entropy := wallClock.NewEntropy(w)

	assert.Equal(t, nowAsISO, entropy.Increase())
}

func (suite *ComplianceSuite) TestCollectionOfInterfacesListOfInterfaces() {
	t := suite.T()

	for _, obj := range calc.InterfaceCollections_ListOfInterfaces() {
		assert.Implements(t, (*calc.IBell)(nil), obj)
	}
}

func (suite *ComplianceSuite) TestUndefinedAndNull() {
	t := suite.T()
	t.Skip("Optionals are not implemented yet")

	c := calc.NewCalculator(calc.CalculatorProps{})
	assert.Nil(t, c.MaxValue())
	// TODO: c.SetMaxValue(nil)
}

func (suite *ComplianceSuite) TestStructsSerializeToJsii() {
	t := suite.T()
	t.Skip("DateTime fields are not implemented yet")

	firstStruct := calclib.MyFirstStruct{
		Astring:       "FirstString",
		Anumber:       999.0,
		FirstOptional: []string{"First", "Optional"},
	}

	doubleTrouble := calc.NewDoubleTrouble()

	derivedStruct := calc.DerivedStruct{
		NonPrimitive: doubleTrouble,
		Bool:         false,
		// TODO: AnotherRequired: time.Now(),
		Astring:       "String",
		Anumber:       1234,
		FirstOptional: []string{"one", "two"},
	}

	gms := calc.NewGiveMeStructs()
	assert.Equal(t, 999.0, gms.ReadFirstNumber(firstStruct))
	assert.Equal(t, 1234.0, gms.ReadFirstNumber(derivedStruct.ToMyFirstStruct()))
	assert.Equal(t, doubleTrouble, gms.ReadDerivedNonPrimitive(derivedStruct))

	literal := gms.StructLiteral()
	assert.Equal(t, "optional1FromStructLiteral", literal.Optional1)
	assert.Equal(t, false, literal.Optional3)
	assert.Nil(t, literal.Optional2)
}

func (suite *ComplianceSuite) TestCanObtainReferenceWithOverloadedSetter() {
	t := suite.T()

	assert.NotNil(t, calc.ConfusingToJackson_MakeInstance())
}

func (suite *ComplianceSuite) TestTestJsObjectLiteralToNative() {
	t := suite.T()

	obj := calc.NewJsObjectLiteralToNative()
	obj2 := obj.ReturnLiteral()

	assert.Equal(t, "Hello", obj2.PropA())
	assert.Equal(t, 102.0, obj2.PropB())
}

func (suite *ComplianceSuite) TestClassWithPrivateConstructorAndAutomaticProperties() {
	t := suite.T()

	obj := calc.ClassWithPrivateConstructorAndAutomaticProperties_Create("Hello", "Bye")
	assert.Equal(t, "Bye", obj.ReadWriteString())
	obj.SetReadWriteString("Hello")
	assert.Equal(t, "Hello", obj.ReadOnlyString())
}

func (suite *ComplianceSuite) TestArrayReturnedByMethodCannotBeModified() {
	t := suite.T()
	t.Skip("Go does not have immutable lists, and copies are returned")
}

func (suite *ComplianceSuite) TestCorrectlyDeserializesStructUnions() {
	t := suite.T()

	a0 := calc.StructA{
		RequiredString: "Present!",
		OptionalString: "Bazinga!",
	}
	a1 := calc.StructA{
		RequiredString: "Present!",
		OptionalNumber: 1337,
	}
	b0 := calc.StructB{
		RequiredString:  "Present!",
		OptionalBoolean: true,
	}
	b1 := calc.StructB{
		RequiredString:  "Present!",
		OptionalStructA: a1,
	}

	assert.True(t, calc.StructUnionConsumer_IsStructA(a0))
	assert.True(t, calc.StructUnionConsumer_IsStructA(a1))
	assert.False(t, calc.StructUnionConsumer_IsStructA(b0))
	assert.False(t, calc.StructUnionConsumer_IsStructA(b1))

	assert.False(t, calc.StructUnionConsumer_IsStructB(a0))
	assert.False(t, calc.StructUnionConsumer_IsStructB(a1))
	assert.True(t, calc.StructUnionConsumer_IsStructB(b0))
	assert.True(t, calc.StructUnionConsumer_IsStructB(b1))
}

func (suite *ComplianceSuite) TestSubclassing() {
	t := suite.T()
	t.Log("This is, in fact, demonstrating wrapping another type (which is more go-ey than extending)")

	c := calc.NewCalculator(calc.CalculatorProps{})
	c.SetCurr(addTen.New(33))
	c.Neg()
	assert.Equal(t, -43.0, c.Value())
}

func (suite *ComplianceSuite) TestTestInterfaces() {
	t := suite.T()

	var (
		friendly                calclib.IFriendly
		friendlier              calc.IFriendlier
		randomNumberGenerator   calc.IRandomNumberGenerator
		friendlyRandomGenerator calc.IFriendlyRandomGenerator
	)

	add := calc.NewAdd(calclib.NewNumber(10), calclib.NewNumber(20))
	friendly = add
	// friendlier = add // <-- shouldn't compile since Add implements IFriendly
	assert.Equal(t, "Hello, I am a binary operation. What's your name?", friendly.Hello())

	multiply := calc.NewMultiply(calclib.NewNumber(10), calclib.NewNumber(30))
	friendly = multiply
	friendlier = multiply
	randomNumberGenerator = multiply
	// friendlyRandomGenerator = multiply // <-- shouldn't compile
	assert.Equal(t, "Hello, I am a binary operation. What's your name?", friendly.Hello())
	assert.Equal(t, "Goodbye from Multiply!", friendlier.Goodbye())
	assert.Equal(t, 89.0, randomNumberGenerator.Next())

	friendlyRandomGenerator = calc.NewDoubleTrouble()
	assert.Equal(t, "world", friendlyRandomGenerator.Hello())
	assert.Equal(t, 12.0, friendlyRandomGenerator.Next())

	poly := calc.NewPolymorphism()
	assert.Equal(t, "oh, Hello, I am a binary operation. What's your name?", poly.SayHello(friendly))
	assert.Equal(t, "oh, world", poly.SayHello(friendlyRandomGenerator))
	assert.Equal(t, "oh, I am a native!", poly.SayHello(friendlyRandom.NewPure()))
	t.Skip("Class extension is not fully supported yet")
	assert.Equal(t, "oh, SubclassNativeFriendlyRandom", poly.SayHello(friendlyRandom.NewSubclass()))
}

// required to make `go test` recognize the suite.
func TestComplianceSuite(t *testing.T) {
	suite.Run(t, new(ComplianceSuite))
}
