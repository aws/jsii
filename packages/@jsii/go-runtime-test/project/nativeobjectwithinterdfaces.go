package tests

import (
	calc "github.com/aws/jsii/jsii-calc/go/jsiicalc/v3"
	"github.com/aws/jsii/jsii-calc/go/scopejsiicalclib"
)

type pureNativeFriendlyRandom struct {
	calc.IFriendlyRandomGenerator
	_nextNumber float64
}

func newPureNativeFriendlyRandom() *pureNativeFriendlyRandom {
	return &pureNativeFriendlyRandom{
		_nextNumber: 1000,
	}
}

func (p *pureNativeFriendlyRandom) Next() float64 {
	n := p._nextNumber
	p._nextNumber += 1000
	return n
}

func (p *pureNativeFriendlyRandom) Hello() string {
	return "I am a native!"
}


/*
   class SubclassNativeFriendlyRandom extends Number implements IFriendly, IRandomNumberGenerator {

       private int nextNumber;

       public SubclassNativeFriendlyRandom() {
           super(908);
           this.nextNumber = 100;
       }

       @Override
       public String hello() {
           return "SubclassNativeFriendlyRandom";
       }

       @Override
       public java.lang.Number next() {
           int next = this.nextNumber;
           this.nextNumber += 100;
           return next;
       }
   }

*/

type subclassNativeFriendlyRandom struct {
	scopejsiicalclib.Number
	scopejsiicalclib.IFriendly
	calc.IRandomNumberGenerator
}

