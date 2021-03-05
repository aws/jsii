package doNotOverridePrivates

import calc "github.com/aws/jsii/jsii-calc/go/jsiicalc/v3"

type DoNotOverridePrivates struct {
	calc.DoNotOverridePrivates
}

func New() *DoNotOverridePrivates {
	d := &DoNotOverridePrivates{}
	d.DoNotOverridePrivates = d
	return d
}

func (d *DoNotOverridePrivates) PrivateMethod() string {
	return "privateMethod-Override"
}

func (d *DoNotOverridePrivates) PrivateProperty() string {
	return "privateProperty-Override"
}