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
	foo: jsii.Number(3),
	deeper: &deeperStruct{
		a: jsii.Number(1),
		b: jsii.Number(2),
	},
})
