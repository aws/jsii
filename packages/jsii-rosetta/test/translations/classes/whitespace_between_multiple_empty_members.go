type myClass struct {
}

func newMyClass(y *string) *myClass {
	this := &myClass{}
	this.x = *y
	return this
}

func (this *myClass) hello() {}

func (this *myClass) bye() {}
