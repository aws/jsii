package friendlyRandom

import (
	"github.com/aws/jsii-runtime-go"
	"github.com/aws/jsii/jsii-calc/go/scopejsiicalclib"
)

type SubclassFriendlyRandom struct {
	scopejsiicalclib.Number `overrides:"Hello,Next"`
	next                    float64
}

func NewSubclass() *SubclassFriendlyRandom {
	s := &SubclassFriendlyRandom{next: 100}
	s.Number = s
	return s
}

func (s *SubclassFriendlyRandom) Hello() *string {
	return jsii.String("SubclassNativeFriendlyRandom")
}

func (s *SubclassFriendlyRandom) Next() *float64 {
	defer func() { s.next += 100 }()
	return jsii.Number(s.next)
}

type PureFriendlyRandom struct {
	next float64
}

func NewPure() *PureFriendlyRandom {
	return &PureFriendlyRandom{next: 1000}
}

func (p *PureFriendlyRandom) Hello() *string {
	return jsii.String("I am a native!")
}

func (p *PureFriendlyRandom) Next() *float64 {
	defer func() { p.next += 1000 }()
	return jsii.Number(p.next)
}
