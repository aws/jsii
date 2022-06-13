type myClass struct {
}

func newMyClass(y *string) *myClass {
	this := &myClass{}
	this.x = *y
	return this
}

func (this *myClass) hello() {
	fmt.Println(this.x)
}

func (this *myClass) bye() {
	fmt.Println("bye")
}
