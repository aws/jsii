package twoOverrides

import (
	"github.com/aws/jsii-runtime-go"
	"github.com/aws/jsii/jsii-calc/go/jsiicalc/v3"
)

type TwoOverrides struct {
	jsiicalc.AsyncVirtualMethods `overrides:"OverrideMe,OverrideMeToo"`
}

func New() *TwoOverrides {
	t := &TwoOverrides{}
	t.AsyncVirtualMethods = t
	return t
}

func (t *TwoOverrides) OverrideMe(*float64) *float64 {
	return jsii.Number(666)
}

func (t *TwoOverrides) OverrideMeToo() *float64 {
	return jsii.Number(10)
}
