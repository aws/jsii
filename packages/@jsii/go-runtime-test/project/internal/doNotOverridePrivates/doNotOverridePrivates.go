package doNotOverridePrivates

import calc "github.com/aws/jsii/jsii-calc/go/jsiicalc/v3"

type DoNotOverridePrivates struct {
	calc.DoNotOverridePrivates
}

func New() *DoNotOverridePrivates {
	d := &DoNotOverridePrivates{}
	calc.NewDoNotOverridePrivates_Override(d)
	return d
}

func (d *DoNotOverridePrivates) PrivateMethod() string {
	panic("This should not have been called!")
}

func (d *DoNotOverridePrivates) PrivateProperty() string {
	panic("This should not have been called!")
}

func (d *DoNotOverridePrivates) SetPrivateProperty(_ string) {
	panic("This should not have been called!")
}
