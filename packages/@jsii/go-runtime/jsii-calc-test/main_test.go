package main

import (
	calc "github.com/aws-cdk/jsii/jsii-calc/go/jsiicalc"
	"github.com/aws-cdk/jsii/jsii-experimental"
	"math"
	"os"
	"strings"
	"testing"
)

func TestMain(m *testing.M) {
	status := m.Run()
	jsii.Close()
	os.Exit(status)
}

func TestCalculator(t *testing.T) {
	var initialValue float64 = 10
	calculatorProps := calc.CalculatorProps{InitialValue: initialValue, MaximumValue: math.MaxFloat64}
	calculator := calc.NewCalculator(&calculatorProps)

	t.Run("Primitive Property Access", func(t *testing.T) {
		actual := calculator.GetValue()
		if actual != initialValue {
			t.Errorf("Expected: %f; Actual %f;", initialValue, actual)
		}
	})

	t.Run("Method Call Effect", func(t *testing.T) {
		var factor float64 = 3
		calculator.Mul(factor)
		var expected float64 = initialValue * factor
		actual := calculator.GetValue()

		if actual != expected {
			t.Errorf("Expected: %f; Actual %f;", expected, actual)
		}
	})

	t.Run("Method Call Returns Any Value", func(t *testing.T) {
		// JSII tells us this return value is an "any" type. Therefore the
		// value received by go is type `interface{}` and can be further
		// specialized using reflection.
		expected := "Calculator"
		actual := calculator.TypeName()
		switch retType := actual.(type) {
		case string:
			if actual != expected {
				t.Errorf("Expected: %s; Actual %s", expected, actual)
			}
		default:
			t.Errorf("Expected type: %s; Actual type: %s", "string", retType)
		}
	})
}

func TestUpcasingReflectable(t *testing.T) {
	delegate := make(map[string]interface{})
	key, val := "key1", "value1"
	delegate[key] = val
	upReflectable := calc.NewUpcasingReflectable(delegate)
	entries := upReflectable.GetEntries()

	if len(entries) != 1 {
		t.Errorf("Entries expected to have length of: 1; Actual: %d", len(entries))
	}

	entry := entries[0]
	upperKey := strings.ToUpper(key)
	actualKey, actualVal := entry.GetKey(), entry.GetValue()
	if actualKey != upperKey {
		t.Errorf("Expected Key: %s; Received Key: %s", upperKey, actualKey)
	}

	if actualVal != val {
		t.Errorf("Expected Value: %s; Received Value: %s", val, actualVal)
	}
}
