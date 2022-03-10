type A struct {
}

func NewA(a *string, b *f64) *A {
	if b == nil {
		b = jsii.Number(3)
	}
	this := &A{}
	return this
}
