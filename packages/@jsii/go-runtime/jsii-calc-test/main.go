package main

import (
	"fmt"
	calc "github.com/aws-cdk/jsii/jsii-calc/golang/jsiicalc"
	baseofbase "github.com/aws-cdk/jsii/jsii-calc/golang/scopejsiicalcbaseofbase"
	jsii "github.com/aws-cdk/jsii/jsii-experimental"
)

func main() {
	defer jsii.Close()

	fmt.Println("Hello, JSII")
	fmt.Printf("JSII_AGENT=%s\n", calc.NewJsiiAgent().GetValue())

	// Class Creation
	number := baseofbase.NewVery()
	// Method invocation
	number.Hey()
}
