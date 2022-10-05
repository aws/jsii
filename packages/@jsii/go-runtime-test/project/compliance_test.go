package tests

import (
	"encoding/json"
	"fmt"
	"math"
	"runtime"
	"testing"
	"time"

	"github.com/aws/jsii-runtime-go"
	"github.com/aws/jsii/go-runtime-test/internal/addTen"
	"github.com/aws/jsii/go-runtime-test/internal/bellRinger"
	"github.com/aws/jsii/go-runtime-test/internal/cdk16625"
	"github.com/aws/jsii/go-runtime-test/internal/doNotOverridePrivates"
	"github.com/aws/jsii/go-runtime-test/internal/friendlyRandom"
	"github.com/aws/jsii/go-runtime-test/internal/overrideAsyncMethods"
	"github.com/aws/jsii/go-runtime-test/internal/syncOverrides"
	"github.com/aws/jsii/go-runtime-test/internal/twoOverrides"
	"github.com/aws/jsii/go-runtime-test/internal/wallClock"
	"github.com/aws/jsii/jsii-calc/go/jcb"
	calc "github.com/aws/jsii/jsii-calc/go/jsiicalc/v3"
	"github.com/aws/jsii/jsii-calc/go/jsiicalc/v3/composition"
	"github.com/aws/jsii/jsii-calc/go/jsiicalc/v3/submodule/child"
	calclib "github.com/aws/jsii/jsii-calc/go/scopejsiicalclib"
	"github.com/aws/jsii/jsii-calc/go/scopejsiicalclib/customsubmodulename"
	"github.com/aws/jsii/jsii-calc/go/scopejsiicalclib/deprecationremoval"
	"github.com/stretchr/testify/require"
	"github.com/stretchr/testify/suite"
)

func (suite *ComplianceSuite) TestStatics() {
	require := suite.Require()

	require.Equal("hello ,Yoyo!", *calc.Statics_StaticMethod(jsii.String("Yoyo")))
	require.Equal("default", *calc.Statics_Instance().Value())

	newStatics := calc.NewStatics(jsii.String("new value"))
	calc.Statics_SetInstance(newStatics)
	require.Same(newStatics, calc.Statics_Instance())
	require.Equal("new value", *calc.Statics_Instance().Value())

	// the float64 conversion is a bit annoying - can we do something about it?
	require.Equal(float64(100), *calc.Statics_NonConstStatic())

}

func (suite *ComplianceSuite) TestPrimitiveTypes() {
	require := suite.Require()

	types := calc.NewAllTypes()

	// boolean
	types.SetBooleanProperty(jsii.Bool(true))
	require.Equal(true, *types.BooleanProperty())

	// string
	types.SetStringProperty(jsii.String("foo"))
	require.Equal("foo", *types.StringProperty())

	// number
	types.SetNumberProperty(jsii.Number(1234))
	require.Equal(float64(1234), *types.NumberProperty())

	// json
	mapProp := map[string]interface{}{"Foo": map[string]interface{}{"Bar": 123}}
	types.SetJsonProperty(&mapProp)
	require.Equal(float64(123), (*types.JsonProperty())["Foo"].(map[string]interface{})["Bar"])

	types.SetDateProperty(jsii.Time(time.Unix(0, 123000000)))
	require.WithinDuration(time.Unix(0, 123000000), *types.DateProperty(), 0)
}

func (suite *ComplianceSuite) TestUseNestedStruct() {
	jcb.StaticConsumer_Consume(customsubmodulename.NestingClass_NestedStruct{
		Name: jsii.String("Bond, James Bond"),
	})
}

func (suite *ComplianceSuite) TestStaticMapInClassCanBeReadCorrectly() {
	require := suite.Require()

	result := *calc.ClassWithCollections_StaticMap()
	require.Equal("value1", *result["key1"])
	require.Equal("value2", *result["key2"])
	require.Equal(2, len(result))
}

func (suite *ComplianceSuite) TestTestNativeObjectsWithInterfaces() {
	require := suite.Require()

	// create a pure and native object, not part of the jsii hierarchy, only implements a jsii interface
	pureNative := newPureNativeFriendlyRandom()
	generatorBoundToPureNative := calc.NewNumberGenerator(pureNative)
	require.Equal(pureNative, generatorBoundToPureNative.Generator())
	require.Equal(float64(100000), *generatorBoundToPureNative.NextTimes100())
	require.Equal(float64(200000), *generatorBoundToPureNative.NextTimes100())

	subclassNative := NewSubclassNativeFriendlyRandom()
	generatorBoundToPSubclassedObject := calc.NewNumberGenerator(subclassNative)
	require.Equal(subclassNative, generatorBoundToPSubclassedObject.Generator())

	generatorBoundToPSubclassedObject.IsSameGenerator(subclassNative)
	require.Equal(float64(10000), *generatorBoundToPSubclassedObject.NextTimes100())
	require.Equal(float64(20000), *generatorBoundToPSubclassedObject.NextTimes100())
}

func (suite *ComplianceSuite) TestMaps() {
	require := suite.Require()

	// TODO: props should be optional
	calc2 := calc.NewCalculator(&calc.CalculatorProps{})
	calc2.Add(jsii.Number(10))
	calc2.Add(jsii.Number(20))
	calc2.Mul(jsii.Number(2))

	result := *calc2.OperationsMap()
	require.Equal(2, len(*result["add"]))
	require.Equal(1, len(*result["mul"]))
	resultAdd := *result["add"]
	require.Equal(float64(30), *resultAdd[1].Value())
}

func (suite *ComplianceSuite) TestDates() {
	require := suite.Require()

	types := calc.NewAllTypes()
	types.SetDateProperty(jsii.Time(time.Unix(128, 0)))
	require.WithinDuration(time.Unix(128, 0), *types.DateProperty(), 0)

	// weak type
	types.SetAnyProperty(time.Unix(999, 0))
	require.WithinDuration(time.Unix(999, 0), types.AnyProperty().(time.Time), 0)
}

func (suite *ComplianceSuite) TestCallMethods() {
	require := suite.Require()

	calc := calc.NewCalculator(&calc.CalculatorProps{})
	calc.Add(jsii.Number(10))
	require.Equal(float64(10), *calc.Value())

	calc.Mul(jsii.Number(2))
	require.Equal(float64(20), *calc.Value())

	calc.Pow(jsii.Number(5))
	require.Equal(float64(20*20*20*20*20), *calc.Value())

	calc.Neg()
	require.Equal(float64(-3200000), *calc.Value())
}

func (suite *ComplianceSuite) TestNodeStandardLibrary() {
	require := suite.Require()

	obj := calc.NewNodeStandardLibrary()
	require.Equal("Hello, resource! SYNC!", *obj.FsReadFileSync())
	require.NotEmpty(obj.OsPlatform())
	require.Equal("6a2da20943931e9834fc12cfe5bb47bbd9ae43489a30726962b576f4e3993e50", *obj.CryptoSha256())

	suite.FailTest("Async methods are not implemented", "https://github.com/aws/jsii/issues/2670")
	require.Equal("Hello, resource!", obj.FsReadFile())
}

func (suite *ComplianceSuite) TestDynamicTypes() {
	require := suite.Require()
	types := calc.NewAllTypes()

	types.SetAnyProperty(false)
	require.Equal(false, types.AnyProperty())

	// string
	types.SetAnyProperty("String")
	require.Equal("String", types.AnyProperty())

	// number
	types.SetAnyProperty(12.5)
	require.Equal(12.5, types.AnyProperty())

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
	require.Equal(float64(123), v6)

	// array
	types.SetAnyProperty([]string{"Hello", "World"})
	a := types.AnyProperty().([]interface{})
	require.Equal("Hello", a[0].(string))
	require.Equal("World", a[1].(string))

	// array of any
	types.SetAnyProperty([]interface{}{"Hybrid", calclib.NewNumber(jsii.Number(12)), 123, false})
	require.Equal(float64(123), (types.AnyProperty()).([]interface{})[2])

	// map
	types.SetAnyProperty(map[string]string{"MapKey": "MapValue"})
	require.Equal("MapValue", ((types.AnyProperty()).(map[string]interface{}))["MapKey"])

	// map of any
	types.SetAnyProperty(map[string]interface{}{"Goo": 19289812})
	require.Equal(float64(19289812), ((types.AnyProperty()).(map[string]interface{}))["Goo"])

	// classes
	mult := calc.NewMultiply(calclib.NewNumber(jsii.Number(10)), calclib.NewNumber(jsii.Number(20)))
	types.SetAnyProperty(mult)
	require.Equal(mult, types.AnyProperty())
	require.Equal(float64(200), *((types.AnyProperty()).(calc.Multiply)).Value())

	// date
	types.SetAnyProperty(time.Unix(1234, 0))
	require.WithinDuration(time.Unix(1234, 0), types.AnyProperty().(time.Time), 0)
}

func (suite *ComplianceSuite) TestArrayReturnedByMethodCanBeRead() {
	require := suite.Require()

	arr := *calc.ClassWithCollections_CreateAList()

	require.Contains(arr, jsii.String("one"))
	require.Contains(arr, jsii.String("two"))
}

func (suite *ComplianceSuite) TestUnionProperties() {
	require := suite.Require()

	calc3 := calc.NewCalculator(&calc.CalculatorProps{
		InitialValue: jsii.Number(0),
		MaximumValue: jsii.Number(math.MaxFloat64),
	})
	calc3.SetUnionProperty(calc.NewMultiply(calclib.NewNumber(jsii.Number(9)), calclib.NewNumber(jsii.Number(3))))

	_, ok := calc3.UnionProperty().(calc.Multiply)
	require.True(ok)

	require.Equal(float64(9*3), *calc3.ReadUnionValue())
	calc3.SetUnionProperty(calc.NewPower(calclib.NewNumber(jsii.Number(10)), calclib.NewNumber(jsii.Number(3))))

	_, ok = calc3.UnionProperty().(calc.Power)
	require.True(ok)
}

func (suite *ComplianceSuite) TestUseEnumFromScopedModule() {
	require := suite.Require()

	obj := calc.NewReferenceEnumFromScopedPackage()
	require.Equal(calclib.EnumFromScopedModule_VALUE2, obj.Foo())
	obj.SetFoo(calclib.EnumFromScopedModule_VALUE1)
	require.Equal(calclib.EnumFromScopedModule_VALUE1, obj.LoadFoo())
	obj.SaveFoo(calclib.EnumFromScopedModule_VALUE2)
	require.Equal(calclib.EnumFromScopedModule_VALUE2, obj.Foo())
}

func (suite *ComplianceSuite) TestCreateObjectAndCtorOverloads() {
	suite.NotApplicableTest("Golang does not have overloaded functions so the genearated class only has a single New function")
}

func (suite *ComplianceSuite) TestGetAndSetEnumValues() {
	require := suite.Require()

	calc := calc.NewCalculator(&calc.CalculatorProps{})
	calc.Add(jsii.Number(9))
	calc.Pow(jsii.Number(3))
	require.Equal(composition.CompositeOperation_CompositionStringStyle_NORMAL, calc.StringStyle())

	calc.SetStringStyle(composition.CompositeOperation_CompositionStringStyle_DECORATED)
	require.Equal(composition.CompositeOperation_CompositionStringStyle_DECORATED, calc.StringStyle())
	require.Equal("<<[[{{(((1 * (0 + 9)) * (0 + 9)) * (0 + 9))}}]]>>", *calc.ToString())
}

func (suite *ComplianceSuite) TestListInClassCanBeReadCorrectly() {
	require := suite.Require()

	classWithCollections := calc.NewClassWithCollections(&map[string]*string{}, &[]*string{jsii.String("one"), jsii.String("two")})
	val := *classWithCollections.Array()
	require.Equal("one", *val[0])
	require.Equal("two", *val[1])
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
	require := suite.Require()

	obj := newDerivedFromAllTypes()
	obj.SetStringProperty(jsii.String("Hello"))
	obj.SetNumberProperty(jsii.Number(12))
	require.Equal("Hello", *obj.StringProperty())
	require.Equal(float64(12), *obj.NumberProperty())
}

func (suite *ComplianceSuite) TestCanLoadEnumValues() {
	require := suite.Require()
	require.NotEmpty(calc.EnumDispenser_RandomStringLikeEnum())
	require.NotEmpty(calc.EnumDispenser_RandomIntegerLikeEnum())
}

func (suite *ComplianceSuite) TestCollectionOfInterfaces_ListOfStructs() {
	require := suite.Require()

	list := *calc.InterfaceCollections_ListOfStructs()
	require.Equal("Hello, I'm String!", *list[0].RequiredString)
}

func (suite *ComplianceSuite) TestDoNotOverridePrivates_property_getter_public() {
	require := suite.Require()

	obj := doNotOverridePrivates.New()
	require.Equal("privateProperty", *obj.PrivatePropertyValue())

	// verify the setter override is not invoked.
	obj.ChangePrivatePropertyValue(jsii.String("MyNewValue"))
	require.Equal("MyNewValue", *obj.PrivatePropertyValue())
}

func (suite *ComplianceSuite) TestEqualsIsResistantToPropertyShadowingResultVariable() {
	require := suite.Require()
	first := calc.StructWithJavaReservedWords{Default: jsii.String("one")}
	second := calc.StructWithJavaReservedWords{Default: jsii.String("one")}
	third := calc.StructWithJavaReservedWords{Default: jsii.String("two")}
	require.Equal(first, second)
	require.NotEqual(first, third)
}

type overridableProtectedMemberDerived struct {
	calc.OverridableProtectedMember
}

func newOverridableProtectedMemberDerived() *overridableProtectedMemberDerived {
	o := overridableProtectedMemberDerived{}
	calc.NewOverridableProtectedMember_Override(&o)
	return &o
}

func (x *overridableProtectedMemberDerived) OverrideReadOnly() *string {
	return jsii.String("Cthulhu ")
}

func (x *overridableProtectedMemberDerived) OverrideReadWrite() *string {
	return jsii.String("Fhtagn!")
}

func (suite *ComplianceSuite) TestCanOverrideProtectedGetter() {
	require := suite.Require()
	overridden := newOverridableProtectedMemberDerived()
	require.Equal("Cthulhu Fhtagn!", *overridden.ValueFromProtected())
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

func (x *implementsAdditionalInterface) ReturnStruct() *calc.StructB {
	return &x._struct
}

func (suite *ComplianceSuite) TestInterfacesCanBeUsedTransparently_WhenAddedToJsiiType() {
	require := suite.Require()

	expected := calc.StructB{RequiredString: jsii.String("It's Britney b**ch!")}
	delegate := newImplementsAdditionalInterface(expected)
	consumer := calc.NewConsumePureInterface(delegate)
	require.Equal(expected, *consumer.WorkItBaby())
}

func (suite *ComplianceSuite) TestStructs_nonOptionalequals() {
	require := suite.Require()

	structA := calc.StableStruct{ReadonlyProperty: jsii.String("one")}
	structB := calc.StableStruct{ReadonlyProperty: jsii.String("one")}
	structC := calc.StableStruct{ReadonlyProperty: jsii.String("two")}
	require.Equal(structB, structA)
	require.NotEqual(structC, structA)
}

func (suite *ComplianceSuite) TestTestInterfaceParameter() {
	require := suite.Require()

	obj := calc.NewJSObjectLiteralForInterface()
	friendly := obj.GiveMeFriendly()
	require.Equal("I am literally friendly!", *friendly.Hello())

	greetingAugmenter := calc.NewGreetingAugmenter()
	betterGreeting := greetingAugmenter.BetterGreeting(friendly)
	require.Equal("I am literally friendly! Let me buy you a drink!", *betterGreeting)
}

func (suite *ComplianceSuite) TestLiftedKwargWithSameNameAsPositionalArg() {
	require := suite.Require()

	// This is a replication of a test that mostly affects languages with keyword arguments (e.g: Python, Ruby, ...)
	bell := calc.NewBell()
	amb := calc.NewAmbiguousParameters(bell, &calc.StructParameterType{Scope: jsii.String("Driiiing!")})
	require.Equal(bell, amb.Scope())

	expected := calc.StructParameterType{Scope: jsii.String("Driiiing!")}
	require.Equal(expected, *amb.Props())
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
	require := suite.Require()

	types := calc.NewAllTypes()

	jsObj := calclib.NewNumber(jsii.Number(44))
	types.SetAnyProperty(jsObj)
	_, ok := (types.AnyProperty()).(calclib.Number)
	require.True(ok)

	suite.FailTest("??", "??")

	nativeObj := addTen.New(jsii.Number(10))
	types.SetAnyProperty(nativeObj)
	result1 := types.AnyProperty()
	require.Equal(nativeObj, result1)

	nativeObj2 := newMulTen(jsii.Number(20))
	types.SetAnyProperty(nativeObj2)
	unmarshalledNativeObj, ok := (types.AnyProperty()).(mulTen)
	require.True(ok)
	require.Equal(nativeObj2, unmarshalledNativeObj)
}

func (suite *ComplianceSuite) TestStructs_ReturnedLiteralEqualsNativeBuilt() {
	require := suite.Require()

	gms := calc.NewGiveMeStructs()
	returnedLiteral := gms.StructLiteral()
	nativeBuilt := calclib.StructWithOnlyOptionals{
		Optional1: jsii.String("optional1FromStructLiteral"),
		Optional3: jsii.Bool(false),
	}

	require.Equal(*nativeBuilt.Optional1, *returnedLiteral.Optional1)
	require.Equal(nativeBuilt.Optional2, returnedLiteral.Optional2)
	require.Equal(*nativeBuilt.Optional3, *returnedLiteral.Optional3)
	require.EqualValues(nativeBuilt, *returnedLiteral)
	require.EqualValues(*returnedLiteral, nativeBuilt)
}

func (suite *ComplianceSuite) TestClassesCanSelfReferenceDuringClassInitialization() {
	require := suite.Require()

	outerClass := child.NewOuterClass()
	require.NotNil(outerClass.InnerClass())
}

func (suite *ComplianceSuite) TestCanObtainStructReferenceWithOverloadedSetter() {
	require := suite.Require()
	require.NotNil(calc.ConfusingToJackson_MakeStructInstance())
}

func (suite *ComplianceSuite) TestCallbacksCorrectlyDeserializeArguments() {
	require := suite.Require()
	renderer := NewTestCallbacksCorrectlyDeserializeArgumentsDataRenderer()

	require.Equal("{\n  \"anumber\": 50,\n  \"astring\": \"50\",\n  \"custom\": \"value\"\n}",
		*renderer.Render(&calclib.MyFirstStruct{Anumber: jsii.Number(50), Astring: jsii.String("50")}))
}

type testCallbacksCorrectlyDeserializeArgumentsDataRenderer struct {
	calc.DataRenderer
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
	require := suite.Require()
	obj := calc.ObjectWithPropertyProvider_Provide()

	obj.SetProperty(jsii.String("New Value"))
	require.True(*obj.WasSet())
}

func (suite *ComplianceSuite) TestPropertyOverrides_Interfaces() {
	require := suite.Require()

	interfaceWithProps := TestPropertyOverridesInterfacesIInterfaceWithProperties{}
	interact := calc.NewUsesInterfaceWithProperties(&interfaceWithProps)
	require.Equal("READ_ONLY_STRING", *interact.JustRead())

	require.Equal("Hello!?", *interact.WriteAndRead(jsii.String("Hello")))
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

func (i *TestPropertyOverridesInterfacesIInterfaceWithProperties) SetReadWriteString(value *string) {
	newVal := *value + "!"
	i.x = &newVal
}

func (suite *ComplianceSuite) TestTestJsiiAgent() {
	require := suite.Require()
	require.Equal(fmt.Sprintf("%s/%s/%s", runtime.Version(), runtime.GOOS, runtime.GOARCH), *calc.JsiiAgent_Value())
}

func (suite *ComplianceSuite) TestDoNotOverridePrivates_Method_Private() {
	require := suite.Require()
	obj := &TestDoNotOverridePrivatesMethodPrivateDoNotOverridePrivates{
		DoNotOverridePrivates: calc.NewDoNotOverridePrivates(),
	}

	require.Equal("privateMethod", *obj.PrivateMethodValue())
}

type TestDoNotOverridePrivatesMethodPrivateDoNotOverridePrivates struct {
	calc.DoNotOverridePrivates
}

func (d *TestDoNotOverridePrivatesMethodPrivateDoNotOverridePrivates) privateMethod() string {
	return "privateMethod-Override"
}

func (suite *ComplianceSuite) TestPureInterfacesCanBeUsedTransparently() {
	require := suite.Require()
	expected := &calc.StructB{
		RequiredString: jsii.String("It's Britney b**ch!"),
	}

	delegate := &TestPureInterfacesCanBeUsedTransparentlyIStructReturningDelegate{
		expected: expected,
	}
	consumer := calc.NewConsumePureInterface(delegate)
	require.EqualValues(expected, consumer.WorkItBaby())
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
	calc.OverridableProtectedMember
}

func newMyOverridableProtectedMember() *myOverridableProtectedMember {
	m := myOverridableProtectedMember{}
	calc.NewOverridableProtectedMember_Override(&m)
	return &m
}

func (x *myOverridableProtectedMember) OverrideMe() *string {
	return jsii.String("Cthulhu Fhtagn!")
}

func (suite *ComplianceSuite) TestCanOverrideProtectedMethod() {
	require := suite.Require()
	challenge := "Cthulhu Fhtagn!"

	overridden := newMyOverridableProtectedMember()

	require.Equal(challenge, *overridden.ValueFromProtected())
}

func (suite *ComplianceSuite) TestEraseUnsetDataValues() {
	require := suite.Require()
	opts := calc.EraseUndefinedHashValuesOptions{Option1: jsii.String("option1")}
	require.True(*calc.EraseUndefinedHashValues_DoesKeyExist(&opts, jsii.String("option1")))

	require.Equal(map[string]interface{}{"prop2": "value2"}, *calc.EraseUndefinedHashValues_Prop1IsNull())
	require.Equal(map[string]interface{}{"prop1": "value1"}, *calc.EraseUndefinedHashValues_Prop2IsUndefined())

	require.False(*calc.EraseUndefinedHashValues_DoesKeyExist(&opts, jsii.String("option2")))
}

func (suite *ComplianceSuite) TestStructs_containsNullChecks() {
	require := suite.Require()
	s := calclib.MyFirstStruct{} // <-- this struct has required fields
	obj := calc.NewGiveMeStructs()

	suite.FailTest("No validation of required fields in structs", "https://github.com/aws/jsii/issues/2672")

	// we expect a failure here when we pass the struct to js
	require.PanicsWithError("", func() { obj.ReadFirstNumber(&s) })
}

func (suite *ComplianceSuite) TestUnionPropertiesWithBuilder() {
	require := suite.Require()

	obj1 := calc.UnionProperties{Bar: 12, Foo: "Hello"}
	require.Equal(12, obj1.Bar)
	require.Equal("Hello", obj1.Foo)

	obj2 := calc.UnionProperties{Bar: "BarIsString"}
	require.Equal("BarIsString", obj2.Bar)
	require.Empty(obj2.Foo)

	allTypes := calc.NewAllTypes()
	obj3 := calc.UnionProperties{Bar: allTypes, Foo: 999}
	require.Same(allTypes, obj3.Bar)
	require.Equal(999, obj3.Foo)
}

func (suite *ComplianceSuite) TestTestNullIsAValidOptionalMap() {
	require := suite.Require()
	require.Nil(calc.DisappointingCollectionSource_MaybeMap())
}

func (suite *ComplianceSuite) TestMapReturnedByMethodCanBeRead() {
	require := suite.Require()
	result := *calc.ClassWithCollections_CreateAMap()
	require.Equal("value1", *result["key1"])
	require.Equal("value2", *result["key2"])
	require.Equal(2, len(result))
}

type myAbstractSuite struct {
	calc.AbstractSuite

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
	require := suite.Require()
	abstractSuite := NewMyAbstractSuite(nil)
	require.Equal("Wrapped<String<Oomf!>>", *abstractSuite.WorkItAll(jsii.String("Oomf!")))
}

func (suite *ComplianceSuite) TestCanOverrideProtectedSetter() {
	require := suite.Require()
	challenge := "Bazzzzzzzzzzzaar..."
	overridden := newTestCanOverrideProtectedSetterOverridableProtectedMember()
	overridden.SwitchModes()
	require.Equal(challenge, *overridden.ValueFromProtected())
}

type TestCanOverrideProtectedSetterOverridableProtectedMember struct {
	calc.OverridableProtectedMember
}

func (x *TestCanOverrideProtectedSetterOverridableProtectedMember) SetOverrideReadWrite(val *string) {
	x.OverridableProtectedMember.SetOverrideReadWrite(jsii.String(fmt.Sprintf("zzzzzzzzz%s", *val)))
}

func newTestCanOverrideProtectedSetterOverridableProtectedMember() *TestCanOverrideProtectedSetterOverridableProtectedMember {
	m := TestCanOverrideProtectedSetterOverridableProtectedMember{}
	calc.NewOverridableProtectedMember_Override(&m)
	return &m
}

func (suite *ComplianceSuite) TestObjRefsAreLabelledUsingWithTheMostCorrectType() {
	require := suite.Require()

	ifaceRef := calc.Constructors_MakeInterface()
	v := ifaceRef
	require.NotNil(v)

	// TODO: I am not sure this is possible in Go (probably N/A)
	suite.FailTest("N/A?", "")

	classRef, ok := calc.Constructors_MakeClass().(calc.InbetweenClass)
	require.True(ok)
	require.NotNil(classRef)
}

func (suite *ComplianceSuite) TestStructs_StepBuilders() {
	suite.NotApplicableTest("Go does not generate fluent builders")
}

func (suite *ComplianceSuite) TestStaticListInClassCannotBeModified() {
	suite.NotApplicableTest("Go arrays are immutable by design")
}

func (suite *ComplianceSuite) TestStructsAreUndecoratedOntheWayToKernel() {
	require := suite.Require()

	s := calc.StructB{RequiredString: jsii.String("Bazinga!"), OptionalBoolean: jsii.Bool(false)}
	j := calc.JsonFormatter_Stringify(s)

	var a map[string]interface{}
	if err := json.Unmarshal([]byte(*j), &a); err != nil {
		require.FailNowf(err.Error(), "unmarshal failed")
	}

	require.Equal(
		map[string]interface{}{
			"requiredString":  "Bazinga!",
			"optionalBoolean": false,
		},
		a,
	)
}

func (suite *ComplianceSuite) TestReturnAbstract() {
	require := suite.Require()

	obj := calc.NewAbstractClassReturner()
	obj2 := obj.GiveMeAbstract()

	require.Equal("Hello, John!!", *obj2.AbstractMethod(jsii.String("John")))
	require.Equal("propFromInterfaceValue", *obj2.PropFromInterface())
	require.Equal(float64(42), *obj2.NonAbstractMethod())

	iface := obj.GiveMeInterface()
	require.Equal("propFromInterfaceValue", *iface.PropFromInterface())
	require.Equal("hello-abstract-property", *obj.ReturnAbstractFromProperty().AbstractProperty())
}

func (suite *ComplianceSuite) TestCollectionOfInterfaces_MapOfInterfaces() {
	mymap := *calc.InterfaceCollections_MapOfInterfaces()
	for _, value := range mymap {
		value.Ring()
	}
}

func (suite *ComplianceSuite) TestStructs_multiplePropertiesEquals() {
	require := suite.Require()
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

	require.Equal(structA, structB)
	require.NotEqual(structA, structC)
}

func (suite *ComplianceSuite) TestAsyncOverrides_callAsyncMethod() {
	suite.FailTest("Async methods are not implemented", "https://github.com/aws/jsii/issues/2670")
	require := suite.Require()
	obj := calc.NewAsyncVirtualMethods()
	require.Equal(float64(128), *obj.CallMe())
	require.Equal(float64(528), *obj.OverrideMe(jsii.Number(44)))
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
	require := suite.Require()

	obj := myDoNotOverridePrivates{calc.NewDoNotOverridePrivates()}
	require.Equal("privateProperty", *obj.PrivatePropertyValue())

	// verify the setter override is not invoked.
	obj.ChangePrivatePropertyValue(jsii.String("MyNewValue"))
	require.Equal("MyNewValue", *obj.PrivatePropertyValue())
}

func (suite *ComplianceSuite) TestStructs_withDiamondInheritance_correctlyDedupeProperties() {
	require := suite.Require()
	s := calc.DiamondInheritanceTopLevelStruct{
		BaseLevelProperty:      jsii.String("base"),
		FirstMidLevelProperty:  jsii.String("mid1"),
		SecondMidLevelProperty: jsii.String("mid2"),
		TopLevelProperty:       jsii.String("top"),
	}

	require.Equal("base", *s.BaseLevelProperty)
	require.Equal("mid1", *s.FirstMidLevelProperty)
	require.Equal("mid2", *s.SecondMidLevelProperty)
	require.Equal("top", *s.TopLevelProperty)
}

type myDoNotOverridePrivates2 struct {
	calc.DoNotOverridePrivates
}

func (s *myDoNotOverridePrivates2) PrivateProperty() string {
	return "privateProperty-Override"
}

func (suite *ComplianceSuite) TestDoNotOverridePrivates_property_by_name_private() {
	require := suite.Require()
	obj := myDoNotOverridePrivates2{calc.NewDoNotOverridePrivates()}
	require.Equal("privateProperty", *obj.PrivatePropertyValue())
}

func (suite *ComplianceSuite) TestMapInClassCanBeReadCorrectly() {
	require := suite.Require()

	modifiableMap := map[string]*string{
		"key": jsii.String("value"),
	}

	classWithCollections := calc.NewClassWithCollections(&modifiableMap, &[]*string{})
	result := *classWithCollections.Map()
	require.Equal("value", *result["key"])
	require.Equal(1, len(result))
}

type myAsyncVirtualMethods struct {
	calc.AsyncVirtualMethods
}

func (s *myAsyncVirtualMethods) OverrideMe(mult float64) {
	panic("Thrown by native code")
}

func (suite *ComplianceSuite) TestAsyncOverrides_overrideThrows() {
	suite.FailTest("Async methods are not implemented", "https://github.com/aws/jsii/issues/2670")
	require := suite.Require()

	obj := myAsyncVirtualMethods{calc.NewAsyncVirtualMethods()}
	obj.CallMe()
	require.Panics(func() { obj.CallMe() })
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
	require.Equal(t, 333.0, *obj.Foo())
}

func (suite *ComplianceSuite) TestStructs_OptionalEquals() {
	suite.NotApplicableTest("Go does not have Equals(other)")
}

func (suite *ComplianceSuite) TestPropertyOverrides_Get_Calls_Super() {
	t := suite.T()

	so := &testPropertyOverridesGetCallsSuper{}
	calc.NewSyncVirtualMethods_Override(so)

	require.Equal(t, "super:initial value", *so.RetrieveValueOfTheProperty())
	require.Equal(t, "super:initial value", *so.TheProperty())
}

type testPropertyOverridesGetCallsSuper struct {
	calc.SyncVirtualMethods
}

func (t *testPropertyOverridesGetCallsSuper) TheProperty() *string {
	s := t.SyncVirtualMethods.TheProperty()
	return jsii.String(fmt.Sprintf("super:%s", *s))
}

func (suite *ComplianceSuite) TestUnmarshallIntoAbstractType() {
	t := suite.T()

	c := calc.NewCalculator(&calc.CalculatorProps{})
	c.Add(jsii.Number(120))
	v := c.Curr()

	require.Equal(t, 120.0, *v.Value())
}

func (suite *ComplianceSuite) TestFail_SyncOverrides_CallsDoubleAsync_PropertyGetter() {
	t := suite.T()

	obj := syncOverrides.New()
	obj.CallAsync = true

	defer func() {
		err := recover()
		require.NotNil(t, err, "expected a failure to occur")
	}()

	obj.CallerIsProperty()
}

func (suite *ComplianceSuite) TestFail_SyncOverrides_CallsDoubleAsync_PropertySetter() {
	t := suite.T()

	obj := syncOverrides.New()
	obj.CallAsync = true

	defer func() {
		err := recover()
		require.NotNil(t, err, "expected a failure to occur")
	}()

	obj.SetCallerIsProperty(jsii.Number(12))
}

func (suite *ComplianceSuite) TestPropertyOverrides_Get_Set() {
	t := suite.T()

	so := syncOverrides.New()
	require.Equal(t, "I am an override!", *so.RetrieveValueOfTheProperty())
	so.ModifyValueOfTheProperty(jsii.String("New Value"))
	require.Equal(t, "New Value", *so.AnotherTheProperty)
}

func (suite *ComplianceSuite) TestVariadicMethodCanBeInvoked() {
	t := suite.T()

	vm := calc.NewVariadicMethod(jsii.Number(1))
	result := vm.AsArray(jsii.Number(3), jsii.Number(4), jsii.Number(5), jsii.Number(6))
	require.Equal(t, []*float64{jsii.Number(1), jsii.Number(3), jsii.Number(4), jsii.Number(5), jsii.Number(6)}, *result)
}

func (suite *ComplianceSuite) TestCollectionTypes() {
	t := suite.T()

	at := calc.NewAllTypes()

	// array
	at.SetArrayProperty(&[]*string{jsii.String("Hello"), jsii.String("World")})
	require.Equal(t, "World", *(*at.ArrayProperty())[1])

	// map
	at.SetMapProperty(&map[string]calclib.Number{"Foo": calclib.NewNumber(jsii.Number(123))})
	require.Equal(t, 123.0, *(*at.MapProperty())["Foo"].Value())
}

func (suite *ComplianceSuite) TestAsyncOverrides_OverrideAsyncMethodByParentClass() {
	t := suite.T()

	obj := overrideAsyncMethods.NewOverrideAsyncMethodsByBaseClass()
	suite.FailTest("Async methods are not implemented", "https://github.com/aws/jsii/issues/2670")
	require.Equal(t, 4452.0, obj.CallMe())
}

func (suite *ComplianceSuite) TestTestStructsCanBeDowncastedToParentType() {
	t := suite.T()

	require.NotZero(t, calc.Demonstrate982_TakeThis())
	require.NotZero(t, calc.Demonstrate982_TakeThisToo())
}

func (suite *ComplianceSuite) TestPropertyOverrides_Get_Throws() {
	t := suite.T()

	so := &testPropertyOverridesGetThrows{}
	calc.NewSyncVirtualMethods_Override(so)

	defer func() {
		err := recover()
		require.NotNil(t, err, "expected an error!")
		if e, ok := err.(error); ok {
			err = e.Error()
		}
		require.Equal(t, "Oh no, this is bad", err)
	}()

	so.RetrieveValueOfTheProperty()
}

type testPropertyOverridesGetThrows struct {
	calc.SyncVirtualMethods
}

func (t *testPropertyOverridesGetThrows) TheProperty() *string {
	panic("Oh no, this is bad")
}

func (suite *ComplianceSuite) TestGetSetPrimitiveProperties() {
	t := suite.T()

	number := calclib.NewNumber(jsii.Number(20))
	require.Equal(t, 20.0, *number.Value())
	require.Equal(t, 40.0, *number.DoubleValue())
	require.Equal(t, -30.0, *calc.NewNegate(calc.NewAdd(calclib.NewNumber(jsii.Number(20)), calclib.NewNumber(jsii.Number(10)))).Value())
	require.Equal(t, 20.0, *calc.NewMultiply(calc.NewAdd(calclib.NewNumber(jsii.Number(5)), calclib.NewNumber(jsii.Number(5))), calclib.NewNumber(jsii.Number(2))).Value())
	require.Equal(t, 3.0*3*3*3, *calc.NewPower(calclib.NewNumber(jsii.Number(3)), calclib.NewNumber(jsii.Number(4))).Value())
	require.Equal(t, 999.0, *calc.NewPower(calclib.NewNumber(jsii.Number(999)), calclib.NewNumber(jsii.Number(1))).Value())
	require.Equal(t, 1.0, *calc.NewPower(calclib.NewNumber(jsii.Number(999)), calclib.NewNumber(jsii.Number(0))).Value())
}

func (suite *ComplianceSuite) TestGetAndSetNonPrimitiveProperties() {
	t := suite.T()

	c := calc.NewCalculator(&calc.CalculatorProps{})
	c.Add(jsii.Number(3200000))
	c.Neg()
	c.SetCurr(calc.NewMultiply(calclib.NewNumber(jsii.Number(2)), c.Curr()))
	require.Equal(t, -6400000.0, *c.Value())
}

func (suite *ComplianceSuite) TestReservedKeywordsAreSlugifiedInStructProperties() {
	t := suite.T()
	t.Skip("Go reserved words do not collide with identifiers used in API surface")
}

func (suite *ComplianceSuite) TestDoNotOverridePrivates_Method_Public() {
	t := suite.T()

	obj := doNotOverridePrivates.New()

	require.Equal(t, "privateMethod", *obj.PrivateMethodValue())
}

func (suite *ComplianceSuite) TestDoNotOverridePrivates_Property_By_Name_Public() {
	t := suite.T()

	obj := doNotOverridePrivates.New()

	require.Equal(t, "privateProperty", *obj.PrivatePropertyValue())
}

func (suite *ComplianceSuite) TestTestNullIsAValidOptionalList() {
	t := suite.T()

	require.Nil(t, calc.DisappointingCollectionSource_MaybeList())
}

func (suite *ComplianceSuite) TestMapInClassCannotBeModified() {
	suite.NotApplicableTest("Go maps are immutable by design")
}

func (suite *ComplianceSuite) TestAsyncOverrides_TwoOverrides() {
	t := suite.T()

	obj := twoOverrides.New()
	suite.FailTest("Async methods are not implemented", "https://github.com/aws/jsii/issues/2670")
	require.Equal(t, 684.0, obj.CallMe())
}

func (suite *ComplianceSuite) TestPropertyOverrides_Set_Calls_Super() {
	t := suite.T()

	so := &testPropertyOverridesSetCallsSuper{}
	calc.NewSyncVirtualMethods_Override(so)

	so.ModifyValueOfTheProperty(jsii.String("New Value"))
	require.Equal(t, "New Value:by override", *so.TheProperty())
}

type testPropertyOverridesSetCallsSuper struct {
	calc.SyncVirtualMethods
}

func (t *testPropertyOverridesSetCallsSuper) SetTheProperty(value *string) {
	t.SyncVirtualMethods.SetTheProperty(jsii.String(fmt.Sprintf("%s:by override", *value)))
}

func (suite *ComplianceSuite) TestIso8601DoesNotDeserializeToDate() {
	t := suite.T()

	nowAsISO := time.Now().Format(time.RFC3339)

	w := wallClock.NewWallClock(nowAsISO)
	entropy := wallClock.NewEntropy(w)

	require.Equal(t, nowAsISO, *entropy.Increase())
}

func (suite *ComplianceSuite) TestCollectionOfInterfaces_ListOfInterfaces() {
	t := suite.T()

	for _, obj := range *calc.InterfaceCollections_ListOfInterfaces() {
		require.Implements(t, (*calc.IBell)(nil), obj)
	}
}

func (suite *ComplianceSuite) TestUndefinedAndNull() {
	t := suite.T()

	c := calc.NewCalculator(&calc.CalculatorProps{})
	require.Nil(t, c.MaxValue())
	c.SetMaxValue(nil)
}

func (suite *ComplianceSuite) TestStructs_SerializeToJsii() {
	t := suite.T()

	firstStruct := calclib.MyFirstStruct{
		Astring:       jsii.String("FirstString"),
		Anumber:       jsii.Number(999),
		FirstOptional: &[]*string{jsii.String("First"), jsii.String("Optional")},
	}

	doubleTrouble := calc.NewDoubleTrouble()

	derivedStruct := calc.DerivedStruct{
		NonPrimitive:    doubleTrouble,
		Bool:            jsii.Bool(false),
		AnotherRequired: jsii.Time(time.Now()),
		Astring:         jsii.String("String"),
		Anumber:         jsii.Number(1234),
		FirstOptional:   &[]*string{jsii.String("one"), jsii.String("two")},
	}

	gms := calc.NewGiveMeStructs()
	require.Equal(t, 999.0, *gms.ReadFirstNumber(&firstStruct))
	require.Equal(t, 1234.0, *gms.ReadFirstNumber(&calclib.MyFirstStruct{
		Anumber:       derivedStruct.Anumber,
		Astring:       derivedStruct.Astring,
		FirstOptional: derivedStruct.FirstOptional,
	}))
	require.Equal(t, doubleTrouble, gms.ReadDerivedNonPrimitive(&derivedStruct))

	literal := *gms.StructLiteral()
	require.Equal(t, "optional1FromStructLiteral", *literal.Optional1)
	require.Equal(t, false, *literal.Optional3)
	require.Nil(t, literal.Optional2)
}

func (suite *ComplianceSuite) TestCanObtainReferenceWithOverloadedSetter() {
	t := suite.T()

	require.NotNil(t, calc.ConfusingToJackson_MakeInstance())
}

func (suite *ComplianceSuite) TestTestJsObjectLiteralToNative() {
	t := suite.T()

	obj := calc.NewJSObjectLiteralToNative()
	obj2 := obj.ReturnLiteral()

	require.Equal(t, "Hello", *obj2.PropA())
	require.Equal(t, 102.0, *obj2.PropB())
}

func (suite *ComplianceSuite) TestClassWithPrivateConstructorAndAutomaticProperties() {
	t := suite.T()

	obj := calc.ClassWithPrivateConstructorAndAutomaticProperties_Create(jsii.String("Hello"), jsii.String("Bye"))
	require.Equal(t, "Bye", *obj.ReadWriteString())
	obj.SetReadWriteString(jsii.String("Hello"))
	require.Equal(t, "Hello", *obj.ReadOnlyString())
}

func (suite *ComplianceSuite) TestArrayReturnedByMethodCannotBeModified() {
	suite.NotApplicableTest("Go arrays are immutable by design")
}

func (suite *ComplianceSuite) TestCorrectlyDeserializesStructUnions() {
	t := suite.T()

	a0 := &calc.StructA{
		RequiredString: jsii.String("Present!"),
		OptionalString: jsii.String("Bazinga!"),
	}
	a1 := &calc.StructA{
		RequiredString: jsii.String("Present!"),
		OptionalNumber: jsii.Number(1337),
	}
	b0 := &calc.StructB{
		RequiredString:  jsii.String("Present!"),
		OptionalBoolean: jsii.Bool(true),
	}
	b1 := &calc.StructB{
		RequiredString:  jsii.String("Present!"),
		OptionalStructA: a1,
	}

	require.True(t, *calc.StructUnionConsumer_IsStructA(a0))
	require.True(t, *calc.StructUnionConsumer_IsStructA(a1))
	require.False(t, *calc.StructUnionConsumer_IsStructA(b0))
	require.False(t, *calc.StructUnionConsumer_IsStructA(b1))

	require.False(t, *calc.StructUnionConsumer_IsStructB(a0))
	require.False(t, *calc.StructUnionConsumer_IsStructB(a1))
	require.True(t, *calc.StructUnionConsumer_IsStructB(b0))
	require.True(t, *calc.StructUnionConsumer_IsStructB(b1))
}

func (suite *ComplianceSuite) TestSubclassing() {
	t := suite.T()
	t.Log("This is, in fact, demonstrating wrapping another type (which is more go-ey than extending)")

	c := calc.NewCalculator(&calc.CalculatorProps{})
	c.SetCurr(addTen.New(jsii.Number(33)))
	c.Neg()
	require.Equal(t, -43.0, *c.Value())
}

func (suite *ComplianceSuite) TestTestInterfaces() {
	t := suite.T()

	var (
		friendly                calclib.IFriendly
		friendlier              calc.IFriendlier
		randomNumberGenerator   calc.IRandomNumberGenerator
		friendlyRandomGenerator calc.IFriendlyRandomGenerator
	)

	add := calc.NewAdd(calclib.NewNumber(jsii.Number(10)), calclib.NewNumber(jsii.Number(20)))
	friendly = add
	// friendlier = add // <-- shouldn't compile since Add implements IFriendly
	require.Equal(t, "Hello, I am a binary operation. What's your name?", *friendly.Hello())

	multiply := calc.NewMultiply(calclib.NewNumber(jsii.Number(10)), calclib.NewNumber(jsii.Number(30)))
	friendly = multiply
	friendlier = multiply
	randomNumberGenerator = multiply
	// friendlyRandomGenerator = multiply // <-- shouldn't compile
	require.Equal(t, "Hello, I am a binary operation. What's your name?", *friendly.Hello())
	require.Equal(t, "Goodbye from Multiply!", *friendlier.Goodbye())
	require.Equal(t, 89.0, *randomNumberGenerator.Next())

	friendlyRandomGenerator = calc.NewDoubleTrouble()
	require.Equal(t, "world", *friendlyRandomGenerator.Hello())
	require.Equal(t, 12.0, *friendlyRandomGenerator.Next())

	poly := calc.NewPolymorphism()
	require.Equal(t, "oh, Hello, I am a binary operation. What's your name?", *poly.SayHello(friendly))
	require.Equal(t, "oh, world", *poly.SayHello(friendlyRandomGenerator))
	require.Equal(t, "oh, I am a native!", *poly.SayHello(friendlyRandom.NewPure()))
	require.Equal(t, "oh, SubclassNativeFriendlyRandom", *poly.SayHello(friendlyRandom.NewSubclass()))
}

func (suite *ComplianceSuite) TestReservedKeywordsAreSlugifiedInClassProperties() {
	suite.NotApplicableTest("Golang doesnt have any reserved words that can be used in public API")
}

func (suite *ComplianceSuite) TestObjectIdDoesNotGetReallocatedWhenTheConstructorPassesThisOut() {
	reflector := NewPartiallyInitializedThisConsumerImpl(suite.Require())
	calc.NewConstructorPassesThisOut(reflector)
}

type partiallyInitializedThisConsumerImpl struct {
	calc.PartiallyInitializedThisConsumer
	require *require.Assertions
}

func NewPartiallyInitializedThisConsumerImpl(assert *require.Assertions) *partiallyInitializedThisConsumerImpl {
	p := partiallyInitializedThisConsumerImpl{require: assert}
	calc.NewPartiallyInitializedThisConsumer_Override(&p)
	return &p
}

func (p *partiallyInitializedThisConsumerImpl) ConsumePartiallyInitializedThis(obj calc.ConstructorPassesThisOut, dt *time.Time, ev calc.AllTypesEnum) *string {
	epoch := time.Date(1970, time.January, 1, 0, 0, 0, 0, time.UTC)

	p.require.NotNil(obj)
	p.require.Equal(epoch, *dt)
	p.require.Equal(calc.AllTypesEnum_THIS_IS_GREAT, ev)

	return jsii.String("OK")
}

func (suite *ComplianceSuite) TestInterfaceBuilder() {

	require := suite.Require()

	interact := calc.NewUsesInterfaceWithProperties(&TestInterfaceBuilderIInterfaceWithProperties{value: jsii.String("READ_WRITE")})
	require.Equal("READ_ONLY", *interact.JustRead())

	require.Equal("Hello", *interact.WriteAndRead(jsii.String("Hello")))
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

	require := suite.Require()

	types := calc.NewAllTypes()

	// single valued property
	types.SetUnionProperty(1234)
	require.Equal(float64(1234), types.UnionProperty())

	types.SetUnionProperty("Hello")
	require.Equal("Hello", types.UnionProperty())

	types.SetUnionProperty(calc.NewMultiply(calclib.NewNumber(jsii.Number(2)), calclib.NewNumber(jsii.Number(12))))
	multiply, ok := types.UnionProperty().(calc.Multiply)

	require.True(ok)
	require.Equal(float64(24), *multiply.Value())

	// map
	m := map[string]interface{}{"Foo": calclib.NewNumber(jsii.Number(99))}
	types.SetUnionMapProperty(&m)

	unionMapProp := *types.UnionMapProperty()
	number, ok := unionMapProp["Foo"].(calclib.Number)
	require.True(ok)
	require.Equal(float64(99), *number.Value())

	// array
	a := []interface{}{123, calclib.NewNumber(jsii.Number(33))}
	types.SetUnionArrayProperty(&a)

	unionArrayProp := *types.UnionArrayProperty()
	number, ok = unionArrayProp[1].(calclib.Number)
	require.True(ok)
	require.Equal(float64(33), *number.Value())
}

func (suite *ComplianceSuite) TestArrays() {
	require := suite.Require()
	sum := calc.NewSum()

	sum.SetParts(&[]calclib.NumericValue{calclib.NewNumber(jsii.Number(5)), calclib.NewNumber(jsii.Number(10)), calc.NewMultiply(calclib.NewNumber(jsii.Number(2)), calclib.NewNumber(jsii.Number(3)))})
	require.Equal(float64(10+5+(2*3)), *sum.Value())
	require.Equal(float64(5), *(*sum.Parts())[0].Value())
	require.Equal(float64(6), *(*sum.Parts())[2].Value())
	require.Equal("(((0 + 5) + 10) + (2 * 3))", *sum.ToString())
}

func (suite *ComplianceSuite) TestStaticMapInClassCannotBeModified() {
	suite.NotApplicableTest("Golang does not have unmodifiable maps")
}

func (suite *ComplianceSuite) TestConsts() {

	require := suite.Require()

	require.Equal("hello", *calc.Statics_Foo())
	obj := calc.Statics_ConstObj()
	require.Equal("world", *obj.Hello())

	require.Equal(float64(1234), *calc.Statics_BAR())
	require.Equal("world", *(*calc.Statics_ZooBar())["hello"])
}

func (suite *ComplianceSuite) TestReceiveInstanceOfPrivateClass() {
	require := suite.Require()
	require.True(*calc.NewReturnsPrivateImplementationOfInterface().PrivateImplementation().Success())
}

func (suite *ComplianceSuite) TestMapReturnedByMethodCannotBeModified() {
	suite.NotApplicableTest("Golang does not have unmodifiable maps")
}

func (suite *ComplianceSuite) TestStaticListInClassCanBeReadCorrectly() {
	require := suite.Require()

	arr := *calc.ClassWithCollections_StaticArray()
	require.Contains(arr, jsii.String("one"))
	require.Contains(arr, jsii.String("two"))
}

func (suite *ComplianceSuite) TestFluentApi() {
	suite.NotApplicableTest("Golang props are intentionally not designed to be fluent")
}

func (suite *ComplianceSuite) TestCanLeverageIndirectInterfacePolymorphism() {
	provider := calc.NewAnonymousImplementationProvider()
	require := suite.Require()
	require.Equal(float64(1337), *provider.ProvideAsClass().Value())

	require.Equal(float64(1337), *provider.ProvideAsInterface().Value())
	require.Equal("to implement", *provider.ProvideAsInterface().Verb())
}

func (suite *ComplianceSuite) TestPropertyOverrides_Set_Throws() {

	require := suite.Require()
	so := NewTestPropertyOverrides_Set_ThrowsSyncVirtualMethods()

	require.Panics(func() { so.ModifyValueOfTheProperty(jsii.String("Hii")) })
}

type testPropertyOverrides_Set_ThrowsSyncVirtualMethods struct {
	calc.SyncVirtualMethods
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

	require := suite.Require()
	obj := calc.NewJSObjectLiteralForInterface()
	friendly := obj.GiveMeFriendly()
	require.Equal("I am literally friendly!", *friendly.Hello())

	gen := obj.GiveMeFriendlyGenerator()
	require.Equal("giveMeFriendlyGenerator", *gen.Hello())
	require.Equal(float64(42), *gen.Next())
}

func (suite *ComplianceSuite) TestReservedKeywordsAreSlugifiedInMethodNames() {
	suite.NotApplicableTest("Golang doesnt have any reserved words that can be used in public API")
}

func (suite *ComplianceSuite) TestPureInterfacesCanBeUsedTransparently_WhenTransitivelyImplementing() {
	require := suite.Require()
	expected := calc.StructB{
		RequiredString: jsii.String("It's Britney b**ch!"),
	}
	delegate := NewIndirectlyImplementsStructReturningDelegate(&expected)
	consumer := calc.NewConsumePureInterface(delegate)
	require.EqualValues(expected, *consumer.WorkItBaby())
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
	// t := suite.T()
	require := suite.Require()

	calc3 := calc.NewCalculator(&calc.CalculatorProps{InitialValue: jsii.Number(20), MaximumValue: jsii.Number(30)})
	calc3.Add(jsii.Number(3))
	require.Equal(float64(23), *calc3.Value())

	// TODO: should assert the actual error here - not working for some reasons
	require.PanicsWithError("Error: Operation 33 exceeded maximum value 30", func() {
		calc3.Add(jsii.Number(10))
	})

	calc3.SetMaxValue(jsii.Number(40))
	calc3.Add(jsii.Number(10))
	require.Equal(float64(33), *calc3.Value())

}

func (suite *ComplianceSuite) TestSyncOverrides_CallsSuper() {

	require := suite.Require()

	obj := syncOverrides.New()
	obj.ReturnSuper = false
	obj.Multiplier = 1

	require.Equal(float64(10*5), *obj.CallerIsProperty())

	obj.ReturnSuper = true // js code returns n * 2
	require.Equal(float64(10*2), *obj.CallerIsProperty())
}

func (suite *ComplianceSuite) TestAsyncOverrides_OverrideCallsSuper() {

	require := suite.Require()

	obj := OverrideCallsSuper{AsyncVirtualMethods: calc.NewAsyncVirtualMethods()}

	suite.FailTest("Async methods are not implemented", "https://github.com/aws/jsii/issues/2670")
	require.Equal(1441, *obj.OverrideMe(jsii.Number(12)))
	require.Equal(1209, *obj.CallMe())
}

type OverrideCallsSuper struct {
	calc.AsyncVirtualMethods
}

func (o *OverrideCallsSuper) OverrideMe(mult *float64) *float64 {
	superRet := *o.AsyncVirtualMethods.OverrideMe(mult)
	return jsii.Number(superRet*10 + 1)
}

func (suite *ComplianceSuite) TestSyncOverrides() {

	require := suite.Require()

	obj := syncOverrides.New()
	obj.ReturnSuper = false
	obj.Multiplier = 1

	require.Equal(float64(10*5), *obj.CallerIsMethod())

	// affect the result
	obj.Multiplier = 5
	require.Equal(float64(10*5*5), *obj.CallerIsMethod())

	// verify callbacks are invoked from a property
	require.Equal(float64(10*5*5), *obj.CallerIsProperty())

}

func (suite *ComplianceSuite) TestAsyncOverrides_OverrideAsyncMethod() {

	require := suite.Require()

	obj := overrideAsyncMethods.New()

	suite.FailTest("Async methods are not implemented", "https://github.com/aws/jsii/issues/2670")
	require.Equal(float64(4452), obj.CallMe())
}

func (suite *ComplianceSuite) TestFail_SyncOverrides_CallsDoubleAsync_Method() {
	suite.Require().Panics(func() {
		obj := syncOverrides.New()
		obj.CallAsync = true
		obj.CallerIsMethod()
	})
}

func (suite *ComplianceSuite) TestCollectionOfInterfaces_MapOfStructs() {
	require := suite.Require()
	m := *calc.InterfaceCollections_MapOfStructs()
	require.Equal("Hello, I'm String!", *(*m["A"]).RequiredString)
}

func (suite *ComplianceSuite) TestCallbackParameterIsInterface() {
	require := suite.Require()

	ringer := bellRinger.New()

	require.True(*calc.ConsumerCanRingBell_StaticImplementedByObjectLiteral(ringer))
	require.True(*calc.ConsumerCanRingBell_StaticImplementedByPrivateClass(ringer))
	require.True(*calc.ConsumerCanRingBell_StaticImplementedByPublicClass(ringer))
}

func (suite *ComplianceSuite) TestClassCanBeUsedWhenNotExpressedlyLoaded() {
	cdk16625.New().Test()
}

func (suite *ComplianceSuite) TestDownCasting() {
	require := suite.Require()

	anyValue := calc.SomeTypeJsii976_ReturnAnonymous()
	var realValue calc.IReturnJsii976

	jsii.UnsafeCast(anyValue, &realValue)

	require.Equal(realValue.Foo(), jsii.Number(1337))
}

func (suite *ComplianceSuite) TestStrippedDeprecatedMemberCanBeReceived() {
	require := suite.Require()

	require.NotNil(deprecationremoval.InterfaceFactory_Create())
}

// required to make `go test` recognize the suite.
func TestComplianceSuite(t *testing.T) {
	suite.Run(t, new(ComplianceSuite))
}
