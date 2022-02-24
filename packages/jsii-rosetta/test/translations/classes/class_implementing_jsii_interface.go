type myClass struct {
}

func (this *myClass) resolve() interface{} {
	return jsii.Number(42)
}
