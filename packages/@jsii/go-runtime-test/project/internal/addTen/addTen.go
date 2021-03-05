package addTen

import (
	calc "github.com/aws/jsii/jsii-calc/go/jsiicalc/v3"
	"github.com/aws/jsii/jsii-calc/go/scopejsiicalclib"
)

func New(val float64) calc.Add {
	return calc.NewAdd(scopejsiicalclib.NewNumber(val), scopejsiicalclib.NewNumber(10))
}