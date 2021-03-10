package tests

import (
	"fmt"
	calc "github.com/aws/jsii/jsii-calc/go/jsiicalc/v3"
	"github.com/aws/jsii/jsii-calc/go/jsiicalc/v3/composition"
	"github.com/aws/jsii/jsii-calc/go/jsiicalc/v3/submodule/child"
	"github.com/aws/jsii/jsii-calc/go/scopejsiicalcbase"
	calclib "github.com/aws/jsii/jsii-calc/go/scopejsiicalclib"
	"github.com/aws/jsii/jsii-calc/go/scopejsiicalclib/submodule"
	"github.com/stretchr/testify/suite"
	"math"
	"runtime"
	"testing"
	"time"
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
	suite.FailTest("nested types are not namespaced", "https://github.com/aws/jsii/pull/2650")
	scopejsiicalcbase.StaticConsumer_Consume(submodule.NestedStruct{
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
	suite.FailTest("Overrides not supported", "")

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
	suite.FailTest("Dates are represented as strings instead of date objects", "")
	//types := calc.NewAllTypes()
	//types.SetDateProperty(time.Unix(128, 0))
	//if types.DateProperty().Unix() != 128 {
	//	t.Fail()
	//}
	//
	//// weak type
	//types.setAnyProperty(Instant.ofEpochSecond(999));
	//assertEquals(Instant.ofEpochSecond(999), types.getAnyProperty());
	//
}

func (suite *ComplianceSuite) TestCallMethods() {
	assert := suite.Assert()

	calc := calc.NewCalculator(calc.CalculatorProps{})
	calc.Add(10)
	assert.Equal(float64(10), calc.Value())

	calc.Mul(2)
	assert.Equal(float64(20), calc.Value())

	calc.Pow(5)
	assert.Equal(float64(20 * 20 * 20 * 20 * 20), calc.Value())

	calc.Neg()
	assert.Equal(float64(-3200000), calc.Value())
}

func (suite *ComplianceSuite) TestNodeStandardLibrary() {
	assert := suite.Assert()

	obj := calc.NewNodeStandardLibrary()
	assert.Equal("Hello, resource! SYNC!", obj.FsReadFileSync())
	assert.NotEmpty(obj.OsPlatform())
	assert.Equal("6a2da20943931e9834fc12cfe5bb47bbd9ae43489a30726962b576f4e3993e50", obj.CryptoSha256())

	suite.FailTest("Async methods are not implemented", "")
	assert.Equal("Hello, resource!", obj.FsReadFile())
}

func (suite* ComplianceSuite) TestDynamicTypes() {
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
	types.SetAnyProperty(map[string]string{ "MapKey": "MapValue" })
	assert.Equal("MapValue", ((types.AnyProperty()).(map[string]interface{}))["MapKey"])

	// map of any
	types.SetAnyProperty(map[string]interface{}{ "Goo": 19289812 })
	assert.Equal(float64(19289812), ((types.AnyProperty()).(map[string]interface{}))["Goo"])

	// classes
	mult := calc.NewMultiply(calclib.NewNumber(10), calclib.NewNumber(20))
	types.SetAnyProperty(mult)
	assert.Equal(mult, types.AnyProperty())
	assert.Equal(float64(200), ((types.AnyProperty()).(calc.Multiply)).Value())

	// date
	types.SetAnyProperty(time.Unix(1234, 0))
	if types.AnyProperty() != time.Unix(1234, 0) {
		suite.FailTest("Dates not supported", "")
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
	assert.Equal( calclib.EnumFromScopedModule_VALUE2, obj.Foo())
}

func (suite *ComplianceSuite) TestCreateObjectAndCtorOverloads() {
	suite.NotApplicableTest("Golang does not have overloaded functions so the genearated class only has a single New function")
}

func (suite* ComplianceSuite) TestGetAndSetEnumValues() {
	assert := suite.Assert()

	calc := calc.NewCalculator(calc.CalculatorProps{})
	calc.Add(9)
	calc.Pow(3)
	assert.Equal(composition.CompositionStringStyle_NORMAL, calc.StringStyle())

	calc.SetStringStyle(composition.CompositionStringStyle_DECORATED)
	assert.Equal(composition.CompositionStringStyle_DECORATED, calc.StringStyle())
	assert.Equal("<<[[{{(((1 * (0 + 9)) * (0 + 9)) * (0 + 9))}}]]>>", calc.ToString())
}

func (suite* ComplianceSuite) TestListInClassCanBeReadCorrectly() {
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

func (suite* ComplianceSuite) TestTestFluentApiWithDerivedClasses() {
	assert := suite.Assert()

	obj := newDerivedFromAllTypes()
	obj.SetStringProperty("Hello")
	obj.SetNumberProperty(12)
	assert.Equal("Hello", obj.StringProperty())
	assert.Equal(float64(12), obj.NumberProperty())
}

func (suite* ComplianceSuite) TestCanLoadEnumValues() {
	assert := suite.Assert()
	assert.NotEmpty(calc.EnumDispenser_RandomStringLikeEnum())
	assert.NotEmpty(calc.EnumDispenser_RandomIntegerLikeEnum())
}

func (suite* ComplianceSuite) TestCollectionOfInterfaces_ListOfStructs() {
	assert := suite.Assert()

	list := calc.InterfaceCollections_ListOfStructs()
	assert.Equal("Hello, I'm String!", list[0].RequiredString)
}

type doNotOverridePrivates struct {
	calc.DoNotOverridePrivates
}

func newDoNotOverridePrivates() doNotOverridePrivates {
	return doNotOverridePrivates{
		calc.NewDoNotOverridePrivates(),
	}
}

func (x* doNotOverridePrivates) PrivateProperty() string {
	return "privateProperty-Override"
}

func (x* doNotOverridePrivates) SetPrivateProperty(value string) {
	panic("Boom")
}

func (suite* ComplianceSuite) TestDoNotOverridePrivates_property_getter_public() {
	assert := suite.Assert()

	obj := newDoNotOverridePrivates()
	assert.Equal("privateProperty", obj.PrivatePropertyValue())

	// verify the setter override is not invoked.
	obj.ChangePrivatePropertyValue("MyNewValue")
	assert.Equal("MyNewValue", obj.PrivatePropertyValue())
}

func (suite* ComplianceSuite) TestEqualsIsResistantToPropertyShadowingResultVariable() {
	assert := suite.Assert()
	first := calc.StructWithJavaReservedWords{ Default: "one" }
	second := calc.StructWithJavaReservedWords { Default: "one" }
	third := calc.StructWithJavaReservedWords { Default: "two" }
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

func (x* overridableProtectedMemberDerived) OverrideReadOnly() string {
	return "Cthulhu "
}

func (x* overridableProtectedMemberDerived) OverrideReadeWrite() string {
	return "Fhtagn!"
}

func (suite* ComplianceSuite) TestCanOverrideProtectedGetter() {
	suite.FailTest("overrides are not supported yet", "")

	assert := suite.Assert()
	overridden := newOverridableProtectedMemberDerived()
	assert.Equal("Cthulhu Fhtagn!", overridden.ValueFromProtected())
}

/*
   private static final class ImplementsAdditionalInterface extends AllTypes implements IStructReturningDelegate {
       private final StructB struct;

       public ImplementsAdditionalInterface(final StructB struct) {
           this.struct = struct;
       }

       public StructB returnStruct() {
           return this.struct;
       }
   }
*/

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

func (suite* ComplianceSuite) TestInterfacesCanBeUsedTransparently_WhenAddedToJsiiType() {
	suite.FailTest("Overrides not supported", "")
	assert := suite.Assert()


	expected := calc.StructB{RequiredString: "It's Britney b**ch!"}
	delegate := newImplementsAdditionalInterface(expected)
	consumer := calc.NewConsumePureInterface(delegate)
	assert.Equal(expected, consumer.WorkItBaby())
}

func (suite* ComplianceSuite) TestStructs_nonOptionalequals() {
	assert := suite.Assert()

	structA := calc.StableStruct{ReadonlyProperty: "one"}
	structB := calc.StableStruct{ReadonlyProperty: "one"}
	structC := calc.StableStruct{ReadonlyProperty: "two"}
	assert.Equal(structB, structA)
	assert.NotEqual(structC, structA)
}

func (suite* ComplianceSuite) TestTestInterfaceParameter() {
	assert := suite.Assert()


	obj := calc.NewJsObjectLiteralForInterface()
	friendly := obj.GiveMeFriendly()
	assert.Equal("I am literally friendly!", friendly.Hello())

	greetingAugmenter := calc.NewGreetingAugmenter()
	betterGreeting := greetingAugmenter.BetterGreeting(friendly)
	assert.Equal("I am literally friendly! Let me buy you a drink!", betterGreeting)
}

func (suite* ComplianceSuite) TestLiftedKwargWithSameNameAsPositionalArg() {
	assert := suite.Assert()

	// This is a replication of a test that mostly affects languages with keyword arguments (e.g: Python, Ruby, ...)
	bell := calc.NewBell()
	amb := calc.NewAmbiguousParameters(bell, calc.StructParameterType{Scope: "Driiiing!"})
	assert.Equal(bell, amb.Scope())

	expected := calc.StructParameterType{Scope: "Driiiing!"}
	assert.Equal(expected, amb.Props())
}

type addTen struct {
	calc.Add
}

func newAddTen(value float64) addTen {
	return addTen{
		calc.NewAdd(calclib.NewNumber(value), calclib.NewNumber(10)),
	}
}

type mulTen struct {
	calc.Multiply
}

func newMulTen(value float64) mulTen {
	return mulTen{
		calc.NewMultiply(calclib.NewNumber(value), calclib.NewNumber(10)),
	}
}

func (suite* ComplianceSuite) TestCreationOfNativeObjectsFromJavaScriptObjects() {
	assert := suite.Assert()
	suite.FailTest("failing", "")

	types := calc.NewAllTypes()

	jsObj := calclib.NewNumber(44)
	types.SetAnyProperty(jsObj)
	_, ok := (types.AnyProperty()).(calclib.Number)
	assert.True(ok)

	nativeObj := newAddTen(10)
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
	assert.Equal( "Hello!?", interact.WriteAndRead("Hello"))
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

// required to make `go test` recognize the suite.
func TestComplianceSuite(t *testing.T) {
	suite.Run(t, new(ComplianceSuite))
}
