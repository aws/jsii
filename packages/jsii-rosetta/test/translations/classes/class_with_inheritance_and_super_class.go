type myClass struct {
	cdk.SomeOtherClass
}

func newMyClass(x *string, y *string) *myClass {
	this := &myClass{}
	cdk.NewSomeOtherClass_Override(this, x)
	return this
}
