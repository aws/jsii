package jsii

import (
	"reflect"
	"testing"

	"github.com/aws/jsii-runtime-go/internal/api"
	"github.com/aws/jsii-runtime-go/internal/kernel"
)

type MockInterfaceABase interface {
	MockMethodABase(_ float64)
}

type mockABase struct {
	_ int // padding
}

func (m *mockABase) MockMethodABase(_ float64) {}

type MockInterfaceA interface {
	MockInterfaceABase
	MockMethodA(_ string)
}

func NewMockInterfaceA() MockInterfaceA {
	return &mockA{mockABase{}}
}

type mockA struct {
	mockABase
}

func (m *mockA) MockMethodA(_ string) {}

type MockInterfaceB interface {
	MockMethodB(_ int)
}

func NewMockInterfaceB() MockInterfaceB {
	return &mockB{}
}

type mockB struct {
	_ int // Padding
}

func (m *mockB) MockMethodB(_ int) {}

func TestNilSource(t *testing.T) {
	// Make "into" not nil to ensure the cast function overwrites it.
	into := NewMockInterfaceB()
	UnsafeCast(nil, &into)

	if into != nil {
		t.Fail()
	}
}

func TestSourceAndTargetAreTheSame(t *testing.T) {
	into := NewMockInterfaceB()
	original := into
	UnsafeCast(into, &into)

	if into != original {
		t.Fail()
	}
}

func TestTargetIsSubclassOfSource(t *testing.T) {
	from := NewMockInterfaceA()
	var into MockInterfaceABase
	UnsafeCast(from, &into)

	if into != from {
		t.Fail()
	}
}

func TestRegistersAlias(t *testing.T) {
	client := kernel.GetClient()

	objid := api.ObjectRef{InstanceID: "Object@1337#42"}
	from := NewMockInterfaceA()
	client.RegisterInstance(reflect.ValueOf(from), objid)

	var into MockInterfaceB
	client.Types().RegisterInterface(api.FQN("mock.InterfaceB"), reflect.TypeOf(&into).Elem(), []api.Override{}, func() interface{} { return NewMockInterfaceB() })

	UnsafeCast(from, &into)

	if into == nil {
		t.Fail()
	}

	if refid, found := client.FindObjectRef(reflect.ValueOf(into)); !found {
		t.Fail()
	} else if refid.InstanceID != objid.InstanceID {
		t.Fail()
	}
}
