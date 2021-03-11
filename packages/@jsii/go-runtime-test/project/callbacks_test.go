package tests

import (
	"testing"

	calc "github.com/aws/jsii/jsii-calc/go/jsiicalc/v3"
)

func TestPureInterfacesCanBeUsedTransparently(t *testing.T) {
	requiredstring := "It's Britney b**ch!"
	expected := calc.StructB{RequiredString: &requiredstring}
	delegate := StructReturningDelegate{expected: &expected}
	calc.NewConsumePureInterface(&delegate)
	// actual := consumer.WorkItBaby()

	// if *actual.RequiredString != *expected.RequiredString {
	// 	t.Errorf("Expected %v; actual: %v", *expected.RequiredString, *actual.RequiredString)
	// }
}

type StructReturningDelegate struct {
	expected *calc.StructB
}

func (o *StructReturningDelegate) ReturnStruct() *calc.StructB {
	return o.expected
}
