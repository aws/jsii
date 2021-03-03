package main

import (
	"testing"

	calc "github.com/aws/jsii/jsii-calc/go/jsiicalc/v3"
)

func TestPureInterfacesCanBeUsedTransparently(t *testing.T) {
	expected := calc.StructB{RequiredString: "It's Britney b**ch!"}
	delegate := &StructReturningDelegate{expected: expected}
	consumer := calc.NewConsumePureInterface(delegate)
	actual := consumer.WorkItBaby()

	if actual != expected {
		t.Errorf("Expected %v; actual: %v", expected, actual)
	}
}

type StructReturningDelegate struct {
	expected calc.StructB
}

func (o *StructReturningDelegate) ReturnStruct() calc.StructB {
	return o.expected
}
