package tests

import (
	"fmt"
	"github.com/aws/jsii/jsii-calc/go/jsiicalc/v3"
	"testing"
)

func TestSetterToUnion(t *testing.T) {
	subject := jsiicalc.NewAllTypes()

	defer func() {
		if err := recover(); err != nil {
			msg := fmt.Sprintf("%s", err)
			expected := "parameter val must be one of the allowed types: *string, *float64, scopejsiicalclib.Number, Multiply; received \"B\" (a jsiicalc.StringEnum)"
			if msg != expected {
				t.Errorf("Failed with %#v, expected %#v", err, expected)
			}
		} else {
			t.Error("Expected test to panic!")
		}
	}()

	subject.SetUnionProperty(jsiicalc.StringEnum_B)
}
