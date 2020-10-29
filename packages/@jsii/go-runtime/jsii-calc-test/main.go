package main

import (
	// "fmt"
	calc "github.com/aws-cdk/jsii/jsii-calc/go/jsiicalc"
	"github.com/aws-cdk/jsii/jsii-experimental"
	"math"
)

func main() {
	defer jsii.Close()

	calculator := calc.NewCalculator(calc.CalculatorProps{InitialValue: 0, MaximumValue: math.MaxFloat64})
	calculator.Add(1337)
	calculator.Mul(42)

	if calculator.GetValue() != 1337.*42. {
		// TODO: right now implementations are just NOOP.
		// panic(fmt.Sprintf("Unexpected calculator value: expected %f, but received %f", 1337.*42., calculator.GetValue()))
	}
}
