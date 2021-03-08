package tests

import (
	"math"
	"testing"

	calc "github.com/aws/jsii/jsii-calc/go/jsiicalc/v3"
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

func (suite *ComplianceSuite) TestCreateObjectAndCtorOverloads()  {
	suite.NotApplicableTest("Golang does not have overloaded functions so the genearated class only has a single New function")
}

// required to make `go test` recognize the suite.
func TestComplianceSuite(t *testing.T) {
	suite.Run(t, new(ComplianceSuite))
}
