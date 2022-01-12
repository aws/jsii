package cdk16625

import (
	"github.com/aws/jsii/jsii-calc/go/jsiicalc/v3"
	abc "github.com/aws/jsii/jsii-calc/go/jsiicalc/v3/cdk16625"
)

func New() abc.Cdk16625 {
	c := &cdk16625{}
	abc.NewCdk16625_Override(c)
	return c
}

type cdk16625 struct {
	abc.Cdk16625
}

func (c *cdk16625) Unwrap(rng jsiicalc.IRandomNumberGenerator) *float64 {
	return rng.Next()
}
