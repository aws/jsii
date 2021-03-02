package main

import (
	"fmt"
	"math"
	"os"
	"reflect"
	"strings"
	"testing"

	"github.com/aws/jsii-runtime-go"
	calc "github.com/aws/jsii/jsii-calc/go/jsiicalc/v3"
	"github.com/aws/jsii/jsii-calc/go/jsiicalc/v3/submodule/param"
	returnsParam "github.com/aws/jsii/jsii-calc/go/jsiicalc/v3/submodule/returnsparam"
	calclib "github.com/aws/jsii/jsii-calc/go/scopejsiicalclib"
	"github.com/aws/jsii/jsii-calc/go/scopejsiicalclib/submodule"
)

func TestMain(m *testing.M) {
	status := m.Run()
	jsii.Close()
	os.Exit(status)
}

// Only uses first argument as initial value. This is just a convenience for
// tests that want to assert against the initialValue
func initCalculator(initialValue float64) calc.Calculator {
	return calc.NewCalculator(calc.CalculatorProps{
		InitialValue: initialValue,
		MaximumValue: math.MaxFloat64,
	})
}

func TestCalculator(t *testing.T) {
	// Object creation
	t.Run("Object creation", func(t *testing.T) {
		calculator := initCalculator(0)
		if reflect.ValueOf(calculator).IsZero() {
			t.Errorf("Expected calculator object to be valid")
		}
	})

	t.Run("Property access", func(t *testing.T) {
		expected := float64(10)
		calculator := initCalculator(expected)
		actual := calculator.Value()
		if actual != expected {
			t.Errorf("Expected: %f; Actual %f;", expected, actual)
		}
	})

	t.Run("Property mutation", func(t *testing.T) {
		calculator := initCalculator(float64(0))
		var newVal float64 = 12345
		currentProps := calclib.NewNumber(newVal)
		calculator.SetCurr(currentProps)
		actual := calculator.Value()
		if newVal != actual {
			t.Errorf("Expected: %f; Actual %f;", newVal, actual)
		}
	})

	t.Run("Method with side effect", func(t *testing.T) {
		initial, factor := float64(10), float64(3)
		calculator := initCalculator(initial)
		calculator.Mul(factor)
		expectedProduct := initial * factor
		actualProduct := calculator.Value()
		if actualProduct != expectedProduct {
			t.Errorf("Expected quotient: %f; Actual %f;", expectedProduct, actualProduct)
		}
	})

	t.Run("Method returning interface{} has embedded data", func(t *testing.T) {
		calculator := initCalculator(0)
		expectedTypeName := "Calculator"
		actualTypeName := calculator.TypeName()
		// JSII tells us this return value is an "any" type. Therefore the
		// value received by go is type `interface{}` and can be further
		// specialized using reflection.
		switch retType := actualTypeName.(type) {
		case string:
			if actualTypeName != expectedTypeName {
				t.Errorf("Expected type name: %s; Actual %s", expectedTypeName, actualTypeName)
			}
		default:
			t.Errorf("Expected type: %s; Actual type: %s", "string", retType)
		}
	})

	t.Run("Method with args and string return type", func(t *testing.T) {
		calculator := initCalculator(0)
		lhs, rhs := 10, 3
		calculator.SetCurr(calc.NewMultiply(
			calclib.NewNumber(float64(lhs)),
			calclib.NewNumber(float64(rhs)),
		))
		expectedString := fmt.Sprintf("(%d * %d)", lhs, rhs)
		actualString := calculator.ToString()
		if actualString != expectedString {
			t.Errorf("Expected string: %s; Actual %s;", expectedString, actualString)
		}
	})
}

func TestUpcasingReflectable(t *testing.T) {
	delegate := make(map[string]interface{})
	key, val := "key1", "value1"
	delegate[key] = val
	upReflectable := calc.NewUpcasingReflectable(delegate)
	entries := upReflectable.Entries()

	if len(entries) != 1 {
		t.Errorf("Entries expected to have length of: 1; Actual: %d", len(entries))
	}

	actual := entries[0]
	expected := submodule.ReflectableEntry{Key: strings.ToUpper(key), Value: val}
	if actual != expected {
		t.Errorf("Expected %v; Received: %v", expected, actual)
	}
}

func TestAllTypes(t *testing.T) {
	allTypes := calc.NewAllTypes()

	t.Run("Array property", func(t *testing.T) {
		expected1, expected2 := "val1", "val2"
		allTypes.SetArrayProperty([]string{expected1, expected2})
		actual := allTypes.ArrayProperty()
		actual1, actual2 := actual[0], actual[1]

		if actual1 != expected1 || actual2 != expected2 {
			t.Errorf("Expected Values: %s, %s; Received: %s, %s", expected1, expected2, actual1, actual2)
		}
	})

	t.Run("Any property", func(t *testing.T) {
		key, val := "key1", "val1"
		expected := make(map[string]string)
		expected[key] = val
		allTypes.SetAnyProperty(expected)

		actual := allTypes.AnyProperty()
		actualVal := reflect.ValueOf(actual)
		switch actualVal.Kind() {
		case reflect.Map:
			extractedVal := reflect.ValueOf(actualVal.MapIndex(reflect.ValueOf(key)).Interface()).String()
			if extractedVal != val {
				t.Errorf("Expected map: %s; received: %s", expected, actual)
			}
		default:
			t.Errorf("Expected type: %s; Actual type: %s", "map[string]string", actualVal.Type())
		}
	})
}

func TestEnumUnmarshal(t *testing.T) {
	actual := calc.EnumDispenser_RandomStringLikeEnum()
	if actual != calc.StringEnum_B {
		t.Errorf("Expected StringEnum.B. Actual: %s", actual)
	}
}

func TestEnumRoundtrip(t *testing.T) {
	allTypes := calc.NewAllTypes()
	actual := allTypes.EnumMethod(calc.StringEnum_A)
	if actual != calc.StringEnum_A {
		t.Errorf("Expected StringEnum.A. Actual: %s", actual)
	}

	actual = allTypes.EnumMethod(calc.StringEnum_C)
	if actual != calc.StringEnum_C {
		t.Errorf("Expected StringEnum.C. Actual: %s", actual)
	}
}

func TestOptionalEnums(t *testing.T) {
	allTypes := calc.NewAllTypes()
	actual := allTypes.OptionalEnumValue()
	if actual != "" {
		t.Error("Expected value to be nil")
	}

	allTypes.SetOptionalEnumValue(calc.StringEnum_B)
	actual = allTypes.OptionalEnumValue()
	if actual != calc.StringEnum_B {
		t.Errorf("Expected StringEnum.B. Actual: %s", actual)
	}

	allTypes.SetOptionalEnumValue("")
	actual = allTypes.OptionalEnumValue()
	if actual != "" {
		t.Error("Expected value to be nil")
	}
}

func TestStructWithEnum(t *testing.T) {
	obj := calc.NewTestStructWithEnum()
	if !obj.IsStringEnumA(calc.StructWithEnum{Foo: calc.StringEnum_A}) {
		t.Error("Failed")
	}

	if !obj.IsStringEnumB(calc.StructWithEnum{
		Foo: calc.StringEnum_B,
		Bar: calc.AllTypesEnum_THIS_IS_GREAT,
	}) {
		t.Error("Failed")
	}

	ret1 := obj.StructWithFoo()
	if ret1.Foo != calc.StringEnum_A {
		t.Error("Expecting Foo to be A")
	}

	if ret1.Bar != "" {
		t.Error("Expecting Bar to be nil")
	}

	ret2 := obj.StructWithFooBar()
	if ret2.Foo != calc.StringEnum_C {
		t.Error("Expecting Foo to be C")
	}

	if ret2.Bar != calc.AllTypesEnum_MY_ENUM_VALUE {
		t.Error("Expecting Foo to be MY_ENUM_VALUE")
	}
}

func TestReturnsSpecialParam(t *testing.T) {
	retSpecialParam := returnsParam.NewReturnsSpecialParameter()
	val := retSpecialParam.ReturnsSpecialParam()
	expected := reflect.TypeOf(param.SpecialParameter{})
	actual := reflect.TypeOf(val)
	if actual != expected {
		t.Errorf("Expected type: %s; Actual: %s", expected, actual)
	}
}

func TestMaps(t *testing.T) {
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
