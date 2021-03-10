package tests

import (
	"fmt"
	"math"
	"runtime"
	"testing"

	calc "github.com/aws/jsii/jsii-calc/go/jsiicalc/v3"
	child "github.com/aws/jsii/jsii-calc/go/jsiicalc/v3/submodule/child"
	calclib "github.com/aws/jsii/jsii-calc/go/scopejsiicalclib"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/suite"
)

func (suite *ComplianceSuite) TestMaps() {
	t := suite.T()

	allTypes := calc.NewAllTypes()
	actual := allTypes.MapProperty()
	if len(actual) != 0 {
		t.Errorf("Expected length of empty map to be 0. Got: %d", len(actual))
	}

	question := "The answer to the ultimate question of life, the universe, and everything"
	answer := calclib.NewNumber(42)
	allTypes.SetMapProperty(map[string]calclib.Number{
		question: answer,
	})
	actual = allTypes.MapProperty()
	if len(actual) != 1 {
		t.Errorf("Expected length of empty map to be 1. Got: %d", len(actual))
	}
	if actual[question].Value() != answer.Value() {
		t.Errorf("Expected to have the value %v in there, got: %v", answer, actual[question])
	}
}

func (suite *ComplianceSuite) TestStatics() {

	t := suite.T()

	assert.Equal(t, "hello ,Yoyo!", calc.Statics_StaticMethod("Yoyo"))
	assert.Equal(t, "default", calc.Statics_Instance().Value())

	newStatics := calc.NewStatics("new value")
	calc.Statics_SetInstance(newStatics)
	assert.Same(t, newStatics, calc.Statics_Instance())
	assert.Equal(t, "new value", calc.Statics_Instance().Value())

	// the float64 conversion is a bit annoying - can we do something about it?
	assert.Equal(t, float64(100), calc.Statics_NonConstStatic())

}

func (suite *ComplianceSuite) TestPrimitiveTypes() {
	t := suite.T()

	types := calc.NewAllTypes()

	// boolean
	types.SetBooleanProperty(true)
	assert.Equal(t, true, types.BooleanProperty())

	// string
	types.SetStringProperty("foo")
	assert.Equal(t, "foo", types.StringProperty())

	// number
	types.SetNumberProperty(1234)
	assert.Equal(t, float64(1234), types.NumberProperty())

	// // json
	types.SetJsonProperty(map[string]interface{}{"Foo": map[string]interface{}{"Bar": 123}})
	assert.Equal(t, float64(123), types.JsonProperty()["Foo"].(map[string]interface{})["Bar"])

	suite.FailTest("Dates are currently treated as strings and fail going through the wire", "https://github.com/aws/jsii/issues/2659")

	// whoops - should accept time.Time, not string.
	// date
	types.SetDateProperty("12345")
	assert.Equal(t, "12345", types.DateProperty())
}

func (suite *ComplianceSuite) TestArrayReturnedByMethodCanBeRead() {

	t := suite.T()

	arr := calc.ClassWithCollections_CreateAList()

	assert.Contains(t, arr, "one")
	assert.Contains(t, arr, "two")

}

func (suite *ComplianceSuite) TestUnionProperties() {

	t := suite.T()

	calc3 := calc.NewCalculator(calc.CalculatorProps{
		InitialValue: 0,
		MaximumValue: math.MaxFloat64,
	})
	calc3.SetUnionProperty(calc.NewMultiply(calclib.NewNumber(9), calclib.NewNumber(3)))

	_, ok := calc3.UnionProperty().(calc.Multiply)
	assert.True(t, ok)

	assert.Equal(t, float64(9*3), calc3.ReadUnionValue())
	calc3.SetUnionProperty(calc.NewPower(calclib.NewNumber(10), calclib.NewNumber(3)))

	_, ok = calc3.UnionProperty().(calc.Power)
	assert.True(t, ok)
}

func (suite *ComplianceSuite) TestUseEnumFromScopedModule() {

	t := suite.T()

	obj := calc.NewReferenceEnumFromScopedPackage()
	assert.Equal(t, calclib.EnumFromScopedModule_VALUE2, obj.Foo())
	obj.SetFoo(calclib.EnumFromScopedModule_VALUE1)
	assert.Equal(t, calclib.EnumFromScopedModule_VALUE1, obj.LoadFoo())
	obj.SaveFoo(calclib.EnumFromScopedModule_VALUE2)
	assert.Equal(t, calclib.EnumFromScopedModule_VALUE2, obj.Foo())
}

func (suite *ComplianceSuite) TestCreateObjectAndCtorOverloads() {
	suite.NotApplicableTest("Golang does not have overloaded functions so the genearated class only has a single New function")
}

func (suite *ComplianceSuite) TestStructs_ReturnedLiteralEqualsNativeBuilt() {

	t := suite.T()

	gms := calc.NewGiveMeStructs()
	returnedLiteral := gms.StructLiteral()
	nativeBuilt := calclib.StructWithOnlyOptionals{
		Optional1: "optional1FromStructLiteral",
		Optional3: false,
	}
	assert.Equal(t, nativeBuilt.Optional1, returnedLiteral.Optional1)
	assert.Equal(t, nativeBuilt.Optional2, returnedLiteral.Optional2)
	assert.Equal(t, nativeBuilt.Optional3, returnedLiteral.Optional3)
	assert.Equal(t, nativeBuilt, returnedLiteral)
	assert.Equal(t, returnedLiteral, nativeBuilt)
}

func (suite *ComplianceSuite) TestClassesCanSelfReferenceDuringClassInitialization() {
	outerClass := child.NewOuterClass()
	assert.NotNil(suite.T(), outerClass.InnerClass())
}

func (suite *ComplianceSuite) TestCanObtainStructReferenceWithOverloadedSetter() {
	assert.NotNil(suite.T(), calc.ConfusingToJackson_MakeStructInstance())
}

func (suite *ComplianceSuite) TestCallbacksCorrectlyDeserializeArguments() {
	renderer := TestCallbacksCorrectlyDeserializeArgumentsDataRenderer{
		DataRenderer: calc.NewDataRenderer(),
	}

	suite.FailTest("Callbacks are currently not supported", "https://github.com/aws/jsii/issues/2048")
	assert.Equal(suite.T(), "{\n  \"anumber\": 50,\n  \"astring\": \"50\",\n  \"firstOptional\": [],\n  \"custom\": \"value\"\n}",
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
	obj := calc.ObjectWithPropertyProvider_Provide()

	suite.FailTest("Setter are not generated for read-write properties", "https://github.com/aws/jsii/issues/2665")

	// obj.SetProperty("New Value")
	assert.True(suite.T(), obj.WasSet())
}

func (suite *ComplianceSuite) TestPropertyOverrides_Interfaces() {

	t := suite.T()

	interact := calc.NewUsesInterfaceWithProperties(&TestPropertyOverridesInterfacesIInterfaceWithProperties{})
	assert.Equal(t, "READ_ONLY_STRING", interact.JustRead())

	suite.FailTest("Not sure. Most likely related to the missing setters on interfaces", "https://github.com/aws/jsii/issues/2665")
	assert.Equal(t, "Hello!?", interact.WriteAndRead("Hello"))
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
	assert.Equal(suite.T(), fmt.Sprintf("%s/%s/%s", runtime.Version(), runtime.GOOS, runtime.GOARCH), calc.JsiiAgent_Value())
}

func (suite *ComplianceSuite) TestDoNotOverridePrivates_Method_Private() {
	obj := &TestDoNotOverridePrivatesMethodPrivateDoNotOverridePrivates{
		DoNotOverridePrivates: calc.NewDoNotOverridePrivates(),
	}

	assert.Equal(suite.T(), "privateMethod", obj.PrivateMethodValue())
}

type TestDoNotOverridePrivatesMethodPrivateDoNotOverridePrivates struct {
	calc.DoNotOverridePrivates
}

func (d *TestDoNotOverridePrivatesMethodPrivateDoNotOverridePrivates) privateMethod() string {
	return "privateMethod-Override"
}

func (suite *ComplianceSuite) TestPureInterfacesCanBeUsedTransparently() {
	expected := calc.StructB{
		RequiredString: "It's Britney b**ch!",
	}

	delegate := &TestPureInterfacesCanBeUsedTransparentlyIStructReturningDelegate{
		expected: expected,
	}
	consumer := calc.NewConsumePureInterface(delegate)
	assert.Equal(suite.T(), expected, consumer.WorkItBaby())
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
