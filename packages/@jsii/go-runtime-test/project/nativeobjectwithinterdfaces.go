package tests

import (
	"github.com/aws/jsii-runtime-go"
	"github.com/aws/jsii/jsii-calc/go/scopejsiicalclib"
)

type pureNativeFriendlyRandom struct {
	_nextNumber float64
}

func newPureNativeFriendlyRandom() *pureNativeFriendlyRandom {
	return &pureNativeFriendlyRandom{
		_nextNumber: 1000,
	}
}

func (p *pureNativeFriendlyRandom) Next() *float64 {
	n := p._nextNumber
	p._nextNumber += 1000
	return &n
}

func (p *pureNativeFriendlyRandom) Hello() *string {
	return jsii.String("I am a native!")
}

type subclassNativeFriendlyRandom struct {
	scopejsiicalclib.Number
	nextNumber float64
}

func NewSubclassNativeFriendlyRandom() *subclassNativeFriendlyRandom {
	s := subclassNativeFriendlyRandom{nextNumber: 100}
	scopejsiicalclib.NewNumber_Override(&s, jsii.Number(908))
	return &s
}

func (s *subclassNativeFriendlyRandom) Next() *float64 {
	defer func() { s.nextNumber += 100 }()
	return jsii.Number(s.nextNumber)
}

func (s *subclassNativeFriendlyRandom) Hello() *string {
	return jsii.String("SubclassNativeFriendlyRandom")
}
