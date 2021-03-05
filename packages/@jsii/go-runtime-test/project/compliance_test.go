package tests

import (
	"encoding/json"
	"fmt"
	"github.com/aws/jsii/go-runtime-test/internal/overrideAsyncMethods"
	"github.com/aws/jsii/go-runtime-test/internal/syncOverrides"
	"github.com/stretchr/testify/assert"
	"io/ioutil"
	"strings"
	"testing"

	"github.com/aws/jsii-runtime-go"

	calc "github.com/aws/jsii/jsii-calc/go/jsiicalc/v3"
	calclib "github.com/aws/jsii/jsii-calc/go/scopejsiicalclib"
	"github.com/stretchr/testify/suite"
)

type ComplianceSuite struct {
	suite.Suite
	report map[string]interface{}
}

func (suite *ComplianceSuite) SetupSuite() {
	suite.report = map[string]interface{}{}
}

func (suite *ComplianceSuite) TearDownSuite() {
	report, err := json.MarshalIndent(suite.report, "", "  ")

	if err != nil {
		suite.FailNowf("Failed marshalling report: %s", err.Error())
	}
	err = ioutil.WriteFile("./compliance-report.json", report, 0644)
	if err != nil {
		suite.FailNowf("Failed writing report: %s", err.Error())
	}
}

func (suite *ComplianceSuite) AfterTest(suiteName, testName string) {
	// Close jsii runtime, clean up the child process, etc...
	jsii.Close()

	status := "success"
	if suite.T().Failed() {
		status = "failure"
	}
	if suite.T().Skipped() {
		status = "skipped"
	}

	// remove the 'Test' prefix to make it more comparable with other languages who don't require it.
	suite.report[strings.Replace(testName, "Test", "", 1)] = map[string]interface{}{"status": status}
}

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
	assert.Equal(t, 3.0 * 3 * 3 * 3, calc.NewPower(calclib.NewNumber(3), calclib.NewNumber(4)).Value())
	assert.Equal(t, 999.0, calc.NewPower(calclib.NewNumber(999), calclib.NewNumber(1)).Value())
	assert.Equal(t, 1.0, calc.NewPower(calclib.NewNumber(999), calclib.NewNumber(0)).Value())
}

func (suite *ComplianceSuite) TestGetAndSetNonPrimitiveProperties() {
	t := suite.T()
	t.Skip("Not Implemented")
}

func (suite *ComplianceSuite) TestReservedKeywordsAreSlugifiedInStructProperties() {
	t := suite.T()
	t.Skip("Not Implemented")
}

func (suite *ComplianceSuite) TestFailSyncOverridesCallsDoubleAsyncPropertySetter() {
	t := suite.T()
	t.Skip("Not Implemented")
}

func (suite *ComplianceSuite) TestDoNotOverridePrivatesMethodPublic() {
	t := suite.T()
	t.Skip("Not Implemented")
}

func (suite *ComplianceSuite) TestTestNullIsAValidOptionalList() {
	t := suite.T()
	t.Skip("Not Implemented")
}

func (suite *ComplianceSuite) TestMapInClassCannotBeModified() {
	t := suite.T()
	t.Skip("Not Implemented")
}

func (suite *ComplianceSuite) TestDoNotOverridePrivatesPropertyByNamePublic() {
	t := suite.T()
	t.Skip("Not Implemented")
}

func (suite *ComplianceSuite) TestAsyncOverridesTwoOverrides() {
	t := suite.T()
	t.Skip("Not Implemented")
}

func (suite *ComplianceSuite) TestPropertyOverridesSetCallsSuper() {
	t := suite.T()
	t.Skip("Not Implemented")
}

func (suite *ComplianceSuite) TestIso8601DoesNotDeserializeToDate() {
	t := suite.T()
	t.Skip("Not Implemented")
}

func (suite *ComplianceSuite) TestCollectionOfInterfacesListOfInterfaces() {
	t := suite.T()
	t.Skip("Not Implemented")
}

func (suite *ComplianceSuite) TestUndefinedAndNull() {
	t := suite.T()
	t.Skip("Not Implemented")
}

func (suite *ComplianceSuite) TestStructsSerializeToJsii() {
	t := suite.T()
	t.Skip("Not Implemented")
}

func (suite *ComplianceSuite) TestStructsAreUndecoratedOntheWayToKernel() {
	t := suite.T()
	t.Skip("Not Implemented")
}

func (suite *ComplianceSuite) TestCanObtainReferenceWithOverloadedSetter() {
	t := suite.T()
	t.Skip("Not Implemented")
}

func (suite *ComplianceSuite) TestTestJsObjectLiteralToNative() {
	t := suite.T()
	t.Skip("Not Implemented")
}

func (suite *ComplianceSuite) TestStructsStepBuilders() {
	t := suite.T()
	t.Skip("Not Implemented")
}

func (suite *ComplianceSuite) TestClassWithPrivateConstructorAndAutomaticProperties() {
	t := suite.T()
	t.Skip("Not Implemented")
}

func (suite *ComplianceSuite) TestArrayReturnedByMethodCannotBeModified() {
	t := suite.T()
	t.Skip("Not Implemented")
}

func (suite *ComplianceSuite) TestCorrectlyDeserializesStructUnions() {
	t := suite.T()
	t.Skip("Not Implemented")
}

func (suite *ComplianceSuite) TestSubclassing() {
	t := suite.T()
	t.Skip("Not Implemented")
}

func (suite *ComplianceSuite) TestTestInterfaces() {
	t := suite.T()
	t.Skip("Not Implemented")
}

// required to make `go test` recognize the suite.
func TestComplianceSuite(t *testing.T) {
	suite.Run(t, new(ComplianceSuite))
}
