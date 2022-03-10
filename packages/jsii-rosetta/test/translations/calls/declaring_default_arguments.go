func foo(x *string, y *string, z *string) {
	if y == nil {
		y = jsii.String("hello")
	}
	fmt.Println(*x, *y, *z)
}
