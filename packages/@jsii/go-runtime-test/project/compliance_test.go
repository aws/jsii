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
	"github.com/aws/jsii/jsii-calc/go/jsiicalc/v3/cdk22369"
	"github.com/aws/jsii/jsii-calc/go/jsiicalc/v3/composition"
	"github.com/aws/jsii/jsii-calc/go/jsiicalc/v3/submodule/child"
	calclib "github.com/aws/jsii/jsii-calc/go/scopejsiicalclib"
	"github.com/aws/jsii/jsii-calc/go/scopejsiicalclib/customsubmodulename"
	"github.com/aws/jsii/jsii-calc/go/scopejsiicalclib/deprecationremoval"
	"github.com/stretchr/testify/require"
	"github.com/stretchr/testify/suite"
)

func (suite *ComplianceSuite) TestStaticMembersCanBeUsed() {
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

func (suite *ComplianceSuite) TestStaticPropertyAssignmentUpdatesJavaScript() {
	require := suite.Require()

	require.Equal("default", *calc.StaticPropertyAssignment_ReadValue())
	defer calc.StaticPropertyAssignment_SetValue(jsii.String("default"))

	calc.StaticPropertyAssignment_SetValue(jsii.String("assigned"))

	require.Equal("assigned", *calc.StaticPropertyAssignment_ReadValue())
	require.Equal("assigned", *calc.StaticPropertyAssignment_Value())
}

func (suite *ComplianceSuite) TestPrimitivesRoundTrip() {
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

func (suite *ComplianceSuite) TestSubmoduleStructCanBePassed() {
	jcb.StaticConsumer_Consume(customsubmodulename.NestingClass_NestedStruct{
		Name: jsii.String("Bond, James Bond"),
	})
}

func (suite *ComplianceSuite) TestStaticMapPropertyCanBeRead() {
	require := suite.Require()

	result := *calc.ClassWithCollections_StaticMap()
	require.Equal("value1", *result["key1"])
	require.Equal("value2", *result["key2"])
	require.Equal(2, len(result))
}

func (suite *ComplianceSuite) TestHostObjectsKeepIdentityAcrossTheBoundary() {
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

func (suite *ComplianceSuite) TestMapsOfObjectsCanBeRead() {
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

func (suite *ComplianceSuite) TestDatesRoundTrip() {
	require := suite.Require()

	types := calc.NewAllTypes()
	types.SetDateProperty(jsii.Time(time.Unix(128, 0)))
	require.WithinDuration(time.Unix(128, 0), *types.DateProperty(), 0)

	// weak type
	types.SetAnyProperty(time.Unix(999, 0))
	require.WithinDuration(time.Unix(999, 0), types.AnyProperty().(time.Time), 0)
}

func (suite *ComplianceSuite) TestInstanceMethodsCanBeCalled() {
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

func (suite *ComplianceSuite) TestNodeStandardLibraryIsAvailable() {
	require := suite.Require()

	obj := calc.NewNodeStandardLibrary()
	require.Equal("Hello, resource! SYNC!", *obj.FsReadFileSync())
	require.NotEmpty(obj.OsPlatform())
	require.Equal("6a2da20943931e9834fc12cfe5bb47bbd9ae43489a30726962b576f4e3993e50", *obj.CryptoSha256())

	suite.FailTest("Async methods are not implemented", "https://github.com/aws/jsii/issues/2670")
	require.Equal("Hello, resource!", obj.FsReadFile())
}

func (suite *ComplianceSuite) TestAnyValuesKeepTheirType() {
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

func (suite *ComplianceSuite) TestReturnedArrayCanBeRead() {
	require := suite.Require()

	arr := *calc.ClassWithCollections_CreateAList()

	require.Contains(arr, jsii.String("one"))
	require.Contains(arr, jsii.String("two"))
}

func (suite *ComplianceSuite) TestUnionPropertyReturnsConcreteType() {
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

func (suite *ComplianceSuite) TestEnumsFromDependenciesCrossTheBoundary() {
	require := suite.Require()

	obj := calc.NewReferenceEnumFromScopedPackage()
	require.Equal(calclib.EnumFromScopedModule_VALUE2, obj.Foo())
	obj.SetFoo(calclib.EnumFromScopedModule_VALUE1)
	require.Equal(calclib.EnumFromScopedModule_VALUE1, obj.LoadFoo())
	obj.SaveFoo(calclib.EnumFromScopedModule_VALUE2)
	require.Equal(calclib.EnumFromScopedModule_VALUE2, obj.Foo())
}

func (suite *ComplianceSuite) TestOptionalConstructorParametersCanBeOmitted() {
	require := suite.Require()

	// Optional parameters are pointers in Go: passing nil omits the argument.
	withoutProps := calc.NewCalculator(nil)
	require.NotNil(withoutProps)
	require.Nil(withoutProps.MaxValue())

	withProps := calc.NewCalculator(&calc.CalculatorProps{MaximumValue: jsii.Number(10)})
	require.Equal(float64(10), *withProps.MaxValue())
}

func (suite *ComplianceSuite) TestEnumPropertiesCanBeReadAndWritten() {
	require := suite.Require()

	calc := calc.NewCalculator(&calc.CalculatorProps{})
	calc.Add(jsii.Number(9))
	calc.Pow(jsii.Number(3))
	require.Equal(composition.CompositeOperation_CompositionStringStyle_NORMAL, calc.StringStyle())

	calc.SetStringStyle(composition.CompositeOperation_CompositionStringStyle_DECORATED)
	require.Equal(composition.CompositeOperation_CompositionStringStyle_DECORATED, calc.StringStyle())
	require.Equal("<<[[{{(((1 * (0 + 9)) * (0 + 9)) * (0 + 9))}}]]>>", *calc.ToString())
}

func (suite *ComplianceSuite) TestArrayPropertyCanBeRead() {
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

func (suite *ComplianceSuite) TestInheritedPropertiesUsableOnHostSubclass() {
	require := suite.Require()

	obj := newDerivedFromAllTypes()
	obj.SetStringProperty(jsii.String("Hello"))
	obj.SetNumberProperty(jsii.Number(12))
	require.Equal("Hello", *obj.StringProperty())
	require.Equal(float64(12), *obj.NumberProperty())
}

func (suite *ComplianceSuite) TestEnumValuesReturnedByTheKernel() {
	require := suite.Require()
	require.NotEmpty(calc.EnumDispenser_RandomStringLikeEnum())
	require.NotEmpty(calc.EnumDispenser_RandomIntegerLikeEnum())
}

func (suite *ComplianceSuite) TestListOfStructsElementsHaveStructType() {
	require := suite.Require()

	list := *calc.InterfaceCollections_ListOfStructs()
	require.Equal("Hello, I'm String!", *list[0].RequiredString)
}

func (suite *ComplianceSuite) TestHostAccessorDoesNotOverridePrivateProperty() {
	require := suite.Require()

	obj := doNotOverridePrivates.New()
	require.Equal("privateProperty", *obj.PrivatePropertyValue())

	// verify the setter override is not invoked.
	obj.ChangePrivatePropertyValue(jsii.String("MyNewValue"))
	require.Equal("MyNewValue", *obj.PrivatePropertyValue())
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

func (suite *ComplianceSuite) TestProtectedGetterCanBeOverridden() {
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

func (suite *ComplianceSuite) TestHostSubclassCanImplementAdditionalInterface() {
	require := suite.Require()

	expected := calc.StructB{RequiredString: jsii.String("It's Britney b**ch!")}
	delegate := newImplementsAdditionalInterface(expected)
	consumer := calc.NewConsumePureInterface(delegate)
	require.Equal(expected, *consumer.WorkItBaby())
}

func (suite *ComplianceSuite) TestInterfaceValueCanBePassedBack() {
	require := suite.Require()

	obj := calc.NewJSObjectLiteralForInterface()
	friendly := obj.GiveMeFriendly()
	require.Equal("I am literally friendly!", *friendly.Hello())

	greetingAugmenter := calc.NewGreetingAugmenter()
	betterGreeting := greetingAugmenter.BetterGreeting(friendly)
	require.Equal("I am literally friendly! Let me buy you a drink!", *betterGreeting)
}

func (suite *ComplianceSuite) TestPositionalArgumentAndStructPropertyWithSameName() {
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

func newMulTen(value *float64) *mulTen {
	m := &mulTen{}
	calc.NewMultiply_Override(m, calclib.NewNumber(value), calclib.NewNumber(jsii.Number(10)))
	return m
}

// Go native subclasses must override at least one method with a pointer
// receiver to be registered with the kernel.
func (m *mulTen) Hello() *string {
	return jsii.String("Hello from mulTen!")
}

func (suite *ComplianceSuite) TestObjectReferencesRoundTripThroughAny() {
	require := suite.Require()

	types := calc.NewAllTypes()

	jsObj := calclib.NewNumber(jsii.Number(44))
	types.SetAnyProperty(jsObj)
	_, ok := (types.AnyProperty()).(calclib.Number)
	require.True(ok)

	nativeObj := addTen.New(jsii.Number(10))
	types.SetAnyProperty(nativeObj)
	result1 := types.AnyProperty()
	require.Equal(nativeObj, result1)

	nativeObj2 := newMulTen(jsii.Number(20))
	types.SetAnyProperty(nativeObj2)
	unmarshalledNativeObj, ok := (types.AnyProperty()).(*mulTen)
	require.True(ok)
	require.Equal(nativeObj2, unmarshalledNativeObj)
}

func (suite *ComplianceSuite) TestReceivedStructEqualsHostBuiltStruct() {
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

func (suite *ComplianceSuite) TestClassesCanReferenceEachOtherDuringInitialization() {
	require := suite.Require()

	outerClass := child.NewOuterClass()
	require.NotNil(outerClass.InnerClass())
}

func (suite *ComplianceSuite) TestOverrideReceivesDeserializedArguments() {
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

func (suite *ComplianceSuite) TestInterfacePropertyCanBeSet() {
	require := suite.Require()
	obj := calc.ObjectWithPropertyProvider_Provide()

	obj.SetProperty(jsii.String("New Value"))
	require.True(*obj.WasSet())
}

func (suite *ComplianceSuite) TestKernelUsesHostInterfaceAccessors() {
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

func (suite *ComplianceSuite) TestKernelKnowsTheHostRuntime() {
	require := suite.Require()
	require.Equal(fmt.Sprintf("%s/%s/%s", runtime.Version(), runtime.GOOS, runtime.GOARCH), *calc.JsiiAgent_Value())
}

func (suite *ComplianceSuite) TestHostCanImplementInterface() {
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

func (suite *ComplianceSuite) TestHostNullIsSentAsUndefined() {
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

func (suite *ComplianceSuite) TestProtectedMethodCanBeOverridden() {
	require := suite.Require()
	challenge := "Cthulhu Fhtagn!"

	overridden := newMyOverridableProtectedMember()

	require.Equal(challenge, *overridden.ValueFromProtected())
}

func (suite *ComplianceSuite) TestUnsetStructPropertiesAreOmitted() {
	require := suite.Require()
	opts := calc.EraseUndefinedHashValuesOptions{Option1: jsii.String("option1")}
	require.True(*calc.EraseUndefinedHashValues_DoesKeyExist(&opts, jsii.String("option1")))

	require.Equal(map[string]interface{}{"prop2": "value2"}, *calc.EraseUndefinedHashValues_Prop1IsNull())
	require.Equal(map[string]interface{}{"prop1": "value1"}, *calc.EraseUndefinedHashValues_Prop2IsUndefined())

	require.False(*calc.EraseUndefinedHashValues_DoesKeyExist(&opts, jsii.String("option2")))
}

func (suite *ComplianceSuite) TestIncompleteStructIsRejected() {
	require := suite.Require()
	s := calclib.MyFirstStruct{} // <-- this struct has required fields
	obj := calc.NewGiveMeStructs()

	// Required struct fields are checked when the struct is converted for the kernel,
	// so the incomplete struct is never sent.
	require.PanicsWithValue(
		"Field scopejsiicalclib.MyFirstStruct.Anumber is required, but has nil value",
		func() { obj.ReadFirstNumber(&s) },
	)
}

func (suite *ComplianceSuite) TestUndefinedOptionalMapReadsAsAbsent() {
	require := suite.Require()
	require.Nil(calc.DisappointingCollectionSource_MaybeMap())
}

func (suite *ComplianceSuite) TestReturnedMapCanBeRead() {
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

func (suite *ComplianceSuite) TestHostImplementsAbstractMembers() {
	require := suite.Require()
	abstractSuite := NewMyAbstractSuite(nil)
	require.Equal("Wrapped<String<Oomf!>>", *abstractSuite.WorkItAll(jsii.String("Oomf!")))
}

func (suite *ComplianceSuite) TestProtectedSetterCanBeOverridden() {
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

func (suite *ComplianceSuite) TestObjectsReceivedAsMostDerivedPublicType() {
	require := suite.Require()

	classRef := calc.Constructors_MakeClass()
	ifaceRef := calc.Constructors_MakeInterface()

	// Constructors.makeClass() is typed as PublicClass but actually returns an
	// InbetweenClass instance. The kernel labels the object reference with its
	// most derived type, so the Go type assertion to InbetweenClass must succeed.
	_, ok := classRef.(calc.InbetweenClass)
	require.True(ok)
	require.NotNil(ifaceRef)
}

// TestVoidReturningAsync verifies that returning Promise<void> is correctly handled.
func (suite *ComplianceSuite) TestAsyncMethodReturningNothing() {
	// Async methods are generated as synchronous kernel invocations in Go, which
	// the kernel rejects ("<method> is an async method, use \"begin\" instead",
	// or "sbegin" for static methods).
	suite.FailTest("Async methods are not implemented", "https://github.com/aws/jsii/issues/2670")

	obj := calc.NewPromiseNothing()
	obj.InstancePromiseIt()
	calc.PromiseNothing_PromiseIt()
}

func (suite *ComplianceSuite) TestStaticAsyncMethodsCanBeCalled() {
	// Async methods are generated as synchronous kernel invocations in Go, which
	// the kernel rejects ("<method> is an async method, use \"sbegin\" instead").
	suite.FailTest("Async methods are not implemented", "https://github.com/aws/jsii/issues/2670")

	require := suite.Require()
	require.Equal(float64(42), *calc.StaticAsyncMethods_AddOne(jsii.Number(41)))
}

func (suite *ComplianceSuite) TestStaticArrayPropertyRejectsMutation() {
	suite.NotApplicableTest("Go arrays are immutable by design")
}

func (suite *ComplianceSuite) TestStructsAreSentAsPlainData() {
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

func (suite *ComplianceSuite) TestObjectsReturnedAsAbstractTypeAreUsable() {
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

func (suite *ComplianceSuite) TestMapOfInterfacesValuesAreUsable() {
	mymap := *calc.InterfaceCollections_MapOfInterfaces()
	for _, value := range mymap {
		value.Ring()
	}
}

func (suite *ComplianceSuite) TestAsyncMethodsCanBeCalled() {
	suite.FailTest("Async methods are not implemented", "https://github.com/aws/jsii/issues/2670")
	require := suite.Require()
	obj := calc.NewAsyncVirtualMethods()
	require.Equal(float64(128), *obj.CallMe())
	require.Equal(float64(528), *obj.OverrideMe(jsii.Number(44)))
}

func (suite *ComplianceSuite) TestDiamondInheritedStructPropertiesAppearOnce() {
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

func (suite *ComplianceSuite) TestMapPropertyCanBeRead() {
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

func (suite *ComplianceSuite) TestAsyncOverrideErrorPropagates() {
	suite.FailTest("Async methods are not implemented", "https://github.com/aws/jsii/issues/2670")
	require := suite.Require()

	obj := myAsyncVirtualMethods{calc.NewAsyncVirtualMethods()}
	obj.CallMe()
	require.Panics(func() { obj.CallMe() })
}

func (suite *ComplianceSuite) TestObjectsUsableThroughImplementedInterface() {
	require := suite.Require()

	// Declared return type is the interface itself.
	obj := calc.SomeTypeJsii976_ReturnReturn()
	require.Equal(333.0, *obj.Foo())

	// Declared return type is `any`: the value must still be usable through the
	// interface it implements (this used to be the separate `downcasting` test).
	anyValue := calc.SomeTypeJsii976_ReturnAnonymous()
	var realValue calc.IReturnJsii976
	jsii.UnsafeCast(anyValue, &realValue)
	require.Equal(1337.0, *realValue.Foo())
}

func (suite *ComplianceSuite) TestGetterOverrideCanCallSuper() {
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

func (suite *ComplianceSuite) TestAbstractTypedValueReceivedAsReference() {
	t := suite.T()

	c := calc.NewCalculator(&calc.CalculatorProps{})
	c.Add(jsii.Number(120))
	v := c.Curr()

	require.Equal(t, 120.0, *v.Value())
}

func (suite *ComplianceSuite) TestSyncGetterOverrideCallingAsyncFails() {
	t := suite.T()

	obj := syncOverrides.New()
	obj.CallAsync = true

	defer func() {
		err := recover()
		require.NotNil(t, err, "expected a failure to occur")
	}()

	obj.CallerIsProperty()
}

func (suite *ComplianceSuite) TestSyncSetterOverrideCallingAsyncFails() {
	t := suite.T()

	obj := syncOverrides.New()
	obj.CallAsync = true

	defer func() {
		err := recover()
		require.NotNil(t, err, "expected a failure to occur")
	}()

	obj.SetCallerIsProperty(jsii.Number(12))
}

func (suite *ComplianceSuite) TestPropertyAccessesUseHostOverrides() {
	t := suite.T()

	so := syncOverrides.New()
	require.Equal(t, "I am an override!", *so.RetrieveValueOfTheProperty())
	so.ModifyValueOfTheProperty(jsii.String("New Value"))
	require.Equal(t, "New Value", *so.AnotherTheProperty)
}

func (suite *ComplianceSuite) TestVariadicArgumentsAreForwarded() {
	t := suite.T()

	vm := calc.NewVariadicMethod(jsii.Number(1))
	result := vm.AsArray(jsii.Number(3), jsii.Number(4), jsii.Number(5), jsii.Number(6))
	require.Equal(t, []*float64{jsii.Number(1), jsii.Number(3), jsii.Number(4), jsii.Number(5), jsii.Number(6)}, *result)
}

func (suite *ComplianceSuite) TestCollectionPropertiesCanBeSetAndRead() {
	t := suite.T()

	at := calc.NewAllTypes()

	// array
	at.SetArrayProperty(&[]*string{jsii.String("Hello"), jsii.String("World")})
	require.Equal(t, "World", *(*at.ArrayProperty())[1])

	// map
	at.SetMapProperty(&map[string]calclib.Number{"Foo": calclib.NewNumber(jsii.Number(123))})
	require.Equal(t, 123.0, *(*at.MapProperty())["Foo"].Value())
}

func (suite *ComplianceSuite) TestAsyncOverrideCanBeInherited() {
	t := suite.T()

	obj := overrideAsyncMethods.NewOverrideAsyncMethodsByBaseClass()
	suite.FailTest("Async methods are not implemented", "https://github.com/aws/jsii/issues/2670")
	require.Equal(t, 4452.0, obj.CallMe())
}

func (suite *ComplianceSuite) TestStructReceivedAsParentStructType() {
	t := suite.T()

	require.NotZero(t, calc.Demonstrate982_TakeThis())
	require.NotZero(t, calc.Demonstrate982_TakeThisToo())
}

func (suite *ComplianceSuite) TestGetterOverrideErrorPropagates() {
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

func (suite *ComplianceSuite) TestPrimitivePropertiesCanBeRead() {
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

func (suite *ComplianceSuite) TestObjectPropertiesCanBeReadAndAssigned() {
	t := suite.T()

	c := calc.NewCalculator(&calc.CalculatorProps{})
	c.Add(jsii.Number(3200000))
	c.Neg()
	c.SetCurr(calc.NewMultiply(calclib.NewNumber(jsii.Number(2)), c.Curr()))
	require.Equal(t, -6400000.0, *c.Value())
}

func (suite *ComplianceSuite) TestReservedWordStructPropertiesAreUsable() {
	t := suite.T()
	t.Skip("Go reserved words do not collide with identifiers used in API surface")
}

func (suite *ComplianceSuite) TestHostMethodDoesNotOverridePrivateMethod() {
	t := suite.T()

	obj := doNotOverridePrivates.New()

	require.Equal(t, "privateMethod", *obj.PrivateMethodValue())
}

func (suite *ComplianceSuite) TestHostMethodDoesNotOverridePrivateProperty() {
	t := suite.T()

	obj := doNotOverridePrivates.New()

	require.Equal(t, "privateProperty", *obj.PrivatePropertyValue())
}

func (suite *ComplianceSuite) TestUndefinedOptionalListReadsAsAbsent() {
	t := suite.T()

	require.Nil(t, calc.DisappointingCollectionSource_MaybeList())
}

func (suite *ComplianceSuite) TestMapPropertyRejectsMutation() {
	suite.NotApplicableTest("Go maps are immutable by design")
}

func (suite *ComplianceSuite) TestMultipleAsyncMethodsCanBeOverridden() {
	t := suite.T()

	obj := twoOverrides.New()
	suite.FailTest("Async methods are not implemented", "https://github.com/aws/jsii/issues/2670")
	require.Equal(t, 684.0, obj.CallMe())
}

func (suite *ComplianceSuite) TestSetterOverrideCanCallSuper() {
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

func (suite *ComplianceSuite) TestIsoDateStringsStayStrings() {
	t := suite.T()

	nowAsISO := time.Now().Format(time.RFC3339)

	w := wallClock.NewWallClock(nowAsISO)
	entropy := wallClock.NewEntropy(w)

	require.Equal(t, nowAsISO, *entropy.Increase())
}

func (suite *ComplianceSuite) TestListOfInterfacesElementsAreUsable() {
	t := suite.T()

	for _, obj := range *calc.InterfaceCollections_ListOfInterfaces() {
		require.Implements(t, (*calc.IBell)(nil), obj)
	}
}

func (suite *ComplianceSuite) TestUnsetOptionalPropertyReadsAsAbsent() {
	t := suite.T()

	c := calc.NewCalculator(&calc.CalculatorProps{})
	require.Nil(t, c.MaxValue())
	c.SetMaxValue(nil)
}

func (suite *ComplianceSuite) TestStructsArePassedByValue() {
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

func (suite *ComplianceSuite) TestClassWithUnionPropertyCanBeReceived() {
	t := suite.T()

	require.NotNil(t, calc.ConfusingToJackson_MakeInstance())
}

func (suite *ComplianceSuite) TestObjectLiteralReturnedAsClassIsUsable() {
	t := suite.T()

	obj := calc.NewJSObjectLiteralToNative()
	obj2 := obj.ReturnLiteral()

	require.Equal(t, "Hello", *obj2.PropA())
	require.Equal(t, 102.0, *obj2.PropB())
}

func (suite *ComplianceSuite) TestPrivateConstructorClassFromStaticFactory() {
	t := suite.T()

	obj := calc.ClassWithPrivateConstructorAndAutomaticProperties_Create(jsii.String("Hello"), jsii.String("Bye"))
	require.Equal(t, "Bye", *obj.ReadWriteString())
	obj.SetReadWriteString(jsii.String("Hello"))
	require.Equal(t, "Hello", *obj.ReadOnlyString())
}

func (suite *ComplianceSuite) TestReturnedArrayRejectsMutation() {
	suite.NotApplicableTest("Go arrays are immutable by design")
}

func (suite *ComplianceSuite) TestOverlappingStructUnionsAreDisambiguated() {
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

func (suite *ComplianceSuite) TestHostSubclassCanBeUsed() {
	t := suite.T()
	t.Log("This is, in fact, demonstrating wrapping another type (which is more go-ey than extending)")

	c := calc.NewCalculator(&calc.CalculatorProps{})
	c.SetCurr(addTen.New(jsii.Number(33)))
	c.Neg()
	require.Equal(t, -43.0, *c.Value())
}

func (suite *ComplianceSuite) TestObjectsUsableThroughEveryInterface() {
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

func (suite *ComplianceSuite) TestReservedWordClassPropertiesAreAccessible() {
	require := suite.Require()

	// A property (int) and a method parameter (assert) named like reserved words
	// remain accessible/usable under the Go binding's slugified names, mapping to
	// their original JavaScript names across the boundary.
	obj := calc.NewClassWithJavaReservedWords(jsii.String("one"))
	require.Equal("onetwo", *obj.Import(jsii.String("two")))

	// A class property named like a reserved word (while) reads its value.
	words := calc.NewJavaReservedWords()
	require.Equal("hello", *words.While())
}

func (suite *ComplianceSuite) TestConstructorCanPassThisToTheHost() {
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

func (suite *ComplianceSuite) TestUnionPropertyAcceptsEachMemberType() {

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

func (suite *ComplianceSuite) TestArraysOfObjectsPreserveOrderAndType() {
	require := suite.Require()
	sum := calc.NewSum()

	sum.SetParts(&[]calclib.NumericValue{calclib.NewNumber(jsii.Number(5)), calclib.NewNumber(jsii.Number(10)), calc.NewMultiply(calclib.NewNumber(jsii.Number(2)), calclib.NewNumber(jsii.Number(3)))})
	require.Equal(float64(10+5+(2*3)), *sum.Value())
	require.Equal(float64(5), *(*sum.Parts())[0].Value())
	require.Equal(float64(6), *(*sum.Parts())[2].Value())
	require.Equal("(((0 + 5) + 10) + (2 * 3))", *sum.ToString())
}

func (suite *ComplianceSuite) TestStaticMapPropertyRejectsMutation() {
	suite.NotApplicableTest("Golang does not have unmodifiable maps")
}

func (suite *ComplianceSuite) TestConstantsCanBeRead() {

	require := suite.Require()

	require.Equal("hello", *calc.Statics_Foo())
	obj := calc.Statics_ConstObj()
	require.Equal("world", *obj.Hello())

	require.Equal(float64(1234), *calc.Statics_BAR())
	require.Equal("world", *(*calc.Statics_ZooBar())["hello"])
}

func (suite *ComplianceSuite) TestNonExportedClassReceivedAsInterface() {
	require := suite.Require()
	require.True(*calc.NewReturnsPrivateImplementationOfInterface().PrivateImplementation().Success())
}

func (suite *ComplianceSuite) TestReturnedMapRejectsMutation() {
	suite.NotApplicableTest("Golang does not have unmodifiable maps")
}

func (suite *ComplianceSuite) TestStaticArrayPropertyCanBeRead() {
	require := suite.Require()

	arr := *calc.ClassWithCollections_StaticArray()
	require.Contains(arr, jsii.String("one"))
	require.Contains(arr, jsii.String("two"))
}

func (suite *ComplianceSuite) TestInterfaceValueWithPrivateTypeIsUsable() {
	provider := calc.NewAnonymousImplementationProvider()
	require := suite.Require()
	require.Equal(float64(1337), *provider.ProvideAsClass().Value())

	require.Equal(float64(1337), *provider.ProvideAsInterface().Value())
	require.Equal("to implement", *provider.ProvideAsInterface().Verb())
}

func (suite *ComplianceSuite) TestSetterOverrideErrorPropagates() {

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

func (suite *ComplianceSuite) TestObjectLiteralReturnedAsInterfaceIsUsable() {

	require := suite.Require()
	obj := calc.NewJSObjectLiteralForInterface()
	friendly := obj.GiveMeFriendly()
	require.Equal("I am literally friendly!", *friendly.Hello())

	gen := obj.GiveMeFriendlyGenerator()
	require.Equal("giveMeFriendlyGenerator", *gen.Hello())
	require.Equal(float64(42), *gen.Next())
}

func (suite *ComplianceSuite) TestReservedWordMethodsAreCallable() {
	require := suite.Require()

	// Methods named like reserved words (import, const) are slugified by the Go
	// binding (Import, Const) and remain callable, invoking the original method.
	obj := calc.NewJavaReservedWords()
	require.NotPanics(func() { obj.Import() })
	require.NotPanics(func() { obj.Const() })
}

func (suite *ComplianceSuite) TestHostCanImplementInterfaceThroughSuperclass() {
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

func (suite *ComplianceSuite) TestKernelErrorsReachTheHost() {
	require := suite.Require()

	calc3 := calc.NewCalculator(&calc.CalculatorProps{InitialValue: jsii.Number(20), MaximumValue: jsii.Number(30)})
	calc3.Add(jsii.Number(3))
	require.Equal(float64(23), *calc3.Value())

	require.PanicsWithError("Error: Operation 33 exceeded maximum value 30", func() {
		calc3.Add(jsii.Number(10))
	})

	calc3.SetMaxValue(jsii.Number(40))
	calc3.Add(jsii.Number(10))
	require.Equal(float64(33), *calc3.Value())

}

func (suite *ComplianceSuite) TestMethodOverrideCanCallSuper() {

	require := suite.Require()

	obj := syncOverrides.New()
	obj.ReturnSuper = false
	obj.Multiplier = 1

	require.Equal(float64(10*5), *obj.CallerIsProperty())

	obj.ReturnSuper = true // js code returns n * 2
	require.Equal(float64(10*2), *obj.CallerIsProperty())
}

func (suite *ComplianceSuite) TestAsyncOverrideCanCallSuper() {

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

func (suite *ComplianceSuite) TestMethodCallsUseHostOverride() {

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

func (suite *ComplianceSuite) TestAsyncMethodCanBeOverridden() {

	require := suite.Require()

	obj := overrideAsyncMethods.New()

	suite.FailTest("Async methods are not implemented", "https://github.com/aws/jsii/issues/2670")
	require.Equal(float64(4452), obj.CallMe())
}

func (suite *ComplianceSuite) TestSyncMethodOverrideCallingAsyncFails() {
	suite.Require().Panics(func() {
		obj := syncOverrides.New()
		obj.CallAsync = true
		obj.CallerIsMethod()
	})
}

func (suite *ComplianceSuite) TestMapOfStructsValuesHaveStructType() {
	require := suite.Require()
	m := *calc.InterfaceCollections_MapOfStructs()
	require.Equal("Hello, I'm String!", *(*m["A"]).RequiredString)
}

func (suite *ComplianceSuite) TestCallbackReceivesInterfaceArguments() {
	require := suite.Require()

	ringer := bellRinger.New()

	require.True(*calc.ConsumerCanRingBell_StaticImplementedByObjectLiteral(ringer))
	require.True(*calc.ConsumerCanRingBell_StaticImplementedByPrivateClass(ringer))
	require.True(*calc.ConsumerCanRingBell_StaticImplementedByPublicClass(ringer))
}

func (suite *ComplianceSuite) TestTypesNotLoadedByTheHostCanBeReceived() {
	cdk16625.New().Test()
}

func (suite *ComplianceSuite) TestStrippedDeprecatedTypeCanBeReceived() {
	require := suite.Require()

	require.NotNil(deprecationremoval.InterfaceFactory_Create())
}

func (suite *ComplianceSuite) TestKernelErrorMessageReachesTheHost() {
	require := suite.Require()

	defer func() {
		err := recover()
		require.NotNil(err, "expected a failure to occur")
		require.Contains(err.(error).Error(), "Cannot find asset")
	}()

	cdk22369.NewAcceptsPath(&cdk22369.AcceptsPathProps{SourcePath: jsii.String("A Bad Path")})
}

func (suite *ComplianceSuite) TestUnionStructPropertyKeepsConcreteType() {
	require := suite.Require()

	withStruct := calc.StructPassing_RoundTrip(jsii.Number(123), &calc.TopLevelStruct{
		Required:    jsii.String("hello"),
		SecondLevel: &calc.SecondLevelStruct{DeeperRequiredProp: jsii.String("exists")},
	})
	withNumber := calc.StructPassing_RoundTrip(jsii.Number(123), &calc.TopLevelStruct{
		Required:    jsii.String("hello"),
		SecondLevel: jsii.Number(5),
	})

	require.Equal("hello", *withStruct.Required)
	require.Nil(withStruct.Optional)

	require.Equal("hello", *withNumber.Required)
	require.Nil(withNumber.Optional)
	require.Equal(float64(5), withNumber.SecondLevel)

	// A struct received in a union-typed (`any`) property deserializes to an
	// opaque anonymous object proxy rather than the typed struct, so the host
	// cannot read the nested struct's properties (`deeperRequiredProp`).
	suite.FailTest("A struct received in a union-typed property is an opaque anonymous proxy; its properties cannot be read", "")
	secondLevel, ok := withStruct.SecondLevel.(*calc.SecondLevelStruct)
	require.True(ok)
	require.Equal("exists", *secondLevel.DeeperRequiredProp)
}

func (suite *ComplianceSuite) TestUnionOfListAndObjectStructPropertyRoundTrips() {
	require := suite.Require()

	friendly := calc.NewAdd(calclib.NewNumber(jsii.Number(1)), calclib.NewNumber(jsii.Number(2)))

	single := calc.ConfusingToJackson_RoundTripStruct(&calc.ConfusingToJacksonStruct{UnionProperty: friendly})
	list := calc.ConfusingToJackson_RoundTripStruct(&calc.ConfusingToJacksonStruct{UnionProperty: []interface{}{friendly}})
	unset := calc.ConfusingToJackson_RoundTripStruct(&calc.ConfusingToJacksonStruct{})

	// A single object reference is received as an object reference, preserving identity.
	require.Equal(friendly, single.UnionProperty)

	// A list is received as a list with the same element, preserving identity.
	listVal, ok := list.UnionProperty.([]interface{})
	require.True(ok)
	require.Len(listVal, 1)
	require.Equal(friendly, listVal[0])

	// A property the host did not set is received as unset.
	require.Nil(unset.UnionProperty)
}

// required to make `go test` recognize the suite.
func TestComplianceSuite(t *testing.T) {
	suite.Run(t, new(ComplianceSuite))
}
