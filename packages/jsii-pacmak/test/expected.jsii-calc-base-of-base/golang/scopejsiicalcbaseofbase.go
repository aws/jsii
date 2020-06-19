package scopejsiicalcbaseofbase

type IVeryBaseInterface interface {
    foo()
}

type Very struct {
}

func (v *Very) hey()  number {
    // jsiiruntime.methodcall(v)
}

type VeryBaseProps interface {
    getfoo() Very
    setfoo()
}

