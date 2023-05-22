package tests

import (
	"testing"

	"github.com/aws/jsii-runtime-go"
	calc "github.com/aws/jsii/jsii-calc/go/jsiicalc/v3"
)

func TestPureInterfacesCanBeUsedTransparently(t *testing.T) {
	requiredstring := "It's Britney b**ch!"
	expected := calc.StructB{RequiredString: &requiredstring}
	delegate := &StructReturningDelegate{expected: &expected}
	consumer := calc.NewConsumePureInterface(delegate)
	actual := consumer.WorkItBaby()

	if *actual.RequiredString != *expected.RequiredString {
		t.Errorf("Expected %v; actual: %v", *expected.RequiredString, *actual.RequiredString)
	}
}

func TestPropertyAccessThroughAny(t *testing.T) {
	any := &ABC{
		PropA: "Hello",
		ProbB: "World",
	}
	calc.AnyPropertyAccess_MutateProperties(any, jsii.String("a"), jsii.String("b"), jsii.String("result"))
	if *any.PropC != "Hello+World" {
		t.Errorf("Expected Hello+World; actual %v", any.PropC)
	}
}

type StructReturningDelegate struct {
	expected *calc.StructB
}

func (o *StructReturningDelegate) ReturnStruct() *calc.StructB {
	return o.expected
}

type ABC struct {
	PropA string  `json:"a"`
	ProbB string  `json:"b"`
	PropC *string `json:"result,omitempty"`
}
