package tests

import (
	"fmt"
	"testing"

	"github.com/aws/jsii-runtime-go"
	"github.com/aws/jsii/jsii-calc/go/jsiicalc/v3"
	"github.com/aws/jsii/jsii-calc/go/jsiicalc/v3/anonymous"
)

func TestConstructor(t *testing.T) {
	defer expectPanic(t, "parameter unionProperty[0][\"bad\"] must be one of the allowed types: *StructA, *StructB; received \"Not a StructA or StructB\" (a string)")
	jsiicalc.NewClassWithCollectionOfUnions(&[]*map[string]interface{}{
		{
			"good": jsiicalc.StructA{
				RequiredString: jsii.String("present"),
			},
			"bad": "Not a StructA or StructB",
		},
	})
}

func TestSetter(t *testing.T) {
	subject := jsiicalc.NewClassWithCollectionOfUnions(&[]*map[string]interface{}{})

	defer expectPanic(t, "parameter val[0][\"bad\"] must be one of the allowed types: *StructA, *StructB; received \"Not a StructA or StructB\" (a string)")
	subject.SetUnionProperty(&[]*map[string]interface{}{
		{
			"good": jsiicalc.StructA{
				RequiredString: jsii.String("present"),
			},
			"bad": "Not a StructA or StructB",
		},
	})
}

func TestStaticMethod(t *testing.T) {
	defer expectPanic(t, "parameter struct_ must be one of the allowed types: *StructA, *StructB; received \"Not a StructA\" (a string)")
	jsiicalc.StructUnionConsumer_IsStructA("Not a StructA")
}

func TestAnonymousObjectIsValid(t *testing.T) {
	strct := jsiicalc.StructUnionConsumer_ProvideStruct(jsii.String("A"))
	if !*jsiicalc.StructUnionConsumer_IsStructA(strct) {
		t.Error("Expected strct to be a StructA")
	}

	iface := anonymous.UseOptions_Provide(jsii.String("A"))
	if *anonymous.UseOptions_Consume(iface) != "A" {
		t.Error("Expected iface to produce A")
	}
}

func TestNestedUnion(t *testing.T) {
	func() {
		defer expectPanic(t, "parameter unionProperty[0] must be one of the allowed types: *map[string]interface{}, *[]interface{}; received 1337.42 (a float64)")
		jsiicalc.NewClassWithNestedUnion(&[]interface{}{1337.42})
	}()

	func() {
		defer expectPanic(t, "parameter unionProperty[0][1] must be one of the allowed types: *StructA, *StructB; received 1337.42 (a float64)")
		jsiicalc.NewClassWithNestedUnion(&[]interface{}{
			[]interface{}{
				jsiicalc.StructA{RequiredString: jsii.String("present")},
				1337.42,
			},
		})
	}()

	func() {
		defer expectPanic(t, "parameter unionProperty[0][\"bad\"] must be one of the allowed types: *StructA, *StructB; received \"Not a StructA or StructB\" (a string)")
		jsiicalc.NewClassWithNestedUnion(&[]interface{}{
			map[string]interface{}{
				"good": jsiicalc.StructA{RequiredString: jsii.String("present")},
				"bad":  "Not a StructA or StructB",
			},
		})
	}()
}

func TestVariadic(t *testing.T) {
	func() {
		defer expectPanic(t, "parameter union[1] must be one of the allowed types: *StructA, *StructB; received 1337.42 (a float64)")
		jsiicalc.NewVariadicTypeUnion(jsiicalc.StructA{RequiredString: jsii.String("present")}, 1337.42)
	}()

	// Should not raise
	jsiicalc.NewVariadicTypeUnion()
}

func expectPanic(t *testing.T, expected string) {
	if err := recover(); err != nil {
		actual := fmt.Sprintf("%v", err)
		if actual != expected {
			t.Errorf("Failed with error:\n%#v\nexpected to receive:\n%#v", actual, expected)
		}
	} else {
		t.Errorf("Expected test to fail with error:\n%#v", expected)
	}
}
