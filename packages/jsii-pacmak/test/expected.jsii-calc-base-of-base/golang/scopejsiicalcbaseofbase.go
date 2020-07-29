package scopejsiicalcbaseofbase

type IVeryBaseInterface interface {
    foo()
}

type Very struct {
}

func (V *Very) hey() number {
    // jsiiruntime.methodcall(V)
}

type VeryBaseProps interface {
    getfoo() Very
    setfoo()
}

