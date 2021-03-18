package overrideAsyncMethods

import (
	"github.com/aws/jsii-runtime-go"
	"github.com/aws/jsii/jsii-calc/go/jsiicalc/v3"
)

type OverrideAsyncMethods struct {
	jsiicalc.AsyncVirtualMethods `overrides:"OverrideMe"`
}

func New() *OverrideAsyncMethods {
	o := &OverrideAsyncMethods{}
	o.AsyncVirtualMethods = o
	return o
}

func (o *OverrideAsyncMethods) OverrideMe(*float64) *float64 {
	return jsii.Number(*o.Foo() * 2)
}

func (o *OverrideAsyncMethods) Foo() *float64 {
	return jsii.Number(222)
}

type OverrideAsyncMethodsByBaseClass struct {
	OverrideAsyncMethods
}

func NewOverrideAsyncMethodsByBaseClass() *OverrideAsyncMethodsByBaseClass {
	o := &OverrideAsyncMethodsByBaseClass{}
	o.AsyncVirtualMethods = o
	return o
}
