package tests

import (
	"encoding/json"
	"fmt"
	"math"
	"runtime"
	"testing"
	"time"

	"github.com/aws/jsii/go-runtime-test/internal/addTen"
	"github.com/aws/jsii/go-runtime-test/internal/doNotOverridePrivates"

	"github.com/aws/jsii/go-runtime-test/internal/friendlyRandom"
	"github.com/aws/jsii/go-runtime-test/internal/overrideAsyncMethods"
	"github.com/aws/jsii/go-runtime-test/internal/syncOverrides"
	"github.com/aws/jsii/go-runtime-test/internal/twoOverrides"
	"github.com/aws/jsii/go-runtime-test/internal/wallClock"

	"github.com/aws/jsii-runtime-go"

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

	obj := calc.NewJSObjectLiteralForInterface()
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

// Note this method is not currently part of the generated interface for some reason (https://github.com/aws/jsii/issues/2665).
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

func (suite *ComplianceSuite) TestStructs_StepBuilders() {
	suite.NotApplicableTest("Go does not generate fluent builders")
}

func (suite *ComplianceSuite) TestStaticListInClassCannotBeModified() {
	suite.NotApplicableTest("Go arrays are immutable by design")
}

func (suite *ComplianceSuite) TestStructsAreUndecoratedOntheWayToKernel() {
	assert := suite.Assert()

	s := calc.StructB{RequiredString: "Bazinga!", OptionalBoolean: false}
	j := calc.JsonFormatter_Stringify(s)

	var a map[string]interface{}
	if err := json.Unmarshal([]byte(j), &a); err != nil {
		assert.FailNowf(err.Error(), "unmarshal failed")
	}

	// Optional members get returned in the JSON, which breaks this test!
	suite.FailTest("Optionals are not supported", "https://github.com/aws/jsii/issues/2671")

	assert.Equal(
		map[string]interface{}{
			"requiredString":  "Bazinga!",
			"optionalBoolean": false,
		},
		a,
	)
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
	suite.NotApplicableTest("Go does not have HashCode()")
}

func (suite *ComplianceSuite) TestStructs_MultiplePropertiesHashCode() {
	suite.NotApplicableTest("Go does not have HashCode()")
}

func (suite *ComplianceSuite) TestStructs_OptionalHashCode() {
	suite.NotApplicableTest("Go does not have HashCode()")
}

func (suite *ComplianceSuite) TestReturnSubclassThatImplementsInterface976() {
	t := suite.T()

	obj := calc.SomeTypeJsii976_ReturnReturn()
	assert.Equal(t, 333.0, obj.Foo())
}

func (suite *ComplianceSuite) TestStructs_OptionalEquals() {
	suite.NotApplicableTest("Go does not have Equals(other)")
}

func (suite *ComplianceSuite) TestPropertyOverrides_Get_Calls_Super() {
	t := suite.T()
	suite.FailTest("Test relies on overrides, which are not supported yet", "https://github.com/aws/jsii/issues/2048")

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

func (suite *ComplianceSuite) TestFail_SyncOverrides_CallsDoubleAsync_PropertyGetter() {
	t := suite.T()
	suite.FailTest("Test relies on overrides, which are not supported yet", "https://github.com/aws/jsii/issues/2048")

	obj := syncOverrides.New()
	obj.CallAsync = true

	defer func() {
		err := recover()
		assert.NotNil(t, err, "expected a failure to occur")
	}()

	obj.CallerIsProperty()
}

func (suite *ComplianceSuite) TestFail_SyncOverrides_CallsDoubleAsync_PropertySetter() {
	t := suite.T()
	suite.FailTest("Test relies on overrides, which are not supported yet", "https://github.com/aws/jsii/issues/2048")

	obj := syncOverrides.New()
	obj.CallAsync = true

	defer func() {
		err := recover()
		assert.NotNil(t, err, "expected a failure to occur")
	}()

	obj.SetCallerIsProperty(12)
}

func (suite *ComplianceSuite) TestPropertyOverrides_Get_Set() {
	t := suite.T()
	suite.FailTest("Test relies on overrides, which are not supported yet", "https://github.com/aws/jsii/issues/2048")

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

func (suite *ComplianceSuite) TestAsyncOverrides_OverrideAsyncMethodByParentClass() {
	t := suite.T()
	suite.FailTest("Test relies on overrides, which are not supported yet", "https://github.com/aws/jsii/issues/2048")

	obj := overrideAsyncMethods.NewOverrideAsyncMethodsByBaseClass()
	assert.Equal(t, 4452.0, obj.CallMe())
}

func (suite *ComplianceSuite) TestTestStructsCanBeDowncastedToParentType() {
	t := suite.T()

	assert.NotZero(t, calc.Demonstrate982_TakeThis())
	assert.NotZero(t, calc.Demonstrate982_TakeThisToo())
}

func (suite *ComplianceSuite) TestPropertyOverrides_Get_Throws() {
	t := suite.T()
	suite.FailTest("Test relies on overrides, which are not supported yet", "https://github.com/aws/jsii/issues/2048")

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

func (suite *ComplianceSuite) TestDoNotOverridePrivates_Method_Public() {
	t := suite.T()
	suite.FailTest("Test relies on overrides, which are not supported yet", "https://github.com/aws/jsii/issues/2048")

	obj := doNotOverridePrivates.New()

	assert.Equal(t, "privateMethod", obj.PrivateMethodValue())
}

func (suite *ComplianceSuite) TestDoNotOverridePrivates_Property_By_Name_Public() {
	t := suite.T()
	suite.FailTest("Test relies on overrides, which are not supported yet", "https://github.com/aws/jsii/issues/2048")

	obj := doNotOverridePrivates.New()

	assert.Equal(t, "privateProperty", obj.PrivatePropertyValue())
}

func (suite *ComplianceSuite) TestTestNullIsAValidOptionalList() {
	t := suite.T()
	suite.FailTest("Optionals are not supported", "https://github.com/aws/jsii/issues/2671")

	assert.Nil(t, calc.DisappointingCollectionSource_MaybeList())
}

func (suite *ComplianceSuite) TestMapInClassCannotBeModified() {
	suite.NotApplicableTest("Go maps are immutable by design")
}

func (suite *ComplianceSuite) TestAsyncOverrides_TwoOverrides() {
	t := suite.T()
	suite.FailTest("Test relies on overrides, which are not supported yet", "https://github.com/aws/jsii/issues/2048")

	obj := twoOverrides.New()
	assert.Equal(t, 684.0, obj.CallMe())
}

func (suite *ComplianceSuite) TestPropertyOverrides_Set_Calls_Super() {
	t := suite.T()
	suite.FailTest("Test relies on overrides, which are not supported yet", "https://github.com/aws/jsii/issues/2048")

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
	suite.FailTest("Test relies on overrides, which are not supported yet", "https://github.com/aws/jsii/issues/2048")

	nowAsISO := time.Now().Format(time.RFC3339)

	w := wallClock.NewWallClock(nowAsISO)
	entropy := wallClock.NewEntropy(w)

	assert.Equal(t, nowAsISO, entropy.Increase())
}

func (suite *ComplianceSuite) TestCollectionOfInterfaces_ListOfInterfaces() {
	t := suite.T()

	for _, obj := range calc.InterfaceCollections_ListOfInterfaces() {
		assert.Implements(t, (*calc.IBell)(nil), obj)
	}
}

func (suite *ComplianceSuite) TestUndefinedAndNull() {
	t := suite.T()
	suite.FailTest("Optionals are not supported", "https://github.com/aws/jsii/issues/2671")

	c := calc.NewCalculator(calc.CalculatorProps{})
	assert.Nil(t, c.MaxValue())
	// TODO: c.SetMaxValue(nil)
}

func (suite *ComplianceSuite) TestStructs_SerializeToJsii() {
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
	assert.Equal(t, 1234.0, gms.ReadFirstNumber(calclib.MyFirstStruct{
		Anumber:       derivedStruct.Anumber,
		Astring:       derivedStruct.Astring,
		FirstOptional: derivedStruct.FirstOptional,
	}))
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

	obj := calc.NewJSObjectLiteralToNative()
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
	suite.NotApplicableTest("Go arrays are immutable by design")
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
	suite.FailTest("Test relies on overrides, which are not supported yet", "https://github.com/aws/jsii/issues/2048")
	assert.Equal(t, "oh, SubclassNativeFriendlyRandom", poly.SayHello(friendlyRandom.NewSubclass()))
}

func (suite *ComplianceSuite) TestReservedKeywordsAreSlugifiedInClassProperties() {
	suite.NotApplicableTest("Golang doesnt have any reserved words that can be used in public API")
}

func (suite *ComplianceSuite) TestObjectIdDoesNotGetReallocatedWhenTheConstructorPassesThisOut() {
	reflector := PartiallyInitializedThisConsumerImpl{
		assert: suite.Assert(),
	}
	suite.FailTest("Test relies on overrides, which are not supported yet", "https://github.com/aws/jsii/issues/2048")
	calc.NewConstructorPassesThisOut(&reflector)
}

type PartiallyInitializedThisConsumerImpl struct {
	assert *assert.Assertions
}

func (p PartiallyInitializedThisConsumerImpl) ConsumePartiallyInitializedThis(obj calc.ConstructorPassesThisOut, dt string, ev calc.AllTypesEnum) string {

	epoch := time.Date(1970, time.January, 1, 0, 0, 0, 0, nil)

	p.assert.NotNil(obj)
	p.assert.Equal(epoch, dt)
	p.assert.Equal(calc.AllTypesEnum_THIS_IS_GREAT, ev)

	return "OK"

}

func (suite *ComplianceSuite) TestInterfaceBuilder() {

	assert := suite.Assert()

	interact := calc.NewUsesInterfaceWithProperties(&TestInterfaceBuilderIInterfaceWithProperties{value: "READ_WRITE"})
	assert.Equal("READ_ONLY", interact.JustRead())

	suite.FailTest("Not sure. Most likely related to the missing setters on interfaces", "https://github.com/aws/jsii/issues/2665")
	assert.Equal("Hello", interact.WriteAndRead("Hello"))
}

type TestInterfaceBuilderIInterfaceWithProperties struct {
	value string
}

func (i *TestInterfaceBuilderIInterfaceWithProperties) ReadOnlyString() string {
	return "READ_ONLY"
}

func (i *TestInterfaceBuilderIInterfaceWithProperties) ReadWriteString() string {
	return i.value
}

func (i *TestInterfaceBuilderIInterfaceWithProperties) SetReadWriteString(val string) {
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

	types.SetUnionProperty(calc.NewMultiply(calclib.NewNumber(2), calclib.NewNumber(12)))
	multiply, ok := types.UnionProperty().(calc.Multiply)

	assert.True(ok)
	assert.Equal(float64(24), multiply.Value())

	// map
	m := map[string]interface{}{"Foo": calclib.NewNumber(99)}
	types.SetUnionMapProperty(m)

	number, ok := types.UnionMapProperty()["Foo"].(calclib.Number)
	assert.True(ok)
	assert.Equal(float64(99), number.Value())

	// array
	suite.FailTest("Unable to set an array of interfaces", "https://github.com/aws/jsii/issues/2686")
	a := []interface{}{123, calclib.NewNumber(33)}
	types.SetUnionArrayProperty(a)

	number, ok = types.UnionArrayProperty()[1].(calclib.Number)
	assert.True(ok)
	assert.Equal(33, number.Value())
}

func (suite *ComplianceSuite) TestArrays() {
	assert := suite.Assert()
	sum := calc.NewSum()

	suite.FailTest("Unable to set an array of interfaces", "https://github.com/aws/jsii/issues/2686")
	sum.SetParts([]calclib.NumericValue{calclib.NewNumber(5), calclib.NewNumber(10), calc.NewMultiply(calclib.NewNumber(2), calclib.NewNumber(3))})
	assert.Equal(10+5+(2*3), sum.Value())
	assert.Equal(5, sum.Parts()[0].Value())
	assert.Equal(6, sum.Parts()[2].Value())
	assert.Equal("(((0 + 5) + 10) + (2 * 3))", sum.ToString())
}

func (suite *ComplianceSuite) TestStaticMapInClassCannotBeModified() {
	suite.NotApplicableTest("Golang does not have unmodifiable maps")
}

func (suite *ComplianceSuite) TestConsts() {

	assert := suite.Assert()

	assert.Equal("hello", calc.Statics_Foo())
	obj := calc.Statics_ConstObj()
	assert.Equal("world", obj.Hello())

	assert.Equal(float64(1234), calc.Statics_BAR())
	assert.Equal("world", calc.Statics_ZooBar()["hello"])

}

func (suite *ComplianceSuite) TestReceiveInstanceOfPrivateClass() {
	assert := suite.Assert()
	assert.True(calc.NewReturnsPrivateImplementationOfInterface().PrivateImplementation().Success())
}

func (suite *ComplianceSuite) TestMapReturnedByMethodCannotBeModified() {
	suite.NotApplicableTest("Golang does not have unmodifiable maps")
}

func (suite *ComplianceSuite) TestStaticListInClassCanBeReadCorrectly() {
	assert := suite.Assert()

	arr := calc.ClassWithCollections_StaticArray()
	assert.Contains(arr, "one")
	assert.Contains(arr, "two")
}

func (suite *ComplianceSuite) TestFluentApi() {
	suite.NotApplicableTest("Golang props are intentionally not designed to be fluent")
}

func (suite *ComplianceSuite) TestCanLeverageIndirectInterfacePolymorphism() {
	provider := calc.NewAnonymousImplementationProvider()
	assert := suite.Assert()
	assert.Equal(float64(1337), provider.ProvideAsClass().Value())

	suite.FailTest("Unable to reuse instances between parent/child interfaces", "https://github.com/aws/jsii/issues/2688")
	assert.Equal(float64(1337), provider.ProvideAsInterface().Value())
	assert.Equal("to implement", provider.ProvideAsInterface().Verb())
}

func (suite *ComplianceSuite) TestPropertyOverrides_Set_Throws() {

	assert := suite.Assert()
	so := TestPropertyOverrides_Set_ThrowsSyncVirtualMethods{
		SyncVirtualMethods: calc.NewSyncVirtualMethods(),
	}

	suite.FailTest("This test relies on overrides which are not supported yet", "https://github.com/aws/jsii/issues/2048")
	assert.Panics(func() { so.ModifyValueOfTheProperty("Hii") })
}

type TestPropertyOverrides_Set_ThrowsSyncVirtualMethods struct {
	calc.SyncVirtualMethods
}

func (s *TestPropertyOverrides_Set_ThrowsSyncVirtualMethods) SetTheProperty(val string) {
	panic("Exception from overloaded setter")
}

func (suite *ComplianceSuite) TestStructs_NonOptionalhashCode() {
	suite.NotApplicableTest("Golang does not have hashCode")
}

func (suite *ComplianceSuite) TestTestLiteralInterface() {

	assert := suite.Assert()
	obj := calc.NewJSObjectLiteralForInterface()
	friendly := obj.GiveMeFriendly()
	assert.Equal("I am literally friendly!", friendly.Hello())

	gen := obj.GiveMeFriendlyGenerator()
	assert.Equal("giveMeFriendlyGenerator", gen.Hello())
	assert.Equal(float64(42), gen.Next())
}

func (suite *ComplianceSuite) TestReservedKeywordsAreSlugifiedInMethodNames() {
	suite.NotApplicableTest("Golang doesnt have any reserved words that can be used in public API")
}

func (suite *ComplianceSuite) TestPureInterfacesCanBeUsedTransparently_WhenTransitivelyImplementing() {
	assert := suite.Assert()
	expected := calc.StructB{
		RequiredString: "It's Britney b**ch!",
	}
	delegate := NewIndirectlyImplementsStructReturningDelegate(expected)
	consumer := calc.NewConsumePureInterface(delegate)
	assert.Equal(expected, consumer.WorkItBaby())
}

func NewIndirectlyImplementsStructReturningDelegate(expected calc.StructB) calc.IStructReturningDelegate {
	return &IndirectlyImplementsStructReturningDelegate{ImplementsStructReturningDelegate: ImplementsStructReturningDelegate{expected: expected}}
}

type IndirectlyImplementsStructReturningDelegate struct {
	ImplementsStructReturningDelegate
}

type ImplementsStructReturningDelegate struct {
	expected calc.StructB
}

func (i ImplementsStructReturningDelegate) ReturnStruct() calc.StructB {
	return i.expected
}

func (suite *ComplianceSuite) TestExceptions() {

	assert := suite.Assert()

	calc3 := calc.NewCalculator(calc.CalculatorProps{InitialValue: 20, MaximumValue: 30})
	calc3.Add(3)
	assert.Equal(float64(23), calc3.Value())

	// TODO: should assert the actual error here - not working for some reasons
	assert.Panics(func() {
		calc3.Add(10)
	})

	calc3.SetMaxValue(40)
	calc3.Add(10)
	assert.Equal(float64(33), calc3.Value())

}

func (suite *ComplianceSuite) TestSyncOverrides_CallsSuper() {

	assert := suite.Assert()

	obj := SyncOverrides{returnSuper: true, SyncVirtualMethods: calc.NewSyncVirtualMethods(), multiplier: 1}

	suite.FailTest("Overrides are not supported yet", "https://github.com/aws/jsii/issues/2048")
	assert.Equal(float64(10*5), obj.CallerIsProperty())

	obj.returnSuper = true // js code returns n * 2
	assert.Equal(float64(10*2), obj.CallerIsProperty())
}

type SyncOverrides struct {
	calc.SyncVirtualMethods
	returnSuper bool
	multiplier  float64
	callAsync   bool
}

func (s *SyncOverrides) VirtualMethod(n float64) float64 {
	if s.returnSuper {
		return s.SyncVirtualMethods.VirtualMethod(n)
	}
	if s.callAsync {
		obj := OverrideAsyncMethods{AsyncVirtualMethods: calc.NewAsyncVirtualMethods()}
		return obj.CallMe()
	}
	return 5 * n * s.multiplier
}

func (suite *ComplianceSuite) TestAsyncOverrides_OverrideCallsSuper() {

	assert := suite.Assert()

	obj := OverrideCallsSuper{AsyncVirtualMethods: calc.NewAsyncVirtualMethods()}

	suite.FailTest("Async methods are not implemented", "https://github.com/aws/jsii/issues/2670")
	assert.Equal(1441, obj.OverrideMe(12))
	assert.Equal(1209, obj.CallMe())
}

type OverrideCallsSuper struct {
	calc.AsyncVirtualMethods
}

func (o *OverrideCallsSuper) OverrideMe(mult float64) float64 {
	superRet := o.AsyncVirtualMethods.OverrideMe(mult)
	return superRet*10 + 1
}

func (suite *ComplianceSuite) TestSyncOverrides() {

	assert := suite.Assert()

	obj := SyncOverrides{returnSuper: false, SyncVirtualMethods: calc.NewSyncVirtualMethods(), multiplier: 1}

	suite.FailTest("Overrides not supported", "https://github.com/aws/jsii/issues/2048")
	assert.Equal(float64(10*5), obj.CallerIsMethod())

	// affect the result
	obj.multiplier = 5
	assert.Equal(float64(10*5*5), obj.CallerIsMethod())

	// verify callbacks are invoked from a property
	assert.Equal(float64(10*5*5), obj.CallerIsProperty())

	// and from an async method
	obj.multiplier = 3
	assert.Equal(float64(10*5*3), obj.CallerIsAsync())
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
		obj := SyncOverrides{SyncVirtualMethods: calc.NewSyncVirtualMethods()}
		obj.callAsync = true
		suite.FailTest("Overrides not supported", "https://github.com/aws/jsii/issues/2048")
		obj.CallerIsMethod()
	})
}

func (suite *ComplianceSuite) TestCollectionOfInterfaces_MapOfStructs() {
	assert := suite.Assert()
	m := calc.InterfaceCollections_MapOfStructs()
	assert.Equal("Hello, I'm String!", m["A"].RequiredString)
}

// required to make `go test` recognize the suite.
func TestComplianceSuite(t *testing.T) {
	suite.Run(t, new(ComplianceSuite))
}
