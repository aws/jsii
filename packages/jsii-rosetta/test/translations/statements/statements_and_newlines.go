func doThing() *f64 {
	x := 1 // x seems to be equal to 1
	return jsii.Number(x + 1)
}

func doThing2(x *f64) *bool {
	if *x == 1 {
		return jsii.Boolean(true)
	}
	return jsii.Boolean(false)
}

func doThing3() *f64 {
	x := 1
	return jsii.Number(x + 1)
}

func doThing4() {
	x := 1
	x = 85
}
