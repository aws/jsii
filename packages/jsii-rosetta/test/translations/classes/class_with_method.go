type myClass struct {
	cdk.SomeOtherClass
}

func (this *myClass) someMethod(x *string) {
	fmt.Println(*x)
}
