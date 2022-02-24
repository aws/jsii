type myClassProps struct {
	prop1 *string
	prop2 *f64
}

type myClass struct {
	cdk.SomeOtherClass
}

func newMyClass(scope cdk.Construct, id *string, props myClassProps) *myClass {
	this := &myClass{}
	cdk.NewSomeOtherClass_Override(this, scope, id, props)

	fmt.Println(*props.prop1)
	return this
}
