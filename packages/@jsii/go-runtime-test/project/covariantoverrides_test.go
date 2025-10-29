package tests

import (
	"testing"

	"github.com/aws/jsii/jsii-calc/go/jsiicalc/v3/covariantoverrides/classoverrides"
)

func TestBase(t *testing.T) {
	base := classoverrides.NewBase()
	if *base.Something().Name() != "Superclass" {
		t.Errorf("Expected Superclass, got %s", *base.Something().Name())
	}
	if *base.CreateSomething().SayHello() != "Hello Superclass" {
		t.Errorf("Expected 'Hello Superclass', got %s", *base.CreateSomething().SayHello())
	}
}

func TestMiddle(t *testing.T) {
	middle := classoverrides.NewMiddle()
	if *middle.Something().Name() != "Superclass" {
		t.Errorf("Expected Superclass, got %s", *middle.Something().Name())
	}
	if *middle.CreateSomething().SayHello() != "Hello Superclass" {
		t.Errorf("Expected 'Hello Superclass', got %s", *middle.CreateSomething().SayHello())
	}
}

func TestDerived(t *testing.T) {
	derived := classoverrides.NewDerived()
	if *derived.Something().Name() != "SubSubclass" {
		t.Errorf("Expected SubSubclass, got %s", *derived.Something().Name())
	}
	created := derived.CreateSomething()
	if *created.Name() != "SubSubclass" {
		t.Errorf("Expected SubSubclass, got %s", *created.Name())
	}
	if *created.SayHello() != "Hello SubSubclass" {
		t.Errorf("Expected 'Hello SubSubclass', got %s", *created.SayHello())
	}
}

func TestPolymorphism(t *testing.T) {
	derived := classoverrides.NewDerived()
	var base classoverrides.IBase = derived

	if *base.Something().Name() != "SubSubclass" {
		t.Errorf("Expected SubSubclass, got %s", *base.Something().Name())
	}
}

func consumeSubSubclass(s classoverrides.SubSubclass) string {
	return *s.Name()
}

func TestTypeCasting(t *testing.T) {
	derived := classoverrides.NewDerived()
	superclassResult := derived.Something()
	name := consumeSubSubclass(superclassResult.(classoverrides.SubSubclass))
	if name != "SubSubclass" {
		t.Errorf("Expected SubSubclass, got %s", name)
	}
}

