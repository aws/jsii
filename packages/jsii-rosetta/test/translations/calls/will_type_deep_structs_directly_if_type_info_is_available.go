type baseDeeperStruct struct {
	a *f64
}

type deeperStruct struct {
	baseDeeperStruct
	b *f64
}

type outerStruct struct {
	foo *f64
	deeper *deeperStruct
}

func foo(x *f64, outer *outerStruct) {
}

foo(jsii.Number(25), &outerStruct{
	Foo: jsii.Number(3),
	Deeper: &deeperStruct{
		A: jsii.Number(1),
		B: jsii.Number(2),
	},
})
