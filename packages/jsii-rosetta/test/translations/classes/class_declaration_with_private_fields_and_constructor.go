type myClass struct {
	x *string
}

func newMyClass(y *string) *myClass {
	this := &myClass{}
	this.x = y
	return this
}
