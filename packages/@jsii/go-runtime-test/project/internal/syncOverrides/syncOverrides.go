package syncOverrides

import (
	"github.com/aws/jsii/go-runtime-test/internal/overrideAsyncMethods"
	"github.com/aws/jsii/jsii-calc/go/jsiicalc/v3"
)

type SyncOverrides struct {
	jsiicalc.SyncVirtualMethods `overrides:"VirtualMethod,TheProperty"`
	AnotherTheProperty          string
	Multiplier                  int
	ReturnSuper                 bool
	CallAsync                   bool
}

func New() *SyncOverrides {
	s := &SyncOverrides{Multiplier: 1}
	s.SyncVirtualMethods = s
	return s
}

func (t *SyncOverrides) VirtualMethod(n float64) float64 {
	if t.ReturnSuper {
		return t.SyncVirtualMethods.VirtualMethod(n)
	}
	if t.CallAsync {
		obj := overrideAsyncMethods.New()
		return obj.CallMe()
	}
	return 5 * n * float64(t.Multiplier)
}

func (t *SyncOverrides) TheProperty() string {
	return "I am an override!"
}

func (t *SyncOverrides) SetTheProperty(value string) {
	t.AnotherTheProperty = value
}
